// Dev helper: wear every one-click outfit in 寫真 and save a contact sheet (_artifacts/outfits-*.png).
import { chromium } from "playwright";
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
await page.selectOption("#look-style", "photo");
const names = await page.$$eval("#outfit-chips button", (bs) => bs.map((b) => b.textContent));
for (const [i, n] of names.entries()) {
  await page.click(`#outfit-chips button[data-outfit="${n}"]`);
  await page.waitForTimeout(400); await idle(); await page.waitForTimeout(600);
  await page.screenshot({ path: `_artifacts/outfit-${i}.png`, clip: { x: 180, y: 70, width: 520, height: 790 } });
  console.log(n, await page.evaluate(() => window.__closet.worn.map((w) => `${w.spec.type}:${w.spec.size}${w.spec.tucked ? ":tucked" : ""}:${w.fit?.verdict ?? ""}`).join(" ")));
}
await page.selectOption("#look-style", "3d");
console.log(errs.join("\n") || "no errors");
await browser.close();
