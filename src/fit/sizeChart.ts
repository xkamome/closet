// Parse size charts pasted from shopping sites (Traditional/Simplified Chinese or English).
// Handles row- or column-oriented tables, "M：胸寬48 衣長62" lines, flat (half) measurements,
// ranges ("64-80" = elastic), and cm / inch units. Output circumferences are always full girth in cm.

export type GarmentKey =
  | "shoulder" | "chest" | "waist" | "hip" | "length" | "sleeveLength" | "sleeveOpening" | "hem"
  | "thigh" | "rise" | "inseam" | "legOpening" | "upperArm";

export const GARMENT_KEY_LABELS: Record<GarmentKey, string> = {
  shoulder: "肩寬", chest: "胸圍", waist: "腰圍", hip: "臀圍", length: "衣長", sleeveLength: "袖長",
  sleeveOpening: "袖口", hem: "下擺", thigh: "大腿圍", rise: "褲襠", inseam: "內長", legOpening: "褲口", upperArm: "袖寬",
};

/** keys whose values are girths (flat measurements must be doubled) */
export const GIRTH_KEYS: GarmentKey[] = ["chest", "waist", "hip", "hem", "thigh", "sleeveOpening", "legOpening", "upperArm"];

const SYNONYMS: [GarmentKey, RegExp][] = [
  ["shoulder", /肩寬|肩宽|^肩$|shoulder/i],
  ["sleeveOpening", /袖口|cuff|sleeve ?opening/i],
  ["upperArm", /袖寬|袖宽|袖肥|臂圍|臂围|upper ?arm|bicep/i],
  ["sleeveLength", /袖長|袖长|sleeve/i],
  ["chest", /胸圍|胸围|胸寬|胸宽|半胸|胸部|^胸$|bust|chest/i],
  ["waist", /腰圍|腰围|腰寬|腰宽|^腰$|waist/i],
  ["hip", /臀圍|臀围|臀寬|臀宽|^臀$|hips?\b/i],
  ["hem", /下擺|下摆|擺圍|摆围|裙擺|裙摆|hem/i],
  ["thigh", /大腿|腿圍|腿围|thigh/i],
  ["rise", /前檔|前档|前襠|前裆|褲襠|裤裆|立襠|立裆|直襠|直裆|rise/i],
  ["inseam", /內長|内长|內側長|内侧长|褲內長|inseam/i],
  ["legOpening", /褲口|裤口|褲管|裤管|腳口|脚口|leg ?opening/i],
  ["length", /衣長|衣长|裙長|裙长|褲長|裤长|全長|全长|總長|总长|後中長|后中长|^長度$|^长度$|length/i],
];

const SIZE_RE = /^(XXXS|XXS|XS|S|M|L|XL|XXL|XXXL|[2-6]XL|F|FREE|FREESIZE|ONESIZE|均碼|均码|單一尺寸|单一尺寸|大碼|大码|(?:EU|US|UK)?\d{1,2}(?:號|号|碼|码)?)$/i;

export interface SizeRow {
  size: string;
  values: Partial<Record<GarmentKey, number>>;
  ranges: Partial<Record<GarmentKey, [number, number]>>;
}
export interface ParsedChart {
  unit: "cm" | "in";
  flat: boolean;
  rows: SizeRow[];
  warnings: string[];
}

export function matchKey(label: string): GarmentKey | null {
  const s = label.trim().replace(/[（(].*?[)）]/g, "").replace(/[:：]$/, "");
  if (!s) return null;
  for (const [k, re] of SYNONYMS) if (re.test(s)) return k;
  return null;
}

function isHalfLabel(label: string): boolean {
  return /(寬|宽|半|平量|平鋪|平铺|flat|width)/i.test(label) && !/肩/.test(label);
}

function normSize(s: string): string {
  const t = s.trim().toUpperCase().replace(/\s+/g, "");
  if (/^(FREE|FREESIZE|ONESIZE|均碼|均码|單一尺寸|单一尺寸)$/.test(t)) return "F";
  return t.replace(/(號|号|碼|码)$/, "");
}

const NUM_RE = /(\d+(?:\.\d+)?)(?:\s*[-~～至到]\s*(\d+(?:\.\d+)?))?/;

function tokenize(line: string): string[] {
  return line
    .replace(/[|｜\t,，、;；]/g, " ")
    .replace(/(\d)\s*(cm|公分|釐米|厘米|in|inch|吋|")/gi, "$1 ")
    .replace(/([：:])/g, "$1 ")
    .split(/\s+/)
    .filter(Boolean);
}

function parseNum(tok: string): [number, number | null] | null {
  const m = tok.match(new RegExp("^" + NUM_RE.source + "$"));
  if (!m) return null;
  return [parseFloat(m[1]), m[2] ? parseFloat(m[2]) : null];
}

export function parseSizeChart(text: string): ParsedChart {
  const warnings: string[] = [];
  const unit: "cm" | "in" = /(inch|吋|\bin\b|\d")/i.test(text) && !/cm|公分/i.test(text) ? "in" : "cm";
  const globalFlat = /平量|平鋪|平铺|flat|lay flat|半圍|半围/i.test(text);
  const lines = text.split(/\r?\n/).map((l) => l.trim()).filter(Boolean);
  const rows = new Map<string, SizeRow>();
  const halfKeys = new Set<GarmentKey>();
  const getRow = (size: string) => {
    const s = normSize(size);
    if (!rows.has(s)) rows.set(s, { size: s, values: {}, ranges: {} });
    return rows.get(s)!;
  };
  const put = (row: SizeRow, key: GarmentKey, n: [number, number | null], label: string) => {
    if (isHalfLabel(label)) halfKeys.add(key);
    if (n[1] !== null) {
      row.ranges[key] = [n[0], n[1]];
      row.values[key] = (n[0] + n[1]) / 2;
    } else row.values[key] = n[0];
  };

  // --- pass 1: table with a header line of measurement labels (size per row)
  let header: (GarmentKey | null)[] | null = null;
  let headerLabels: string[] = [];
  // --- or a header line of sizes (measurement per row)
  let sizeHeader: string[] | null = null;

  for (const line of lines) {
    const toks = tokenize(line);
    if (!toks.length) continue;
    const keys = toks.map(matchKey);
    const keyCount = keys.filter(Boolean).length;
    const sizeToks = toks.filter((t) => SIZE_RE.test(normSize(t)) && !/^\d+$/.test(t));
    const nums = toks.map(parseNum);

    // header of measurement names, e.g. "尺寸 肩寬 胸圍 衣長"
    if (keyCount >= 2 && !/\d/.test(line.replace(/[（(].*?[)）]/g, ""))) {
      header = keys;
      headerLabels = toks;
      sizeHeader = null;
      continue;
    }
    // header of sizes, e.g. "尺寸 S M L XL"
    if (sizeToks.length >= 2 && keyCount === 0 && nums.filter(Boolean).length === 0) {
      sizeHeader = toks.filter((t) => SIZE_RE.test(normSize(t)));
      header = null;
      continue;
    }
    const first = normSize(toks[0].replace(/[:：]$/, ""));
    // "M：胸寬48 衣長62" or "M 胸圍 92 衣長 62" (inline key/value pairs)
    if (SIZE_RE.test(first) && keyCount >= 1) {
      const row = getRow(first);
      for (let i = 1; i < toks.length; i++) {
        const k = matchKey(toks[i].replace(/[\d.~\-]+$/, ""));
        if (!k) continue;
        const inline = toks[i].match(NUM_RE);
        const n = inline && /\d/.test(toks[i]) ? parseNum(inline[0]) : parseNum(toks[i + 1] ?? "");
        if (n) put(row, k, n, toks[i]);
      }
      continue;
    }
    // data row under a measurement header: "S 36 88 60"
    if (header && SIZE_RE.test(first)) {
      const row = getRow(first);
      const values = toks.slice(1).map(parseNum);
      // header may include a leading "尺寸/Size" column
      const hk = header[0] === null ? header.slice(1) : header;
      const hl = header[0] === null ? headerLabels.slice(1) : headerLabels;
      hk.forEach((k, i) => { if (k && values[i]) put(row, k, values[i]!, hl[i]); });
      continue;
    }
    // data row under a size header: "胸圍 88 92 96"
    const k0 = matchKey(toks[0]);
    if (sizeHeader && k0) {
      const values = toks.slice(1).map(parseNum).filter(Boolean) as [number, number | null][];
      values.forEach((n, i) => { if (sizeHeader![i]) put(getRow(sizeHeader![i]), k0, n, toks[0]); });
      continue;
    }
    // single-size description: "胸圍 100 衣長 70" (free size)
    if (keyCount >= 1 && nums.some(Boolean) && !sizeHeader) {
      const row = getRow("F");
      for (let i = 0; i < toks.length; i++) {
        const k = matchKey(toks[i].replace(/[\d.~\-]+$/, ""));
        if (!k) continue;
        const inline = toks[i].match(NUM_RE);
        const n = inline && /\d/.test(toks[i]) ? parseNum(inline[0]) : parseNum(toks[i + 1] ?? "");
        if (n) put(row, k, n, toks[i]);
      }
    }
  }

  // --- normalise: inches -> cm, flat -> girth
  const out = [...rows.values()].filter((r) => Object.keys(r.values).length > 0);
  const plausibleGirthMin: Partial<Record<GarmentKey, number>> = { chest: 64, waist: 50, hip: 66, hem: 60, thigh: 36, sleeveOpening: 14, legOpening: 24, upperArm: 20 };
  let flat = false; // true only if some value was actually doubled
  for (const r of out) {
    for (const k of Object.keys(r.values) as GarmentKey[]) {
      const conv = (v: number) => (unit === "in" ? v * 2.54 : v);
      r.values[k] = conv(r.values[k]!);
      if (r.ranges[k]) r.ranges[k] = [conv(r.ranges[k]![0]), conv(r.ranges[k]![1])];
      if (GIRTH_KEYS.includes(k)) {
        const min = plausibleGirthMin[k] ?? 0;
        // a page-wide "平量" note only doubles values that are too small to be a full girth
        // (sites often write 平量 next to numbers that are already circumferences)
        const half = halfKeys.has(k) || r.values[k]! < min || (globalFlat && r.values[k]! < min * 1.25);
        if (half) {
          flat = true;
          r.values[k] = r.values[k]! * 2;
          if (r.ranges[k]) r.ranges[k] = [r.ranges[k]![0] * 2, r.ranges[k]![1] * 2];
        }
      }
      r.values[k] = Math.round(r.values[k]! * 10) / 10;
    }
  }
  if (!out.length) warnings.push("找不到可辨識的尺寸資料，請確認有包含尺碼（S/M/L）與部位名稱（胸圍、衣長…）。");
  if (flat) warnings.push("偵測到平量（半圍）數值，已自動 ×2 換算成圍度。");
  if (unit === "in") warnings.push("偵測到英吋單位，已換算成公分。");
  const order = ["XXXS", "XXS", "XS", "S", "M", "L", "XL", "XXL", "2XL", "XXXL", "3XL", "4XL", "5XL", "6XL", "F"];
  out.sort((a, b) => {
    const ia = order.indexOf(a.size), ib = order.indexOf(b.size);
    if (ia >= 0 && ib >= 0) return ia - ib;
    return parseFloat(a.size) - parseFloat(b.size) || a.size.localeCompare(b.size);
  });
  return { unit, flat, rows: out, warnings };
}
