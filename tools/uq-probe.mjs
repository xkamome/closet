// Research helper: open a UNIQLO product / size page in a browser and dump size-related JSON and text.
// usage: node tools/uq-probe.mjs <url> <outPrefix>
import fs from "node:fs";
import { chromium } from "playwright";
const [url, out = "_logs/uq"] = process.argv.slice(2);
const browser = await chromium.launch({ headless: true });
const ctx = await browser.newContext({ userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36", locale: "en-US" });
const page = await ctx.newPage();
const hits = [];
page.on("response", async (r) => {
  const u = r.url();
  if (!/size|measure|dimension|chart/i.test(u)) return;
  try { hits.push({ u, body: (await r.text()).slice(0, 200000) }); } catch { /* ignore */ }
});
await page.goto(url, { waitUntil: "domcontentloaded", timeout: 60000 }).catch((e) => console.log("goto", e.message));
await page.waitForTimeout(6000);
fs.writeFileSync(out + "-hits.json", JSON.stringify(hits, null, 1));
fs.writeFileSync(out + "-text.txt", await page.evaluate(() => document.body?.innerText ?? ""));
console.log("hits", hits.map((h) => h.u).join("\n"));
await browser.close();
