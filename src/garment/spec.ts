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
