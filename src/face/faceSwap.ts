// "My face": put the user's facial features (from one frontal selfie) onto the avatar's skin texture.
//
//  1. MediaPipe Face Landmarker finds the same 478 points on the selfie and on a frontal render of the
//     avatar's own face.
//  2. Every face vertex of the avatar is projected into that render, located in the landmark
//     triangulation (barycentric), and carried to the same place in the selfie -> selfie uv per vertex.
//  3. The face triangles are drawn in texture (UV) space with those selfie uvs, feathered toward the
//     face outline, over the avatar skin texture recoloured to the selfie's skin tone.
// Everything runs locally; the selfie never leaves the browser.

import * as THREE from "three";
import type { Body } from "../avatar/body";
import { AvatarView } from "../viewer/avatarView";

export type P2 = [number, number];

let landmarkerP: Promise<any> | null = null;
function getLandmarker(): Promise<any> {
  if (!landmarkerP) {
    landmarkerP = (async () => {
      const { FilesetResolver, FaceLandmarker } = await import("@mediapipe/tasks-vision");
      const fileset = await FilesetResolver.forVisionTasks(new URL("mediapipe/wasm", document.baseURI).href);
      return FaceLandmarker.createFromOptions(fileset, {
        baseOptions: { modelAssetPath: new URL("models/face_landmarker.task", document.baseURI).href, delegate: "CPU" },
        runningMode: "IMAGE",
        numFaces: 1,
      });
    })();
    landmarkerP.catch(() => { landmarkerP = null; });
  }
  return landmarkerP;
}
export function preloadFaceModel(): void { getLandmarker().catch(() => {}); }

/** 478 face landmarks in pixels, or null when no face is found. */
export async function detectFace(img: HTMLCanvasElement | HTMLImageElement): Promise<P2[] | null> {
  const lm = await getLandmarker();
  const W = "naturalWidth" in img ? img.naturalWidth : img.width;
  const H = "naturalHeight" in img ? img.naturalHeight : img.height;
  const r = lm.detect(img);
  const f = r.faceLandmarks?.[0];
  if (!f || f.length < 468) return null;
  return f.map((p: { x: number; y: number }) => [p.x * W, p.y * H] as P2);
}

// MediaPipe face mesh indices
export const FACE_OVAL = [10, 338, 297, 332, 284, 251, 389, 356, 454, 323, 361, 288, 397, 365, 379, 378, 400, 377, 152, 148, 176, 149, 150, 136, 172, 58, 132, 93, 234, 127, 162, 21, 54, 103, 67, 109];
const CHEEKS = [50, 280, 101, 330, 118, 347, 205, 425];
const FOREHEAD = [67, 109, 10, 338, 297, 108, 151, 337];

// ------------------------------------------------------------------ avatar face render
export interface AvatarFaceShot {
  canvas: HTMLCanvasElement;
  /** world -> render pixel */
  project: (x: number, y: number, z: number) => P2;
  /** posed body positions / normals used for the shot */
  pos: Float32Array;
  normals: Float32Array;
}

/** Frontal, evenly lit render of the avatar's face (hair hidden), for landmark detection. */
export async function renderAvatarFace(body: Body, skinUrl: string, size = 640): Promise<AvatarFaceShot> {
  const renderer = new THREE.WebGLRenderer({ antialias: true, preserveDrawingBuffer: true });
  renderer.setSize(size, size, false);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0xdedbd6);
  const av = new AvatarView(body);
  av.setHair(null);
  const tex = await new THREE.TextureLoader().loadAsync(skinUrl);
  tex.colorSpace = THREE.SRGBColorSpace;
  av.skinMaterial.map = tex;
  av.skinMaterial.needsUpdate = true;
  scene.add(av.group);
  scene.add(new THREE.HemisphereLight(0xffffff, 0xbbb4ab, 1.6));
  const key = new THREE.DirectionalLight(0xffffff, 1.2);
  key.position.set(0, 0.5, 2);
  scene.add(key);
  // wait for the eye / brow textures
  for (let i = 0; i < 100; i++) {
    let pending = 0;
    av.group.traverse((o) => {
      const m = (o as THREE.Mesh).material as THREE.MeshStandardMaterial | undefined;
      const im = m?.map?.image as HTMLImageElement | undefined;
      if (m?.map && (!im || (im instanceof HTMLImageElement && !im.complete))) pending++;
    });
    if (!pending) break;
    await new Promise((r) => setTimeout(r, 30));
  }
  const head = body.bonePosed("head");
  const cx = head.x, cy = head.y + 0.085;
  const half = 0.135;
  const cam = new THREE.OrthographicCamera(cx - half, cx + half, cy + half, cy - half, 0.01, 10);
  cam.position.set(0, 0, 3);
  cam.lookAt(0, 0, 0);
  // looking straight down -z from +z: keep the frustum around (cx, cy)
  cam.position.set(cx, cy, 3); cam.left = -half; cam.right = half; cam.top = half; cam.bottom = -half;
  cam.lookAt(cx, cy, 0);
  cam.updateProjectionMatrix();
  renderer.render(scene, cam);
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = size;
  canvas.getContext("2d")!.drawImage(renderer.domElement, 0, 0);
  const v = new THREE.Vector3();
  const project = (x: number, y: number, z: number): P2 => {
    v.set(x, y, z).project(cam);
    return [(v.x * 0.5 + 0.5) * size, (1 - (v.y * 0.5 + 0.5)) * size];
  };
  const pos = av.posedBodyPositions.slice(), normals = av.posedBodyNormals.slice();
  av.group.traverse((o) => { const m = o as THREE.Mesh; if (m.isMesh) { m.geometry.dispose(); } });
  tex.dispose();
  renderer.dispose();
  renderer.forceContextLoss();
  return { canvas, project, pos, normals };
}

// ------------------------------------------------------------------ triangulation
/** Bowyer-Watson Delaunay triangulation of 2D points; returns index triples. */
export function delaunay(pts: P2[]): number[] {
  let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
  for (const [x, y] of pts) { minX = Math.min(minX, x); minY = Math.min(minY, y); maxX = Math.max(maxX, x); maxY = Math.max(maxY, y); }
  // a huge super-triangle: a small one misses thin triangles along the convex hull
  const d = Math.max(maxX - minX, maxY - minY) * 2000;
  const P = [...pts, [minX - d, minY - d], [minX + d * 2, minY - d], [minX - d, minY + d * 2]] as P2[];
  const n = pts.length;
  let tris: [number, number, number, number, number, number][] = []; // a, b, c, ccx, ccy, r2
  const circ = (a: number, b: number, c: number) => {
    const [ax, ay] = P[a], [bx, by] = P[b], [cx, cy] = P[c];
    const D = 2 * (ax * (by - cy) + bx * (cy - ay) + cx * (ay - by));
    if (Math.abs(D) < 1e-12) return [0, 0, Infinity];
    const ux = ((ax * ax + ay * ay) * (by - cy) + (bx * bx + by * by) * (cy - ay) + (cx * cx + cy * cy) * (ay - by)) / D;
    const uy = ((ax * ax + ay * ay) * (cx - bx) + (bx * bx + by * by) * (ax - cx) + (cx * cx + cy * cy) * (bx - ax)) / D;
    return [ux, uy, (ax - ux) ** 2 + (ay - uy) ** 2];
  };
  const add = (a: number, b: number, c: number) => { const [x, y, r] = circ(a, b, c); tris.push([a, b, c, x, y, r]); };
  add(n, n + 1, n + 2);
  for (let i = 0; i < n; i++) {
    const [px, py] = P[i];
    const bad: typeof tris = [], keep: typeof tris = [];
    for (const t of tris) ((px - t[3]) ** 2 + (py - t[4]) ** 2 < t[5] ? bad : keep).push(t);
    const edges = new Map<string, [number, number]>();
    for (const t of bad) for (const [a, b] of [[t[0], t[1]], [t[1], t[2]], [t[2], t[0]]] as [number, number][]) {
      const k = a < b ? `${a},${b}` : `${b},${a}`;
      if (edges.has(k)) edges.delete(k); else edges.set(k, [a, b]);
    }
    tris = keep;
    for (const [a, b] of edges.values()) add(a, b, i);
  }
  const out: number[] = [];
  for (const t of tris) if (t[0] < n && t[1] < n && t[2] < n) out.push(t[0], t[1], t[2]);
  return out;
}

/** Locate p in the triangulation: [triangle offset, l1, l2, l3] or null. */
function locate(pts: P2[], tris: number[], p: P2): [number, number, number, number] | null {
  let best: [number, number, number, number] | null = null, bestMin = -Infinity;
  for (let t = 0; t < tris.length; t += 3) {
    const [ax, ay] = pts[tris[t]], [bx, by] = pts[tris[t + 1]], [cx, cy] = pts[tris[t + 2]];
    const D = (by - cy) * (ax - cx) + (cx - bx) * (ay - cy);
    if (Math.abs(D) < 1e-9) continue;
    const l1 = ((by - cy) * (p[0] - cx) + (cx - bx) * (p[1] - cy)) / D;
    const l2 = ((cy - ay) * (p[0] - cx) + (ax - cx) * (p[1] - cy)) / D;
    const l3 = 1 - l1 - l2;
    const mn = Math.min(l1, l2, l3);
    if (mn >= -1e-6) return [t, l1, l2, l3];
    if (mn > bestMin) { bestMin = mn; best = [t, l1, l2, l3]; }
  }
  // slightly outside the hull (hairline, jaw): extrapolate from the nearest triangle
  return bestMin > -0.6 ? best : null;
}

function inPolygon(poly: P2[], p: P2): boolean {
  let inside = false;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const [xi, yi] = poly[i], [xj, yj] = poly[j];
    if ((yi > p[1]) !== (yj > p[1]) && p[0] < ((xj - xi) * (p[1] - yi)) / (yj - yi) + xi) inside = !inside;
  }
  return inside;
}
function distToPolygon(poly: P2[], p: P2): number {
  let best = Infinity;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const [ax, ay] = poly[j], [bx, by] = poly[i];
    const dx = bx - ax, dy = by - ay;
    const t = Math.max(0, Math.min(1, ((p[0] - ax) * dx + (p[1] - ay) * dy) / (dx * dx + dy * dy || 1)));
    best = Math.min(best, Math.hypot(p[0] - ax - dx * t, p[1] - ay - dy * t));
  }
  return best;
}

function meanColor(img: ImageData, pts: P2[], r: number): [number, number, number] {
  let s0 = 0, s1 = 0, s2 = 0, n = 0;
  for (const [x, y] of pts) {
    for (let dy = -r; dy <= r; dy++) for (let dx = -r; dx <= r; dx++) {
      const X = Math.round(x + dx), Y = Math.round(y + dy);
      if (X < 0 || Y < 0 || X >= img.width || Y >= img.height) continue;
      const o = (Y * img.width + X) * 4;
      s0 += img.data[o]; s1 += img.data[o + 1]; s2 += img.data[o + 2]; n++;
    }
  }
  return n ? [s0 / n, s1 / n, s2 / n] : [200, 170, 150];
}

// ------------------------------------------------------------------ the composite
export interface FaceFit {
  /** selfie uv (0..1, image y down) and feather alpha per body vertex; alpha 0 = not part of the face */
  uv: Float32Array;
  alpha: Float32Array;
  /** skin colour gain (selfie cheeks / avatar cheeks), per channel */
  gain: [number, number, number];
  selfieSkin: [number, number, number];
}

/** Match the avatar's face to the selfie. */
export function fitFace(body: Body, shot: AvatarFaceShot, avatarLm: P2[], selfie: HTMLCanvasElement, selfieLm: P2[]): FaceFit {
  const n = body.data.bodyVertexCount;
  const uv = new Float32Array(n * 2), alpha = new Float32Array(n);
  const tris = delaunay(avatarLm);
  const oval = FACE_OVAL.map((i) => avatarLm[i]);
  const faceW = Math.hypot(avatarLm[234][0] - avatarLm[454][0], avatarLm[234][1] - avatarLm[454][1]);
  const feather = faceW * 0.1;
  const W = selfie.width, H = selfie.height;
  for (let v = 0; v < n; v++) {
    // only surfaces facing the camera (the face, not the sides or back of the head)
    if (shot.normals[v * 3 + 2] < 0.15) continue;
    const p = shot.project(shot.pos[v * 3], shot.pos[v * 3 + 1], shot.pos[v * 3 + 2]);
    const inside = inPolygon(oval, p);
    const d = distToPolygon(oval, p);
    // feather: full inside (beyond `feather` from the outline), fading out just past it
    const a = inside ? Math.min(1, 0.55 + d / feather) : Math.max(0, 0.55 - d / (feather * 0.6));
    if (a <= 0) continue;
    const loc = locate(avatarLm, tris, p);
    if (!loc) continue;
    const [t, l1, l2, l3] = loc;
    const A = selfieLm[tris[t]], B = selfieLm[tris[t + 1]], C = selfieLm[tris[t + 2]];
    uv[v * 2] = (l1 * A[0] + l2 * B[0] + l3 * C[0]) / W;
    uv[v * 2 + 1] = (l1 * A[1] + l2 * B[1] + l3 * C[1]) / H;
    alpha[v] = Math.min(1, a) * Math.min(1, Math.max(0, (shot.normals[v * 3 + 2] - 0.15) / 0.3));
  }
  const sImg = selfie.getContext("2d", { willReadFrequently: true })!.getImageData(0, 0, W, H);
  const aImg = shot.canvas.getContext("2d", { willReadFrequently: true })!.getImageData(0, 0, shot.canvas.width, shot.canvas.height);
  const pick = (lm: P2[]) => [...CHEEKS, ...FOREHEAD].map((i) => lm[i]);
  const rS = Math.max(2, Math.round(W / 160)), rA = Math.max(2, Math.round(shot.canvas.width / 160));
  const selfieSkin = meanColor(sImg, pick(selfieLm), rS);
  const avatarSkin = meanColor(aImg, pick(avatarLm), rA);
  const gain = [0, 1, 2].map((k) => Math.max(0.2, Math.min(1.8, selfieSkin[k] / Math.max(1, avatarSkin[k])))) as [number, number, number];
  return { uv, alpha, gain, selfieSkin };
}

/**
 * New skin texture: the base skin recoloured by `gain`, with the selfie's face drawn in UV space.
 * strength (0..1) scales the face blend (and the skin recolouring).
 */
export function composeSkin(body: Body, base: HTMLImageElement | HTMLCanvasElement, selfie: HTMLCanvasElement, fit: FaceFit, strength = 1): HTMLCanvasElement {
  const size = ("naturalWidth" in base ? base.naturalWidth : base.width) || 2048;
  const out = document.createElement("canvas");
  out.width = out.height = size;
  const ctx = out.getContext("2d", { willReadFrequently: true })!;
  ctx.drawImage(base, 0, 0, size, size);
  // skin tone: per-channel gain over the whole body texture
  const g = fit.gain.map((x) => 1 + (x - 1) * Math.min(1, strength * 1.2));
  const img = ctx.getImageData(0, 0, size, size);
  const d = img.data;
  for (let i = 0; i < d.length; i += 4) { d[i] = Math.min(255, d[i] * g[0]); d[i + 1] = Math.min(255, d[i + 1] * g[1]); d[i + 2] = Math.min(255, d[i + 2] * g[2]); }
  ctx.putImageData(img, 0, 0);

  // face: render the face triangles in UV space with WebGL (smooth per-vertex feather)
  const data = body.data;
  const src = data.body.src, idx = data.body.index, uvs = data.body.uv;
  const posArr: number[] = [], suv: number[] = [], al: number[] = [];
  for (let t = 0; t < idx.length; t += 3) {
    const r = [idx[t], idx[t + 1], idx[t + 2]];
    const s = r.map((k) => src[k]);
    if (s.every((k) => fit.alpha[k] <= 0)) continue;
    for (let k = 0; k < 3; k++) {
      posArr.push(uvs[r[k] * 2] * 2 - 1, uvs[r[k] * 2 + 1] * 2 - 1, 0);
      suv.push(fit.uv[s[k] * 2], 1 - fit.uv[s[k] * 2 + 1]);
      al.push(fit.alpha[s[k]] * strength);
    }
  }
  const renderer = new THREE.WebGLRenderer({ alpha: true, premultipliedAlpha: false, preserveDrawingBuffer: true });
  renderer.setSize(size, size, false);
  renderer.setClearColor(0x000000, 0);
  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.Float32BufferAttribute(posArr, 3));
  geo.setAttribute("suv", new THREE.Float32BufferAttribute(suv, 2));
  geo.setAttribute("alpha", new THREE.Float32BufferAttribute(al, 1));
  const tex = new THREE.CanvasTexture(selfie);
  tex.colorSpace = THREE.NoColorSpace;
  const mat = new THREE.RawShaderMaterial({
    uniforms: { map: { value: tex } },
    vertexShader: `precision highp float; attribute vec3 position; attribute vec2 suv; attribute float alpha;
      varying vec2 vUv; varying float vA; void main() { vUv = suv; vA = alpha; gl_Position = vec4(position.xy, 0.0, 1.0); }`,
    fragmentShader: `precision highp float; uniform sampler2D map; varying vec2 vUv; varying float vA;
      void main() { gl_FragColor = vec4(texture2D(map, vUv).rgb, clamp(vA, 0.0, 1.0)); }`,
    side: THREE.DoubleSide, depthTest: false, transparent: false,
  });
  const scene = new THREE.Scene();
  scene.add(new THREE.Mesh(geo, mat));
  renderer.render(scene, new THREE.OrthographicCamera(-1, 1, 1, -1, -1, 1));
  // UV (0,0) is the bottom-left of the texture image; the render's y is up as well -> draw as is
  ctx.drawImage(renderer.domElement, 0, 0);
  geo.dispose(); mat.dispose(); tex.dispose(); renderer.dispose(); renderer.forceContextLoss();
  return out;
}

// ------------------------------------------------------------------ eyes and hair from the selfie
/** Mean iris colour (MediaPipe iris landmarks 468-477), or null if the eyes are too small to read. */
export function irisColor(selfie: HTMLCanvasElement, lm: P2[]): [number, number, number] | null {
  if (lm.length < 478) return null;
  const img = selfie.getContext("2d", { willReadFrequently: true })!.getImageData(0, 0, selfie.width, selfie.height);
  const cols: number[][] = [];
  for (const [c, ring] of [[468, [469, 470, 471, 472]], [473, [474, 475, 476, 477]]] as const) {
    const r = ring.reduce((s2, i) => s2 + Math.hypot(lm[i][0] - lm[c][0], lm[i][1] - lm[c][1]), 0) / 4;
    if (r < 2) continue;
    // ring between pupil and limbus
    for (let a = 0; a < 24; a++) {
      const t = (a / 24) * Math.PI * 2, rr = r * 0.6;
      const x = Math.round(lm[c][0] + Math.cos(t) * rr), y = Math.round(lm[c][1] + Math.sin(t) * rr);
      if (x < 0 || y < 0 || x >= img.width || y >= img.height) continue;
      const o = (y * img.width + x) * 4;
      cols.push([img.data[o], img.data[o + 1], img.data[o + 2]]);
    }
  }
  if (cols.length < 8) return null;
  // drop reflections / eyelid pixels: keep the darker half
  cols.sort((a, b) => a[0] + a[1] + a[2] - (b[0] + b[1] + b[2]));
  const k = cols.slice(0, Math.ceil(cols.length / 2));
  return [0, 1, 2].map((c) => k.reduce((s2, p) => s2 + p[c], 0) / k.length) as [number, number, number];
}

/** Recolour the iris of the MakeHuman eye texture (saturated reddish pixels) to `rgb`. */
export function recolorEyes(src: HTMLImageElement | HTMLCanvasElement, rgb: [number, number, number]): HTMLCanvasElement {
  const w = ("naturalWidth" in src ? src.naturalWidth : src.width) || 512, h = ("naturalHeight" in src ? src.naturalHeight : src.height) || 512;
  const c = document.createElement("canvas");
  c.width = w; c.height = h;
  const ctx = c.getContext("2d", { willReadFrequently: true })!;
  ctx.drawImage(src, 0, 0, w, h);
  const img = ctx.getImageData(0, 0, w, h), d = img.data;
  const tl = (rgb[0] + rgb[1] + rgb[2]) / 3 || 1;
  for (let i = 0; i < d.length; i += 4) {
    const r = d[i], g = d[i + 1], b = d[i + 2];
    const mx = Math.max(r, g, b), mn = Math.min(r, g, b);
    const sat = mx ? (mx - mn) / mx : 0;
    if (sat < 0.35 || r < g) continue; // sclera and background stay
    const w2 = Math.min(1, (sat - 0.35) / 0.2);
    const lum = (r + g + b) / 3;
    for (let k = 0; k < 3; k++) d[i + k] = d[i + k] * (1 - w2) + Math.min(255, (rgb[k] / tl) * lum * 0.9) * w2;
  }
  ctx.putImageData(img, 0, 0);
  return c;
}

export interface HairGuess { style: string; color: string; reason: string }

/** Pick the closest avatar hairstyle and the hair colour from a selfie's hair mask (label 1 = hair). */
export function guessHair(labels: Uint8Array, rgb: Uint8ClampedArray, W: number, H: number, lm: P2[]): HairGuess | null {
  const chin = lm[152], top = lm[10], faceH = Math.max(10, chin[1] - top[1]);
  const left = lm[234], right = lm[454];
  let n = 0, bottom = 0, sumR: number[] = [], forehead = 0, foreheadN = 0, side = 0;
  const browY = (lm[105][1] + lm[334][1]) / 2;
  for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
    const i = y * W + x;
    const inForehead = y > top[1] && y < browY - faceH * 0.03 && x > lm[105][0] && x < lm[334][0];
    if (inForehead) foreheadN++;
    if (labels[i] !== 1) continue;
    n++;
    if (y > bottom) bottom = y;
    if (inForehead) forehead++;
    // hair beside the face below the ears
    if (y > (left[1] + right[1]) / 2 + faceH * 0.15 && (x < left[0] - 2 || x > right[0] + 2)) side++;
    if ((i & 3) === 0) sumR.push((rgb[i * 4] << 16) | (rgb[i * 4 + 1] << 8) | rgb[i * 4 + 2]);
  }
  if (n < 50) return null;
  // colour: median by brightness (skips highlights and dark roots alike)
  sumR.sort((a, b) => ((a >> 16) + ((a >> 8) & 255) + (a & 255)) - ((b >> 16) + ((b >> 8) & 255) + (b & 255)));
  // a lighter-than-median pick: shadows dominate hair pixels, and the avatar's hair texture multiplies
  // the colour, so the chosen colour is brightened a little to look the same on screen
  const med = sumR[Math.floor(sumR.length * 0.7)] ?? 0x3b2a20;
  const boost = (c: number) => Math.min(255, Math.round(c * 1.35 + 6));
  const color = "#" + [med >> 16, (med >> 8) & 255, med & 255].map((c) => boost(c).toString(16).padStart(2, "0")).join("");
  const below = (bottom - chin[1]) / faceH;
  const bangs = foreheadN ? forehead / foreheadN : 0;
  const sideShare = side / n;
  let style: string, reason: string;
  // selfies are often cropped at the shoulders: hair that runs off the bottom edge counts as long
  const offFrame = bottom >= H * 0.9;
  if (below > 0.45 || (offFrame && below > 0.1) || (sideShare > 0.25 && below > 0.15)) { style = "hair_long01"; reason = "頭髮長過下巴"; }
  else if (sideShare < 0.04 && below < 0.1) { style = "hair_ponytail01"; reason = "臉旁沒有頭髮（綁起來）"; }
  else if (bangs > 0.45) { style = "hair_bob01"; reason = "有瀏海的短髮"; }
  else { style = "hair_bob02"; reason = "短髮"; }
  return { style, color, reason };
}
