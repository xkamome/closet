import { describe, expect, test } from "vitest";
import { evaluateFit, recommendSize, describeLength } from "../src/fit/fit";
import { parseFabric } from "../src/fit/fabric";
import { parseSizeChart } from "../src/fit/sizeChart";

const body = {
  bust: 84, waist: 66, hips: 92, shoulder: 37, armLength: 54, inseam: 72, thigh: 52, upperArm: 26, height: 160,
  neckY: 136, waistY: 102, hipY: 80, crotchY: 74, kneeY: 45, shoulderY: 131,
};
const woven = parseFabric("棉100% 梭織");
const knit = parseFabric("棉95% 彈性纖維5% 針織");

describe("fit judgement", () => {
  test("woven top: too small / fitted / too big per region", () => {
    const chart = parseSizeChart(["尺寸 肩寬 胸圍 衣長", "XS 33 80 58", "M 37 96 62", "XL 44 124 66"].join("\n"));
    const xs = evaluateFit(chart.rows[0], body, "top", woven);
    expect(xs.regions.find((r) => r.key === "chest")!.status).toBe("過小");
    expect(xs.verdict).toBe("太小");
    const m = evaluateFit(chart.rows[1], body, "top", woven);
    expect(m.regions.find((r) => r.key === "chest")!.status).toBe("合身");
    expect(m.verdict).toBe("合身");
    const xl = evaluateFit(chart.rows[2], body, "top", woven);
    expect(xl.regions.find((r) => r.key === "chest")!.status).toBe("過大");
    expect(["偏大", "太大"]).toContain(xl.verdict);
  });

  test("stretch fabric turns 'too small' into 'tight but wearable'", () => {
    const row = { size: "S", values: { chest: 80 }, ranges: {} };
    expect(evaluateFit(row, body, "top", woven).regions[0].status).toBe("過小");
    expect(evaluateFit(row, body, "top", knit).regions[0].status).toBe("偏緊");
  });

  test("skirt waist too big slips down", () => {
    const row = { size: "L", values: { waist: 82, hip: 104 }, ranges: {} };
    const r = evaluateFit(row, body, "skirt", woven);
    const w = r.regions.find((x) => x.key === "waist")!;
    expect(w.status).toBe("過大");
    expect(w.note).toMatch(/下滑/);
  });

  test("elastic waist range", () => {
    const row = { size: "F", values: { waist: 72 }, ranges: { waist: [60, 84] as [number, number] } };
    expect(evaluateFit(row, body, "skirt", woven).regions[0].status).toBe("偏緊");
  });

  test("pants inseam length labels", () => {
    const short = evaluateFit({ size: "S", values: { inseam: 60 }, ranges: {} }, body, "pants", woven);
    expect(short.regions[0].status).toBe("偏短");
    const long = evaluateFit({ size: "S", values: { inseam: 80 }, ranges: {} }, body, "pants", woven);
    expect(long.regions[0].status).toBe("偏長");
  });

  test("recommends the best size", () => {
    const chart = parseSizeChart(["尺寸 肩寬 胸圍 衣長", "S 35 86 60", "M 37 94 62", "L 39 102 64"].join("\n"));
    const rec = recommendSize(chart.rows, body, "top", woven)!;
    expect(rec.best.size).toBe("M");
    expect(rec.all.length).toBe(3);
  });

  test("length description", () => {
    expect(describeLength("skirt", 40, body)).toMatch(/大腿|膝/);
    expect(describeLength("dress", 125, body)).toMatch(/腳踝|小腿/);
  });
});
