import { describe, expect, test } from "vitest";
import { loadTestAvatar } from "./helpers";
import { Body, computeNormals } from "../src/avatar/body";
import { BodyMeasurer } from "../src/avatar/measure";
import { buildPose } from "../src/avatar/poses";
import { defaultSpec, type GarmentSpec } from "../src/garment/spec";
import { buildGarment, type GarmentMesh } from "../src/garment/build";
import { drapeCloth } from "../src/garment/drape";

const data = loadTestAvatar();
const body = new Body(data);
const measurer = new BodyMeasurer(data);
body.setMorphs({});
const m = measurer.measure(body);
const nb = body.joint("neck01____head");
const hum = body.joint("upperarm01.L____head");
const elb = body.joint("lowerarm01.L____head");
const armDir = elb.clone().sub(hum).normalize();
const armLen = hum.distanceTo(elb);

const top = (edit: (s: GarmentSpec) => void = () => {}) => {
  const s = defaultSpec("top", m);
  edit(s);
  return buildGarment(s, { body, measurer, m });
};
/** positions of the left sleeve: vertices lateral of the humeral head, as (t along the arm, radius from the axis) */
const sleeveProfile = (g: GarmentMesh) => {
  const out: { t: number; r: number }[] = [];
  for (let i = 0; i < g.vertexCount; i++) {
    const x = g.rest[i * 3], y = g.rest[i * 3 + 1], z = g.rest[i * 3 + 2];
    if (x < hum.x + 0.02) continue;
    const px = x - hum.x, py = y - hum.y, pz = z - hum.z;
    const t = px * armDir.x + py * armDir.y + pz * armDir.z;
    const r = Math.hypot(px - armDir.x * t, py - armDir.y * t, pz - armDir.z * t);
    // arm region only: close to the arm axis and not down at the torso hem
    if (t > 0 && r < 0.1 && y > hum.y - 0.42) out.push({ t, r });
  }
  return out;
};
const frontNeckTop = (g: GarmentMesh) => {
  let top = -Infinity;
  for (let i = 0; i < g.vertexCount; i++) {
    if (Math.abs(g.rest[i * 3]) < 0.012 && g.rest[i * 3 + 2] > nb.z + 0.02) top = Math.max(top, g.rest[i * 3 + 1]);
  }
  return top;
};

describe("top proportions (vs. pattern-making standards)", () => {
  test("short sleeve is a tube reaching ~the given sleeve length, standing off the arm", () => {
    const g = top((s) => { s.sleeve = "short"; s.m.sleeveLength = 16; });
    const prof = sleeveProfile(g);
    const reach = Math.max(...prof.map((p) => p.t));
    expect(reach).toBeGreaterThan(0.12);
    expect(reach).toBeLessThan(0.21);
    // the opening doesn't hug the arm: mean radius near the hem is well above the arm radius
    const hem = prof.filter((p) => p.t > reach - 0.02);
    const meanR = hem.reduce((a, p) => a + p.r, 0) / hem.length;
    const armR = m.upperArm / 100 / (2 * Math.PI);
    expect(meanR).toBeGreaterThan(armR + 0.006);
  });

  test("long sleeve reaches the wrist area", () => {
    const g = top((s) => { s.sleeve = "long"; s.m.sleeveLength = m.armLength; });
    const reach = Math.max(...sleeveProfile(g).map((p) => p.t));
    expect(reach).toBeGreaterThan(armLen + 0.12);
  });

  test("sleeveless has no fabric down the arm", () => {
    const g = top((s) => { s.sleeve = "none"; });
    const reach = Math.max(0, ...sleeveProfile(g).map((p) => p.t));
    expect(reach).toBeLessThan(0.04);
  });

  test("crew neck sits close to the neck base; V and scoop are deeper; boat is wide", () => {
    const crew = nb.y - frontNeckTop(top((s) => { s.neckline = "crew"; }));
    const v = nb.y - frontNeckTop(top((s) => { s.neckline = "v"; }));
    const scoop = nb.y - frontNeckTop(top((s) => { s.neckline = "scoop"; }));
    expect(crew).toBeGreaterThan(-0.005);
    expect(crew).toBeLessThan(0.05);
    expect(v).toBeGreaterThan(0.08);
    expect(scoop).toBeGreaterThan(crew + 0.03);
    // boat neck: no fabric within 9 cm of the centre line at neck-base height
    const boat = top((s) => { s.neckline = "boat"; });
    let minX = Infinity;
    for (let i = 0; i < boat.vertexCount; i++) {
      if (Math.abs(boat.rest[i * 3 + 1] - nb.y) < 0.005) minX = Math.min(minX, Math.abs(boat.rest[i * 3]));
    }
    expect(minX).toBeGreaterThan(0.07);
  });

  test("dropped shoulder moves the armhole down the arm", () => {
    const set = top((s) => { s.m.shoulder = m.shoulder; });
    const dropped = top((s) => { s.m.shoulder = m.shoulder + 10; s.silhouette = "oversized"; });
    // the sleeve is sewn further down the arm, so (same sleeve length) its hem ends further along the arm
    const reach = (g: GarmentMesh) => Math.max(...sleeveProfile(g).map((p) => p.t));
    expect(reach(dropped)).toBeGreaterThan(reach(set) + 0.03);
  });
});

describe("relaxation stays within the 1 s budget", () => {
  test("tee and dress: build + drape < 1000 ms", () => {
    body.setPose(buildPose(body, "stand"));
    const bodyPos = body.posedBody();
    const srcIdx = new Uint32Array(data.body.index.length);
    for (let i = 0; i < srcIdx.length; i++) srcIdx[i] = data.body.src[data.body.index[i]];
    const bodyN = computeNormals(bodyPos, srcIdx, data.bodyVertexCount);
    // CPU time of this process (not wall time): other programs running on the machine don't count
    const cpuMs = () => { const u = process.cpuUsage(); return (u.user + u.system) / 1000; };
    const once = (type: "top" | "dress") => {
      const t0 = cpuMs();
      const spec = defaultSpec(type, m);
      const g = buildGarment(spec, { body, measurer, m });
      const pos = new Float32Array(g.vertexCount * 3);
      body.skinRaw(g.rest, g.skinIdx, g.skinW, g.vertexCount, pos);
      drapeCloth({ pos, rest: g.rest, index: g.index, free: g.free, weld: g.weld, body: bodyPos, bodyN, bodyCount: data.bodyVertexCount, gap: 0.007, drape: 0.5, compress: 0.85, steps: 20, iterations: 6 });
      expect(pos.every(Number.isFinite)).toBe(true);
      return cpuMs() - t0;
    };
    // warm the JIT like a real session (the app has already built the underwear by then), then take
    // the best of two runs: other test files run in parallel workers and compete for the CPU
    once("top");
    for (const type of ["top", "dress"] as const) {
      expect(Math.min(once(type), once(type)), type).toBeLessThan(1000);
    }
    body.setPose({});
  });
});
