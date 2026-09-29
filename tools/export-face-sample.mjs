// Writes synthetic test selfies (rendered MakeHuman faces, no real people) to samples/face-*.png.
import fs from "node:fs";
import { chromium } from "playwright";
const browser = await chromium.launch({ args: ["--use-angle=swiftshader", "--enable-unsafe-swiftshader"] });
for (const kind of ["caucasian", "african"]) {
  const page = await browser.newPage();
  await page.goto("http://localhost:5391/lab.html?exportface=" + kind);
  await page.waitForFunction(() => window.__faceSample, null, { timeout: 120000 });
  const url = await page.evaluate(() => window.__faceSample);
  fs.writeFileSync(`samples/face-${kind}.png`, Buffer.from(url.split(",")[1], "base64"));
  console.log("wrote samples/face-" + kind + ".png");
  await page.close();
}
await browser.close();
