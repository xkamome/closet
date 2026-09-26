// Garment photo processing (browser): background removal, dominant colour, garment-type guess,
// and building the front/back texture atlas that maps the photo onto the 3D garment.

import type { GarmentType, Sleeve } from "./spec";

export interface Cutout {
  canvas: HTMLCanvasElement; // RGBA, background transparent, cropped to the garment
  mask: Uint8Array; // 1 = garment (cropped size)
  width: number;
  height: number;
  color: [number, number, number];
  /** half width (px) of the garment body at 60% of its height, measured from the centre column */
  torsoHalfWidth: number;
  centerX: number;
}

export async function loadImage(src: File | Blob | string): Promise<HTMLImageElement> {
  const url = typeof src === "string" ? src : URL.createObjectURL(src);
  const img = new Image();
  img.decoding = "async";
  img.src = url;
  await img.decode();
  return img;
}

const MAX = 900;

/**
 * Remove a (mostly uniform) background by flood-filling from the image border with a colour
 * tolerance adapted to the border's own variance. Works well for product / flat-lay photos.
 */
export function cutoutGarment(img: CanvasImageSource & { width: number; height: number }): Cutout {
  const scale = Math.min(1, MAX / Math.max(img.width, img.height));
  const W = Math.max(1, Math.round(img.width * scale)), H = Math.max(1, Math.round(img.height * scale));
  const cnv = document.createElement("canvas");
  cnv.width = W; cnv.height = H;
  const ctx = cnv.getContext("2d", { willReadFrequently: true })!;
  ctx.drawImage(img, 0, 0, W, H);
  const id = ctx.getImageData(0, 0, W, H);
  const px = id.data;
  const bgMask = floodBackground(px, W, H);
  // keep the largest foreground component
  const fg = largestComponent(bgMask, W, H);
  let x0 = W, x1 = 0, y0 = H, y1 = 0;
  for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) if (fg[y * W + x]) {
    x0 = Math.min(x0, x); x1 = Math.max(x1, x); y0 = Math.min(y0, y); y1 = Math.max(y1, y);
  }
  if (x1 <= x0 || y1 <= y0) { x0 = 0; y0 = 0; x1 = W - 1; y1 = H - 1; fg.fill(1); }
  const cw = x1 - x0 + 1, ch = y1 - y0 + 1;
  const out = document.createElement("canvas");
  out.width = cw; out.height = ch;
  const octx = out.getContext("2d")!;
  const oid = octx.createImageData(cw, ch);
  const mask = new Uint8Array(cw * ch);
  let r = 0, g = 0, b = 0, n = 0;
  for (let y = 0; y < ch; y++) for (let x = 0; x < cw; x++) {
    const si = ((y + y0) * W + (x + x0));
    const o = (y * cw + x) * 4;
    const on = fg[si];
    mask[y * cw + x] = on;
    oid.data[o] = px[si * 4]; oid.data[o + 1] = px[si * 4 + 1]; oid.data[o + 2] = px[si * 4 + 2];
    oid.data[o + 3] = on ? 255 : 0;
    if (on) { r += px[si * 4]; g += px[si * 4 + 1]; b += px[si * 4 + 2]; n++; }
  }
  octx.putImageData(oid, 0, 0);
  const color: [number, number, number] = n ? [r / n, g / n, b / n] : [200, 200, 200];
  // torso half width at 60% height from the centre column
  const cxCol = Math.round(cw / 2);
  const row = Math.round(ch * 0.6);
  let l = cxCol, rr = cxCol;
  while (l > 0 && mask[row * cw + l - 1]) l--;
  while (rr < cw - 1 && mask[row * cw + rr + 1]) rr++;
  return { canvas: out, mask, width: cw, height: ch, color, torsoHalfWidth: Math.max(4, (rr - l) / 2), centerX: (l + rr) / 2 };
}

function floodBackground(px: Uint8ClampedArray, W: number, H: number): Uint8Array {
  // border colour statistics
  const border: number[][] = [];
  for (let x = 0; x < W; x += 2) { border.push(rgb(px, x, 0, W)); border.push(rgb(px, x, H - 1, W)); }
  for (let y = 0; y < H; y += 2) { border.push(rgb(px, 0, y, W)); border.push(rgb(px, W - 1, y, W)); }
  const mean = [0, 1, 2].map((k) => border.reduce((s, c) => s + c[k], 0) / border.length);
  const sd = Math.sqrt(border.reduce((s, c) => s + dist2(c, mean), 0) / border.length);
  const tol = Math.max(28, Math.min(80, sd * 2.5 + 22));
  const bg = new Uint8Array(W * H);
  const stack: number[] = [];
  const seed = (x: number, y: number) => {
    const i = y * W + x;
    if (!bg[i] && Math.sqrt(dist2(rgb(px, x, y, W), mean)) < tol) { bg[i] = 1; stack.push(i); }
  };
  for (let x = 0; x < W; x++) { seed(x, 0); seed(x, H - 1); }
  for (let y = 0; y < H; y++) { seed(0, y); seed(W - 1, y); }
  while (stack.length) {
    const i = stack.pop()!;
    const x = i % W, y = (i / W) | 0;
    const c = rgb(px, x, y, W);
    const tryN = (nx: number, ny: number) => {
      if (nx < 0 || ny < 0 || nx >= W || ny >= H) return;
      const j = ny * W + nx;
      if (bg[j]) return;
      const cn = rgb(px, nx, ny, W);
      // grow through pixels close to the background model and to their neighbour (soft gradients/shadows)
      if (Math.sqrt(dist2(cn, mean)) < tol * 1.25 && Math.sqrt(dist2(cn, c)) < tol * 0.45) { bg[j] = 1; stack.push(j); }
    };
    tryN(x + 1, y); tryN(x - 1, y); tryN(x, y + 1); tryN(x, y - 1);
  }
  return bg;
}

function largestComponent(bg: Uint8Array, W: number, H: number): Uint8Array {
  const label = new Int32Array(W * H).fill(-1);
  let best = -1, bestSize = 0, cur = 0;
  const stack: number[] = [];
  for (let s = 0; s < W * H; s++) {
    if (bg[s] || label[s] >= 0) continue;
    let size = 0;
    label[s] = cur; stack.push(s);
    while (stack.length) {
      const i = stack.pop()!;
      size++;
      const x = i % W, y = (i / W) | 0;
      for (const [nx, ny] of [[x + 1, y], [x - 1, y], [x, y + 1], [x, y - 1]]) {
        if (nx < 0 || ny < 0 || nx >= W || ny >= H) continue;
        const j = ny * W + nx;
        if (!bg[j] && label[j] < 0) { label[j] = cur; stack.push(j); }
      }
    }
    if (size > bestSize) { bestSize = size; best = cur; }
    cur++;
  }
  const out = new Uint8Array(W * H);
  // fill holes: anything not reachable background inside the garment counts as garment
  for (let i = 0; i < W * H; i++) out[i] = label[i] === best ? 1 : 0;
  return out;
}

const rgb = (px: Uint8ClampedArray, x: number, y: number, W: number) => {
  const o = (y * W + x) * 4;
  return [px[o], px[o + 1], px[o + 2]];
};
const dist2 = (a: number[], b: number[]) => (a[0] - b[0]) ** 2 + (a[1] - b[1]) ** 2 + (a[2] - b[2]) ** 2;

export interface TypeGuess { type: GarmentType; sleeve: Sleeve; confidence: number; reason: string }

/** Heuristic garment-type guess from the cut-out silhouette. */
export function guessGarment(c: Cutout): TypeGuess {
  const { mask, width: W, height: H } = c;
  const widthAt = (fy: number) => {
    const y = Math.min(H - 1, Math.round(H * fy));
    let n = 0;
    for (let x = 0; x < W; x++) n += mask[y * W + x];
    return n / W;
  };
  // leg gap: centre column empty in the lower third
  let gap = 0;
  for (let y = Math.round(H * 0.65); y < H; y++) {
    const x = Math.round(c.centerX);
    if (!mask[y * W + x]) gap++;
  }
  const aspect = H / W;
  const top = widthAt(0.12), mid = widthAt(0.5), bot = widthAt(0.95);
  const sleeveSpread = Math.max(widthAt(0.2), widthAt(0.3)) / Math.max(0.05, mid);
  if (gap > H * 0.2 && aspect > 1.2) return { type: "pants", sleeve: "none", confidence: 0.8, reason: "下半部中間有褲管間隙" };
  if (aspect > 1.55) {
    const sleeve: Sleeve = sleeveSpread > 1.35 ? (aspect > 2 ? "short" : "long") : "none";
    return { type: "dress", sleeve, confidence: 0.6, reason: "長度明顯大於寬度" };
  }
  if (top < mid * 0.9 && bot > mid * 1.1 && aspect < 1.5 && sleeveSpread < 1.2) {
    return { type: "skirt", sleeve: "none", confidence: 0.6, reason: "上窄下寬、沒有袖子" };
  }
  const sleeve: Sleeve = sleeveSpread > 1.6 ? "long" : sleeveSpread > 1.2 ? "short" : "none";
  return { type: "top", sleeve, confidence: 0.55, reason: sleeve === "none" ? "上身款、未偵測到袖子" : "上身款、有袖子" };
}

export interface AtlasOptions {
  /** garment front-view bbox (m) and torso half-width (m) from buildGarment */
  bbox: { minX: number; maxX: number; minY: number; maxY: number };
  torsoHalfWidth: number;
  plainBack?: boolean;
}

/** 2048x1024 atlas: left = front (photo), right = back (mirrored photo or plain colour). */
export function buildAtlas(c: Cutout | null, opts: AtlasOptions, fallbackColor = "#c9b8a6"): HTMLCanvasElement {
  const S = 1024;
  const cnv = document.createElement("canvas");
  cnv.width = S * 2; cnv.height = S;
  const ctx = cnv.getContext("2d")!;
  const base = c ? `rgb(${c.color.map((v) => Math.round(v)).join(",")})` : fallbackColor;
  ctx.fillStyle = base;
  ctx.fillRect(0, 0, S * 2, S);
  // subtle fabric noise so plain garments don't look like plastic
  const noise = ctx.getImageData(0, 0, S * 2, S);
  for (let i = 0; i < noise.data.length; i += 4) {
    const n = (Math.random() - 0.5) * 10;
    noise.data[i] += n; noise.data[i + 1] += n; noise.data[i + 2] += n;
  }
  ctx.putImageData(noise, 0, 0);
  if (!c) return cnv;

  const { bbox } = opts;
  const W = Math.max(bbox.maxX, -bbox.minX); // atlas u spans [-W, W] around x=0
  // horizontal: photo torso half-width -> garment torso half-width
  const sx = (opts.torsoHalfWidth / W) * (S / 2) / c.torsoHalfWidth;
  // vertical: photo top/bottom -> garment top/bottom
  const sy = S / c.height;
  const drawW = c.width * sx, drawH = c.height * sy;
  const drawFront = (x0: number, mirror: boolean) => {
    ctx.save();
    const cxAtlas = x0 + S / 2;
    ctx.translate(cxAtlas, 0);
    if (mirror) ctx.scale(-1, 1);
    // paint an edge-bleed first (blurred, larger) so seams / sleeve ends pick up garment colours
    ctx.filter = "blur(18px)";
    ctx.drawImage(c.canvas, -c.centerX * sx * 1.04, -8, drawW * 1.04, drawH + 16);
    ctx.filter = "none";
    ctx.drawImage(c.canvas, -c.centerX * sx, 0, drawW, drawH);
    ctx.restore();
  };
  drawFront(0, false);
  if (!opts.plainBack) {
    drawFront(S, true);
    // soften the back so front-only graphics read as fabric, not as a second print
    ctx.save();
    ctx.globalAlpha = 0.55;
    ctx.fillStyle = base;
    ctx.fillRect(S, 0, S, S);
    ctx.restore();
  }
  return cnv;
}
