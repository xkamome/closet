// Fit judgement: garment finished measurements vs. body measurements, fabric-stretch aware.

import type { Measurements } from "../avatar/measure";
import type { Fabric } from "./fabric";
import type { GarmentKey, SizeRow } from "./sizeChart";
import { GARMENT_KEY_LABELS } from "./sizeChart";
import type { GarmentType, Sleeve } from "../garment/spec";

export type FitStatus = "過小" | "偏緊" | "合身" | "寬鬆" | "過大" | "偏短" | "剛好" | "偏長";

export interface RegionFit {
  key: GarmentKey;
  label: string;
  garment: number;
  body: number;
  ease: number;
  status: FitStatus;
  note: string;
}

export interface FitResult {
  size: string;
  regions: RegionFit[];
  score: number; // lower is better
  verdict: "太小" | "偏小" | "合身" | "偏大" | "太大";
  summary: string;
}

type BodyLike = Pick<Measurements, "bust" | "waist" | "hips" | "shoulder" | "armLength" | "inseam" | "thigh" | "upperArm" | "height" | "neckY" | "waistY" | "hipY" | "crotchY" | "kneeY" | "shoulderY">;

interface EaseRule { min: number; comfort: number; loose: number }

/** Ease rules (cm of garment girth over body girth). */
function easeRule(key: GarmentKey, type: GarmentType, knit: boolean): EaseRule | null {
  const bottom = type === "skirt" || type === "pants";
  switch (key) {
    case "chest":
      return knit ? { min: 0, comfort: 10, loose: 24 } : { min: 4, comfort: 16, loose: 28 };
    case "waist":
      if (bottom || type === "dress") return knit ? { min: -6, comfort: 4, loose: 9 } : { min: 1, comfort: 6, loose: 11 };
      return knit ? { min: -4, comfort: 24, loose: 44 } : { min: 2, comfort: 26, loose: 46 };
    case "hip":
      if (type === "pants") return knit ? { min: 0, comfort: 7, loose: 18 } : { min: 3, comfort: 10, loose: 20 };
      if (type === "skirt" || type === "dress") return knit ? { min: -5, comfort: 10, loose: 30 } : { min: 3, comfort: 14, loose: 40 };
      return knit ? { min: -2, comfort: 22, loose: 44 } : { min: 2, comfort: 24, loose: 46 };
    case "thigh":
      return knit ? { min: 0, comfort: 8, loose: 18 } : { min: 2, comfort: 10, loose: 20 };
    case "upperArm":
      return knit ? { min: 0, comfort: 7, loose: 16 } : { min: 3, comfort: 9, loose: 18 };
    default:
      return null;
  }
}

function bodyFor(key: GarmentKey, b: BodyLike): number | null {
  switch (key) {
    case "chest": return b.bust;
    case "waist": return b.waist;
    case "hip": return b.hips;
    case "thigh": return b.thigh;
    case "shoulder": return b.shoulder;
    case "upperArm": return b.upperArm;
    default: return null;
  }
}

const r1 = (v: number) => Math.round(v * 10) / 10;

export function evaluateFit(row: SizeRow, body: BodyLike, type: GarmentType, fabric: Fabric, sleeve: Sleeve = "short"): FitResult {
  const knit = fabric.structure === "knit" || fabric.stretch >= 0.1;
  const regions: RegionFit[] = [];
  let score = 0;
  const range = row.ranges;

  for (const [key, g] of Object.entries(row.values) as [GarmentKey, number][]) {
    const label = GARMENT_KEY_LABELS[key];
    // girths
    const rule = easeRule(key, type, knit);
    const b = bodyFor(key, body);
    if (rule && b !== null) {
      // elastic waistbands: the range upper bound is how far it stretches
      const maxGirth = range[key] ? range[key]![1] : g * (1 + fabric.stretch);
      const relaxed = range[key] ? range[key]![0] : g;
      const ease = relaxed - b;
      let status: FitStatus, note: string;
      if (maxGirth < b - 0.5) { status = "過小"; note = `比身體小 ${r1(b - maxGirth)}cm，${fabric.stretch > 0.05 ? "彈性也撐不下" : "布料沒有彈性"}`; score += 100 + (b - maxGirth) * 5; }
      else if (ease < rule.min) { status = "偏緊"; note = knit || range[key] ? "靠彈性撐開，會很貼身" : "活動空間不足，坐下或抬手會緊繃"; score += 15 + (rule.min - ease) * 2; }
      else if (ease <= rule.comfort) { status = "合身"; note = `鬆份 ${r1(ease)}cm`; score += Math.abs(ease - (rule.min + rule.comfort) / 2) * 0.3; }
      else if (ease <= rule.loose) { status = "寬鬆"; note = `鬆份 ${r1(ease)}cm，屬寬鬆版型`; score += (ease - rule.comfort) * 0.6; }
      else {
        status = "過大";
        note = (key === "waist" && (type === "skirt" || type === "pants")) ? "腰頭太鬆會往下滑，需要改腰或繫皮帶" : `鬆份 ${r1(ease)}cm，明顯太大`;
        score += 30 + (ease - rule.loose) * 2;
      }
      regions.push({ key, label, garment: r1(g), body: r1(b), ease: r1(ease), status, note });
      continue;
    }
    // shoulder width (linear)
    if (key === "shoulder") {
      const d = g - body.shoulder;
      let status: FitStatus, note: string;
      const tight = knit ? -4 : -2.5;
      if (d < tight - 2) { status = "過小"; note = "肩線會卡在肩膀內側，手臂活動受限"; score += 60; }
      else if (d < tight) { status = "偏緊"; note = "肩線略窄"; score += 12; }
      else if (d <= 2.5) { status = "合身"; note = "肩線落在肩點"; }
      else if (d <= 8) { status = "寬鬆"; note = "落肩設計的效果"; score += (d - 2.5) * 0.8; }
      else { status = "過大"; note = "肩線掉到上臂，看起來不合身"; score += 25; }
      regions.push({ key, label, garment: r1(g), body: r1(body.shoulder), ease: r1(d), status, note });
      continue;
    }
    // lengths: descriptive
    if (key === "sleeveLength" && sleeve === "long") {
      const d = g - body.armLength;
      const status: FitStatus = d < -6 ? "偏短" : d > 5 ? "偏長" : "剛好";
      const note = status === "偏短" ? "會變成七分／九分袖" : status === "偏長" ? "袖子會蓋過手腕、堆在手背" : "袖口落在手腕";
      if (status !== "剛好") score += 5;
      regions.push({ key, label, garment: r1(g), body: r1(body.armLength), ease: r1(d), status, note });
      continue;
    }
    if (key === "inseam" && type === "pants") {
      const d = g - body.inseam;
      const status: FitStatus = d < -8 ? "偏短" : d > 4 ? "偏長" : "剛好";
      const note = status === "偏短" ? "會變成九分褲、露出腳踝" : status === "偏長" ? "褲管會堆在鞋面或拖地，建議修改褲長" : "褲長剛好到腳踝／鞋面";
      if (status !== "剛好") score += 4;
      regions.push({ key, label, garment: r1(g), body: r1(body.inseam), ease: r1(d), status, note });
      continue;
    }
    if (key === "length") {
      regions.push({ key, label, garment: r1(g), body: 0, ease: 0, status: "剛好", note: describeLength(type, g, body) });
    }
  }

  const bad = regions.filter((r) => r.status === "過小").length;
  const tight = regions.filter((r) => r.status === "偏緊").length;
  const big = regions.filter((r) => r.status === "過大").length;
  const loose = regions.filter((r) => r.status === "寬鬆").length;
  const verdict: FitResult["verdict"] = bad ? "太小" : big >= 2 || (big && !loose) ? "太大" : tight ? "偏小" : big || loose >= 2 ? "偏大" : "合身";
  const summary = {
    太小: "這個尺碼穿不下，建議改大一號。",
    偏小: "勉強穿得下，但會比較緊。",
    合身: "這個尺碼整體合身。",
    偏大: "整體偏寬鬆，喜歡合身可以改小一號。",
    太大: "這個尺碼明顯太大，建議改小一號。",
  }[verdict];
  return { size: row.size, regions, score: Math.round(score * 10) / 10, verdict, summary };
}

export function describeLength(type: GarmentType, length: number, b: BodyLike): string {
  // top/dress lengths are measured from the high point shoulder (≈ neck base)
  const start = type === "skirt" || type === "pants" ? b.waistY : b.neckY;
  const end = start - length;
  const where =
    end > b.waistY + 3 ? "短版，下擺在腰線以上" :
      end > b.hipY ? "下擺在腰臀之間" :
        end > b.crotchY - 3 ? "下擺蓋住臀部" :
          end > b.kneeY + 8 ? "長度到大腿" :
            end > b.kneeY - 6 ? "長度在膝蓋附近" :
              end > 25 ? "長度到小腿" : "長度到腳踝";
  return `${where}（離地約 ${Math.max(0, Math.round(end))}cm）`;
}

export interface SizeRecommendation { best: FitResult; all: FitResult[] }

export function recommendSize(rows: SizeRow[], body: BodyLike, type: GarmentType, fabric: Fabric, sleeve: Sleeve = "short"): SizeRecommendation | null {
  if (!rows.length) return null;
  const all = rows.map((r) => evaluateFit(r, body, type, fabric, sleeve));
  const best = all.reduce((a, b) => (b.score < a.score ? b : a));
  return { best, all };
}
