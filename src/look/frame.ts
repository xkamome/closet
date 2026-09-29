// Body frame for the "look" renderer: landmarks and horizontal cross-sections of the POSED body
// (world metres, figure facing +z, +x = figure's left = screen right in the front view).
// Garments are built around these sections, so everything the garment knows about the body is here.

import { Vector3 } from "three";
import { computeNormals, type Body } from "../avatar/body";
import { convexHull, perimeter, regionTriangles, slice, Region, type BodyMeasurer, type Measurements } from "../avatar/measure";

export type P2 = [number, number];
export type P3 = [number, number, number];

/** Convex cross-section as front chain and back chain over x (both sorted by x, same x samples). */
export interface Section {
  y: number;
  xl: number; xr: number; // x extent
  /** sampled at N uniform x in [xl, xr] */
  front: Float32Array; // z of front surface
  back: Float32Array; // z of back surface
  girth: number;
}

export const SEC_N = 48;

export interface ArmChain {
  shoulder: Vector3; elbow: Vector3; wrist: Vector3; hand: Vector3;
  /** arm radius (m) at fraction t of shoulder->wrist length */
  radius: (t: number) => number;
  length: number;
}

export interface BodyFrame {
  body: Body;
  m: Measurements;
  /** posed heights (m) */
  y: { neck: number; shoulder: number; armpit: number; bust: number; underbust: number; waist: number; hip: number; crotch: number; knee: number; ankle: number; top: number };
  neck: Vector3; // neck base (centre)
  neckR: number;
  /** body top contour (front view): highest body point (not head) near x */
  topY: (x: number) => number;
  /** torso front/back sections: torso only (arms excluded) limited to |x| <= xlim */
  torsoSection: (y: number, xlim?: number) => Section | null;
  /** torso + shoulder caps limited to |x| <= xlim (the yoke of a top, above the armpit) */
  yokeSection: (y: number, xlim: number) => Section | null;
  /** hull of torso + both legs (for skirts / dresses below the hip) */
  lowerSection: (y: number) => Section | null;
  /** hull of one leg (side +1 = figure's left) */
  legSection: (y: number, side: 1 | -1) => Section | null;
  arms: { L: ArmChain; R: ArmChain };
  /** posed joints: shoulder / elbow / wrist / hip / knee / ankle, L and R */
  joints: Record<string, Vector3>;
  /** body surface depth seen from the front (max z) / back (min z) at (x, y); arms below the shoulder excluded */
  /** z where front meets back on top of the body at x (shoulder seam line) */
  ridgeZ: (x: number) => number;
  frontDepth: (x: number, y: number) => number;
  backDepth: (x: number, y: number) => number;
  /** arm vertices (incl. the shoulder cap) per side, for sleeve collisions: xyz and normals */
  armVerts: { L: { pos: Float32Array; normals: Float32Array; count: number }; R: { pos: Float32Array; normals: Float32Array; count: number } };
  /** posed body positions (body vertices) and vertex normals */
  pos: Float32Array;
  normals: Float32Array;
  /** figure centre z of the torso at waist height */
  cz: number;
}

/** Build a section from hull points (x,z flat) sampled at SEC_N x positions. */
export function sectionFromHull(y: number, hull: number[]): Section | null {
  const n = hull.length / 2;
  if (n < 3) return null;
  let xl = Infinity, xr = -Infinity;
  for (let i = 0; i < n; i++) { xl = Math.min(xl, hull[i * 2]); xr = Math.max(xr, hull[i * 2]); }
  if (xr - xl < 1e-4) return null;
  const front = new Float32Array(SEC_N), back = new Float32Array(SEC_N);
  for (let k = 0; k < SEC_N; k++) {
    const x = xl + ((xr - xl) * k) / (SEC_N - 1);
    let zmin = Infinity, zmax = -Infinity;
    for (let i = 0; i < n; i++) {
      const j = (i + 1) % n;
      const ax = hull[i * 2], az = hull[i * 2 + 1], bx = hull[j * 2], bz = hull[j * 2 + 1];
      const lo = Math.min(ax, bx), hi = Math.max(ax, bx);
      if (x < lo - 1e-9 || x > hi + 1e-9) continue;
      const z = hi - lo < 1e-9 ? (az + bz) / 2 : az + ((bz - az) * (x - ax)) / (bx - ax);
      zmin = Math.min(zmin, z, hi - lo < 1e-9 ? Math.min(az, bz) : z);
      zmax = Math.max(zmax, z, hi - lo < 1e-9 ? Math.max(az, bz) : z);
    }
    if (!Number.isFinite(zmin)) { zmin = zmax = 0; }
    front[k] = zmax; back[k] = zmin;
  }
  return { y, xl, xr, front, back, girth: perimeter(hull) };
}

/** z of a section chain at x (clamped to the extent). */
export function chainAt(s: Section, chain: Float32Array, x: number): number {
  const t = ((x - s.xl) / (s.xr - s.xl)) * (SEC_N - 1);
  if (t <= 0) return chain[0];
  if (t >= SEC_N - 1) return chain[SEC_N - 1];
  const i = Math.floor(t), f = t - i;
  return chain[i] * (1 - f) + chain[i + 1] * f;
}

export function sectionPerimeter(s: Section): number {
  let p = 0;
  const dx = (s.xr - s.xl) / (SEC_N - 1);
  for (let k = 0; k < SEC_N - 1; k++) {
    p += Math.hypot(dx, s.front[k + 1] - s.front[k]) + Math.hypot(dx, s.back[k + 1] - s.back[k]);
  }
  return p + Math.abs(s.front[0] - s.back[0]) + Math.abs(s.front[SEC_N - 1] - s.back[SEC_N - 1]);
}

export function buildFrame(body: Body, measurer: BodyMeasurer, m: Measurements, pos: Float32Array): BodyFrame {
  const data = body.data;
  const n = data.bodyVertexCount;
  const regions = measurer.regions;
  const bp = (name: string) => body.bonePosed(name);
  // arm triangles without the shoulder cap (shoulder01 counts as arm in the measurer)
  // garment regions: the neck's skin weights spread onto the upper chest and the shoulder bones onto
  // the pectorals, so "head" and shoulder-cap vertices count as torso for garments
  const boneIsCap = data.bones.map((b) => /shoulder01|clavicle/.test(b.name));
  const isCap = new Uint8Array(n);
  for (let v = 0; v < n; v++) {
    let w = 0;
    for (let k = 0; k < 4; k++) if (boneIsCap[data.body.skinIdx[v * 4 + k]]) w += data.body.skinW[v * 4 + k];
    isCap[v] = w > 0.5 ? 1 : 0;
  }
  const gRegions = new Uint8Array(n);
  for (let v = 0; v < n; v++) gRegions[v] = regions[v] === Region.Arm && isCap[v] ? Region.Torso : regions[v] === Region.Head ? Region.Torso : regions[v];
  const torsoTris = regionTriangles(data, gRegions, [Region.Torso]);
  const torsoLegs = regionTriangles(data, gRegions, [Region.Torso, Region.Leg]);
  const torsoArm = regionTriangles(data, gRegions, [Region.Torso, Region.Arm]);

  let minY = Infinity, maxY = -Infinity;
  for (let i = 0; i < n; i++) { minY = Math.min(minY, pos[i * 3 + 1]); maxY = Math.max(maxY, pos[i * 3 + 1]); }
  // rest heights (cm above the lowest rest vertex) -> posed heights via the pelvis offset (standing poses
  // keep the torso upright, so a constant shift is exact enough)
  let restMin = Infinity;
  for (let i = 0; i < n; i++) restMin = Math.min(restMin, body.rest[i * 3 + 1]);
  const pelvisRest = body.joint("spine05____head").y - restMin;
  const pelvisPosed = bp("spine05").y;
  const shift = pelvisPosed - pelvisRest;
  const Y = (cm: number) => cm / 100 + shift;

  const neck = bp("neck01");
  const neckR = m.neck / 100 / (2 * Math.PI);

  // top contour: highest torso/arm vertex per 5 mm x-bin, below the neck base + 6 cm
  const BIN = 0.005, OFF = 0.5;
  const top = new Float32Array(Math.round((OFF * 2) / BIN) + 1).fill(-1);
  for (let i = 0; i < n; i++) {
    if (regions[i] === Region.Head || regions[i] === Region.Leg) continue;
    const x = pos[i * 3], y = pos[i * 3 + 1];
    if (y > neck.y + 0.06) continue;
    const b = Math.round((x + OFF) / BIN);
    if (b >= 0 && b < top.length && y > top[b]) top[b] = y;
  }
  // fill empty bins by neighbours
  for (let pass = 0; pass < 4; pass++) for (let b = 1; b < top.length - 1; b++) if (top[b] < 0) top[b] = Math.max(top[b - 1], top[b + 1]);
  const topY = (x: number) => {
    const t = (x + OFF) / BIN;
    const i = Math.max(0, Math.min(top.length - 2, Math.floor(t))), f = Math.max(0, Math.min(1, t - i));
    return top[i] * (1 - f) + top[i + 1] * f;
  };

  const sec = (tris: Uint32Array, y: number, xlim = Infinity, side = 0) => {
    let pts = slice(pos, tris, [0, y, 0], [0, 1, 0], [1, 0, 0], [0, 0, 1]);
    if (xlim < Infinity || side) {
      const f: number[] = [];
      for (let i = 0; i < pts.length; i += 2) if (Math.abs(pts[i]) <= xlim && pts[i] * side >= 0) f.push(pts[i], pts[i + 1]);
      pts = f;
    }
    if (pts.length < 6) return null;
    return sectionFromHull(y, convexHull(pts));
  };

  // armpit: highest y where torso and (left) arm are separated by a visible gap in the front view
  const armMinX = (y: number) => {
    let mn = Infinity;
    for (let i = 0; i < n; i++) {
      if (regions[i] !== Region.Arm || pos[i * 3] < 0.02) continue;
      if (Math.abs(pos[i * 3 + 1] - y) < 0.004) mn = Math.min(mn, pos[i * 3]);
    }
    return mn;
  };
  const shL = bp("upperarm01.L");
  let armpit = shL.y - 0.06;
  for (let y = shL.y - 0.02; y > shL.y - 0.25; y -= 0.004) {
    const s = sec(torsoTris, y);
    if (!s) continue;
    if (armMinX(y) - s.xr > 0.004) { armpit = y; break; }
  }

  const arm = (s: "L" | "R"): ArmChain => {
    const shoulder = bp(`upperarm01.${s}`), elbow = bp(`lowerarm01.${s}`), wrist = bp(`wrist.${s}`);
    const hand = bp(`finger3-3.${s}`);
    const L = shoulder.distanceTo(elbow) + elbow.distanceTo(wrist);
    const tris = regionTriangles(data, regions, [Region.Arm], s === "L" ? 1 : -1);
    const samples: number[] = [];
    for (let k = 0; k <= 10; k++) {
      const t = k / 10;
      const d = t * L;
      const a = d < shoulder.distanceTo(elbow) ? shoulder : elbow;
      const b = d < shoulder.distanceTo(elbow) ? elbow : wrist;
      const seg = b.clone().sub(a);
      const f = d < shoulder.distanceTo(elbow) ? d / seg.length() : (d - shoulder.distanceTo(elbow)) / seg.length();
      const p = a.clone().addScaledVector(seg, Math.min(1, f));
      const nn = seg.clone().normalize();
      const u = new Vector3(0, 0, 1).cross(nn).normalize();
      const v = nn.clone().cross(u);
      const pts = slice(pos, tris, [p.x, p.y, p.z], [nn.x, nn.y, nn.z], [u.x, u.y, u.z], [v.x, v.y, v.z]);
      // keep only points near the axis (the plane can also cut the torso or the other segment)
      const near: number[] = [];
      for (let i = 0; i < pts.length; i += 2) if (Math.hypot(pts[i], pts[i + 1]) < 0.08) near.push(pts[i], pts[i + 1]);
      samples.push(near.length >= 6 ? perimeter(convexHull(near)) / (2 * Math.PI) : NaN);
    }
    for (let k = 0; k <= 10; k++) if (!Number.isFinite(samples[k])) samples[k] = samples[k - 1] ?? 0.04;
    return {
      shoulder, elbow, wrist, hand, length: L,
      radius: (t: number) => {
        const tt = Math.max(0, Math.min(1, t)) * 10, i = Math.min(9, Math.floor(tt));
        return samples[i] + (samples[i + 1] - samples[i]) * (tt - i);
      },
    };
  };

  const armpitY = armpit;
  // depth maps (4 mm cells) of everything a garment panel must stay outside of
  const CELL = 0.004, X0 = -0.45, NX = 226, NY = Math.ceil((maxY + 0.05) / CELL);
  const dF = new Float32Array(NX * NY).fill(-Infinity), dB = new Float32Array(NX * NY).fill(Infinity);
  {
    const idx = data.body.index, src = data.body.src;
    // arms count only above the armpit (deltoids are under the garment's shoulders)
    const armTop = armpitY + 0.01;
    for (let t = 0; t < idx.length; t += 3) {
      const a = src[idx[t]], b = src[idx[t + 1]], c = src[idx[t + 2]];
      if ([a, b, c].some((v) => gRegions[v] === Region.Arm && pos[v * 3 + 1] < armTop)) continue;
      const ax = pos[a * 3], ay = pos[a * 3 + 1], az = pos[a * 3 + 2];
      const bx = pos[b * 3], by = pos[b * 3 + 1], bz = pos[b * 3 + 2];
      const cx = pos[c * 3], cy = pos[c * 3 + 1], cz2 = pos[c * 3 + 2];
      const d = (by - cy) * (ax - cx) + (cx - bx) * (ay - cy);
      if (Math.abs(d) < 1e-14) continue;
      const gx0 = Math.max(0, Math.floor((Math.min(ax, bx, cx) - X0) / CELL)), gx1 = Math.min(NX - 1, Math.ceil((Math.max(ax, bx, cx) - X0) / CELL));
      const gy0 = Math.max(0, Math.floor(Math.min(ay, by, cy) / CELL)), gy1 = Math.min(NY - 1, Math.ceil(Math.max(ay, by, cy) / CELL));
      for (let gy = gy0; gy <= gy1; gy++) for (let gx = gx0; gx <= gx1; gx++) {
        const x = X0 + gx * CELL, y = gy * CELL;
        const l1 = ((by - cy) * (x - cx) + (cx - bx) * (y - cy)) / d;
        const l2 = ((cy - ay) * (x - cx) + (ax - cx) * (y - cy)) / d;
        const l3 = 1 - l1 - l2;
        if (l1 < -0.02 || l2 < -0.02 || l3 < -0.02) continue;
        const z = l1 * az + l2 * bz + l3 * cz2;
        const k = gy * NX + gx;
        if (z > dF[k]) dF[k] = z;
        if (z < dB[k]) dB[k] = z;
      }
    }
  }
  // cloth bridges hollows (between the breasts, above the collarbones): grayscale closing of the
  // depth maps with a ~2.4 cm square keeps convex shapes and fills narrower concavities
  const close = (map: Float32Array, front: boolean, r: number): Float32Array => {
    const hi = front ? Math.max : Math.min, lo = front ? Math.min : Math.max;
    const empty = front ? -Infinity : Infinity;
    const pass = (src: Float32Array, f: (a: number, b: number) => number, horiz: boolean, keepEmpty: boolean) => {
      const out = new Float32Array(src.length);
      for (let yy = 0; yy < NY; yy++) for (let xx = 0; xx < NX; xx++) {
        const k = yy * NX + xx;
        if (keepEmpty && src[k] === empty) { out[k] = empty; continue; }
        let v = src[k];
        for (let d = -r; d <= r; d++) {
          const X = horiz ? xx + d : xx, Yy = horiz ? yy : yy + d;
          if (X < 0 || Yy < 0 || X >= NX || Yy >= NY) continue;
          const w = src[Yy * NX + X];
          if (w === empty) continue;
          v = v === empty ? w : f(v, w);
        }
        out[k] = v;
      }
      return out;
    };
    const dil = pass(pass(map, hi, true, false), hi, false, false);
    const ero = pass(pass(dil, lo, true, false), lo, false, false);
    // only where the body actually is (closing must not grow the silhouette)
    for (let k = 0; k < ero.length; k++) if (map[k] === empty) ero[k] = empty;
    return ero;
  };
  const cF = close(dF, true, 3), cB = close(dB, false, 3);
  const depthAt = (map: Float32Array, x: number, y: number, front: boolean) => {
    const fx = (x - X0) / CELL, fy = y / CELL;
    const gx = Math.floor(fx), gy = Math.floor(fy);
    let best = front ? -Infinity : Infinity;
    // conservative: extreme of the 3x3 neighbourhood (steep places like the side of the neck change
    // faster than one cell)
    for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) {
      const X = gx + dx, Yy = gy + dy;
      if (X < 0 || Yy < 0 || X >= NX || Yy >= NY) continue;
      const v = map[Yy * NX + X];
      best = front ? Math.max(best, v) : Math.min(best, v);
    }
    return best;
  };

  const waistSec = sec(torsoTris, Y(m.waistY));
  const cz = waistSec ? (chainAt(waistSec, waistSec.front, 0) + chainAt(waistSec, waistSec.back, 0)) / 2 : 0;

  const srcIndex = new Uint32Array(data.body.index.length);
  for (let i = 0; i < srcIndex.length; i++) srcIndex[i] = data.body.src[data.body.index[i]];
  const normals = computeNormals(pos, srcIndex, n);
  const armSet = (side: 1 | -1) => {
    const ids: number[] = [];
    for (let v = 0; v < n; v++) if ((regions[v] === Region.Arm || isCap[v]) && pos[v * 3] * side > 0.05) ids.push(v);
    const P = new Float32Array(ids.length * 3), N = new Float32Array(ids.length * 3);
    ids.forEach((v, k) => { for (let c = 0; c < 3; c++) { P[k * 3 + c] = pos[v * 3 + c]; N[k * 3 + c] = normals[v * 3 + c]; } });
    return { pos: P, normals: N, count: ids.length };
  };

  return {
    body, m, pos, normals, neck, neckR, topY, cz,
    y: {
      neck: neck.y, shoulder: topY(m.shoulder / 200), armpit, bust: Y(m.bustY), underbust: Y(m.bustY) - 0.075 * (m.height / 160),
      waist: Y(m.waistY), hip: Y(m.hipY), crotch: Y(m.crotchY), knee: Y(m.kneeY), ankle: bp("foot.L").y, top: maxY,
    },
    torsoSection: (y, xlim) => sec(torsoTris, y, xlim),
    yokeSection: (y, xlim) => sec(torsoArm, y, xlim),
    lowerSection: (y) => sec(torsoLegs, y),
    legSection: (y, side) => sec(torsoLegs, y, Infinity, side),
    arms: { L: arm("L"), R: arm("R") },
    joints: Object.fromEntries(([["shoulder", "upperarm01"], ["elbow", "lowerarm01"], ["wrist", "wrist"], ["hip", "upperleg01"], ["knee", "lowerleg01"], ["ankle", "foot"]] as const)
      .flatMap(([k, b]) => (["L", "R"] as const).map((sd) => [k + sd, bp(`${b}.${sd}`)]))),
    ridgeZ: (x) => {
      const gx = Math.max(0, Math.min(NX - 1, Math.round((x - X0) / CELL)));
      for (let gy = NY - 1; gy >= 0; gy--) {
        const k = gy * NX + gx;
        if (dF[k] !== -Infinity && gy * CELL < neck.y + 0.03) {
          // average a few cells below the top: the ridge of the shoulder
          let f = 0, b = 0, c = 0;
          for (let d = 0; d < 3 && gy - d >= 0; d++) {
            const kk = (gy - d) * NX + gx;
            if (dF[kk] === -Infinity) continue;
            f += dF[kk]; b += dB[kk]; c++;
          }
          return (f + b) / 2 / c;
        }
      }
      return neck.z;
    },
    armVerts: { L: armSet(1), R: armSet(-1) },
    frontDepth: (x, y) => depthAt(cF, x, y, true),
    backDepth: (x, y) => depthAt(cB, x, y, false),
  };
}
