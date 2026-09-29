import { describe, expect, test } from "vitest";
import { delaunay } from "../src/face/faceSwap";
import { convexHull } from "../src/avatar/measure";

const area = (a: number[], b: number[], c: number[]) => ((b[0] - a[0]) * (c[1] - a[1]) - (b[1] - a[1]) * (c[0] - a[0])) / 2;

describe("face mapping triangulation", () => {
  // pseudo-random points, like face landmarks (deterministic)
  let seed = 7;
  const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
  const pts: [number, number][] = Array.from({ length: 120 }, () => [rnd() * 300, rnd() * 400]);
  const t = delaunay(pts);

  test("triangles cover exactly the convex hull, without overlaps or degenerate triangles", () => {
    let sum = 0;
    for (let i = 0; i < t.length; i += 3) {
      const a = Math.abs(area(pts[t[i]], pts[t[i + 1]], pts[t[i + 2]]));
      expect(a).toBeGreaterThan(1e-6);
      sum += a;
    }
    const hull = convexHull(pts.flat());
    let hullArea = 0;
    for (let i = 0; i < hull.length / 2; i++) {
      const j = (i + 1) % (hull.length / 2);
      hullArea += (hull[i * 2] * hull[j * 2 + 1] - hull[j * 2] * hull[i * 2 + 1]) / 2;
    }
    expect(sum).toBeCloseTo(Math.abs(hullArea), 3);
  });

  test("no point lies inside any triangle's circumcircle (Delaunay property)", () => {
    for (let i = 0; i < t.length; i += 3) {
      const [a, b, c] = [pts[t[i]], pts[t[i + 1]], pts[t[i + 2]]];
      const D = 2 * (a[0] * (b[1] - c[1]) + b[0] * (c[1] - a[1]) + c[0] * (a[1] - b[1]));
      const ux = ((a[0] ** 2 + a[1] ** 2) * (b[1] - c[1]) + (b[0] ** 2 + b[1] ** 2) * (c[1] - a[1]) + (c[0] ** 2 + c[1] ** 2) * (a[1] - b[1])) / D;
      const uy = ((a[0] ** 2 + a[1] ** 2) * (c[0] - b[0]) + (b[0] ** 2 + b[1] ** 2) * (a[0] - c[0]) + (c[0] ** 2 + c[1] ** 2) * (b[0] - a[0])) / D;
      const r2 = (a[0] - ux) ** 2 + (a[1] - uy) ** 2;
      for (let k = 0; k < pts.length; k++) {
        if (k === t[i] || k === t[i + 1] || k === t[i + 2]) continue;
        expect((pts[k][0] - ux) ** 2 + (pts[k][1] - uy) ** 2).toBeGreaterThan(r2 * (1 - 1e-9));
      }
    }
  });
});
