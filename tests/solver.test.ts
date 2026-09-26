import { describe, expect, test } from "vitest";
import { loadTestAvatar } from "./helpers";
import { Body } from "../src/avatar/body";
import { BodyMeasurer } from "../src/avatar/measure";
import { solveMeasurements, weightMorphFromBMI } from "../src/avatar/solver";

describe("body measurement solver (real avatar data)", () => {
  const data = loadTestAvatar();
  const body = new Body(data);
  const measurer = new BodyMeasurer(data);

  const cases = [
    { height: 160, bust: 84, waist: 66, hips: 92 },
    { height: 152, bust: 78, waist: 60, hips: 86 },
    { height: 170, bust: 90, waist: 70, hips: 96 },
    { height: 165, bust: 96, waist: 78, hips: 100 },
  ];
  for (const t of cases) {
    test(`reaches ${JSON.stringify(t)} within ±1.5cm`, () => {
      const r = solveMeasurements(body, measurer, t, { weightKg: 55 });
      for (const k of Object.keys(t) as (keyof typeof t)[]) {
        expect(Math.abs(r.measured[k] - t[k]), k).toBeLessThanOrEqual(1.5);
      }
    });
  }

  test("optional measurements (shoulder, inseam, underbust) are honoured", () => {
    const t = { height: 168, bust: 92, underbust: 74, waist: 72, hips: 98, shoulder: 38, inseam: 76 };
    const r = solveMeasurements(body, measurer, t);
    for (const k of Object.keys(t) as (keyof typeof t)[]) expect(Math.abs(r.measured[k] - t[k]), k).toBeLessThanOrEqual(1.5);
  });

  test("measurements are anatomically ordered", () => {
    body.setMorphs({});
    const m = measurer.measure(body);
    expect(m.bustY).toBeGreaterThan(m.waistY);
    expect(m.waistY).toBeGreaterThan(m.hipY);
    expect(m.hipY).toBeGreaterThan(m.crotchY);
    expect(m.neckY).toBeGreaterThan(m.bustY);
    expect(m.underbust).toBeLessThan(m.bust);
  });

  test("BMI maps to weight morph", () => {
    expect(weightMorphFromBMI(160, 55)).toBeCloseTo(0, 0);
    expect(weightMorphFromBMI(160, 80)).toBeGreaterThan(0.5);
    expect(weightMorphFromBMI(160, 42)).toBeLessThan(-0.3);
  });
});
