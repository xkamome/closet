// Garment designer: draws a studio flat-lay photo of a garment from a short design description
// (type, cut, proportions, colours, pattern). Used for the UNIQLO basics and for wardrobes generated
// from a text prompt. The drawing is proportional (length vs width) so the photo reads like the cut.

import type { GarmentType, Neckline, Silhouette, Sleeve } from "../garment/spec";

export type Pattern = "solid" | "stripe" | "pinstripe" | "plaid" | "gingham" | "floral" | "dots" | "rib" | "denim" | "knit" | "text";

export interface Design {
  type: GarmentType;
  sleeve: Sleeve;
  neckline: Neckline;
  silhouette: Silhouette;
  /** garment length relative to the default for its type (0.6 cropped .. 1.6 long) */
  length?: number;
  /** base colour, then pattern colours */
  colors: string[];
  pattern: Pattern;
  /** short print text for "text" pattern */
  text?: string;
  /** camisole-like thin straps for sleeveless tops / dresses */
  straps?: boolean;
  /** knife pleats (skirts / dresses) */
  pleated?: boolean;
  seed?: number;
}

const W = 900, H = 1100;

function rng(seed: number) {
  let s = (Math.abs(Math.floor(seed)) % 2147483646) + 1;
  return () => ((s = (s * 16807) % 2147483647) / 2147483647);
}

function outline(d: Design): { path: Path2D; seams: Path2D[] } {
  const cx = W / 2, p = new Path2D(), seams: Path2D[] = [];
  const L = d.length ?? 1;
  const loose = d.silhouette === "oversized" ? 1.25 : d.silhouette === "fitted" ? 0.88 : 1;
  if (d.type === "pants") {
    const top = 70, wHalf = 165 * loose, len = Math.min(980, 860 * L), crotch = 300;
    const hemHalf = d.silhouette === "fitted" ? 60 : d.silhouette === "aline" || d.silhouette === "oversized" ? 115 : 80;
    p.moveTo(cx - wHalf, top); p.lineTo(cx + wHalf, top);
    p.lineTo(cx + wHalf + 15, top + 250); p.lineTo(cx + 25 + hemHalf * 1.4, top + len); p.lineTo(cx + 22, top + len);
    p.lineTo(cx + 8, top + crotch); p.lineTo(cx - 8, top + crotch);
    p.lineTo(cx - 22, top + len); p.lineTo(cx - 25 - hemHalf * 1.4, top + len); p.lineTo(cx - wHalf - 15, top + 250); p.closePath();
    seams.push(new Path2D(`M ${cx - wHalf} ${top + 38} L ${cx + wHalf} ${top + 38}`));
    return { path: p, seams };
  }
  if (d.type === "skirt") {
    const top = 130, wHalf = 150, len = Math.min(900, 560 * L);
    const hemHalf = d.silhouette === "fitted" ? 165 : d.silhouette === "straight" ? 190 : d.silhouette === "oversized" ? 360 : 300;
    p.moveTo(cx - wHalf, top); p.lineTo(cx + wHalf, top); p.lineTo(cx + hemHalf, top + len);
    p.quadraticCurveTo(cx, top + len + 28, cx - hemHalf, top + len); p.closePath();
    seams.push(new Path2D(`M ${cx - wHalf} ${top + 32} L ${cx + wHalf} ${top + 32}`));
    return { path: p, seams };
  }
  // tops and dresses
  const dress = d.type === "dress";
  const top = dress ? 60 : 140;
  const hw = 170 * loose, neckW = d.neckline === "boat" ? 105 : d.neckline === "scoop" ? 85 : 68;
  const neckD = d.neckline === "v" ? 150 : d.neckline === "scoop" ? 105 : d.neckline === "boat" ? 30 : 55;
  const len = dress ? Math.min(1020, 860 * L) : Math.min(820, 560 * L);
  const sleeveless = d.sleeve === "none";
  const sh = sleeveless ? (d.straps ? neckW + 18 : neckW + 45) : hw + (d.silhouette === "oversized" ? 30 : 8);
  const shY = top + (sleeveless ? 6 : 26);
  const armY = top + (sleeveless ? (d.straps ? 190 : 175) : 170 * (d.silhouette === "oversized" ? 1.2 : 1));
  const waistY = top + 330, waistHalf = d.silhouette === "fitted" ? hw * 0.86 : hw;
  const hemHalf = dress ? (d.silhouette === "aline" ? hw * 1.8 : d.silhouette === "fitted" ? hw * 0.98 : hw * 1.15) : hw * (d.silhouette === "fitted" ? 0.95 : 1);
  // sleeve end relative to the shoulder point
  const sl: Record<Sleeve, [number, number]> = { none: [0, 0], short: [120, 150], elbow: [150, 290], long: [170, 490] };
  const [sdx, sdy] = sl[d.sleeve];
  const side = (s: 1 | -1) => {
    // from the shoulder point down to the hem, on side s
    const X = (x: number) => cx + s * x;
    if (sleeveless) {
      if (d.straps) p.lineTo(X(sh), armY - 60);
      p.quadraticCurveTo(X(sh + 12), armY, X(hw), armY + 8);
    } else {
      const cuff = d.sleeve === "long" ? 58 : 75;
      p.lineTo(X(sh + sdx), shY + sdy);
      p.lineTo(X(sh + sdx - cuff * 0.85), shY + sdy + cuff * 0.6);
      p.lineTo(X(hw), armY + 25);
    }
    if (dress || d.silhouette === "fitted") p.quadraticCurveTo(X(waistHalf), waistY - 60, X(waistHalf), Math.min(waistY, top + len - 40));
    p.lineTo(X(hemHalf), top + len);
  };
  p.moveTo(cx - neckW, top);
  if (d.neckline === "v") p.lineTo(cx, top + neckD); else p.quadraticCurveTo(cx, top + neckD * 2 - 10, cx + neckW, top);
  if (d.neckline === "v") p.lineTo(cx + neckW, top);
  p.lineTo(cx + sh, shY);
  side(1);
  p.quadraticCurveTo(cx, top + len + (dress && d.silhouette === "aline" ? 30 : 6), cx - hemHalf, top + len);
  // mirrored way back up
  const X = (x: number) => cx - x;
  p.lineTo(X(dress || d.silhouette === "fitted" ? waistHalf : hw), dress || d.silhouette === "fitted" ? Math.min(waistY, top + len - 40) : armY + 25);
  if (dress || d.silhouette === "fitted") p.quadraticCurveTo(X(waistHalf), waistY - 60, X(hw), armY + (sleeveless ? 8 : 25));
  if (sleeveless) {
    p.quadraticCurveTo(X(sh + 12), armY, X(sh), d.straps ? armY - 60 : shY);
  } else {
    const cuff = d.sleeve === "long" ? 58 : 75;
    p.lineTo(X(sh + sdx - cuff * 0.85), shY + sdy + cuff * 0.6);
    p.lineTo(X(sh + sdx), shY + sdy);
  }
  p.lineTo(X(sh), shY);
  p.closePath();
  seams.push(new Path2D(d.neckline === "v" ? `M ${cx - neckW} ${top} L ${cx} ${top + neckD} L ${cx + neckW} ${top}` : `M ${cx - neckW} ${top + 8} Q ${cx} ${top + neckD * 2 + 4} ${cx + neckW} ${top + 8}`));
  if (dress && d.silhouette !== "straight") seams.push(new Path2D(`M ${cx - waistHalf} ${waistY} L ${cx + waistHalf} ${waistY}`));
  return { path: p, seams };
}

function paintPattern(g: CanvasRenderingContext2D, d: Design): void {
  const [base, a = "#222", b = "#c33", c = "#f2d35b"] = d.colors;
  const r = rng(d.seed ?? 11);
  g.fillStyle = base; g.fillRect(0, 0, W, H);
  switch (d.pattern) {
    case "stripe": g.fillStyle = a; for (let y = 0; y < H; y += 36) g.fillRect(0, y, W, 14); break;
    case "pinstripe": g.fillStyle = a; for (let x = 0; x < W; x += 22) g.fillRect(x, 0, 2, H); break;
    case "plaid":
      for (let x = 0; x < W; x += 70) { g.fillStyle = a + "66"; g.fillRect(x, 0, 22, H); g.fillStyle = b + "44"; g.fillRect(x + 36, 0, 6, H); }
      for (let y = 0; y < H; y += 70) { g.fillStyle = a + "66"; g.fillRect(0, y, W, 22); g.fillStyle = b + "44"; g.fillRect(0, y + 36, W, 6); }
      break;
    case "gingham":
      g.fillStyle = a + "77";
      for (let x = 0; x < W; x += 40) g.fillRect(x, 0, 20, H);
      for (let y = 0; y < H; y += 40) g.fillRect(0, y, W, 20);
      break;
    case "dots": g.fillStyle = a; for (let y = 10; y < H; y += 44) for (let x = (y / 44) % 2 ? 32 : 10; x < W; x += 44) { g.beginPath(); g.arc(x, y, 7, 0, Math.PI * 2); g.fill(); } break;
    case "floral":
      for (let i = 0; i < 240; i++) {
        const x = r() * W, y = r() * H, rr = 9 + r() * 12;
        g.fillStyle = [a, b, c][Math.floor(r() * 3)];
        for (let k = 0; k < 5; k++) { const t = (k / 5) * Math.PI * 2 + r(); g.beginPath(); g.ellipse(x + Math.cos(t) * rr * 0.7, y + Math.sin(t) * rr * 0.7, rr * 0.55, rr * 0.35, t, 0, Math.PI * 2); g.fill(); }
        g.fillStyle = "#f5d36b"; g.beginPath(); g.arc(x, y, rr * 0.25, 0, Math.PI * 2); g.fill();
      }
      break;
    case "rib": for (let x = 0; x < W; x += 7) { g.fillStyle = "rgba(0,0,0,0.08)"; g.fillRect(x, 0, 3, H); } break;
    case "knit":
      for (let y = 0; y < H; y += 10) for (let x = (y / 10) % 2 ? 5 : 0; x < W; x += 10) { g.fillStyle = "rgba(0,0,0,0.07)"; g.beginPath(); g.ellipse(x, y, 4, 6, 0.4, 0, Math.PI * 2); g.fill(); }
      break;
    case "denim":
      for (let i = 0; i < 5000; i++) { g.fillStyle = i % 3 ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.06)"; g.fillRect((i * 97) % W, (i * 61) % H, 14, 1); }
      break;
    case "text":
      g.fillStyle = a; g.font = "bold 58px Georgia, serif"; g.textAlign = "center";
      g.fillText((d.text ?? "").slice(0, 14), W / 2, d.type === "dress" ? 380 : 440);
      break;
  }
}

/** A studio flat-lay photo (light grey background, soft shadow, fabric shading, stitch lines). */
export function drawDesign(d: Design): HTMLCanvasElement {
  const c = document.createElement("canvas");
  c.width = W; c.height = H;
  const ctx = c.getContext("2d")!;
  const bg = ctx.createLinearGradient(0, 0, 0, H);
  bg.addColorStop(0, "#d9d7d3"); bg.addColorStop(1, "#cfccc7");
  ctx.fillStyle = bg; ctx.fillRect(0, 0, W, H);
  const { path, seams } = outline(d);
  ctx.save();
  ctx.shadowColor = "rgba(0,0,0,0.18)"; ctx.shadowBlur = 18; ctx.shadowOffsetY = 6;
  ctx.fillStyle = "#888"; ctx.fill(path);
  ctx.restore();
  ctx.save();
  ctx.clip(path);
  paintPattern(ctx, d);
  for (let i = 0; i < 7; i++) {
    const x = 120 + i * 110 + Math.sin(i * 7.3) * 40;
    const gr = ctx.createLinearGradient(x - 60, 0, x + 60, 0);
    gr.addColorStop(0, "rgba(0,0,0,0)"); gr.addColorStop(0.5, i % 2 ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.06)"); gr.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = gr; ctx.fillRect(x - 60, 0, 120, H);
  }
  if (d.pleated) {
    // pleat lines fanning out from the waistband
    const top = d.type === "skirt" ? 170 : 420;
    for (let k = -14; k <= 14; k++) {
      const gr = ctx.createLinearGradient(0, top, 0, H);
      gr.addColorStop(0, "rgba(0,0,0,0)"); gr.addColorStop(0.15, "rgba(0,0,0,0.12)"); gr.addColorStop(1, "rgba(0,0,0,0.16)");
      ctx.strokeStyle = gr; ctx.lineWidth = 3;
      ctx.beginPath(); ctx.moveTo(W / 2 + k * 11, top); ctx.lineTo(W / 2 + k * 24, H); ctx.stroke();
    }
  }
  ctx.lineWidth = 10; ctx.strokeStyle = "rgba(0,0,0,0.05)"; ctx.stroke(path);
  ctx.lineWidth = 2; ctx.setLineDash([6, 5]); ctx.strokeStyle = "rgba(0,0,0,0.18)";
  for (const s of seams) ctx.stroke(s);
  ctx.restore();
  return c;
}
