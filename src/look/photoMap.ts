// Flat-lay photo -> look garment panels. The photo is read like a pattern: neckline, shoulder seam,
// shoulder point, armpit, side seams, hem (and waist / crotch / legs for bottoms, cuffs for sleeves).
// Every panel row of the 3D garment maps to the matching row of the photo panel through these
// landmarks, so a chest print sits on the chest and stripes run level.

import type { Cutout, PersonWarp } from "../garment/photo";
import type { BodyFrame } from "./frame";
import type { LookGarment, Piece } from "./pattern";
import type { PieceTexture } from "./render";

interface Runs { rows: number[][]; w: number; h: number }

function runsOf(mask: Uint8Array, w: number, h: number): Runs {
  const rows: number[][] = [];
  for (let y = 0; y < h; y++) {
    const r: number[] = [];
    let x = 0;
    while (x < w) {
      while (x < w && !mask[y * w + x]) x++;
      if (x >= w) break;
      const x0 = x;
      while (x < w && mask[y * w + x]) x++;
      if (x - x0 > 1) r.push(x0, x - 1);
    }
    rows.push(r);
  }
  return { rows, w, h };
}

/** run containing column cx in row y (or null) */
function runAt(R: Runs, y: number, cx: number): [number, number] | null {
  const r = R.rows[Math.max(0, Math.min(R.h - 1, Math.round(y)))];
  for (let i = 0; i < r.length; i += 2) if (r[i] <= cx && r[i + 1] >= cx) return [r[i], r[i + 1]];
  return null;
}
/** outermost extent of the row (all runs) */
function rowExtent(R: Runs, y: number): [number, number] | null {
  const r = R.rows[Math.max(0, Math.min(R.h - 1, Math.round(y)))];
  return r.length ? [r[0], r[r.length - 1]] : null;
}

/** piecewise-linear map through matching landmark pairs (a sorted descending in world y) */
function piecewise(a: number[], b: number[]): (y: number) => number {
  return (y: number) => {
    if (y >= a[0]) return b[0] + ((y - a[0]) / (a[1] - a[0])) * (b[1] - b[0]);
    for (let i = 0; i < a.length - 1; i++) {
      if (y >= a[i + 1]) return b[i] + ((y - a[i]) / (a[i + 1] - a[i])) * (b[i + 1] - b[i]);
    }
    const n = a.length - 1;
    return b[n] + ((y - a[n]) / (a[n] - a[n - 1])) * (b[n] - b[n - 1]);
  };
}

/** Nearest-colour fill of the transparent background so texture filtering never reaches grey. */
export function bleedImage(src: HTMLCanvasElement, passes = 24): HTMLCanvasElement {
  const w = src.width, h = src.height;
  const out = document.createElement("canvas");
  out.width = w; out.height = h;
  const ctx = out.getContext("2d", { willReadFrequently: true })!;
  // average colour everywhere, then blurred copies (wide to narrow), sharp original on top
  const probe = document.createElement("canvas");
  probe.width = probe.height = 1;
  const pc = probe.getContext("2d", { willReadFrequently: true })!;
  pc.drawImage(src, 0, 0, 1, 1);
  const av = pc.getImageData(0, 0, 1, 1).data;
  const a0 = Math.max(1, av[3]) / 255;
  ctx.fillStyle = `rgb(${av[0] / a0},${av[1] / a0},${av[2] / a0})`;
  ctx.fillRect(0, 0, w, h);
  for (const [blur, a] of [[40, 1], [16, 1], [6, 1], [2, 1]] as const) {
    ctx.save();
    ctx.filter = `blur(${blur}px)`;
    ctx.globalAlpha = a;
    for (let k = 0; k < 3; k++) ctx.drawImage(src, 0, 0);
    ctx.restore();
  }
  // make everything opaque (blur leaves partial alpha), then the original on top
  void passes;
  ctx.drawImage(src, 0, 0);
  return out;
}

export interface PhotoPanels {
  kind: "top" | "skirt" | "pants";
  cx: number;
  /** landmark rows (px) */
  hps: number; sp: number; ap: number; cf: number; hem: number; top: number; crotch: number;
  spX: number; apX: number; // half widths (px) from cx
  runs: Runs;
}

/** Analyse a flat-lay cutout. */
export function readPanels(c: Cutout, kind: "top" | "skirt" | "pants"): PhotoPanels {
  const w = c.width, h = c.height;
  const R = runsOf(c.mask, w, h);
  const cx = Math.round(c.centerX);
  let first = 0; while (first < h && !R.rows[first].length) first++;
  let last = h - 1; while (last > 0 && !R.rows[last].length) last--;
  let cf = first; while (cf < last && !runAt(R, cf, cx)) cf++;
  let hem = last; while (hem > cf && !runAt(R, hem, cx)) hem--;
  const P: PhotoPanels = { kind, cx, hps: first, sp: first, ap: first, cf, hem, top: first, crotch: last, spX: 0, apX: 0, runs: R };
  if (kind === "pants") {
    // crotch: the gap between the legs, traced up to where its two edges meet (the cutout's hole
    // closing hides the narrow top of the gap, so extrapolate the edges)
    let y = cf + 5; while (y < last && runAt(R, y, cx)) y++;
    const pts: [number, number, number][] = [];
    for (let yy = y; yy < Math.min(last, y + (last - y) * 0.5); yy += 2) {
      const r = R.rows[yy];
      let l = -1, rr = -1;
      for (let i = 0; i < r.length; i += 2) { if (r[i + 1] < cx) l = r[i + 1]; if (r[i] > cx && rr < 0) rr = r[i]; }
      if (l >= 0 && rr >= 0) pts.push([yy, l, rr]);
    }
    let crotch = y;
    if (pts.length > 4) {
      // gap width grows linearly with y: width = a + b y  -> zero at y = -a / b
      const n = pts.length;
      const my = pts.reduce((s2, p2) => s2 + p2[0], 0) / n, mw = pts.reduce((s2, p2) => s2 + (p2[2] - p2[1]), 0) / n;
      let num = 0, den = 0;
      for (const p2 of pts) { num += (p2[0] - my) * (p2[2] - p2[1] - mw); den += (p2[0] - my) ** 2; }
      const b = num / Math.max(1e-6, den);
      if (b > 0.02) crotch = Math.max(cf + (y - cf) * 0.4, Math.min(y, my - mw / b));
    }
    P.crotch = crotch; P.hem = last; P.top = cf;
    return P;
  }
  if (kind === "skirt") { P.top = cf; P.hem = hem; return P; }
  // width profile of the body run (row containing the centre); the armpit is the sharpest narrowing
  // going down (sleeves separate) or, for sleeveless tops, where the armhole curve stops widening
  const width = (y: number) => { const r = runAt(R, y, cx) ?? rowExtent(R, y); return r ? r[1] - r[0] : 0; };
  const long = hem - cf > 2.2 * width(Math.round(cf + (hem - cf) * 0.3));
  const yLim = Math.round(cf + (hem - cf) * (long ? 0.34 : 0.6));
  const ws: number[] = [];
  for (let y = cf; y <= yLim; y++) {
    let s2 = 0, n2 = 0;
    for (let k = -2; k <= 2; k++) { const v = width(y + k); if (v) { s2 += v; n2++; } }
    ws.push(n2 ? s2 / n2 : 0);
  }
  let ap = -1, best = 0;
  for (let i = 4; i < ws.length - 4; i++) {
    const d = ws[i + 3] - ws[i - 3];
    if (d < best && d < -0.05 * ws[i]) { best = d; ap = cf + i + 3; }
  }
  if (ap < 0) {
    // sleeveless: first row after the widest growth where the width stops growing
    const maxW = Math.max(...ws);
    for (let i = 4; i < ws.length - 6; i++) {
      if (ws[i] < maxW * 0.9) continue;
      let flat = true;
      for (let k = 0; k < 5; k++) if (ws[i + k + 1] - ws[i + k] > 0.004 * ws[i]) flat = false;
      if (flat) { ap = cf + i; break; }
    }
    if (ap < 0) ap = Math.round(cf + (yLim - cf) * 0.5);
  }
  P.ap = ap;
  P.apX = width(Math.min(hem - 1, ap + 6)) / 2;
  const side = P.apX;
  // highest point near the neck = HPS; shoulder point: outermost x of the shoulder line before it
  // turns down the sleeve (or the strap end for sleeveless)
  let topMin = h;
  for (let x = Math.round(cx - side); x <= cx + side; x++) {
    for (let y = first; y < ap; y++) if (c.mask[y * w + x]) { topMin = Math.min(topMin, y); break; }
  }
  if (topMin >= ap) topMin = first;
  P.hps = topMin;
  const topAt = (x: number) => { for (let y = first; y < h; y++) if (c.mask[y * w + Math.round(x)]) return y; return h; };
  let spX = P.apX;
  // sleeveless: the strap ends where the top contour drops sharply
  for (let x = cx + side * 0.25; x < cx + side * 1.2; x++) {
    if (topAt(x + 3) - topAt(x) > (ap - P.hps) * 0.15) { spX = Math.min(spX, x - cx); break; }
  }
  P.spX = spX;
  P.sp = Math.min(ap - 2, (topAt(cx + spX) + topAt(cx - spX)) / 2);
  return P;
}

// ------------------------------------------------------------------ garment side
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

/** Map every piece of a look garment to the photo. */
export function mapPhoto(g: LookGarment, c: Cutout, image: HTMLCanvasElement): PieceTexture[] {
  const kind = g.spec.type === "skirt" ? "skirt" : g.spec.type === "pants" ? "pants" : "top";
  const P = readPanels(c, kind);
  const w = c.width, h = c.height;
  const uvOf = (x: number, y: number, out: Float32Array, k: number) => { out[k * 2] = x / w; out[k * 2 + 1] = 1 - y / h; };
  const color = `rgb(${c.color.map((v) => Math.round(v)).join(",")})`;
  const res: PieceTexture[] = [];
  for (const p of g.pieces) {
    const uv = new Float32Array(p.cols * p.rows * 2);
    if (p.kind === "band") { res.push({ image: null, uv: null, color: necklineColor(c, P) }); continue; }
    if (kind === "top") mapTopPiece(p, g, P, c, uv, uvOf);
    else if (kind === "skirt") mapSkirtPiece(p, g, P, uv, uvOf);
    else mapPantsPiece(p, g, P, uv, uvOf);
    res.push({ image, uv, color });
  }
  return res;
}

/** Most common colour just inside the neckline (rib collars are usually one colour). */
function necklineColor(c: Cutout, P: PhotoPanels): string {
  const ctx = c.canvas.getContext("2d", { willReadFrequently: true })!;
  const d = ctx.getImageData(0, 0, c.width, c.height).data;
  const buckets = new Map<number, [number, number, number, number]>();
  const R = P.runs, cx = P.cx;
  for (let y = Math.max(0, P.hps); y < Math.min(c.height, P.cf + 14); y++) {
    const r = R.rows[y];
    for (let i = 0; i < r.length; i += 2) {
      // the garment pixels bordering the neck hole (left and right of it), a few px deep
      const cands = y < P.cf ? [r[i] + 3, r[i] + 6, r[i + 1] - 3, r[i + 1] - 6] : [cx - 20, cx, cx + 20];
      for (const x of cands) {
        if (x < 0 || x >= c.width || !c.mask[y * c.width + x]) continue;
        if (y < P.cf && Math.abs(x - cx) > (P.spX || c.width) * 0.7) continue;
        const o = (y * c.width + x) * 4;
        const key = ((d[o] >> 4) << 8) | ((d[o + 1] >> 4) << 4) | (d[o + 2] >> 4);
        const b = buckets.get(key) ?? [0, 0, 0, 0];
        b[0] += d[o]; b[1] += d[o + 1]; b[2] += d[o + 2]; b[3]++;
        buckets.set(key, b);
      }
    }
  }
  let best: [number, number, number, number] | null = null;
  for (const b of buckets.values()) if (!best || b[3] > best[3]) best = b;
  if (!best) return `rgb(${c.color.map(Math.round).join(",")})`;
  return `rgb(${Math.round(best[0] / best[3])},${Math.round(best[1] / best[3])},${Math.round(best[2] / best[3])})`;
}

type UvOf = (x: number, y: number, out: Float32Array, k: number) => void;

function rowY(p: Piece, j: number): number { return p.pos[(j * p.cols) * 3 + 1]; }

function mapTopPiece(p: Piece, g: LookGarment, P: PhotoPanels, c: Cutout, uv: Float32Array, uvOf: UvOf): void {
  const M = g.marks, R = P.runs, cx = P.cx;
  const ys = [M.TOP[1], M.SP_L[1], M.AP_L[1], M.HEM_L[1]];
  const yp = [P.hps, P.sp, P.ap, P.hem];
  // keep monotonic
  for (let i = 1; i < ys.length; i++) { if (ys[i] >= ys[i - 1]) ys[i] = ys[i - 1] - 1e-3; if (yp[i] <= yp[i - 1]) yp[i] = yp[i - 1] + 1; }
  const toPhotoY = piecewise(ys, yp);
  // no transparent neck opening in the photo (the inside of the back shows through it, or the cut-out
  // closed it): place a neckline of the garment's own proportions, scaled to the photo
  let cf = P.cf, synth: ((y: number) => number) | null = null;
  if (P.cf - P.hps < (P.ap - P.hps) * 0.12 && M.NECK && M.AP_L) {
    const k = P.apX / Math.max(1e-3, M.AP_L[0]);
    const hw = M.NECK[0] * k;
    // the photo neckline follows the same vertical mapping as the rows, so prints never get cut
    cf = toPhotoY(M.CF[1]);
    const df = Math.max(4, cf - P.hps);
    const v = g.spec.neckline === "v";
    synth = (y: number) => {
      const t = Math.min(1, Math.max(0, (y - P.hps) / df));
      return v ? hw * (1 - t) : hw * Math.sqrt(Math.max(0, 1 - t * t));
    };
  }
  const neckEdge = (y: number) => {
    if (synth) return y >= cf ? 0 : synth(y);
    if (y >= P.cf) return 0;
    const r = R.rows[Math.round(y)] ?? [];
    // first garment pixel right of the centre
    for (let i = 0; i < r.length; i += 2) if (r[i] > cx) return r[i] - cx;
    return P.spX;
  };
  const outer = (y: number, s: number) => {
    if (y <= P.sp) {
      // shoulder seam: the top contour at this row
      const r = R.rows[Math.round(y)] ?? [];
      if (r.length) return s > 0 ? Math.min(P.spX, r[r.length - 1] - cx) : Math.min(P.spX, cx - r[0]);
      return P.spX;
    }
    if (y <= P.ap) {
      const t = Math.min(1, Math.max(0, (y - P.sp) / Math.max(1, P.ap - P.sp)));
      const cc = Math.sqrt(Math.max(0, 1 - t * t));
      return P.apX + (P.spX - P.apX) * Math.pow(cc, 0.6);
    }
    const r = runAt(R, y, cx);
    return r ? (s > 0 ? r[1] - cx : cx - r[0]) : P.apX;
  };
  if (p.kind === "front" || p.kind === "back") {
    const s = p.name.endsWith("L") ? 1 : -1; // figure's left = image right
    for (let j = 0; j < p.rows; j++) {
      const y = toPhotoY(rowY(p, j));
      const a = neckEdge(y), b = Math.max(a, outer(y, s));
      for (let i = 0; i < p.cols; i++) {
        const u = p.param[(j * p.cols + i) * 2];
        uvOf(cx + s * lerp(a, b, u), y, uv, j * p.cols + i);
      }
    }
    return;
  }
  if (p.kind === "sleeve") {
    const s = p.region === "sleeveL" ? 1 : -1;
    // armhole line in the photo and the cuff: farthest sleeve pixel from the armhole middle
    const A0 = [cx + s * (P.spX + P.apX) / 2, (P.sp + P.ap) / 2];
    let far = 0, F = [A0[0] + s * 50, A0[1] + 50];
    for (let y = 0; y < c.height; y++) {
      const r = R.rows[y];
      for (let i = 0; i < r.length; i += 2) {
        for (const x of [r[i], r[i + 1]]) {
          if ((x - cx) * s < outer(y, s) + 2) continue; // torso
          const d = Math.hypot(x - A0[0], y - A0[1]);
          if (d > far) { far = d; F = [x, y]; }
        }
      }
    }
    if (far < 10) { for (let k = 0; k < p.cols * p.rows; k++) uvOf(cx + s * P.apX * 0.9, P.ap - 5, uv, k); return; }
    const ax = (F[0] - A0[0]) / far, ay = (F[1] - A0[1]) / far;
    // perpendicular pointing toward the torso side (under edge)
    let px = -ay, py = ax;
    if (px * s > 0) { px = -px; py = -py; }
    const inMask = (x: number, y: number) => {
      const xi = Math.round(x), yi = Math.round(y);
      return xi >= 0 && yi >= 0 && xi < c.width && yi < c.height && c.mask[yi * c.width + xi] === 1;
    };
    const edges = (t: number): [number, number, number, number] => {
      const bx = A0[0] + ax * far * t, by = A0[1] + ay * far * t;
      let up = 0, dn = 0;
      while (up < far && inMask(bx - px * up, by - py * up)) up++;
      // the under edge must not run into the torso
      while (dn < far && inMask(bx + px * dn, by + py * dn) && ((bx + px * dn) - cx) * s > outer(by + py * dn, s) - 1) dn++;
      return [bx - px * up, by - py * up, bx + px * dn, by + py * dn];
    };
    const N = p.cols - 1;
    // edge distances per ring, smoothed along the sleeve (single scans jump at stripes / seams)
    const E = Array.from({ length: p.rows }, (_, j) => edges(0.02 + (j / (p.rows - 1)) * 0.95));
    const du = E.map((e, j) => { const t = 0.02 + (j / (p.rows - 1)) * 0.95; const bx = A0[0] + ax * far * t, by = A0[1] + ay * far * t; return [Math.hypot(e[0] - bx, e[1] - by), Math.hypot(e[2] - bx, e[3] - by)]; });
    for (let pass = 0; pass < 6; pass++) for (let j = 1; j < p.rows - 1; j++) for (const k of [0, 1]) du[j][k] = (du[j - 1][k] + 2 * du[j][k] + du[j + 1][k]) / 4;
    for (let j = 0; j < p.rows; j++) {
      const t = 0.02 + (j / (p.rows - 1)) * 0.95;
      const bx = A0[0] + ax * far * t, by = A0[1] + ay * far * t;
      const tx = bx - px * du[j][0], ty = by - py * du[j][0], ux = bx + px * du[j][1], uy = by + py * du[j][1];
      for (let i = 0; i < p.cols; i++) {
        const a = (i / N) * Math.PI * 2;
        const under = s === 1 ? Math.sin(a) : -Math.sin(a);
        const f = (under + 1) / 2;
        uvOf(lerp(tx, ux, f), lerp(ty, uy, f), uv, j * p.cols + i);
      }
    }
    return;
  }
  // collar / bands: the fabric just below the neckline
  for (let k = 0; k < p.cols * p.rows; k++) uvOf(cx, P.cf + 6, uv, k);
}

function mapSkirtPiece(p: Piece, g: LookGarment, P: PhotoPanels, uv: Float32Array, uvOf: UvOf): void {
  const M = g.marks, R = P.runs;
  const toPhotoY = piecewise([M.WAIST_L[1], M.HEM_L[1]], [P.top, P.hem]);
  const back = p.kind === "back";
  for (let j = 0; j < p.rows; j++) {
    const y = toPhotoY(rowY(p, j));
    const e = rowExtent(R, y) ?? [0, R.w - 1];
    for (let i = 0; i < p.cols; i++) {
      const u = p.param[(j * p.cols + i) * 2];
      uvOf(lerp(e[0], e[1], back ? 1 - u : u), y, uv, j * p.cols + i);
    }
  }
}

function mapPantsPiece(p: Piece, g: LookGarment, P: PhotoPanels, uv: Float32Array, uvOf: UvOf): void {
  const M = g.marks, R = P.runs, cx = P.cx;
  const toPhotoY = piecewise([M.WAIST[1], M.CROTCH[1], M.HEM_L[1]], [P.top, P.crotch, P.hem]);
  const s = p.region === "legL" ? 1 : -1;
  const back = p.kind === "back";
  for (let j = 0; j < p.rows; j++) {
    const y = toPhotoY(rowY(p, j));
    const r = R.rows[Math.max(0, Math.min(R.h - 1, Math.round(y)))] ?? [];
    let a = cx, b = cx + s * 40;
    if (r.length) {
      if (s > 0) { b = r[r.length - 1]; a = cx; for (let i = 0; i < r.length; i += 2) if (r[i] > cx) { a = r[i]; break; } }
      else { a = r[0]; b = cx; for (let i = r.length - 2; i >= 0; i -= 2) if (r[i + 1] < cx) { b = r[i + 1]; break; } }
    }
    for (let i = 0; i < p.cols; i++) {
      const u = p.param[(j * p.cols + i) * 2];
      uvOf(lerp(a, b, back ? 1 - u : u), y, uv, j * p.cols + i);
    }
  }
}

// ------------------------------------------------------------------ photos of a person wearing it
/**
 * Garment photographed on a person: each panel vertex is carried from the avatar to the photo through
 * the body landmarks (torso/legs by the shoulder-hip-knee-ankle chain, sleeves along the arm bones),
 * so the photo's own folds and shading come along.
 */
export function mapPerson(g: LookGarment, pw: PersonWarp, fr: BodyFrame, image: HTMLCanvasElement): PieceTexture[] {
  const m = pw.marks, J = fr.joints;
  const W = pw.image.width, H = pw.image.height;
  const aY = [(J.shoulderL.y + J.shoulderR.y) / 2, (J.hipL.y + J.hipR.y) / 2, (J.kneeL.y + J.kneeR.y) / 2, (J.ankleL.y + J.ankleR.y) / 2];
  const aHalf = [(J.shoulderL.x - J.shoulderR.x) / 2, (J.hipL.x - J.hipR.x) / 2, (J.kneeL.x - J.kneeR.x) / 2, (J.ankleL.x - J.ankleR.x) / 2];
  const pY = [(m.shoulderL[1] + m.shoulderR[1]) / 2, (m.hipL[1] + m.hipR[1]) / 2, (m.kneeL[1] + m.kneeR[1]) / 2, (m.ankleL[1] + m.ankleR[1]) / 2];
  const pMid = [(m.shoulderL[0] + m.shoulderR[0]) / 2, (m.hipL[0] + m.hipR[0]) / 2, (m.kneeL[0] + m.kneeR[0]) / 2, (m.ankleL[0] + m.ankleR[0]) / 2];
  const pHalf = [Math.abs(m.shoulderL[0] - m.shoulderR[0]) / 2, Math.abs(m.hipL[0] - m.hipR[0]) / 2, Math.abs(m.kneeL[0] - m.kneeR[0]) / 2, Math.abs(m.ankleL[0] - m.ankleR[0]) / 2];
  // the person's left appears on the image right when they face the camera; avatar +x is its left
  const sign = m.shoulderL[0] >= m.shoulderR[0] ? 1 : -1;
  const chainT = (y: number) => {
    if (y >= aY[0]) return -(y - aY[0]) / (aY[0] - aY[1]);
    for (let i = 0; i < 3; i++) if (y >= aY[i + 1]) return i + (aY[i] - y) / (aY[i] - aY[i + 1]);
    return 3 + (aY[3] - y) / (aY[2] - aY[3]);
  };
  const at = (arr: number[], t: number) => {
    if (t <= 0) return arr[0] + t * (arr[1] - arr[0]);
    if (t >= 3) return arr[3] + (t - 3) * (arr[3] - arr[2]);
    const i = Math.min(2, Math.floor(t));
    return arr[i] + (arr[i + 1] - arr[i]) * (t - i);
  };
  const clampT = (t: number) => Math.max(0, Math.min(3, t));
  const torso = (x: number, y: number): [number, number] => {
    const t = chainT(y);
    const k = at(pHalf, clampT(t)) / Math.max(1e-4, at(aHalf, clampT(t)));
    return [at(pMid, clampT(t)) + sign * x * k, at(pY, t)];
  };
  // arm: project on the avatar's shoulder->elbow->wrist, rebuild on the photo's
  const arm = (x: number, y: number, side: "L" | "R"): [number, number] => {
    const S = J["shoulder" + side], E = J["elbow" + side], Wr = J["wrist" + side];
    const ps = m[`shoulder${side}` as const], pe = m[`elbow${side}` as const], pwr = m[`wrist${side}` as const];
    const seg = (a: { x: number; y: number }, b: { x: number; y: number }, pa: [number, number], pb: [number, number]) => {
      const dx = b.x - a.x, dy = b.y - a.y, L = Math.hypot(dx, dy) || 1e-6;
      const t = ((x - a.x) * dx + (y - a.y) * dy) / (L * L);
      const off = ((x - a.x) * -dy + (y - a.y) * dx) / L; // signed distance, left of the bone
      const qx = pb[0] - pa[0], qy = pb[1] - pa[1], Lp = Math.hypot(qx, qy) || 1e-6;
      const k = Lp / L;
      // world -> image is a reflection (y flips; x flips too when sign = -1): det = -sign. A reflection
      // turns "rotate the bone +90 deg" into "-90 deg", so pick the image perpendicular accordingly.
      const nx = sign > 0 ? qy / Lp : -qy / Lp, ny = sign > 0 ? -qx / Lp : qx / Lp;
      return { t, p: [pa[0] + qx * t + nx * off * k, pa[1] + qy * t + ny * off * k] as [number, number] };
    };
    const u = seg(S, E, ps, pe);
    if (u.t <= 1) return u.p;
    return seg(E, Wr, pe, pwr).p;
  };
  const out: PieceTexture[] = [];
  for (const p of g.pieces) {
    const uv = new Float32Array(p.cols * p.rows * 2);
    for (let k = 0; k < p.cols * p.rows; k++) {
      const x = p.pos[k * 3], y = p.pos[k * 3 + 1];
      const [u, v] = p.region === "sleeveL" ? arm(x, y, "L") : p.region === "sleeveR" ? arm(x, y, "R") : torso(x, y);
      uv[k * 2] = u / W; uv[k * 2 + 1] = 1 - v / H;
    }
    out.push({ image, uv, color: "#999" });
  }
  return out;
}

/** The person photo with everything outside the garment filled by the garment's own colours. */
export function personTexture(pw: PersonWarp): HTMLCanvasElement {
  const W = pw.image.width, H = pw.image.height;
  const c = document.createElement("canvas");
  c.width = W; c.height = H;
  const ctx = c.getContext("2d", { willReadFrequently: true })!;
  ctx.drawImage(pw.image, 0, 0);
  const img = ctx.getImageData(0, 0, W, H);
  for (let i = 0; i < W * H; i++) if (!pw.mask[i]) img.data[i * 4 + 3] = 0;
  ctx.putImageData(img, 0, 0);
  return bleedImage(c);
}
