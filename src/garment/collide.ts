// Shared geometry helpers for garments (no three.js dependency).

/** Push garment vertices out of the body along the nearest body vertex normal. */
export function collide(pos: Float32Array | number[], n: number, body: Float32Array, bodyN: Float32Array, nb: number, gap: number, maxDist = Infinity): void {
  const cell = 0.03;
  const grid = new Map<number, number[]>();
  const key = (x: number, y: number, z: number) => ((Math.floor(x / cell) + 512) * 1024 + (Math.floor(y / cell) + 512)) * 1024 + (Math.floor(z / cell) + 512);
  for (let i = 0; i < nb; i++) {
    const k = key(body[i * 3], body[i * 3 + 1], body[i * 3 + 2]);
    const c = grid.get(k);
    if (c) c.push(i); else grid.set(k, [i]);
  }
  for (let v = 0; v < n; v++) {
    const x = pos[v * 3], y = pos[v * 3 + 1], z = pos[v * 3 + 2];
    const cx = Math.floor(x / cell), cy = Math.floor(y / cell), cz = Math.floor(z / cell);
    let best = -1, bd = Infinity;
    for (let dx = -1; dx <= 1; dx++) for (let dy = -1; dy <= 1; dy++) for (let dz = -1; dz <= 1; dz++) {
      const c = grid.get(((cx + dx + 512) * 1024 + (cy + dy + 512)) * 1024 + (cz + dz + 512));
      if (!c) continue;
      for (const i of c) {
        const ex = x - body[i * 3], ey = y - body[i * 3 + 1], ez = z - body[i * 3 + 2];
        const d2 = ex * ex + ey * ey + ez * ez;
        if (d2 < bd) { bd = d2; best = i; }
      }
    }
    if (best < 0 || bd > maxDist * maxDist) continue;
    const nx = bodyN[best * 3], ny = bodyN[best * 3 + 1], nz = bodyN[best * 3 + 2];
    const s = (x - body[best * 3]) * nx + (y - body[best * 3 + 1]) * ny + (z - body[best * 3 + 2]) * nz;
    if (s < gap) {
      const push = gap - s;
      pos[v * 3] += nx * push; pos[v * 3 + 1] += ny * push; pos[v * 3 + 2] += nz * push;
    }
  }
}

/** Taubin (λ/μ) smoothing over a triangle mesh; keeps volume, removes body micro-detail. */
export function taubinSmooth(pos: number[], tris: number[], iterations = 10, lambda = 0.55, mu = -0.58, pin?: (v: number) => boolean): void {
  const n = pos.length / 3;
  const nb: Set<number>[] = Array.from({ length: n }, () => new Set<number>());
  for (let t = 0; t < tris.length; t += 3) {
    const a = tris[t], b = tris[t + 1], c = tris[t + 2];
    nb[a].add(b); nb[a].add(c); nb[b].add(a); nb[b].add(c); nb[c].add(a); nb[c].add(b);
  }
  const lists = nb.map((s) => [...s]);
  const tmp = new Float64Array(n * 3);
  const step = (f: number) => {
    for (let v = 0; v < n; v++) {
      const L = lists[v];
      if (!L.length || (pin && pin(v))) { tmp[v * 3] = pos[v * 3]; tmp[v * 3 + 1] = pos[v * 3 + 1]; tmp[v * 3 + 2] = pos[v * 3 + 2]; continue; }
      let x = 0, y = 0, z = 0;
      for (const u of L) { x += pos[u * 3]; y += pos[u * 3 + 1]; z += pos[u * 3 + 2]; }
      x /= L.length; y /= L.length; z /= L.length;
      tmp[v * 3] = pos[v * 3] + f * (x - pos[v * 3]);
      tmp[v * 3 + 1] = pos[v * 3 + 1] + f * (y - pos[v * 3 + 1]);
      tmp[v * 3 + 2] = pos[v * 3 + 2] + f * (z - pos[v * 3 + 2]);
    }
    for (let i = 0; i < n * 3; i++) pos[i] = tmp[i];
  };
  for (let i = 0; i < iterations; i++) { step(lambda); step(mu); }
}
