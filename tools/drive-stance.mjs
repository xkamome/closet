// Dev helper: feet-together slider + swapping outfits back and forth in 3D and 寫真 (needs `npm run dev`).
import { chromium } from "playwright";
const browser = await chromium.launch({ args: ["--use-angle=swiftshader", "--enable-unsafe-swiftshader"] });
const page = await browser.newPage({ viewport: { width: 1280, height: 860 } });
const errs = [];
page.on("pageerror", (e) => errs.push(e.message));
page.on("console", (m) => { if (m.type() === "error" && !/^INFO:/.test(m.text())) errs.push(m.text()); });
await page.goto("http://localhost:5391/");
await page.waitForFunction(() => window.__ready === true, null, { timeout: 120000 });
await page.uncheck("#quality");
const idle = () => page.waitForFunction(() => document.querySelector("#busy").hidden && window.__closet.poseSettled, null, { timeout: 60000 });
const wear = async (file) => {
  await page.evaluate(() => { document.querySelector("#guess-text").textContent = ""; });
  await page.setInputFiles("#garment-photo", file);
  await page.waitForFunction(() => document.querySelector("#busy").hidden && document.querySelector("#guess-text").textContent.length > 0, null, { timeout: 60000 });
  await page.click("#wear");
  await page.waitForTimeout(200);
  await idle();
};
await page.click('#tabs button[data-tab="wear"]');
await page.selectOption("#look-style", "3d");
await wear("samples/look/floralDress.png");
await page.$eval("#stance", (el) => { el.value = "0"; el.dispatchEvent(new Event("input")); });
await page.waitForTimeout(400);
await idle();
await page.waitForTimeout(800);
await page.screenshot({ path: "_artifacts/stance-3d.png" });
const log = [];
await page.selectOption("#look-style", "photo");
for (const f of ["samples/look/graphicTee.png", "samples/look/denim.png", "samples/look/stripeLong.png", "samples/look/plaidSkirt.png", "samples/look/floralDress.png"]) {
  await wear(f);
  await page.waitForTimeout(400);
  await page.waitForFunction(() => document.querySelector("#busy").hidden, null, { timeout: 60000 });
  log.push(f.split("/").pop() + " -> " + (await page.evaluate(() => window.__closet.worn.map((w) => w.spec.type).join("+"))));
}
await page.screenshot({ path: "_artifacts/stance-photo.png" });
// take everything off
while (await page.locator("#worn-list li button:has-text('脫下')").count()) await page.click("#worn-list li:first-child button:has-text('脫下')");
await page.waitForTimeout(600);
await page.waitForFunction(() => document.querySelector("#busy").hidden, null, { timeout: 60000 });
log.push("after taking off: " + (await page.evaluate(() => window.__closet.worn.length)) + " worn");
await page.screenshot({ path: "_artifacts/stance-photo-empty.png" });
console.log(log.join("\n"));
console.log(errs.join("\n") || "no errors");
await browser.close();
