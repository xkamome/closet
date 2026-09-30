// Dev helper: wear wardrobe items one by one, screenshot 3D (front + back) and 寫真.
// usage: node tools/drive-items.mjs "<item>" ...   -> _artifacts/it-<i>-{3d,back,photo}.png
import { chromium } from "playwright";
const names = process.argv.slice(2);
const browser = await chromium.launch({ args: ["--use-angle=swiftshader", "--enable-unsafe-swiftshader"] });
const page = await browser.newPage({ viewport: { width: 1180, height: 860 } });
const errs = [];
page.on("pageerror", (e) => errs.push(e.message));
const idle = () => page.waitForFunction(() => document.querySelector("#busy").hidden && window.__closet.poseSettled, null, { timeout: 120000 });
const clip = { x: 180, y: 70, width: 520, height: 790 };
await page.goto("http://localhost:5391/");
await page.waitForFunction(() => window.__ready === true, null, { timeout: 120000 });
await page.uncheck("#quality");
await page.click('#tabs button[data-tab="wear"]');
await page.waitForFunction(() => document.querySelectorAll("#wardrobe-list li").length >= 20, null, { timeout: 60000 });
for (const [i, n] of names.entries()) {
  await page.selectOption("#look-style", "3d");
  while (await page.locator("#worn-list li button:has-text('脫下')").count()) await page.click("#worn-list li:first-child button:has-text('脫下')");
  await page.click(`#wardrobe-list li:has-text("${n}") button:has-text('穿上')`);
  await page.waitForTimeout(300); await idle(); await page.waitForTimeout(800);
  await page.screenshot({ path: `_artifacts/it-${i}-3d.png`, clip });
  await page.evaluate(() => { window.__closet.avatar.group.rotation.y = Math.PI; });
  await page.waitForTimeout(600);
  await page.screenshot({ path: `_artifacts/it-${i}-back.png`, clip });
  await page.evaluate(() => { window.__closet.avatar.group.rotation.y = 0; });
  await page.selectOption("#look-style", "photo");
  await page.waitForTimeout(300); await idle(); await page.waitForTimeout(500);
  await page.screenshot({ path: `_artifacts/it-${i}-photo.png`, clip });
  console.log(n, await page.evaluate(() => JSON.stringify(window.__closet.worn.map((w) => [w.spec.size, w.spec.m.chest, w.spec.m.length]))), await page.evaluate(() => window.__closet.measurements.bust));
}
await page.selectOption("#look-style", "3d");
console.log(errs.join("\n") || "no errors");
await browser.close();
