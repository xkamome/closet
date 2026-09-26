// Tape-measure style body measurements taken from the rest (A-pose) mesh.
// Circumferences = convex hull perimeter of a planar slice (how a tape measure bridges concavities).

import type { AvatarData } from "./data";
import type { Body } from "./body";

export interface Measurements {
  height: number; bust: number; underbust: number; waist: number; hips: number;
  shoulder: number; armLength: number; inseam: number; thigh: number; upperArm: number;
  neck: number; backLength: number;
  // landmark heights (cm from floor) used by garments / fit
  bustY: number; waistY: number; hipY: number; crotchY: number; shoulderY: number; neckY: number; kneeY: number;
}

export const MEASURE_LABELS: Record<string, string> = {
  height: "身高", bust: "胸圍", underbust: "下胸圍", waist: "腰圍", hips: "臀圍", shoulder: "肩寬",
  armLength: "臂長", inseam: "跨下長", thigh: "大腿圍", upperArm: "上臂圍", neck: "頸圍", backLength: "背長",
};

export const enum Region { Torso = 0, Arm = 1, Leg = 2, Head = 3 }

export function boneRegion(name: string): Region {
  if (/arm|wrist|finger|metacarpal|shoulder01/.test(name)) return Region.Arm;
  if (/leg|foot|toe/.test(name)) return Region.Leg;
  if (/head|neck|jaw|eye|oculi|orbicularis|oris|levator|risorius|temporalis|tongue|special0[3-6]/.test(name)) return Region.Head;
  return Region.Torso;
}

/** Dominant region per body vertex (by summed skin weight). */
export function vertexRegions(data: AvatarData): Uint8Array {
  const n = data.bodyVertexCount;
  const regionOfBone = data.bones.map((b) => boneRegion(b.name));
  const out = new Uint8Array(n);
  const acc = [0, 0, 0, 0];
  for (let i = 0; i < n; i++) {
    acc.fill(0);
    for (let k = 0; k < 4; k++) acc[regionOfBone[data.body.skinIdx[i * 4 + k]]] += data.body.skinW[i * 4 + k];
    let best = 0;
    for (let r = 1; r < 4; r++) if (acc[r] > acc[best]) best = r;
    out[i] = best;
  }
  return out;
}

/** Triangles of the body (source-vertex indices) where all corners belong to allowed regions. */
export function regionTriangles(data: AvatarData, regions: Uint8Array, allowed: Region[], side = 0): Uint32Array {
  const idx = data.body.index, src = data.body.src;
  const out: number[] = [];
  const base = data.base;
  for (let t = 0; t < idx.length; t += 3) {
    const a = src[idx[t]], b = src[idx[t + 1]], c = src[idx[t + 2]];
    if (!allowed.includes(regions[a]) || !allowed.includes(regions[b]) || !allowed.includes(regions[c])) continue;
    if (side !== 0 && Math.sign(base[a * 3] + base[b * 3] + base[c * 3]) !== side) continue;
    out.push(a, b, c);
  }
  return Uint32Array.from(out);
}

/** Intersect triangles with plane (p, n); return projected 2D points on the plane (u, v basis). */
export function slice(pos: Float32Array, tris: Uint32Array, p: number[], n: number[], u: number[], v: number[]): number[] {
  const pts: number[] = [];
  const d = (i: number) => (pos[i * 3] - p[0]) * n[0] + (pos[i * 3 + 1] - p[1]) * n[1] + (pos[i * 3 + 2] - p[2]) * n[2];
  const push = (i: number, j: number, di: number, dj: number) => {
    const t = di / (di - dj);
    const x = pos[i * 3] + (pos[j * 3] - pos[i * 3]) * t - p[0];
    const y = pos[i * 3 + 1] + (pos[j * 3 + 1] - pos[i * 3 + 1]) * t - p[1];
    const z = pos[i * 3 + 2] + (pos[j * 3 + 2] - pos[i * 3 + 2]) * t - p[2];
    pts.push(x * u[0] + y * u[1] + z * u[2], x * v[0] + y * v[1] + z * v[2]);
  };
  for (let t = 0; t < tris.length; t += 3) {
    const a = tris[t], b = tris[t + 1], c = tris[t + 2];
    const da = d(a), db = d(b), dc = d(c);
    if ((da > 0 && db > 0 && dc > 0) || (da < 0 && db < 0 && dc < 0)) continue;
    if ((da > 0) !== (db > 0)) push(a, b, da, db);
    if ((db > 0) !== (dc > 0)) push(b, c, db, dc);
    if ((dc > 0) !== (da > 0)) push(c, a, dc, da);
  }
  return pts;
}

/** Convex hull (monotone chain) of flat [x0,y0,x1,y1,...]; returns hull as flat array (CCW). */
export function convexHull(flat: number[]): number[] {
  const n = flat.length / 2;
  if (n < 3) return flat.slice();
  const ids = Array.from({ length: n }, (_, i) => i).sort((a, b) => flat[a * 2] - flat[b * 2] || flat[a * 2 + 1] - flat[b * 2 + 1]);
  const cross = (o: number, a: number, b: number) =>
    (flat[a * 2] - flat[o * 2]) * (flat[b * 2 + 1] - flat[o * 2 + 1]) - (flat[a * 2 + 1] - flat[o * 2 + 1]) * (flat[b * 2] - flat[o * 2]);
  const lower: number[] = [], upper: number[] = [];
  for (const i of ids) {
    while (lower.length >= 2 && cross(lower[lower.length - 2], lower[lower.length - 1], i) <= 0) lower.pop();
    lower.push(i);
  }
  for (let k = ids.length - 1; k >= 0; k--) {
    const i = ids[k];
    while (upper.length >= 2 && cross(upper[upper.length - 2], upper[upper.length - 1], i) <= 0) upper.pop();
    upper.push(i);
  }
  const hull = lower.slice(0, -1).concat(upper.slice(0, -1));
  return hull.flatMap((i) => [flat[i * 2], flat[i * 2 + 1]]);
}

export function perimeter(poly: number[]): number {
  let s = 0;
  const n = poly.length / 2;
  for (let i = 0; i < n; i++) {
    const j = (i + 1) % n;
    s += Math.hypot(poly[j * 2] - poly[i * 2], poly[j * 2 + 1] - poly[i * 2 + 1]);
  }
  return s;
}

const Y = [0, 1, 0], X = [1, 0, 0], Z = [0, 0, 1];

/** Measures a Body; caches the per-region triangle lists (they don't change with morphs). */
export class BodyMeasurer {
  readonly regions: Uint8Array;
  readonly torso: Uint32Array;
  readonly torsoLegs: Uint32Array;
  readonly legL: Uint32Array;
  readonly armL: Uint32Array;
  readonly head: Uint32Array;
  constructor(readonly data: AvatarData) {
    this.regions = vertexRegions(data);
    this.torso = regionTriangles(data, this.regions, [Region.Torso]);
    this.torsoLegs = regionTriangles(data, this.regions, [Region.Torso, Region.Leg]);
    this.legL = regionTriangles(data, this.regions, [Region.Leg], 1);
    this.armL = regionTriangles(data, this.regions, [Region.Arm], 1);
    this.head = regionTriangles(data, this.regions, [Region.Head, Region.Torso]);
  }

  /** Circumference (m) of a horizontal slice at height y (rest coordinates). */
  ringAt(pos: Float32Array, tris: Uint32Array, y: number): number {
    const pts = slice(pos, tris, [0, y, 0], Y, X, Z);
    return pts.length < 6 ? 0 : perimeter(convexHull(pts));
  }

  hullAt(pos: Float32Array, tris: Uint32Array, y: number): number[] {
    return convexHull(slice(pos, tris, [0, y, 0], Y, X, Z));
  }

  /** Triangles whose vertical extent overlaps [y0, y1] — keeps band scans cheap. */
  bandTris(pos: Float32Array, tris: Uint32Array, y0: number, y1: number): Uint32Array {
    const out: number[] = [];
    for (let t = 0; t < tris.length; t += 3) {
      const a = pos[tris[t] * 3 + 1], b = pos[tris[t + 1] * 3 + 1], c = pos[tris[t + 2] * 3 + 1];
      if (Math.max(a, b, c) >= y0 && Math.min(a, b, c) <= y1) out.push(tris[t], tris[t + 1], tris[t + 2]);
    }
    return Uint32Array.from(out);
  }

  private extreme(pos: Float32Array, allTris: Uint32Array, y0: number, y1: number, max: boolean, step = 0.004): [number, number] {
    const tris = this.bandTris(pos, allTris, y0, y1);
    let best = max ? -Infinity : Infinity, bestY = y0;
    for (let y = y0; y <= y1 + 1e-9; y += step) {
      const c = this.ringAt(pos, tris, y);
      if (c === 0) continue;
      if (max ? c > best : c < best) { best = c; bestY = y; }
    }
    return [best, bestY];
  }

  measure(body: Body): Measurements {
    const pos = body.rest;
    const n = this.data.bodyVertexCount;
    let minY = Infinity, maxY = -Infinity;
    for (let i = 0; i < n; i++) {
      const y = pos[i * 3 + 1];
      if (y < minY) minY = y;
      if (y > maxY) maxY = y;
    }
    const J = (name: string) => body.joint(name);
    const bodyH = maxY - minY;
    const nip = J("breast.L____tail");
    const hipJ = J("upperleg01.L____head");
    const neckBase = J("neck01____head");
    const shL = J("shoulder01.L____head");
    const humL = J("upperarm01.L____head"), humR = J("upperarm01.R____head");
    const elbow = J("lowerarm01.L____head"), wrist = J("wrist.L____head");
    const upperArmHead = humL;
    // deltoid breadth: widest non-head vertex around shoulder height
    let deltoid = 0;
    for (let i = 0; i < n; i++) {
      if (this.regions[i] !== Region.Head && Math.abs(pos[i * 3 + 1] - shL.y) < 0.01) deltoid = Math.max(deltoid, Math.abs(pos[i * 3]));
    }
    const knee = J("lowerleg01.L____head");

    // crotch: lowest torso vertex near the mid-sagittal plane
    let crotchY = Infinity;
    for (let i = 0; i < n; i++) {
      if (this.regions[i] === Region.Torso && Math.abs(pos[i * 3]) < 0.02) crotchY = Math.min(crotchY, pos[i * 3 + 1]);
    }

    const [bust, bustY] = this.extreme(pos, this.torso, nip.y - 0.03, nip.y + 0.02, true);
    const underbust = this.ringAt(pos, this.torso, nip.y - 0.075 * (bodyH / 1.6));
    const [waist, waistY] = this.extreme(pos, this.torso, hipJ.y + 0.07, nip.y - 0.1, false);
    const [hips, hipY] = this.extreme(pos, this.torsoLegs, crotchY + 0.02, waistY - 0.06, true);
    const thigh = this.ringAt(pos, this.legL, crotchY - 0.025);
    const [neck] = this.extreme(pos, this.head, neckBase.y + 0.005, neckBase.y + 0.05, false);

    // upper arm girth: plane perpendicular to the upper arm at its middle
    const ax = [elbow.x - upperArmHead.x, elbow.y - upperArmHead.y, elbow.z - upperArmHead.z];
    const al = Math.hypot(ax[0], ax[1], ax[2]);
    const an = ax.map((c) => c / al);
    const u = normalize(cross(an, Z)), v = cross(an, u);
    const mid = [upperArmHead.x + ax[0] * 0.45, upperArmHead.y + ax[1] * 0.45, upperArmHead.z + ax[2] * 0.45];
    const armPts = slice(pos, this.armL, mid, an, u, v);
    const upperArm = armPts.length >= 6 ? perimeter(convexHull(armPts)) : 0;

    const cm = (m: number) => Math.round(m * 1000) / 10;
    return {
      height: cm(maxY - minY),
      bust: cm(bust),
      underbust: cm(underbust),
      waist: cm(waist),
      hips: cm(hips),
      // garment shoulder width (acromion to acromion) ≈ between humeral-head spacing and deltoid breadth
      shoulder: cm((humL.distanceTo(humR) + deltoid * 2) / 2),
      armLength: cm(humL.distanceTo(elbow) + elbow.distanceTo(wrist) + 0.03),
      inseam: cm(crotchY - minY),
      thigh: cm(thigh),
      upperArm: cm(upperArm),
      neck: cm(neck),
      backLength: cm(neckBase.y - waistY),
      bustY: cm(bustY - minY), waistY: cm(waistY - minY), hipY: cm(hipY - minY), crotchY: cm(crotchY - minY),
      shoulderY: cm(shL.y - minY), neckY: cm(neckBase.y - minY), kneeY: cm(knee.y - minY),
    };
  }
}

function cross(a: number[], b: number[]): number[] {
  return [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
}
function normalize(a: number[]): number[] {
  const l = Math.hypot(a[0], a[1], a[2]) || 1;
  return [a[0] / l, a[1] / l, a[2] / l];
}
