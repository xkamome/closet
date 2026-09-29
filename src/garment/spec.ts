// Garment description shared by geometry, fit judgement and styling advice.

import type { Fabric } from "../fit/fabric";
import { DEFAULT_FABRIC } from "../fit/fabric";
import type { GarmentKey } from "../fit/sizeChart";

export type GarmentType = "top" | "dress" | "skirt" | "pants";
export type Sleeve = "none" | "short" | "elbow" | "long";
export type Neckline = "crew" | "v" | "scoop" | "boat";
export type Silhouette = "fitted" | "straight" | "aline" | "oversized";
export type Rise = "high" | "natural" | "low";

export const TYPE_LABELS: Record<GarmentType, string> = { top: "上衣", dress: "洋裝", skirt: "裙子", pants: "長褲" };
export const SLEEVE_LABELS: Record<Sleeve, string> = { none: "無袖", short: "短袖", elbow: "五分袖", long: "長袖" };
export const NECK_LABELS: Record<Neckline, string> = { crew: "圓領", v: "V 領", scoop: "U 領", boat: "一字領" };
export const SILHOUETTE_LABELS: Record<Silhouette, string> = { fitted: "合身", straight: "直筒", aline: "A 字", oversized: "寬鬆" };
export const RISE_LABELS: Record<Rise, string> = { high: "高腰", natural: "中腰", low: "低腰" };

/**
 * Waistband height relative to the natural waist (m). Trousers sit lower than skirts: mid-rise jeans
 * sit around the navel, a few cm under the narrowest point.
 */
export function riseOffset(type: GarmentType, rise: Rise): number {
  if (type === "pants") return rise === "high" ? 0.01 : rise === "low" ? -0.075 : -0.035;
  return rise === "high" ? 0.03 : rise === "low" ? -0.06 : 0;
}

export interface GarmentSpec {
  type: GarmentType;
  sleeve: Sleeve;
  neckline: Neckline;
  silhouette: Silhouette;
  rise: Rise;
  /** finished garment measurements in cm (girths are full circumference) */
  m: Partial<Record<GarmentKey, number>>;
  fabric: Fabric;
  size?: string;
  /** optional horizontal cuts (cm from the floor) — used for underwear bands */
  cut?: { topY?: number; bottomY?: number };
  /** colour used when there is no photo */
  color?: string;
  /** tops: tucked into the skirt / trousers worn with it */
  tucked?: boolean;
  /** skirts / dresses: knife pleats (narrow, regular folds stitched down to the hip) */
  pleated?: boolean;
}

/** Underwear set (bra + briefs) so the mannequin is dressed for fitting. */
export function underwearSpecs(body: { bust: number; waist: number; hips: number; thigh: number; bustY: number; crotchY: number; underbust: number; height: number }, color = "#e9d6c8"): GarmentSpec[] {
  const knit = { ...DEFAULT_FABRIC, structure: "knit" as const, stretch: 0.3, drape: 0.6, thickness: 0.0012, sheen: 0.35, label: "彈性針織" };
  const s = body.height / 160;
  return [
    {
      type: "top", sleeve: "none", neckline: "boat", silhouette: "fitted", rise: "natural", fabric: knit, color,
      m: { chest: body.bust - 1, waist: body.underbust - 2 },
      cut: { topY: body.bustY + 5.5 * s, bottomY: body.bustY - 9.5 * s },
    },
    {
      type: "pants", sleeve: "none", neckline: "crew", silhouette: "fitted", rise: "low", fabric: knit, color,
      m: { waist: body.waist + 4, hip: body.hips - 2, thigh: body.thigh - 3, legOpening: body.thigh - 3 },
      cut: { bottomY: body.crotchY - 2.5 * s },
    },
  ];
}

/** Sensible default measurements (cm) for a garment on a body with the given key girths. */
export function defaultSpec(type: GarmentType, body: { bust: number; waist: number; hips: number; shoulder: number; armLength: number; inseam: number; thigh: number; height: number; neckY?: number; hipY?: number }): GarmentSpec {
  const base: GarmentSpec = {
    type, sleeve: "short", neckline: "crew", silhouette: "straight", rise: "natural", fabric: DEFAULT_FABRIC, m: {},
  };
  const h = body.height / 160;
  switch (type) {
    case "top":
      // a regular crew-neck tee: hem a little below the hip line, sleeve to mid upper arm
      base.m = {
        shoulder: body.shoulder + 1, chest: body.bust + 8, waist: body.waist + 14, hem: body.hips + 6,
        length: body.neckY && body.hipY ? Math.round(body.neckY - body.hipY - 4 * h) : 56 * h, sleeveLength: 16 * h,
      };
      break;
    case "dress":
      base.silhouette = "aline";
      base.m = { shoulder: body.shoulder, chest: body.bust + 6, waist: body.waist + 5, hip: body.hips + 12, hem: body.hips + 60, length: 100 * h, sleeveLength: 16 * h };
      break;
    case "skirt":
      base.silhouette = "aline";
      base.sleeve = "none";
      base.m = { waist: body.waist + 2, hip: body.hips + 8, hem: body.hips + 40, length: 58 * h };
      break;
    case "pants":
      base.sleeve = "none";
      base.m = { waist: body.waist + 2, hip: body.hips + 6, thigh: body.thigh + 8, legOpening: 38, length: 98 * h, inseam: body.inseam, rise: 26 * h };
      break;
  }
  return base;
}

export interface StyleChoice { sleeve: Sleeve; neckline: Neckline; silhouette: Silhouette; rise: Rise; color?: string; pleated?: boolean }

/** A garment of `type` with the chosen cut, sized for the body (silhouette ease, sleeve length). */
export function specFor(type: GarmentType, c: StyleChoice, body: Parameters<typeof defaultSpec>[1] & { armLength: number }): GarmentSpec {
  const spec = defaultSpec(type, body);
  spec.silhouette = c.silhouette;
  spec.sleeve = type === "skirt" || type === "pants" ? "none" : c.sleeve;
  spec.neckline = c.neckline;
  spec.rise = c.rise;
  if (c.color) spec.color = c.color;
  if (c.pleated && (type === "skirt" || type === "dress")) spec.pleated = true;
  if (spec.silhouette === "oversized" && spec.m.chest) { spec.m.chest += 16; spec.m.shoulder = (spec.m.shoulder ?? body.shoulder) + 6; }
  if (spec.silhouette === "fitted" && spec.m.chest) { spec.m.chest = body.bust + 4; spec.m.waist = body.waist + 5; }
  if (spec.silhouette === "aline" && spec.m.hem) spec.m.hem = Math.max(spec.m.hem, (spec.m.hip ?? body.hips) * 1.45);
  if (spec.silhouette === "straight" && (type === "skirt" || type === "dress")) spec.m.hem = (spec.m.hip ?? body.hips + 8) * 1.02;
  if (spec.silhouette === "fitted" && type === "skirt") { spec.m.hip = body.hips + 4; spec.m.hem = body.hips - 2; }
  if (spec.sleeve === "long") spec.m.sleeveLength = body.armLength;
  if (spec.sleeve === "elbow") spec.m.sleeveLength = body.armLength * 0.55;
  return spec;
}

/**
 * A top tucked into the bottom worn with it: the hem ends 5 cm below the waistband and its lower girths
 * shrink to what fits inside the waistband (the rest of the ease blouses above it).
 */
export function tuckedSpec(top: GarmentSpec, bottom: GarmentSpec, body: { neckY: number; waistY: number; waist: number }): GarmentSpec {
  const t = structuredClone(top);
  const bandY = body.waistY + riseOffset(bottom.type, bottom.rise) * 100;
  t.m.length = Math.max(25, Math.round(body.neckY - (bandY - 5)));
  const inside = (bottom.m.waist ?? body.waist + 2) + 2;
  t.m.waist = Math.min(t.m.waist ?? t.m.chest ?? inside, inside);
  t.m.hem = t.m.waist;
  delete t.m.hip;
  return t;
}

/**
 * The shape a garment hangs in. Size charts give the fabric width (a gathered maxi skirt can measure
 * 150 cm at the hip), but soft fabric falls in folds instead of standing out: the outline only widens
 * a little at the hip and grows toward the hem. Fit judgement keeps using the chart numbers.
 */
export function drapedSpec(spec: GarmentSpec, body: { hips: number; waist: number }): GarmentSpec {
  if (spec.type !== "skirt" && spec.type !== "dress") return spec;
  const t = structuredClone(spec);
  // soft saturation: the first centimetres of ease show fully, more fabric shows less and less, but a
  // bigger size always looks a little fuller and a smaller one tighter
  const soften = (v: number, base: number, room: number) => (v <= base ? v : base + room * Math.tanh((v - base) / room));
  if (t.m.hip) t.m.hip = soften(t.m.hip, body.hips, body.hips * 0.12 + 4);
  const hemRoom = body.hips * (t.silhouette === "aline" ? 0.75 : 0.35) * (t.pleated ? 0.8 : 1);
  if (t.m.hem) t.m.hem = soften(t.m.hem, Math.max(body.hips, t.m.hip ?? 0), hemRoom);
  return t;
}
