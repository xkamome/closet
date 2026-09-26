// Garments worn by a person in a photo: split the "clothes" segmentation into upper / lower /
// dress using pose landmarks, estimate sleeve and hem position, and keep what is needed to warp the
// photo onto the 3D garment landmark-to-landmark.
// The analysis itself is pure (labels + landmarks in, descriptions out) so it can be unit-tested.

import type { GarmentType, Sleeve, Silhouette } from "./spec";

export interface PersonMarks {
  shoulderL: [number, number]; shoulderR: [number, number];
  elbowL: [number, number]; elbowR: [number, number];
  wristL: [number, number]; wristR: [number, number];
  hipL: [number, number]; hipR: [number, number];
  kneeL: [number, number]; kneeR: [number, number];
  ankleL: [number, number]; ankleR: [number, number];
}

export interface PersonGarment {
  type: GarmentType;
  sleeve: Sleeve;
  silhouette: Silhouette;
  /** hem position along the landmark chain: 0 shoulder, 1 hip, 2 knee, 3 ankle */
  hemT: number;
  /** top edge for bottoms (same scale) — waistline */
  topT: number;
  mask: Uint8Array; // garment pixels (image size)
  color: [number, number, number];
  reason: string;
}

const CLOTHES = 4;

export function marksFromLandmarks(lm: { x: number; y: number }[]): PersonMarks {
  const p = (i: number): [number, number] => [lm[i].x, lm[i].y];
  // MediaPipe: 11/12 shoulders (person's left/right), 13/14 elbows, 15/16 wrists, 23/24 hips, 25/26 knees, 27/28 ankles
  return {
    shoulderL: p(11), shoulderR: p(12), elbowL: p(13), elbowR: p(14), wristL: p(15), wristR: p(16),
    hipL: p(23), hipR: p(24), kneeL: p(25), kneeR: p(26), ankleL: p(27), ankleR: p(28),
  };
}

/** y (px) of the chain position t (0 shoulder .. 3 ankle), and the inverse. */
export function chainY(m: PersonMarks, t: number): number {
  const ys = [
    (m.shoulderL[1] + m.shoulderR[1]) / 2, (m.hipL[1] + m.hipR[1]) / 2,
    (m.kneeL[1] + m.kneeR[1]) / 2, (m.ankleL[1] + m.ankleR[1]) / 2,
  ];
  if (t <= 0) return ys[0] + t * (ys[1] - ys[0]);
  if (t >= 3) return ys[3] + (t - 3) * (ys[3] - ys[2]);
  const i = Math.floor(t);
  return ys[i] + (ys[i + 1] - ys[i]) * (t - i);
}
export function chainT(m: PersonMarks, y: number): number {
  const ys = [
    (m.shoulderL[1] + m.shoulderR[1]) / 2, (m.hipL[1] + m.hipR[1]) / 2,
    (m.kneeL[1] + m.kneeR[1]) / 2, (m.ankleL[1] + m.ankleR[1]) / 2,
  ];
  if (y <= ys[0]) return (y - ys[0]) / Math.max(1, ys[1] - ys[0]);
  for (let i = 0; i < 3; i++) if (y <= ys[i + 1]) return i + (y - ys[i]) / Math.max(1, ys[i + 1] - ys[i]);
  return 3 + (y - ys[3]) / Math.max(1, ys[3] - ys[2]);
}

export function analyzePersonGarments(labels: Uint8Array, rgb: Uint8ClampedArray, W: number, H: number, m: PersonMarks): PersonGarment[] {
  const at = (x: number, y: number) => {
    const xi = Math.round(x), yi = Math.round(y);
    return xi >= 0 && yi >= 0 && xi < W && yi < H ? labels[yi * W + xi] : 0;
  };
  const isC = (x: number, y: number) => at(x, y) === CLOTHES;
  const midX = (y: number) => {
    const t = chainT(m, y);
    const a = t <= 1 ? (m.shoulderL[0] + m.shoulderR[0]) / 2 : (m.hipL[0] + m.hipR[0]) / 2;
    const b = (m.hipL[0] + m.hipR[0]) / 2;
    return t <= 1 ? a + (b - a) * Math.max(0, t) : b;
  };
  const coverage = (t0: number, t1: number, halfW: (y: number) => number) => {
    let c = 0, n = 0;
    const y0 = chainY(m, t0), y1 = chainY(m, t1);
    for (let y = y0; y <= y1; y += Math.max(1, (y1 - y0) / 40)) {
      const cx = midX(y), hw = halfW(y);
      for (let x = cx - hw; x <= cx + hw; x += Math.max(1, hw / 10)) { n++; if (isC(x, y)) c++; }
    }
    return n ? c / n : 0;
  };
  const shW = Math.abs(m.shoulderL[0] - m.shoulderR[0]) / 2;
  const hipW = Math.abs(m.hipL[0] - m.hipR[0]) / 2;
  const torsoCov = coverage(0.15, 0.85, () => shW * 0.6);
  const lowerCov = coverage(1.05, 1.5, () => hipW * 1.1);

  // scan the centre line from the hip downwards to find where clothes stop
  const scanDown = (x: (y: number) => number, fromT: number) => {
    let y = chainY(m, fromT);
    const yEnd = Math.min(H - 1, chainY(m, 3.2));
    let lastC = y, miss = 0;
    for (; y < yEnd; y++) {
      if (isC(x(y), y)) { lastC = y; miss = 0; } else if (++miss > (H * 0.02)) break;
    }
    return lastC;
  };
  // legs apart? look between the knees above knee level
  const kneeMidX = (m.kneeL[0] + m.kneeR[0]) / 2;
  const between = (t: number) => isC(kneeMidX, chainY(m, t));
  const legsSeparate = !between(1.7) && !between(1.85);
  const legX = (y: number) => {
    // centre of the left leg column between hip and ankle
    const t = chainT(m, y);
    const a = t <= 2 ? m.hipL : m.kneeL, b = t <= 2 ? m.kneeL : m.ankleL;
    const f = Math.min(1, Math.max(0, t <= 2 ? t - 1 : t - 2));
    return a[0] + (b[0] - a[0]) * f;
  };

  // sleeve: clothes coverage along the (visible) arm
  const armCover = (s: [number, number], e: [number, number], w: [number, number]) => {
    let last = 0;
    for (let k = 0; k <= 40; k++) {
      const f = k / 40;
      const p = f <= 0.5 ? [s[0] + (e[0] - s[0]) * f * 2, s[1] + (e[1] - s[1]) * f * 2] : [e[0] + (w[0] - e[0]) * (f - 0.5) * 2, e[1] + (w[1] - e[1]) * (f - 0.5) * 2];
      if (isC(p[0], p[1])) last = f;
    }
    return last;
  };
  const arm = Math.max(armCover(m.shoulderL, m.elbowL, m.wristL), armCover(m.shoulderR, m.elbowR, m.wristR));
  const sleeve: Sleeve = arm < 0.06 ? "none" : arm < 0.3 ? "short" : arm < 0.62 ? "elbow" : "long";

  const meanColor = (sel: (x: number, y: number) => boolean) => {
    let r = 0, g = 0, b = 0, n = 0;
    for (let y = 0; y < H; y += 2) for (let x = 0; x < W; x += 2) {
      if (labels[y * W + x] !== CLOTHES || !sel(x, y)) continue;
      const o = (y * W + x) * 4;
      r += rgb[o]; g += rgb[o + 1]; b += rgb[o + 2]; n++;
    }
    return n ? [r / n, g / n, b / n] as [number, number, number] : [128, 128, 128] as [number, number, number];
  };
  const hipY = chainY(m, 1);
  const upperColor = meanColor((_, y) => y < hipY - (hipY - chainY(m, 0)) * 0.2);
  const lowerColor = meanColor((_, y) => y > hipY + (chainY(m, 2) - hipY) * 0.2);
  const colorDist = Math.hypot(upperColor[0] - lowerColor[0], upperColor[1] - lowerColor[1], upperColor[2] - lowerColor[2]);

  // where does the upper garment end? scan the torso centre from mid-torso down for a non-clothes gap
  const torsoEnd = scanDown(midX, 0.5);
  const torsoEndT = chainT(m, torsoEnd);

  const out: PersonGarment[] = [];
  const maskWhere = (sel: (x: number, y: number) => boolean) => {
    const mk = new Uint8Array(W * H);
    for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) if (labels[y * W + x] === CLOTHES && sel(x, y)) mk[y * W + x] = 1;
    return mk;
  };
  const hasUpper = torsoCov > 0.45;
  const hasLower = lowerCov > 0.45;
  const continuous = hasUpper && hasLower && torsoEndT > 1.25;
  if (continuous && colorDist < 45 && !legsSeparate) {
    const hem = scanDown(midX, 1.2);
    const hemT = chainT(m, hem);
    const widthAt = (t: number) => { const y = chainY(m, t); let l = midX(y), r = l; while (isC(l - 1, y)) l--; while (isC(r + 1, y)) r++; return r - l; };
    const flare = widthAt(Math.max(1.2, hemT - 0.1)) / Math.max(1, widthAt(1.1));
    out.push({
      type: "dress", sleeve, silhouette: flare > 1.25 ? "aline" : "straight", hemT, topT: 0,
      mask: maskWhere(() => true), color: upperColor, reason: "衣服從肩膀連續到臀部以下、上下同色",
    });
    return out;
  }
  if (hasUpper) {
    const endT = Math.min(torsoEndT, hasLower ? 1.15 : 3);
    const cut = chainY(m, hasLower ? Math.min(endT, 1.0) : endT) + 2;
    out.push({
      type: "top", sleeve, silhouette: "straight", hemT: endT, topT: 0,
      mask: maskWhere((_, y) => (hasLower ? y <= cut : true)), color: upperColor, reason: "肩膀到腰部有衣服",
    });
  }
  if (hasLower) {
    const topCut = hasUpper ? chainY(m, Math.min(torsoEndT, 1.0)) : chainY(m, 0.75);
    const hem = legsSeparate ? scanDown(legX, 1.2) : scanDown(midX, 1.2);
    const hemT = chainT(m, hem);
    const type: GarmentType = legsSeparate && hemT > 1.6 ? "pants" : "skirt";
    const widthAt = (t: number) => { const y = chainY(m, t); let l = midX(y), r = l; while (isC(l - 1, y)) l--; while (isC(r + 1, y)) r++; return r - l; };
    const flare = type === "skirt" ? widthAt(Math.max(1.2, hemT - 0.1)) / Math.max(1, widthAt(1.1)) : 1;
    out.push({
      type, sleeve: "none", silhouette: flare > 1.25 ? "aline" : type === "skirt" ? "fitted" : "straight", hemT, topT: chainT(m, topCut),
      mask: maskWhere((_, y) => y >= topCut - 2), color: lowerColor,
      reason: type === "pants" ? "兩腿之間沒有布料（褲管）" : "臀部以下有連成一片的布料",
    });
  }
  return out;
}
