// Renders a generated garment: CPU skinning with the body's bone matrices, a post-skin collision
// push-out against the posed body, fabric material, and an optional tightness heat-map.

import * as THREE from "three";
import { computeNormals } from "../avatar/body";
import type { GarmentMesh } from "../garment/build";
import type { GarmentSpec } from "../garment/spec";
import type { AvatarView } from "./avatarView";
import { collide } from "../garment/collide";
import { drapeCloth } from "../garment/drape";

export class GarmentView {
  readonly mesh: THREE.Mesh;
  readonly material: THREE.MeshPhysicalMaterial;
  private readonly heatMaterial: THREE.MeshStandardMaterial;
  readonly data: GarmentMesh;
  readonly spec: GarmentSpec;
  private readonly posed: Float32Array;
  private texture: THREE.Texture | null = null;
  lastSimMs = 0;
  /** garments worn underneath this one (collided against after skinning) */
  under: GarmentView[] = [];

  constructor(readonly avatar: AvatarView, spec: GarmentSpec, data: GarmentMesh, atlas: HTMLCanvasElement) {
    this.spec = spec;
    this.data = data;
    const n = data.vertexCount;
    this.posed = new Float32Array(n * 3);
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(new Float32Array(n * 3), 3));
    g.setAttribute("normal", new THREE.BufferAttribute(new Float32Array(n * 3), 3));
    g.setAttribute("uv", new THREE.BufferAttribute(data.uv, 2));
    g.setAttribute("color", new THREE.BufferAttribute(heatColors(data.strain, spec.fabric.stretch), 3));
    g.setIndex(new THREE.BufferAttribute(data.index, 1));
    const f = spec.fabric;
    this.material = new THREE.MeshPhysicalMaterial({
      roughness: 0.92 - f.sheen * 0.55,
      sheen: f.structure === "knit" ? 0.6 : 0.3 + f.sheen * 0.4,
      sheenRoughness: 0.6,
      sheenColor: new THREE.Color(0xffffff),
      side: THREE.DoubleSide,
      normalMap: weaveNormal(f.structure === "knit" ? "knit" : f.weave === "牛仔" ? "twill" : "plain"),
      normalScale: new THREE.Vector2(0.35, 0.35),
    });
    this.material.normalMap!.repeat.set(36, 36);
    this.heatMaterial = new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 0.8, side: THREE.DoubleSide });
    this.mesh = new THREE.Mesh(g, this.material);
    this.mesh.castShadow = true;
    this.mesh.receiveShadow = true;
    this.mesh.name = "garment-" + spec.type;
    this.setAtlas(atlas);
    avatar.group.add(this.mesh);
    this.update();
  }

  setAtlas(canvas: HTMLCanvasElement): void {
    this.texture?.dispose();
    const t = new THREE.CanvasTexture(canvas);
    t.colorSpace = THREE.SRGBColorSpace;
    t.anisotropy = 8;
    this.texture = t;
    this.material.map = t;
    this.material.needsUpdate = true;
  }

  setHeatmap(on: boolean): void {
    this.mesh.material = on ? this.heatMaterial : this.material;
  }

  /** Re-skin after pose changes; `simulate` lets free-hanging cloth settle (used once a pose is reached). */
  /** true while the avatar sits (set by the app; the pose blend also passes through it) */
  sitting = false;
  update(simulate = false, seat: { x: number; z: number; r: number; y: number } | null = null): void {
    if (simulate) this.sitting = !!seat;
    const body = this.avatar.body;
    const d = this.data;
    // skirts sit with their front over the lap: a separate skinning when seated
    const sitting = this.sitting;
    body.skinRaw(d.rest, sitting && d.skinSitIdx ? d.skinSitIdx : d.skinIdx, sitting && d.skinSitW ? d.skinSitW : d.skinW, d.vertexCount, this.posed);
    const gap = Math.max(0.003, this.spec.fabric.thickness * 1.5);
    collide(this.posed, d.vertexCount, this.avatar.posedBodyPositions, this.avatar.posedBodyNormals, body.data.bodyVertexCount, gap);
    for (const u of this.under) collide(this.posed, d.vertexCount, u.posedPositions, u.posedNormals, u.data.vertexCount, 0.006, 0.02);
    // skirts / dresses (cone with its own cloth skinning) hang well as skinned; the relaxation pushed
    // the free part out into a ledge at the hip and, seated, pulled it through the thighs
    if (simulate && d.free.some((f) => f) && !(globalThis as any).__noDrape && !d.skinSitW) {
      const t0 = performance.now();
      drapeCloth({
        pos: this.posed, rest: d.rest, index: d.index, free: d.free, weld: d.weld,
        body: this.avatar.posedBodyPositions, bodyN: this.avatar.posedBodyNormals, bodyCount: body.data.bodyVertexCount,
        gap: gap + (seat ? 0.012 : 0.004), seat, drape: this.spec.fabric.drape,
        under: this.under.map((u) => ({ pos: u.posedPositions, normals: u.posedNormals, count: u.data.vertexCount })),
        // sitting needs the fabric to gather over the lap; standing keeps the cut's shape
        compress: seat ? undefined : 0.85,
        steps: seat ? 44 : 20, iterations: seat ? 10 : 6,
      });
      this.lastSimMs = performance.now() - t0;
      for (const u of this.under) collide(this.posed, d.vertexCount, u.posedPositions, u.posedNormals, u.data.vertexCount, 0.006, 0.02);
    }
    const g = this.mesh.geometry;
    (g.attributes.position.array as Float32Array).set(this.posed);
    const nor = computeNormals(this.posed, d.index, d.vertexCount, g.attributes.normal.array as Float32Array);
    this.smoothSeams(nor);
    this.posedNormals = g.attributes.normal.array as Float32Array;
    g.attributes.position.needsUpdate = true;
    g.attributes.normal.needsUpdate = true;
    g.computeBoundingSphere();
  }

  private seamGroups: Int32Array[] | null = null;
  /**
   * Pieces that meet edge to edge (a skirt cone under the hip piece, UV seams) have separate vertices
   * at the same place: share their normals so the join doesn't show as a line.
   */
  private smoothSeams(nor: Float32Array): void {
    if (!this.seamGroups) {
      const r = this.data.rest, n = this.data.vertexCount, map = new Map<string, number[]>();
      for (let i = 0; i < n; i++) {
        const k = `${Math.round(r[i * 3] / 0.002)},${Math.round(r[i * 3 + 1] / 0.002)},${Math.round(r[i * 3 + 2] / 0.002)}`;
        const l = map.get(k);
        if (l) l.push(i); else map.set(k, [i]);
      }
      this.seamGroups = [...map.values()].filter((l) => l.length > 1).map((l) => Int32Array.from(l));
    }
    for (const gr of this.seamGroups) {
      let x = 0, y = 0, z = 0;
      for (const i of gr) { x += nor[i * 3]; y += nor[i * 3 + 1]; z += nor[i * 3 + 2]; }
      const l = Math.hypot(x, y, z) || 1;
      for (const i of gr) { nor[i * 3] = x / l; nor[i * 3 + 1] = y / l; nor[i * 3 + 2] = z / l; }
    }
  }

  get posedPositions(): Float32Array { return this.posed; }
  posedNormals: Float32Array = new Float32Array(0);

  dispose(): void {
    this.avatar.group.remove(this.mesh);
    this.mesh.geometry.dispose();
    this.material.dispose();
    this.heatMaterial.dispose();
    this.texture?.dispose();
  }
}

/** strain = garment girth / body girth. red: can't fit, orange: tight, green: fitted, blue: loose */
export function heatColors(strain: Float32Array, stretch: number): Float32Array {
  const out = new Float32Array(strain.length * 3);
  const c = new THREE.Color();
  for (let i = 0; i < strain.length; i++) {
    const s = strain[i];
    if (s * (1 + stretch) < 0.995) c.setRGB(0.85, 0.12, 0.1);
    else if (s < 1.02) c.setRGB(0.95, 0.55, 0.12);
    else if (s < 1.18) c.setRGB(0.25, 0.7, 0.35);
    else c.setRGB(0.2 + Math.max(0, 1.4 - s) * 0.5, 0.45, 0.85);
    out[i * 3] = c.r; out[i * 3 + 1] = c.g; out[i * 3 + 2] = c.b;
  }
  return out;
}

const weaveCache = new Map<string, THREE.Texture>();
/** Small procedural normal map for fabric micro-structure. */
export function weaveNormal(kind: "knit" | "twill" | "plain"): THREE.Texture {
  const hit = weaveCache.get(kind);
  if (hit) return hit;
  const S = 64;
  const h = new Float32Array(S * S);
  for (let y = 0; y < S; y++) for (let x = 0; x < S; x++) {
    let v: number;
    if (kind === "knit") {
      const cx = (x % 8) - 4, cy = (y % 10) - 5;
      v = Math.max(0, 1 - Math.hypot(cx * 0.9 + (cy > 0 ? 1.2 : -1.2), cy * 0.6) / 4);
    } else if (kind === "twill") {
      v = 0.5 + 0.5 * Math.sin(((x + y) / S) * Math.PI * 16);
    } else {
      v = 0.5 + 0.25 * Math.sin((x / S) * Math.PI * 16) * Math.sin((y / S) * Math.PI * 16) + 0.1 * Math.random();
    }
    h[y * S + x] = v;
  }
  const cnv = document.createElement("canvas");
  cnv.width = cnv.height = S;
  const ctx = cnv.getContext("2d")!;
  const img = ctx.createImageData(S, S);
  for (let y = 0; y < S; y++) for (let x = 0; x < S; x++) {
    const dx = h[y * S + ((x + 1) % S)] - h[y * S + ((x + S - 1) % S)];
    const dy = h[((y + 1) % S) * S + x] - h[((y + S - 1) % S) * S + x];
    const nx = -dx * 2, ny = -dy * 2, nz = 1;
    const l = Math.hypot(nx, ny, nz);
    const o = (y * S + x) * 4;
    img.data[o] = (nx / l * 0.5 + 0.5) * 255;
    img.data[o + 1] = (ny / l * 0.5 + 0.5) * 255;
    img.data[o + 2] = (nz / l * 0.5 + 0.5) * 255;
    img.data[o + 3] = 255;
  }
  ctx.putImageData(img, 0, 0);
  const t = new THREE.CanvasTexture(cnv);
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  weaveCache.set(kind, t);
  return t;
}
