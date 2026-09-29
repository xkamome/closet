import { describe, expect, test } from "vitest";
import { parseGenItems, readKeywordList, readKeywords, uniqloBase } from "../src/app/generate";
import { UNIQLO } from "../src/app/uniqlo";

describe("wardrobe from a description", () => {
  test("keywords: type, sleeve, pattern, colours, length", () => {
    const a = readKeywords("白色條紋長袖上衣");
    expect([a.type, a.sleeve, a.pattern]).toEqual(["top", "long", "stripe"]);
    expect(a.colors[0]).toBe("#f4f2ee");
    const b = readKeywords("黑色碎花長裙");
    expect([b.type, b.pattern, b.length]).toEqual(["skirt", "floral", 1.5]);
    const c = readKeywords("淺藍牛仔寬褲");
    expect([c.type, c.pattern, c.silhouette]).toEqual(["pants", "denim", "oversized"]);
    expect(readKeywords("酒紅V領無袖洋裝")).toMatchObject({ type: "dress", sleeve: "none", neckline: "v", colors: ["#6e2635"] });
  });
  test("a list becomes one item per garment", () => {
    const l = readKeywordList("白T恤、黑色寬褲，碎花長裙");
    expect(l.map((x) => x.type)).toEqual(["top", "pants", "skirt"]);
  });
  test("Claude's JSON answer is read and cleaned up (text around it, bad values)", () => {
    const items = parseGenItems('好的：\n[{"name":"駝色針織衫","type":"top","sleeve":"long","neckline":"v","silhouette":"oversized","length":1,"colors":["#b9a079"],"pattern":"knit","fabric":"羊毛50% 壓克力50% 針織"},{"name":"怪","type":"hat","colors":["red"],"length":9}]\n以上');
    expect(items).toHaveLength(2);
    expect(items[0]).toMatchObject({ type: "top", sleeve: "long", pattern: "knit", colors: ["#b9a079"] });
    expect(items[1]).toMatchObject({ type: "top", length: 1.7, pattern: "solid" });
    expect(items[1].colors.length).toBeGreaterThan(0);
  });
  test("every generated cut borrows the size chart of an existing UNIQLO basic of the same type", () => {
    for (const type of ["top", "dress", "skirt", "pants"] as const) for (const sleeve of ["none", "short", "long"] as const)
      for (const silhouette of ["fitted", "straight", "aline", "oversized"] as const) {
        const u = UNIQLO.find((x) => x.id === uniqloBase({ type, sleeve, silhouette }));
        expect(u, `${type}/${sleeve}/${silhouette}`).toBeTruthy();
        expect(u!.type).toBe(type);
        expect(u!.sizes.length).toBeGreaterThan(2);
      }
  });
});
