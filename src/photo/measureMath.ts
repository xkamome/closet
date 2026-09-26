// Pure maths for estimating body measurements from a person silhouette (+ pose landmarks).
// Kept free of MediaPipe / DOM so it can be unit-tested.

export interface Silhouette {
  mask: Uint8Array; // 1 = person
  width: number;
  height: number;
}

export interface Landmark { x: number; y: number; visibility?: number } // pixel coordinates

/** Ramanujan's ellipse perimeter approximation (a, b = semi-axes). */
export function ellipsePerimeter(a: number, b: number): number {
  return Math.PI * (3 * (a + b) - Math.sqrt((3 * a + b) * (a + 3 * b)));
}

/** Width (px) of the contiguous mask run that contains column cx at row y. */
export function runWidth(s: Silhouette, y: number, cx: number): number {
  const row = Math.max(0, Math.min(s.height - 1, Math.round(y)));
  let x = Math.max(0, Math.min(s.width - 1, Math.round(cx)));
  if (!s.mask[row * s.width + x]) {
    // search nearby for the torso
    let found = -1;
    for (let d = 1; d < s.width * 0.1 && found < 0; d++) {
      if (s.mask[row * s.width + Math.min(s.width - 1, x + d)]) found = x + d;
      else if (s.mask[row * s.width + Math.max(0, x - d)]) found = x - d;
    }
    if (found < 0) return 0;
    x = found;
  }
  let l = x, r = x;
  while (l > 0 && s.mask[row * s.width + l - 1]) l--;
  while (r < s.width - 1 && s.mask[row * s.width + r + 1]) r++;
  return r - l + 1;
}

export function verticalExtent(s: Silhouette): [number, number] {
  let top = -1, bottom = -1;
  for (let y = 0; y < s.height && top < 0; y++) for (let x = 0; x < s.width; x++) if (s.mask[y * s.width + x]) { top = y; break; }
  for (let y = s.height - 1; y >= 0 && bottom < 0; y--) for (let x = 0; x < s.width; x++) if (s.mask[y * s.width + x]) { bottom = y; break; }
  return [top, bottom];
}

// MediaPipe pose landmark indices
export const LM = { lShoulder: 11, rShoulder: 12, lElbow: 13, rElbow: 14, lWrist: 15, rWrist: 16, lHip: 23, rHip: 24, lAnkle: 27, rAnkle: 28 };

export interface PhotoMeasureResult {
  height: number; bust: number; waist: number; hips: number; shoulder: number; inseam: number; armLength: number;
  notes: string[];
}

/** Typical depth/width ratios of the female torso (front view width -> side depth). */
const DEPTH_RATIO = { bust: 0.8, waist: 0.74, hips: 0.65 };
/** Tape-measure girth runs slightly above the ellipse (flat back / belly). */
const GIRTH_CAL = { bust: 1.07, waist: 1.03, hips: 1.05 };

export function measureFromSilhouette(
  front: Silhouette, lm: Landmark[], heightCm: number,
  side?: { s: Silhouette; lm: Landmark[] | null },
): PhotoMeasureResult {
  const notes: string[] = [];
  const [top, bottom] = verticalExtent(front);
  const px = Math.max(1, bottom - top);
  const cmPerPx = heightCm / px;
  const ls = lm[LM.lShoulder], rs = lm[LM.rShoulder], lh = lm[LM.lHip], rh = lm[LM.rHip];
  const sy = (ls.y + rs.y) / 2, hy = (lh.y + rh.y) / 2, cx = (ls.x + rs.x + lh.x + rh.x) / 4;
  const torso = hy - sy;

  const widest = (y0: number, y1: number, max: boolean) => {
    let best = max ? 0 : Infinity, by = y0;
    for (let y = y0; y <= y1; y++) {
      const w = runWidth(front, y, cx);
      if (!w) continue;
      if (max ? w > best : w < best) { best = w; by = y; }
    }
    return [best === Infinity ? 0 : best, by] as const;
  };
  const [bustW, bustY] = widest(Math.round(sy + torso * 0.22), Math.round(sy + torso * 0.4), true);
  const [waistW, waistY] = widest(Math.round(sy + torso * 0.5), Math.round(sy + torso * 0.85), false);
  const [hipW, hipY] = widest(Math.round(hy - torso * 0.1), Math.round(hy + torso * 0.3), true);

  // side depths at the same relative heights (side photo scaled by its own person height)
  const depth = (y: number, fallbackW: number, ratio: number) => {
    if (!side) return fallbackW * ratio;
    const [st, sb] = verticalExtent(side.s);
    const k = (sb - st) / px;
    const syPix = st + (y - top) * k;
    // centre of the side silhouette at that row
    let l = -1, r = -1;
    const row = Math.round(syPix);
    for (let x = 0; x < side.s.width; x++) if (side.s.mask[row * side.s.width + x]) { if (l < 0) l = x; r = x; }
    if (l < 0) return fallbackW * ratio;
    return ((r - l + 1) / k);
  };
  if (!side) notes.push("沒有側面照：厚度用女性平均比例估算，胸圍與臀圍誤差可能較大。");
  const girth = (w: number, d: number, cal: number) => ellipsePerimeter((w * cmPerPx) / 2, (d * cmPerPx) / 2) * cal;
  const bust = girth(bustW, depth(bustY, bustW, DEPTH_RATIO.bust), GIRTH_CAL.bust);
  const waist = girth(waistW, depth(waistY, waistW, DEPTH_RATIO.waist), GIRTH_CAL.waist);
  const hips = girth(hipW, depth(hipY, hipW, DEPTH_RATIO.hips), GIRTH_CAL.hips);

  const dist = (a: Landmark, b: Landmark) => Math.hypot(a.x - b.x, a.y - b.y);
  const shoulderJoint = dist(ls, rs) * cmPerPx;
  const deltoid = runWidth(front, sy, cx) * cmPerPx;
  const shoulder = deltoid > shoulderJoint ? (shoulderJoint * 1.12 + deltoid * 0.88) / 2 : shoulderJoint * 1.12;
  if (deltoid > shoulderJoint * 1.6) notes.push("手臂可能貼著身體，量到的寬度偏大；拍照時手臂請稍微張開。");
  const arm = (s: Landmark, e: Landmark, w: Landmark) => (dist(s, e) + dist(e, w)) * cmPerPx + 3;
  const armLength = Math.max(arm(ls, lm[LM.lElbow], lm[LM.lWrist]), arm(rs, lm[LM.rElbow], lm[LM.rWrist]));

  // crotch: first row below the hips where the centre column is background
  let crotch = Math.round(hy + torso * 0.15);
  while (crotch < bottom && front.mask[crotch * front.width + Math.round(cx)]) crotch++;
  const inseam = (bottom - crotch) * cmPerPx;
  const r1 = (v: number) => Math.round(v * 10) / 10;
  return {
    height: heightCm, bust: r1(bust), waist: r1(waist), hips: r1(hips), shoulder: r1(shoulder),
    inseam: r1(inseam), armLength: r1(armLength), notes,
  };
}
