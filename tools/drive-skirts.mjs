// Dev helper: long-skirt outfits in 3D and 寫真 (full body) -> _artifacts/skirt-*.png
import { chromium } from "playwright";
const outfits = process.argv.slice(2).length ? process.argv.slice(2) : ["長裙日常", "層次長裙"];
const browser = await chromium.launch({ args: ["--use-angle=swiftshader", "--enable-unsafe-swiftshader"] });
const page = await browser.newPage({ viewport: { width: 1180, height: 860 } });
const errs = [];
page.on("pageerror", (e) => errs.push(e.message));
const idle = () => page.waitForFunction(() => document.querySelector("#busy").hidden && window.__closet.poseSettled, null, { timeout: 120000 });
await page.goto("http://localhost:5391/");
await page.waitForFunction(() => window.__ready === true, null, { timeout: 120000 });
await page.uncheck("#quality");
await page.click('#tabs button[data-tab="wear"]');
for (const [i, o] of outfits.entries()) {
  await page.selectOption("#look-style", "3d");
  await page.click(`#outfit-chips button[data-outfit="${o}"]`);
  await page.waitForTimeout(400); await idle(); await page.waitForTimeout(900);
  await page.screenshot({ path: `_artifacts/skirt-${i}-3d.png`, clip: { x: 180, y: 70, width: 520, height: 790 } });
  await page.selectOption("#look-style", "photo");
  await page.waitForTimeout(300); await idle(); await page.waitForTimeout(500);
  await page.screenshot({ path: `_artifacts/skirt-${i}-photo.png`, clip: { x: 180, y: 70, width: 520, height: 790 } });
}
await page.selectOption("#look-style", "3d");
console.log(errs.join("\n") || "no errors");
await browser.close();
