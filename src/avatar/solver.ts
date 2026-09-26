// Solve morph weights so the model's tape measurements match target measurements (cm).
// Damped Gauss-Newton with a finite-difference Jacobian (refreshed every few iterations).

import type { Body, MorphValues } from "./body";
import type { BodyMeasurer, Measurements } from "./measure";

export type TargetKey = "height" | "bust" | "underbust" | "waist" | "hips" | "shoulder" | "armLength" | "inseam" | "thigh" | "upperArm";
export type Targets = Partial<Record<TargetKey, number>>;

/** Each measurement is driven by a mix of MakeHuman morphs. */
const CONTROLS: Record<TargetKey, Record<string, number>> = {
  height: { height: 1 },
  bust: { cup: 0.6, bust: 0.5 },
  underbust: { underbust: 1 },
  waist: { waist: 1, belly: 0.3 },
  hips: { hips: 1, hipwidth: 0.3 },
  shoulder: { shoulder: 1 },
  armLength: { upperarmlen: 0.55, lowerarmlen: 0.45 },
  inseam: { upperleglen: 0.6, lowerleglen: 0.4 },
  thigh: { thigh: 1 },
  upperArm: { upperarm: 1 },
};
const LIMIT: Record<string, number> = { height: 1, weight: 1 };
const DEFAULT_LIMIT = 1.3;

export interface SolveOptions { weightKg?: number; maxIter?: number; tolerance?: number; extra?: MorphValues }
export interface SolveResult { morphs: MorphValues; measured: Measurements; residual: Partial<Record<TargetKey, number>>; iterations: number }

/** BMI -> MakeHuman weight morph (BMI 21.5 = neutral). */
export function weightMorphFromBMI(heightCm: number, kg: number): number {
  const bmi = kg / Math.pow(heightCm / 100, 2);
  return bmi >= 21.5 ? Math.min(1, (bmi - 21.5) / 10) : Math.max(-1, (bmi - 21.5) / 5.5);
}

export function controlsToMorphs(x: Record<string, number>, base: MorphValues): MorphValues {
  const m: MorphValues = { ...base };
  for (const [k, v] of Object.entries(x)) {
    const map = k === "weight" ? { weight: 1 } : CONTROLS[k as TargetKey];
    for (const [morph, c] of Object.entries(map)) m[morph] = (m[morph] ?? 0) + v * c;
  }
  return m;
}

export function solveMeasurements(body: Body, measurer: BodyMeasurer, targets: Targets, opts: SolveOptions = {}): SolveResult {
  const first = solvePass(body, measurer, targets, opts, false);
  if (Object.values(first.residual).every((v) => Math.abs(v!) < 1.5)) return first;
  // unreachable with circumference morphs alone -> also let overall body weight move
  const second = solvePass(body, measurer, targets, opts, true);
  const err = (r: SolveResult) => Object.values(r.residual).reduce((s, v) => s + v! * v!, 0);
  if (err(second) < err(first)) return second;
  body.setMorphs(first.morphs);
  return first;
}

function solvePass(body: Body, measurer: BodyMeasurer, targets: Targets, opts: SolveOptions, freeWeight: boolean): SolveResult {
  const keys = (Object.keys(targets) as TargetKey[]).filter((k) => targets[k] !== undefined && CONTROLS[k]);
  const base: MorphValues = { ...(opts.extra ?? {}) };
  if (opts.weightKg && targets.height) base.weight = weightMorphFromBMI(targets.height, opts.weightKg);
  const ctl = [...keys] as string[];
  if (freeWeight) ctl.push("weight");
  const x: Record<string, number> = Object.fromEntries(ctl.map((k) => [k, 0]));
  const lim = (k: string) => LIMIT[k] ?? DEFAULT_LIMIT;

  const evalAt = (xx: Record<string, number>) => {
    body.setMorphs(controlsToMorphs(xx, base));
    return measurer.measure(body);
  };
  const resid = (m: Measurements) => keys.map((k) => (m[k] as number) - targets[k]!);
  const norm = (r: number[]) => Math.sqrt(r.reduce((s, v) => s + v * v, 0));

  let m = evalAt(x);
  let r = resid(m);
  let J: number[][] | null = null;
  let it = 0;
  const maxIter = opts.maxIter ?? 10, tol = opts.tolerance ?? 0.4;
  for (; it < maxIter && Math.max(...r.map(Math.abs)) > tol; it++) {
    if (!J || it % 3 === 0) {
      const h = 0.2;
      J = keys.map(() => new Array(ctl.length).fill(0));
      ctl.forEach((kc, c) => {
        const xh = { ...x, [kc]: x[kc] + (x[kc] + h > lim(kc) ? -h : h) };
        const step = xh[kc] - x[kc];
        const rh = resid(evalAt(xh));
        for (let i = 0; i < keys.length; i++) J![i][c] = (rh[i] - r[i]) / step;
      });
    }
    // (J^T J + λI) dx = -J^T r
    const n = ctl.length;
    const A = Array.from({ length: n }, (_, i) => Array.from({ length: n }, (_, j) => {
      let s = 0;
      for (let k = 0; k < keys.length; k++) s += J![k][i] * J![k][j];
      return s + (i === j ? 1e-3 + 1e-4 * Math.abs(s) : 0);
    }));
    const b = Array.from({ length: n }, (_, i) => -keys.reduce((s, _, k) => s + J![k][i] * r[k], 0));
    const dx = solveLinear(A, b);
    let alpha = 1, improved = false;
    for (let ls = 0; ls < 4; ls++, alpha /= 2) {
      const xn = { ...x };
      ctl.forEach((k, i) => { xn[k] = Math.max(-lim(k), Math.min(lim(k), x[k] + alpha * dx[i])); });
      const mn = evalAt(xn), rn = resid(mn);
      if (norm(rn) < norm(r)) { Object.assign(x, xn); m = mn; r = rn; improved = true; break; }
    }
    if (!improved) { J = null; if (it % 3 !== 2) continue; break; }
  }
  const morphs = controlsToMorphs(x, base);
  body.setMorphs(morphs);
  m = measurer.measure(body);
  const residual: Partial<Record<TargetKey, number>> = {};
  keys.forEach((k) => { residual[k] = Math.round(((m[k] as number) - targets[k]!) * 10) / 10; });
  return { morphs, measured: m, residual, iterations: it };
}

function solveLinear(A: number[][], b: number[]): number[] {
  const n = b.length;
  const M = A.map((row, i) => [...row, b[i]]);
  for (let c = 0; c < n; c++) {
    let p = c;
    for (let r = c + 1; r < n; r++) if (Math.abs(M[r][c]) > Math.abs(M[p][c])) p = r;
    [M[c], M[p]] = [M[p], M[c]];
    const d = M[c][c] || 1e-12;
    for (let r = 0; r < n; r++) {
      if (r === c) continue;
      const f = M[r][c] / d;
      for (let k = c; k <= n; k++) M[r][k] -= f * M[c][k];
    }
  }
  return M.map((row, i) => row[n] / (row[i] || 1e-12));
}
