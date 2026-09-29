// Front-view renderer for "look" garments: a fixed orthographic fashion-photo camera, the avatar in
// its own scene, garment panels as meshes, photo-style lighting (AO, contact shadow, studio sweep).

import * as THREE from "three";
import { computeNormals, type Body } from "../avatar/body";
import { AvatarView } from "../viewer/avatarView";
import type { LookGarment, Piece } from "./pattern";
import { weaveNormal } from "../viewer/garmentView";
import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js";
import { RenderPass } from "three/addons/postprocessing/RenderPass.js";
import { GTAOPass } from "three/addons/postprocessing/GTAOPass.js";
import { OutputPass } from "three/addons/postprocessing/OutputPass.js";

export type LookStyle = "photo";

export interface PieceTexture {
  /** texture image (photo panel) or null for plain colour */
  image: HTMLCanvasElement | null;
  /** per-vertex uv into `image` (same vertex order as the piece), or null to use the piece param */
  uv: Float32Array | null;
  color: THREE.ColorRepresentation;
  /** tile the image this many times across a panel (fabric swatches); uv must be null */
  repeat?: number;
}

const swatchCache = new Map<string, HTMLCanvasElement>();
/** A small tileable fabric swatch in the given colour (knit loops or a plain weave). */
export function fabricSwatch(color: string, knit: boolean): HTMLCanvasElement {
  const key = color + knit;
  const hit = swatchCache.get(key);
  if (hit) return hit;
  const S = 128;
  const c = document.createElement("canvas");
  c.width = c.height = S;
  const g = c.getContext("2d")!;
  g.fillStyle = color;
  g.fillRect(0, 0, S, S);
  const img = g.getImageData(0, 0, S, S);
  for (let y = 0; y < S; y++) for (let x = 0; x < S; x++) {
    let v: number;
    if (knit) {
      const cx = (x % 8) - 4, cy = (y % 8) - 4;
      v = Math.max(0, 1 - Math.hypot(cx * 1.2 + (cy > 0 ? 1.5 : -1.5), cy * 0.8) / 4) * 0.08 - 0.03;
    } else {
      v = (((x >> 1) + (y >> 1)) % 2 ? 0.02 : -0.02) + (Math.sin(x * 0.7) * Math.sin(y * 0.9)) * 0.015;
    }
    v += (Math.random() - 0.5) * 0.03;
    const o = (y * S + x) * 4;
    for (let k = 0; k < 3; k++) img.data[o + k] = Math.max(0, Math.min(255, img.data[o + k] * (1 + v)));
  }
  g.putImageData(img, 0, 0);
  swatchCache.set(key, c);
  return c;
}

/** strain -> heat colour (red: too small, orange: tight, green: fitted, blue: loose) */
const HEAT = [new THREE.Color(0.85, 0.12, 0.1), new THREE.Color(0.95, 0.55, 0.12), new THREE.Color(0.25, 0.7, 0.35), new THREE.Color(0.2, 0.45, 0.85)];
function heat(strain: number, stretch: number, out: THREE.Color): THREE.Color {
  // same bands as the 3D heat-map, blended across each boundary so row noise doesn't flicker
  const ramp = (x: number, a: number, b: number) => Math.max(0, Math.min(1, (x - a) / (b - a)));
  const tooSmall = 1 - ramp(strain * (1 + stretch), 0.97, 1.0);
  out.copy(HEAT[1]).lerp(HEAT[2], ramp(strain, 1.0, 1.05)).lerp(HEAT[3], ramp(strain, 1.14, 1.24));
  return out.lerp(HEAT[0], tooSmall);
}

export interface DressedGarment {
  garment: LookGarment;
  textures: PieceTexture[]; // one per piece
  /** draw order among garments (bottoms 1, tops 2) */
  layer: number;
  /** show the tightness heat-map instead of the fabric */
  heat?: boolean;
}

export function pieceIndex(p: Piece): Uint32Array {
  const { cols, rows } = p;
  const out: number[] = [];
  for (let j = 0; j < rows - 1; j++) for (let i = 0; i < cols - 1; i++) {
    const a = j * cols + i, b = a + 1, c = a + cols, d = c + 1;
    out.push(a, c, b, b, c, d);
  }
  return Uint32Array.from(out);
}

/** Flip triangle winding so geometric normals point away from the body. */
function orient(p: Piece, index: Uint32Array, normals: Float32Array, center: THREE.Vector3): void {
  let s = 0;
  const n = p.cols * p.rows;
  for (let i = 0; i < n; i += 3) {
    let dx = p.pos[i * 3] - center.x, dz = p.pos[i * 3 + 2] - center.z;
    if (p.kind === "front") { dx = 0; dz = 1; }
    if (p.kind === "back") { dx = 0; dz = -1; }
    s += normals[i * 3] * dx + normals[i * 3 + 2] * dz;
  }
  if (s < 0) {
    for (let t = 0; t < index.length; t += 3) { const k = index[t + 1]; index[t + 1] = index[t + 2]; index[t + 2] = k; }
    for (let i = 0; i < normals.length; i++) normals[i] = -normals[i];
  }
}

/** Vertical studio sweep: light warm grey, a little brighter behind the figure. */
function studioBackdrop(): THREE.Texture {
  const c = document.createElement("canvas");
  c.width = 64; c.height = 256;
  const g = c.getContext("2d")!;
  const lin = g.createLinearGradient(0, 0, 0, 256);
  lin.addColorStop(0, "#f6f3ee"); lin.addColorStop(0.55, "#fffdf9"); lin.addColorStop(0.8, "#fbf8f3"); lin.addColorStop(1, "#f1ece6");
  g.fillStyle = lin; g.fillRect(0, 0, 64, 256);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

const insideShader = (shader: THREE.WebGLProgramParametersWithUniforms) => {
  // the inside of the garment (seen through the neckline) is darker
  shader.fragmentShader = shader.fragmentShader.replace(
    "#include <color_fragment>",
    "#include <color_fragment>\n  if (!gl_FrontFacing) diffuseColor.rgb *= 0.86;",
  );
};

export class LookRenderer {
  readonly renderer: THREE.WebGLRenderer;
  readonly scene = new THREE.Scene();
  /** fashion-photo camera: long lens from about chest height, a little above the waist */
  readonly camera = new THREE.PerspectiveCamera(16, 1, 0.1, 50);
  readonly avatar: AvatarView;
  private garmentGroup = new THREE.Group();
  private lights = new THREE.Group();
  style: LookStyle = "photo";
  private readonly skinMat: THREE.Material;
  width: number;
  height: number;

  constructor(readonly body: Body, width = 600, height = 1000, canvas?: HTMLCanvasElement) {
    this.width = width; this.height = height;
    this.renderer = new THREE.WebGLRenderer({ antialias: true, preserveDrawingBuffer: true, canvas, alpha: false });
    this.renderer.setPixelRatio(1);
    this.renderer.setSize(width, height, false);
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    // Khronos neutral tone mapping keeps product colours (ACES shifts and desaturates them)
    this.renderer.toneMapping = THREE.NeutralToneMapping;
    this.renderer.toneMappingExposure = 1.02;
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFShadowMap;
    this.scene.background = new THREE.Color(0xf3efe9);
    this.avatar = new AvatarView(body);
    this.skinMat = this.avatar.bodyMesh.material as THREE.Material;
    // the neutral tone mapping keeps colours saturated: calm the skin texture a little
    (this.skinMat as THREE.MeshPhysicalMaterial).color.set(0xf4ede8);
    this.avatar.bodyMesh.castShadow = true;
    this.avatar.bodyMesh.receiveShadow = true;
    this.scene.add(this.avatar.group, this.garmentGroup, this.lights);
    this.setupLights();
    // floor that only receives the shadow (contact shadow under the feet) + a soft studio sweep
    this.floor = new THREE.Mesh(new THREE.CircleGeometry(1.0, 64), new THREE.ShadowMaterial({ opacity: 0.15 }));
    this.floor.rotation.x = -Math.PI / 2;
    this.floor.receiveShadow = true;
    this.scene.add(this.floor);
    this.scene.background = studioBackdrop();
  }
  private floor: THREE.Mesh;

  private setupLights(): void {
    const key = new THREE.DirectionalLight(0xfff5ea, 2.0);
    key.position.set(-1.6, 2.6, 3.2);
    key.castShadow = true;
    key.shadow.mapSize.set(2048, 2048);
    Object.assign(key.shadow.camera, { left: -1.6, right: 1.6, top: 2.4, bottom: -1.2, near: 0.1, far: 12 });
    key.shadow.bias = -0.0003;
    key.shadow.normalBias = 0.015;
    key.shadow.radius = 6;
    key.target.position.set(0, 0.9, 0);
    const fill = new THREE.DirectionalLight(0xeef2ff, 0.7);
    fill.position.set(2.2, 1.4, 2.0);
    const rim = new THREE.DirectionalLight(0xffffff, 0.8);
    rim.position.set(1.0, 2.5, -2.5);
    const hemi = new THREE.HemisphereLight(0xffffff, 0xd9cfc2, 0.6);
    this.lights.add(key, key.target, fill, rim, hemi);
    const pmrem = new THREE.PMREMGenerator(this.renderer);
    import("three/addons/environments/RoomEnvironment.js").then(({ RoomEnvironment }) => {
      this.scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
      this.scene.environmentIntensity = 0.35;
    });
  }

  resize(w: number, h: number): void {
    this.width = w; this.height = h;
    this.renderer.setSize(w, h, false);
  }

  /** Resolves once every texture used by the avatar has loaded (renders before that come out black). */
  async ready(): Promise<void> {
    for (let i = 0; i < 200; i++) {
      let pending = 0;
      this.avatar.group.traverse((o) => {
        const m = (o as THREE.Mesh).material as THREE.MeshStandardMaterial | undefined;
        const img = m?.map?.image as HTMLImageElement | undefined;
        if (m?.map && (!img || (img instanceof HTMLImageElement && !img.complete))) pending++;
      });
      if (!pending && this.scene.environment) return;
      await new Promise((r) => setTimeout(r, 50));
    }
  }

  /** Re-read the avatar pose/shape (call after body changes). */
  syncBody(): void { this.avatar.update(); }

  setGarments(list: DressedGarment[]): void {
    for (const c of [...this.garmentGroup.children]) {
      this.garmentGroup.remove(c);
      const m = c as THREE.Mesh;
      m.geometry?.dispose();
      (m.material as THREE.Material)?.dispose();
    }
    const center = new THREE.Vector3(0, 1, this.avatarCenterZ());
    for (const dg of [...list].sort((a, b) => a.layer - b.layer)) {
      dg.garment.pieces.forEach((p, k) => {
        const tex = dg.textures[k] ?? { image: null, uv: null, color: 0x9aa7b8 };
        const g = new THREE.BufferGeometry();
        const n = p.cols * p.rows;
        const index = pieceIndex(p);
        const normals = computeNormals(p.pos, index, n);
        // tubes: centre per ring for orientation
        const c = center.clone();
        if (p.kind === "sleeve" || p.kind === "band") {
          let sx = 0, sy = 0, sz = 0;
          for (let i = 0; i < n; i++) { sx += p.pos[i * 3]; sy += p.pos[i * 3 + 1]; sz += p.pos[i * 3 + 2]; }
          c.set(sx / n, sy / n, sz / n);
        }
        orient(p, index, normals, c);
        g.setAttribute("position", new THREE.BufferAttribute(p.pos.slice(), 3));
        g.setAttribute("normal", new THREE.BufferAttribute(normals, 3));
        let uv = tex.uv ?? p.param;
        if (!tex.uv && tex.repeat) { uv = p.param.map((v) => v * tex.repeat!); }
        g.setAttribute("uv", new THREE.BufferAttribute(uv, 2));
        if (dg.heat) {
          const col = new Float32Array(n * 3), c3 = new THREE.Color();
          for (let i = 0; i < n; i++) { heat(p.strain[i], dg.garment.spec.fabric.stretch, c3); col[i * 3] = c3.r; col[i * 3 + 1] = c3.g; col[i * 3 + 2] = c3.b; }
          g.setAttribute("color", new THREE.BufferAttribute(col, 3));
        }
        g.setIndex(new THREE.BufferAttribute(index, 1));
        const mat = new THREE.MeshPhysicalMaterial({
          color: tex.image ? 0xffffff : tex.color,
          roughness: 0.85, sheen: 0.35, sheenRoughness: 0.6, sheenColor: new THREE.Color(0xffffff),
          side: THREE.DoubleSide,
        });
        if (tex.image && !dg.heat) {
          const t = new THREE.CanvasTexture(tex.image);
          t.colorSpace = THREE.SRGBColorSpace;
          t.anisotropy = 8;
          if (tex.repeat) t.wrapS = t.wrapT = THREE.RepeatWrapping;
          mat.map = t;
        }
        if (dg.heat) { mat.vertexColors = true; mat.color.set(0xffffff); }
        // woven / knitted micro-structure (catches the light like real cloth)
        const f = dg.garment.spec.fabric;
        const nm = weaveNormal(f.structure === "knit" ? "knit" : f.weave === "牛仔" ? "twill" : "plain").clone();
        nm.wrapS = nm.wrapT = THREE.RepeatWrapping;
        // ~42 knit / weave repeats across a panel whatever the uv range is (param 0..1, or x repeat)
        const rep = tex.uv ? 42 : 42 / (tex.repeat ?? 1);
        nm.repeat.set(rep, rep);
        nm.needsUpdate = true;
        mat.normalMap = nm;
        mat.normalScale.set(0.28, 0.28);
        mat.onBeforeCompile = insideShader;
        const mesh = new THREE.Mesh(g, mat);
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        mesh.name = `${dg.garment.spec.type}-${p.name}`;
        mesh.renderOrder = dg.layer;
        this.garmentGroup.add(mesh);
      });
    }
  }

  /** development aid: wireframe overlay on every garment piece */
  debugWire(): void {
    for (const c of [...this.garmentGroup.children]) {
      const w = new THREE.Mesh((c as THREE.Mesh).geometry, new THREE.MeshBasicMaterial({ color: 0x000000, wireframe: true, transparent: true, opacity: 0.25 }));
      this.garmentGroup.add(w);
    }
  }

  private avatarCenterZ(): number {
    const pos = this.avatar.posedBodyPositions;
    let s = 0, n = 0;
    for (let i = 0; i < pos.length; i += 30) { s += pos[i + 2]; n++; }
    return s / Math.max(1, n);
  }

  setStyle(style: LookStyle): void { this.style = style; }

  /** Frame the whole figure (or a range of heights). */
  frame(y0: number, y1: number, cx = 0, minWidth = 0.85): void {
    const aspect = this.width / this.height;
    const cam = this.camera;
    cam.aspect = aspect;
    const fov = THREE.MathUtils.degToRad(cam.fov);
    // fit the height, and the width of the figure (arms out ~0.8 m) on narrow screens
    const span = Math.max(y1 - y0, minWidth / aspect);
    const dist = span / 2 / Math.tan(fov / 2) + 0.15;
    const cy = (y0 + y1) / 2;
    // eye a little above the frame centre -> hems and waistbands curve like in a real photo
    const eye = cy + Math.min(0.35, span * 0.18);
    cam.position.set(cx, eye, dist);
    cam.lookAt(cx, cy, 0);
    cam.updateProjectionMatrix();
  }

  render(): HTMLCanvasElement {
    // ambient occlusion: contact shadows in armpits, folds, under hems and collars
    if (!this.composer) {
      const rt = new THREE.WebGLRenderTarget(this.width, this.height, { samples: 4, type: THREE.HalfFloatType });
      this.composer = new EffectComposer(this.renderer, rt);
      this.composer.addPass(new RenderPass(this.scene, this.camera));
      this.gtao = new GTAOPass(this.scene, this.camera, this.width, this.height);
      this.gtao.updateGtaoMaterial({ radius: 0.06, distanceExponent: 1.6, thickness: 1.0, scale: 1.0, samples: 16 });
      this.gtao.blendIntensity = 0.75;
      this.composer.addPass(this.gtao);
      this.composer.addPass(new OutputPass());
    }
    this.composer.setPixelRatio(1);
    this.composer.setSize(this.width, this.height);
    this.composer.render();
    return this.renderer.domElement;
  }
  private composer: EffectComposer | null = null;
  private gtao: GTAOPass | null = null;

  /** world (x, y) -> canvas pixel */
  toPixel(x: number, y: number): [number, number] {
    const v = new THREE.Vector3(x, y, 0).project(this.camera);
    return [(v.x * 0.5 + 0.5) * this.width, (1 - (v.y * 0.5 + 0.5)) * this.height];
  }
}
