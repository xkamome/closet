// Serves dist-web under /closet/ (like GitHub Pages) and checks the site: loads without errors, the AI
// features are gone, an outfit can be worn in 寫真. usage: node tools/check-web.mjs [url]
import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { chromium } from "playwright";

const TYPES = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".json": "application/json", ".wasm": "application/wasm", ".png": "image/png", ".jpg": "image/jpeg" };
let url = process.argv[2];
let server;
if (!url) {
  server = http.createServer((req, res) => {
    const p = decodeURIComponent(req.url.split("?")[0]);
    if (!p.startsWith("/closet/")) { res.writeHead(404); return res.end(); }
    let f = path.join("dist-web", p.slice("/closet/".length) || "index.html");
    if (fs.existsSync(f) && fs.statSync(f).isDirectory()) f = path.join(f, "index.html");
    if (!fs.existsSync(f)) { res.writeHead(404); return res.end(); }
    res.writeHead(200, { "content-type": TYPES[path.extname(f)] ?? "application/octet-stream" });
    fs.createReadStream(f).pipe(res);
  }).listen(5480);
  url = "http://127.0.0.1:5480/closet/";
}
const browser = await chromium.launch({ args: ["--use-angle=swiftshader", "--enable-unsafe-swiftshader"] });
const page = await browser.newPage({ viewport: { width: 1180, height: 860 } });
const errs = [];
page.on("pageerror", (e) => errs.push(e.message));
page.on("console", (m) => { if (m.type() === "error" && !/^INFO:/.test(m.text())) errs.push(m.text()); });
page.on("requestfailed", (r) => errs.push("request failed: " + r.url()));
await page.goto(url);
const ok = await page.waitForFunction(() => window.__ready === true, null, { timeout: 120000 }).then(() => true, () => false);
if (!ok) {
  console.log("NOT READY; loading text:", await page.textContent("#loading").catch(() => "?"));
  console.log(errs.slice(0, 12).join("\n"));
  await browser.close(); server?.close(); process.exit(1);
}
const ai = await page.evaluate(() => ["ai-ask", "gen-go", "gen-text", "ai-question"].filter((id) => document.getElementById(id)));
console.log("AI elements left:", ai.length ? ai.join(",") : "none");
await page.uncheck("#quality");
await page.click('#tabs button[data-tab="wear"]');
await page.selectOption("#look-style", "photo");
await page.click('#outfit-chips button[data-outfit="長裙日常"]');
await page.waitForTimeout(500);
await page.waitForFunction(() => document.querySelector("#busy").hidden && window.__closet.worn.length === 2, null, { timeout: 120000 });
await page.waitForTimeout(800);
await page.screenshot({ path: "_artifacts/web-check.png" });
console.log("worn:", await page.evaluate(() => window.__closet.worn.map((w) => w.spec.type + ":" + w.spec.size).join(" ")));
console.log(errs.slice(0, 8).join("\n") || "no errors");
await browser.close();
server?.close();
