// Research helper: download UNIQLO product details, finished-garment size charts and body-size ranges
// for the standard fitting set. Japan site first (Asian sizing, same labels as Taiwan), US site as a
// fallback for items Japan doesn't carry. Writes _logs/uniqlo-raw.json.
import fs from "node:fs";
const IDS = {
  innerwear: ["E473980-000", "E473977-000", "E482195-000"],
  tops: ["E465755-000", "E424873-000", "E465760-000", "E487579-000", "E465751-000"],
  dresses: ["E482982-000", "E488722-000", "E488186-000"],
  skirts: ["E482285-000", "E482286-000", "E487996-000", "E487997-000"],
  sports: ["E487016-000", "E483458-000", "E483546-000", "E483296-000", "E483294-000", "E483295-000", "E483282-000"],
};
const UA = { "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/126.0 Safari/537.36" };
const SITES = [["jp", "ja"], ["us", "en"]];
const cm = (p) => p.measurements.find((m) => m.unit === "cm")?.value;
const out = {};
for (const [group, ids] of Object.entries(IDS)) {
  for (const id of ids) {
    for (const [site, lang] of SITES) {
      const base = `https://www.uniqlo.com/${site}/api/commerce/v5/${lang}/products`;
      const d = await (await fetch(`${base}/${id}/price-groups/00/details?includeModelSize=false&httpFailure=true`, { headers: UA })).json().catch(() => ({}));
      if (d.status !== "ok") continue;
      const sc = await (await fetch(`${base}/size-charts?productIdsWithColorCode=${id}&includeBodyMeasurements=true&simpleSizeChart=true&httpFailure=true`, { headers: UA })).json().catch(() => ({}));
      const r = d.result, c = sc.result?.[0] ?? {};
      out[id] = {
        group, site, name: r.name, composition: r.composition,
        colors: (r.colors ?? []).map((k) => ({ code: k.code, name: k.name, filterCode: k.filterCode, hex: k.hexBackgroundColor ?? null })),
        sizeChart: (c.sizeChart ?? []).map((s) => ({ size: s.name, parts: Object.fromEntries(s.sizeParts.map((p) => [p.code, Number(cm(p))])) })),
        body: (c.bodyMeasurements ?? []).map((s) => ({ size: s.name, parts: Object.fromEntries(s.sizeParts.map((p) => [p.code, String(cm(p))])) })),
      };
      console.log(site, id, r.name, "sizes", out[id].sizeChart.length, "body", out[id].body.length);
      break;
    }
    if (!out[id]) console.log("missing", id);
  }
}
fs.writeFileSync("_logs/uniqlo-raw.json", JSON.stringify(out, null, 1));
