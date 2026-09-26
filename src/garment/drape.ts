// Position-based cloth relaxation for the free-hanging part of skirts / dresses.
// Starts from the linear-blend-skinned shape and lets gravity, inextensible edges, long-range
// tethers (no over-stretching) and collisions with the body, the stool and the floor settle the
// fabric, e.g. a skirt riding up and falling over the knees when sitting.

export interface DrapeParams {
  pos: Float32Array; // posed garment positions (in/out), per output vertex
  rest: Float32Array; // garment rest positions (edge rest lengths)
  index: Uint32Array;
  free: Uint8Array; // 1 = simulated, 0 = pinned to the skinned result
  weld: Uint32Array; // output vertex -> particle id (duplicates at UV seams share a particle)
  body: Float32Array; // posed body positions
  bodyN: Float32Array; // posed body normals
  bodyCount: number;
  /** extra collision surfaces (garments worn underneath), as positions + normals */
  under?: { pos: Float32Array; normals: Float32Array; count: number }[];
  gap: number;
  seat?: { x: number; z: number; r: number; y: number } | null;
  steps?: number;
  iterations?: number;
  /** 0 = stiff (keeps shape) .. 1 = fluid */
  drape?: number;
  /** resistance to in-plane compression (0..1); high keeps the cut's shape, folds form by bending instead */
  compress?: number;
}

export function drapeCloth(p: DrapeParams): void {
  const { index, weld, body, bodyN, bodyCount, gap } = p;
  const nOut = p.pos.length / 3;
  // ---- particles (welded)
  const idOf = new Map<number, number>();
  const pid = new Int32Array(nOut);
  for (let v = 0; v < nOut; v++) {
    let id = idOf.get(weld[v]);
    if (id === undefined) { id = idOf.size; idOf.set(weld[v], id); }
    pid[v] = id;
  }
  const n = idOf.size;
  const pos = new Float64Array(n * 3), rest = new Float64Array(n * 3);
  const free = new Uint8Array(n);
  for (let v = 0; v < nOut; v++) {
    const i = pid[v];
    for (let k = 0; k < 3; k++) { pos[i * 3 + k] = p.pos[v * 3 + k]; rest[i * 3 + k] = p.rest[v * 3 + k]; }
    free[i] = p.free[v];
  }
  const steps = p.steps ?? 50, iters = p.iterations ?? 12;
  const dist = (arr: Float64Array, a: number, b: number) =>
    Math.hypot(arr[a * 3] - arr[b * 3], arr[a * 3 + 1] - arr[b * 3 + 1], arr[a * 3 + 2] - arr[b * 3 + 2]);
  // ---- edges
  const seen = new Set<number>();
  const ea: number[] = [], eb: number[] = [], el: number[] = [];
  for (let t = 0; t < index.length; t += 3) {
    for (let k = 0; k < 3; k++) {
      const a = pid[index[t + k]], b = pid[index[t + ((k + 1) % 3)]];
      if (a === b) continue;
      const key = a < b ? a * 4194304 + b : b * 4194304 + a;
      if (seen.has(key) || (!free[a] && !free[b])) continue;
      seen.add(key);
      ea.push(a); eb.push(b); el.push(dist(rest, a, b));
    }
  }
  // ---- bending: distance between the two vertices opposite each interior edge
  const edgeTri = new Map<number, number>();
  const ba: number[] = [], bb: number[] = [], bl: number[] = [];
  for (let t = 0; t < index.length; t += 3) {
    for (let k = 0; k < 3; k++) {
      const a = pid[index[t + k]], b = pid[index[t + ((k + 1) % 3)]], c = pid[index[t + ((k + 2) % 3)]];
      if (a === b) continue;
      const key = a < b ? a * 4194304 + b : b * 4194304 + a;
      const other = edgeTri.get(key);
      if (other === undefined) edgeTri.set(key, c);
      else if (other !== c && (free[other] || free[c])) { ba.push(other); bb.push(c); bl.push(dist(rest, other, c)); }
    }
  }
  const bendK = 0.08 + 0.35 * (1 - (p.drape ?? 0.5));

  // ---- long-range attachments: each free particle stays within its rest distance of the
  //      nearest pinned particle bordering the free region
  const border: number[] = [];
  const isBorder = new Uint8Array(n);
  for (let e = 0; e < ea.length; e++) {
    if (!free[ea[e]] && !isBorder[ea[e]]) { isBorder[ea[e]] = 1; border.push(ea[e]); }
    if (!free[eb[e]] && !isBorder[eb[e]]) { isBorder[eb[e]] = 1; border.push(eb[e]); }
  }
  const anchor = new Int32Array(n).fill(-1), tether = new Float64Array(n);
  if (border.length) {
    for (let i = 0; i < n; i++) {
      if (!free[i]) continue;
      let best = -1, bd = Infinity;
      for (const b of border) { const d = dist(rest, i, b); if (d < bd) { bd = d; best = b; } }
      anchor[i] = best; tether[i] = bd * 1.03;
    }
  }
  // ---- body spatial hash
  const cell = 0.035;
  const grid = new Map<number, number[]>();
  const key = (x: number, y: number, z: number) => ((x + 512) * 1024 + (y + 512)) * 1024 + (z + 512);
  // body + under-layers form one collision point cloud
  let allPos = body, allN = bodyN, allCount = bodyCount;
  if (p.under?.length) {
    allCount = bodyCount + p.under.reduce((a, u) => a + u.count, 0);
    allPos = new Float32Array(allCount * 3); allN = new Float32Array(allCount * 3);
    allPos.set(body.subarray(0, bodyCount * 3)); allN.set(bodyN.subarray(0, bodyCount * 3));
    let off = bodyCount * 3;
    for (const u of p.under) { allPos.set(u.pos.subarray(0, u.count * 3), off); allN.set(u.normals.subarray(0, u.count * 3), off); off += u.count * 3; }
  }
  for (let i = 0; i < allCount; i++) {
    const k = key(Math.floor(allPos[i * 3] / cell), Math.floor(allPos[i * 3 + 1] / cell), Math.floor(allPos[i * 3 + 2] / cell));
    const c = grid.get(k);
    if (c) c.push(i); else grid.set(k, [i]);
  }
  const prev = pos.slice();
  const g = -9.81 * (1 / 60) * (1 / 60);
  const compress = p.compress ?? 0.15 + 0.35 * (1 - (p.drape ?? 0.5)); // resistance to compression (fabric stiffness)
  // nearest body vertex per particle, refreshed every few steps (particles move little per step)
  const nearest = new Int32Array(n).fill(-1);
  const findNearest = (i: number) => {
    const o = i * 3;
    const x = pos[o], y = pos[o + 1], z = pos[o + 2];
    const cx = Math.floor(x / cell), cy = Math.floor(y / cell), cz = Math.floor(z / cell);
    let best = -1, bd = Infinity;
    for (let dx = -1; dx <= 1; dx++) for (let dy = -1; dy <= 1; dy++) for (let dz = -1; dz <= 1; dz++) {
      const c = grid.get(key(cx + dx, cy + dy, cz + dz));
      if (!c) continue;
      for (const j of c) {
        const ex = x - allPos[j * 3], ey = y - allPos[j * 3 + 1], ez = z - allPos[j * 3 + 2];
        const d2 = ex * ex + ey * ey + ez * ez;
        if (d2 < bd) { bd = d2; best = j; }
      }
    }
    nearest[i] = best;
  };
  let stepNo = 0;
  const collideAll = () => {
    const refresh = stepNo++ % 4 === 0;
    for (let i = 0; i < n; i++) {
      if (!free[i]) continue;
      const o = i * 3;
      const x = pos[o], y = pos[o + 1], z = pos[o + 2];
      if (refresh) findNearest(i);
      const best = nearest[i];
      // under-layer points are open sheets: only push when actually close (their edges would bulge the cloth)
      const farUnder = best >= bodyCount &&
        (x - allPos[best * 3]) ** 2 + (y - allPos[best * 3 + 1]) ** 2 + (z - allPos[best * 3 + 2]) ** 2 > 0.0004;
      if (best >= 0 && !farUnder) {
        const nx = allN[best * 3], ny = allN[best * 3 + 1], nz = allN[best * 3 + 2];
        const sd = (x - allPos[best * 3]) * nx + (y - allPos[best * 3 + 1]) * ny + (z - allPos[best * 3 + 2]) * nz;
        if (sd < gap) {
          const push = gap - sd;
          pos[o] += nx * push; pos[o + 1] += ny * push; pos[o + 2] += nz * push;
          prev[o] = pos[o]; prev[o + 1] = pos[o + 1]; prev[o + 2] = pos[o + 2]; // friction
        }
      }
      if (p.seat) {
        const s2 = p.seat;
        const r = Math.hypot(pos[o] - s2.x, pos[o + 2] - s2.z);
        if (r < s2.r && pos[o + 1] < s2.y + gap && pos[o + 1] > s2.y - 0.06) { pos[o + 1] = s2.y + gap; prev[o + 1] = pos[o + 1]; }
      }
      if (pos[o + 1] < gap) { pos[o + 1] = gap; prev[o + 1] = gap; }
    }
  };
  for (let s = 0; s < steps; s++) {
    for (let i = 0; i < n; i++) {
      if (!free[i]) continue;
      const o = i * 3;
      for (let k = 0; k < 3; k++) {
        const vel = (pos[o + k] - prev[o + k]) * 0.88;
        prev[o + k] = pos[o + k];
        pos[o + k] += vel + (k === 1 ? g : 0);
      }
    }
    for (let it = 0; it < iters; it++) {
      for (let e = 0; e < ea.length; e++) {
        const a = ea[e] * 3, b = eb[e] * 3;
        const dx = pos[b] - pos[a], dy = pos[b + 1] - pos[a + 1], dz = pos[b + 2] - pos[a + 2];
        const d = Math.hypot(dx, dy, dz) || 1e-9;
        let diff = (d - el[e]) / d;
        if (diff < 0) diff *= compress;
        const fa = free[ea[e]], fb = free[eb[e]];
        const wa = fa ? (fb ? 0.5 : 1) : 0, wb = fb ? (fa ? 0.5 : 1) : 0;
        pos[a] += dx * diff * wa; pos[a + 1] += dy * diff * wa; pos[a + 2] += dz * diff * wa;
        pos[b] -= dx * diff * wb; pos[b + 1] -= dy * diff * wb; pos[b + 2] -= dz * diff * wb;
      }
      if (it % 2 === 0) {
        for (let e = 0; e < ba.length; e++) {
          const a = ba[e] * 3, b = bb[e] * 3;
          const dx = pos[b] - pos[a], dy = pos[b + 1] - pos[a + 1], dz = pos[b + 2] - pos[a + 2];
          const d = Math.hypot(dx, dy, dz) || 1e-9;
          const diff = ((d - bl[e]) / d) * bendK;
          const fa = free[ba[e]], fb = free[bb[e]];
          const wa = fa ? (fb ? 0.5 : 1) : 0, wb = fb ? (fa ? 0.5 : 1) : 0;
          pos[a] += dx * diff * wa; pos[a + 1] += dy * diff * wa; pos[a + 2] += dz * diff * wa;
          pos[b] -= dx * diff * wb; pos[b + 1] -= dy * diff * wb; pos[b + 2] -= dz * diff * wb;
        }
      }
      for (let i = 0; i < n; i++) {
        const a = anchor[i];
        if (a < 0) continue;
        const o = i * 3, q = a * 3;
        const dx = pos[o] - pos[q], dy = pos[o + 1] - pos[q + 1], dz = pos[o + 2] - pos[q + 2];
        const d = Math.hypot(dx, dy, dz);
        if (d > tether[i]) {
          const f = tether[i] / d;
          pos[o] = pos[q] + dx * f; pos[o + 1] = pos[q + 1] + dy * f; pos[o + 2] = pos[q + 2] + dz * f;
        }
      }
    }
    collideAll();
  }
  for (let v = 0; v < nOut; v++) {
    const i = pid[v];
    p.pos[v * 3] = pos[i * 3]; p.pos[v * 3 + 1] = pos[i * 3 + 1]; p.pos[v * 3 + 2] = pos[i * 3 + 2];
  }
}
