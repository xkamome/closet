import { describe, expect, test } from "vitest";
import { parseFabric, stretchLabel } from "../src/fit/fabric";

describe("fabric parser", () => {
  test("cotton + spandex knit is stretchy", () => {
    const f = parseFabric("材質：棉95% 彈性纖維5% 針織");
    expect(f.composition).toEqual([{ fiber: "cotton", pct: 95 }, { fiber: "spandex", pct: 5 }]);
    expect(f.structure).toBe("knit");
    expect(f.stretch).toBeGreaterThan(0.2);
  });
  test("100% polyester chiffon drapes and barely stretches", () => {
    const f = parseFabric("100% 聚酯纖維 雪紡");
    expect(f.composition[0]).toEqual({ fiber: "polyester", pct: 100 });
    expect(f.drape).toBeGreaterThan(0.8);
    expect(f.stretch).toBeLessThan(0.05);
  });
  test("rigid denim", () => {
    const f = parseFabric("Cotton 100% denim");
    expect(f.weave).toBe("牛仔");
    expect(f.stretch).toBeLessThanOrEqual(0.02);
    expect(f.drape).toBeLessThan(0.2);
    expect(stretchLabel(f)).toBe("無彈性");
  });
  test("stretch denim with elastane", () => {
    const f = parseFabric("98% cotton, 2% elastane, stretch denim");
    expect(f.composition.find((c) => c.fiber === "spandex")?.pct).toBe(2);
    expect(f.stretch).toBeGreaterThan(0.02);
  });
  test("English multi fibre with rayon", () => {
    const f = parseFabric("Rayon 70%, Nylon 30%");
    expect(f.composition.map((c) => c.fiber)).toEqual(["rayon", "nylon"]);
    expect(f.drape).toBeGreaterThan(0.6);
  });
  test("fibres without percentages", () => {
    const f = parseFabric("羊毛混紡 針織毛衣");
    expect(f.composition[0].fiber).toBe("wool");
    expect(f.structure).toBe("knit");
  });
});
