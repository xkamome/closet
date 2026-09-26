import { test } from "vitest";
import { loadTestAvatar } from "./helpers";
import { Body } from "../src/avatar/body";
import { BodyMeasurer } from "../src/avatar/measure";
import { defaultSpec } from "../src/garment/spec";
import { buildGarment } from "../src/garment/build";
test("probe", () => {
  const d = loadTestAvatar(); const b = new Body(d); const ms = new BodyMeasurer(d);
  const m = ms.measure(b);
  const spec = defaultSpec("skirt", m);
  const g = buildGarment(spec, { body: b, measurer: ms, m });
  // front-centre profile: max z for |x|<0.01 by y bucket
  const rows = new Map<number, number>();
  for (let i = 0; i < g.vertexCount; i++) if (Math.abs(g.rest[i*3]) < 0.012 && g.rest[i*3+2] > 0) {
    const k = Math.round(g.rest[i*3+1] * 100); rows.set(k, Math.max(rows.get(k) ?? -1, g.rest[i*3+2]));
  }
  console.log([...rows.entries()].sort((a,b)=>b[0]-a[0]).map(([k,z])=>k+":"+(z*100).toFixed(1)).join(" "));
});
