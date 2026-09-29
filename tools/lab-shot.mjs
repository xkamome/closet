// Dev helper: screenshot the Look Lab. usage: node tools/lab-shot.mjs <query> <out.png> [width]
import { chromium } from "playwright";
const [query = "", out = "_artifacts/lab.png", width = "1600"] = process.argv.slice(2);
const browser = await chromium.launch({ args: ["--use-angle=swiftshader", "--enable-unsafe-swiftshader"] });
const page = await browser.newPage({ viewport: { width: Number(width), height: 900 } });
const errs = [];
page.on("console", (m) => { if (m.type() === "error" || m.type() === "warning") errs.push(m.type() + ": " + m.text()); });
page.on("pageerror", (e) => errs.push("pageerror: " + e.message));
await page.goto("http://localhost:5391/lab.html" + (query ? "?" + query : ""));
await page.waitForFunction(() => window.__labReady === true, null, { timeout: 240000 }).catch(() => errs.push("not ready"));
await page.waitForTimeout(300);
console.log(await page.textContent("#status"));
await page.screenshot({ path: out, fullPage: true });
console.log(errs.slice(0, 10).join("\n") || "no errors");
await browser.close();
