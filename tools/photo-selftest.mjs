// Self-check for photo measuring: render the avatar (known measurements) front + side in A-pose,
// run the MediaPipe pipeline on those renders and compare. usage: node tools/photo-selftest.mjs [url]
import { chromium } from "playwright";
const url = process.argv[2] || "http://localhost:5391/";
const browser = await chromium.launch({ args: ["--use-angle=swiftshader", "--enable-unsafe-swiftshader"] });
const page = await browser.newPage({ viewport: { width: 900, height: 1100 } });
page.on("pageerror", (e) => console.log("pageerror", e.message));
await page.goto(url);
await page.waitForFunction(() => window.__ready === true, null, { timeout: 120000 });
const out = await page.evaluate(async () => {
  const c = window.__closet;
  document.getElementById("panel").style.display = "none";
  document.getElementById("toolbar").style.display = "none";
  window.dispatchEvent(new Event("resize"));
  c.setUnderwear(false);
  c.setPose("rest");
  await new Promise((r) => setTimeout(r, 1500));
  const shotAt = async (angle) => {
    c.avatar.group.rotation.y = angle;
    await new Promise((r) => setTimeout(r, 400));
    const cv = document.querySelector("#viewport canvas");
    return await new Promise((res) => cv.toBlob(res, "image/png"));
  };
  const front = await c.loadImage(await shotAt(0));
  const side = await c.loadImage(await shotAt(Math.PI / 2));
  c.avatar.group.rotation.y = 0;
  const m = c.measurements;
  const r1 = await c.measureFromPhotos(front, m.height, null);
  const r2 = await c.measureFromPhotos(front, m.height, side);
  return { truth: { bust: m.bust, waist: m.waist, hips: m.hips, shoulder: m.shoulder, inseam: m.inseam, armLength: m.armLength }, frontOnly: r1, withSide: r2 };
});
console.log(JSON.stringify(out, null, 1));
await browser.close();
