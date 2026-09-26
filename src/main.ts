// Closet 試衣間 — app controller (vanilla TS; three.js for rendering).

import { Vector3 } from "three";
import { loadAvatar } from "./avatar/data";
import { Body, computeNormals } from "./avatar/body";
import { BodyMeasurer, MEASURE_LABELS, type Measurements } from "./avatar/measure";
import { solveMeasurements, type Targets } from "./avatar/solver";
import { buildPose, blendPoses, type PoseName } from "./avatar/poses";
import { AvatarView } from "./viewer/avatarView";
import { Stage } from "./viewer/scene";
import { GarmentView } from "./viewer/garmentView";
import { buildGarment } from "./garment/build";
import { buildAtlas, cutoutGarment, cutoutFromMask, guessGarment, loadImage, toCanvas, type AvatarMarks, type Cutout } from "./garment/photo";
import { analyzePersonGarments, marksFromLandmarks, type PersonGarment } from "./garment/personPhoto";
import { segmentPerson } from "./photo/segmenter";
import { defaultSpec, underwearSpecs, TYPE_LABELS, SLEEVE_LABELS, SILHOUETTE_LABELS, type GarmentSpec, type GarmentType } from "./garment/spec";
import { parseSizeChart, GARMENT_KEY_LABELS, type ParsedChart, type GarmentKey } from "./fit/sizeChart";
import { parseFabric, stretchLabel, DEFAULT_FABRIC, type Fabric } from "./fit/fabric";
import { evaluateFit, recommendSize, type FitResult } from "./fit/fit";
import { classifyBodyShape } from "./style/bodyShape";
import { buildAdvice, buildAIPrompt } from "./style/advice";
import { measureFromPhotos, detectPerson } from "./photo/bodyFromPhoto";
import { wardrobe, packGarment, unpackCutout, type SavedGarment } from "./app/wardrobe";

const $ = <T extends HTMLElement = HTMLElement>(id: string) => document.getElementById(id) as T;
const esc = (s: string) => s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]!));
const nextFrame = () => new Promise((r) => requestAnimationFrame(() => setTimeout(r, 0)));

// ------------------------------------------------------------------ profile (persisted)
interface Profile {
  targets: Targets;
  weight?: number;
  skin: string;
  skinTint: string;
  hair: string;
  hairColor: string;
}
const DEFAULT_PROFILE: Profile = {
  targets: { height: 160, bust: 83, waist: 66, hips: 91 },
  weight: 52, skin: "young_asian_female", skinTint: "#ffffff", hair: "hair_bob02", hairColor: "#3b2a20",
};
const store = {
  load(): Profile {
    try {
      const s = localStorage.getItem("closet2.profile");
      if (s) return { ...DEFAULT_PROFILE, ...JSON.parse(s) };
    } catch { /* storage unavailable */ }
    return structuredClone(DEFAULT_PROFILE);
  },
  save(p: Profile) {
    try { localStorage.setItem("closet2.profile", JSON.stringify(p)); } catch { /* ignore */ }
  },
};

// ------------------------------------------------------------------ worn garments
interface Worn {
  id: number;
  spec: GarmentSpec;
  cutout: Cutout | null;
  plainBack: boolean;
  view: GarmentView | null;
  chart: ParsedChart | null;
  fit: FitResult | null;
  underwear?: boolean;
  sizeText?: string;
  fabricText?: string;
}
let nextId = 1;

async function main() {
  const stage = new Stage($("viewport"));
  const data = await loadAvatar();
  $("loading").hidden = true;
  const body = new Body(data);
  const measurer = new BodyMeasurer(data);
  const avatar = new AvatarView(body);
  stage.turntable.add(avatar.group);

  const profile = store.load();
  let meas: Measurements = measurer.measure(body);
  let poseName: PoseName = "stand";
  let currentPose = buildPose(body, "stand");
  const worn: Worn[] = [];
  let underwear: Worn[] = [];
  let selected: Worn | null = null;
  let heatmap = false;
  let lastCutout: Cutout | null = null;

  const busy = async <T>(fn: () => T | Promise<T>): Promise<T> => {
    $("busy").hidden = false;
    await nextFrame();
    try { return await fn(); } finally { $("busy").hidden = true; }
  };

  // ------------------------------------------------------------ body
  const fillBodyForm = () => {
    for (const k of ["height", "bust", "underbust", "waist", "hips", "shoulder", "inseam", "armLength", "thigh"] as const) {
      const v = profile.targets[k];
      $<HTMLInputElement>("m-" + k).value = v !== undefined ? String(v) : "";
    }
    $<HTMLInputElement>("m-weight").value = profile.weight ? String(profile.weight) : "";
  };
  const readBodyForm = (): Targets => {
    const t: Targets = {};
    for (const k of ["height", "bust", "underbust", "waist", "hips", "shoulder", "inseam", "armLength", "thigh"] as const) {
      const v = parseFloat($<HTMLInputElement>("m-" + k).value);
      if (Number.isFinite(v) && v > 0) t[k] = v;
    }
    return t;
  };
  const renderMeasured = (residual?: Record<string, number | undefined>) => {
    const rows = (["height", "bust", "underbust", "waist", "hips", "shoulder", "armLength", "inseam", "thigh", "upperArm", "neck", "backLength"] as const)
      .map((k) => {
        const r = residual?.[k];
        const warn = r !== undefined && Math.abs(r) > 1.5 ? ` <span class="status s-偏緊" title="與目標差 ${r}cm">差 ${r > 0 ? "+" : ""}${r}</span>` : "";
        return `<tr><td>${MEASURE_LABELS[k]}</td><td data-k="${k}">${meas[k]} cm${warn}</td></tr>`;
      });
    $("measured-table").innerHTML = `<tr><th>假人實際量測</th><th></th></tr>${rows.join("")}`;
  };

  const applyBody = async (targets: Targets) => busy(() => {
    const t0 = performance.now();
    const res = solveMeasurements(body, measurer, targets, { weightKg: profile.weight });
    meas = res.measured;
    currentPose = buildPose(body, poseName === "half" ? "stand" : poseName);
    body.setPose(currentPose);
    avatar.update();
    rebuildAll();
    placeStage();
    renderMeasured(res.residual as any);
    const bad = Object.entries(res.residual).filter(([, v]) => Math.abs(v!) > 1.5);
    $("solve-status").textContent = bad.length
      ? `已套用（${Math.round(performance.now() - t0)}ms）。${bad.map(([k]) => MEASURE_LABELS[k]).join("、")} 超出模型可調範圍，已盡量接近。`
      : `已套用（${Math.round(performance.now() - t0)}ms），誤差都在 1.5cm 內。`;
    renderStyle();
    refreshFit();
  });

  // ------------------------------------------------------------ pose & stage
  const placeStage = () => {
    const pos = avatar.posedBodyPositions;
    let maxY = 0;
    for (let i = 1; i < pos.length; i += 3) maxY = Math.max(maxY, pos[i]);
    if (poseName === "sit") {
      // seat = lowest point of the buttocks (torso vertices below the hip line)
      let seat = Infinity, sx = 0, sz = 0, n = 0;
      const hipLimit = meas.hipY / 100 + 0.1;
      for (let i = 0; i < data.bodyVertexCount; i++) {
        if (measurer.regions[i] !== 0) continue;
        const y = pos[i * 3 + 1];
        if (body.rest[i * 3 + 1] - body.rest[1] > hipLimit) continue;
        if (y < seat) seat = y;
        sx += pos[i * 3]; sz += pos[i * 3 + 2]; n++;
      }
      const seatY = Math.max(0.2, seat - 0.005);
      seatInfo = { x: sx / n, z: sz / n - 0.04, r: 0.2, y: seatY };
      stage.setFigure(maxY, seatY, new Vector3(seatInfo.x, 0, seatInfo.z));
    } else {
      seatInfo = null;
      stage.setFigure(maxY, null);
    }
    // let skirts settle once the pose is reached (sitting / non-standing poses)
    if (poseName === "sit") for (const w of [...worn].sort((a, b) => layerOf(a) - layerOf(b))) w.view?.update(true, seatInfo);
    stage.setFraming(poseName === "half" ? "half" : "full");
  };

  let seatInfo: { x: number; z: number; r: number; y: number } | null = null;
  let poseAnim: { from: typeof currentPose; to: typeof currentPose; t: number } | null = null;
  const setPose = (p: PoseName) => {
    poseName = p;
    document.querySelectorAll<HTMLButtonElement>("#pose-group button").forEach((b) => b.classList.toggle("on", b.dataset.pose === p));
    const target = buildPose(body, p === "half" ? "stand" : p);
    body.setPose(currentPose);
    poseAnim = { from: currentPose, to: target, t: 0 };
    if (p === "half") stage.setFraming("half");
  };
  stage.onFrame = (dt) => {
    if (!poseAnim) return;
    poseAnim.t = Math.min(1, poseAnim.t + dt / 0.7);
    const k = poseAnim.t * poseAnim.t * (3 - 2 * poseAnim.t);
    const p = blendPoses(poseAnim.from, poseAnim.to, k);
    body.setPose(p);
    avatar.update();
    for (const w of [...underwear, ...[...worn].sort((a, b) => layerOf(a) - layerOf(b))]) w.view?.update();
    if (poseAnim.t >= 1) {
      currentPose = poseAnim.to;
      poseAnim = null;
      placeStage();
    }
  };
  document.querySelectorAll<HTMLButtonElement>("#pose-group button").forEach((b) =>
    b.addEventListener("click", () => setPose(b.dataset.pose as PoseName)));
  $<HTMLInputElement>("autorotate").addEventListener("change", (e) => stage.setAutoRotate((e.target as HTMLInputElement).checked));

  // ------------------------------------------------------------ garments
  const layerOf = (w: Worn) => (w.underwear ? 0 : w.spec.type === "top" ? 2 : 1);
  // avatar landmarks (rest coordinates) for warping photos of people onto garments
  const avatarMarks = (): AvatarMarks => {
    const j = (n: string) => body.joint(n);
    const names = ["upperarm01.L____head", "upperleg01.L____head", "lowerleg01.L____head", "foot.L____head"];
    return { y: names.map((n) => j(n).y) as any, half: names.map((n) => Math.abs(j(n).x)) as any };
  };
  /** landmark chain position (0 shoulder .. 3 ankle) -> cm from the floor on the avatar */
  const chainCm = (t: number) => {
    let minY = Infinity;
    for (let i = 1; i < data.bodyVertexCount * 3; i += 3) minY = Math.min(minY, body.rest[i]);
    const ys = avatarMarks().y.map((y) => (y - minY) * 100);
    const tt = Math.max(0, Math.min(3, t)), i = Math.min(2, Math.floor(tt));
    const base = ys[i] + (ys[i + 1] - ys[i]) * (tt - i);
    return t > 3 ? ys[3] - (t - 3) * (ys[2] - ys[3]) : base;
  };
  const underOf = (w: Worn) => (w.underwear || w.spec.type !== "top" ? [] : worn.filter((o) => o !== w && (o.spec.type === "skirt" || o.spec.type === "pants") && o.view));
  const buildView = (w: Worn) => {
    w.view?.dispose();
    const saved = body.pose;
    const under = underOf(w).map((o) => {
      const gm = o.view!.data;
      return { pos: gm.rest, normals: computeNormals(gm.rest, gm.index, gm.vertexCount), count: gm.vertexCount };
    });
    const gm = buildGarment(w.spec, { body, measurer, m: meas, layer: layerOf(w), under });
    body.setPose(saved);
    const atlas = buildAtlas(w.cutout, { bbox: gm.bbox, torsoHalfWidth: gm.torsoHalfWidth, plainBack: w.plainBack, avatarMarks: avatarMarks() }, w.spec.color ?? "#7a93b8");
    w.view = new GarmentView(avatar, w.spec, gm, atlas);
    w.view.under = underOf(w).map((o) => o.view!);
    w.view.update();
    w.view.setHeatmap(heatmap && !w.underwear);
  };
  const rebuildAll = () => {
    if ($<HTMLInputElement>("underwear").checked) setUnderwear(true);
    for (const w of [...worn].sort((a, b) => layerOf(a) - layerOf(b))) buildView(w);
  };
  const setUnderwear = (on: boolean) => {
    for (const u of underwear) u.view?.dispose();
    underwear = [];
    if (!on) return;
    underwear = underwearSpecs(meas)
      .map((spec) => ({ id: nextId++, spec, cutout: null, plainBack: true, view: null, chart: null, fit: null, underwear: true }));
    for (const u of underwear) buildView(u);
  };
  $<HTMLInputElement>("underwear").addEventListener("change", (e) => busy(() => setUnderwear((e.target as HTMLInputElement).checked)));
  $<HTMLInputElement>("heatmap").addEventListener("change", (e) => {
    heatmap = (e.target as HTMLInputElement).checked;
    $("legend").hidden = !heatmap;
    for (const w of worn) w.view?.setHeatmap(heatmap);
  });

  const slotOf = (t: GarmentType) => (t === "top" ? "upper" : t === "dress" ? "full" : "lower");
  const wear = (spec: GarmentSpec, cutout: Cutout | null, plainBack: boolean) => busy(() => {
    const slot = slotOf(spec.type);
    // replace garments occupying the same body area
    for (let i = worn.length - 1; i >= 0; i--) {
      const s = slotOf(worn[i].spec.type);
      if (s === slot || slot === "full" || s === "full") { worn[i].view?.dispose(); worn.splice(i, 1); }
    }
    const w: Worn = { id: nextId++, spec, cutout, plainBack, view: null, chart: null, fit: null };
    worn.push(w);
    buildView(w);
    if (spec.type === "skirt" || spec.type === "pants") for (const t of worn.filter((o) => o.spec.type === "top")) buildView(t);
    selected = w;
    renderWorn();
    renderSizeTargets();
    renderStyle();
    return w;
  });

  const readGarmentForm = (): GarmentSpec => {
    const type = $<HTMLSelectElement>("g-type").value as GarmentType;
    const spec = defaultSpec(type, meas);
    spec.silhouette = $<HTMLSelectElement>("g-silhouette").value as any;
    spec.sleeve = type === "skirt" || type === "pants" ? "none" : ($<HTMLSelectElement>("g-sleeve").value as any);
    spec.neckline = $<HTMLSelectElement>("g-neck").value as any;
    spec.rise = $<HTMLSelectElement>("g-rise").value as any;
    spec.color = $<HTMLInputElement>("g-color").value;
    if (spec.silhouette === "oversized" && spec.m.chest) { spec.m.chest += 16; spec.m.shoulder = (spec.m.shoulder ?? meas.shoulder) + 6; }
    if (spec.silhouette === "fitted" && spec.m.chest) { spec.m.chest = meas.bust + 4; spec.m.waist = meas.waist + 5; }
    if (spec.silhouette === "aline" && spec.m.hem) spec.m.hem = Math.max(spec.m.hem, (spec.m.hip ?? meas.hips) * 1.45);
    if (spec.silhouette === "straight" && (type === "skirt" || type === "dress")) spec.m.hem = (spec.m.hip ?? meas.hips + 8) * 1.02;
    if (spec.silhouette === "fitted" && type === "skirt") { spec.m.hip = meas.hips + 4; spec.m.hem = meas.hips - 2; }
    if (spec.sleeve === "long") spec.m.sleeveLength = meas.armLength;
    if (spec.sleeve === "elbow") spec.m.sleeveLength = meas.armLength * 0.55;
    return spec;
  };

  let personGarments: PersonGarment[] = [];
  let pendingHemT: number | null = null;
  const showPreview = (c: Cutout) => {
    const prev = $<HTMLCanvasElement>("cutout-preview");
    prev.width = c.width; prev.height = c.height;
    prev.getContext("2d")!.drawImage(c.canvas, 0, 0);
    $("cutout-wrap").hidden = false;
  };
  const selectPersonGarment = (i: number, canvas: HTMLCanvasElement, marks: ReturnType<typeof marksFromLandmarks>) => {
    const g = personGarments[i];
    lastCutout = cutoutFromMask(canvas, g.mask, g.color, marks);
    pendingHemT = g.hemT;
    showPreview(lastCutout);
    $<HTMLSelectElement>("g-type").value = g.type;
    $<HTMLSelectElement>("g-silhouette").value = g.silhouette;
    if (g.type === "top" || g.type === "dress") $<HTMLSelectElement>("g-sleeve").value = g.sleeve;
    $<HTMLInputElement>("g-color").value = "#" + g.color.map((v) => Math.round(v).toString(16).padStart(2, "0")).join("");
    $("guess-text").textContent = `從人像照偵測到「${TYPE_LABELS[g.type]}」${g.type === "top" || g.type === "dress" ? "・" + SLEEVE_LABELS[g.sleeve] : ""}（${g.reason}）。`;
    document.querySelectorAll<HTMLButtonElement>("#person-garments button").forEach((b, k) => b.classList.toggle("on", k === i));
  };
  /** Try the "photo of a person wearing it" route; returns false for flat-lay / product photos. */
  const tryPersonPhoto = async (img: HTMLImageElement): Promise<boolean> => {
    const det = await detectPerson(img).catch(() => null);
    const lm = det?.landmarks;
    if (!lm) return false;
    const vis = [11, 12, 23, 24].every((k) => (lm[k].visibility ?? 1) > 0.5);
    if (!vis) return false;
    const canvas = toCanvas(img);
    const k = canvas.width / img.naturalWidth;
    const marks = marksFromLandmarks(lm.map((p) => ({ x: p.x * k, y: p.y * k })));
    const labels = await segmentPerson(canvas);
    const rgb = canvas.getContext("2d", { willReadFrequently: true })!.getImageData(0, 0, canvas.width, canvas.height).data;
    personGarments = analyzePersonGarments(labels, rgb, canvas.width, canvas.height, marks);
    if (!personGarments.length) return false;
    const box = $("person-garments");
    box.innerHTML = "";
    personGarments.forEach((g, i) => {
      const b = document.createElement("button");
      b.textContent = `${TYPE_LABELS[g.type]}${g.type === "top" || g.type === "dress" ? "・" + SLEEVE_LABELS[g.sleeve] : ""}`;
      b.dataset.type = g.type;
      b.onclick = () => selectPersonGarment(i, canvas, marks);
      box.appendChild(b);
    });
    selectPersonGarment(0, canvas, marks);
    return true;
  };

  $<HTMLInputElement>("garment-photo").addEventListener("change", async (e) => {
    const f = (e.target as HTMLInputElement).files?.[0];
    if (!f) return;
    await busy(async () => {
      const img = await loadImage(f);
      $("person-garments").innerHTML = "";
      $("cutout-wrap").hidden = false;
      $("guess-text").textContent = "分析照片中…（第一次需要載入人體偵測模型）";
      pendingHemT = null;
      if (await tryPersonPhoto(img)) return;
      const c = cutoutGarment(img);
      lastCutout = c;
      showPreview(c);
      const g = guessGarment(c);
      $<HTMLSelectElement>("g-type").value = g.type;
      if (g.type === "top" || g.type === "dress") $<HTMLSelectElement>("g-sleeve").value = g.sleeve;
      $<HTMLInputElement>("g-color").value = "#" + c.color.map((v) => Math.round(v).toString(16).padStart(2, "0")).join("");
      $("guess-text").textContent = `判斷為「${TYPE_LABELS[g.type]}」${g.type === "top" || g.type === "dress" ? "・" + SLEEVE_LABELS[g.sleeve] : ""}（${g.reason}），不對可以在下方修改。`;
    });
  });
  $("wear").addEventListener("click", () => {
    if (!lastCutout) { $("guess-text").textContent = "請先選擇衣服照片，或按「用純色試穿」。"; $("cutout-wrap").hidden = false; return; }
    const spec = readGarmentForm();
    if (lastCutout.person && pendingHemT !== null) {
      // garment length read off the photo, transferred through the body landmarks
      const hemCm = chainCm(pendingHemT);
      const top = spec.type === "skirt" || spec.type === "pants"
        ? meas.waistY + (spec.rise === "high" ? 3 : spec.rise === "low" ? -6 : 0)
        : meas.neckY;
      spec.m.length = Math.max(spec.type === "top" ? 30 : 25, Math.round(top - hemCm));
      if (spec.type === "pants") spec.m.inseam = Math.max(20, Math.round(meas.crotchY - hemCm));
    }
    wear(spec, lastCutout, $<HTMLInputElement>("g-plainback").checked);
  });
  $("wear-plain").addEventListener("click", () => wear(readGarmentForm(), null, true));

  const renderWorn = () => {
    const ul = $("worn-list");
    ul.innerHTML = "";
    if (!worn.length) { ul.innerHTML = `<li class="hint">還沒有穿衣服</li>`; return; }
    for (const w of worn) {
      const li = document.createElement("li");
      li.classList.toggle("sel", w === selected);
      const thumb = w.cutout ? w.cutout.canvas.cloneNode() as HTMLCanvasElement : document.createElement("div");
      if (w.cutout) (thumb as HTMLCanvasElement).getContext("2d")!.drawImage(w.cutout.canvas, 0, 0);
      else { thumb.className = "swatch"; thumb.style.background = w.spec.color ?? "#999"; }
      li.appendChild(thumb);
      const label = document.createElement("span");
      label.textContent = `${SILHOUETTE_LABELS[w.spec.silhouette]}${TYPE_LABELS[w.spec.type]}${w.spec.size ? `（${w.spec.size}）` : ""}・${w.spec.fabric.label}`;
      li.appendChild(label);
      const sel = document.createElement("button");
      sel.textContent = "選取";
      sel.onclick = () => { selected = w; renderWorn(); renderSizeTargets(); };
      const save = document.createElement("button");
      save.textContent = "收進衣櫃";
      save.onclick = async () => {
        const name = label.textContent ?? TYPE_LABELS[w.spec.type];
        await wardrobe.put(await packGarment(w.spec, w.cutout, w.plainBack, { name, sizeText: w.sizeText, fabricText: w.fabricText }));
        save.textContent = "已收藏";
        save.disabled = true;
        renderWardrobe();
      };
      li.append(save);
      const del = document.createElement("button");
      del.textContent = "脫下";
      del.onclick = () => { w.view?.dispose(); worn.splice(worn.indexOf(w), 1); if (selected === w) selected = worn[0] ?? null; renderWorn(); renderSizeTargets(); renderStyle(); };
      li.append(sel, del);
      ul.appendChild(li);
    }
  };

  const renderWardrobe = async () => {
    const ul = $("wardrobe-list");
    let items: SavedGarment[] = [];
    try { items = await wardrobe.list(); } catch { ul.innerHTML = `<li class="hint">這個瀏覽器無法使用衣櫃（IndexedDB 被停用）</li>`; return; }
    ul.innerHTML = items.length ? "" : `<li class="hint">還沒有收藏的衣服</li>`;
    for (const g of items) {
      const li = document.createElement("li");
      const img = document.createElement("img");
      img.src = URL.createObjectURL(g.thumb);
      img.className = "swatch";
      const label = document.createElement("span");
      label.textContent = g.name;
      const wearBtn = document.createElement("button");
      wearBtn.textContent = "穿上";
      wearBtn.onclick = async () => {
        const cutout = await unpackCutout(g);
        const w = await wear(structuredClone(g.spec), cutout, g.plainBack);
        if (g.sizeText) {
          w.sizeText = g.sizeText; w.fabricText = g.fabricText;
          w.chart = parseSizeChart(g.sizeText);
          const row = w.chart.rows.find((r) => r.size === w.spec.size);
          if (row) w.fit = evaluateFit(row, meas, w.spec.type, w.spec.fabric, w.spec.sleeve);
          renderStyle();
        }
      };
      const del = document.createElement("button");
      del.textContent = "刪除";
      del.onclick = async () => { await wardrobe.remove(g.id); renderWardrobe(); };
      li.append(img, label, wearBtn, del);
      ul.appendChild(li);
    }
  };

  // ------------------------------------------------------------ size chart & fit
  const renderSizeTargets = () => {
    const sel = $<HTMLSelectElement>("size-target");
    sel.innerHTML = worn.map((w) => `<option value="${w.id}" ${w === selected ? "selected" : ""}>身上的${TYPE_LABELS[w.spec.type]}</option>`).join("")
      + (["top", "dress", "skirt", "pants"] as GarmentType[]).map((t) => `<option value="new-${t}">新的${TYPE_LABELS[t]}（純色）</option>`).join("");
  };
  let chart: ParsedChart | null = null;
  let fabric: Fabric = DEFAULT_FABRIC;
  let chartTarget: Worn | null = null;

  $("parse-size").addEventListener("click", async () => {
    chart = parseSizeChart($<HTMLTextAreaElement>("size-text").value);
    const ft = $<HTMLTextAreaElement>("fabric-text").value.trim();
    fabric = ft ? parseFabric(ft) : DEFAULT_FABRIC;
    $("size-warnings").textContent = chart.warnings.join(" ");
    $("fabric-info").innerHTML = `<div class="card"><b>材質：</b>${esc(fabric.label)}・${stretchLabel(fabric)}（可延展約 ${Math.round(fabric.stretch * 100)}%）・垂墜度 ${Math.round(fabric.drape * 100)}%</div>`;
    const tv = $<HTMLSelectElement>("size-target").value;
    if (tv.startsWith("new-")) {
      const spec = defaultSpec(tv.slice(4) as GarmentType, meas);
      spec.color = $<HTMLInputElement>("g-color").value;
      chartTarget = await wear(spec, null, true);
    } else {
      chartTarget = worn.find((w) => String(w.id) === tv) ?? selected;
    }
    if (!chartTarget || !chart.rows.length) { $("size-buttons").innerHTML = ""; $("fit-table").innerHTML = ""; $("recommend").innerHTML = ""; return; }
    chartTarget.chart = chart;
    chartTarget.sizeText = $<HTMLTextAreaElement>("size-text").value;
    chartTarget.fabricText = $<HTMLTextAreaElement>("fabric-text").value;
    const rec = recommendSize(chart.rows, meas, chartTarget.spec.type, fabric, chartTarget.spec.sleeve)!;
    const box = $("size-buttons");
    box.innerHTML = "";
    for (const r of chart.rows) {
      const b = document.createElement("button");
      b.textContent = r.size;
      b.dataset.size = r.size;
      if (r.size === rec.best.size) b.classList.add("best");
      b.onclick = () => selectSize(r.size);
      box.appendChild(b);
    }
    $("recommend").innerHTML = `<div class="card" id="recommend-card"><h3>推薦尺碼：${esc(rec.best.size)}</h3>${esc(rec.best.summary)}<br><span class="hint">${rec.all.map((f) => `${f.size}：${f.verdict}`).join("　")}</span></div>`;
    await selectSize(rec.best.size);
  });

  const selectSize = (size: string) => busy(() => {
    if (!chart || !chartTarget) return;
    const row = chart.rows.find((r) => r.size === size)!;
    document.querySelectorAll<HTMLButtonElement>("#size-buttons button").forEach((b) => b.classList.toggle("on", b.dataset.size === size));
    const w = chartTarget;
    const base = defaultSpec(w.spec.type, meas);
    w.spec = { ...w.spec, fabric, size, m: { ...base.m, ...w.spec.m, ...row.values } };
    // lengths not in the chart keep the silhouette defaults; girths from the chart win
    buildView(w);
    w.fit = evaluateFit(row, meas, w.spec.type, fabric, w.spec.sleeve);
    renderFit(w.fit);
    renderWorn();
    renderStyle();
  });

  const renderFit = (f: FitResult) => {
    $("fit-table").innerHTML = `<tr><th>部位</th><th>衣服</th><th>身體</th><th>判斷</th></tr>` + f.regions.map((r) =>
      `<tr data-key="${r.key}"><td>${esc(r.label)}</td><td>${r.garment}</td><td>${r.body || "—"}</td><td><span class="status s-${r.status}">${r.status}</span><br><span class="hint">${esc(r.note)}</span></td></tr>`).join("")
      + `<tr><td colspan="4"><b>${esc(f.size)}：${esc(f.verdict)}</b>　${esc(f.summary)}</td></tr>`;
  };
  const refreshFit = () => {
    for (const w of worn) {
      if (!w.chart || !w.spec.size) continue;
      const row = w.chart.rows.find((r) => r.size === w.spec.size);
      if (row) w.fit = evaluateFit(row, meas, w.spec.type, w.spec.fabric, w.spec.sleeve);
      if (w === chartTarget && w.fit) renderFit(w.fit);
    }
  };

  // ------------------------------------------------------------ style advice
  const renderStyle = () => {
    const shape = classifyBodyShape({ bust: meas.bust, waist: meas.waist, hips: meas.hips, shoulder: meas.shoulder, height: meas.height, inseam: meas.inseam });
    const g = selected ?? worn[0] ?? null;
    const a = buildAdvice(shape, g?.spec, g?.fit);
    const li = (xs: string[]) => `<ul>${xs.map((x) => `<li>${esc(x)}</li>`).join("")}</ul>`;
    $("advice").innerHTML = `
      <div class="card" id="shape-card"><h3>${esc(a.headline)}</h3><div class="hint">${esc(shape.reasons.join("；"))}</div><p>${esc(a.goal)}</p></div>
      <div class="card"><h3>推薦單品</h3>${li(a.recommend)}</div>
      <div class="card"><h3>適合的領口</h3>${li(a.necklines)}</div>
      <div class="card"><h3>盡量避免</h3>${li(a.avoid)}</div>
      <div class="card"><h3>比例小技巧</h3>${li(a.tips)}</div>
      ${a.garmentComments.length ? `<div class="card" id="garment-advice"><h3>這件衣服</h3>${li(a.garmentComments)}</div>` : ""}`;
    return { shape, garment: g };
  };
  const currentPrompt = () => {
    const { shape, garment } = renderStyle();
    return buildAIPrompt(meas as any, shape, garment?.spec, garment?.fit, $<HTMLTextAreaElement>("ai-question").value);
  };
  $("ai-copy").addEventListener("click", async () => {
    const p = currentPrompt();
    try { await navigator.clipboard.writeText(p); $("ai-status").textContent = "已複製提示詞，可以貼到 claude.ai。"; }
    catch { $("ai-answer").textContent = p; $("ai-status").textContent = "無法存取剪貼簿，提示詞顯示在下方，請手動複製。"; }
  });
  $("ai-ask").addEventListener("click", async () => {
    const btn = $<HTMLButtonElement>("ai-ask");
    btn.disabled = true;
    $("ai-status").textContent = "AI 思考中（通常 10–60 秒）…";
    try {
      const r = await fetch("/api/ask", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ prompt: currentPrompt() }) });
      const j = await r.json().catch(() => ({ error: `HTTP ${r.status}` }));
      if (!r.ok) throw new Error(j.error || `HTTP ${r.status}`);
      $("ai-answer").textContent = j.text;
      $("ai-status").textContent = "完成。";
    } catch (e: any) {
      $("ai-status").textContent = `無法連到 AI 中繼（${e.message}）。請在終端機執行 npm run bridge，或改用「複製提示詞」。`;
    } finally { btn.disabled = false; }
  });

  // ------------------------------------------------------------ appearance
  $<HTMLSelectElement>("skin").innerHTML = data.skins.map((s) => `<option value="${s.name}">${s.label}</option>`).join("");
  $<HTMLSelectElement>("hair").innerHTML = `<option value="">無</option>` + data.hair.map((h) => `<option value="${h.name}">${h.label}</option>`).join("");
  const applyLook = () => {
    avatar.setSkin(profile.skin, profile.skinTint);
    avatar.setHair(profile.hair || null);
    avatar.setHairColor(profile.hairColor);
    $<HTMLSelectElement>("skin").value = profile.skin;
    $<HTMLInputElement>("skin-tint").value = profile.skinTint;
    $<HTMLSelectElement>("hair").value = profile.hair;
    $<HTMLInputElement>("hair-color").value = profile.hairColor;
  };
  for (const [id, key] of [["skin", "skin"], ["skin-tint", "skinTint"], ["hair", "hair"], ["hair-color", "hairColor"]] as const) {
    $(id).addEventListener("input", (e) => { (profile as any)[key] = (e.target as HTMLInputElement).value; store.save(profile); applyLook(); });
  }

  // ------------------------------------------------------------ photo measuring
  $("photo-measure").addEventListener("click", async () => {
    const front = $<HTMLInputElement>("photo-front").files?.[0];
    const side = $<HTMLInputElement>("photo-side").files?.[0];
    const h = parseFloat($<HTMLInputElement>("m-height").value);
    if (!front) { $("photo-status").textContent = "請先選擇正面照。"; return; }
    if (!(h > 100)) { $("photo-status").textContent = "請先填寫身高（用來換算比例）。"; return; }
    $("photo-status").textContent = "分析照片中（第一次需要載入模型）…";
    try {
      const r = await measureFromPhotos(await loadImage(front), h, side ? await loadImage(side) : null);
      for (const k of ["bust", "waist", "hips", "shoulder", "inseam", "armLength"] as const) $<HTMLInputElement>("m-" + k).value = String(r[k]);
      $("photo-status").textContent = `估算完成：胸 ${r.bust}、腰 ${r.waist}、臀 ${r.hips}、肩 ${r.shoulder}、跨下 ${r.inseam}。${r.notes.join(" ")} 確認數字後按「套用到假人」。`;
    } catch (e: any) {
      $("photo-status").textContent = "量身失敗：" + e.message;
    }
  });

  // ------------------------------------------------------------ tabs
  document.querySelectorAll<HTMLButtonElement>("#tabs button").forEach((b) => b.addEventListener("click", () => {
    document.querySelectorAll<HTMLButtonElement>("#tabs button").forEach((x) => x.classList.toggle("on", x === b));
    document.querySelectorAll<HTMLElement>(".tab").forEach((t) => (t.hidden = t.id !== "tab-" + b.dataset.tab));
    if (b.dataset.tab === "style") renderStyle();
  }));
  $("apply-body").addEventListener("click", () => {
    profile.targets = readBodyForm();
    const w = parseFloat($<HTMLInputElement>("m-weight").value);
    profile.weight = Number.isFinite(w) && w > 0 ? w : undefined;
    store.save(profile);
    applyBody(profile.targets);
  });

  // ------------------------------------------------------------ start
  fillBodyForm();
  applyLook();
  renderWorn();
  renderWardrobe();
  renderSizeTargets();
  await applyBody(profile.targets);

  // test / debugging hook
  (window as any).__closet = {
    body, measurer, avatar, stage, data, worn,
    get measurements() { return meas; },
    get pose() { return poseName; },
    get poseSettled() { return poseAnim === null; },
    garmentKeys: GARMENT_KEY_LABELS as Record<GarmentKey, string>,
    setPose, setUnderwear, measureFromPhotos, loadImage,
  };
  (window as any).__ready = true;
}

main().catch((e) => {
  console.error(e);
  const l = document.getElementById("loading");
  if (l) { l.hidden = false; l.textContent = "載入失敗：" + e.message; }
});
