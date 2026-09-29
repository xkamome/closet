// Writes the synthetic flat-lay photos of the Look Lab to samples/look/*.png (needs `npm run dev`).
import fs from "node:fs";
import { chromium } from "playwright";
const browser = await chromium.launch({ args: ["--use-angle=swiftshader", "--enable-unsafe-swiftshader"] });
const page = await browser.newPage();
await page.goto("http://localhost:5391/lab.html?export=1");
await page.waitForFunction(() => window.__samples, null, { timeout: 60000 });
const samples = await page.evaluate(() => window.__samples);
fs.mkdirSync("samples/look", { recursive: true });
for (const [id, url] of Object.entries(samples)) {
  fs.writeFileSync(`samples/look/${id}.png`, Buffer.from(url.split(",")[1], "base64"));
  console.log("wrote samples/look/" + id + ".png");
}
await browser.close();
