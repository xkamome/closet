// UNIQLO basics as wardrobe items: flat-lay drawn by the garment designer, size chart from UNIQLO,
// best size picked for the current body when worn.

import type { Measurements } from "../avatar/measure";
import { cutoutGarment, type Cutout } from "../garment/photo";
import { riseOffset, specFor, type GarmentSpec } from "../garment/spec";
import { parseFabric } from "../fit/fabric";
import { evaluateFit, recommendSize, type FitResult } from "../fit/fit";
import type { ParsedChart, SizeRow } from "../fit/sizeChart";
import { drawDesign } from "../look/designer";
import { UNIQLO, type UniqloItem } from "./uniqlo";
import { wardrobe, type SavedGarment } from "./wardrobe";

export const uniqloItem = (id: string): UniqloItem | undefined => UNIQLO.find((u) => u.id === id);

/** Flat-lay photo of a UNIQLO basic in one of its colours, drawn to the proportions of size M. */
export function uniqloPhoto(u: UniqloItem, colorIndex: number): HTMLCanvasElement {
  const ref = u.sizes.find((s) => s.size === "M") ?? u.sizes[Math.floor(u.sizes.length / 2)];
  const L = ref.m.length ?? (u.type === "dress" ? 115 : 60);
  // designer lengths are relative to a typical piece of each type (trousers: crotch + inseam)
  const length = u.type === "dress" ? L / 110 : u.type === "skirt" ? L / 58 : u.type === "pants" ? (300 + (ref.m.inseam ?? 76) * 7.4) / 860 : L / 60;
  return drawDesign({
    type: u.type, sleeve: u.sleeve, neckline: u.neckline, silhouette: u.silhouette,
    length,
    colors: [u.colors[colorIndex]?.hex ?? u.colors[0].hex], pattern: /羅紋/.test(u.name) ? "rib" : "solid",
    straps: /細肩帶/.test(u.name), pleated: /百褶/.test(u.name),
  });
}

export function uniqloChart(u: UniqloItem): ParsedChart {
  const rows: SizeRow[] = u.sizes.map((s) => ({ size: s.size, values: { ...s.m }, ranges: {} }));
  return { unit: "cm", flat: false, rows, warnings: [] };
}

/** plain colours need no photo: the garment is drawn in its colour with a fabric texture */
/**
 * UNIQLO's own way: the size whose body ranges contain your bust / waist / hips (tops look at the bust,
 * bottoms at waist and hips). Falls back to the garment-ease rules when an item has no body table.
 */
export function uniqloRecommend(u: UniqloItem, body: { bust: number; waist: number; hips: number }): string | null {
  const keys: ("bust" | "waist" | "hips")[] = u.type === "top" ? ["bust"] : u.type === "dress" ? ["bust", "waist", "hips"] : ["waist", "hips"];
  let best: string | null = null, bestScore = Infinity;
  for (const z of u.sizes) {
    if (!z.body) continue;
    let score = 0, n = 0;
    for (const k of keys) {
      const r = z.body[k];
      if (!r) continue;
      const v = body[k], mid = (r[0] + r[1]) / 2;
      // outside the range counts a lot, the distance to its middle breaks ties
      score += (v < r[0] ? r[0] - v : v > r[1] ? v - r[1] : 0) * 10 + Math.abs(v - mid) * 0.1;
      n++;
    }
    // for bottoms the hips decide when waist and hips point to different sizes (a size too small at the
    // hips doesn't go on at all)
    if (n && score < bestScore) { bestScore = score; best = z.size; }
  }
  return best;
}

/** "建議尺碼" / "比建議大 1 號" … for the worn-list label */
export function sizeNote(u: UniqloItem, size: string, recommended: string): string {
  const i = u.sizes.findIndex((z) => z.size === size), j = u.sizes.findIndex((z) => z.size === recommended);
  const us = u.sizing === "us" ? "（美版尺寸）" : "";
  if (i === j) return `${size} 建議尺碼${us}`;
  return `${size} 比建議${i > j ? "大" : "小"} ${Math.abs(i - j)} 號${us}`;
}

export interface UniqloWear { spec: GarmentSpec; cutout: Cutout | null; chart: ParsedChart; fit: FitResult; recommended: string }

/** Spec for wearing a UNIQLO basic: the recommended size for this body unless `size` is given. */
export function wearUniqlo(u: UniqloItem, colorIndex: number, meas: Measurements, size?: string): UniqloWear {
  const fabric = parseFabric(u.fabricText);
  const chart = uniqloChart(u);
  const recSize = uniqloRecommend(u, meas) ?? recommendSize(chart.rows, meas, u.type, fabric, u.sleeve)!.best.size;
  const row = chart.rows.find((r) => r.size === size) ?? chart.rows.find((r) => r.size === recSize) ?? chart.rows[0];
  const color = u.colors[colorIndex] ?? u.colors[0];
  const spec = specFor(u.type, { sleeve: u.sleeve, neckline: u.neckline, silhouette: u.silhouette, rise: "natural", color: color.hex, pleated: /百褶/.test(u.name) }, meas);
  // chart values win; anything the chart doesn't give keeps the cut's defaults for this body
  spec.m = { ...spec.m, ...row.values };
  if (u.type === "pants" && row.values.inseam !== undefined) {
    // shorts / cropped: the outseam is the rise (waistband to crotch) plus the inseam
    spec.m.length = Math.round(meas.waistY + riseOffset("pants", spec.rise) * 100 - meas.crotchY + row.values.inseam);
  }
  if (u.type === "skirt" && row.values.hem === undefined && spec.m.hip) {
    // no hem width in the chart: tiered / pleated skirts open wider than their hip
    spec.m.hem = Math.max(spec.m.hem ?? 0, spec.m.hip * (/百褶/.test(u.name) ? 1.8 : 1.3));
  }
  spec.size = row.size;
  spec.fabric = fabric;
  const fit = evaluateFit(row, meas, u.type, fabric, u.sleeve);
  return { spec, cutout: null, chart, fit, recommended: recSize };
}

const toBlob = (c: HTMLCanvasElement) => new Promise<Blob>((res, rej) => c.toBlob((b) => (b ? res(b) : rej(new Error("toBlob failed"))), "image/png"));

/** Add every UNIQLO basic to the wardrobe once (kept if the user deletes some later). */
/** bump when the catalogue changes: new items are added (deleted ones stay deleted); v3 renamed the items */
const UNIQLO_VERSION = "3";
/** items added in each catalogue version */
const ADDED_IN: Record<string, string> = { skirts: "2", sports: "2" };

export async function seedUniqlo(force = false): Promise<number> {
  const KEY = "closet2.uniqloSeeded";
  let stored: string | null = null;
  try { stored = localStorage.getItem(KEY); } catch { /* seed anyway */ }
  if (!force && stored === UNIQLO_VERSION) return 0;
  const t0 = Date.now() - 100000;
  let n = 0;
  const existing = new Map((await wardrobe.list()).map((g) => [g.id, g]));
  for (const [i, u] of UNIQLO.entries()) {
    const id = "uniqlo-" + u.id;
    const old = existing.get(id);
    if (old) {
      // stored before the rename: keep the item (and the user's colour), update its name
      if (old.name !== "U牌 " + u.name) await wardrobe.put({ ...old, name: "U牌 " + u.name });
      continue;
    }
    const isNew = (ADDED_IN[u.group] ?? "1") > (stored ?? "0");
    if (!force && stored && !isNew) continue;
    const c = cutoutGarment(uniqloPhoto(u, 0));
    const thumb = document.createElement("canvas");
    thumb.width = thumb.height = 96;
    const k = Math.min(96 / c.width, 96 / c.height);
    thumb.getContext("2d")!.drawImage(c.canvas, (96 - c.width * k) / 2, (96 - c.height * k) / 2, c.width * k, c.height * k);
    const g: SavedGarment = {
      id, name: "U牌 " + u.name, createdAt: t0 - i * 1000, plainBack: false, fabricText: u.fabricText,
      spec: { type: u.type, sleeve: u.sleeve, neckline: u.neckline, silhouette: u.silhouette, rise: "natural", m: {}, fabric: parseFabric(u.fabricText) },
      thumb: await toBlob(thumb), color: c.color, uniqlo: { id: u.id, color: 0 },
    };
    await wardrobe.put(g);
    n++;
  }
  try { localStorage.setItem(KEY, UNIQLO_VERSION); } catch { /* ignore */ }
  return n;
}

/** Ready-made outfits (UNIQLO pieces, colour by name), worn together with one click. */
export const OUTFITS: { name: string; items: { id: string; color: string }[]; tucked?: boolean }[] = [
  { name: "瑜伽", items: [{ id: "E487016-000", color: "黑" }, { id: "E483546-000", color: "黑" }] },
  { name: "跑步", items: [{ id: "E483458-000", color: "白" }, { id: "E483294-000", color: "黑" }] },
  { name: "健身", items: [{ id: "E487016-000", color: "藍" }, { id: "E483295-000", color: "黑" }] },
  { name: "休閒運動", items: [{ id: "E483458-000", color: "黑" }, { id: "E483282-000", color: "灰" }] },
  { name: "喇叭褲運動", items: [{ id: "E465760-000", color: "白" }, { id: "E483296-000", color: "黑" }] },
  { name: "長裙日常", items: [{ id: "E465760-000", color: "黑" }, { id: "E482285-000", color: "米白" }], tucked: true },
  { name: "層次長裙", items: [{ id: "E424873-000", color: "白" }, { id: "E482286-000", color: "黑" }], tucked: true },
];

/** colour index by name (first colour when the item doesn't come in it) */
export function colorIndex(u: UniqloItem, name: string): number {
  return Math.max(0, u.colors.findIndex((c) => c.name === name));
}
