#!/usr/bin/env node
// Browser acceptance test (憲法 III.3): builds on `npm run build` output, serves it with
// `vite preview`, drives the real UI in headless Chromium and saves screenshots to _artifacts/.

import fs from "node:fs";
import { spawn } from "node:child_process";
import { chromium } from "playwright";

const PORT = 5400 + Math.floor(Math.random() * 500); // random: a stale server from an aborted run cannot collide
const BASE = `http://127.0.0.1:${PORT}/`;
fs.mkdirSync("_artifacts", { recursive: true });

const server = spawn(process.execPath, ["node_modules/vite/bin/vite.js", "preview", "--port", String(PORT), "--strictPort", "--host", "127.0.0.1"],
  { stdio: ["ignore", "pipe", "pipe"], windowsHide: true });
let serverLog = "";
server.stdout.on("data", (d) => (serverLog += d));
server.stderr.on("data", (d) => (serverLog += d));

const failures = [];
const errors = [];
const check = async (name, fn) => {
  try { await fn(); console.log("PASS", name); } catch (e) { failures.push(`FAIL ${name}: ${e.message}`); console.log("FAIL", name, e.message); }
};
const assert = (c, m) => { if (!c) throw new Error(m); };

let browser;
try {
  for (let i = 0; i < 100; i++) {
    try { const r = await fetch(BASE); if (r.ok) break; } catch { /* starting */ }
    await new Promise((r) => setTimeout(r, 150));
  }
  browser = await chromium.launch({ args: ["--use-angle=swiftshader", "--enable-unsafe-swiftshader"] });
  const page = await browser.newPage({ viewport: { width: 1280, height: 860 } });
  // MediaPipe/TFLite prints informational lines through console.error ("INFO: Created TensorFlow Lite ...")
  page.on("console", (m) => { if (m.type() === "error" && !/^INFO:/.test(m.text())) errors.push(m.text()); });
  page.on("pageerror", (e) => errors.push("pageerror: " + e.message));
  await page.goto(BASE);
  await page.waitForFunction(() => window.__ready === true, null, { timeout: 120000 });
  await page.waitForTimeout(800);
  const shot = (n) => page.screenshot({ path: `_artifacts/e2e-${n}.png` });
  // software rendering in CI: skip the ambient-occlusion pass so the UI stays responsive
  await page.uncheck("#quality");
  await shot("01-loaded");

  await check("3D canvas is not blank", async () => {
    const stats = await page.evaluate(() => {
      const c = document.querySelector("#viewport canvas");
      const tmp = document.createElement("canvas");
      tmp.width = 200; tmp.height = 200;
      const ctx = tmp.getContext("2d");
      ctx.drawImage(c, 0, 0, 200, 200);
      const d = ctx.getImageData(0, 0, 200, 200).data;
      const bg = [d[0], d[1], d[2]];
      let diff = 0;
      for (let i = 0; i < d.length; i += 4) if (Math.abs(d[i] - bg[0]) + Math.abs(d[i + 1] - bg[1]) + Math.abs(d[i + 2] - bg[2]) > 40) diff++;
      return diff / (200 * 200);
    });
    assert(stats > 0.04, `only ${(stats * 100).toFixed(1)}% of pixels differ from background`);
  });

  await check("body measurements applied within 2cm", async () => {
    const t = { height: 165, bust: 88, waist: 68, hips: 94 };
    for (const [k, v] of Object.entries(t)) await page.fill(`#m-${k}`, String(v));
    await page.fill("#m-weight", "56");
    await page.click("#apply-body");
    await page.waitForFunction(() => /已套用/.test(document.querySelector("#solve-status").textContent) && document.querySelector("#busy").hidden, null, { timeout: 60000 });
    await page.waitForFunction(() => window.__closet.measurements.height > 164, null, { timeout: 20000 });
    const shown = await page.evaluate(() => Object.fromEntries([...document.querySelectorAll("#measured-table td[data-k]")].map((td) => [td.dataset.k, parseFloat(td.textContent)])));
    for (const [k, v] of Object.entries(t)) assert(Math.abs(shown[k] - v) <= 2, `${k}: shown ${shown[k]} vs target ${v}`);
  });

  await check("pose buttons & auto-rotate", async () => {
    await page.click("#pose-sit");
    await page.waitForFunction(() => window.__closet.pose === "sit" && window.__closet.poseSettled, null, { timeout: 20000 });
    await page.waitForTimeout(900);
    const stool = await page.evaluate(() => window.__closet.stage.scene.getObjectByName("stool").visible);
    assert(stool, "stool should be visible when sitting");
    await shot("02-sit");
    await page.click("#pose-half");
    await page.waitForFunction(() => window.__closet.pose === "half" && window.__closet.poseSettled, null, { timeout: 20000 });
    await page.waitForTimeout(900);
    await shot("03-half");
    await page.click("#pose-stand");
    await page.waitForFunction(() => window.__closet.pose === "stand" && window.__closet.poseSettled, null, { timeout: 20000 });
    await page.check("#autorotate");
    assert(await page.evaluate(() => window.__closet.stage.autoRotate), "auto-rotate on");
    await page.uncheck("#autorotate");
    assert(!(await page.evaluate(() => window.__closet.stage.autoRotate)), "auto-rotate off");
    await page.waitForTimeout(900);
  });

  await check("garment photo is worn with its texture", async () => {
    await page.click('#tabs button[data-tab="wear"]');
    await page.setInputFiles("#garment-photo", "samples/tshirt.png");
    await page.waitForFunction(() => !document.querySelector("#cutout-wrap").hidden && /判斷為/.test(document.querySelector("#guess-text").textContent), null, { timeout: 120000 });
    assert((await page.inputValue("#g-type")) === "top", "t-shirt photo should be guessed as a top");
    await page.click("#wear");
    await page.waitForFunction(() => window.__closet.worn.length === 1 && window.__closet.worn[0].view, null, { timeout: 30000 });
    const red = await page.evaluate(() => {
      const w = window.__closet.worn[0];
      const mesh = window.__closet.stage.scene.getObjectByName("garment-top");
      if (!mesh) return -1;
      const img = w.view.material.map.image;
      const ctx = img.getContext("2d");
      const d = ctx.getImageData(0, 0, img.width / 2, img.height).data;
      let n = 0;
      for (let i = 0; i < d.length; i += 16) if (d[i] > 170 && d[i + 1] < 120 && d[i + 2] < 130) n++;
      return n / (d.length / 16);
    });
    assert(red > 0.05, `garment texture should contain the photo's red stripes (got ${red})`);
    await page.waitForTimeout(700);
    await shot("04-worn");
  });

  await check("flat-lay sleeve length is recognised (long sleeve / sleeveless)", async () => {
    for (const [file, want] of [["samples/longsleeve.png", "long"], ["samples/tank.png", "none"]]) {
      await page.evaluate(() => { document.querySelector("#guess-text").textContent = ""; });
      await page.setInputFiles("#garment-photo", file);
      await page.waitForFunction(() => /判斷為|偵測到/.test(document.querySelector("#guess-text").textContent), null, { timeout: 120000 });
      assert((await page.inputValue("#g-type")) === "top", `${file} should be a top`);
      assert((await page.inputValue("#g-sleeve")) === want, `${file}: sleeve ${await page.inputValue("#g-sleeve")} != ${want}`);
    }
  });

  await check("size chart gives per-region fit and a recommended size", async () => {
    await page.click('#tabs button[data-tab="size"]');
    await page.fill("#size-text", fs.readFileSync("samples/size-chart.txt", "utf8"));
    await page.fill("#fabric-text", fs.readFileSync("samples/fabric.txt", "utf8"));
    await page.click("#parse-size");
    await page.waitForFunction(() => document.querySelectorAll("#fit-table .status").length >= 2 && document.querySelector("#busy").hidden, null, { timeout: 30000 });
    const rec = await page.textContent("#recommend-card");
    assert(/推薦尺碼：\s*(S|M|L|XL)/.test(rec), "recommendation card: " + rec);
    const statuses = await page.$$eval("#fit-table .status", (xs) => xs.map((x) => x.textContent));
    assert(statuses.every((s) => /過小|偏緊|合身|寬鬆|過大|偏短|剛好|偏長/.test(s)), "statuses " + statuses);
    await page.click('#size-buttons button[data-size="S"]');
    await page.waitForFunction(() => document.querySelector("#busy").hidden && document.querySelector("#size-buttons button.on")?.dataset.size === "S", null, { timeout: 30000 });
    await page.check("#heatmap");
    await page.waitForTimeout(700);
    await shot("05-size-S-heatmap");
    await page.uncheck("#heatmap");
  });

  await check("photo of a person: garments are split, detected and worn", async () => {
    await page.click('#tabs button[data-tab="wear"]');
    await page.setInputFiles("#garment-photo", "samples/person.png");
    await page.waitForTimeout(300);
    await page.waitForFunction(() => document.querySelector("#busy").hidden && document.querySelectorAll("#person-garments button").length > 0, null, { timeout: 240000 });
    const chips = await page.$$eval("#person-garments button", (bs) => bs.map((b) => b.dataset.type));
    assert(chips.includes("top") && chips.includes("skirt"), "detected " + chips);
    for (let i = 0; i < chips.length; i++) {
      await page.click(`#person-garments button:nth-child(${i + 1})`);
      await page.click("#wear");
      await page.waitForTimeout(300);
      await page.waitForFunction(() => document.querySelector("#busy").hidden, null, { timeout: 60000 });
    }
    const types = await page.evaluate(() => window.__closet.worn.map((w) => w.spec.type).sort().join(","));
    assert(types === "skirt,top", "worn " + types);
    await page.waitForTimeout(700);
    await shot("07-person-photo");
  });

  await check("photo display mode draws the outfit", async () => {
    for (const st of ["photo"]) {
      await page.selectOption("#look-style", st);
      await page.waitForTimeout(200);
      await page.waitForFunction(() => document.querySelector("#busy").hidden && !document.querySelector("#look-canvas").hidden, null, { timeout: 120000 });
      await page.waitForTimeout(300);
      const stats = await page.evaluate(() => {
        const c = document.querySelector("#look-canvas");
        const tmp = document.createElement("canvas");
        tmp.width = 120; tmp.height = 200;
        const ctx = tmp.getContext("2d");
        ctx.drawImage(c, 0, 0, 120, 200);
        const d = ctx.getImageData(0, 0, 120, 200).data;
        // garment colours from the person photo: red stripes (top) and blue (skirt)
        let red = 0, blue = 0;
        for (let i = 0; i < d.length; i += 4) {
          // hue-based: stylised modes lighten colours toward the paper
          if (d[i] > d[i + 1] + 45 && d[i] > d[i + 2] + 35) red++;
          if (d[i + 2] > d[i] + 30 && d[i + 2] > d[i + 1] + 10) blue++;
        }
        return { red: red / (d.length / 4), blue: blue / (d.length / 4) };
      });
      assert(stats.red > 0.004 && stats.blue > 0.004, `${st}: garment colours missing ${JSON.stringify(stats)}`);
      await shot("08-look-" + st);
    }
    await page.selectOption("#look-style", "3d");
    await page.waitForFunction(() => document.querySelector("#look-canvas").hidden, null, { timeout: 20000 });
  });

  await check("my face: a selfie is put on the avatar (3D and 寫真) and can be removed", async () => {
    await page.click('#tabs button[data-tab="body"]');
    // synthetic selfie: a rendered MakeHuman face (no real person)
    await page.setInputFiles("#face-photo", "samples/face-caucasian.png");
    await page.waitForFunction(() => /已套用|找不到|失敗/.test(document.querySelector("#face-status").textContent), null, { timeout: 240000 });
    const status = await page.textContent("#face-status");
    assert(/已套用/.test(status), "face status: " + status);
    await page.waitForFunction(() => document.querySelector("#busy").hidden && window.__closet.avatar.skinMaterial.map?.image instanceof HTMLCanvasElement, null, { timeout: 120000 });
    const hair = await page.inputValue("#hair");
    assert(hair === "hair_long01", "long hair in the selfie -> long hairstyle, got " + hair);
    await page.selectOption("#look-style", "photo");
    await page.waitForTimeout(200);
    await page.waitForFunction(() => document.querySelector("#busy").hidden && !document.querySelector("#look-canvas").hidden, null, { timeout: 120000 });
    await page.waitForTimeout(300);
    await shot("09-my-face");
    await page.selectOption("#look-style", "3d");
    await page.click("#face-remove");
    await page.waitForFunction(() => document.querySelector("#busy").hidden && !(window.__closet.avatar.skinMaterial.map?.image instanceof HTMLCanvasElement), null, { timeout: 60000 });
    assert(await page.evaluate(() => window.__closet.selfie === null), "selfie removed");
    await page.click('#tabs button[data-tab="wear"]');
  });

  await check("default wardrobe: starter garments are there and can be worn", async () => {
    await page.waitForFunction(() => document.querySelectorAll("#wardrobe-list li").length >= 6, null, { timeout: 60000 });
    const names = await page.$$eval("#wardrobe-list li span", (xs) => xs.map((x) => x.textContent));
    for (const n of ["印花 T 恤", "碎花洋裝", "直筒牛仔褲"]) assert(names.includes(n), "default item missing: " + n + " in " + names);
    await page.click("#wardrobe-list li:has-text('直筒牛仔褲') button:has-text('穿上')");
    await page.waitForFunction(() => document.querySelector("#busy").hidden && window.__closet.worn.some((w) => w.spec.type === "pants"), null, { timeout: 60000 });
    // preset items are cut for the current body
    const inseam = await page.evaluate(() => window.__closet.worn.find((w) => w.spec.type === "pants").spec.m.inseam);
    const bodyInseam = await page.evaluate(() => window.__closet.measurements.inseam);
    assert(Math.abs(inseam - bodyInseam) < 1, `jeans inseam ${inseam} vs body ${bodyInseam}`);
    await page.click("#worn-list li:has-text('長褲') button:has-text('脫下')");
    await page.waitForFunction(() => !window.__closet.worn.some((w) => w.spec.type === "pants"), null, { timeout: 20000 });
  });

  await check("saved avatars: save, change the body, load it back", async () => {
    await page.click('#tabs button[data-tab="body"]');
    const before = await page.evaluate(() => window.__closet.measurements.waist);
    await page.fill("#avatar-name", "驗收假人");
    await page.click("#avatar-save");
    await page.waitForFunction(() => /已儲存/.test(document.querySelector("#avatar-status").textContent), null, { timeout: 20000 });
    await page.fill("#m-waist", String(Math.round(before + 8)));
    await page.click("#apply-body");
    await page.waitForFunction((b) => document.querySelector("#busy").hidden && window.__closet.measurements.waist > b + 5, before, { timeout: 60000 });
    await page.click("#avatar-load");
    await page.waitForFunction(() => /已讀取/.test(document.querySelector("#avatar-status").textContent), null, { timeout: 60000 });
    await page.waitForFunction(() => document.querySelector("#busy").hidden, null, { timeout: 60000 });
    const after = await page.evaluate(() => window.__closet.measurements.waist);
    assert(Math.abs(after - before) < 1.5, `waist after load ${after} vs saved ${before}`);
    assert((await page.inputValue("#m-waist")) !== String(Math.round(before + 8)), "form refilled from the saved avatar");
    await page.click('#tabs button[data-tab="wear"]');
  });

  await check("tuck in: a top goes inside the trousers and comes out again", async () => {
    await page.click("#wardrobe-list li:has-text('UNIQLO 圓領 T 恤') button:has-text('穿上')");
    await page.waitForFunction(() => document.querySelector("#busy").hidden && window.__closet.worn.some((w) => w.uniqlo), null, { timeout: 60000 });
    await page.click("#wardrobe-list li:has-text('直筒牛仔褲') button:has-text('穿上')");
    await page.waitForFunction(() => document.querySelector("#busy").hidden && window.__closet.worn.some((w) => w.spec.type === "pants"), null, { timeout: 60000 });
    const size = await page.evaluate(() => window.__closet.worn.find((w) => w.uniqlo).spec.size);
    assert(/^(XXS|XS|S|M|L|XL|XXL)$/.test(size), "UNIQLO size recommended: " + size);
    await page.click("#worn-list button.tuck");
    await page.waitForFunction(() => document.querySelector("#busy").hidden && window.__closet.worn.find((w) => w.spec.type === "top")?.spec.tucked, null, { timeout: 60000 });
    // the tucked top ends inside the waistband: its rebuilt garment is shorter than the untucked one
    const tuckedH = await page.evaluate(() => { const v = window.__closet.worn.find((w) => w.spec.type === "top").view.data.bbox; return v.maxY - v.minY; });
    await page.click("#worn-list button.tuck");
    await page.waitForFunction(() => document.querySelector("#busy").hidden && !window.__closet.worn.find((w) => w.spec.type === "top")?.spec.tucked, null, { timeout: 60000 });
    const outH = await page.evaluate(() => { const v = window.__closet.worn.find((w) => w.spec.type === "top").view.data.bbox; return v.maxY - v.minY; });
    assert(tuckedH < outH - 0.02, `tucked top height ${tuckedH} should be shorter than untucked ${outH}`);
    await shot("10-uniqlo-tuck");
  });

  await check("one-click outfits and a wardrobe from a description (keyword reader, no AI bridge)", async () => {
    await page.click('#outfit-chips button[data-outfit="瑜伽"]');
    await page.waitForTimeout(300);
    await page.waitForFunction(() => document.querySelector("#busy").hidden && window.__closet.worn.length === 2, null, { timeout: 60000 });
    const yoga = await page.evaluate(() => window.__closet.worn.map((w) => w.spec.type).sort().join(","));
    assert(yoga === "pants,top", "yoga outfit " + yoga);
    // deterministic: no AI bridge in the test, the keyword reader handles the description
    await page.route("**/api/ask", (r) => r.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({ text: "（測試環境沒有 AI）" }) }));
    await page.fill("#gen-text", "白色條紋長袖上衣、黑色碎花長裙");
    await page.selectOption("#gen-count", "3");
    await page.click("#gen-go");
    await page.waitForFunction(() => /已放進衣櫃|失敗/.test(document.querySelector("#gen-status").textContent), null, { timeout: 240000 });
    const st = await page.textContent("#gen-status");
    assert(/已放進衣櫃 2 件/.test(st), "generator: " + st);
    await page.click("#wardrobe-list li:has-text('✦') button:has-text('穿上')");
    await page.waitForFunction(() => document.querySelector("#busy").hidden && window.__closet.worn.some((w) => w.generated), null, { timeout: 60000 });
    const size = await page.evaluate(() => window.__closet.worn.find((w) => w.generated).spec.size);
    assert(/^(XXS|XS|S|M|L|XL|XXL|3XL)$/.test(size ?? ""), "generated item sized like UNIQLO: " + size);
    await shot("11-generated");
    await page.unroute("**/api/ask");
  });

  await check("wardrobe: save, take off, wear again", async () => {
    const before = await page.$$eval("#wardrobe-list li", (xs) => xs.length);
    await page.click("#worn-list li:first-child button:has-text('收進衣櫃')");
    await page.waitForFunction((n) => document.querySelectorAll("#wardrobe-list li").length === n + 1, before, { timeout: 20000 });
    const savedType = await page.evaluate(() => window.__closet.worn[0].spec.type);
    while (await page.locator("#worn-list li button:has-text('脫下')").count()) {
      await page.click("#worn-list li:first-child button:has-text('脫下')");
    }
    assert((await page.evaluate(() => window.__closet.worn.length)) === 0, "all garments taken off");
    await page.click("#wardrobe-list li:first-child button:has-text('穿上')");
    await page.waitForFunction(() => window.__closet.worn.length === 1 && document.querySelector("#busy").hidden, null, { timeout: 60000 });
    const t = await page.evaluate(() => window.__closet.worn[0].spec.type);
    assert(t === savedType, `re-worn ${t} vs saved ${savedType}`);
  });

  await check("styling advice shows body shape and suggestions", async () => {
    await page.click('#tabs button[data-tab="style"]');
    const h = await page.textContent("#shape-card h3");
    assert(/沙漏型|梨型|蘋果型|H 型|倒三角型/.test(h), "shape headline: " + h);
    const items = await page.$$eval("#advice li", (xs) => xs.length);
    assert(items >= 8, "advice items " + items);
    await shot("06-style");
  });

  await check("no console errors", async () => {
    assert(errors.length === 0, errors.slice(0, 5).join(" | "));
  });
} catch (e) {
  failures.push("FAIL e2e crashed: " + e.message + "\n" + serverLog.slice(-800));
} finally {
  await browser?.close();
  server.kill();
}
if (failures.length) { console.error(failures.join("\n")); process.exit(1); }
console.log("e2e: all checks passed");
