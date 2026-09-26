// Rule-based styling advice (Traditional Chinese, Taiwan) + prompt builder for the optional AI bridge.

import type { BodyShape, ShapeResult } from "./bodyShape";
import type { FitResult } from "../fit/fit";
import type { GarmentSpec } from "../garment/spec";
import { NECK_LABELS, RISE_LABELS, SILHOUETTE_LABELS, SLEEVE_LABELS, TYPE_LABELS } from "../garment/spec";

export interface Advice {
  headline: string;
  goal: string;
  recommend: string[];
  avoid: string[];
  necklines: string[];
  tips: string[];
  garmentComments: string[];
}

const RULES: Record<BodyShape, Omit<Advice, "tips" | "garmentComments" | "headline">> = {
  hourglass: {
    goal: "保留腰線、順著曲線穿，不要把身形藏起來。",
    recommend: ["收腰洋裝／裹身裙", "高腰鉛筆裙", "合身針織上衣", "繫腰帶的西裝外套", "高腰直筒或微喇叭褲"],
    avoid: ["過大的直筒 oversized 上衣（會吃掉腰線）", "沒有腰身的布袋洋裝", "太硬挺、撐出方正輪廓的布料"],
    necklines: ["V 領", "裹身領", "方領"],
  },
  pear: {
    goal: "把視覺重心往上帶，平衡較豐滿的下半身。",
    recommend: ["一字領、方領、泡泡袖等上半身有細節的上衣", "A 字裙、傘狀裙", "高腰寬褲、微喇叭褲", "短版外套（長度在腰線）", "深色下身＋亮色上衣"],
    avoid: ["緊身鉛筆裙搭貼身上衣", "臀部有大口袋或大面積印花的下身", "下擺剛好停在臀部最寬處的上衣"],
    necklines: ["一字領", "方領", "船型領"],
  },
  apple: {
    goal: "拉長上半身線條，把重點放在腿部與肩頸。",
    recommend: ["V 領、深 U 領上衣", "帝國腰線（胸下收腰）洋裝", "垂墜感長版開襟外套", "直筒褲、微寬褲", "露出小腿或腳踝的長度"],
    avoid: ["緊身短版上衣", "腰部有大蝴蝶結或粗腰帶", "腰腹處的橫條紋或亮面布料"],
    necklines: ["V 領", "U 領", "襯衫領敞開"],
  },
  rectangle: {
    goal: "製造腰身與曲線，讓線條更有層次。",
    recommend: ["腰帶、紮衣角做出腰線", "荷葉邊、抓皺、層次設計", "A 字裙、百褶裙", "短版上衣＋高腰下身", "削肩或有肩部設計的上衣"],
    avoid: ["上下都是直筒又沒有腰線", "整身同一個寬度的布袋款"],
    necklines: ["甜心領", "U 領", "圓領加上項鍊"],
  },
  invertedTriangle: {
    goal: "柔化肩線，增加下半身份量來平衡。",
    recommend: ["V 領、深 U 領", "拉克蘭袖、無肩線的上衣", "A 字裙、蓬裙、寬褲", "下半身用亮色或印花", "垂墜感布料的上衣"],
    avoid: ["墊肩、泡泡袖、一字領", "肩上有飾片或橫條紋", "極窄的鉛筆裙搭寬肩上衣"],
    necklines: ["V 領", "U 領", "繞頸"],
  },
};

export function buildAdvice(shape: ShapeResult, garment?: GarmentSpec | null, fit?: FitResult | null): Advice {
  const base = RULES[shape.shape];
  const tips: string[] = [];
  if (shape.heightClass === "petite") {
    tips.push("嬌小身型：選高腰下身、同色系上下身，能拉長比例；外套長度盡量在臀部以上。");
    tips.push("裙長選膝上或到小腿最細處，避免停在小腿肚。");
  } else if (shape.heightClass === "tall") {
    tips.push("高挑身型：可以駕馭長版大衣、及踝長裙與寬褲，用撞色腰帶切分比例。");
  } else {
    tips.push("中等身高：多數長度都適合，下身選高腰或九分褲能讓腿看起來更長。");
  }
  if (shape.legs === "short") tips.push("上身比例較長：上衣紮進高腰下身、鞋子選裸色或與褲同色。");
  if (shape.legs === "long") tips.push("腿長比例佳：短裙、短褲或合身直筒褲都能展現腿部線條。");

  const garmentComments: string[] = [];
  if (garment) garmentComments.push(...commentGarment(shape.shape, garment));
  if (fit) {
    garmentComments.push(`尺碼 ${fit.size}：${fit.summary}`);
    for (const r of fit.regions) {
      if (r.status === "過小" || r.status === "過大" || r.status === "偏緊") garmentComments.push(`${r.label}${r.status}：${r.note}`);
    }
  }
  return {
    headline: `${shape.label}・${shape.heightLabel}・${shape.legsLabel}`,
    goal: base.goal, recommend: base.recommend, avoid: base.avoid, necklines: base.necklines, tips, garmentComments,
  };
}

function commentGarment(shape: BodyShape, g: GarmentSpec): string[] {
  const out: string[] = [];
  const name = `${SILHOUETTE_LABELS[g.silhouette]}${TYPE_LABELS[g.type]}`;
  const good = (s: string) => out.push(`👍 ${s}`);
  const warn = (s: string) => out.push(`⚠️ ${s}`);
  const isBottom = g.type === "skirt" || g.type === "pants" || g.type === "dress";
  if (isBottom && g.silhouette === "aline") {
    if (shape === "pear" || shape === "invertedTriangle" || shape === "rectangle") good(`${name}能平衡臀腿與上半身比例，很適合你的身形。`);
    if (shape === "apple") good(`${name}不貼腹部，腰腹比較沒有壓力。`);
  }
  if (isBottom && g.silhouette === "fitted") {
    if (shape === "hourglass") good(`合身的${TYPE_LABELS[g.type]}能完整展現沙漏曲線。`);
    if (shape === "pear") warn("貼身下身會強調臀圍，建議上半身選有份量或亮色的上衣平衡。");
    if (shape === "apple") warn("貼身版型會凸顯腰腹，可以外搭長版開襟外套。");
  }
  if (g.type === "top" || g.type === "dress") {
    if (g.neckline === "v" && (shape === "apple" || shape === "invertedTriangle" || shape === "hourglass")) good(`${NECK_LABELS.v}能拉長頸部線條，很適合你。`);
    if (g.neckline === "boat" && shape === "invertedTriangle") warn("一字領會加寬肩線，倒三角型要小心。");
    if (g.neckline === "boat" && shape === "pear") good("一字領把視線拉到肩頸，能平衡下半身。");
    if (g.silhouette === "oversized" && (shape === "hourglass" || shape === "rectangle")) warn("寬鬆上衣會蓋掉腰線，建議紮一角或加腰帶。");
    if (g.sleeve === "short" && shape === "invertedTriangle") out.push(`💡 ${SLEEVE_LABELS.short}可選袖口稍寬、不貼上臂的款式。`);
  }
  if (g.fabric.drape > 0.7) out.push("💡 垂墜布料會順著身體線條落下，視覺上比較修長。");
  if (g.fabric.drape < 0.2) out.push("💡 挺版布料（如牛仔）輪廓分明，能修飾但也會增加份量。");
  if (!out.length) out.push(`${name}屬於百搭款，搭配上面的原則即可。`);
  return out;
}

/** Prompt for the optional local `claude -p` bridge (or to paste into claude.ai). */
export function buildAIPrompt(body: Record<string, number>, shape: ShapeResult, garment?: GarmentSpec | null, fit?: FitResult | null, question?: string): string {
  const lines = [
    "你是專業的服裝造型師，請用臺灣繁體中文回答，條列、具體、實用。",
    "",
    "【我的身材】",
    `身高 ${body.height}cm、胸圍 ${body.bust}cm、腰圍 ${body.waist}cm、臀圍 ${body.hips}cm、肩寬 ${body.shoulder}cm、跨下長 ${body.inseam}cm`,
    `體型判斷：${shape.label}（${shape.reasons.join("；")}），${shape.heightLabel}，${shape.legsLabel}`,
  ];
  if (garment) {
    const bottom = garment.type === "skirt" || garment.type === "pants";
    const details = bottom ? RISE_LABELS[garment.rise] : `${SLEEVE_LABELS[garment.sleeve]}、${NECK_LABELS[garment.neckline]}`;
    lines.push("", "【正在試穿的衣服】",
      `${SILHOUETTE_LABELS[garment.silhouette]}${bottom && garment.type === "skirt" ? "半身裙" : TYPE_LABELS[garment.type]}，${details}，材質：${garment.fabric.label}`,
      `成衣尺寸：${Object.entries(garment.m).map(([k, v]) => `${k} ${Math.round(v!)}cm`).join("、")}`);
  }
  if (fit) lines.push(`合身判斷：${fit.summary}；${fit.regions.map((r) => `${r.label}${r.status}`).join("、")}`);
  lines.push("", question?.trim() || "請告訴我：1) 這樣的身材適合哪些版型與單品 2) 這件衣服怎麼搭配（上下身、鞋子、配件）3) 要避免什麼。");
  return lines.join("\n");
}
