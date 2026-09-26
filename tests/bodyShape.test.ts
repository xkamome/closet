import { describe, expect, test } from "vitest";
import { classifyBodyShape } from "../src/style/bodyShape";
import { buildAdvice, buildAIPrompt } from "../src/style/advice";
import { defaultSpec } from "../src/garment/spec";

describe("body shape classification", () => {
  test.each([
    [{ bust: 90, waist: 64, hips: 92, height: 162 }, "hourglass"],
    [{ bust: 82, waist: 66, hips: 100, height: 158 }, "pear"],
    [{ bust: 96, waist: 92, hips: 98, height: 160 }, "apple"],
    [{ bust: 82, waist: 72, hips: 86, height: 165 }, "rectangle"],
    [{ bust: 98, waist: 74, hips: 86, height: 170, shoulder: 41 }, "invertedTriangle"],
  ])("%j -> %s", (m, shape) => {
    expect(classifyBodyShape(m).shape).toBe(shape);
  });

  test("height and leg classes", () => {
    const r = classifyBodyShape({ bust: 84, waist: 66, hips: 90, height: 150, inseam: 72 });
    expect(r.heightClass).toBe("petite");
    expect(r.legs).toBe("long");
  });

  test("advice mentions shape and gives garment-specific comments", () => {
    const shape = classifyBodyShape({ bust: 82, waist: 66, hips: 100, height: 158 });
    const spec = defaultSpec("skirt", { bust: 82, waist: 66, hips: 100, shoulder: 36, armLength: 52, inseam: 72, thigh: 55, height: 158 });
    const a = buildAdvice(shape, spec);
    expect(a.headline).toContain("梨型");
    expect(a.recommend.length).toBeGreaterThan(2);
    expect(a.garmentComments.join()).toMatch(/A 字|平衡/);
    const p = buildAIPrompt({ height: 158, bust: 82, waist: 66, hips: 100, shoulder: 36, inseam: 72 }, shape, spec);
    expect(p).toContain("梨型");
    expect(p).toContain("臺灣繁體中文");
  });
});
