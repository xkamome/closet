import { describe, expect, test } from "vitest";
import { analyzePersonGarments, chainT, chainY, type PersonMarks } from "../src/garment/personPhoto";
import { ellipsePerimeter, measureFromSilhouette, runWidth } from "../src/photo/measureMath";

// a 200x400 synthetic person facing the camera
const W = 200, H = 400;
const marks: PersonMarks = {
  shoulderL: [130, 80], shoulderR: [70, 80], elbowL: [140, 140], elbowR: [60, 140], wristL: [145, 195], wristR: [55, 195],
  hipL: [120, 200], hipR: [80, 200], kneeL: [118, 290], kneeR: [82, 290], ankleL: [116, 380], ankleR: [84, 380],
};
const CLOTHES = 4, SKIN = 2;

function paint(fn: (x: number, y: number) => number) {
  const labels = new Uint8Array(W * H), rgb = new Uint8ClampedArray(W * H * 4);
  for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
    const l = fn(x, y);
    labels[y * W + x] = l;
    const o = (y * W + x) * 4;
    const c = l === CLOTHES ? (y < 200 ? [200, 40, 40] : [40, 40, 200]) : [220, 190, 170];
    rgb[o] = c[0]; rgb[o + 1] = c[1]; rgb[o + 2] = c[2]; rgb[o + 3] = 255;
  }
  return { labels, rgb };
}
const body = (x: number, y: number) => {
  if (y < 80) return Math.abs(x - 100) < 15 ? SKIN : 0;
  if (y < 200) return Math.abs(x - 100) < 35 ? SKIN : Math.abs(x - 100) < 48 && y < 200 ? SKIN : 0; // torso + arms
  return Math.abs(x - 118) < 12 || Math.abs(x - 82) < 12 ? SKIN : 0; // legs
};

describe("person photo garment analysis", () => {
  test("chain helpers are inverse", () => {
    for (const t of [0, 0.5, 1.3, 2.7]) expect(chainT(marks, chainY(marks, t))).toBeCloseTo(t, 5);
  });

  test("short-sleeve top + knee skirt", () => {
    const { labels, rgb } = paint((x, y) => {
      if (y >= 78 && y <= 205 && Math.abs(x - 100) < 36) return CLOTHES; // top torso
      if (y >= 78 && y <= 110 && Math.abs(x - 100) < 48) return CLOTHES; // short sleeves
      if (y > 205 && y <= 295 && Math.abs(x - 100) < 20 + (y - 205) * 0.25) return CLOTHES; // flared skirt
      return body(x, y);
    });
    const g = analyzePersonGarments(labels, rgb, W, H, marks);
    expect(g.map((x) => x.type)).toEqual(["top", "skirt"]);
    expect(g[0].sleeve).toBe("short");
    expect(g[1].hemT).toBeGreaterThan(1.8);
    expect(g[1].hemT).toBeLessThan(2.3);
  });

  test("trousers are detected from the gap between the legs", () => {
    const { labels, rgb } = paint((x, y) => {
      if (y >= 190 && y <= 375 && (Math.abs(x - 118) < 14 || Math.abs(x - 82) < 14 || (y < 225 && Math.abs(x - 100) < 32))) return CLOTHES;
      return body(x, y);
    });
    const g = analyzePersonGarments(labels, rgb, W, H, marks);
    const pants = g.find((x) => x.type === "pants");
    expect(pants).toBeTruthy();
    expect(pants!.hemT).toBeGreaterThan(2.7);
  });

  test("one-colour garment from shoulders to knees is a dress", () => {
    const { labels } = paint((x, y) => (y >= 78 && y <= 300 && Math.abs(x - 100) < 28 ? CLOTHES : body(x, y)));
    const rgb = new Uint8ClampedArray(W * H * 4).fill(120);
    const g = analyzePersonGarments(labels, rgb, W, H, marks);
    expect(g.length).toBe(1);
    expect(g[0].type).toBe("dress");
    expect(g[0].sleeve).toBe("none");
  });
});

describe("photo measuring maths", () => {
  test("ellipse perimeter", () => {
    expect(ellipsePerimeter(1, 1)).toBeCloseTo(2 * Math.PI, 5);
    expect(ellipsePerimeter(2, 1)).toBeCloseTo(9.6884, 3);
  });

  test("silhouette measurement scales with height", () => {
    const mask = new Uint8Array(W * H);
    for (let y = 10; y < 390; y++) for (let x = 0; x < W; x++) {
      const half = y < 80 ? 14 : y < 200 ? (y < 120 ? 34 : y < 160 ? 28 : 36) : 0;
      if (Math.abs(x - 100) < half || (y >= 200 && (Math.abs(x - 118) < 12 || Math.abs(x - 82) < 12))) mask[y * W + x] = 1;
    }
    const lm = Array.from({ length: 33 }, () => ({ x: 100, y: 200 }));
    const set = (i: number, p: [number, number]) => { lm[i] = { x: p[0], y: p[1] }; };
    set(11, marks.shoulderL); set(12, marks.shoulderR); set(13, marks.elbowL); set(14, marks.elbowR);
    set(15, marks.wristL); set(16, marks.wristR); set(23, marks.hipL); set(24, marks.hipR);
    const s = { mask, width: W, height: H };
    expect(runWidth(s, 100, 100)).toBe(67);
    const r = measureFromSilhouette(s, lm, 160);
    expect(r.height).toBe(160);
    expect(r.waist).toBeLessThan(r.hips);
    expect(r.inseam).toBeGreaterThan(50);
  });
});
