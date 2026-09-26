// Side-by-side: CC0 reference garment vs our generated garment (front + side).
// usage: node tools/compare-ref.mjs [refName] [type] [sleeve] [neck] [out]
import { chromium } from "playwright";
const [ref = "ref_female_casualsuit02", type = "top", sleeve = "short", neck = "crew", out = "_artifacts/compare"] = process.argv.slice(2);
const browser = await chromium.launch({ args: ["--use-angle=swiftshader", "--enable-unsafe-swiftshader"] });
const page = await browser.newPage({ viewport: { width: 700, height: 900 } });
await page.goto("http://localhost:5391/");
await page.waitForFunction(() => window.__ready === true, null, { timeout: 120000 });
await page.uncheck("#quality");
await page.uncheck("#underwear");
await page.evaluate(() => {
  document.getElementById("panel").style.display = "none";
  document.getElementById("toolbar").style.display = "none";
  window.dispatchEvent(new Event("resize"));
});
const snap = async (name) => {
  await page.waitForTimeout(900);
  await page.screenshot({ path: `${out}-${name}-front.png` });
  await page.evaluate(() => { window.__closet.avatar.group.rotation.y = Math.PI / 2; });
  await page.waitForTimeout(500);
  await page.screenshot({ path: `${out}-${name}-side.png` });
  await page.evaluate(() => { window.__closet.avatar.group.rotation.y = 0; });
};
await page.evaluate((r) => window.__closet.avatar.setReference(r), ref);
await snap("ref");
await page.evaluate(() => window.__closet.avatar.setReference(null));
await page.evaluate(() => { document.getElementById("panel").style.display = ""; });
await page.click('#tabs button[data-tab="wear"]');
await page.selectOption("#g-type", type);
if (type === "top" || type === "dress") { await page.selectOption("#g-sleeve", sleeve); await page.selectOption("#g-neck", neck); }
await page.selectOption("#g-color", undefined).catch(() => {});
const tw = Date.now();
await page.click("#wear-plain");
await page.waitForFunction(() => window.__closet.worn.length === 1 && document.querySelector("#busy").hidden, null, { timeout: 60000 });
console.log("wear ms", Date.now() - tw, "compute ms", await page.evaluate(() => Math.round(window.__closet.lastWearMs)), "sim ms", await page.evaluate(() => Math.round(window.__closet.worn[0].view.lastSimMs)), JSON.stringify(await page.evaluate(() => Object.fromEntries(Object.entries(window.__closet.wearBreakdown).map(([k, v]) => [k, Math.round(v)])))));
await page.evaluate(() => { document.getElementById("panel").style.display = "none"; window.dispatchEvent(new Event("resize")); });
await snap("ours");
await browser.close();
console.log("saved", out);
