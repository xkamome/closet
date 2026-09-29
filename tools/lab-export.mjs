// Saves every Look Lab render as a PNG in _artifacts/report/ (needs `npm run dev`).
// usage: node tools/lab-export.mjs "<lab query>"
import fs from "node:fs";
import { chromium } from "playwright";
const [query = "size=520&only=p-tee,p-stripe,p-dress,p-tank"] = process.argv.slice(2);
const browser = await chromium.launch({ args: ["--use-angle=swiftshader", "--enable-unsafe-swiftshader"] });
const page = await browser.newPage({ viewport: { width: 1400, height: 900 } });
await page.goto("http://localhost:5391/lab.html?" + query);
await page.waitForFunction(() => window.__labReady === true, null, { timeout: 600000 });
const items = await page.$$eval("figure", (fs2) => fs2.map((f) => ({ src: f.querySelector("img")?.src, cap: f.querySelector("figcaption")?.textContent })));
fs.mkdirSync("_artifacts/report", { recursive: true });
const out = [];
items.forEach((it, i) => {
  if (!it.src?.startsWith("data:")) return;
  const name = `r${String(i).padStart(2, "0")}.png`;
  fs.writeFileSync("_artifacts/report/" + name, Buffer.from(it.src.split(",")[1], "base64"));
  out.push({ file: name, caption: it.cap });
});
fs.writeFileSync("_artifacts/report/index.json", JSON.stringify(out, null, 1));
console.log(out.length, "images");
await browser.close();
