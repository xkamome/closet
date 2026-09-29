// Body model: morphs -> rest mesh -> skeleton (rebuilt from joint helpers) -> CPU skinning.
// Mirrors MakeHuman 1.x skeleton maths (shared/skeleton.py getMatrix / get_normal / Bone.update).

import { Matrix4, Quaternion, Vector3 } from "three";
import type { AvatarData, ProxyData } from "./data";

export type MorphValues = Record<string, number>; // key without +/- suffix, value in [-1, 1]
export type PoseQuats = Record<string, [number, number, number, number]>;

const _v1 = new Vector3(), _v2 = new Vector3(), _v3 = new Vector3();

export class Body {
  readonly data: AvatarData;
  readonly rest: Float32Array;
  readonly jointPos: Float32Array;
  readonly restGlobal: Matrix4[];
  readonly restInv: Matrix4[];
  readonly restRelative: Matrix4[];
  readonly poseGlobal: Matrix4[];
  readonly skinMats: Float32Array;
  readonly boneIndex = new Map<string, number>();
  morphValues: MorphValues = {};
  pose: PoseQuats = {};
  /** translation applied after skinning so the lowest point touches y = 0 and the pelvis is centred */
  readonly offset = new Vector3();

  constructor(data: AvatarData) {
    this.data = data;
    this.rest = new Float32Array(data.base.length);
    this.jointPos = new Float32Array(data.joints.length * 3);
    const nb = data.bones.length;
    const mk = () => Array.from({ length: nb }, () => new Matrix4());
    this.restGlobal = mk();
    this.restInv = mk();
    this.restRelative = mk();
    this.poseGlobal = mk();
    this.skinMats = new Float32Array(nb * 16);
    data.bones.forEach((b, i) => this.boneIndex.set(b.name, i));
    this.setMorphs({});
  }

  /** Apply morph values (key -> [-1,1]); rebuilds rest mesh, joints and bone rest matrices. */
  setMorphs(values: MorphValues): void {
    this.morphValues = { ...values };
    const rest = this.rest;
    rest.set(this.data.base);
    for (const [key, raw] of Object.entries(values)) {
      if (!raw) continue;
      const m = this.data.morphs.get(key + (raw > 0 ? "+" : "-")) ?? (raw > 0 ? this.data.morphs.get(key) : undefined);
      if (!m) continue;
      const w = Math.abs(raw);
      const { idx, delta } = m;
      for (let i = 0; i < idx.length; i++) {
        const o = idx[i] * 3, d = i * 3;
        rest[o] += delta[d] * w;
        rest[o + 1] += delta[d + 1] * w;
        rest[o + 2] += delta[d + 2] * w;
      }
    }
    this.shapeBust();
    this.smoothNipples();
    this.updateSkeleton();
  }

  private bustRegion: { verts: number[]; w: Float32Array; side: Int8Array } | null = null;
  /**
   * Bra shaping (the mannequin always wears one): breasts lifted a little and gathered toward the
   * centre, so tops and underwear show a supported, rounded bust instead of a drooping one.
   */
  private shapeBust(): void {
    const d = this.data, rest = this.rest;
    const J = (n: string) => {
      const j = d.jointNames.indexOf(n);
      if (j < 0) return null;
      let x = 0, y = 0, z = 0;
      for (const v of d.joints[j]) { x += rest[v * 3]; y += rest[v * 3 + 1]; z += rest[v * 3 + 2]; }
      const k = d.joints[j].length;
      return [x / k, y / k, z / k];
    };
    const cL = J("breast.L____tail"), cR = J("breast.R____tail");
    if (!cL || !cR) return;
    const R = 0.085;
    if (!this.bustRegion) {
      const verts: number[] = [], w: number[] = [], side: number[] = [];
      for (let i = 0; i < d.bodyVertexCount; i++) {
        const x = d.base[i * 3];
        // front of the chest only
        if (d.base[i * 3 + 2] < 0) continue;
        verts.push(i); side.push(x >= 0 ? 1 : -1); w.push(0);
      }
      this.bustRegion = { verts, w: Float32Array.from(w), side: Int8Array.from(side) };
    }
    const { verts, side } = this.bustRegion;
    // the breast size decides how much there is to lift and gather
    const depth = Math.max(0, (cL[2] + cR[2]) / 2);
    const k = Math.min(1, depth / 0.12);
    verts.forEach((i, n) => {
      const c = side[n] > 0 ? cL : cR;
      const dx = rest[i * 3] - c[0], dy = rest[i * 3 + 1] - c[1], dz = rest[i * 3 + 2] - c[2];
      const dist = Math.hypot(dx, dy * 0.9, dz * 0.7);
      if (dist > R) return;
      const t = 1 - dist / R;
      const f = t * t * (3 - 2 * t) * k;
      // up 1.2 cm, toward the centre 0.9 cm (never across it), slightly forward for roundness
      rest[i * 3 + 1] += 0.012 * f;
      const x = rest[i * 3];
      rest[i * 3] = x - Math.sign(x) * Math.min(Math.abs(x) * 0.5, 0.009 * f);
      rest[i * 3 + 2] += 0.003 * f;
    });
  }

  private nippleRegion: { verts: number[]; nbrs: number[][] } | null = null;
  /** Mannequin finish: flatten the nipple area completely so garments drape cleanly over the bust. */
  private smoothNipples(): void {
    const d = this.data, rest = this.rest;
    if (!this.nippleRegion) {
      const centers = ["breast.L____tail", "breast.R____tail"].map((n) => d.jointNames.indexOf(n)).filter((j) => j >= 0)
        .map((j) => d.joints[j]);
      const set = new Set<number>();
      for (const vs of centers) {
        let cx = 0, cy = 0, cz = 0;
        for (const v of vs) { cx += d.base[v * 3]; cy += d.base[v * 3 + 1]; cz += d.base[v * 3 + 2]; }
        cx /= vs.length; cy /= vs.length; cz /= vs.length;
        for (let i = 0; i < d.bodyVertexCount; i++) {
          if (Math.hypot(d.base[i * 3] - cx, d.base[i * 3 + 1] - cy, d.base[i * 3 + 2] - cz) < 0.03) set.add(i);
        }
      }
      const verts = [...set];
      const nb = new Map<number, Set<number>>(verts.map((v) => [v, new Set<number>()]));
      const idx = d.body.index, src = d.body.src;
      for (let t = 0; t < idx.length; t += 3) {
        const tri = [src[idx[t]], src[idx[t + 1]], src[idx[t + 2]]];
        for (const a of tri) if (nb.has(a)) for (const b of tri) if (b !== a) nb.get(a)!.add(b);
      }
      this.nippleRegion = { verts, nbrs: verts.map((v) => [...nb.get(v)!]) };
    }
    const { verts, nbrs } = this.nippleRegion;
    const tmp = new Float32Array(verts.length * 3);
    for (let it = 0; it < 20; it++) {
      verts.forEach((v, k) => {
        let x = 0, y = 0, z = 0;
        for (const u of nbrs[k]) { x += rest[u * 3]; y += rest[u * 3 + 1]; z += rest[u * 3 + 2]; }
        const n = nbrs[k].length || 1;
        tmp[k * 3] = (rest[v * 3] + x / n) / 2; tmp[k * 3 + 1] = (rest[v * 3 + 1] + y / n) / 2; tmp[k * 3 + 2] = (rest[v * 3 + 2] + z / n) / 2;
      });
      verts.forEach((v, k) => { rest[v * 3] = tmp[k * 3]; rest[v * 3 + 1] = tmp[k * 3 + 1]; rest[v * 3 + 2] = tmp[k * 3 + 2]; });
    }
    this.roundApex();
  }

  /**
   * Replace the conical breast tip by a dome: fit a sphere to the surface around each apex and move
   * the vertices near the tip onto it (blended toward the edge), like a moulded bra cup.
   */
  private roundApex(): void {
    const d = this.data, rest = this.rest, R = 0.075;
    for (const s of [1, -1]) {
      // apex = the most forward vertex on this side of the chest, between shoulders and waist
      let apex = -1, best = -Infinity;
      const nip = d.jointNames.indexOf(s > 0 ? "breast.L____tail" : "breast.R____tail");
      if (nip < 0) continue;
      let ny = 0;
      for (const v of d.joints[nip]) ny += rest[v * 3 + 1];
      ny /= d.joints[nip].length;
      for (let i = 0; i < d.bodyVertexCount; i++) {
        if (rest[i * 3] * s < 0.02 || Math.abs(rest[i * 3 + 1] - ny) > 0.06) continue;
        if (rest[i * 3 + 2] > best) { best = rest[i * 3 + 2]; apex = i; }
      }
      if (apex < 0) continue;
      const ax = rest[apex * 3], ay = rest[apex * 3 + 1], az = rest[apex * 3 + 2];
      const near: number[] = [];
      for (let i = 0; i < d.bodyVertexCount; i++) {
        const dx = rest[i * 3] - ax, dy = rest[i * 3 + 1] - ay, dz = rest[i * 3 + 2] - az;
        if (dx * dx + dy * dy + dz * dz < R * R && rest[i * 3] * s > 0) near.push(i);
      }
      // algebraic sphere fit to the ring 0.55R..R (the part of the breast that is already round)
      const A: number[][] = [], b: number[] = [];
      for (const i of near) {
        const x = rest[i * 3], y = rest[i * 3 + 1], z = rest[i * 3 + 2];
        const r = Math.hypot(x - ax, y - ay, z - az);
        if (r < 0.55 * R) continue;
        A.push([x, y, z, 1]); b.push(x * x + y * y + z * z);
      }
      if (A.length < 12) continue;
      const sol = leastSquares4(A, b);
      if (!sol) continue;
      const cx = sol[0] / 2, cy = sol[1] / 2, cz = sol[2] / 2;
      const rad = Math.sqrt(Math.max(0, sol[3] + cx * cx + cy * cy + cz * cz));
      if (!(rad > 0.03 && rad < 0.2)) continue;
      for (const i of near) {
        const x = rest[i * 3], y = rest[i * 3 + 1], z = rest[i * 3 + 2];
        const r = Math.hypot(x - ax, y - ay, z - az);
        // full dome in the middle, blending out toward the edge of the breast
        const t = Math.min(1, (1 - r / R) * 1.6), w = t * t * (3 - 2 * t);
        const vx = x - cx, vy = y - cy, vz = z - cz, l = Math.hypot(vx, vy, vz) || 1;
        rest[i * 3] = x + (cx + (vx / l) * rad - x) * w;
        rest[i * 3 + 1] = y + (cy + (vy / l) * rad - y) * w;
        rest[i * 3 + 2] = z + (cz + (vz / l) * rad - z) * w;
      }
    }
  }

  private updateSkeleton(): void {
    const { joints, bones } = this.data;
    const jp = this.jointPos, rest = this.rest;
    for (let j = 0; j < joints.length; j++) {
      let x = 0, y = 0, z = 0;
      const vs = joints[j];
      for (const v of vs) { x += rest[v * 3]; y += rest[v * 3 + 1]; z += rest[v * 3 + 2]; }
      jp[j * 3] = x / vs.length; jp[j * 3 + 1] = y / vs.length; jp[j * 3 + 2] = z / vs.length;
    }
    const J = (j: number, out: Vector3) => out.set(jp[j * 3], jp[j * 3 + 1], jp[j * 3 + 2]);
    const head = new Vector3(), tail = new Vector3(), dir = new Vector3(), normal = new Vector3();
    const xAxis = new Vector3(), zAxis = new Vector3();
    bones.forEach((b, i) => {
      J(b.head, head); J(b.tail, tail);
      dir.subVectors(tail, head).normalize();
      normal.set(0, 1, 0);
      if (b.plane) {
        J(b.plane[0], _v1); J(b.plane[1], _v2); J(b.plane[2], _v3);
        const pvec = _v2.clone().sub(_v1).normalize();
        const yvec = _v3.clone().sub(_v2).normalize();
        normal.crossVectors(yvec, pvec);
        if (normal.lengthSq() < 1e-10) normal.set(0, 1, 0); else normal.normalize();
      }
      zAxis.crossVectors(normal, dir).normalize();
      xAxis.crossVectors(dir, zAxis).normalize();
      const m = this.restGlobal[i];
      m.makeBasis(xAxis, dir, zAxis).setPosition(head);
      this.restInv[i].copy(m).invert();
      if (b.parent >= 0) this.restRelative[i].multiplyMatrices(this.restInv[b.parent], m);
      else this.restRelative[i].copy(m);
    });
    this.setPose(this.pose);
  }

  /** Set bone-local pose rotations (MakeHuman matPose convention). */
  setPose(pose: PoseQuats): void {
    this.pose = pose;
    const q = new Quaternion(), rot = new Matrix4(), tmp = new Matrix4();
    this.data.bones.forEach((b, i) => {
      const p = pose[b.name];
      if (p) rot.makeRotationFromQuaternion(q.set(p[0], p[1], p[2], p[3]));
      else rot.identity();
      tmp.multiplyMatrices(this.restRelative[i], rot);
      if (b.parent >= 0) this.poseGlobal[i].multiplyMatrices(this.poseGlobal[b.parent], tmp);
      else this.poseGlobal[i].copy(tmp);
      tmp.multiplyMatrices(this.poseGlobal[i], this.restInv[i]);
      this.skinMats.set(tmp.elements, i * 16);
    });
    this.updateOffset();
  }

  private updateOffset(): void {
    // ground the posed body and centre the pelvis on the origin (x/z)
    const n = this.data.bodyVertexCount;
    const out = new Float32Array(n * 3);
    this.skinRaw(this.rest, this.data.body.skinIdx, this.data.body.skinW, n, out, null);
    let minY = Infinity;
    for (let i = 0; i < n; i++) minY = Math.min(minY, out[i * 3 + 1]);
    const root = this.boneIndex.get("root")!;
    const e = this.poseGlobal[root].elements;
    this.offset.set(-e[12], -minY, -e[14]);
  }

  /** Linear blend skinning of `src` (xyz, indexed by vertex 0..count-1) into `out`. */
  skinRaw(src: Float32Array, skinIdx: Uint16Array, skinW: Float32Array, count: number, out: Float32Array,
    offset: Vector3 | null = this.offset): void {
    const S = this.skinMats;
    const ox = offset ? offset.x : 0, oy = offset ? offset.y : 0, oz = offset ? offset.z : 0;
    for (let i = 0; i < count; i++) {
      const x = src[i * 3], y = src[i * 3 + 1], z = src[i * 3 + 2];
      let rx = 0, ry = 0, rz = 0;
      for (let k = 0; k < 4; k++) {
        const w = skinW[i * 4 + k];
        if (w === 0) continue;
        const m = skinIdx[i * 4 + k] * 16;
        rx += w * (S[m] * x + S[m + 4] * y + S[m + 8] * z + S[m + 12]);
        ry += w * (S[m + 1] * x + S[m + 5] * y + S[m + 9] * z + S[m + 13]);
        rz += w * (S[m + 2] * x + S[m + 6] * y + S[m + 10] * z + S[m + 14]);
      }
      out[i * 3] = rx + ox; out[i * 3 + 1] = ry + oy; out[i * 3 + 2] = rz + oz;
    }
  }

  /** Posed body vertex positions (body vertices only). */
  posedBody(out: Float32Array = new Float32Array(this.data.bodyVertexCount * 3)): Float32Array {
    this.skinRaw(this.rest, this.data.body.skinIdx, this.data.body.skinW, this.data.bodyVertexCount, out);
    return out;
  }

  /** Rest-pose (unposed, un-offset) positions of a proxy fitted to the current body. */
  fitProxy(p: ProxyData, out: Float32Array = new Float32Array(p.refIdx.length)): Float32Array {
    const r = this.rest;
    const sc = (s: [number, number, number], axis: number) =>
      Math.abs(r[s[0] * 3 + axis] - r[s[1] * 3 + axis]) / s[2];
    const sx = sc(p.scale.x_scale, 0), sy = sc(p.scale.y_scale, 1), sz = sc(p.scale.z_scale, 2);
    const n = p.refIdx.length / 3;
    for (let i = 0; i < n; i++) {
      let x = 0, y = 0, z = 0;
      for (let k = 0; k < 3; k++) {
        const v = p.refIdx[i * 3 + k] * 3, w = p.refW[i * 3 + k];
        x += w * r[v]; y += w * r[v + 1]; z += w * r[v + 2];
      }
      out[i * 3] = x + p.refOff[i * 3] * sx;
      out[i * 3 + 1] = y + p.refOff[i * 3 + 1] * sy;
      out[i * 3 + 2] = z + p.refOff[i * 3 + 2] * sz;
    }
    return out;
  }

  joint(name: string, out = new Vector3()): Vector3 {
    const j = this.data.jointNames.indexOf(name);
    if (j < 0) throw new Error(`joint ${name} not found`);
    return out.set(this.jointPos[j * 3], this.jointPos[j * 3 + 1], this.jointPos[j * 3 + 2]);
  }

  /** Posed world position of a bone head (after offset). */
  bonePosed(name: string, out = new Vector3()): Vector3 {
    const e = this.poseGlobal[this.boneIndex.get(name)!].elements;
    return out.set(e[12], e[13], e[14]).add(this.offset);
  }
}

/** Smooth vertex normals over indexed triangles (positions xyz per vertex). */
export function computeNormals(pos: Float32Array, index: Uint32Array, count: number, out: Float32Array = new Float32Array(count * 3)): Float32Array {
  out.fill(0);
  for (let t = 0; t < index.length; t += 3) {
    const a = index[t] * 3, b = index[t + 1] * 3, c = index[t + 2] * 3;
    const e1x = pos[b] - pos[a], e1y = pos[b + 1] - pos[a + 1], e1z = pos[b + 2] - pos[a + 2];
    const e2x = pos[c] - pos[a], e2y = pos[c + 1] - pos[a + 1], e2z = pos[c + 2] - pos[a + 2];
    const nx = e1y * e2z - e1z * e2y, ny = e1z * e2x - e1x * e2z, nz = e1x * e2y - e1y * e2x;
    for (const o of [a, b, c]) { out[o] += nx; out[o + 1] += ny; out[o + 2] += nz; }
  }
  for (let i = 0; i < count; i++) {
    const o = i * 3;
    const l = Math.hypot(out[o], out[o + 1], out[o + 2]) || 1;
    out[o] /= l; out[o + 1] /= l; out[o + 2] /= l;
  }
  return out;
}

/** Least squares for a 4-unknown system (normal equations, Gaussian elimination). */
function leastSquares4(A: number[][], b: number[]): number[] | null {
  const M = Array.from({ length: 4 }, () => new Float64Array(5));
  for (let r = 0; r < A.length; r++) for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) M[i][j] += A[r][i] * A[r][j];
    M[i][4] += A[r][i] * b[r];
  }
  for (let c = 0; c < 4; c++) {
    let p = c;
    for (let r = c + 1; r < 4; r++) if (Math.abs(M[r][c]) > Math.abs(M[p][c])) p = r;
    if (Math.abs(M[p][c]) < 1e-14) return null;
    [M[c], M[p]] = [M[p], M[c]];
    for (let r = 0; r < 4; r++) {
      if (r === c) continue;
      const f = M[r][c] / M[c][c];
      for (let k = c; k < 5; k++) M[r][k] -= f * M[c][k];
    }
  }
  return [0, 1, 2, 3].map((i) => M[i][4] / M[i][i]);
}
