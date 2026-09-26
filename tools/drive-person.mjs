// Dev helper: upload a person photo, report detected garments, wear them, screenshot.
import { chromium } from "playwright";
const photo = process.argv[2] || "samples/person.png";
const browser = await chromium.launch({ args: ["--use-angle=swiftshader", "--enable-unsafe-swiftshader"] });
const page = await browser.newPage({ viewport: { width: 1100, height: 900 } });
const errs = [];
page.on("pageerror", (e) => errs.push(e.message));
page.on("console", (m) => { if (m.type() === "error") errs.push(m.text()); });
await page.goto("http://localhost:5391/");
await page.waitForFunction(() => window.__ready === true, null, { timeout: 120000 });
const idle = () => page.waitForFunction(() => document.querySelector("#busy").hidden, null, { timeout: 90000 });
await page.uncheck("#quality");
await page.click('#tabs button[data-tab="wear"]');
const t0 = Date.now();
await page.setInputFiles("#garment-photo", photo);
await page.waitForTimeout(300);
await idle();
console.log("analyze ms", Date.now() - t0, JSON.stringify(await page.evaluate(() => window.__closet.personTiming)));
console.log("guess:", await page.textContent("#guess-text"));
const chips = await page.$$eval("#person-garments button", (bs) => bs.map((b) => b.textContent));
console.log("chips:", chips);
await page.locator("#cutout-preview").screenshot({ path: "_artifacts/person-cutout0.png" });
for (let i = 0; i < chips.length; i++) {
  await page.click(`#person-garments button:nth-child(${i + 1})`);
  await page.click("#wear");
  await page.waitForTimeout(300);
  await idle();
}
console.log("worn:", await page.evaluate(() => window.__closet.worn.map((w) => `${w.spec.type} len=${Math.round(w.spec.m.length)} sleeve=${w.spec.sleeve} sil=${w.spec.silhouette}`)));
await page.waitForTimeout(1000);
await page.screenshot({ path: "_artifacts/person-worn.png" });
console.log(errs.join("\n") || "no errors");
await browser.close();
