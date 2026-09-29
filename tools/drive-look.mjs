// Dev helper: wear sample photos in the real app and screenshot every look style.
// usage: node tools/drive-look.mjs <outPrefix> <photo1.png> [photo2.png ...]   (needs `npm run dev`)
import { chromium } from "playwright";
const [out = "_artifacts/app-look", ...photos] = process.argv.slice(2);
const browser = await chromium.launch({ args: ["--use-angle=swiftshader", "--enable-unsafe-swiftshader"] });
const page = await browser.newPage({ viewport: { width: 1280, height: 860 } });
const errs = [];
page.on("pageerror", (e) => errs.push(e.message));
page.on("console", (m) => { if (m.type() === "error" && !/^INFO:/.test(m.text())) errs.push(m.text()); });
await page.goto("http://localhost:5391/");
await page.waitForFunction(() => window.__ready === true, null, { timeout: 120000 });
await page.uncheck("#quality");
await page.click('#tabs button[data-tab="wear"]');
for (const ph of photos.length ? photos : ["samples/look/stripeLong.png", "samples/look/plaidSkirt.png"]) {
  await page.setInputFiles("#garment-photo", ph);
  await page.waitForFunction(() => document.querySelector("#busy").hidden && document.querySelector("#guess-text").textContent.length > 0, null, { timeout: 60000 });
  await page.waitForTimeout(300);
  await page.click("#wear");
  await page.waitForFunction(() => document.querySelector("#busy").hidden, null, { timeout: 60000 });
}
await page.waitForTimeout(500);
await page.screenshot({ path: `${out}-3d.png` });
for (const st of ["photo"]) {
  await page.selectOption("#look-style", st);
  await page.waitForTimeout(200);
  await page.waitForFunction(() => document.querySelector("#busy").hidden && !document.querySelector("#look-canvas").hidden, null, { timeout: 60000 });
  await page.waitForTimeout(300);
  await page.screenshot({ path: `${out}-${st}.png` });
  console.log(st, "ms", await page.evaluate(() => Math.round(window.__closet.look.lastMs)));
}
await page.selectOption("#look-style", "3d");
console.log(errs.join("\n") || "no errors");
await browser.close();
