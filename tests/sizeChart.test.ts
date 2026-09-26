import { describe, expect, test } from "vitest";
import { parseSizeChart, matchKey } from "../src/fit/sizeChart";

describe("size chart parser", () => {
  test("row-oriented Chinese table with girths", () => {
    const r = parseSizeChart(["尺寸(cm) 肩寬 胸圍 衣長 袖長", "S 36 88 60 58", "M 37 92 62 59", "L 38 96 64 60"].join("\n"));
    expect(r.rows.map((x) => x.size)).toEqual(["S", "M", "L"]);
    expect(r.rows[1].values).toMatchObject({ shoulder: 37, chest: 92, length: 62, sleeveLength: 59 });
    expect(r.flat).toBe(false);
  });

  test("flat (平量) half widths are doubled", () => {
    const r = parseSizeChart(["平量尺寸", "M：胸寬48 衣長62 袖長20", "L：胸寬50 衣長64 袖長21"].join("\n"));
    expect(r.rows[0].values.chest).toBe(96);
    expect(r.rows[1].values.chest).toBe(100);
    expect(r.rows[1].values.length).toBe(64);
    expect(r.flat).toBe(true);
  });

  test("column-oriented table (sizes across)", () => {
    const r = parseSizeChart(["尺碼 S M L XL", "腰圍 64 68 72 76", "臀圍 90 94 98 102", "褲長 96 97 98 99"].join("\n"));
    expect(r.rows.length).toBe(4);
    expect(r.rows[2]).toMatchObject({ size: "L", values: { waist: 72, hip: 98, length: 98 } });
  });

  test("English with inches", () => {
    const r = parseSizeChart(["Size | Bust | Waist | Length (inch)", "S | 34 | 27 | 35", "M | 36 | 29 | 36"].join("\n"));
    expect(r.unit).toBe("in");
    expect(r.rows[0].values.chest).toBeCloseTo(86.4, 1);
    expect(r.rows[1].values.waist).toBeCloseTo(73.7, 1);
  });

  test("elastic range and free size", () => {
    const r = parseSizeChart("F 腰圍 64-80 臀圍 100 裙長 75");
    expect(r.rows[0].size).toBe("F");
    expect(r.rows[0].ranges.waist).toEqual([64, 80]);
    expect(r.rows[0].values.hip).toBe(100);
    expect(r.rows[0].values.length).toBe(75);
  });

  test("implausibly small girth is treated as flat measurement", () => {
    const r = parseSizeChart(["尺寸 胸圍 腰圍 衣長", "M 46 38 88"].join("\n"));
    expect(r.rows[0].values.chest).toBe(92);
    expect(r.rows[0].values.waist).toBe(76);
  });

  test("simplified Chinese labels", () => {
    expect(matchKey("胸围")).toBe("chest");
    expect(matchKey("裤长")).toBe("length");
    expect(matchKey("前裆")).toBe("rise");
  });

  test("messy real-world paste with notes and a model line", () => {
    const r = parseSizeChart([
      "尺寸表(單位:cm)",
      "尺寸\t肩寬\t胸圍\t衣長\t袖長",
      "F\t38\t96\t65\t20",
      "※手工平量，誤差約1~3公分",
      "模特兒身高168cm 體重50kg 穿F",
    ].join("\n"));
    expect(r.rows.length).toBe(1);
    // already a full girth although the page says 平量: must not be doubled
    expect(r.rows[0].values).toMatchObject({ shoulder: 38, chest: 96, length: 65, sleeveLength: 20 });
  });

  test("平量 note with half widths still doubles", () => {
    const r = parseSizeChart(["平鋪測量", "尺寸 胸圍 腰圍 衣長", "M 46 40 90", "L 48 42 92"].join("\n"));
    expect(r.rows[0].values.chest).toBe(92);
    expect(r.rows[1].values.waist).toBe(84);
  });

  test("English per-size lines", () => {
    const r = parseSizeChart(["S: Bust 84cm, Waist 66cm, Hip 90cm, Length 95cm", "M: Bust 88cm, Waist 70cm, Hip 94cm, Length 96cm"].join("\n"));
    expect(r.rows.map((x) => x.size)).toEqual(["S", "M"]);
    expect(r.rows[1].values).toMatchObject({ chest: 88, waist: 70, hip: 94, length: 96 });
  });

  test("empty input warns", () => {
    expect(parseSizeChart("hello").warnings.length).toBeGreaterThan(0);
  });
});
