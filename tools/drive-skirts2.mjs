// Dev helper: new long skirts in 3D + 寫真, and one skirt in its smallest vs largest size.
import { chromium } from "playwright";
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
await page.waitForFunction(() => document.querySelectorAll("#wardrobe-list li").length >= 30, null, { timeout: 60000 });
const wearItem = async (name) => { await page.click(`#wardrobe-list li:has-text("${name}") button:has-text('穿上')`); await page.waitForTimeout(300); await idle(); await page.waitForTimeout(700); };
let k = 0;
for (const name of ["雪紡長裙", "百褶長裙"]) {
  await page.selectOption("#look-style", "3d");
  await wearItem(name);
  await page.screenshot({ path: `_artifacts/sk2-${k++}.png`, clip });
  await page.selectOption("#look-style", "photo");
  await page.waitForTimeout(300); await idle(); await page.waitForTimeout(500);
  await page.screenshot({ path: `_artifacts/sk2-${k++}.png`, clip });
  console.log(name, await page.evaluate(() => JSON.stringify(window.__closet.worn.map((w) => [w.spec.type, w.spec.size, w.spec.pleated, Math.round(w.spec.m.hip), Math.round(w.spec.m.hem)]))));
}
await wearItem("U牌 雪紡百褶中長裙");
const sizes = await page.$$eval("#worn-list select.uq-size option", (os) => os.map((o) => o.value));
for (const z of [sizes[0], sizes[sizes.length - 1]]) {
  await page.selectOption("#worn-list select.uq-size", z);
  await page.waitForTimeout(300); await idle(); await page.waitForTimeout(500);
  await page.screenshot({ path: `_artifacts/sk2-${k++}.png`, clip });
  console.log("size", z, await page.evaluate(() => JSON.stringify(window.__closet.worn.map((w) => [w.spec.size, Math.round(w.spec.m.waist), Math.round(w.spec.m.hip), Math.round(w.spec.m.hem)]))));
}
await page.selectOption("#look-style", "3d");
console.log(errs.join("\n") || "no errors");
await browser.close();
