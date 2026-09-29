// Dev helper: generate a wardrobe from a description in the app, wear the new items, screenshot 寫真.
// usage: node tools/drive-generate.mjs "<description>" <count>   (needs `npm run dev`; `npm run bridge` for AI)
import { chromium } from "playwright";
const [text = "上班通勤的膠囊衣櫃，大地色系、好搭配", count = "3"] = process.argv.slice(2);
const browser = await chromium.launch({ args: ["--use-angle=swiftshader", "--enable-unsafe-swiftshader"] });
const page = await browser.newPage({ viewport: { width: 1180, height: 860 } });
const errs = [];
page.on("pageerror", (e) => errs.push(e.message));
page.on("console", (m) => { if (m.type() === "error" && !/^INFO:/.test(m.text())) errs.push(m.text()); });
const idle = () => page.waitForFunction(() => document.querySelector("#busy").hidden, null, { timeout: 120000 });
await page.goto("http://localhost:5391/");
await page.waitForFunction(() => window.__ready === true, null, { timeout: 120000 });
await page.uncheck("#quality");
await page.click('#tabs button[data-tab="wear"]');
await page.fill("#gen-text", text);
await page.selectOption("#gen-count", count);
const t0 = Date.now();
await page.click("#gen-go");
await page.waitForFunction(() => /已放進衣櫃|失敗/.test(document.querySelector("#gen-status").textContent), null, { timeout: 300000 });
console.log(await page.textContent("#gen-status"), `(${Math.round((Date.now() - t0) / 1000)} s)`);
const names = await page.$$eval("#wardrobe-list li span", (xs) => xs.map((x) => x.textContent).filter((t) => t.startsWith("✦")));
await page.screenshot({ path: "_artifacts/gen-wardrobe.png" });
await page.selectOption("#look-style", "photo");
for (const [i, n] of names.slice(0, Number(count)).entries()) {
  await page.click(`#wardrobe-list li:has-text("${n}") button:has-text('穿上')`);
  await page.waitForTimeout(400); await idle(); await page.waitForTimeout(500);
  if (i % 2 === 1 || i === Number(count) - 1) await page.screenshot({ path: `_artifacts/gen-${i}.png`, clip: { x: 180, y: 70, width: 520, height: 790 } });
  console.log(n, await page.evaluate(() => window.__closet.worn.map((w) => `${w.spec.type}:${w.spec.size}`).join(" ")));
}
await page.selectOption("#look-style", "3d");
console.log(errs.join("\n") || "no errors");
await browser.close();
