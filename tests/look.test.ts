import { describe, expect, test } from "vitest";
import { loadTestAvatar } from "./helpers";
import { Body } from "../src/avatar/body";
import { BodyMeasurer, Region } from "../src/avatar/measure";
import { buildPose } from "../src/avatar/poses";
import { solveMeasurements } from "../src/avatar/solver";
import { defaultSpec, type GarmentSpec, type GarmentType } from "../src/garment/spec";
import { buildFrame } from "../src/look/frame";
import { buildLookGarment, type Piece } from "../src/look/pattern";

const data = loadTestAvatar();
const body = new Body(data);
const measurer = new BodyMeasurer(data);
// the default profile of the app (same body as the Look Lab)
const m = solveMeasurements(body, measurer, { height: 160, bust: 83, waist: 66, hips: 91 }, { weightKg: 52 }).measured;
body.setPose(buildPose(body, "stand"));
const pos = body.posedBody();
const frame = buildFrame(body, measurer, m, pos);

/** front (max z) depth map of torso + legs, 5 mm cells */
const CELL = 0.005, X0 = -0.4, Y0 = 0, NX = 160, NY = 400;
const depth = new Float32Array(NX * NY).fill(-Infinity);
{
  const idx = data.body.index, src = data.body.src;
  for (let t = 0; t < idx.length; t += 3) {
    const v = [src[idx[t]], src[idx[t + 1]], src[idx[t + 2]]];
    if (v.some((k) => (measurer.regions[k] === Region.Arm && Math.abs(pos[k * 3]) > 0.1) || pos[k * 3 + 1] > frame.neck.y)) continue;
    const P = v.map((k) => [pos[k * 3], pos[k * 3 + 1], pos[k * 3 + 2]]);
    const minx = Math.floor((Math.min(...P.map((p) => p[0])) - X0) / CELL), maxx = Math.ceil((Math.max(...P.map((p) => p[0])) - X0) / CELL);
    const miny = Math.floor((Math.min(...P.map((p) => p[1])) - Y0) / CELL), maxy = Math.ceil((Math.max(...P.map((p) => p[1])) - Y0) / CELL);
    for (let gy = miny; gy <= maxy; gy++) for (let gx = minx; gx <= maxx; gx++) {
      if (gx < 0 || gy < 0 || gx >= NX || gy >= NY) continue;
      const x = X0 + gx * CELL, y = Y0 + gy * CELL;
      const [a, b, c] = P;
      const d = (b[1] - c[1]) * (a[0] - c[0]) + (c[0] - b[0]) * (a[1] - c[1]);
      if (Math.abs(d) < 1e-12) continue;
      const l1 = ((b[1] - c[1]) * (x - c[0]) + (c[0] - b[0]) * (y - c[1])) / d;
      const l2 = ((c[1] - a[1]) * (x - c[0]) + (a[0] - c[0]) * (y - c[1])) / d;
      const l3 = 1 - l1 - l2;
      if (l1 < 0 || l2 < 0 || l3 < 0) continue;
      const z = l1 * a[2] + l2 * b[2] + l3 * c[2];
      const k = gy * NX + gx;
      if (z > depth[k]) depth[k] = z;
    }
  }
}
const bodyFront = (x: number, y: number) => {
  const gx = Math.round((x - X0) / CELL), gy = Math.round((y - Y0) / CELL);
  return gx >= 0 && gy >= 0 && gx < NX && gy < NY ? depth[gy * NX + gx] : -Infinity;
};

/** share of front-panel vertices that are more than 3 mm behind the body surface */
const buried = (p: Piece) => {
  let bad = 0, n = 0;
  const worst: number[][] = [];
  for (let i = 0; i < p.cols * p.rows; i++) {
    const x = p.pos[i * 3], y = p.pos[i * 3 + 1], z = p.pos[i * 3 + 2];
    const b = bodyFront(x, y);
    if (!Number.isFinite(b)) continue;
    n++;
    if (z < b - 0.003) { bad++; if (worst.length < 8) worst.push([x, y, z, b].map((v) => Math.round(v * 1000) / 1000)); }
  }
  return { share: bad / Math.max(1, n), worst };
};

const spec = (type: GarmentType, edit: (s: GarmentSpec) => void = () => {}) => { const s = defaultSpec(type, m); edit(s); return s; };

describe("look garments", () => {
  test.each([
    ["tee", spec("top")],
    ["tank", spec("top", (s) => { s.sleeve = "none"; s.silhouette = "fitted"; s.m.chest = m.bust + 4; s.m.waist = m.waist + 6; })],
    ["v-neck", spec("top", (s) => { s.neckline = "v"; })],
    ["dress", spec("dress")],
    ["skirt", spec("skirt")],
    ["pants", spec("pants")],
  ])("%s front panel stays outside the body", (_name, s) => {
    const g = buildLookGarment(s, frame);
    for (const p of g.pieces.filter((q) => q.kind === "front")) {
      const r = buried(p);
      expect(r.share, `${p.name} worst ${JSON.stringify(r.worst)}`).toBeLessThan(0.002);
    }
  });
});
