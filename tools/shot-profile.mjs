// Dev helper: screenshot the app with a given saved profile (JSON) injected into localStorage.
// usage: node tools/shot-profile.mjs '<profile json>' out.png [half]
import { chromium } from "playwright";
const [json, out, half] = process.argv.slice(2);
const browser = await chromium.launch({ args: ["--use-angle=swiftshader", "--enable-unsafe-swiftshader"] });
const page = await browser.newPage({ viewport: { width: 1000, height: 900 } });
await page.addInitScript((p) => localStorage.setItem("closet2.profile", p), json);
await page.goto("http://localhost:5391/");
await page.waitForFunction(() => window.__ready === true, null, { timeout: 120000 });
if (half) await page.click("#pose-half");
await page.waitForTimeout(1800);
await page.screenshot({ path: out });
await browser.close();
