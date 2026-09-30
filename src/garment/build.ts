// Garment geometry generated from real finished-garment measurements.
//
//  upper piece  : copy of the body surface (torso/arms or torso/legs) clipped by neckline, sleeves,
//                 hem and waistline iso-lines, then pushed out to the garment girth at each height
//                 (convex-hull offset = how fabric bridges concavities) with gravity "hang" below the bust.
//  cone piece   : skirts / dress skirts / long tops below the hip line: rings around the hull of both
//                 legs, girth interpolated hip -> hem, soft folds proportional to excess fabric.
// Everything carries skin weights borrowed from the body, so the garment follows any pose.

import type { Body } from "../avatar/body";
import { computeNormals } from "../avatar/body";
import type { BodyMeasurer, Measurements } from "../avatar/measure";
import { convexHull, perimeter, regionTriangles, slice } from "../avatar/measure";
import { collide, taubinSmooth } from "./collide";
import { riseOffset, type GarmentSpec } from "./spec";

export interface GarmentMesh {
  rest: Float32Array;
  skinIdx: Uint16Array;
  skinW: Float32Array;
  /** skirts: skin used when sitting (front goes with the thighs over the lap); standing uses skinW,
   * where the skirt hangs from the hips and doesn't follow the legs (feet together, a step) */
  skinSitIdx?: Uint16Array;
  skinSitW?: Float32Array;
  uv: Float32Array;
  index: Uint32Array;
  /** garment girth / body girth near each vertex (for the tightness heat-map) */
  strain: Float32Array;
  /** 1 = free-hanging cloth (skirt cone below its top rings), simulated when sitting */
  free: Uint8Array;
  /** output vertex -> welded particle id (front/back UV seams duplicate vertices) */
  weld: Uint32Array;
  /** front-view bbox of the rest garment (m), for photo mapping */
  bbox: { minX: number; maxX: number; minY: number; maxY: number };
  /** torso half-width at 60% height (front view), for photo alignment */
  torsoHalfWidth: number;
  vertexCount: number;
}

interface Skin { i: number[]; w: number[] }
interface Work { pos: number[]; nor: number[]; skin: Skin[]; tris: number[] }

const TAU = Math.PI * 2;
const ARM_RE = /arm|wrist|finger|metacarpal|shoulder01/;
const HEAD_RE = /head|neck|jaw|eye|oculi|orbicularis|oris|levator|risorius|temporalis|tongue|special0[3-6]/;

function mergeSkin(a: Skin, b: Skin, t: number): Skin {
  const m = new Map<number, number>();
  a.i.forEach((b0, k) => a.w[k] && m.set(b0, (m.get(b0) ?? 0) + a.w[k] * (1 - t)));
  b.i.forEach((b0, k) => b.w[k] && m.set(b0, (m.get(b0) ?? 0) + b.w[k] * t));
  return top4(m);
}

function top4(m: Map<number, number>): Skin {
  const e = [...m.entries()].filter(([, w]) => w > 1e-5).sort((x, y) => y[1] - x[1]).slice(0, 4);
  const s = e.reduce((acc, [, w]) => acc + w, 0) || 1;
  const i = e.map(([b]) => b), w = e.map(([, x]) => x / s);
  while (i.length < 4) { i.push(0); w.push(0); }
  return { i, w };
}

/** Keep the part of the mesh where field >= 0; split triangles along the iso-line. */
function clip(m: Work, field: (v: number) => number): Work {
  const nv = m.pos.length / 3;
  const f = new Float64Array(nv);
  for (let v = 0; v < nv; v++) f[v] = field(v);
  const out: Work = { pos: [], nor: [], skin: [], tris: [] };
  const remap = new Int32Array(nv).fill(-1);
  const edgeCache = new Map<number, number>();
  const keep = (v: number) => {
    if (remap[v] < 0) {
      remap[v] = out.skin.length;
      out.pos.push(m.pos[v * 3], m.pos[v * 3 + 1], m.pos[v * 3 + 2]);
      out.nor.push(m.nor[v * 3], m.nor[v * 3 + 1], m.nor[v * 3 + 2]);
      out.skin.push(m.skin[v]);
    }
    return remap[v];
  };
  const cut = (a: number, b: number) => {
    const key = a < b ? a * 4194304 + b : b * 4194304 + a;
    const hit = edgeCache.get(key);
    if (hit !== undefined) return hit;
    const t = f[a] / (f[a] - f[b]);
    const id = out.skin.length;
    for (let k = 0; k < 3; k++) out.pos.push(m.pos[a * 3 + k] + (m.pos[b * 3 + k] - m.pos[a * 3 + k]) * t);
    const n = [0, 1, 2].map((k) => m.nor[a * 3 + k] + (m.nor[b * 3 + k] - m.nor[a * 3 + k]) * t);
    const l = Math.hypot(n[0], n[1], n[2]) || 1;
    out.nor.push(n[0] / l, n[1] / l, n[2] / l);
    out.skin.push(mergeSkin(m.skin[a], m.skin[b], t));
    edgeCache.set(key, id);
    return id;
  };
  for (let t = 0; t < m.tris.length; t += 3) {
    const tri = [m.tris[t], m.tris[t + 1], m.tris[t + 2]];
    const inside = tri.map((v) => f[v] >= 0);
    const n = inside.filter(Boolean).length;
    if (n === 0) continue;
    if (n === 3) { out.tris.push(keep(tri[0]), keep(tri[1]), keep(tri[2])); continue; }
    // rotate so that tri[0] is the odd one out
    let r = 0;
    for (let k = 0; k < 3; k++) if ((n === 1 && inside[k]) || (n === 2 && !inside[k])) r = k;
    const a = tri[r], b = tri[(r + 1) % 3], c = tri[(r + 2) % 3];
    if (n === 1) {
      out.tris.push(keep(a), cut(a, b), cut(a, c));
    } else {
      const ab = cut(a, b), ac = cut(a, c);
      const kb = keep(b), kc = keep(c);
      out.tris.push(ab, kb, kc, ab, kc, ac);
    }
  }
  return out;
}

/** Ray from origin along (dx, dz) against a convex polygon (flat x,z): distance to the boundary. */
function rayHull(hull: number[], cx: number, cz: number, dx: number, dz: number): number {
  const n = hull.length / 2;
  let best = 0;
  for (let i = 0; i < n; i++) {
    const j = (i + 1) % n;
    const ax = hull[i * 2] - cx, az = hull[i * 2 + 1] - cz;
    const ex = hull[j * 2] - hull[i * 2], ez = hull[j * 2 + 1] - hull[i * 2 + 1];
    const den = dx * ez - dz * ex;
    if (Math.abs(den) < 1e-12) continue;
    const t = (ax * ez - az * ex) / den;
    const s = (ax * dz - az * dx) / den;
    if (t > 0 && s >= -1e-6 && s <= 1 + 1e-6) best = Math.max(best, t);
  }
  return best;
}

interface Ring { y: number; hull: number[]; cx: number; cz: number; P: number }

const sub = (a: number[], b: number[]) => [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
const dot = (a: number[], b: number[]) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
const scale = (a: number[], k: number) => [a[0] * k, a[1] * k, a[2] * k];
const cross = (a: number[], b: number[]) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];

/** Ordered boundary loops (edges used by one triangle) of a triangle mesh. */
export function boundaryLoops(tris: number[]): number[][] {
  const count = new Map<number, number>();
  const key = (a: number, b: number) => (a < b ? a * 4194304 + b : b * 4194304 + a);
  for (let t = 0; t < tris.length; t += 3) {
    for (let k = 0; k < 3; k++) {
      const kk = key(tris[t + k], tris[t + ((k + 1) % 3)]);
      count.set(kk, (count.get(kk) ?? 0) + 1);
    }
  }
  const next = new Map<number, number>();
  for (let t = 0; t < tris.length; t += 3) {
    for (let k = 0; k < 3; k++) {
      const a = tris[t + k], b = tris[t + ((k + 1) % 3)];
      if (count.get(key(a, b)) === 1) next.set(a, b);
    }
  }
  const loops: number[][] = [];
  const seen = new Set<number>();
  for (const start of next.keys()) {
    if (seen.has(start)) continue;
    const loop: number[] = [];
    let v: number | undefined = start;
    while (v !== undefined && !seen.has(v)) { seen.add(v); loop.push(v); v = next.get(v); }
    if (loop.length >= 3) loops.push(loop);
  }
  return loops;
}

export interface UnderLayer { pos: Float32Array; normals: Float32Array; count: number }
export interface BuildContext {
  body: Body; measurer: BodyMeasurer; m: Measurements; layer?: number; under?: UnderLayer[];
  /** optional: filled with per-stage milliseconds (diagnostics) */
  timings?: Record<string, number>;
}

export function buildGarment(spec: GarmentSpec, ctx: BuildContext): GarmentMesh {
  const { body, measurer, m } = ctx;
  const data = body.data;
  const rest = body.rest;
  const nBody = data.bodyVertexCount;
  let minY = Infinity;
  for (let i = 0; i < nBody; i++) minY = Math.min(minY, rest[i * 3 + 1]);
  const Y = (cm: number) => minY + cm / 100; // floor-relative cm -> rest y
  const th = Math.max(0.0025, spec.fabric.thickness * 1.5) + (ctx.layer ?? 0) * 0.005;
  const drape = spec.fabric.drape;
  const g = (k: keyof GarmentSpec["m"]) => (spec.m[k] !== undefined ? spec.m[k]! / 100 : undefined);

  const __t0 = performance.now(); let __tl = __t0;
  const stage = (n: string) => { const t = performance.now(); if (ctx.timings) ctx.timings[n] = (ctx.timings[n] ?? 0) + t - __tl; __tl = t; };
  // ---------- landmarks
  const bustY = Y(m.bustY), waistY = Y(m.waistY), hipY = Y(m.hipY), crotchY = Y(m.crotchY), neckY = Y(m.neckY);
  const waistline = waistY + riseOffset(spec.type, spec.rise);
  const isBottom = spec.type === "skirt" || spec.type === "pants";
  const length = g("length") ?? (spec.type === "top" ? 0.6 : spec.type === "dress" ? 1.0 : spec.type === "skirt" ? 0.55 : 0.95);
  const hemY = spec.cut?.bottomY !== undefined ? Y(spec.cut.bottomY)
    : Math.max(minY + 0.015, (isBottom ? waistline : neckY - 0.01) - length);
  const needsCone = spec.type === "skirt" || spec.type === "dress" || (spec.type === "top" && hemY < hipY + 0.03);
  // skirts and dresses hang as one piece from the waist: a join at the hip shows as a seam across the seat
  const coneTop = spec.type === "skirt" ? waistline - 0.015 : spec.type === "dress" ? waistY : hipY;
  // the upper piece tucks 3cm under the skirt/cone so the junction never shows a gap
  const upperBottom = needsCone ? Math.max(coneTop - (spec.type === "skirt" ? 0.005 : 0.03), crotchY + 0.04) : hemY;

  stage("before-body");
  // ---------- body girths per level
  const bust = m.bust / 100, bodyWaist = m.waist / 100, bodyHip = m.hips / 100;
  const Gc = g("chest") ?? bust + 0.1;
  const Gw = g("waist") ?? (spec.silhouette === "fitted" ? bodyWaist + (Gc - bust) : Math.max(Gc, bodyWaist + 0.1));
  const Ghip = g("hip") ?? Math.max(bodyHip + 0.06, spec.type === "top" ? Gw : bodyHip + 0.08);
  const Ghem = g("hem") ?? (spec.silhouette === "aline" ? Ghip * 1.45 : spec.silhouette === "fitted" ? Ghip * 0.98 : Ghip * 1.05);
  // girth target (m) as a function of height for the torso part
  const keys: [number, number][] = isBottom
    ? [[waistline + 0.05, Gw], [waistline, Gw], [hipY, Ghip], [hemY, Ghem]]
    : [[bustY, Gc], [waistY, Gw], [hipY, needsCone ? Ghip : Math.max(Ghip, Ghem)], [hemY, Ghem]];
  keys.sort((a, b) => b[0] - a[0]);
  const girthAtRaw = (y: number): number => {
    if (y >= keys[0][0]) return keys[0][1];
    for (let k = 0; k < keys.length - 1; k++) {
      const [y0, g0] = keys[k], [y1, g1] = keys[k + 1];
      if (y <= y0 && y >= y1) return g0 + ((g1 - g0) * (y0 - y)) / Math.max(1e-6, y0 - y1);
    }
    return keys[keys.length - 1][1];
  };

  // ease (garment girth - body girth) interpolated between key heights, so fitted garments follow
  // the body's own curves; below the hip line of skirts the absolute girth (hip -> hem) is used.
  let easeKeysCache: [number, number][] | null = null;
  const easeKeysGet = (): [number, number][] => {
    if (easeKeysCache) return easeKeysCache;
    if (isBottom) return (easeKeysCache = keys.map(([y, gv]) => [y, gv - bodyGirthAt(y)] as [number, number]));
    // tops: ease is defined at bust / waist / hip and fades toward the shoulders and neck
    const shoulderY = Y(m.shoulderY);
    const eb = Gc - bodyGirthAt(bustY);
    const k: [number, number][] = [
      [neckY + 0.03, Math.max(TAU * th, eb * 0.15)],
      [shoulderY - 0.015, Math.max(TAU * th, eb * 0.45)],
      [bustY + 0.06, eb],
      [bustY, eb],
      [waistY, Gw - bodyGirthAt(waistY)],
      [hipY, Ghip - bodyGirthAt(hipY)],
    ];
    if (spec.m.hem !== undefined && !needsCone && hemY < hipY) k.push([hemY, Ghem - bodyGirthAt(hemY)]);
    return (easeKeysCache = k.filter(([y]) => y >= hemY - 0.001).sort((a, b) => b[0] - a[0]));
  };
  function bodyGirthAt(y: number): number {
    const tris = y < (isBottom ? waistline : waistY) - 0.02 ? measurer.torsoLegs : torsoTris;
    return ringAt(Math.max(y, minY + 0.02), tris).P;
  }
  const girthAt = (y: number): number => {
    if (needsCone && y < coneTop) return girthAtRaw(y);
    if (spec.type === "pants" && y < crotchY + 0.02) return girthAtRaw(y);
    const easeKeys = easeKeysGet();
    let e = easeKeys[easeKeys.length - 1][1];
    if (y >= easeKeys[0][0]) e = easeKeys[0][1];
    else for (let k = 0; k < easeKeys.length - 1; k++) {
      const [y0, e0] = easeKeys[k], [y1, e1] = easeKeys[k + 1];
      if (y <= y0 && y >= y1) { e = e0 + ((e1 - e0) * (y0 - y)) / Math.max(1e-6, y0 - y1); break; }
    }
    return bodyGirthAt(y) + e;
  };

  stage("before-rings");
  // ---------- rings (hull per height) for the torso region
  const torsoTris = spec.type === "pants" || isBottom ? measurer.torsoLegs : measurer.torso;
  const ringCache = new Map<number, Ring>();
  // triangles bucketed by height (1 cm) so each horizontal slice only visits nearby triangles
  const bucketCache = new Map<Uint32Array, Map<number, Uint32Array>>();
  const bucketsOf = (tris: Uint32Array) => {
    let b = bucketCache.get(tris);
    if (b) return b;
    const tmp = new Map<number, number[]>();
    for (let t = 0; t < tris.length; t += 3) {
      const ya = rest[tris[t] * 3 + 1], yb = rest[tris[t + 1] * 3 + 1], yc = rest[tris[t + 2] * 3 + 1];
      const lo = Math.floor(Math.min(ya, yb, yc) * 100), hi = Math.floor(Math.max(ya, yb, yc) * 100);
      for (let k = lo; k <= hi; k++) {
        const arr = tmp.get(k);
        if (arr) arr.push(tris[t], tris[t + 1], tris[t + 2]); else tmp.set(k, [tris[t], tris[t + 1], tris[t + 2]]);
      }
    }
    b = new Map([...tmp].map(([k, v]) => [k, Uint32Array.from(v)]));
    bucketCache.set(tris, b);
    return b;
  };
  const EMPTY = new Uint32Array(0);
  const ringAt = (y: number, tris = torsoTris): Ring => {
    const key = Math.round(y * 400) + (tris === torsoTris ? 0 : 1e6);
    const hit = ringCache.get(key);
    if (hit) return hit;
    const pts = slice(rest, bucketsOf(tris).get(Math.floor(y * 100)) ?? EMPTY, [0, y, 0], [0, 1, 0], [1, 0, 0], [0, 0, 1]);
    const hull = convexHull(pts);
    let cx = 0, cz = 0;
    for (let i = 0; i < hull.length; i += 2) { cx += hull[i]; cz += hull[i + 1]; }
    cx /= Math.max(1, hull.length / 2); cz /= Math.max(1, hull.length / 2);
    const r = { y, hull, cx, cz, P: hull.length >= 6 ? perimeter(hull) : 0 };
    ringCache.set(key, r);
    return r;
  };

  stage("before-working");
  // ---------- working mesh from body triangles
  const bones = data.bones.map((b) => b.name);
  const armBone = bones.map((b) => ARM_RE.test(b));
  const headBone = bones.map((b) => HEAD_RE.test(b));
  const legBone = bones.map((b) => /leg|foot|toe/.test(b));
  const frac = (s: Skin, flags: boolean[]) => s.i.reduce((acc, b, k) => acc + (flags[b] ? s.w[k] : 0), 0);

  const srcTris: number[] = [];
  const idx = data.body.index, src = data.body.src;
  for (let t = 0; t < idx.length; t += 3) srcTris.push(src[idx[t]], src[idx[t + 1]], src[idx[t + 2]]);
  const restNormals = computeNormals(rest.subarray(0, nBody * 3), Uint32Array.from(srcTris), nBody);

  // skin weights for generated vertices: inverse-distance blend of the nearest arm/torso body vertices
  const knnHash = new Map<number, number[]>();
  const KC = 0.035;
  const kh = (x: number, y: number, z: number) => ((x + 256) * 512 + (y + 256)) * 512 + (z + 256);
  for (let i = 0; i < nBody; i++) {
    const rg = measurer.regions[i];
    if (rg !== 0 && rg !== 1) continue;
    const k = kh(Math.floor(rest[i * 3] / KC), Math.floor(rest[i * 3 + 1] / KC), Math.floor(rest[i * 3 + 2] / KC));
    const c = knnHash.get(k);
    if (c) c.push(i); else knnHash.set(k, [i]);
  }
  const knnSkin = (x: number, y: number, z: number, anchor: Skin, anchorW: number): Skin => {
    const cx = Math.floor(x / KC), cy = Math.floor(y / KC), cz = Math.floor(z / KC);
    const best: [number, number][] = [];
    for (let r = 1; r <= 4 && best.length < 6; r++) {
      best.length = 0;
      for (let dx = -r; dx <= r; dx++) for (let dy = -r; dy <= r; dy++) for (let dz = -r; dz <= r; dz++) {
        for (const i of knnHash.get(kh(cx + dx, cy + dy, cz + dz)) ?? []) {
          const d2 = (rest[i * 3] - x) ** 2 + (rest[i * 3 + 1] - y) ** 2 + (rest[i * 3 + 2] - z) ** 2;
          if (best.length < 6 || d2 < best[best.length - 1][0]) {
            best.push([d2, i]); best.sort((p, q) => p[0] - q[0]); if (best.length > 6) best.pop();
          }
        }
      }
    }
    const acc = new Map<number, number>();
    for (const [d2, i] of best) {
      const w = 1 / (Math.sqrt(d2) + 0.01);
      for (let k = 0; k < 4; k++) {
        const bw = data.body.skinW[i * 4 + k];
        if (bw) acc.set(data.body.skinIdx[i * 4 + k], (acc.get(data.body.skinIdx[i * 4 + k]) ?? 0) + bw * w);
      }
    }
    // near the armhole keep the armhole's own weights so the seam doesn't tear
    const tot = [...acc.values()].reduce((a, b) => a + b, 0) || 1;
    const out = new Map<number, number>();
    for (const [b, w] of acc) out.set(b, (w / tot) * anchorW);
    anchor.i.forEach((b, k) => anchor.w[k] && out.set(b, (out.get(b) ?? 0) + anchor.w[k] * (1 - anchorW)));
    return top4(out);
  };

  let work: Work = { pos: [], nor: [], skin: [], tris: [] };
  {
    const remap = new Int32Array(nBody).fill(-1);
    const regions = measurer.regions;
    const allowed = new Set(isBottom ? [0, 2] : [0, 1, 2]);
    for (let t = 0; t < srcTris.length; t += 3) {
      const tri = [srcTris[t], srcTris[t + 1], srcTris[t + 2]];
      if (!tri.every((v) => allowed.has(regions[v]) || (regions[v] === 3 && !isBottom))) continue;
      for (const v of tri) {
        if (remap[v] < 0) {
          remap[v] = work.skin.length;
          work.pos.push(rest[v * 3], rest[v * 3 + 1], rest[v * 3 + 2]);
          work.nor.push(restNormals[v * 3], restNormals[v * 3 + 1], restNormals[v * 3 + 2]);
          const sk: Skin = { i: [], w: [] };
          for (let k = 0; k < 4; k++) { sk.i.push(data.body.skinIdx[v * 4 + k]); sk.w.push(data.body.skinW[v * 4 + k]); }
          work.skin.push(sk);
        }
        work.tris.push(remap[v]);
      }
    }
  }
  const P = (w: Work, v: number) => [w.pos[v * 3], w.pos[v * 3 + 1], w.pos[v * 3 + 2]];

  // arm parameter: distance along the arm from the shoulder point
  const hum = [body.joint("upperarm01.L____head"), body.joint("upperarm01.R____head")];
  const elb = [body.joint("lowerarm01.L____head"), body.joint("lowerarm01.R____head")];
  const wri = [body.joint("wrist.L____head"), body.joint("wrist.R____head")];
  const armT = (p: number[]) => {
    const s = p[0] >= 0 ? 0 : 1;
    const h = hum[s], e = elb[s], w = wri[s];
    const ux = e.x - h.x, uy = e.y - h.y, uz = e.z - h.z, ul = Math.hypot(ux, uy, uz);
    const t = ((p[0] - h.x) * ux + (p[1] - h.y) * uy + (p[2] - h.z) * uz) / ul;
    if (t <= ul) return t;
    const lx = w.x - e.x, ly = w.y - e.y, lz = w.z - e.z, ll = Math.hypot(lx, ly, lz);
    return ul + ((p[0] - e.x) * lx + (p[1] - e.y) * ly + (p[2] - e.z) * lz) / ll;
  };
  const shoulderDrop = Math.max(0, ((g("shoulder") ?? m.shoulder / 100) - m.shoulder / 100) / 2);
  const sleeveLen = spec.sleeve === "none" ? -0.035 + shoulderDrop
    : shoulderDrop + (g("sleeveLength") ?? { short: 0.16, elbow: 0.3, long: 0.58 }[spec.sleeve]);

  let necklineInfo: { nb: number[]; hw: number } | null = null;
  let strapInfo: { nb: number[]; edgeF: number; edgeB: number; x: number } | null = null;
  stage("before-clipping");
  // ---------- clipping
  if (!isBottom) {
    // neckline: a front-view curve (pattern-style front/back drop and half width), blended front<->back
    const nb = body.joint("neck01____head");
    const sc = m.height / 160;
    const neckR = (m.neck / 100) / TAU;
    const NL = {
      crew: { hw: neckR + 0.028, df: 0.035, db: 0.006, v: false },
      v: { hw: neckR + 0.03, df: 0.13, db: 0.01, v: true },
      scoop: { hw: neckR + 0.05, df: 0.1, db: 0.025, v: false },
      boat: { hw: neckR + 0.095, df: 0.03, db: 0.03, v: false },
    }[spec.neckline];
    const straps = !!spec.straps && spec.sleeve === "none";
    necklineInfo = straps ? null : { nb: [nb.x, nb.y, nb.z], hw: NL.hw };
    if (straps) {
      // camisole: a low, nearly straight top edge (front and back); the straps are added below
      const edgeF = nb.y - 0.13 * sc, edgeB = nb.y - 0.12 * sc;
      strapInfo = { nb: [nb.x, nb.y, nb.z], edgeF, edgeB, x: neckR + 0.052 };
      work = clip(work, (v) => {
        const p = P(work, v);
        const wf = Math.min(1, Math.max(0, (p[2] - nb.z + 0.03) / 0.06));
        const ax = Math.abs(p[0] - nb.x);
        return edgeF * wf + edgeB * (1 - wf) + Math.max(0, ax - 0.06) * 0.35 - p[1];
      });
    } else work = clip(work, (v) => {
      if (frac(work.skin[v], headBone) > 0.55) return -1;
      const p = P(work, v);
      const ax = Math.abs(p[0] - nb.x);
      const u = ax / NL.hw;
      const g = u >= 1 ? 0 : NL.v ? 1 - u : Math.sqrt(1 - u * u);
      const wf = Math.min(1, Math.max(0, (p[2] - nb.z + 0.03) / 0.06));
      const drop = (NL.df * wf + NL.db * (1 - wf)) * g * sc;
      const yc = nb.y - drop + Math.max(0, ax - NL.hw) * 3;
      return yc - p[1];
    });
    // armholes: the torso piece ends at the arm/torso crease and, over the shoulder, at the garment's
    // shoulder point (further down the arm for dropped shoulders); sleeves are separate tubes.
    const armholeT = spec.sleeve === "none" ? shoulderDrop - 0.025 : shoulderDrop;
    work = clip(work, (v) => {
      const af = frac(work.skin[v], armBone);
      return Math.max(0.5 - af, armholeT - armT(P(work, v)));
    });
  }
  if (spec.cut?.topY !== undefined) {
    const cutTop = Y(spec.cut.topY);
    work = clip(work, (v) => cutTop - work.pos[v * 3 + 1]);
  }
  // hem / bottom edge of the upper piece
  work = clip(work, (v) => work.pos[v * 3 + 1] - upperBottom);
  // waistline for bottoms
  if (isBottom) work = clip(work, (v) => waistline - work.pos[v * 3 + 1]);
  // pants: remove feet / lower legs below the hem
  if (spec.type === "pants") {
    const highCut = spec.cut?.bottomY !== undefined;
    work = clip(work, (v) => work.pos[v * 3 + 1] - hemY - (highCut ? Math.max(0, Math.abs(work.pos[v * 3]) - 0.035) * 0.9 : 0));
  }
  // skirts: nothing from the legs below the crotch belongs to the upper piece
  if (spec.type === "skirt") work = clip(work, (v) => (frac(work.skin[v], legBone) > 0.6 ? work.pos[v * 3 + 1] - crotchY : 1));

  stage("before-armhole");
  // ---------- armhole loops (ordered boundary vertices) for the sleeves
  const armholes: { side: 1 | -1; loop: number[] }[] = [];
  if (!isBottom && spec.sleeve !== "none" && spec.cut?.topY === undefined) {
    for (const loop of boundaryLoops(work.tris)) {
      let cx = 0, cy = 0;
      for (const v of loop) { cx += work.pos[v * 3]; cy += work.pos[v * 3 + 1]; }
      cx /= loop.length; cy /= loop.length;
      const side = cx >= 0 ? 1 : -1;
      const h = hum[side > 0 ? 0 : 1];
      if (Math.abs(cx) > Math.abs(h.x) * 0.55 && cy < h.y + 0.08 && cy > h.y - 0.25 && loop.length >= 8) {
        const prev = armholes.find((a) => a.side === side);
        if (!prev || loop.length > prev.loop.length) {
          if (prev) armholes.splice(armholes.indexOf(prev), 1);
          armholes.push({ side, loop });
        }
      }
    }
  }

  stage("before-push");
  // ---------- push the surface out to the garment girth
  const nv = work.skin.length;
  const strainArr: number[] = new Array(nv).fill(1);
  const BINS = 72;
  // allowed inward slope (dr/dy) of hanging fabric: stiff fabric falls straight, fluid fabric clings more
  const hangK = spec.silhouette === "fitted" ? 3 : 0.02 + drape * 0.1;
  const loose = spec.silhouette !== "fitted" && (isBottom ? spec.type === "skirt" : Gc > bust + 0.06);
  // single vertical axis for the whole garment so gravity "hang" works in absolute space
  const axisRing = ringAt(isBottom ? hipY : bustY);
  const ACX = axisRing.cx, ACZ = axisRing.cz;
  // radius grid for the torso part (angles x levels, top -> bottom), with gravity hang below the bust
  const levelStep = 0.005;
  const gridTop = isBottom ? waistline + 0.01 : neckY + 0.04;
  const gridBottom = needsCone ? hemY - 0.01 : upperBottom - 0.01;
  const levels = Math.max(1, Math.ceil((gridTop - gridBottom) / levelStep));
  const grid: Float64Array[] = [];
  const gridRing: Ring[] = [];
  for (let L = 0; L <= levels; L++) {
    const y = gridTop - L * levelStep;
    // below the waist the silhouette includes the hip/thigh roots
    const ring = y < (isBottom ? waistline : waistY) - 0.02 ? ringAt(Math.max(y, minY + 0.02), measurer.torsoLegs) : ringAt(y);
    gridRing.push(ring);
    const row = new Float64Array(BINS);
    const Pn = ring.P, Gt = Math.max(girthAt(y), Pn + TAU * th);
    const d = (Gt - Pn) / TAU;
    for (let b = 0; b < BINS; b++) {
      const a = (b / BINS) * TAU;
      const rh = ring.hull.length >= 6 ? rayHull(ring.hull, ACX, ACZ, Math.sin(a), Math.cos(a)) : 0;
      row[b] = rh + d;
    }
    // fabric tension across the ring: angular smoothing bridges small bumps (nipples, navel edges)
    const raw = row.slice();
    for (let b = 0; b < BINS; b++) {
      let acc = 0;
      for (let k = -4; k <= 4; k++) acc += raw[(b + k + BINS) % BINS];
      row[b] = Math.max(acc / 9, raw[b] - 0.008);
    }
    if (L > 0 && ((loose && (isBottom || y < bustY)) || (needsCone && y < coneTop))) {
      for (let b = 0; b < BINS; b++) row[b] = Math.max(row[b], grid[L - 1][b] - hangK * levelStep);
    }
    grid.push(row);
  }
  const sampleGrid = (y: number, a: number) => {
    const Lf = (gridTop - y) / levelStep;
    const L = Math.max(0, Math.min(levels, Math.round(Lf)));
    const bf = ((a / TAU) * BINS + BINS) % BINS;
    const b0 = Math.floor(bf) % BINS, b1 = (b0 + 1) % BINS, t = bf - Math.floor(bf);
    return { r: grid[L][b0] * (1 - t) + grid[L][b1] * t, ring: gridRing[L] };
  };

  const legOpen = g("legOpening") ?? 0.4;
  const thighG = g("thigh") ?? m.thigh / 100 + 0.08;
  const legRingCache = new Map<number, number>();
  const legGirth = (y: number) => {
    const k = Math.round(y * 200);
    if (!legRingCache.has(k)) {
      const pts = slice(rest, bucketsOf(measurer.legL).get(Math.floor(y * 100)) ?? EMPTY, [0, y, 0], [0, 1, 0], [1, 0, 0], [0, 0, 1]);
      legRingCache.set(k, pts.length >= 6 ? perimeter(convexHull(pts)) : 0.3);
    }
    return legRingCache.get(k)!;
  };

  for (let v = 0; v < nv; v++) {
    const p = P(work, v);
    const n = [work.nor[v * 3], work.nor[v * 3 + 1], work.nor[v * 3 + 2]];
    const s = work.skin[v];
    const armF = frac(s, armBone);
    const legF = frac(s, legBone);
    // baseline: offset along the normal by fabric thickness
    let x = p[0] + n[0] * th, y = p[1] + n[1] * th * 0.6, z = p[2] + n[2] * th;
    if (!isBottom && armF >= 0.5) {
      // shoulder cap left on the torso piece: fabric thickness only (sleeves are separate tubes)
      strainArr[v] = 1.05;
    } else if (spec.type === "pants" && p[1] < crotchY + 0.06) {
      const lg = legGirth(Math.min(p[1], crotchY - 0.01));
      const tk = Math.min(1, Math.max(0, (crotchY - p[1]) / Math.max(0.1, crotchY - hemY)));
      const gg = thighG + (legOpen - thighG) * tk;
      // fade the leg ease in below the crotch so the seam area stays continuous
      const fade = Math.min(1, Math.max(0, (crotchY + 0.02 - p[1]) / 0.06)) * Math.min(1, legF * 1.5);
      const e = Math.max(0, (gg - lg) / TAU) * fade;
      x += n[0] * e; z += n[2] * e;
      strainArr[v] = gg / lg;
    } else if (p[1] <= gridTop + 0.001 && p[1] >= gridBottom - 0.02) {
      const dx = x - ACX, dz = z - ACZ;
      const r = Math.hypot(dx, dz) || 1e-6;
      const a = Math.atan2(dx, dz);
      const { r: R, ring } = sampleGrid(p[1], a);
      const nr = Math.max(r, R);
      x = ACX + (dx / r) * nr;
      z = ACZ + (dz / r) * nr;
      strainArr[v] = ring.P > 0 ? girthAt(p[1]) / ring.P : 1;
    }
    work.pos[v * 3] = x; work.pos[v * 3 + 1] = y; work.pos[v * 3 + 2] = z;
  }

  stage("before-cone");
  // ---------- cone piece (samples the same radius grid, so it joins the upper piece seamlessly)
  let coneFreeFrom = Infinity, coneBase = -1;
  const sitSkin = new Map<number, Skin>();
  if (needsCone) {
    const N = 72; // 9 fold lobes x 8 samples
    const step = 0.015;
    const top = upperBottom;
    const count = Math.max(2, Math.ceil((top - hemY) / step));
    const phase = 0.7;
    const base = work.skin.length;
    coneBase = base;
    coneFreeFrom = base + N * 3; // the top three rings stay attached to the hips
    const ys: number[] = [];
    for (let L = 0; L <= count; L++) ys.push(top - ((top - hemY) * L) / count);
    const bone = (n: string) => ctx.body.boneIndex.get(n) ?? 0;
    const boneId = { pelvisL: bone("pelvis.L"), pelvisR: bone("pelvis.R"), legL: bone("upperleg01.L"), legR: bone("upperleg01.R") };
    // nearest-body-vertex skinning (k nearest, inverse distance) using rest torso/leg vertices
    // candidate body vertices in a spatial hash (4 cm cells)
    const CELL = 0.04;
    const hash = new Map<number, number[]>();
    const hk = (x: number, y: number, z: number) => ((x + 256) * 512 + (y + 256)) * 512 + (z + 256);
    for (let i = 0; i < nBody; i++) {
      const rg = measurer.regions[i];
      if (!((rg === 0 || rg === 2) && rest[i * 3 + 1] < top + 0.08 && rest[i * 3 + 1] > hemY - 0.05)) continue;
      const k = hk(Math.floor(rest[i * 3] / CELL), Math.floor(rest[i * 3 + 1] / CELL), Math.floor(rest[i * 3 + 2] / CELL));
      const c = hash.get(k);
      if (c) c.push(i); else hash.set(k, [i]);
    }
    const nearest6 = (x: number, y: number, z: number): [number, number][] => {
      const cx = Math.floor(x / CELL), cy = Math.floor(y / CELL), cz = Math.floor(z / CELL);
      const best: [number, number][] = [];
      for (let r = 1; r <= 8; r++) {
        best.length = 0;
        for (let dx = -r; dx <= r; dx++) for (let dy = -r; dy <= r; dy++) for (let dz = -r; dz <= r; dz++) {
          const c = hash.get(hk(cx + dx, cy + dy, cz + dz));
          if (!c) continue;
          for (const i of c) {
            const ex = rest[i * 3] - x, ey = rest[i * 3 + 1] - y, ez = rest[i * 3 + 2] - z;
            const d2 = ex * ex + ey * ey * 4 + ez * ez;
            if (best.length < 6 || d2 < best[best.length - 1][0]) {
              best.push([d2, i]);
              best.sort((p, q) => p[0] - q[0]);
              if (best.length > 6) best.pop();
            }
          }
        }
        // results are exact once the 6th neighbour is closer than the searched radius
        if (best.length === 6 && Math.sqrt(best[5][0]) <= r * CELL) break;
      }
      return best;
    };
    for (let L = 0; L <= count; L++) {
      const y = ys[L];
      const tk = (top - y) / Math.max(1e-6, top - hemY);
      const { ring } = sampleGrid(y, 0);
      const excess = Math.max(0, girthAt(y) / Math.max(0.2, ring.P) - 1);
      // folds grow with excess fabric and drape, fading in from the top edge
      const foldAmp = spec.pleated
        // knife pleats: even depth, stitched flat over the hips
        ? Math.min(0.035, 0.012 + excess * 0.03) * Math.min(1, Math.max(0, (top - y - 0.06) / 0.1))
        : Math.min(0.07, excess * 0.1 * (0.4 + drape)) * Math.min(1, (top - y) / 0.12);
      for (let b = 0; b < N; b++) {
        const a = (b / N) * TAU;
        const R = sampleGrid(y, a).r;
        // 18 sharp pleats (4 samples each) or 9 soft, uneven lobes
        const wave = spec.pleated ? (2 / Math.PI) * Math.asin(Math.sin(a * 18)) : Math.sin(a * 9 + phase + tk * 0.8) * (0.6 + 0.4 * Math.sin(a * 4));
        const r = R * (1 + foldAmp * wave);
        const x = ACX + Math.sin(a) * r, z = ACZ + Math.cos(a) * r;
        work.pos.push(x, y, z);
        work.nor.push(Math.sin(a), 0, Math.cos(a));
        // exact kNN skinning on every 3rd ring (and the last); rings in between are blended afterwards
        // A skirt is one piece of cloth: attached to the hips, and to both thighs more and more toward
        // the hem, blended smoothly around the ring (by side), so it never splits between the legs
        // (feet together) or tears over the knees (sitting). Near the top it matches the body's own
        // weights so it stays joined to the upper piece.
        const side = Math.sin(a), mix = Math.max(0, Math.min(1, (side + 0.6) / 1.2));
        const m2 = mix * mix * (3 - 2 * mix);
        // the front of the skirt lies on the thighs (it goes over the lap when sitting), the back hangs
        // from the hips
        // front and sides go with the thighs (so the thighs never come through when they swing forward),
        // the back hangs from the hips
        const fs = Math.max(0, Math.min(1, (Math.cos(a) + 0.45) / 0.9));
        const sitShare = (0.3 + 0.7 * fs * fs * (3 - 2 * fs)) * Math.min(1, tk * 3);
        const standShare = 0.12 * Math.min(1, tk * 2);
        const clothFor = (legShare: number) => top4(new Map([[boneId.pelvisL, (1 - legShare) * m2], [boneId.pelvisR, (1 - legShare) * (1 - m2)],
          [boneId.legL, legShare * m2], [boneId.legR, legShare * (1 - m2)]]));
        const cloth = clothFor(standShare);
        sitSkin.set(work.skin.length, clothFor(sitShare));
        const joinW = Math.min(1, (top - y) / 0.15);
        if (joinW < 1) {
          const best = nearest6(x, y, z);
          const acc = new Map<number, number>();
          for (const [d2, i] of best) {
            const w = 1 / (Math.sqrt(d2) + 0.01);
            for (let k = 0; k < 4; k++) {
              const bw = data.body.skinW[i * 4 + k];
              if (bw) acc.set(data.body.skinIdx[i * 4 + k], (acc.get(data.body.skinIdx[i * 4 + k]) ?? 0) + bw * w);
            }
          }
          const jw = joinW * joinW * (3 - 2 * joinW);
          sitSkin.set(work.skin.length, mergeSkin(top4(acc), sitSkin.get(work.skin.length)!, jw));
          work.skin.push(mergeSkin(top4(acc), cloth, jw));
        } else {
          work.skin.push(cloth);
        }
        strainArr.push(girthAt(y) / Math.max(0.2, ring.P));
      }
    }
    for (let L = 0; L < count; L++) {
      for (let b = 0; b < N; b++) {
        const a = base + L * N + b, c = base + L * N + ((b + 1) % N);
        const a2 = a + N, c2 = c + N;
        work.tris.push(a, a2, c, c, a2, c2);
      }
    }
  }

  // ---------- camisole straps: thin bands over the shoulders, from the front edge to the back edge
  if (strapInfo) {
    const si = strapInfo;
    const half = 0.006, off = th + 0.0025;
    for (const side of [1, -1]) {
      const sx = si.nb[0] + side * si.x;
      // body surface in the plane x = sx, seen from a point under the shoulder: max radius per angle
      const cy = si.edgeB + 0.02, cz = si.nb[2];
      const BINS2 = 48, rad = new Float64Array(BINS2).fill(-1), py = new Float64Array(BINS2), pz = new Float64Array(BINS2);
      for (let i = 0; i < nBody; i++) {
        if (measurer.regions[i] === 3 || Math.abs(rest[i * 3] - sx) > 0.012 || rest[i * 3 + 1] < cy - 0.02) continue;
        const dy = rest[i * 3 + 1] - cy, dz = rest[i * 3 + 2] - cz;
        const th2 = Math.atan2(dz, dy); // 0 = up, + toward the front
        const b = Math.round(((th2 + Math.PI) / (2 * Math.PI)) * (BINS2 - 1));
        const r = Math.hypot(dy, dz);
        if (r > rad[b]) { rad[b] = r; py[b] = rest[i * 3 + 1]; pz[b] = rest[i * 3 + 2]; }
      }
      const path: number[][] = [];
      for (let b = BINS2 - 1; b >= 0; b--) {
        if (rad[b] < 0) continue;
        const front = pz[b] > cz;
        if (py[b] < (front ? si.edgeF : si.edgeB) - 0.01) continue;
        const dy = py[b] - cy, dz = pz[b] - cz, l = Math.hypot(dy, dz) || 1;
        path.push([sx, py[b] + (dy / l) * off, pz[b] + (dz / l) * off, dy / l, dz / l]);
      }
      if (path.length < 3) continue;
      // smooth the path (the body's vertex ring is uneven)
      for (let it = 0; it < 3; it++) for (let k = 1; k < path.length - 1; k++) for (const c of [1, 2]) path[k][c] = (path[k - 1][c] + 2 * path[k][c] + path[k + 1][c]) / 4;
      const base = work.skin.length;
      for (const p of path) {
        for (const dx of [-half, half]) {
          work.pos.push(p[0] + dx, p[1], p[2]);
          work.nor.push(0, p[3], p[4]);
          work.skin.push(knnSkin(p[0] + dx, p[1], p[2], { i: [0, 0, 0, 0], w: [0, 0, 0, 0] }, 1));
          strainArr.push(1.05);
        }
      }
      for (let k = 0; k < path.length - 1; k++) {
        const a = base + k * 2, b = a + 1, c = a + 2, d = a + 3;
        work.tris.push(a, c, b, b, c, d);
      }
    }
  }

  stage("before-fabric");
  // ---------- fabric tension: smooth away body micro-detail, then keep clear of the skin
  {
    // pin open edges (hem, neckline, sleeve ends) so they don't shrink
    const edgeCount = new Map<number, number>();
    for (let t = 0; t < work.tris.length; t += 3) {
      for (let k = 0; k < 3; k++) {
        const a = work.tris[t + k], b = work.tris[t + (k + 1) % 3];
        const key = a < b ? a * 4194304 + b : b * 4194304 + a;
        edgeCount.set(key, (edgeCount.get(key) ?? 0) + 1);
      }
    }
    const border = new Uint8Array(work.skin.length);
    for (const [key, c] of edgeCount) if (c === 1) { border[Math.floor(key / 4194304)] = 1; border[key % 4194304] = 1; }
    const iters = spec.silhouette === "fitted" ? 8 : 20;
    taubinSmooth(work.pos, work.tris, iters, 0.55, -0.58, (v) => border[v] === 1);
    collide(work.pos, work.skin.length, rest, restNormals, nBody, th);
    // outer layers (a top worn over a skirt / trousers) stay outside the garments underneath
    for (const u of ctx.under ?? []) collide(work.pos, work.skin.length, u.pos, u.normals, u.count, 0.006, 0.02);
  }

  const torsoTriCount = work.tris.length;
  stage("before-which");
  // ---------- which vertices the cloth relaxation may move (0 = follows the skinned body exactly)
  const pinned = new Uint8Array(work.skin.length);
  {
    const shoulderY = Y(m.shoulderY);
    for (let v = 0; v < work.skin.length; v++) {
      const y = work.pos[v * 3 + 1];
      if (!isBottom && y > shoulderY - 0.035) pinned[v] = 1;
      if (isBottom && y > waistline - 0.025) pinned[v] = 1;
      if (spec.cut) pinned[v] = 1; // underwear hugs the body
    }
    for (const { loop } of armholes) for (const v of loop) pinned[v] = 1;
  }
  const extraPinned: number[] = [];
  stage("before-sleeves");
  // ---------- sleeves: tubes around the arm, first ring = the (final) armhole edge
  const armTris = armholes.length ? [regionTriangles(data, measurer.regions, [1], 1), regionTriangles(data, measurer.regions, [1], -1)] : [];
  for (const { side, loop } of armholes) {
    const si = side > 0 ? 0 : 1;
    const H = hum[si], E = elb[si], Wr = wri[si];
    const upLen = H.distanceTo(E), loLen = E.distanceTo(Wr);
    const axisAt = (t: number) => {
      // point + direction on the arm polyline at arc length t from the humeral head
      if (t <= upLen) {
        const d = [(E.x - H.x) / upLen, (E.y - H.y) / upLen, (E.z - H.z) / upLen];
        return { c: [H.x + d[0] * t, H.y + d[1] * t, H.z + d[2] * t], d };
      }
      const d = [(Wr.x - E.x) / loLen, (Wr.y - E.y) / loLen, (Wr.z - E.z) / loLen];
      const tt = t - upLen;
      return { c: [E.x + d[0] * tt, E.y + d[1] * tt, E.z + d[2] * tt], d };
    };
    const a0 = axisAt(0).d;
    // frame: e1 = "top of the arm" (perpendicular, pointing up), e2 = front/back
    const upv = [0, 1, 0];
    let e1 = sub(upv, scale(a0, dot(upv, a0)));
    e1 = scale(e1, 1 / Math.hypot(e1[0], e1[1], e1[2]));
    const e2 = cross(a0, e1);
    const L = loop.map((v) => [work.pos[v * 3], work.pos[v * 3 + 1], work.pos[v * 3 + 2]]);
    const angOf = (p: number[]) => {
      const q = sub(p, [H.x, H.y, H.z]);
      return Math.atan2(dot(q, e2), dot(q, e1));
    };
    // resample the loop at N evenly spaced angles around the arm axis
    const N = 40;
    const phis = L.map(angOf);
    const ring0: number[][] = [];
    const ring0Skin: Skin[] = [];
    for (let j = 0; j < N; j++) {
      const target = -Math.PI + (j / N) * TAU;
      let best = 0, bestErr = Infinity, bestT = 0;
      for (let k = 0; k < L.length; k++) {
        const k2 = (k + 1) % L.length;
        let p0 = phis[k], p1 = phis[k2];
        if (Math.abs(p1 - p0) > Math.PI) { if (p1 < p0) p1 += TAU; else p0 += TAU; }
        let tg = target;
        while (tg < Math.min(p0, p1) - 1e-9) tg += TAU;
        while (tg > Math.max(p0, p1) + 1e-9) tg -= TAU;
        const span = p1 - p0;
        const f = Math.abs(span) < 1e-9 ? 0 : (tg - p0) / span;
        const err = f < 0 ? -f : f > 1 ? f - 1 : 0;
        if (err < bestErr) { bestErr = err; best = k; bestT = Math.min(1, Math.max(0, f)); }
      }
      const k2 = (best + 1) % L.length;
      ring0.push([0, 1, 2].map((c) => L[best][c] + (L[k2][c] - L[best][c]) * bestT));
      ring0Skin.push(mergeSkin(work.skin[loop[best]], work.skin[loop[k2]], bestT));
    }
    // girths along the sleeve
    const armG0 = m.upperArm / 100;
    const G0 = Math.max(g("upperArm") ?? armG0 + (spec.silhouette === "fitted" ? 0.05 : 0.1), armG0 + TAU * th * 2);
    const wristG = 0.155 * (m.height / 160);
    const Gend = g("sleeveOpening") ?? (spec.sleeve === "long" ? wristG + 0.035 : spec.sleeve === "elbow" ? G0 * 0.92 : G0 * 1.02);
    // never past the wrist: slices beyond it would cut through the hand and flare the cuff
    const tEnd = Math.min(Math.max(0.05, sleeveLen), upLen + loLen + 0.01);
    const armGirthAt = (t: number) => {
      if (t <= upLen) return armG0 * (1 - 0.12 * (t / upLen));
      return armG0 * 0.88 + (wristG - armG0 * 0.88) * Math.min(1, (t - upLen) / loLen);
    };
    const K = Math.max(6, Math.ceil(tEnd / 0.015));
    const base = work.skin.length;
    const gdir = [0, -1, 0];
    for (let k = 0; k <= K; k++) {
      const sK = k / K;
      const t = tEnd * sK;
      const { c, d } = axisAt(t);
      let f1 = sub(upv, scale(d, dot(upv, d)));
      f1 = scale(f1, 1 / Math.hypot(f1[0], f1[1], f1[2]));
      const f2 = cross(d, f1);
      // the arm's own cross-section (deltoid, biceps...) so the sleeve cap is round, not a cylinder
      const armPts = t > upLen + loLen - 0.015 ? [] : slice(rest, armTris[si], c, d, f1, f2);
      const hull = armPts.length >= 6 ? convexHull(armPts) : [];
      const Parm = hull.length >= 6 ? perimeter(hull) : armGirthAt(t);
      const G = Math.max(G0 + (Gend - G0) * sK, Parm + TAU * th * 1.5);
      const ease = Math.max(th * 1.2, (G - Parm) / TAU);
      // loose fabric rests on top of the arm and hangs below it
      let gp = sub(gdir, scale(d, dot(gdir, d)));
      const gl = Math.hypot(gp[0], gp[1], gp[2]) || 1;
      gp = scale(gp, Math.max(0, ease - th) * 0.8 / gl);
      const w = sK <= 0 ? 0 : Math.min(1, sK / 0.35) ** 2 * (3 - 2 * Math.min(1, sK / 0.35));
      for (let j = 0; j < N; j++) {
        const phi = -Math.PI + (j / N) * TAU;
        const rh = hull.length >= 6 ? rayHull(hull, 0, 0, Math.cos(phi), Math.sin(phi)) : armGirthAt(t) / TAU;
        const r = rh + ease;
        const tube = [0, 1, 2].map((q) => c[q] + gp[q] + r * (Math.cos(phi) * f1[q] + Math.sin(phi) * f2[q]));
        const pnt = [0, 1, 2].map((q) => ring0[j][q] + (tube[q] - ring0[j][q]) * w);
        work.pos.push(pnt[0], pnt[1], pnt[2]);
        const nrm = sub(pnt, c);
        const nl = Math.hypot(nrm[0], nrm[1], nrm[2]) || 1;
        work.nor.push(nrm[0] / nl, nrm[1] / nl, nrm[2] / nl);
        work.skin.push(k === 0 ? ring0Skin[j] : knnSkin(pnt[0], pnt[1], pnt[2], ring0Skin[j], w));
        strainArr.push(G / Parm);
      }
    }
    for (let k = 0; k < K; k++) {
      for (let j = 0; j < N; j++) {
        const a = base + k * N + j, c2 = base + k * N + ((j + 1) % N);
        work.tris.push(a, c2, a + N, c2, c2 + N, a + N);
      }
    }
    for (let q = base; q < base + N * 2; q++) extraPinned.push(q);
    // long sleeves end in a fitted cuff that holds the wrist: pin it so the sleeve cannot slide down the arm
    if (spec.sleeve === "long") for (let q = base + (K - 1) * N; q < base + (K + 1) * N; q++) extraPinned.push(q);
  }
  stage("before-rib");
  // ---------- rib collar: a ~1.5 cm band standing on the neckline
  if (necklineInfo && spec.cut?.topY === undefined) {
    const nb = necklineInfo.nb;
    const loops = boundaryLoops(work.tris.slice(0, torsoTriCount));
    let neck: number[] | null = null, bestD = Infinity;
    for (const loop of loops) {
      let cx = 0, cy = 0;
      for (const v of loop) { cx += work.pos[v * 3]; cy += work.pos[v * 3 + 1]; }
      cx /= loop.length; cy /= loop.length;
      const dd = Math.abs(cx - nb[0]) + Math.abs(cy - nb[1]);
      if (Math.abs(cx - nb[0]) < 0.04 && cy > nb[1] - 0.2 && dd < bestD) { bestD = dd; neck = loop; }
    }
    if (neck) {
      const bandH = 0.015 * (m.height / 160);
      const base = work.skin.length;
      const n = neck.length;
      // relax the jagged clip edge along the loop before standing the band on it
      let sm = neck.map((v) => [work.pos[v * 3], work.pos[v * 3 + 1], work.pos[v * 3 + 2]]);
      for (let it = 0; it < 6; it++) {
        sm = sm.map((p, i) => {
          const a = sm[(i + n - 1) % n], b = sm[(i + 1) % n];
          return [0, 1, 2].map((c) => (a[c] + 2 * p[c] + b[c]) / 4);
        });
      }
      // direction that continues the fabric across the neckline edge (away from the garment interior)
      const nbrs = new Map<number, Set<number>>();
      for (let t = 0; t < torsoTriCount; t += 3) {
        for (let k = 0; k < 3; k++) {
          const a = work.tris[t + k];
          if (!nbrs.has(a)) nbrs.set(a, new Set());
          nbrs.get(a)!.add(work.tris[t + ((k + 1) % 3)]).add(work.tris[t + ((k + 2) % 3)]);
        }
      }
      const onLoop = new Set(neck);
      for (let i = 0; i < n; i++) {
        const v = neck[i];
        const p = sm[i];
        let ox = 0, oy = 0, oz = 0;
        for (const q of nbrs.get(v) ?? []) {
          if (onLoop.has(q)) continue;
          ox += work.pos[v * 3] - work.pos[q * 3]; oy += work.pos[v * 3 + 1] - work.pos[q * 3 + 1]; oz += work.pos[v * 3 + 2] - work.pos[q * 3 + 2];
        }
        // continue the fabric across the edge and lean onto the neck: a rib band hugs the neck, it does
        // not stand up like a fin (which reads as spikes above the shoulders from the front)
        const ol = Math.hypot(ox, oy, oz) || 1;
        const toAxis = [nb[0] - p[0], 0, nb[2] - p[2]];
        const tl = Math.hypot(toAxis[0], toAxis[2]) || 1;
        let dx = (ox / ol) * 0.55 + (toAxis[0] / tl) * 0.45, dy = (oy / ol) * 0.55 + 0.2, dz = (oz / ol) * 0.55 + (toAxis[2] / tl) * 0.45;
        const dl = Math.hypot(dx, dy, dz) || 1;
        dx /= dl; dy /= dl; dz /= dl;
        const q = [p[0] + dx * bandH, p[1] + dy * bandH, p[2] + dz * bandH];
        work.pos.push(q[0], q[1], q[2]);
        work.nor.push(-toAxis[0] / tl, 0, -toAxis[2] / tl);
        work.skin.push(work.skin[v]);
        strainArr.push(1.05);
      }
      for (let i = 0; i < n; i++) {
        const a = neck[i], b = neck[(i + 1) % n], qa = base + i, qb = base + ((i + 1) % n);
        work.tris.push(a, b, qb, a, qb, qa);
        extraPinned.push(qa, a);
      }
    }
  }
  if (armholes.length || necklineInfo) collide(work.pos, work.skin.length, rest, restNormals, nBody, th);

  stage("before-final");
  // ---------- final buffers: split by facing (front / back) for the photo atlas
  const count = work.skin.length;
  let bx0 = Infinity, bx1 = -Infinity, by0 = Infinity, by1 = -Infinity;
  for (let v = 0; v < count; v++) {
    bx0 = Math.min(bx0, work.pos[v * 3]); bx1 = Math.max(bx1, work.pos[v * 3]);
    by0 = Math.min(by0, work.pos[v * 3 + 1]); by1 = Math.max(by1, work.pos[v * 3 + 1]);
  }
  // torso half width at 60% down from the top (front view), excluding sleeves
  const yRef = by1 - (by1 - by0) * 0.6;
  let halfW = 0;
  for (let v = 0; v < count; v++) {
    if (Math.abs(work.pos[v * 3 + 1] - yRef) < 0.02 && frac(work.skin[v], armBone) < 0.5) halfW = Math.max(halfW, Math.abs(work.pos[v * 3]));
  }
  const cx = 0;
  const outPos: number[] = [], outUV: number[] = [], outIdx: number[] = [], outStrain: number[] = [];
  const extraPinnedSet = new Set(extraPinned);
  const isPinned = (v: number) =>
    (v < pinned.length && pinned[v] === 1) || extraPinnedSet.has(v) || (coneBase >= 0 && v >= coneBase && v < coneFreeFrom);
  const outSkI: number[] = [], outSkW: number[] = [], outFree: number[] = [], outWeld: number[] = [];
  const outSitI: number[] = [], outSitW: number[] = [];
  const vmap = new Map<number, number>();
  const W = Math.max(1e-3, Math.max(bx1 - cx, cx - bx0));
  const H = Math.max(1e-3, by1 - by0);
  const emit = (v: number, back: boolean) => {
    const key = v * 2 + (back ? 1 : 0);
    let id = vmap.get(key);
    if (id !== undefined) return id;
    id = outStrain.length;
    vmap.set(key, id);
    const x = work.pos[v * 3], y = work.pos[v * 3 + 1];
    outPos.push(x, y, work.pos[v * 3 + 2]);
    // front: left half of atlas, back: right half (mirrored so the back looks like the garment's back)
    const u = 0.5 + ((x - cx) / W) * 0.5; // 0..1 across the garment width
    outUV.push(back ? 0.5 + (1 - u) * 0.5 : u * 0.5, (y - by0) / H);
    outStrain.push(strainArr[v] ?? 1);
    outFree.push(isPinned(v) ? 0 : 1);
    outWeld.push(v);
    outSkI.push(...work.skin[v].i);
    outSkW.push(...work.skin[v].w);
    const ss = sitSkin.get(v) ?? work.skin[v];
    outSitI.push(...ss.i);
    outSitW.push(...ss.w);
    return id;
  };
  for (let t = 0; t < work.tris.length; t += 3) {
    const a = work.tris[t], b = work.tris[t + 1], c = work.tris[t + 2];
    const ax = work.pos[a * 3], ay = work.pos[a * 3 + 1], az = work.pos[a * 3 + 2];
    const e1 = [work.pos[b * 3] - ax, work.pos[b * 3 + 1] - ay, work.pos[b * 3 + 2] - az];
    const e2 = [work.pos[c * 3] - ax, work.pos[c * 3 + 1] - ay, work.pos[c * 3 + 2] - az];
    const nz = e1[0] * e2[1] - e1[1] * e2[0];
    // cone faces use outward ring normals; use the centroid direction as a tie-breaker
    const back = nz < 0 && Math.abs(nz) > 1e-9 ? true : nz >= 0 ? false : (work.pos[a * 3 + 2] < 0);
    outIdx.push(emit(a, back), emit(b, back), emit(c, back));
  }
  stage("final-buffers");
  return {
    rest: Float32Array.from(outPos),
    skinIdx: Uint16Array.from(outSkI),
    skinW: Float32Array.from(outSkW),
    ...(sitSkin.size ? { skinSitIdx: Uint16Array.from(outSitI), skinSitW: Float32Array.from(outSitW) } : {}),
    uv: Float32Array.from(outUV),
    index: Uint32Array.from(outIdx),
    strain: Float32Array.from(outStrain),
    free: Uint8Array.from(outFree),
    weld: Uint32Array.from(outWeld),
    bbox: { minX: bx0, maxX: bx1, minY: by0, maxY: by1 },
    torsoHalfWidth: halfW,
    vertexCount: outStrain.length,
  };
}
