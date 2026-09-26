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
import { convexHull, perimeter, slice } from "../avatar/measure";
import { collide, taubinSmooth } from "./collide";
import type { GarmentSpec } from "./spec";

export interface GarmentMesh {
  rest: Float32Array;
  skinIdx: Uint16Array;
  skinW: Float32Array;
  uv: Float32Array;
  index: Uint32Array;
  /** garment girth / body girth near each vertex (for the tightness heat-map) */
  strain: Float32Array;
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

export interface BuildContext { body: Body; measurer: BodyMeasurer; m: Measurements; layer?: number }

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

  // ---------- landmarks
  const bustY = Y(m.bustY), waistY = Y(m.waistY), hipY = Y(m.hipY), crotchY = Y(m.crotchY), neckY = Y(m.neckY);
  const waistline = spec.rise === "high" ? waistY + 0.03 : spec.rise === "low" ? waistY - 0.06 : waistY;
  const isBottom = spec.type === "skirt" || spec.type === "pants";
  const length = g("length") ?? (spec.type === "top" ? 0.6 : spec.type === "dress" ? 1.0 : spec.type === "skirt" ? 0.55 : 0.95);
  const hemY = Math.max(minY + 0.015, (isBottom ? waistline : neckY - 0.01) - length);
  const needsCone = spec.type === "skirt" || spec.type === "dress" || (spec.type === "top" && hemY < hipY + 0.03);
  const coneTop = hipY;
  // the upper piece tucks 3cm under the skirt/cone so the junction never shows a gap
  const upperBottom = needsCone ? Math.max(coneTop - 0.03, crotchY + 0.04) : hemY;

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
  const girthAt = (y: number): number => {
    if (y >= keys[0][0]) return keys[0][1];
    for (let k = 0; k < keys.length - 1; k++) {
      const [y0, g0] = keys[k], [y1, g1] = keys[k + 1];
      if (y <= y0 && y >= y1) return g0 + ((g1 - g0) * (y0 - y)) / Math.max(1e-6, y0 - y1);
    }
    return keys[keys.length - 1][1];
  };

  // ---------- rings (hull per height) for the torso region
  const torsoTris = spec.type === "pants" || isBottom ? measurer.torsoLegs : measurer.torso;
  const ringCache = new Map<number, Ring>();
  const ringAt = (y: number, tris = torsoTris): Ring => {
    const key = Math.round(y * 400) + (tris === torsoTris ? 0 : 1e6);
    const hit = ringCache.get(key);
    if (hit) return hit;
    const pts = slice(rest, tris, [0, y, 0], [0, 1, 0], [1, 0, 0], [0, 0, 1]);
    const hull = convexHull(pts);
    let cx = 0, cz = 0;
    for (let i = 0; i < hull.length; i += 2) { cx += hull[i]; cz += hull[i + 1]; }
    cx /= Math.max(1, hull.length / 2); cz /= Math.max(1, hull.length / 2);
    const r = { y, hull, cx, cz, P: hull.length >= 6 ? perimeter(hull) : 0 };
    ringCache.set(key, r);
    return r;
  };
  const bustRing = ringAt(bustY, measurer.torso);

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

  // ---------- clipping
  if (!isBottom) {
    // neckline
    const nb = body.joint("neck01____head");
    const neckR = Math.max(0.055, (m.neck / 100) / TAU * 1.25);
    const shape = {
      crew: { rx: neckR + 0.012, front: 0.07, back: 0.055, ry: 0.05 },
      v: { rx: neckR + 0.015, front: 0.075, back: 0.055, ry: 0.05 },
      scoop: { rx: neckR + 0.035, front: 0.1, back: 0.065, ry: 0.11 },
      boat: { rx: neckR + 0.075, front: 0.075, back: 0.07, ry: 0.035 },
    }[spec.neckline];
    const vDepth = 0.17;
    const cy = nb.y - 0.012;
    work = clip(work, (v) => {
      const p = P(work, v);
      const dx = p[0] - nb.x, dy = p[1] - cy, dz = p[2] - nb.z;
      if (frac(work.skin[v], headBone) > 0.55) return -1;
      const rz = dz > 0 ? shape.front : shape.back;
      const ry = dz > 0 && spec.neckline === "scoop" ? shape.ry * 1.4 : shape.ry;
      let f = Math.hypot(dx / shape.rx, dy / ry, dz / rz) - 1;
      if (spec.neckline === "v" && dz > 0.02) {
        const yb = cy - vDepth;
        const w = shape.rx * Math.min(1, Math.max(0, (p[1] - yb) / (cy - yb)));
        f = Math.min(f, p[1] < yb ? 1 : (Math.abs(dx) - w) * 12);
      }
      return f;
    });
    // sleeves / armholes
    work = clip(work, (v) => {
      const s = work.skin[v];
      if (frac(s, armBone) < 0.5) return 0.05;
      return sleeveLen - armT(P(work, v));
    });
  }
  // hem / bottom edge of the upper piece
  work = clip(work, (v) => work.pos[v * 3 + 1] - upperBottom);
  // waistline for bottoms
  if (isBottom) work = clip(work, (v) => waistline - work.pos[v * 3 + 1]);
  // pants: remove feet / lower legs below the hem
  if (spec.type === "pants") work = clip(work, (v) => work.pos[v * 3 + 1] - hemY);
  // skirts: nothing from the legs below the crotch belongs to the upper piece
  if (spec.type === "skirt") work = clip(work, (v) => (frac(work.skin[v], legBone) > 0.6 ? work.pos[v * 3 + 1] - crotchY : 1));

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
  const gridTop = isBottom ? waistline + 0.01 : bustY + 0.05;
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

  const upperArmG = g("upperArm") ?? m.upperArm / 100 + 0.09;
  const legOpen = g("legOpening") ?? 0.4;
  const thighG = g("thigh") ?? m.thigh / 100 + 0.08;
  const legRingCache = new Map<number, number>();
  const legGirth = (y: number) => {
    const k = Math.round(y * 200);
    if (!legRingCache.has(k)) {
      const pts = slice(rest, measurer.legL, [0, y, 0], [0, 1, 0], [1, 0, 0], [0, 0, 1]);
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
      // sleeve: extra ease that flares toward the opening
      const t = armT(p);
      const armG = Math.max(0.18, (m.upperArm / 100) * (1 - Math.max(0, t - 0.1) * 0.4));
      const opening = g("sleeveOpening") ?? upperArmG * (spec.sleeve === "long" ? 0.75 : 1.05);
      const tt = Math.min(1, Math.max(0, (t - shoulderDrop) / Math.max(0.05, sleeveLen - shoulderDrop)));
      const sg = upperArmG + (opening - upperArmG) * tt;
      const e = Math.max(0, (sg - armG) / TAU) * Math.min(1, armF * 1.5 - 0.5);
      x += n[0] * e; y += n[1] * e * 0.3; z += n[2] * e;
      strainArr[v] = sg / armG;
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
    } else if (!isBottom && p[1] > bustY) {
      // above the bust: keep the chest ease proportionally, fading out toward the shoulders
      const ring = ringAt(p[1]);
      const ease = Math.max(th, ((Gc - bustRing.P) / TAU) * Math.max(0, 1 - (p[1] - bustY) / 0.12));
      if (ring.hull.length >= 6) {
        const dx = x - ring.cx, dz = z - ring.cz, r = Math.hypot(dx, dz) || 1e-6;
        const rh = rayHull(ring.hull, ring.cx, ring.cz, dx / r, dz / r);
        const nr = Math.max(r, rh + ease * 0.8);
        x = ring.cx + (dx / r) * nr; z = ring.cz + (dz / r) * nr;
      }
      strainArr[v] = Gc / Math.max(0.3, bustRing.P);
    }
    work.pos[v * 3] = x; work.pos[v * 3 + 1] = y; work.pos[v * 3 + 2] = z;
  }

  // ---------- cone piece (samples the same radius grid, so it joins the upper piece seamlessly)
  if (needsCone) {
    const N = 96;
    const step = 0.01;
    const top = upperBottom;
    const count = Math.max(2, Math.ceil((top - hemY) / step));
    const phase = 0.7;
    const base = work.skin.length;
    const ys: number[] = [];
    for (let L = 0; L <= count; L++) ys.push(top - ((top - hemY) * L) / count);
    // nearest-body-vertex skinning (k nearest, inverse distance) using rest torso/leg vertices
    const cand: number[] = [];
    for (let i = 0; i < nBody; i++) {
      const rg = measurer.regions[i];
      if ((rg === 0 || rg === 2) && rest[i * 3 + 1] < top + 0.08 && rest[i * 3 + 1] > hemY - 0.05) cand.push(i);
    }
    for (let L = 0; L <= count; L++) {
      const y = ys[L];
      const tk = (top - y) / Math.max(1e-6, top - hemY);
      const { ring } = sampleGrid(y, 0);
      const excess = Math.max(0, girthAt(y) / Math.max(0.2, ring.P) - 1);
      // folds grow with excess fabric and drape, fading in from the top edge
      const foldAmp = Math.min(0.07, excess * 0.1 * (0.4 + drape)) * Math.min(1, (top - y) / 0.12);
      for (let b = 0; b < N; b++) {
        const a = (b / N) * TAU;
        const R = sampleGrid(y, a).r;
        const r = R * (1 + foldAmp * Math.sin(a * 9 + phase + tk * 0.8) * (0.6 + 0.4 * Math.sin(a * 4)));
        const x = ACX + Math.sin(a) * r, z = ACZ + Math.cos(a) * r;
        work.pos.push(x, y, z);
        work.nor.push(Math.sin(a), 0, Math.cos(a));
        const best: [number, number][] = [];
        for (const i of cand) {
          const dx = rest[i * 3] - x, dy = rest[i * 3 + 1] - y, dz = rest[i * 3 + 2] - z;
          const d2 = dx * dx + dy * dy * 4 + dz * dz;
          if (best.length < 6 || d2 < best[best.length - 1][0]) {
            best.push([d2, i]);
            best.sort((p, q) => p[0] - q[0]);
            if (best.length > 6) best.pop();
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
        work.skin.push(top4(acc));
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
  }

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
  const outSkI: number[] = [], outSkW: number[] = [];
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
    outSkI.push(...work.skin[v].i);
    outSkW.push(...work.skin[v].w);
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
  return {
    rest: Float32Array.from(outPos),
    skinIdx: Uint16Array.from(outSkI),
    skinW: Float32Array.from(outSkW),
    uv: Float32Array.from(outUV),
    index: Uint32Array.from(outIdx),
    strain: Float32Array.from(outStrain),
    bbox: { minX: bx0, maxX: bx1, minY: by0, maxY: by1 },
    torsoHalfWidth: halfW,
    vertexCount: outStrain.length,
  };
}
