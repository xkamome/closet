// Body shape classification (adapted from the FFIT for Apparel rules, Simmons et al. 2004)
// plus height / proportion categories. All inputs in cm.

export type BodyShape = "hourglass" | "pear" | "apple" | "rectangle" | "invertedTriangle";

export const SHAPE_LABELS: Record<BodyShape, string> = {
  hourglass: "沙漏型", pear: "梨型", apple: "蘋果型", rectangle: "H 型（直筒型）", invertedTriangle: "倒三角型",
};

export interface ShapeInput { bust: number; waist: number; hips: number; shoulder?: number; height: number; inseam?: number }

export interface ShapeResult {
  shape: BodyShape;
  label: string;
  heightClass: "petite" | "average" | "tall";
  heightLabel: string;
  legs: "long" | "balanced" | "short";
  legsLabel: string;
  whr: number;
  reasons: string[];
}

const IN = 2.54;

export function classifyBodyShape(m: ShapeInput): ShapeResult {
  const { bust: b, waist: w, hips: h } = m;
  const reasons: string[] = [];
  const whr = w / h;
  let shape: BodyShape;
  // shoulder-driven top width: wide shoulders read as a larger upper body
  const topWidth = m.shoulder ? Math.max(b, b + (m.shoulder - 38) * 2.2) : b;

  if (w >= b * 0.9 && w >= h * 0.86) {
    shape = "apple";
    reasons.push(`腰圍 ${w}cm 接近胸圍與臀圍，腰臀比 ${whr.toFixed(2)}，重心在腰腹`);
  } else if (Math.abs(topWidth - h) <= 1 * IN + 2 && (topWidth - w >= 9 * IN * 0.85 || h - w >= 10 * IN * 0.85)) {
    shape = "hourglass";
    reasons.push(`胸臀差 ${Math.abs(b - h).toFixed(0)}cm 很接近，且腰比胸臀小很多（胸腰差 ${(b - w).toFixed(0)}cm）`);
  } else if (h - topWidth >= 3.6 * IN) {
    shape = "pear";
    reasons.push(`臀圍比胸圍大 ${(h - b).toFixed(0)}cm，下半身較豐滿`);
  } else if (topWidth - h >= 3.6 * IN) {
    shape = "invertedTriangle";
    reasons.push(`上半身（胸／肩）比臀部寬 ${(topWidth - h).toFixed(0)}cm`);
  } else if (b - w < 9 * IN * 0.85 && h - w < 10 * IN * 0.85) {
    shape = "rectangle";
    reasons.push(`胸、腰、臀差距小（胸腰差 ${(b - w).toFixed(0)}cm、臀腰差 ${(h - w).toFixed(0)}cm），線條直順`);
  } else {
    shape = h >= b ? "hourglass" : "invertedTriangle";
    reasons.push("腰線明顯，胸臀比例接近");
  }
  if (m.shoulder && m.shoulder >= 40) reasons.push(`肩寬 ${m.shoulder}cm 偏寬`);
  if (m.shoulder && m.shoulder <= 34) reasons.push(`肩寬 ${m.shoulder}cm 偏窄`);

  const heightClass = m.height < 156 ? "petite" : m.height > 168 ? "tall" : "average";
  const ratio = m.inseam ? m.inseam / m.height : 0.45;
  const legs = ratio >= 0.47 ? "long" : ratio <= 0.43 ? "short" : "balanced";
  return {
    shape, label: SHAPE_LABELS[shape], heightClass,
    heightLabel: { petite: "嬌小", average: "中等身高", tall: "高挑" }[heightClass],
    legs, legsLabel: { long: "腿長比例佳", balanced: "上下身比例均衡", short: "上身比例較長" }[legs],
    whr: Math.round(whr * 100) / 100, reasons,
  };
}
