// Dev helper: half-body close-ups of wardrobe items in 3D and 寫真. usage: node tools/drive-shoulders.mjs "<item name>" ...
import { chromium } from "playwright";
const names = process.argv.slice(2);
const browser = await chromium.launch({ args: ["--use-angle=swiftshader", "--enable-unsafe-swiftshader"] });
const page = await browser.newPage({ viewport: { width: 1100, height: 800 } });
const errs = [];
page.on("pageerror", (e) => errs.push(e.message));
const idle = () => page.waitForFunction(() => document.querySelector("#busy").hidden && window.__closet.poseSettled, null, { timeout: 120000 });
await page.goto("http://localhost:5391/");
await page.waitForFunction(() => window.__ready === true, null, { timeout: 120000 });
await page.uncheck("#quality");
await page.click('#tabs button[data-tab="wear"]');
await page.waitForFunction(() => document.querySelectorAll("#wardrobe-list li").length >= 17, null, { timeout: 60000 });
await page.click("#pose-half");
for (const [i, n] of names.entries()) {
  await page.selectOption("#look-style", "3d");
  await page.click(`#wardrobe-list li:has-text('${n}') button:has-text('穿上')`);
  await page.waitForTimeout(300); await idle(); await page.waitForTimeout(700);
  await page.screenshot({ path: `_artifacts/sh-${i}-3d.png`, clip: { x: 0, y: 0, width: 880, height: 800 } });
  await page.selectOption("#look-style", "photo");
  await page.waitForTimeout(300); await idle(); await page.waitForTimeout(500);
  await page.screenshot({ path: `_artifacts/sh-${i}-photo.png`, clip: { x: 0, y: 0, width: 880, height: 800 } });
  console.log(i, n, await page.evaluate(() => JSON.stringify(window.__closet.worn.map((w) => [w.spec.size, w.spec.m.shoulder, w.spec.m.chest]))));
}
await page.selectOption("#look-style", "3d");
await page.click("#pose-stand");
console.log(errs.join("\n") || "no errors");
await browser.close();
