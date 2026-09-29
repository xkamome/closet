// "Look" garments: panels built like a pattern (front / back / sleeves / legs) as Coons patches whose
// outline is drawn in the front view (shoulder seam, neckline, armhole, side seam, hem) and whose depth
// comes from a gravity hang model on the body's cross-sections:
//
//   support(y) = convex hull of (support(y + dy), body(y) + gap)      cloth hangs from what is above it
//   if girth(support) > garment girth  -> pull in toward the body (fitted waist, tight spots = strain)
//   else visible = support widened by alpha * excess,  the rest of the excess becomes flutes / folds
//
// Every panel keeps a (u, v) parameter that matches the same panel in the garment photo, so prints
// land where they belong (collar to collar, armpit to armpit, hem to hem).

import { Vector3 } from "three";
import { riseOffset, type GarmentSpec } from "../garment/spec";
import { convexHull } from "../avatar/measure";
import { collide } from "../garment/collide";
import { chainAt, sectionFromHull, sectionPerimeter, SEC_N, type BodyFrame, type P2, type Section } from "./frame";

export type PieceKind = "front" | "back" | "sleeve" | "band";
export type PieceRegion = "torso" | "sleeveL" | "sleeveR" | "legL" | "legR" | "collar" | "waistband" | "cuffL" | "cuffR";

export interface Piece {
  name: string;
  kind: PieceKind;
  region: PieceRegion;
  cols: number; rows: number;
  /** closed in u (tubes) */
  wrap: boolean;
  pos: Float32Array; // cols*rows*3
  /** panel parameter (u across, v down), matches the photo panel */
  param: Float32Array;
  /** fabric strain per vertex (garment girth / body girth; < 1 means it pulls) */
  strain: Float32Array;
  /** fold "depth" per vertex (m), for shading / ink lines */
  fold: Float32Array;
}

export interface LookGarment {
  spec: GarmentSpec;
  pieces: Piece[];
  /** landmarks of the garment in the front view (m) for photo mapping and drawing */
  marks: Record<string, P2>;
  /** outer cross-section at y (bottoms): garments worn over this one stay outside it */
  outer?: (y: number) => Section | null;
}

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const clamp = (x: number, a: number, b: number) => Math.max(a, Math.min(b, x));
const smooth = (t: number) => { const c = clamp(t, 0, 1); return c * c * (3 - 2 * c); };

// ------------------------------------------------------------------ section helpers
function offsetSection(s: Section, gap: number): Section {
  const f = new Float32Array(SEC_N), b = new Float32Array(SEC_N);
  for (let k = 0; k < SEC_N; k++) { f[k] = s.front[k] + gap; b[k] = s.back[k] - gap; }
  return { y: s.y, xl: s.xl - gap, xr: s.xr + gap, front: f, back: b, girth: s.girth + gap * 2 * Math.PI };
}

function sectionPoints(s: Section, out: number[]): void {
  for (let k = 0; k < SEC_N; k++) {
    const x = s.xl + ((s.xr - s.xl) * k) / (SEC_N - 1);
    out.push(x, s.front[k], x, s.back[k]);
  }
}

function unionSection(a: Section, b: Section, y: number): Section {
  const pts: number[] = [];
  sectionPoints(a, pts);
  sectionPoints(b, pts);
  return sectionFromHull(y, convexHull(pts))!;
}

function blendSection(a: Section, b: Section, t: number, y: number): Section {
  const f = new Float32Array(SEC_N), bk = new Float32Array(SEC_N);
  for (let k = 0; k < SEC_N; k++) { f[k] = lerp(a.front[k], b.front[k], t); bk[k] = lerp(a.back[k], b.back[k], t); }
  const s: Section = { y, xl: lerp(a.xl, b.xl, t), xr: lerp(a.xr, b.xr, t), front: f, back: bk, girth: 0 };
  s.girth = sectionPerimeter(s);
  return s;
}

/** widen mostly sideways (flat front/back panels, the excess shows at the side seams) */
function expandSection(s: Section, e: number, y: number): Section {
  const cx = (s.xl + s.xr) / 2;
  const mid = SEC_N >> 1;
  const cz = (s.front[mid] + s.back[mid]) / 2;
  const f = new Float32Array(SEC_N), b = new Float32Array(SEC_N);
  for (let k = 0; k < SEC_N; k++) { f[k] = cz + (s.front[k] - cz) * (1 + 0.3 * e); b[k] = cz + (s.back[k] - cz) * (1 + 0.3 * e); }
  const r: Section = { y, xl: cx + (s.xl - cx) * (1 + e), xr: cx + (s.xr - cx) * (1 + e), front: f, back: b, girth: 0 };
  r.girth = sectionPerimeter(r);
  return r;
}

function clipSection(s: Section, a: number, b: number): Section {
  const xl = Math.max(s.xl, a), xr = Math.min(s.xr, b);
  if (xl <= s.xl && xr >= s.xr) return s;
  const f = new Float32Array(SEC_N), bk = new Float32Array(SEC_N);
  for (let k = 0; k < SEC_N; k++) {
    const x = xl + ((xr - xl) * k) / (SEC_N - 1);
    f[k] = chainAt(s, s.front, x); bk[k] = chainAt(s, s.back, x);
  }
  // close the cut ends (front meets back at the new extremes)
  const r: Section = { y: s.y, xl, xr, front: f, back: bk, girth: 0 };
  r.girth = sectionPerimeter(r);
  return r;
}

/** body sections, widened to stay outside a garment worn underneath (a tucked top inside a skirt) */
function withOver(bodyAt: (y: number) => Section | null, over?: LookGarment | LookGarment[] | null): (y: number) => Section | null {
  const list = (Array.isArray(over) ? over : over ? [over] : []).filter((g) => g.outer);
  if (!list.length) return bodyAt;
  return (y: number) => {
    let b = bodyAt(y);
    for (const g of list) {
      const u = g.outer!(y);
      if (!u) continue;
      b = b ? unionSection(b, offsetSection(u, 0.008), y) : offsetSection(u, 0.008);
    }
    return b;
  };
}

function solve(f: (t: number) => number, target: number, lo: number, hi: number): number {
  // f increasing in t
  for (let i = 0; i < 30; i++) {
    const m = (lo + hi) / 2;
    if (f(m) < target) lo = m; else hi = m;
  }
  return (lo + hi) / 2;
}

interface HangRow { y: number; vis: Section; hidden: number; strain: number }

/**
 * Hang model from yStart down to yEnd. girth(y) in metres; body(y) the body section at y.
 * alpha: share of excess fabric that widens the silhouette (stiff fabric stands away from the body).
 */
function hang(yStart: number, yEnd: number, girth: (y: number) => number, bodyAt: (y: number) => Section | null,
  gap: number, alpha: number, dy = 0.005, clipX?: (y: number) => number): HangRow[] {
  const rows: HangRow[] = [];
  let sup: Section | null = null;
  for (let y = yStart; y >= yEnd - 1e-9; y -= dy) {
    const b0 = bodyAt(y);
    const bodyG = b0 ? offsetSection(b0, gap) : null;
    const cx = clipX?.(y) ?? Infinity;
    if (sup && Number.isFinite(cx)) sup = clipSection(sup, -cx, cx);
    let s: Section;
    if (!sup) s = bodyG!;
    else if (!bodyG) s = { ...sup, y };
    else s = unionSection(sup, bodyG, y);
    const G = girth(y);
    if (!Number.isFinite(G)) { sup = s; rows.push({ y, vis: s, hidden: 0, strain: 1.1 }); continue; }
    const P = sectionPerimeter(s);
    let strain = 1.15;
    if (P > G && bodyG) {
      const Pb = sectionPerimeter(bodyG);
      if (Pb >= G) { s = bodyG; strain = G / Pb; }
      else {
        const t = solve((t) => sectionPerimeter(blendSection(bodyG, s, t, y)), G, 0, 1);
        s = blendSection(bodyG, s, t, y);
        strain = 1;
      }
    }
    sup = s;
    const Ps = sectionPerimeter(s);
    let vis = s, hidden = 0;
    if (G > Ps) {
      const target = Ps + alpha * (G - Ps);
      const e = solve((e) => sectionPerimeter(expandSection(s, e, y)), target, 0, 3);
      vis = expandSection(s, e, y);
      hidden = (1 - alpha) * (G - Ps);
      strain = G / Math.max(1e-6, bodyG ? sectionPerimeter(bodyG) : Ps);
    }
    rows.push({ y, vis, hidden, strain });
  }
  return rows;
}

/** Vertical smoothing of hung sections (fabric can't follow row-to-row noise of the slices). */
function smoothRows(rows: HangRow[], passes: number): void {
  for (let p = 0; p < passes; p++) {
    const src = rows.map((r) => r.vis);
    for (let i = 1; i < rows.length - 1; i++) {
      const a = src[i - 1], b = src[i], c = src[i + 1];
      const f = new Float32Array(SEC_N), bk = new Float32Array(SEC_N);
      for (let k = 0; k < SEC_N; k++) {
        f[k] = (a.front[k] + 2 * b.front[k] + c.front[k]) / 4;
        bk[k] = (a.back[k] + 2 * b.back[k] + c.back[k]) / 4;
      }
      const r: Section = { y: b.y, xl: (a.xl + 2 * b.xl + c.xl) / 4, xr: (a.xr + 2 * b.xr + c.xr) / 4, front: f, back: bk, girth: 0 };
      r.girth = sectionPerimeter(r);
      rows[i] = { ...rows[i], vis: r, strain: (rows[i - 1].strain + 2 * rows[i].strain + rows[i + 1].strain) / 4 };
    }
  }
}

/** Row table with interpolation by y. */
class RowTable {
  constructor(readonly rows: HangRow[]) {}
  private idx(y: number): [number, number] {
    const r = this.rows;
    if (y >= r[0].y) return [0, 0];
    const dy = r[0].y - r[1 < r.length ? 1 : 0].y || 1;
    const t = (r[0].y - y) / dy;
    if (t >= r.length - 1) return [r.length - 1, 0];
    const i = Math.floor(t);
    return [i, t - i];
  }
  at(y: number): { sec: Section; hidden: number; strain: number; f: number; next: Section } {
    const [i, f] = this.idx(y);
    const a = this.rows[i], b = this.rows[Math.min(this.rows.length - 1, i + 1)];
    return { sec: a.vis, next: b.vis, hidden: lerp(a.hidden, b.hidden, f), strain: lerp(a.strain, b.strain, f), f };
  }
  frontZ(x: number, y: number, back = false): number {
    const { sec, next, f } = this.at(y);
    const za = chainAt(sec, back ? sec.back : sec.front, x), zb = chainAt(next, back ? next.back : next.front, x);
    return lerp(za, zb, f);
  }
  extent(y: number): [number, number] {
    const { sec, next, f } = this.at(y);
    return [lerp(sec.xl, next.xl, f), lerp(sec.xr, next.xr, f)];
  }
}

// ------------------------------------------------------------------ Coons patch
type Curve = (t: number) => P2;

function coons(top: Curve, bot: Curve, left: Curve, right: Curve, cols: number, rows: number): Float32Array {
  const out = new Float32Array(cols * rows * 2);
  const p00 = top(0), p10 = top(1), p01 = bot(0), p11 = bot(1);
  for (let j = 0; j < rows; j++) {
    const v = j / (rows - 1);
    const l = left(v), r = right(v);
    for (let i = 0; i < cols; i++) {
      const u = i / (cols - 1);
      const t = top(u), b = bot(u);
      for (let k = 0; k < 2; k++) {
        out[(j * cols + i) * 2 + k] = (1 - v) * t[k] + v * b[k] + (1 - u) * l[k] + u * r[k]
          - ((1 - u) * (1 - v) * p00[k] + u * (1 - v) * p10[k] + (1 - u) * v * p01[k] + u * v * p11[k]);
      }
    }
  }
  return out;
}

/** Make each row's vertices evenly spaced in 3D arc length (so a flat print foreshortens at the sides). */
function evenRows(pos: Float32Array, cols: number, rows: number, zOf: (x: number, y: number) => number): void {
  const len = new Float64Array(cols);
  const xs = new Float64Array(cols), ys = new Float64Array(cols), zs = new Float64Array(cols);
  for (let j = 0; j < rows; j++) {
    for (let it = 0; it < 2; it++) {
      for (let i = 0; i < cols; i++) { const o = (j * cols + i) * 3; xs[i] = pos[o]; ys[i] = pos[o + 1]; zs[i] = pos[o + 2]; }
      len[0] = 0;
      for (let i = 1; i < cols; i++) len[i] = len[i - 1] + Math.hypot(xs[i] - xs[i - 1], ys[i] - ys[i - 1], zs[i] - zs[i - 1]);
      const L = len[cols - 1];
      if (L < 1e-6) break;
      let k = 0;
      for (let i = 1; i < cols - 1; i++) {
        const target = (L * i) / (cols - 1);
        while (k < cols - 2 && len[k + 1] < target) k++;
        const f = (target - len[k]) / Math.max(1e-9, len[k + 1] - len[k]);
        const o = (j * cols + i) * 3;
        pos[o] = lerp(xs[k], xs[k + 1], f);
        pos[o + 1] = lerp(ys[k], ys[k + 1], f);
        pos[o + 2] = zOf(pos[o], pos[o + 1]);
      }
    }
  }
}

/**
 * Cloth stiffness: Laplacian smoothing of the depth over the panel grid (the top row, seam, stays),
 * keeping every vertex outside the body. Removes the body's small bumps from the fabric surface.
 */
function relaxDepth(p: Piece, fr: BodyFrame, gap: number, iters: number): void {
  const { cols, rows } = p;
  const back = p.kind === "back";
  const z = new Float32Array(cols * rows), lim = new Float32Array(cols * rows);
  for (let i = 0; i < cols * rows; i++) {
    z[i] = p.pos[i * 3 + 2];
    const d = back ? fr.backDepth(p.pos[i * 3], p.pos[i * 3 + 1]) : fr.frontDepth(p.pos[i * 3], p.pos[i * 3 + 1]);
    lim[i] = Number.isFinite(d) ? (back ? d - gap : d + gap) : (back ? Infinity : -Infinity);
  }
  const tmp = new Float32Array(cols * rows);
  for (let it = 0; it < iters; it++) {
    for (let j = 0; j < rows; j++) for (let i = 0; i < cols; i++) {
      const k = j * cols + i;
      if (j === 0 || i === 0 || i === cols - 1) { tmp[k] = z[k]; continue; }
      const nb = z[k - 1] + z[k + 1] + z[k - cols] + (j < rows - 1 ? z[k + cols] : z[k]);
      let v = z[k] * 0.4 + nb * 0.15;
      v = back ? Math.min(v, lim[k]) : Math.max(v, lim[k]);
      tmp[k] = v;
    }
    z.set(tmp);
  }
  for (let i = 0; i < cols * rows; i++) p.pos[i * 3 + 2] = z[i];
}

/** Smooth the depth of one column above yMin (armhole edge) so it runs as a clean curve. */
function smoothEdge(p: Piece, col: number, yMin: number, iters: number): void {
  const z = new Float32Array(p.rows);
  const back = p.kind === "back";
  for (let it = 0; it < iters; it++) {
    for (let j = 0; j < p.rows; j++) z[j] = p.pos[(j * p.cols + col) * 3 + 2];
    for (let j = 1; j < p.rows - 1; j++) {
      const o = (j * p.cols + col) * 3;
      if (p.pos[o + 1] < yMin) continue;
      const avg = (z[j - 1] + 2 * z[j] + z[j + 1]) / 4;
      // only ever move outward (never into the body)
      p.pos[o + 2] = back ? Math.min(z[j], avg) : Math.max(z[j], avg);
    }
  }
}

/**
 * Keep front / back panel vertices outside the body surface (plus gap). Side-seam vertices (outer
 * column of a half panel) are shared by front and back, so they move sideways out of the body instead.
 */
function pushOut(p: Piece, fr: BodyFrame, gap: number, sideCol = -1, sideBelow = Infinity, keepRows = 0, keepFromX = 0): void {
  const back = p.kind === "back";
  if (sideCol >= 0) {
    for (let j = 0; j < p.rows; j++) {
      const o = (j * p.cols + sideCol) * 3;
      const y = p.pos[o + 1];
      // only the side seam: the armhole edge above it is shaped by the pattern and the sleeve
      if (y > sideBelow) continue;
      let x = p.pos[o];
      const s = Math.sign(x) || 1;
      for (let k = 0; k < 12 && Number.isFinite(fr.frontDepth(x, y)) && fr.frontDepth(x, y) > p.pos[o + 2] - gap; k++) x += s * 0.003;
      // keep a smooth outline: only move out, never in
      p.pos[o] = x;
    }
  }
  for (let i = 0; i < p.cols * p.rows; i++) {
    if (sideCol >= 0 && i % p.cols === sideCol && p.pos[i * 3 + 1] <= sideBelow) continue;
    // the top rows of a top are the shoulder seam, where front meets back over the shoulder
    if (i < keepRows * p.cols && Math.abs(p.pos[i * 3]) > keepFromX) continue;
    const x = p.pos[i * 3], y = p.pos[i * 3 + 1];
    if (back) {
      const b = fr.backDepth(x, y);
      if (Number.isFinite(b) && p.pos[i * 3 + 2] > b - gap) p.pos[i * 3 + 2] = b - gap;
    } else {
      const f = fr.frontDepth(x, y);
      if (Number.isFinite(f) && p.pos[i * 3 + 2] < f + gap) p.pos[i * 3 + 2] = f + gap;
    }
  }
}

function makePiece(name: string, kind: PieceKind, region: PieceRegion, cols: number, rows: number, wrap = false): Piece {
  const n = cols * rows;
  const param = new Float32Array(n * 2);
  for (let j = 0; j < rows; j++) for (let i = 0; i < cols; i++) {
    param[(j * cols + i) * 2] = i / (cols - 1);
    param[(j * cols + i) * 2 + 1] = j / (rows - 1);
  }
  return { name, kind, region, cols, rows, wrap, pos: new Float32Array(n * 3), param, strain: new Float32Array(n).fill(1.1), fold: new Float32Array(n) };
}

// deterministic noise for fold variation
function hash(i: number): number { const s = Math.sin(i * 127.1 + 311.7) * 43758.5453; return s - Math.floor(s); }
function vnoise(x: number): number { const i = Math.floor(x), f = x - i; const t = f * f * (3 - 2 * f); return lerp(hash(i), hash(i + 1), t); }

/** flute displacement pattern across a panel: u in [0,1], k flutes */
function flute(u: number, k: number, seed: number): number {
  const w = u * k + seed;
  const amp = 0.65 + 0.7 * vnoise(u * k * 0.7 + seed * 3);
  // sharper valleys, rounder crests (how cloth folds hang)
  const s = Math.sin(w * 2 * Math.PI + 0.6 * Math.sin(w * Math.PI + seed));
  return amp * (s > 0 ? Math.pow(s, 0.8) : -Math.pow(-s, 1.3));
}

// ------------------------------------------------------------------ neckline
interface NeckShape { hw: number; df: number; db: number; shape: (r: number) => number }
function neckShape(spec: GarmentSpec, frame: BodyFrame): NeckShape {
  const R = frame.neckR, h = frame.m.height / 160;
  // camisole: a low, wide straight-ish neckline; the straps sit where it meets the shoulder
  if (spec.straps && spec.sleeve === "none") return { hw: R + 0.05, df: 0.14 * h, db: 0.13 * h, shape: (r) => Math.sqrt(Math.max(0, 1 - Math.pow(r, 4))) };
  switch (spec.neckline) {
    case "v": return { hw: R + 0.026, df: 0.15 * h, db: 0.022, shape: (r) => 1 - Math.pow(r, 1.1) };
    case "scoop": return { hw: R + 0.045, df: 0.12 * h, db: 0.03, shape: (r) => Math.sqrt(Math.max(0, 1 - Math.pow(r, 3))) };
    case "boat": return { hw: R + 0.075, df: 0.045 * h, db: 0.035, shape: (r) => Math.sqrt(Math.max(0, 1 - r * r)) };
    default: return { hw: R + 0.02, df: 0.075 * h, db: 0.02, shape: (r) => Math.sqrt(Math.max(0, 1 - r * r)) };
  }
}

// ------------------------------------------------------------------ builders
export interface BuildOpts {
  /** the garment is worn over this one (tops over skirts): keeps it outside */
  over?: LookGarment | LookGarment[] | null;
}

export function buildLookGarment(spec: GarmentSpec, frame: BodyFrame, opts: BuildOpts = {}): LookGarment {
  if (spec.type === "top" || spec.type === "dress") return buildTop(spec, frame, opts);
  if (spec.type === "skirt") return buildSkirt(spec, frame, opts);
  return buildPants(spec, frame, opts);
}

const cm = (v: number | undefined, d: number) => (v ?? d) / 100;

function girthFn(keys: [number, number][]): (y: number) => number {
  const k = keys.filter(([y, g]) => Number.isFinite(y) && Number.isFinite(g)).sort((a, b) => b[0] - a[0]);
  return (y: number) => {
    if (y >= k[0][0]) return k[0][1];
    for (let i = 0; i < k.length - 1; i++) {
      if (y >= k[i + 1][0]) {
        const t = (k[i][0] - y) / (k[i][0] - k[i + 1][0]);
        return lerp(k[i][1], k[i + 1][1], smooth(t) * 0.5 + t * 0.5);
      }
    }
    return k[k.length - 1][1];
  };
}

function buildTop(spec: GarmentSpec, fr: BodyFrame, opts: BuildOpts): LookGarment {
  const m = fr.m, h = m.height / 160;
  const Y = fr.y;
  const fab = spec.fabric;
  const gap = Math.max(0.0035, fab.thickness * 2 + 0.002);
  const alpha = clamp(0.3 + (1 - fab.drape) * 0.6, 0.25, 0.85);
  const neck = neckShape(spec, fr);
  const sleeveless = spec.sleeve === "none";
  // a dropped shoulder (seam out on the upper arm) is drawn with the seam at the shoulder tip: the
  // extra width goes into the (wider) sleeve, which reads the same from the front
  const shoulderHalf = sleeveless ? (spec.straps ? neck.hw + 0.012 : Math.min(cm(spec.m.shoulder, m.shoulder) / 2, neck.hw + 0.065 * h))
    : Math.min(cm(spec.m.shoulder, m.shoulder + 1) / 2, m.shoulder / 200 + 0.015);
  const yHPS = fr.topY(neck.hw) + gap;
  const length = cm(spec.m.length, 60 * h);
  const yHem = Math.max(0.05, yHPS - length);
  const chest = cm(spec.m.chest, m.bust + 8);
  const waist = cm(spec.m.waist, chest * 100 - 4);
  const hem = cm(spec.m.hem, Math.max(waist * 100, m.hips + 4));
  const hip = spec.m.hip ? spec.m.hip / 100 : undefined;
  const bustY = Y.bust, waistY = Y.waist, hipY = Y.hip;
  const keys: [number, number][] = [[Y.armpit, chest], [bustY, chest], [waistY, waist]];
  if (hip) keys.push([hipY, hip]);
  if (yHem < waistY - 0.02) keys.push([yHem, hem]);
  // a dress below the hip: the skirt girth keeps growing to the hem
  const girth = girthFn(keys.filter(([y]) => y >= yHem - 1e-6).length >= 2 ? keys.filter(([y]) => y >= yHem - 1e-6) : keys);
  // armhole depth grows with ease
  const armEase = Math.max(0, chest - m.bust / 100);
  const yArm = Y.armpit - (sleeveless ? 0.035 : 0.018) - armEase * 0.12;
  // stay outside the garments worn underneath (a skirt waistband under a top, briefs)
  const bodyAt = withOver((y: number): Section | null => (y > Y.waist ? fr.torsoSection(y) : fr.lowerSection(y) ?? fr.torsoSection(y)), opts.over);
  // pass 1 (armpit down) only to find the chest width at the armhole
  const first = hang(yArm, yArm - 0.01, girth, bodyAt, gap, alpha)[0].vis;
  const xA = Math.max(-first.xl, first.xr);

  const ySPofX = (x: number) => fr.topY(x) + gap;
  // shoulder point: on top of the shoulder; a dropped shoulder (wider than the body's) sits lower,
  // out on the upper arm, but always well above the armpit
  const bodyHalf = m.shoulder / 200;
  const drop = Math.max(0, shoulderHalf - bodyHalf);
  const ySP = Math.max(
    shoulderHalf <= bodyHalf ? ySPofX(shoulderHalf) : ySPofX(bodyHalf) - drop * 0.45,
    yArm + 0.06,
  );
  // armhole curve (front view): SP -> armpit, leaving SP downward, reaching the armpit horizontally
  const armholeX = (y: number) => {
    if (y <= yArm) return xA;
    const s = clamp(1 - (y - yArm) / Math.max(1e-4, ySP - yArm), 0, 1); // sin(phi)
    const c = Math.sqrt(Math.max(0, 1 - s * s));
    return xA + (shoulderHalf - xA) * Math.pow(c, sleeveless ? 1.0 : 0.6);
  };
  // shoulder seam: straight from the neck point to the shoulder point, but never below the top of the
  // shoulder (the front view would show skin above it)
  const seamRaw = (ax: number) => {
    const t = clamp((ax - neck.hw) / Math.max(1e-4, shoulderHalf - neck.hw), 0, 1);
    return Math.max(lerp(yHPS, ySP, t) * 0.5 + ySPofX(ax) * 0.5, ySPofX(ax) + 0.002);
  };
  // monotone envelope from the shoulder point inward: covers the deltoid bump and keeps the seam
  // invertible (height -> x) for the horizontal panel rows
  const SEAM_N = 64;
  const seamTab = new Float64Array(SEAM_N + 1);
  for (let k = SEAM_N; k >= 0; k--) {
    const ax = lerp(neck.hw, shoulderHalf, k / SEAM_N);
    seamTab[k] = Math.max(seamRaw(ax), k < SEAM_N ? seamTab[k + 1] : -Infinity);
  }
  const seamY = (ax: number) => {
    const t = clamp((ax - neck.hw) / Math.max(1e-4, shoulderHalf - neck.hw), 0, 1) * SEAM_N;
    const i = Math.min(SEAM_N - 1, Math.floor(t));
    return lerp(seamTab[i], seamTab[i + 1], t - i);
  };
  // pass 2: the whole front hangs from the shoulders (bridging the hollow above the bust); above the
  // armpit the section is limited to the armholes and nothing pulls it in
  const yTab = ySP - 0.01;
  const rows = hang(yTab, yHem, (y) => (y > yArm ? Infinity : girth(y)),
    (y) => (y > yArm ? fr.yokeSection(y, armholeX(y) + 0.004) : bodyAt(y)), gap, alpha, 0.005,
    (y) => (y > yArm ? armholeX(y) + 0.004 : Infinity));
  smoothRows(rows, 6);
  const table = new RowTable(rows);
  const [xlA, xrA] = table.extent(yArm);
  const zAt = (x: number, y: number, back: boolean): number => {
    if (y <= yTab) return table.frontZ(x, y, back);
    // above the table (shoulder seam): on the (hollow-bridged) body surface or its ridge
    const d = back ? fr.backDepth(x, y) : fr.frontDepth(x, y);
    let zy = Number.isFinite(d) ? (back ? d - gap : d + gap) : fr.ridgeZ(x);
    // front and back meet on the shoulder seam
    const ax = Math.abs(x);
    if (ax >= neck.hw * 0.9) zy = lerp(fr.ridgeZ(x), zy, smooth((seamY(Math.max(ax, neck.hw)) - y) / 0.03));
    const t = smooth((y - yTab) / 0.015);
    return lerp(table.frontZ(x, yTab, back), zy, t);
  };

  const pieces: Piece[] = [];
  const marks: Record<string, P2> = {
    HPS_L: [neck.hw, yHPS], HPS_R: [-neck.hw, yHPS], SP_L: [shoulderHalf, ySP], SP_R: [-shoulderHalf, ySP],
    AP_L: [xrA, yArm], AP_R: [xlA, yArm], CF: [0, yHPS - neck.df], CB: [0, yHPS - neck.db],
    HEM_L: [table.extent(yHem)[1], yHem], HEM_R: [table.extent(yHem)[0], yHem],
  };

  // total hem flutes: one per ~11-18 cm of hem, more for soft fabric
  const hemSec = table.at(yHem).sec;
  const hemC = sectionPerimeter(hemSec) + table.at(yHem).hidden;
  const lam = lerp(0.11, 0.2, 1 - fab.drape);
  const kHalf = Math.max(2, Math.round(hemC / lam / 2));

  // neckline x at height y (inverse of the neckline curve), seam x at height y (inverse of the seam)
  const neckX = (y: number, drop: number): number => {
    const t = (yHPS - y) / drop; // = shape(r)
    if (t >= 1) return 0;
    if (t <= 0) return neck.hw;
    let lo = 0, hi = 1;
    for (let i = 0; i < 30; i++) { const mid = (lo + hi) / 2; if (neck.shape(mid) > t) lo = mid; else hi = mid; }
    return ((lo + hi) / 2) * neck.hw;
  };
  const seamX = (y: number): number => {
    let lo = neck.hw, hi = shoulderHalf;
    for (let i = 0; i < 30; i++) { const mid = (lo + hi) / 2; if (seamY(mid) > y) lo = mid; else hi = mid; }
    return (lo + hi) / 2;
  };
  const outerX = (y: number, side: 1 | -1): number => {
    if (y > ySP) return seamX(y);
    if (y > yArm) return armholeX(y);
    const [xl, xr] = table.extent(y);
    return side > 0 ? xr : -xl;
  };
  const yTopPanel = Math.max(yHPS, seamY(neck.hw));
  marks.TOP = [0, yTopPanel];
  marks.NECK = [neck.hw, neck.df];

  // half panels: rows are horizontal (y), u runs from the neckline / centre line out to the side
  for (const back of [false, true]) {
    for (const side of [1, -1] as const) {
      const cols = 40, rowsN = 110;
      const p = makePiece(`${back ? "back" : "front"}${side === 1 ? "L" : "R"}`, back ? "back" : "front", "torso", cols, rowsN);
      const drop = back ? neck.db : neck.df;
      for (let j = 0; j < rowsN; j++) {
        const v = j / (rowsN - 1);
        const y = lerp(yTopPanel, yHem, v);
        const a = neckX(y, drop), b = Math.max(a, outerX(y, side));
        for (let i = 0; i < cols; i++) {
          const x = side * lerp(a, b, i / (cols - 1));
          const o = (j * cols + i) * 3;
          p.pos[o] = x; p.pos[o + 1] = y; p.pos[o + 2] = zAt(x, y, back);
        }
      }
      evenRows(p.pos, cols, rowsN, (x, y) => zAt(x, y, back));
      relaxDepth(p, fr, gap, 20);
      // folds from hidden excess: flutes toward the hem, displacement along the section normal (xz)
      const seed = back ? 7.3 : 1.7;
      for (let j = 0; j < rowsN; j++) for (let i = 0; i < cols; i++) {
        const o = j * cols + i;
        const x = p.pos[o * 3], y = p.pos[o * 3 + 1];
        if (y > yArm) continue;
        const r = table.at(y);
        const C = sectionPerimeter(r.sec);
        const A = Math.min(0.045, Math.sqrt(Math.max(0, r.hidden) * C) / (Math.PI * kHalf * 2));
        // one coordinate across the whole front so folds continue over the centre line
        const U = 0.5 + (side * (back ? -1 : 1) * (i / (cols - 1))) / 2;
        const d = A * flute(U, kHalf, seed) * smooth(Math.min(U, 1 - U) / 0.04);
        const dz = 0.001;
        const z0 = zAt(x - dz, y, back), z1 = zAt(x + dz, y, back);
        let nx = -(z1 - z0) / (2 * dz), nz = 1;
        if (back) { nx = -nx; nz = -1; }
        const l = Math.hypot(nx, nz);
        p.pos[o * 3] += (d * nx) / l * 0.5;
        p.pos[o * 3 + 2] += (d * nz) / l;
        p.fold[o] = d;
        p.strain[o] = r.strain;
      }
      pushOut(p, fr, gap, cols - 1, yArm - 0.005, 2, neck.hw + 0.04);
      smoothEdge(p, cols - 1, yArm, 4);
      pieces.push(p);
    }
  }

  // the armhole edge must not sit inside the upper arm (the collision map has no arms below the
  // shoulder): push it out of the arm, smooth it, then build the sleeve on it
  const gapA = Math.max(0.003, fab.thickness * 2 + 0.002);
  for (const p of pieces) {
    const side = p.name.endsWith("L") ? 1 : -1;
    const av = side === 1 ? fr.armVerts.L : fr.armVerts.R;
    const col = p.cols - 1, idx: number[] = [], pts: number[] = [];
    for (let j = 0; j < p.rows; j++) {
      const o = (j * p.cols + col) * 3;
      if (p.pos[o + 1] > ySP + 0.01 || p.pos[o + 1] < yArm - 0.03) continue;
      idx.push(o); pts.push(p.pos[o], p.pos[o + 1], p.pos[o + 2]);
    }
    if (!idx.length) continue;
    const arr = Float32Array.from(pts);
    collide(arr, idx.length, av.pos, av.normals, av.count, gapA, 0.05);
    // move the neighbouring columns along so the panel doesn't fold at the edge
    idx.forEach((o, k) => {
      const dx = arr[k * 3] - p.pos[o], dz = arr[k * 3 + 2] - p.pos[o + 2];
      for (let c = 0; c < 4; c++) {
        const w = 1 - c / 4, oc = o - c * 3;
        p.pos[oc] += dx * w; p.pos[oc + 2] += dz * w;
      }
    });
    smoothEdge(p, col, yArm - 0.03, 3);
  }

  if (!sleeveless) {
    for (const side of [1, -1] as const) {
      const f = pieces.find((q) => q.name === (side === 1 ? "frontL" : "frontR"))!;
      const b = pieces.find((q) => q.name === (side === 1 ? "backL" : "backR"))!;
      pieces.push(buildSleeve(spec, fr, side, f, b, { shoulderHalf, ySP, yArm }));
    }
  }
  pieces.push(buildCollar(spec, fr, neck, yHPS, shoulderHalf, zAt));
  void kHalf;
  const outer = (y: number) => (y <= yArm && y >= yHem ? table.at(y).sec : null);
  return { spec, pieces, marks, outer };
}

/** Rib band along the neckline, standing on the neck edge. */
function buildCollar(spec: GarmentSpec, fr: BodyFrame, neck: NeckShape, yHPS: number, _sh: number,
  zAt: (x: number, y: number, back: boolean) => number): Piece {
  const N = 96, R = 3;
  const p = makePiece("collar", "band", "collar", N, R, true);
  const band = 0.014 * (fr.m.height / 160);
  for (let i = 0; i < N; i++) {
    // around the neck: front half then back half
    const a = (i / N) * Math.PI * 2; // 0 = left HPS going through the front
    const front = a < Math.PI;
    const r = Math.abs(Math.cos(a)); // |x| / hw
    const x = neck.hw * Math.cos(a) * 0.995;
    const drop = front ? neck.df : neck.db;
    const y = yHPS - drop * neck.shape(Math.min(1, r));
    const z = zAt(x, y - 0.002, !front);
    const zc = fr.neck.z;
    for (let j = 0; j < R; j++) {
      const t = j / (R - 1);
      const o = j * N + i;
      // band follows the garment surface downward from the edge
      const yy = y - band * t;
      const zz = zAt(x * (1 + 0.05 * t), yy, !front);
      const push = (front ? 1 : -1) * 0.0015;
      p.pos[o * 3] = x * (1 + 0.04 * t);
      p.pos[o * 3 + 1] = yy;
      p.pos[o * 3 + 2] = (t === 0 ? z : zz) + push;
      p.param[o * 2] = i / N; p.param[o * 2 + 1] = t;
      void zc;
    }
  }
  void spec;
  return p;
}

interface SleeveCtx { shoulderHalf: number; ySP: number; yArm: number }

/**
 * Sleeve tube: first ring = the armhole (edges of the front and back panels), then rings around the
 * arm that hang on top of it (tube centre dropped by gravity), girth from the bicep to the opening.
 */
function buildSleeve(spec: GarmentSpec, fr: BodyFrame, side: 1 | -1, front: Piece, back: Piece, c: SleeveCtx): Piece {
  const arm = side === 1 ? fr.arms.L : fr.arms.R;
  const m = fr.m;
  const N = 56, K = 40;
  const p = makePiece(side === 1 ? "sleeveL" : "sleeveR", "sleeve", side === 1 ? "sleeveL" : "sleeveR", N + 1, K, true);
  // armhole loop from the panels: the column at the figure's `side` edge, rows above the armpit
  const edgeCol = (pc: Piece): number[][] => {
    const pts: number[][] = [];
    for (let j = 0; j < pc.rows; j++) {
      const o = (j * pc.cols + pc.cols - 1) * 3; // outer edge of the half panel
      const y = pc.pos[o + 1];
      if (y > c.ySP + 1e-4) continue;
      if (y < c.yArm - 1e-4) break;
      pts.push([pc.pos[o], y, pc.pos[o + 2]]);
    }
    return pts;
  };
  const fEdge = edgeCol(front), bEdge = edgeCol(back);
  // loop: SP -> down the front -> armpit -> up the back -> SP
  const loop = [...fEdge, ...bEdge.slice(0, -1).reverse()];
  const loopLen: number[] = [0];
  for (let i = 1; i <= loop.length; i++) {
    const a = loop[i - 1], b = loop[i % loop.length];
    loopLen.push(loopLen[i - 1] + Math.hypot(a[0] - b[0], a[1] - b[1], a[2] - b[2]));
  }
  const total = loopLen[loop.length];
  const loopAt = (t: number): Vector3 => {
    const d = ((t % 1) + 1) % 1 * total;
    let i = 0;
    while (i < loop.length - 1 && loopLen[i + 1] < d) i++;
    const a = loop[i], b = loop[(i + 1) % loop.length];
    const f = (d - loopLen[i]) / Math.max(1e-9, loopLen[i + 1] - loopLen[i]);
    return new Vector3(lerp(a[0], b[0], f), lerp(a[1], b[1], f), lerp(a[2], b[2], f));
  };

  // arm polyline
  const S = arm.shoulder, E = arm.elbow, W = arm.wrist;
  const up = E.clone().sub(S), lo = W.clone().sub(E);
  const lu = up.length(), ll = lo.length();
  const axisAt = (d: number): { p: Vector3; dir: Vector3 } => {
    // smooth the elbow bend over +-5 cm (ring planes must not cross)
    const dir = up.clone().normalize().lerp(lo.clone().normalize(), smooth((d - lu + 0.05) / 0.1)).normalize();
    if (d <= lu) return { p: S.clone().addScaledVector(up, d / lu), dir };
    const f = Math.min(1.1, (d - lu) / ll);
    return { p: E.clone().addScaledVector(lo, f), dir };
  };
  // where the sleeve starts along the arm: the SP projected on the axis
  const SP = new Vector3(side * c.shoulderHalf, c.ySP, fr.arms.L.shoulder.z);
  const d0 = Math.max(0, SP.clone().sub(S).dot(up.clone().normalize()));
  const sleeveLen = cm(spec.m.sleeveLength, { short: 16, elbow: 30, long: 56, none: 0 }[spec.sleeve] * (m.height / 160));
  const dEnd = Math.min(lu + ll + 0.01, d0 + sleeveLen);
  const armG = (t: number) => arm.radius(t) * 2 * Math.PI;
  const bicep = cm(spec.m.upperArm, (armG(0.25) * 100) + (spec.silhouette === "oversized" ? 14 : spec.silhouette === "fitted" ? 4 : 8));
  const opening = cm(spec.m.sleeveOpening, spec.sleeve === "long" ? armG(0.98) * 100 + 5 : bicep * 100 * (spec.sleeve === "elbow" ? 0.85 : 0.95));
  const gravity = new Vector3(0, -1, 0);

  // cross-section frame: fixed reference around the upper arm so rings don't twist
  const ref = new Vector3(0, 0, 1);
  let phase0 = 0, dir0 = 1;
  for (let k = 0; k < K; k++) {
    const t = k / (K - 1);
    const d = lerp(d0, dEnd, t);
    const { p: ap, dir } = axisAt(d);
    const ta = d / (lu + ll);
    const rArm = arm.radius(ta) + 0.004;
    const G = lerp(bicep, opening, smooth(clamp((d - d0 - 0.03) / Math.max(0.01, dEnd - d0 - 0.03), 0, 1)));
    const R = Math.max(rArm + 0.003, G / (2 * Math.PI));
    // gravity drop of the tube centre (sleeve rests on top of the arm)
    const gp = gravity.clone().addScaledVector(dir, -gravity.dot(dir));
    const center = ap.clone().addScaledVector(gp, (R - rArm) * 0.9);
    const e1 = ref.clone().addScaledVector(dir, -ref.dot(dir)).normalize(); // toward the front
    const e2 = dir.clone().cross(e1).normalize();
    // blend from the armhole loop to the circle over the first ~7 cm (the sleeve cap)
    const w = smooth((d - d0) / 0.07);
    if (k === 0) { phase0 = loopPhase(loop, loopLen, total, e1, e2, center); dir0 = loopDir(loop, e1, e2, center); }
    for (let i = 0; i <= N; i++) {
      const a = (i / N) * Math.PI * 2;
      const circ = center.clone().addScaledVector(e1, Math.cos(a) * R).addScaledVector(e2, Math.sin(a) * R);
      // loop param aligned by angle: start the loop at the point most toward the front (+z)
      const lp = loopAt(phase0 + (i / N) * dir0);
      const q = lp.lerp(circ, w);
      const o = (k * (N + 1) + i) * 3;
      p.pos[o] = q.x; p.pos[o + 1] = q.y; p.pos[o + 2] = q.z;
      p.strain[k * (N + 1) + i] = G / (armG(ta) + 1e-6);
    }
  }
  // the deltoid and biceps stay inside the sleeve: push out, relax the dents, push out again
  // (arm vertices only: in the armpit the torso's normals would push the cap into the arm)
  const av = side === 1 ? fr.armVerts.L : fr.armVerts.R;
  const gap = Math.max(0.003, spec.fabric.thickness * 2 + 0.002);
  const nv = (N + 1) * K;
  for (let pass = 0; pass < 3; pass++) {
    collide(p.pos, nv, av.pos, av.normals, av.count, gap, 0.06);
    if (pass < 2) smoothTube(p, N + 1, K, 3);
  }
  return p;
}

/** Laplacian smoothing on a tube grid (seam column duplicated, first ring kept on the armhole). */
function smoothTube(p: Piece, cols: number, rows: number, iters: number): void {
  const tmp = new Float32Array(p.pos.length);
  for (let it = 0; it < iters; it++) {
    tmp.set(p.pos);
    for (let j = 1; j < rows - 1; j++) for (let i = 0; i < cols; i++) {
      const il = i === 0 ? cols - 2 : i - 1, ir = i === cols - 1 ? 1 : i + 1;
      const k = j * cols + i;
      for (let c = 0; c < 3; c++) {
        const nbAvg = (p.pos[(j * cols + il) * 3 + c] + p.pos[(j * cols + ir) * 3 + c] + p.pos[((j - 1) * cols + i) * 3 + c] + p.pos[((j + 1) * cols + i) * 3 + c]) / 4;
        tmp[k * 3 + c] = p.pos[k * 3 + c] * 0.5 + nbAvg * 0.5;
      }
    }
    p.pos.set(tmp);
  }
}

/** loop parameter (0..1) of the loop point with the largest projection on e1 (front). */
function loopPhase(loop: number[][], loopLen: number[], total: number, e1: Vector3, _e2: Vector3, c: Vector3): number {
  let best = -Infinity, bi = 0;
  loop.forEach((q, i) => {
    const d = (q[0] - c.x) * e1.x + (q[1] - c.y) * e1.y + (q[2] - c.z) * e1.z;
    if (d > best) { best = d; bi = i; }
  });
  return loopLen[bi] / total;
}
/** +1 if the loop runs the same way as the (e1 -> e2) circle, else -1 */
function loopDir(loop: number[][], e1: Vector3, e2: Vector3, c: Vector3): number {
  let area = 0;
  for (let i = 0; i < loop.length; i++) {
    const a = loop[i], b = loop[(i + 1) % loop.length];
    const ax = (a[0] - c.x) * e1.x + (a[1] - c.y) * e1.y + (a[2] - c.z) * e1.z;
    const ay = (a[0] - c.x) * e2.x + (a[1] - c.y) * e2.y + (a[2] - c.z) * e2.z;
    const bx = (b[0] - c.x) * e1.x + (b[1] - c.y) * e1.y + (b[2] - c.z) * e1.z;
    const by = (b[0] - c.x) * e2.x + (b[1] - c.y) * e2.y + (b[2] - c.z) * e2.z;
    area += ax * by - bx * ay;
  }
  return area >= 0 ? 1 : -1;
}

// ------------------------------------------------------------------ skirt
function buildSkirt(spec: GarmentSpec, fr: BodyFrame, opts: BuildOpts = {}): LookGarment {
  const m = fr.m, h = m.height / 160, Y = fr.y, fab = spec.fabric;
  const gap = Math.max(0.003, fab.thickness * 2 + 0.002);
  // skirts: most of the extra fabric falls into folds; only stiff fabric stands away from the body
  const alpha = clamp(0.12 + (1 - fab.drape) * 0.35, 0.1, 0.45);
  const rise = riseOffset(spec.type, spec.rise);
  const yTop = Y.waist + rise * h;
  const yHem = Math.max(0.05, yTop - cm(spec.m.length, 58 * h));
  const waist = cm(spec.m.waist, m.waist + 2), hip = cm(spec.m.hip, m.hips + 8), hem = cm(spec.m.hem, m.hips + 40);
  const girth = girthFn([[yTop, waist], [Y.hip, Math.max(hip, waist)], [yHem, Math.max(hem, hip * 0.9)]]);
  const bodyAt = withOver((y: number) => (y > Y.waist ? fr.torsoSection(y) : fr.lowerSection(y)), opts.over);
  const rows = hang(yTop, yHem, girth, bodyAt, gap, alpha);
  smoothRows(rows, 4);
  const table = new RowTable(rows);
  const hemC = sectionPerimeter(table.at(yHem).sec) + table.at(yHem).hidden;
  // fold spacing: drapey fabric (chiffon) falls in many narrow folds; knife pleats every ~4.5 cm
  const lam = spec.pleated ? 0.045 : lerp(0.07, 0.22, 1 - fab.drape);
  const kHalf = Math.max(2, Math.round(hemC / lam / 2));
  const pieces: Piece[] = [];
  for (const back of [false, true]) {
    const cols = 72, rowsN = 70;
    const p = makePiece(back ? "back" : "front", back ? "back" : "front", "torso", cols, rowsN);
    const top: Curve = (u) => { const [xl, xr] = table.extent(yTop); return [back ? lerp(xr, xl, u) : lerp(xl, xr, u), yTop]; };
    const bot: Curve = (u) => { const [xl, xr] = table.extent(yHem); return [back ? lerp(xr, xl, u) : lerp(xl, xr, u), yHem]; };
    const left: Curve = (v) => { const y = lerp(yTop, yHem, v); const [xl, xr] = table.extent(y); return [back ? xr : xl, y]; };
    const right: Curve = (v) => { const y = lerp(yTop, yHem, v); const [xl, xr] = table.extent(y); return [back ? xl : xr, y]; };
    const xy = coons(top, bot, left, right, cols, rowsN);
    const zAt = (x: number, y: number) => table.frontZ(x, y, back);
    for (let i = 0; i < cols * rowsN; i++) { p.pos[i * 3] = xy[i * 2]; p.pos[i * 3 + 1] = xy[i * 2 + 1]; p.pos[i * 3 + 2] = zAt(xy[i * 2], xy[i * 2 + 1]); }
    evenRows(p.pos, cols, rowsN, zAt);
    applyFlutes(p, table, kHalf, back, zAt, back ? 5.1 : 2.3, spec.pleated ? yTop - 0.06 : null);
    pushOut(p, fr, gap);
    pieces.push(p);
  }
  // outline for a garment worn over the skirt: the hung shape plus the depth of its folds
  const outer = (y: number) => {
    if (y > yTop + 0.005 || y < yHem) return null;
    const r = table.at(y);
    const A = Math.min(0.05, Math.sqrt(Math.max(0, r.hidden) * sectionPerimeter(r.sec)) / (Math.PI * kHalf * 2));
    return A > 0.001 ? offsetSection(r.sec, A) : r.sec;
  };
  return { spec, pieces, outer, marks: { WAIST_L: [table.extent(yTop)[1], yTop], WAIST_R: [table.extent(yTop)[0], yTop], HEM_L: [table.extent(yHem)[1], yHem], HEM_R: [table.extent(yHem)[0], yHem] } };
}

/** pleatFrom: knife pleats below this height (stitched flat above), instead of soft flutes */
function applyFlutes(p: Piece, table: RowTable, kHalf: number, back: boolean, zAt: (x: number, y: number) => number, seed: number, pleatFrom: number | null = null): void {
  const { cols, rows } = p;
  for (let j = 0; j < rows; j++) for (let i = 0; i < cols; i++) {
    const o = j * cols + i;
    const x = p.pos[o * 3], y = p.pos[o * 3 + 1];
    const r = table.at(y);
    const C = sectionPerimeter(r.sec);
    const u = i / (cols - 1);
    let d: number;
    if (pleatFrom !== null) {
      // even, sharp pleats: a sawtooth across the panel, opening up below the stitching
      const open = smooth((pleatFrom - y) / 0.1);
      const A = Math.min(0.018, 0.008 + Math.sqrt(Math.max(0, r.hidden) * C) / (Math.PI * kHalf * 4)) * open;
      const w = u * kHalf * 2;
      d = A * (Math.abs(((w % 2) + 2) % 2 - 1) * 2 - 1) * smooth(Math.min(u, 1 - u) / 0.02);
    } else {
      const A = Math.min(0.05, Math.sqrt(Math.max(0, r.hidden) * C) / (Math.PI * kHalf * 2));
      d = A * flute(u, kHalf, seed) * smooth(Math.min(u, 1 - u) / 0.03);
    }
    const dz = 0.001;
    let nx = -(zAt(x + dz, y) - zAt(x - dz, y)) / (2 * dz), nz = 1;
    if (back) { nx = -nx; nz = -1; }
    const l = Math.hypot(nx, nz);
    p.pos[o * 3] += (d * nx) / l * 0.5;
    p.pos[o * 3 + 2] += (d * nz) / l;
    p.fold[o] = d;
    p.strain[o] = r.strain;
  }
}

// ------------------------------------------------------------------ pants
function buildPants(spec: GarmentSpec, fr: BodyFrame, opts: BuildOpts = {}): LookGarment {
  const m = fr.m, h = m.height / 160, Y = fr.y, fab = spec.fabric;
  const gap = Math.max(0.003, fab.thickness * 2 + 0.002);
  const alpha = clamp(0.35 + (1 - fab.drape) * 0.5, 0.3, 0.85);
  const rise = riseOffset(spec.type, spec.rise);
  const yTop = Y.waist + rise * h;
  const inseam = cm(spec.m.inseam, m.inseam);
  const yCrotch = Y.crotch - 0.015;
  const yHem = Math.max(0.02, Math.min(yCrotch - 0.03, spec.m.length ? yTop - spec.m.length / 100 : yCrotch - inseam));
  const waist = cm(spec.m.waist, m.waist + 2), hip = cm(spec.m.hip, m.hips + 6);
  const thigh = cm(spec.m.thigh, m.thigh + 8), open = cm(spec.m.legOpening, 38);
  // upper part (waist -> crotch) like a skirt; legs below
  const upper = hang(yTop, yCrotch, girthFn([[yTop, waist], [Y.hip, Math.max(hip, waist)], [yCrotch, hip]]),
    withOver((y) => (y > Y.waist ? fr.torsoSection(y) : fr.lowerSection(y)), opts.over), gap, alpha);
  smoothRows(upper, 4);
  const upTable = new RowTable(upper);
  const pieces: Piece[] = [];
  const marks: Record<string, P2> = {};
  const legTables: RowTable[] = [];
  for (const side of [1, -1] as const) {
    const kneeG = lerp(thigh, open, 0.55);
    const legRows = hang(yCrotch, yHem, girthFn([[yCrotch, thigh], [Y.knee, kneeG], [yHem, open]]),
      (y) => fr.legSection(y, side), gap, alpha);
    smoothRows(legRows, 4);
    const legTable = new RowTable(legRows);
    legTables.push(legTable);
    const kHalf = Math.max(2, Math.round((sectionPerimeter(legTable.at(yHem).sec) + legTable.at(yHem).hidden) / 0.16 / 2));
    for (const back of [false, true]) {
      const cols = 36, rowsN = 90;
      const p = makePiece(`${back ? "back" : "front"}${side === 1 ? "L" : "R"}`, back ? "back" : "front", side === 1 ? "legL" : "legR", cols, rowsN);
      // x extent at y for this leg: [inner, outer]
      const ext = (y: number): [number, number] => {
        if (y >= yCrotch) {
          const [xl, xr] = upTable.extent(y);
          // blend the inner edge from the centre line to the leg's inner edge over the last 5 cm
          const [lxl, lxr] = legTable.extent(yCrotch);
          const t = smooth((yCrotch + 0.05 - y) / 0.05);
          const inner = lerp(0, side === 1 ? lxl : lxr, t * 0.6);
          return side === 1 ? [inner, xr] : [xl, inner];
        }
        const [xl, xr] = legTable.extent(y);
        return side === 1 ? [xl, xr] : [xl, xr];
      };
      const zAt = (x: number, y: number) => (y >= yCrotch ? upTable.frontZ(x, y, back) : legTable.frontZ(x, y, back));
      // u from screen-left to screen-right on the front; mirrored on the back
      const L = (y: number) => ext(y)[0], R = (y: number) => ext(y)[1];
      const edge = (v: number, which: 0 | 1): P2 => {
        const y = lerp(yTop, yHem, v);
        const a = which === 0 ? L(y) : R(y);
        return [a, y];
      };
      const first = back ? 1 : 0, second = back ? 0 : 1;
      const top: Curve = (u) => [lerp(back ? R(yTop) : L(yTop), back ? L(yTop) : R(yTop), u), yTop];
      const bot: Curve = (u) => [lerp(back ? R(yHem) : L(yHem), back ? L(yHem) : R(yHem), u), yHem];
      const xy = coons(top, bot, (v) => edge(v, first as 0 | 1), (v) => edge(v, second as 0 | 1), cols, rowsN);
      for (let i = 0; i < cols * rowsN; i++) { p.pos[i * 3] = xy[i * 2]; p.pos[i * 3 + 1] = xy[i * 2 + 1]; p.pos[i * 3 + 2] = zAt(xy[i * 2], xy[i * 2 + 1]); }
      evenRows(p.pos, cols, rowsN, zAt);
      // folds only on the leg part
      for (let j = 0; j < rowsN; j++) for (let i = 0; i < cols; i++) {
        const o = j * cols + i;
        const x = p.pos[o * 3], y = p.pos[o * 3 + 1];
        if (y >= yCrotch) continue;
        const r = legTable.at(y);
        const C = sectionPerimeter(r.sec);
        const A = Math.min(0.03, Math.sqrt(Math.max(0, r.hidden) * C) / (Math.PI * kHalf * 2));
        const u = i / (cols - 1);
        const d = A * flute(u, kHalf / 2, side * 3.1 + (back ? 1 : 0)) * smooth(Math.min(u, 1 - u) / 0.05);
        p.pos[o * 3 + 2] += back ? -d : d;
        p.fold[o] = d;
        p.strain[o] = r.strain;
        void x;
      }
      pushOut(p, fr, gap);
      pieces.push(p);
    }
    marks[side === 1 ? "HEM_L" : "HEM_R"] = [legTable.extent(yHem)[side === 1 ? 1 : 0], yHem];
  }
  // outline for a garment worn over the trousers (a long top): the seat above the crotch, both legs below
  const outer = (y: number) => {
    if (y > yTop + 0.005 || y < yHem) return null;
    if (y >= yCrotch) return upTable.at(y).sec;
    return unionSection(legTables[0].at(y).sec, legTables[1].at(y).sec, y);
  };
  marks.WAIST = [0, yTop];
  marks.CROTCH = [0, yCrotch];
  return { spec, pieces, marks, outer };
}
