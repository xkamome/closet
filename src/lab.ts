// Look Lab: renders the same outfits in every look style for side-by-side comparison.
// Query: ?only=<outfit id>  &style=<style>  &size=<px width>

import { loadAvatar } from "./avatar/data";
import { Body } from "./avatar/body";
import { BodyMeasurer } from "./avatar/measure";
import { solveMeasurements } from "./avatar/solver";
import { buildPose } from "./avatar/poses";
import { lookPose } from "./look/pose";
import { defaultSpec, type GarmentSpec, type GarmentType } from "./garment/spec";
import { buildFrame } from "./look/frame";
import { buildLookGarment } from "./look/pattern";
import { LookRenderer, type DressedGarment, type LookStyle } from "./look/render";
import { makeSample, type SampleId } from "./look/sampleGen";
import { cutoutGarment, guessGarment, type Cutout } from "./garment/photo";
import { mapPhoto, bleedImage } from "./look/photoMap";

const q = new URLSearchParams(location.search);
const $ = (id: string) => document.getElementById(id)!;
if (q.get("w")) document.head.insertAdjacentHTML("beforeend", `<style>figure img { width: ${q.get("w")}px !important; }</style>`);

import { readPanels } from "./look/photoMap";

/** ?debug=photo : every sample cutout with the detected pattern landmarks */
function debugPhotos(): void {
  const grid = document.getElementById("grid")!;
  for (const id of ["gridTee", "graphicTee", "stripeLong", "ribTank", "floralDress", "plaidSkirt", "denim"] as const) {
    const c = cutoutGarment(makeSample(id));
    const kind = id === "plaidSkirt" ? "skirt" : id === "denim" ? "pants" : "top";
    const P = readPanels(c, kind);
    const cnv = document.createElement("canvas");
    cnv.width = c.width; cnv.height = c.height;
    const g = cnv.getContext("2d")!;
    g.fillStyle = "#999"; g.fillRect(0, 0, c.width, c.height);
    g.drawImage(bleedImage(c.canvas), 0, 0);
    g.globalAlpha = 0.5; g.fillStyle = "#000"; g.fillRect(0, 0, c.width, c.height); g.globalAlpha = 1;
    g.drawImage(c.canvas, 0, 0);
    const line = (y: number, col: string, label: string) => { g.strokeStyle = col; g.lineWidth = 3; g.beginPath(); g.moveTo(0, y); g.lineTo(c.width, y); g.stroke(); g.fillStyle = col; g.font = "bold 22px sans-serif"; g.fillText(label, 4, y - 4); };
    line(P.hps, "#e11", "HPS"); line(P.sp, "#e81", "SP"); line(P.ap, "#1a1", "AP"); line(P.cf, "#11e", "CF"); line(P.hem, "#a1a", "HEM");
    if (kind === "pants") line(P.crotch, "#0aa", "CROTCH");
    g.strokeStyle = "#0ff"; g.beginPath(); g.moveTo(P.cx, 0); g.lineTo(P.cx, c.height); g.stroke();
    for (const s of [-1, 1]) { g.fillStyle = "#f0f"; g.beginPath(); g.arc(P.cx + s * P.spX, P.sp, 8, 0, 7); g.fill(); g.beginPath(); g.arc(P.cx + s * P.apX, P.ap, 8, 0, 7); g.fill(); }
    const fig = document.createElement("figure");
    fig.appendChild(cnv);
    let gap = 0; for (let y = Math.round(c.height * 0.65); y < c.height; y++) if (!c.mask[y * c.width + Math.round(c.centerX)]) gap++;
    fig.insertAdjacentHTML("beforeend", `<figcaption>${id} ${JSON.stringify({ guess: guessGarment(c).type, gap, cxc: Math.round(c.centerX), thw: Math.round(c.torsoHalfWidth), hps: P.hps, sp: P.sp, ap: P.ap, cf: P.cf, hem: P.hem, spX: Math.round(P.spX), apX: Math.round(P.apX), w: c.width, h: c.height })}</figcaption>`);
    grid.appendChild(fig);
  }
  document.getElementById("status")!.textContent = "photo debug";
  (window as any).__labReady = true;
}

/** ?face=caucasian|african : synthetic selfie -> landmarks -> face on the avatar */
async function faceLab(): Promise<void> {
  const { detectFace, renderAvatarFace, fitFace, composeSkin } = await import("./face/faceSwap");
  const { makeTestSelfie } = await import("./face/testSelfie");
  const THREE = await import("three");
  const grid = document.getElementById("grid")!;
  const show = (c: HTMLCanvasElement, cap: string, pts?: [number, number][]) => {
    const cc = document.createElement("canvas");
    cc.width = c.width; cc.height = c.height;
    const g = cc.getContext("2d")!;
    g.drawImage(c, 0, 0);
    if (pts) { g.fillStyle = "#0f0"; for (const [x, y] of pts) g.fillRect(x - 1.5, y - 1.5, 3, 3); }
    const fig = document.createElement("figure");
    fig.appendChild(cc);
    fig.insertAdjacentHTML("beforeend", `<figcaption>${cap}</figcaption>`);
    grid.appendChild(fig);
  };
  const data = await loadAvatar();
  const body = new Body(data);
  const measurer = new BodyMeasurer(data);
  solveMeasurements(body, measurer, { height: 160, bust: 83, waist: 66, hips: 91 }, { weightKg: 52 });
  const t0 = performance.now();
  const selfie = await makeTestSelfie(data, (q.get("face") as any) || "caucasian");
  const sl = await detectFace(selfie);
  show(selfie, "selfie " + (sl ? "478 pts" : "NO FACE"), sl ?? undefined);
  body.setPose({});
  const shot = await renderAvatarFace(body, "avatar/tex/skin_young_asian_female.jpg");
  const al = await detectFace(shot.canvas);
  show(shot.canvas, "avatar " + (al ? "478 pts" : "NO FACE"), al ?? undefined);
  const timing: Record<string, number> = { detect: performance.now() - t0 };
  if (sl) {
    const { segmentPerson } = await import("./photo/segmenter");
    const { guessHair } = await import("./face/faceSwap");
    const labels = await segmentPerson(selfie);
    const rgb = selfie.getContext("2d")!.getImageData(0, 0, selfie.width, selfie.height).data;
    const hg = guessHair(labels, rgb, selfie.width, selfie.height, sl);
    const m = document.createElement("canvas"); m.width = selfie.width; m.height = selfie.height;
    const mg = m.getContext("2d")!; mg.drawImage(selfie, 0, 0);
    const id = mg.getImageData(0, 0, m.width, m.height);
    for (let i = 0; i < labels.length; i++) if (labels[i] === 1) { id.data[i * 4] = 255; id.data[i * 4 + 1] = 0; }
    mg.putImageData(id, 0, 0);
    show(m, "hair: " + JSON.stringify(hg));
  }
  if (q.get("hairs")) {
    for (const h of data.hair) {
      lookPose(body);
      const r = new LookRenderer(body, 300, 360);
      r.avatar.setHair(h.name);
      r.syncBody(); await r.ready();
      r.setGarments([]);
      const fr = buildFrame(body, measurer, measurer.measure(body), r.avatar.posedBodyPositions);
      r.frame(fr.y.top - 0.36, fr.y.top + 0.03, 0, 0);
      show(r.render() as HTMLCanvasElement, h.name + " " + h.label);
    }
  }
  if (sl && al) {
    const t1 = performance.now();
    const fit = fitFace(body, shot, al, selfie, sl);
    const base = await new Promise<HTMLImageElement>((res) => { const im = new Image(); im.onload = () => res(im); im.src = "avatar/tex/skin_young_asian_female.jpg"; });
    const skin = composeSkin(body, base, selfie, fit, Number(q.get("strength") ?? 1));
    timing.compose = performance.now() - t1;
    const thumb = document.createElement("canvas"); thumb.width = thumb.height = 512;
    thumb.getContext("2d")!.drawImage(skin, 0, 0, 512, 512);
    show(thumb, "skin texture, gain " + fit.gain.map((x) => x.toFixed(2)).join("/"));
    lookPose(body);
    const r = new LookRenderer(body, 600, 960);
    r.avatar.setHair(q.get("hair") ?? "hair_long01");
    r.syncBody();
    await r.ready();
    const tex = new THREE.CanvasTexture(skin);
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.anisotropy = 8;
    r.avatar.skinMaterial.map = tex;
    r.avatar.skinMaterial.needsUpdate = true;
    r.avatar.group.traverse((o) => { if (o.name === "eyebrows" || o.name === "eyelashes") o.visible = false; });
    r.setGarments([]);
    const frame = buildFrame(body, measurer, measurer.measure(body), r.avatar.posedBodyPositions);
    r.frame(frame.y.top - 0.3, frame.y.top + 0.02, 0, 0);
    show(r.render() as HTMLCanvasElement, "result (head)");
    r.frame(-0.05, frame.y.top + 0.1);
    show(r.render() as HTMLCanvasElement, "result (full)");
  }
  document.getElementById("status")!.textContent = "face " + JSON.stringify(Object.fromEntries(Object.entries(timing).map(([k, v]) => [k, Math.round(v)])));
  (window as any).__labReady = true;
}

/** ?designs=1 : every UNIQLO basic and a few pattern samples drawn by the garment designer */
async function designLab(): Promise<void> {
  const { drawDesign } = await import("./look/designer");
  const { UNIQLO } = await import("./app/uniqlo");
  const grid = document.getElementById("grid")!;
  const add = (c: HTMLCanvasElement, cap: string) => {
    const fig = document.createElement("figure");
    c.style.width = "200px";
    fig.appendChild(c);
    fig.insertAdjacentHTML("beforeend", `<figcaption>${cap}</figcaption>`);
    grid.appendChild(fig);
  };
  for (const u of UNIQLO) add(drawDesign({ ...u, colors: [u.colors[0].hex], pattern: /羅紋/.test(u.name) ? "rib" : "solid", straps: /細肩帶/.test(u.name), length: u.type === "top" ? (u.sizes[2].m.length ?? 60) / 60 : (u.sizes[2].m.length ?? 115) / 110 }), u.name);
  const extra = [
    { type: "skirt", sleeve: "none", neckline: "crew", silhouette: "aline", colors: ["#b8a37a", "#5a2a1e", "#27402f"], pattern: "plaid" },
    { type: "pants", sleeve: "none", neckline: "crew", silhouette: "straight", colors: ["#3d5a80"], pattern: "denim" },
    { type: "dress", sleeve: "short", neckline: "v", silhouette: "aline", colors: ["#1e2a44", "#f1d3dd", "#e98fa5", "#b9d7ea"], pattern: "floral" },
    { type: "top", sleeve: "elbow", neckline: "boat", silhouette: "straight", colors: ["#fbfaf6", "#23395d"], pattern: "stripe" },
    { type: "skirt", sleeve: "none", neckline: "crew", silhouette: "fitted", colors: ["#2b2b2e"], pattern: "solid", length: 0.8 },
    { type: "pants", sleeve: "none", neckline: "crew", silhouette: "oversized", colors: ["#d8c3a3"], pattern: "solid" },
  ] as const;
  for (const e of extra) add(drawDesign({ ...e, colors: [...e.colors] } as any), `${e.type} ${e.silhouette} ${e.pattern}`);
  document.getElementById("status")!.textContent = "designs";
  (window as any).__labReady = true;
}

async function main() {
  if (q.get("designs")) return designLab();
  if (q.get("face")) return faceLab();
  if (q.get("exportface")) {
    const { makeTestSelfie } = await import("./face/testSelfie");
    const data = await loadAvatar();
    (window as any).__faceSample = (await makeTestSelfie(data, q.get("exportface") as any)).toDataURL("image/png");
    return;
  }
  if (q.get("debug") === "photo") return debugPhotos();
  if (q.get("export")) {
    const ids: SampleId[] = ["graphicTee", "stripeLong", "ribTank", "floralDress", "plaidSkirt", "denim"];
    (window as any).__samples = Object.fromEntries(ids.map((id) => [id, makeSample(id).toDataURL("image/png")]));
    return;
  }
  const data = await loadAvatar();
  const body = new Body(data);
  const measurer = new BodyMeasurer(data);
  const res = solveMeasurements(body, measurer, { height: 160, bust: 83, waist: 66, hips: 91 }, { weightKg: 52 });
  const m = res.measured;
  const stance = Number(q.get("stance") ?? 1);
  if (q.get("pose") === "bvh") body.setPose(buildPose(body, "stand", stance)); else lookPose(body, Number(q.get("curl") ?? 0.22), stance);
  const W = Number(q.get("size") ?? 600);
  const r = new LookRenderer(body, W, Math.round(W * 1.6));
  r.avatar.setSkin(q.get("skin") ?? "young_asian_female");
  r.avatar.setHair("hair_bob02");
  r.syncBody();
  await r.ready();
  const frame = buildFrame(body, measurer, m, r.avatar.posedBodyPositions);
  (window as any).__lab = { body, frame, m, r };

  const spec = (type: GarmentType, edit: (s: GarmentSpec) => void = () => {}) => { const s = defaultSpec(type, m); edit(s); return s; };
  const photo = (id: SampleId): Cutout => cutoutGarment(makeSample(id));
  const TYPE: Record<SampleId, GarmentType> = { gridTee: "top", graphicTee: "top", stripeLong: "top", ribTank: "top", floralDress: "dress", plaidSkirt: "skirt", denim: "pants" };
  const fromPhoto = (id: SampleId, edit: (s: GarmentSpec) => void = () => {}) => {
    const c = photo(id);
    const g = guessGarment(c);
    g.type = TYPE[id];
    const s = defaultSpec(g.type, m);
    if (g.type === "top" || g.type === "dress") s.sleeve = g.sleeve;
    if (s.sleeve === "long") s.m.sleeveLength = m.armLength;
    edit(s);
    (s as any).__cut = c;
    return s;
  };
  const outfits: { id: string; label: string; specs: GarmentSpec[]; colors: string[] }[] = [
    ...(await (async () => {
      const { UNIQLO } = await import("./app/uniqlo");
      const { wearUniqlo } = await import("./app/uniqloWear");
      const tee = UNIQLO.find((u) => u.id === "E424873-000")!;
      const xl = wearUniqlo(tee, 5, m, "XL").spec, s = wearUniqlo(tee, 0, m).spec;
      const jeans = spec("pants", (p) => { p.rise = "high"; p.color = "#3d5a80"; });
      return [
        { id: "uq-xl", label: "UNIQLO 圓領 T XL＋牛仔褲", specs: [xl, jeans], colors: [xl.color!, "#3d5a80"] },
        { id: "uq-s", label: "UNIQLO 圓領 T S＋牛仔褲", specs: [s, jeans], colors: [s.color!, "#3d5a80"] },
      ];
    })()),
    { id: "p-grid", label: "格線測試 T", specs: [fromPhoto("gridTee")], colors: ["#fff"] },
    { id: "p-tee", label: "印花 T＋牛仔褲（照片）", specs: [fromPhoto("graphicTee"), fromPhoto("denim")], colors: ["#fff", "#fff"] },
    { id: "p-stripe", label: "條紋長袖＋格紋裙（照片）", specs: [fromPhoto("stripeLong"), fromPhoto("plaidSkirt", (s) => { s.type = "skirt"; s.silhouette = "aline"; s.m.hem = (s.m.hip ?? 99) * 1.5; })], colors: ["#fff", "#fff"] },
    { id: "p-dress", label: "碎花洋裝（照片）", specs: [fromPhoto("floralDress", (s) => { s.type = "dress"; s.sleeve = "short"; s.m.sleeveLength = 9; })], colors: ["#fff"] },
    { id: "p-tank", label: "羅紋背心＋格紋裙（照片）", specs: [fromPhoto("ribTank", (s) => { s.silhouette = "fitted"; s.m.chest = m.bust + 3; s.m.waist = m.waist + 5; }), fromPhoto("plaidSkirt", (s) => { s.type = "skirt"; })], colors: ["#fff", "#fff"] },
    { id: "tee", label: "T 恤＋無", specs: [spec("top")], colors: ["#c85a5a"] },
    { id: "long", label: "長袖＋長褲", specs: [spec("top", (s) => { s.sleeve = "long"; s.m.sleeveLength = m.armLength; }), spec("pants")], colors: ["#3e5c4c", "#2f3d5c"] },
    { id: "tank-skirt", label: "背心＋A 字裙", specs: [spec("top", (s) => { s.sleeve = "none"; s.silhouette = "fitted"; s.m.chest = m.bust + 4; s.m.waist = m.waist + 6; }), spec("skirt", (s) => { s.m.hem = (s.m.hip ?? 99) * 1.6; })], colors: ["#f0ece0", "#2b4a7a"] },
    { id: "dress", label: "洋裝", specs: [spec("dress")], colors: ["#7a4d6e"] },
    { id: "oversize", label: "寬鬆 T", specs: [spec("top", (s) => { s.silhouette = "oversized"; s.m.chest! += 16; s.m.shoulder! += 6; s.m.waist! += 14; s.m.hem! += 10; })], colors: ["#d9c9a3"] },
  ];
  const styles = (q.get("style")?.split(",") ?? ["photo"]) as LookStyle[];
  const only = q.get("only")?.split(",");
  const grid = $("grid");
  const timing: Record<string, number> = {};
  for (const o of outfits) {
    if (only && !only.includes(o.id)) continue;
    const t0 = performance.now();
    const dressed: DressedGarment[] = [];
    let under = null;
    const order = [...o.specs.keys()].sort((a, b) => (o.specs[a].type === "top" ? 1 : 0) - (o.specs[b].type === "top" ? 1 : 0));
    for (const i of order) {
      const g = buildLookGarment(o.specs[i], frame, { over: under });
      if (o.specs[i].type !== "top") under = g;
      const cut: Cutout | undefined = (o.specs[i] as any).__cut;
      const textures = cut ? mapPhoto(g, cut, bleedImage(cut.canvas)) : g.pieces.map(() => ({ image: null, uv: null, color: o.colors[i] }));
      dressed.push({ garment: g, textures, layer: o.specs[i].type === "top" ? 2 : 1, heat: !!q.get("heat") });
    }
    timing[o.id] = performance.now() - t0;
    const onlyPieces = q.get("pieces")?.split(",");
    if (onlyPieces) for (const d of dressed) d.garment.pieces = d.garment.pieces.filter((p) => onlyPieces.includes(p.name));
    r.setGarments(dressed);
    if (q.get("wire")) r.debugWire();
    if (q.get("nobody")) r.avatar.group.visible = false;
    const zoom = q.get("zoom")?.split(",").map(Number);
    if (zoom) r.frame(zoom[0], zoom[1], zoom[2] ?? 0, 0); else r.frame(-0.04, frame.y.top + 0.06);
    for (const st of styles) {
      r.setStyle(st);
      const c = r.render();
      const img = document.createElement("img");
      img.src = c.toDataURL("image/png");
      const fig = document.createElement("figure");
      fig.innerHTML = `<figcaption>${o.label}・${st}</figcaption>`;
      fig.prepend(img);
      grid.appendChild(fig);
    }
  }
  $("status").textContent = "完成 " + JSON.stringify(Object.fromEntries(Object.entries(timing).map(([k, v]) => [k, Math.round(v)])));
  (window as any).__labReady = true;
}

main().catch((e) => { console.error(e); $("status").textContent = "錯誤：" + e.message; (window as any).__labReady = true; });
