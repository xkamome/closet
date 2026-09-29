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
import { buildAtlas, cutoutGarment, cutoutFromMask, guessGarment, loadImage, looksLikePerson, toCanvas, type AvatarMarks, type Cutout } from "./garment/photo";
import { analyzePersonGarments, marksFromLandmarks, type PersonGarment } from "./garment/personPhoto";
import { segmentPerson, preloadSegmenter } from "./photo/segmenter";
import { defaultSpec, riseOffset, specFor, tuckedSpec, underwearSpecs, TYPE_LABELS, SLEEVE_LABELS, SILHOUETTE_LABELS, type GarmentSpec, type GarmentType } from "./garment/spec";
import { parseSizeChart, GARMENT_KEY_LABELS, type ParsedChart, type GarmentKey } from "./fit/sizeChart";
import { parseFabric, stretchLabel, DEFAULT_FABRIC, type Fabric } from "./fit/fabric";
import { evaluateFit, recommendSize, type FitResult } from "./fit/fit";
import { classifyBodyShape } from "./style/bodyShape";
import { buildAdvice, buildAIPrompt } from "./style/advice";
import { measureFromPhotos, detectPerson, preloadPoseModel } from "./photo/bodyFromPhoto";
import { wardrobe, packGarment, unpackCutout, type SavedGarment } from "./app/wardrobe";
import { seedDefaults } from "./app/defaults";
import { avatars, exportAvatar, parseAvatarFile, type AvatarSnapshot } from "./app/avatars";
import { buildGenPrompt, packGenerated, parseGenItems, readKeywordList, wearGenerated } from "./app/generate";
import { OUTFITS, colorIndex, seedUniqlo, sizeNote, uniqloItem, wearUniqlo } from "./app/uniqloWear";
import { LookMode } from "./look/lookMode";
import { MyFace, analyzeSelfie, type Selfie } from "./face/myFace";
import type { LookStyle } from "./look/render";

const $ = <T extends HTMLElement = HTMLElement>(id: string) => document.getElementById(id) as T;
const esc = (s: string) => s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]!));
const nextFrame = () => new Promise((r) => requestAnimationFrame(() => setTimeout(r, 0)));

// ------------------------------------------------------------------ profile (persisted)
interface Profile {
  targets: Targets;
  /** extra MakeHuman morphs on top of the measurement solve (-1..1) */
  extra?: Record<string, number>;
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
  /** UNIQLO basic: product id, colour index, the size recommended for this body */
  uniqlo?: { id: string; color: number; recommended: string };
  /** generated from a description: sized like a UNIQLO basic */
  generated?: { design: import("./app/generate").GenItem; base: string; recommended: string };
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

  const look = new LookMode($("stage"), body, measurer);
  let lookStyle: "3d" | LookStyle = "3d";
  try { lookStyle = localStorage.getItem("closet2.look") === "photo" ? "photo" : "3d"; } catch { /* storage unavailable */ }
  let lookTimer = 0;
  /** redraw the look image (debounced; the 3D view keeps running underneath) */
  const refreshLook = () => {
    clearTimeout(lookTimer);
    lookTimer = window.setTimeout(async () => {
      $("look-save").hidden = lookStyle === "3d";
      $("look-note").hidden = lookStyle === "3d" || poseName !== "sit";
      if (lookStyle === "3d") { look.hide(); return; }
      $("busy").hidden = false;
      try {
        await look.show(lookStyle, meas, worn.map((w) => ({ spec: effectiveSpec(w), cutout: w.cutout, layer: layerOf(w) })),
          { underwear: $<HTMLInputElement>("underwear").checked, half: poseName === "half", heat: heatmap, stance });
      } catch (e) { console.error(e); }
      $("busy").hidden = true;
    }, 30);
  };

  const profile = store.load();
  let meas: Measurements = measurer.measure(body);
  let poseName: PoseName = "stand";
  let stance = 1;
  try { const v = parseFloat(localStorage.getItem("closet2.stance") ?? ""); if (v >= 0 && v <= 1) stance = v; } catch { /* storage unavailable */ }
  let currentPose = buildPose(body, "stand", stance);
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
    const res = solveMeasurements(body, measurer, targets, { weightKg: profile.weight, extra: profile.extra });
    meas = res.measured;
    currentPose = buildPose(body, poseName === "half" ? "stand" : poseName, stance);
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
    if (selfie) refreshFace(); else refreshLook();
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
    for (const w of [...worn].sort((a, b) => layerOf(a) - layerOf(b))) w.view?.update(true, seatInfo);
    stage.setFraming(poseName === "half" ? "half" : "full");
  };

  let seatInfo: { x: number; z: number; r: number; y: number } | null = null;
  let poseAnim: { from: typeof currentPose; to: typeof currentPose; t: number } | null = null;
  const setPose = (p: PoseName) => {
    poseName = p;
    document.querySelectorAll<HTMLButtonElement>("#pose-group button").forEach((b) => b.classList.toggle("on", b.dataset.pose === p));
    const target = buildPose(body, p === "half" ? "stand" : p, stance);
    body.setPose(currentPose);
    poseAnim = { from: currentPose, to: target, t: 0 };
    if (p === "half") stage.setFraming("half");
    refreshLook();
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
  $<HTMLInputElement>("quality").addEventListener("change", (e) => { stage.quality = (e.target as HTMLInputElement).checked; });
  stage.onQualityDrop = () => { $<HTMLInputElement>("quality").checked = false; };

  // ------------------------------------------------------------ garments
  const bottomOf = () => worn.find((o) => o.spec.type === "skirt" || o.spec.type === "pants") ?? null;
  const isTucked = (w: Worn) => w.spec.type === "top" && !!w.spec.tucked && !!bottomOf();
  /** 0 underwear, then inner to outer: a tucked top goes under the skirt / trousers */
  const layerOf = (w: Worn) => {
    if (w.underwear) return 0;
    const tucked = worn.some(isTucked);
    if (w.spec.type === "top") return tucked ? 1 : 2;
    return tucked ? 2 : 1;
  };
  /** the spec actually built (a tucked top is shortened to end inside the waistband) */
  const effectiveSpec = (w: Worn): GarmentSpec => (isTucked(w) ? tuckedSpec(w.spec, bottomOf()!.spec, meas) : w.spec);
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
  // garments a given garment must stay outside of: underwear for everything, bottoms for a top
  const underOf = (w: Worn) => {
    if (w.underwear) return [];
    const list = underwear.filter((u) => u.view);
    // everything on a lower layer is underneath (bottoms under an untucked top, a tucked top under the bottoms)
    list.push(...worn.filter((o) => o !== w && o.view && o.spec.type !== "dress" && w.spec.type !== "dress" && layerOf(o) < layerOf(w)));
    return list;
  };
  let lastWearMs = 0;
  let wearBreakdown: Record<string, number> = {};
  const buildView = (w: Worn) => {
    const tStart = performance.now();
    w.view?.dispose();
    const saved = body.pose;
    const under = underOf(w).map((o) => {
      const gm = o.view!.data;
      return { pos: gm.rest, normals: computeNormals(gm.rest, gm.index, gm.vertexCount), count: gm.vertexCount };
    });
    const t1 = performance.now();
    const gm = buildGarment(effectiveSpec(w), { body, measurer, m: meas, layer: layerOf(w), under });
    body.setPose(saved);
    const t2 = performance.now();
    const atlas = buildAtlas(w.cutout, { bbox: gm.bbox, torsoHalfWidth: gm.torsoHalfWidth, plainBack: w.plainBack, avatarMarks: avatarMarks() }, w.spec.color ?? "#7a93b8");
    const t3 = performance.now();
    w.view = new GarmentView(avatar, w.spec, gm, atlas);
    w.view.under = underOf(w).map((o) => o.view!);
    const t4 = performance.now();
    w.view.update(!w.underwear, seatInfo);
    lastWearMs = performance.now() - tStart;
    wearBreakdown = { prep: t1 - tStart, build: t2 - t1, atlas: t3 - t2, view: t4 - t3, skinSim: performance.now() - t4 };
    w.view.setHeatmap(heatmap && !w.underwear);
  };
  const rebuildAll = () => {
    if ($<HTMLInputElement>("underwear").checked) setUnderwear(true);
    for (const w of [...worn].sort((a, b) => layerOf(a) - layerOf(b))) buildView(w);
  };
  const setUnderwear = (on: boolean) => {
    for (const u of underwear) u.view?.dispose();
    underwear = [];
    if (on) {
      underwear = underwearSpecs(meas)
        .map((spec) => ({ id: nextId++, spec, cutout: null, plainBack: true, view: null, chart: null, fit: null, underwear: true }));
      for (const u of underwear) buildView(u);
    }
    // outer garments re-collide against the new layer set
    for (const w of [...worn].sort((a, b) => layerOf(a) - layerOf(b))) {
      if (!w.view) continue;
      w.view.under = underOf(w).map((o) => o.view!);
      w.view.update(true, seatInfo);
    }
  };
  $<HTMLInputElement>("underwear").addEventListener("change", (e) => busy(() => { setUnderwear((e.target as HTMLInputElement).checked); refreshLook(); }));
  $<HTMLInputElement>("heatmap").addEventListener("change", (e) => {
    heatmap = (e.target as HTMLInputElement).checked;
    $("legend").hidden = !heatmap;
    for (const w of worn) w.view?.setHeatmap(heatmap);
    refreshLook();
  });

  const slotOf = (t: GarmentType) => (t === "top" ? "upper" : t === "dress" ? "full" : "lower");
  const rebuildTopBottom = () => {
    for (const o of worn.filter((x) => x.spec.type !== "dress").sort((a, b) => layerOf(a) - layerOf(b))) buildView(o);
  };
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
    // layering between top and bottom may have changed: rebuild both, inner first
    if (spec.type === "skirt" || spec.type === "pants" || spec.type === "top") rebuildTopBottom();
    selected = w;
    renderWorn();
    renderSizeTargets();
    renderStyle();
    refreshLook();
    return w;
  });

  const readGarmentForm = (): GarmentSpec => specFor($<HTMLSelectElement>("g-type").value as GarmentType, {
    silhouette: $<HTMLSelectElement>("g-silhouette").value as any,
    sleeve: $<HTMLSelectElement>("g-sleeve").value as any,
    neckline: $<HTMLSelectElement>("g-neck").value as any,
    rise: $<HTMLSelectElement>("g-rise").value as any,
    color: $<HTMLInputElement>("g-color").value,
  }, meas);

  let personGarments: PersonGarment[] = [];
  let personTiming: Record<string, number> = {};
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
    const tp0 = performance.now();
    const det = await detectPerson(img).catch(() => null);
    personTiming = { detect: performance.now() - tp0 };
    const lm = det?.landmarks;
    if (!lm) return false;
    const vis = [11, 12, 23, 24].every((k) => (lm[k].visibility ?? 1) > 0.5);
    if (!vis) return false;
    const canvas = toCanvas(img);
    const k = canvas.width / img.naturalWidth;
    const marks = marksFromLandmarks(lm.map((p) => ({ x: p.x * k, y: p.y * k })));
    const tp1 = performance.now();
    const labels = await segmentPerson(canvas);
    personTiming.segment = performance.now() - tp1;
    const tp2 = performance.now();
    const rgb = canvas.getContext("2d", { willReadFrequently: true })!.getImageData(0, 0, canvas.width, canvas.height).data;
    personGarments = analyzePersonGarments(labels, rgb, canvas.width, canvas.height, marks);
    personTiming.analyze = performance.now() - tp2;
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
      if (looksLikePerson(img) && (await tryPersonPhoto(img))) return;
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
        ? meas.waistY + riseOffset(spec.type, spec.rise) * 100
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
      label.textContent = w.uniqlo ? `UNIQLO ${uniqloItem(w.uniqlo.id)?.name ?? ""}・${sizeNote(uniqloItem(w.uniqlo.id)!, w.spec.size ?? "", w.uniqlo.recommended)}`
        : w.generated ? `${w.generated.design.name}・${sizeNote(uniqloItem(w.generated.base)!, w.spec.size ?? "", w.generated.recommended)}`
        : `${SILHOUETTE_LABELS[w.spec.silhouette]}${TYPE_LABELS[w.spec.type]}${w.spec.size ? `（${w.spec.size}）` : ""}・${w.spec.fabric.label}`;
      li.appendChild(label);
      const u = w.uniqlo && uniqloItem(w.uniqlo.id);
      if (u && w.uniqlo) {
        const uq = w.uniqlo;
        const sizeSel = document.createElement("select");
        sizeSel.className = "uq-size";
        sizeSel.title = "尺碼（★ 是依你的身形推薦的）";
        sizeSel.innerHTML = u.sizes.map((z) => `<option value="${z.size}" ${z.size === w.spec.size ? "selected" : ""}>${z.size}${z.size === uq.recommended ? " ★" : ""}</option>`).join("");
        const colorSel = document.createElement("select");
        colorSel.className = "uq-color";
        colorSel.innerHTML = u.colors.map((c, k) => `<option value="${k}" ${k === uq.color ? "selected" : ""}>${c.name}</option>`).join("");
        const reWear = () => busy(() => {
          const r = wearUniqlo(u, Number(colorSel.value), meas, sizeSel.value);
          w.spec = { ...r.spec, tucked: w.spec.tucked } as GarmentSpec;
          w.cutout = r.cutout; w.chart = r.chart; w.fit = r.fit;
          w.uniqlo = { id: u.id, color: Number(colorSel.value), recommended: r.recommended };
          if (w.spec.type === "dress") buildView(w); else rebuildTopBottom();
          renderWorn(); renderStyle(); refreshLook();
        });
        sizeSel.onchange = reWear;
        colorSel.onchange = reWear;
        li.append(sizeSel, colorSel);
      }
      if (w.spec.type === "top" && bottomOf()) {
        const tuck = document.createElement("button");
        tuck.className = "tuck";
        tuck.textContent = w.spec.tucked ? "放出來" : "紮進去";
        tuck.title = w.spec.tucked ? "衣襬放在褲子／裙子外面" : "把衣襬紮進褲子／裙子裡";
        tuck.onclick = () => busy(() => {
          w.spec = { ...w.spec, tucked: !w.spec.tucked };
          rebuildTopBottom();
          renderWorn(); refreshLook();
        });
        li.append(tuck);
      }
      if (w.generated) {
        const gen = w.generated;
        const bu = uniqloItem(gen.base)!;
        const sizeSel = document.createElement("select");
        sizeSel.className = "uq-size";
        sizeSel.title = "尺碼（依 UNIQLO 基本款，★ 是依你的身形推薦的）";
        sizeSel.innerHTML = bu.sizes.map((z) => `<option value="${z.size}" ${z.size === w.spec.size ? "selected" : ""}>${z.size}${z.size === gen.recommended ? " ★" : ""}</option>`).join("");
        sizeSel.onchange = () => busy(() => {
          const r = wearGenerated(gen.design, gen.base, meas, sizeSel.value);
          w.spec = { ...r.spec, tucked: w.spec.tucked }; w.chart = r.chart; w.fit = r.fit;
          if (w.spec.type === "dress") buildView(w); else rebuildTopBottom();
          renderWorn(); renderStyle(); refreshLook();
        });
        li.append(sizeSel);
      }
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
      del.onclick = () => {
        w.view?.dispose(); worn.splice(worn.indexOf(w), 1); if (selected === w) selected = worn[0] ?? null;
        if (w.spec.type !== "dress") rebuildTopBottom();
        renderWorn(); renderSizeTargets(); renderStyle(); refreshLook();
      };
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
        if (g.generated) {
          const r = wearGenerated(g.generated.design, g.generated.base, meas);
          const w = await wear(r.spec, await unpackCutout(g), false);
          w.chart = r.chart; w.fit = r.fit;
          w.generated = { ...g.generated, recommended: r.recommended };
          renderWorn(); renderStyle();
          return;
        }
        const uq = g.uniqlo && uniqloItem(g.uniqlo.id);
        if (uq && g.uniqlo) {
          await wearUq(uq.id, g.uniqlo.color);
          renderWorn(); renderStyle();
          return;
        }
        const cutout = await unpackCutout(g);
        let spec = structuredClone(g.spec);
        if (g.preset) {
          // preset items are cut for whoever wears them now
          spec = specFor(g.preset.type, g.preset, meas);
          if (g.fabricText) spec.fabric = parseFabric(g.fabricText);
        }
        const w = await wear(spec, cutout, g.plainBack);
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
      if (g.preset) label.title = "依你目前的身形自動調整尺寸";
      li.append(img, label, wearBtn, del);
      ul.appendChild(li);
    }
  };

  /** wear a UNIQLO basic (recommended size for this body) */
  const wearUq = async (id: string, color: number, tucked = false) => {
    const u = uniqloItem(id);
    if (!u) return null;
    const r = wearUniqlo(u, color, meas);
    if (tucked) r.spec.tucked = true;
    const w = await wear(r.spec, r.cutout, true);
    w.chart = r.chart; w.fit = r.fit;
    w.uniqlo = { id: u.id, color, recommended: r.recommended };
    return w;
  };
  const chips = $("outfit-chips");
  for (const o of OUTFITS) {
    const b = document.createElement("button");
    b.textContent = o.name;
    b.dataset.outfit = o.name;
    b.onclick = async () => {
      // an outfit replaces what is worn
      for (const w of [...worn]) { w.view?.dispose(); worn.splice(worn.indexOf(w), 1); }
      // bottoms first so a tucked top can go inside them
      const items = [...o.items].sort((a, c) => (uniqloItem(a.id)?.type === "top" ? 1 : 0) - (uniqloItem(c.id)?.type === "top" ? 1 : 0));
      for (const it of items) await wearUq(it.id, colorIndex(uniqloItem(it.id)!, it.color), !!o.tucked && uniqloItem(it.id)?.type === "top");
      rebuildTopBottom();
      renderWorn(); renderSizeTargets(); renderStyle(); refreshLook();
    };
    chips.appendChild(b);
  }

  $("gen-go").addEventListener("click", async () => {
    const text = $<HTMLTextAreaElement>("gen-text").value.trim();
    const count = Number($<HTMLSelectElement>("gen-count").value);
    const status = (t: string) => { $("gen-status").textContent = t; };
    if (!text) { status("請先描述想要的衣服或衣櫃風格。"); return; }
    const btn = $<HTMLButtonElement>("gen-go");
    btn.disabled = true;
    let items: ReturnType<typeof readKeywordList> = [];
    try {
      status("AI 設計中（通常 20–60 秒）…");
      try {
        const r = await fetch("/api/ask", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ prompt: buildGenPrompt(text, count) }) });
        const j = await r.json().catch(() => ({}));
        if (!r.ok) throw new Error(j.error || `HTTP ${r.status}`);
        items = parseGenItems(j.text);
      } catch (e: any) {
        // no bridge (or an unusable answer): read the description with keywords
        items = readKeywordList(text);
        status(`AI 中繼沒有回應（${e.message}），改用關鍵字判斷。`);
      }
      const t0 = Date.now();
      for (const [i, it] of items.entries()) await wardrobe.put(await packGenerated(it, t0 + (items.length - i)));
      await renderWardrobe();
      status(`已放進衣櫃 ${items.length} 件：${items.map((x) => x.name).join("、")}。在下方衣櫃按「穿上」試穿。`);
    } catch (e: any) {
      status("生成失敗：" + e.message);
    } finally { btn.disabled = false; }
  });

  $("wardrobe-defaults").addEventListener("click", async () => {
    const n = (await seedDefaults(true)) + (await seedUniqlo(true));
    $("wardrobe-defaults").textContent = n ? `已放回 ${n} 件預設衣服` : "預設衣服都在衣櫃裡了";
    renderWardrobe();
  });

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
    if (w.spec.type === "dress") buildView(w); else rebuildTopBottom();
    w.fit = evaluateFit(row, meas, w.spec.type, fabric, w.spec.sleeve);
    renderFit(w.fit);
    renderWorn();
    renderStyle();
    refreshLook();
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

  // ------------------------------------------------------------ advanced shape sliders
  const SLIDERS: [string, string][] = [
    ["race-caucasian", "臉型：歐美"], ["race-african", "臉型：非洲"], ["muscle", "肌肉線條"], ["belly", "小腹"],
    ["buttocks", "臀部豐滿"], ["firmness", "胸型挺度"], ["vshape", "倒三角"], ["torsodepth", "軀幹厚度"], ["neckheight", "脖子長"],
  ];
  const sliderBox = $("shape-sliders");
  for (const [key, label] of SLIDERS) {
    if (!data.morphs.has(key) && !data.morphs.has(key + "+")) continue;
    const oneSided = key.startsWith("race-");
    const v = profile.extra?.[key] ?? 0;
    const row = document.createElement("label");
    row.innerHTML = `<span>${label}</span><input type="range" min="${oneSided ? 0 : -1}" max="1" step="0.05" value="${v}" data-key="${key}"><output>${v.toFixed(2)}</output>`;
    const input = row.querySelector("input")!;
    input.addEventListener("input", () => {
      row.querySelector("output")!.textContent = Number(input.value).toFixed(2);
      profile.extra = { ...(profile.extra ?? {}), [key]: Number(input.value) };
      store.save(profile);
    });
    sliderBox.appendChild(row);
  }

  // ------------------------------------------------------------ appearance
  $<HTMLSelectElement>("skin").innerHTML = data.skins.map((s) => `<option value="${s.name}">${s.label}</option>`).join("");
  $<HTMLSelectElement>("hair").innerHTML = `<option value="">無</option>` + data.hair.map((h) => `<option value="${h.name}">${h.label}</option>`).join("");
  const applyLook = () => {
    avatar.setSkin(profile.skin, profile.skinTint);
    avatar.setHair(profile.hair || null);
    avatar.setHairColor(profile.hairColor);
    look.setLook(profile.skin, profile.skinTint, profile.hair || null, profile.hairColor);
    // setSkin reloads the plain skin texture: put the face back on
    if (selfie) refreshFace(); else refreshLook();
    $<HTMLSelectElement>("skin").value = profile.skin;
    $<HTMLInputElement>("skin-tint").value = profile.skinTint;
    $<HTMLSelectElement>("hair").value = profile.hair;
    $<HTMLInputElement>("hair-color").value = profile.hairColor;
  };
  for (const [id, key] of [["skin", "skin"], ["skin-tint", "skinTint"], ["hair", "hair"], ["hair-color", "hairColor"]] as const) {
    $(id).addEventListener("input", (e) => { (profile as any)[key] = (e.target as HTMLInputElement).value; store.save(profile); applyLook(); });
  }

  // ------------------------------------------------------------ my face (selfie on the avatar)
  const myFace = new MyFace(body);
  let selfie: Selfie | null = null;
  let faceTimer = 0;
  const faceStatus = (t: string) => { $("face-status").textContent = t; };
  const skinTexture = () => (data.skins.find((k) => k.name === profile.skin) ?? data.skins[0]).texture;
  /** (re)compose the face for the current body, skin and strength (debounced) */
  const refreshFace = () => {
    clearTimeout(faceTimer);
    faceTimer = window.setTimeout(async () => {
      if (!selfie) {
        MyFace.apply(avatar, null);
        look.setFace(null);
        avatar.setSkin(profile.skin, profile.skinTint);
        look.setLook(profile.skin, profile.skinTint, profile.hair || null, profile.hairColor);
        refreshLook();
        return;
      }
      $("busy").hidden = false;
      try {
        const c = await myFace.compose(selfie, skinTexture(), Number($<HTMLInputElement>("face-strength").value));
        if (!c) { faceStatus("假人的臉部偵測失敗，請稍後再試一次。"); return; }
        MyFace.apply(avatar, c);
        look.setFace(c);
        refreshLook();
      } catch (e: any) {
        console.error(e);
        faceStatus("合成失敗：" + e.message);
      } finally { $("busy").hidden = true; }
    }, 120);
  };
  const saveSelfie = (c: HTMLCanvasElement | null) => {
    try {
      if (c) localStorage.setItem("closet2.face", c.toDataURL("image/jpeg", 0.9));
      else localStorage.removeItem("closet2.face");
    } catch { /* storage full or unavailable: the face just won't come back next time */ }
  };
  const HAIR_LABEL = Object.fromEntries(data.hair.map((h) => [h.name, h.label]));
  $<HTMLInputElement>("face-photo").addEventListener("change", async (e) => {
    const f = (e.target as HTMLInputElement).files?.[0];
    if (!f) return;
    faceStatus("分析照片中…（第一次需要載入臉部偵測模型）");
    $("busy").hidden = false;
    try {
      const s = await analyzeSelfie(await loadImage(f));
      if (!s) { faceStatus("照片裡找不到臉。請換一張正面、清楚、臉部夠大的照片。"); return; }
      selfie = s;
      saveSelfie(s.canvas);
      if (s.hair) {
        profile.hair = s.hair.style;
        profile.hairColor = s.hair.color;
        store.save(profile);
        $<HTMLSelectElement>("hair").value = profile.hair;
        $<HTMLInputElement>("hair-color").value = profile.hairColor;
      }
      applyLook();
      faceStatus(`已套用：五官、膚色${s.iris ? "、眼睛顏色" : ""}${s.hair ? `、髮色、髮型「${HAIR_LABEL[s.hair.style]}」（${s.hair.reason}）` : ""}。髮型和膚色都可以在上面「外觀」再改。`);
    } catch (err: any) {
      console.error(err);
      faceStatus("分析失敗：" + err.message);
    } finally { $("busy").hidden = true; }
  });
  $<HTMLInputElement>("face-strength").addEventListener("input", () => {
    try { localStorage.setItem("closet2.faceStrength", $<HTMLInputElement>("face-strength").value); } catch { /* ignore */ }
    if (selfie) refreshFace();
  });
  $("face-remove").addEventListener("click", () => {
    selfie = null;
    saveSelfie(null);
    $<HTMLInputElement>("face-photo").value = "";
    faceStatus("已移除，假人恢復原本的臉。");
    refreshFace();
  });
  try { const v = localStorage.getItem("closet2.faceStrength"); if (v) $<HTMLInputElement>("face-strength").value = v; } catch { /* ignore */ }
  /** a face saved earlier comes back (hair / skin choices are already in the profile) */
  const restoreFace = async () => {
    let url: string | null = null;
    try { url = localStorage.getItem("closet2.face"); } catch { /* ignore */ }
    if (!url) return;
    try {
      const s = await analyzeSelfie(await loadImage(url));
      if (!s) return;
      selfie = s;
      refreshFace();
      faceStatus("已套用之前上傳的自拍。");
    } catch (e) { console.warn("saved face could not be restored", e); }
  };

  // ------------------------------------------------------------ photo measuring
  document.querySelector("#tab-body details")?.addEventListener("toggle", () => preloadPoseModel());
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

  // ------------------------------------------------------------ stance (feet together <-> apart)
  const stanceInput = $<HTMLInputElement>("stance");
  stanceInput.value = String(stance);
  let stanceTimer = 0;
  stanceInput.addEventListener("input", () => {
    stance = Number(stanceInput.value);
    try { localStorage.setItem("closet2.stance", String(stance)); } catch { /* ignore */ }
    // re-pose once the slider rests (garments re-drape at the end of the pose blend)
    clearTimeout(stanceTimer);
    stanceTimer = window.setTimeout(() => setPose(poseName), 120);
  });

  // ------------------------------------------------------------ saved avatars (我的假人)
  const avatarStatus = (t: string) => { $("avatar-status").textContent = t; };
  const renderAvatarList = (selectId?: string) => {
    const list = avatars.list();
    const sel = $<HTMLSelectElement>("avatar-list");
    sel.innerHTML = list.length ? list.map((a) => `<option value="${a.id}">${esc(a.name)}（${new Date(a.savedAt).toLocaleDateString("zh-TW")}）</option>`).join("")
      : `<option value="">（還沒有存過）</option>`;
    if (selectId) sel.value = selectId;
  };
  const snapshot = (): AvatarSnapshot => ({
    targets: { ...profile.targets } as Record<string, number>, weight: profile.weight, extra: { ...(profile.extra ?? {}) },
    skin: profile.skin, skinTint: profile.skinTint, hair: profile.hair, hairColor: profile.hairColor,
    face: selfie ? selfie.canvas.toDataURL("image/jpeg", 0.9) : null,
    faceStrength: Number($<HTMLInputElement>("face-strength").value), stance,
  });
  const applySnapshot = async (a: AvatarSnapshot) => {
    profile.targets = { ...a.targets } as Targets;
    profile.weight = a.weight;
    profile.extra = { ...(a.extra ?? {}) };
    Object.assign(profile, { skin: a.skin, skinTint: a.skinTint, hair: a.hair, hairColor: a.hairColor });
    store.save(profile);
    fillBodyForm();
    sliderBox.querySelectorAll<HTMLInputElement>("input[type=range]").forEach((inp) => {
      const v = profile.extra?.[inp.dataset.key!] ?? 0;
      inp.value = String(v);
      inp.parentElement!.querySelector("output")!.textContent = v.toFixed(2);
    });
    if (a.faceStrength) $<HTMLInputElement>("face-strength").value = String(a.faceStrength);
    if (a.stance !== undefined) { stance = a.stance; stanceInput.value = String(stance); try { localStorage.setItem("closet2.stance", String(stance)); } catch { /* ignore */ } }
    selfie = null;
    if (a.face) {
      try { selfie = await analyzeSelfie(await loadImage(a.face)); } catch (e) { console.warn(e); }
    }
    saveSelfie(selfie?.canvas ?? null);
    faceStatus(selfie ? "已套用這個假人的自拍。" : "");
    applyLook();
    await applyBody(profile.targets);
    setPose(poseName);
  };
  $("avatar-save").addEventListener("click", () => {
    const name = $<HTMLInputElement>("avatar-name").value.trim() || `假人 ${new Date().toLocaleString("zh-TW")}`;
    try {
      const a = avatars.save(name, snapshot());
      renderAvatarList(a.id);
      avatarStatus(`已儲存「${name}」。`);
    } catch {
      avatarStatus("瀏覽器儲存空間不夠，請刪除一些舊的假人，或用「匯出檔案」存到電腦。");
    }
  });
  $("avatar-load").addEventListener("click", () => busy(async () => {
    const a = avatars.list().find((x) => x.id === $<HTMLSelectElement>("avatar-list").value);
    if (!a) { avatarStatus("請先選一個已存的假人。"); return; }
    await applySnapshot(a.snapshot);
    $<HTMLInputElement>("avatar-name").value = a.name;
    avatarStatus(`已讀取「${a.name}」。`);
  }));
  $("avatar-delete").addEventListener("click", () => {
    const id = $<HTMLSelectElement>("avatar-list").value;
    const a = avatars.list().find((x) => x.id === id);
    if (!a) return;
    const btn = $<HTMLButtonElement>("avatar-delete");
    // two-step: the first click asks, the second deletes
    if (btn.dataset.confirm !== id) { btn.dataset.confirm = id; btn.textContent = "確定刪除？"; setTimeout(() => { btn.textContent = "刪除"; delete btn.dataset.confirm; }, 3000); return; }
    avatars.remove(id);
    btn.textContent = "刪除"; delete btn.dataset.confirm;
    renderAvatarList();
    avatarStatus(`已刪除「${a.name}」。`);
  });
  $("avatar-export").addEventListener("click", () => {
    const id = $<HTMLSelectElement>("avatar-list").value;
    const a = avatars.list().find((x) => x.id === id) ?? { id: "current", name: $<HTMLInputElement>("avatar-name").value.trim() || "目前的假人", savedAt: Date.now(), snapshot: snapshot() };
    const url = URL.createObjectURL(exportAvatar(a));
    const link = document.createElement("a");
    link.href = url;
    link.download = `假人-${a.name}.json`;
    link.click();
    setTimeout(() => URL.revokeObjectURL(url), 5000);
    avatarStatus(`已匯出「${a.name}」。`);
  });
  $<HTMLInputElement>("avatar-import").addEventListener("change", (e) => busy(async () => {
    const f = (e.target as HTMLInputElement).files?.[0];
    if (!f) return;
    try {
      const { name, snapshot: snap } = parseAvatarFile(await f.text());
      await applySnapshot(snap);
      try { renderAvatarList(avatars.save(name, snap).id); } catch { /* storage full: applied but not stored */ }
      $<HTMLInputElement>("avatar-name").value = name;
      avatarStatus(`已匯入並套用「${name}」。`);
    } catch (err: any) {
      avatarStatus("匯入失敗：" + err.message);
    } finally { (e.target as HTMLInputElement).value = ""; }
  }));
  renderAvatarList();

  // ------------------------------------------------------------ look display modes
  const lookSel = $<HTMLSelectElement>("look-style");
  lookSel.value = lookStyle;
  lookSel.addEventListener("change", () => {
    lookStyle = lookSel.value as any;
    try { localStorage.setItem("closet2.look", lookStyle); } catch { /* ignore */ }
    refreshLook();
  });
  $("look-save").addEventListener("click", () => {
    look.canvas.toBlob((b) => {
      if (!b) return;
      const a = document.createElement("a");
      a.href = URL.createObjectURL(b);
      a.download = `closet-${lookStyle}.png`;
      a.click();
      setTimeout(() => URL.revokeObjectURL(a.href), 5000);
    }, "image/png");
  });

  // ------------------------------------------------------------ tabs
  document.querySelectorAll<HTMLButtonElement>("#tabs button").forEach((b) => b.addEventListener("click", () => {
    document.querySelectorAll<HTMLButtonElement>("#tabs button").forEach((x) => x.classList.toggle("on", x === b));
    document.querySelectorAll<HTMLElement>(".tab").forEach((t) => (t.hidden = t.id !== "tab-" + b.dataset.tab));
    if (b.dataset.tab === "style") renderStyle();
    // photo models are big: warm them up as soon as the user heads for the photo features
    if (b.dataset.tab === "wear") { preloadPoseModel(); preloadSegmenter(); }
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
  seedDefaults().then(() => seedUniqlo()).catch((e) => console.warn("default wardrobe", e)).finally(() => renderWardrobe());
  renderSizeTargets();
  await applyBody(profile.targets);
  restoreFace();

  // test / debugging hook
  (window as any).__closet = {
    body, measurer, avatar, stage, data, worn,
    get measurements() { return meas; },
    get pose() { return poseName; },
    get poseSettled() { return poseAnim === null; },
    get lastWearMs() { return lastWearMs; },
    get wearBreakdown() { return wearBreakdown; },
    get personTiming() { return personTiming; },
    garmentKeys: GARMENT_KEY_LABELS as Record<GarmentKey, string>,
    setPose, setUnderwear, measureFromPhotos, loadImage, look,
    get lookStyle() { return lookStyle; },
    get stance() { return stance; },
    get selfie() { return selfie; },
    avatars,
  };
  (window as any).__ready = true;
}

main().catch((e) => {
  console.error(e);
  const l = document.getElementById("loading");
  if (l) { l.hidden = false; l.textContent = "載入失敗：" + e.message; }
});
