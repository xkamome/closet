// 用提示詞生出衣櫃: a text description -> garment designs -> drawn flat-lay photos -> wardrobe items.
// Claude (through the local bridge, the user's own subscription) reads the description; without the
// bridge a keyword reader handles plain descriptions. Sizes follow the closest UNIQLO basic.

import type { Measurements } from "../avatar/measure";
import { cutoutGarment, type Cutout } from "../garment/photo";
import { specFor, type GarmentSpec, type GarmentType, type Neckline, type Silhouette, type Sleeve } from "../garment/spec";
import { parseFabric } from "../fit/fabric";
import { drawDesign, type Design, type Pattern } from "../look/designer";
import { uniqloItem, wearUniqlo, type UniqloWear } from "./uniqloWear";
import type { SavedGarment } from "./wardrobe";

export interface GenItem extends Design { name: string; fabric: string }

const TYPES: GarmentType[] = ["top", "dress", "skirt", "pants"];
const SLEEVES: Sleeve[] = ["none", "short", "elbow", "long"];
const NECKS: Neckline[] = ["crew", "v", "scoop", "boat"];
const SILS: Silhouette[] = ["fitted", "straight", "aline", "oversized"];
const PATTERNS: Pattern[] = ["solid", "stripe", "pinstripe", "plaid", "gingham", "floral", "dots", "rib", "denim", "knit", "text"];

export function buildGenPrompt(text: string, count: number): string {
  return `你是服裝設計助理。依照使用者的描述，設計 ${count} 件女裝單品${count > 1 ? "，彼此要好搭配" : ""}。
只輸出 JSON 陣列，不要任何其他文字。每件的格式：
{"name":"繁體中文品名（10 字內）","type":"top|dress|skirt|pants","sleeve":"none|short|elbow|long","neckline":"crew|v|scoop|boat","silhouette":"fitted|straight|aline|oversized","length":數字,"colors":["#底色","#花紋色1","#花紋色2"],"pattern":"${PATTERNS.join("|")}","text":"只有 pattern 為 text 時的印字（英文，14 字內）","fabric":"材質，例如 棉95% 彈性纖維5% 針織","pleated":是否百褶(true/false)}
length：1 是該類型的一般長度；0.7 是短版，1.3 是長版，長裙或長洋裝用 1.5。
裙子和褲子的 sleeve 用 none、neckline 用 crew。
使用者的描述：${text}`;
}

const clampNum = (v: unknown, lo: number, hi: number, d: number) => (typeof v === "number" && Number.isFinite(v) ? Math.max(lo, Math.min(hi, v)) : d);
const pick = <T extends string>(v: unknown, list: T[], d: T): T => (list.includes(v as T) ? (v as T) : d);
const hex = (v: unknown) => (typeof v === "string" && /^#[0-9a-f]{6}$/i.test(v) ? v : null);

/** Parse Claude's answer (tolerates text around the JSON). */
export function parseGenItems(answer: string): GenItem[] {
  const a = answer.indexOf("["), b = answer.lastIndexOf("]");
  if (a < 0 || b <= a) throw new Error("AI 沒有回傳衣服清單");
  const arr = JSON.parse(answer.slice(a, b + 1));
  if (!Array.isArray(arr)) throw new Error("AI 回傳格式不對");
  return arr.slice(0, 12).map((o: any, i: number) => normalize(o, i));
}

function normalize(o: any, i: number): GenItem {
  const type = pick(o?.type, TYPES, "top");
  const colors = (Array.isArray(o?.colors) ? o.colors : []).map(hex).filter(Boolean) as string[];
  return {
    name: String(o?.name ?? "新衣服").slice(0, 16),
    type,
    sleeve: type === "skirt" || type === "pants" ? "none" : pick(o?.sleeve, SLEEVES, "short"),
    neckline: pick(o?.neckline, NECKS, "crew"),
    silhouette: pick(o?.silhouette, SILS, type === "skirt" || type === "dress" ? "aline" : "straight"),
    length: clampNum(o?.length, 0.6, 1.7, 1),
    colors: colors.length ? colors : ["#8a95a8"],
    pattern: pick(o?.pattern, PATTERNS, "solid"),
    text: typeof o?.text === "string" ? o.text.slice(0, 14) : undefined,
    fabric: typeof o?.fabric === "string" && o.fabric.trim() ? o.fabric.slice(0, 40) : "棉100%",
    straps: false,
    pleated: o?.pleated === true && (type === "skirt" || type === "dress"),
    seed: 17 + i * 31,
  };
}

// ------------------------------------------------------------------ keyword reader (no bridge)
const COLOR_WORDS: [RegExp, string][] = [
  [/酒紅|勃根地/, "#6e2635"], [/紅/, "#b8323a"], [/粉/, "#e3a7b4"], [/橘|橙/, "#d9793e"], [/黃|芥末/, "#e0b84a"],
  [/卡其|駝/, "#b9a079"], [/米白|奶油|象牙/, "#efe7d6"], [/米|杏/, "#d8c3a3"], [/白/, "#f4f2ee"], [/淺灰/, "#c9c8c5"], [/深灰|炭/, "#4b4c50"],
  [/灰/, "#9d9c99"], [/黑/, "#1f1f22"], [/海軍|藏青|深藍/, "#232f4b"], [/丹寧|牛仔/, "#3d5a80"], [/天藍|淺藍|水藍/, "#9fc3e0"], [/藍/, "#4f6fa8"],
  [/墨綠|深綠/, "#2f4a3a"], [/橄欖|軍綠/, "#6b6b3e"], [/綠/, "#5f8a5c"], [/紫/, "#76608f"], [/咖啡|棕|褐/, "#7a5238"],
];

/** Read one garment description with keywords ("白色條紋長袖上衣"). */
export function readKeywords(text: string, i = 0): GenItem {
  const t = text;
  const type: GarmentType = /洋裝|連身|禮服|dress/i.test(t) ? "dress" : /褲/.test(t) ? "pants" : /裙/.test(t) ? "skirt" : "top";
  const sleeve: Sleeve = /無袖|背心|細肩|削肩/.test(t) ? "none" : /長袖/.test(t) ? "long" : /五分|七分|中袖/.test(t) ? "elbow" : "short";
  const neckline: Neckline = /v ?領/i.test(t) ? "v" : /一字|平口/.test(t) ? "boat" : /u ?領|方領|大圓領/i.test(t) ? "scoop" : "crew";
  const silhouette: Silhouette = /寬|oversize|落肩/i.test(t) ? "oversized" : /a ?字|傘|蓬|喇叭|百褶|層次/i.test(t) ? "aline"
    : /合身|修身|緊身|貼身|窄/.test(t) ? "fitted" : type === "skirt" || type === "dress" ? "aline" : "straight";
  const length = /迷你|短版|短褲|短裙/.test(t) ? 0.7 : /長裙|長洋裝|及踝|maxi/i.test(t) ? 1.5 : /長版|中長|過膝/.test(t) ? 1.25 : 1;
  const pattern: Pattern = /細條紋/.test(t) ? "pinstripe" : /條紋|橫紋/.test(t) ? "stripe" : /格紋|蘇格蘭/.test(t) ? "plaid" : /格子|方格|千鳥/.test(t) ? "gingham"
    : /碎花|花朵|印花|花/.test(t) ? "floral" : /點點|圓點|波卡/.test(t) ? "dots" : /牛仔|丹寧/.test(t) ? "denim" : /羅紋|坑條/.test(t) ? "rib"
    : /針織|毛衣/.test(t) ? "knit" : "solid";
  const colors: string[] = [];
  let rest = t;
  for (const [re, h] of COLOR_WORDS) {
    const m = re.exec(rest);
    if (m) { colors.push(h); rest = rest.replace(re, ""); }
  }
  if (pattern === "denim" && !colors.length) colors.push("#3d5a80");
  if (!colors.length) colors.push(["#f4f2ee", "#1f1f22", "#8a95a8", "#d8c3a3"][i % 4]);
  if (pattern !== "solid" && pattern !== "denim" && pattern !== "rib" && pattern !== "knit" && colors.length < 2) colors.push(colors[0] === "#f4f2ee" ? "#232f4b" : "#f4f2ee");
  const pleated = /百褶|褶裙|pleat/i.test(t);
  const fabric = pattern === "denim" ? "棉98% 彈性纖維2% 牛仔布" : /雪紡/.test(t) ? "聚酯纖維100% 雪紡 梭織" : /麻/.test(t) ? "棉70% 麻30% 梭織"
    : /針織|羅紋|t恤|t 恤|背心/i.test(t) || type === "top" ? "棉100% 針織" : "棉100% 梭織";
  const name = t.replace(/\s+/g, "").slice(0, 12) || "新衣服";
  return { name, type, sleeve: type === "skirt" || type === "pants" ? "none" : sleeve, neckline, silhouette, length, colors, pattern, fabric, pleated, seed: 17 + i * 31 };
}

/** Split "白T、黑色寬褲、碎花長裙" into single garments; one description -> one item. */
export function readKeywordList(text: string): GenItem[] {
  const parts = text.split(/[、，,；;＋+\n]|和|跟|配/).map((s) => s.trim()).filter((s) => /衣|t恤|t 恤|襯衫|背心|洋裝|連身|裙|褲|毛衣|上衣/i.test(s));
  return (parts.length ? parts : [text]).slice(0, 12).map((p, i) => readKeywords(p, i));
}

// ------------------------------------------------------------------ sizing from the closest UNIQLO basic
/** The UNIQLO basic whose size chart a generated garment borrows. */
export function uniqloBase(d: Pick<Design, "type" | "sleeve" | "silhouette" | "pleated">): string {
  switch (d.type) {
    case "dress": return d.silhouette === "fitted" ? "E488722-000" : d.silhouette === "straight" ? "E488186-000" : "E482982-000";
    case "skirt": return d.pleated ? "E487996-000" : d.silhouette === "fitted" || d.silhouette === "straight" ? "E487997-000" : "E482286-000";
    case "pants": return d.silhouette === "fitted" ? "E483546-000" : d.silhouette === "aline" ? "E483296-000" : "E483282-000";
    default:
      if (d.sleeve === "none") return d.silhouette === "fitted" ? "E482195-000" : "E473980-000";
      if (d.sleeve === "long") return d.silhouette === "fitted" ? "E487579-000" : "E465751-000";
      return d.silhouette === "oversized" ? "E465755-000" : d.silhouette === "fitted" ? "E465760-000" : "E424873-000";
  }
}

/** Wear a generated garment: girths and size from the UNIQLO base, cut and length from the design. */
export function wearGenerated(d: Design & { fabric?: string }, base: string, meas: Measurements, size?: string): UniqloWear & { spec: GarmentSpec } {
  const u = uniqloItem(base)!;
  const r = wearUniqlo(u, 0, meas, size);
  const cut = specFor(d.type, { sleeve: d.sleeve, neckline: d.neckline, silhouette: d.silhouette, rise: "natural", color: d.colors[0], pleated: d.pleated }, meas);
  const girths = ["chest", "waist", "hip", "hem", "shoulder", "thigh", "legOpening", "upperArm"] as const;
  const m = { ...cut.m };
  for (const k of girths) if (r.spec.m[k] !== undefined && u.type === d.type) m[k] = r.spec.m[k];
  // lengths follow the design (1 = the usual length of the type)
  if (m.length) m.length = Math.round(m.length * (d.length ?? 1));
  const spec: GarmentSpec = { ...cut, m, size: r.spec.size, fabric: parseFabric(d.fabric ?? "棉100%") };
  return { ...r, spec };
}

const toBlob = (c: HTMLCanvasElement) => new Promise<Blob>((res, rej) => c.toBlob((b) => (b ? res(b) : rej(new Error("toBlob failed"))), "image/png"));

/** Draw and pack a generated garment as a wardrobe item. */
export async function packGenerated(g: GenItem, createdAt = Date.now()): Promise<SavedGarment> {
  const photo = drawDesign(g);
  const c: Cutout = cutoutGarment(photo);
  const thumb = document.createElement("canvas");
  thumb.width = thumb.height = 96;
  const k = Math.min(96 / c.width, 96 / c.height);
  thumb.getContext("2d")!.drawImage(c.canvas, (96 - c.width * k) / 2, (96 - c.height * k) / 2, c.width * k, c.height * k);
  return {
    id: "gen-" + crypto.randomUUID(), name: "✦ " + g.name, createdAt, plainBack: false, fabricText: g.fabric,
    spec: { type: g.type, sleeve: g.sleeve, neckline: g.neckline, silhouette: g.silhouette, rise: "natural", m: {}, fabric: parseFabric(g.fabric) },
    thumb: await toBlob(thumb), cutout: await toBlob(c.canvas), color: c.color,
    generated: { design: g, base: uniqloBase(g) },
  };
}
