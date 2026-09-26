// Dev helper: drive the UI. usage: node tools/drive.mjs <garmentType> <pose> <outPrefix> [silhouette]
import { chromium } from "playwright";
const [type = "dress", pose = "sit", out = "_artifacts/drive", sil = "aline"] = process.argv.slice(2);
const browser = await chromium.launch({ args: ["--use-angle=swiftshader", "--enable-unsafe-swiftshader"] });
const page = await browser.newPage({ viewport: { width: 1100, height: 900 } });
const errs = [];
page.on("pageerror", (e) => errs.push(e.message));
page.on("console", (m) => { if (m.type() === "error") errs.push(m.text()); });
await page.goto("http://localhost:5391/");
await page.waitForFunction(() => window.__ready === true, null, { timeout: 120000 });
await page.click('#tabs button[data-tab="wear"]');
await page.selectOption("#g-type", type);
await page.selectOption("#g-silhouette", sil);
const t0 = Date.now();
await page.click("#wear-plain");
await page.waitForFunction(() => window.__closet.worn.length > 0 && document.querySelector("#busy").hidden, null, { timeout: 60000 });
console.log("wear ms", Date.now() - t0);
if (pose !== "stand") {
  const t1 = Date.now();
  await page.click(`#pose-${pose}`);
  await page.waitForFunction((p) => window.__closet.pose === p && window.__closet.poseSettled, pose, { timeout: 60000 });
  console.log("pose ms", Date.now() - t1);
}
await page.waitForTimeout(1200);
await page.screenshot({ path: out + "-front.png" });
await page.evaluate(() => { window.__closet.avatar.group.rotation.y = Math.PI / 2; });
await page.waitForTimeout(500);
await page.screenshot({ path: out + "-side.png" });
console.log(errs.join("\n") || "no errors");
await browser.close();
