// Dev helper: screenshot the running app. usage: node tools/shot.mjs <url> <out.png> [waitMs]
import { chromium } from "playwright";
const [url, out, wait = "2500"] = process.argv.slice(2);
const browser = await chromium.launch({ args: ["--use-angle=swiftshader", "--enable-unsafe-swiftshader"] });
const page = await browser.newPage({ viewport: { width: 900, height: 900 } });
const errs = [];
page.on("console", (m) => { if (m.type() === "error" || m.type() === "warning") errs.push(m.type() + ": " + m.text()); });
page.on("pageerror", (e) => errs.push("pageerror: " + e.message));
await page.goto(url);
await page.waitForFunction(() => window.__ready === true, null, { timeout: 60000 }).catch(() => errs.push("not ready"));
await page.waitForTimeout(Number(wait));
await page.screenshot({ path: out });
console.log(errs.slice(0, 10).join("\n") || "no errors");
await browser.close();
