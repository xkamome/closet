// Dev helper: upload a garment photo and print the type/sleeve guess.
import { chromium } from "playwright";
const photo = process.argv[2] || "samples/tshirt.png";
const browser = await chromium.launch({ args: ["--use-angle=swiftshader", "--enable-unsafe-swiftshader"] });
const page = await browser.newPage({ viewport: { width: 1100, height: 900 } });
await page.goto("http://localhost:5391/");
await page.waitForFunction(() => window.__ready === true, null, { timeout: 120000 });
await page.uncheck("#quality");
await page.click('#tabs button[data-tab="wear"]');
await page.setInputFiles("#garment-photo", photo);
await page.waitForFunction(() => /判斷為|偵測到/.test(document.querySelector("#guess-text").textContent), null, { timeout: 120000 });
console.log(await page.textContent("#guess-text"), "| sleeve select:", await page.inputValue("#g-sleeve"));
await browser.close();
