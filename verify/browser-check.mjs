#!/usr/bin/env node
// Harness Constitution Article III.3 — browser reality check.
// Loads pages in headless Chromium, fails on console errors / page errors,
// saves screenshots to _artifacts/ so a human can eyeball the result.
// Requires (once per project): npm i -D playwright && npx playwright install chromium
// Add to loop.config.json verify array: "node verify/browser-check.mjs index.html"
// 防「測試過了但畫面壞掉」：開真瀏覽器、收 console 錯誤、留截圖。

import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const targets = process.argv.slice(2);
if (targets.length === 0) {
  console.error("usage: node verify/browser-check.mjs <page.html | http://...> [...more]");
  process.exit(1);
}

let chromium;
try {
  ({ chromium } = await import("playwright"));
} catch {
  console.error(
    "playwright not installed. Run: npm i -D playwright && npx playwright install chromium"
  );
  process.exit(1);
}

fs.mkdirSync("_artifacts", { recursive: true });
const browser = await chromium.launch();
let failed = false;

for (const t of targets) {
  const url = /^https?:\/\//.test(t)
    ? t
    : "file:///" + path.resolve(t).replace(/\\/g, "/");
  const page = await browser.newPage();
  const errors = [];
  page.on("console", (msg) => {
    if (msg.type() === "error") errors.push(`console.error: ${msg.text()}`);
  });
  page.on("pageerror", (err) => errors.push(`pageerror: ${err.message}`));

  try {
    await page.goto(url, { waitUntil: "load", timeout: 30000 });
    await page.waitForTimeout(1500); // let init scripts run
  } catch (e) {
    errors.push(`navigation failed: ${e.message}`);
  }

  const shot = path.join("_artifacts", path.basename(t).replace(/[^\w.-]/g, "_") + ".png");
  try {
    await page.screenshot({ path: shot, fullPage: true });
  } catch { /* screenshot is best-effort */ }

  if (errors.length) {
    failed = true;
    console.error(`FAIL ${t}\n  ${errors.join("\n  ")}\n  screenshot: ${shot}`);
  } else {
    console.log(`PASS ${t} (screenshot: ${shot})`);
  }
  await page.close();
}

await browser.close();
process.exit(failed ? 1 : 0);
