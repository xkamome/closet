// Fabric description -> physical-ish properties used by fit judgement and garment rendering.

export interface FiberPart { fiber: FiberKind; pct: number }
export type FiberKind =
  | "cotton" | "polyester" | "spandex" | "nylon" | "rayon" | "wool" | "linen" | "silk" | "lyocell" | "modal" | "acrylic" | "other";

export interface Fabric {
  composition: FiberPart[];
  structure: "knit" | "woven" | "unknown";
  weave: string | null; // denim / chiffon / rib ...
  /** extra girth the fabric can stretch to, as a fraction (0.05 = +5%) */
  stretch: number;
  /** 0 = stiff (denim), 1 = fluid (silk chiffon) */
  drape: number;
  /** metres */
  thickness: number;
  /** 0 matte .. 1 glossy */
  sheen: number;
  label: string;
}

export const FIBER_LABELS: Record<FiberKind, string> = {
  cotton: "棉", polyester: "聚酯纖維", spandex: "彈性纖維", nylon: "尼龍", rayon: "嫘縈", wool: "羊毛",
  linen: "麻", silk: "絲", lyocell: "天絲", modal: "莫代爾", acrylic: "壓克力纖維", other: "其他",
};

const FIBERS: [FiberKind, RegExp][] = [
  ["spandex", /彈性纖維|弹性纤维|彈性|弹性|氨綸|氨纶|spandex|elastane|lycra|萊卡|莱卡|\bpu\b|polyurethane/i],
  ["polyester", /聚酯纖維|聚酯纤维|聚酯|滌綸|涤纶|polyester|\bpoly\b/i],
  ["nylon", /尼龍|尼龙|錦綸|锦纶|nylon|polyamide/i],
  ["lyocell", /天絲|天丝|萊賽爾|莱赛尔|lyocell|tencel/i],
  ["modal", /莫代爾|莫代尔|modal/i],
  ["rayon", /嫘縈|嫘萦|人造絲|人造丝|黏膠|粘胶|粘纤|rayon|viscose/i],
  ["silk", /真絲|真丝|蠶絲|蚕丝|桑蠶絲|silk|(?<!人造)絲/i],
  ["wool", /羊毛|毛料|wool|cashmere|羊絨|羊绒|mohair/i],
  ["linen", /亞麻|亚麻|苧麻|苎麻|麻|linen|ramie/i],
  ["acrylic", /壓克力|亚克力|腈綸|腈纶|acrylic/i],
  ["cotton", /純棉|纯棉|棉|cotton/i],
];

const WEAVES: [string, RegExp, "knit" | "woven"][] = [
  ["羅紋", /羅紋|罗纹|坑條|坑条|\brib/i, "knit"],
  ["針織", /針織|针织|knit|jersey|汗布|毛衣|sweater|衛衣|卫衣|毛圈|terry|雙面布|双面布/i, "knit"],
  ["牛仔", /牛仔|丹寧|丹宁|denim/i, "woven"],
  ["雪紡", /雪紡|雪纺|chiffon/i, "woven"],
  ["緞面", /緞|缎|satin/i, "woven"],
  ["西裝料", /西裝|西装|suiting|毛呢|呢料|tweed/i, "woven"],
  ["梭織", /梭織|梭织|woven|府綢|府绸|poplin|牛津|oxford|襯衫布/i, "woven"],
];

export function parseFabric(text: string): Fabric {
  const composition: FiberPart[] = [];
  // "棉95% 彈性纖維5%" / "95%棉" / "Cotton 60%, Polyester 40%" / "100% polyester"
  const re = /(\d{1,3}(?:\.\d+)?)\s*%\s*([^\d%,，、;；\s/]+)?|([^\d%,，、;；\s/:：]+)\s*[:：]?\s*(\d{1,3}(?:\.\d+)?)\s*%/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(text))) {
    const pct = parseFloat(m[1] ?? m[4]);
    const name = (m[2] ?? m[3] ?? "").trim();
    const kind = fiberOf(name) ?? (m[1] ? fiberOf(text.slice(Math.max(0, m.index - 8), m.index)) : null);
    if (kind) {
      const ex = composition.find((c) => c.fiber === kind);
      if (ex) ex.pct += pct; else composition.push({ fiber: kind, pct });
    }
  }
  if (!composition.length) {
    // no percentages: take fibers mentioned
    for (const [k, r] of FIBERS) if (r.test(text) && !composition.some((c) => c.fiber === k)) composition.push({ fiber: k, pct: 0 });
    if (composition.length) {
      const each = 100 / composition.length;
      composition.forEach((c) => (c.pct = each));
    }
  }
  let structure: Fabric["structure"] = "unknown";
  let weave: string | null = null;
  for (const [name, r, s] of WEAVES) if (r.test(text)) { weave = name; structure = s; break; }

  const pct = (k: FiberKind) => composition.filter((c) => c.fiber === k).reduce((s, c) => s + c.pct, 0);
  const spandex = pct("spandex");
  if (structure === "unknown" && spandex >= 8) structure = "knit";

  // stretch capacity
  let stretch = structure === "knit" ? (weave === "羅紋" ? 0.25 : 0.12) : 0.02;
  if (structure === "unknown") stretch = 0.04;
  stretch += spandex * (structure === "knit" ? 0.03 : 0.015);
  if (weave === "牛仔" && spandex === 0) stretch = 0.01;
  stretch = Math.min(0.5, Math.round(stretch * 1000) / 1000);

  // drape / thickness / sheen from dominant fibres & weave
  const w = (k: FiberKind) => pct(k) / 100;
  let drape = 0.5 + 0.35 * (w("silk") + w("rayon") + w("modal") + w("lyocell")) - 0.2 * w("linen") + 0.05 * w("polyester") - 0.1 * w("cotton");
  let thickness = structure === "knit" ? 0.0012 : 0.0008;
  let sheen = 0.1 + 0.6 * w("silk") + 0.25 * w("polyester") + 0.2 * w("nylon") + 0.15 * w("rayon");
  if (weave === "牛仔") { drape = 0.12; thickness = 0.0022; sheen = 0.02; }
  if (weave === "雪紡") { drape = 0.92; thickness = 0.0004; }
  if (weave === "緞面") { sheen = Math.max(sheen, 0.75); drape = Math.max(drape, 0.75); }
  if (weave === "西裝料") { drape = 0.35; thickness = 0.0018; }
  if (weave === "羅紋") thickness = 0.0015;
  if (w("wool") > 0.5 && structure === "knit") thickness = 0.003;
  drape = Math.max(0.05, Math.min(0.97, drape));
  sheen = Math.max(0, Math.min(1, sheen));

  const label = [
    composition.map((c) => `${FIBER_LABELS[c.fiber]}${c.pct ? Math.round(c.pct) + "%" : ""}`).join(" "),
    weave ?? (structure === "knit" ? "針織" : structure === "woven" ? "梭織" : ""),
  ].filter(Boolean).join("・") || "未指定材質";
  return { composition, structure, weave, stretch, drape, thickness, sheen, label };
}

function fiberOf(name: string): FiberKind | null {
  for (const [k, r] of FIBERS) if (r.test(name)) return k;
  return null;
}

export function stretchLabel(f: Fabric): string {
  if (f.stretch >= 0.25) return "高彈性";
  if (f.stretch >= 0.1) return "中彈性";
  if (f.stretch >= 0.04) return "微彈性";
  return "無彈性";
}

export const DEFAULT_FABRIC: Fabric = parseFabric("棉100%");
