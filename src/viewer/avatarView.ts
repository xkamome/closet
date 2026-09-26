// Three.js meshes for the avatar (body + hair + eyes/brows/lashes), fed by CPU-skinned positions.

import * as THREE from "three";
import { Body, computeNormals } from "../avatar/body";
import type { ProxyData } from "../avatar/data";

const texLoader = new THREE.TextureLoader();
function loadTex(url: string, srgb = true): THREE.Texture {
  const t = texLoader.load(url);
  if (srgb) t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 8;
  return t;
}

interface ProxyMesh { data: ProxyData; mesh: THREE.Mesh; rest: Float32Array; posed: Float32Array }

export class AvatarView {
  readonly group = new THREE.Group();
  readonly body: Body;
  readonly bodyMesh: THREE.Mesh;
  readonly skinMaterial: THREE.MeshPhysicalMaterial;
  private readonly bodySrcIndex: Uint32Array;
  private readonly bodyPosed: Float32Array;
  private readonly bodyNormals: Float32Array;
  private hairMesh: ProxyMesh | null = null;
  private readonly extras: ProxyMesh[] = [];
  private readonly baseUrl: string;
  hairColor = new THREE.Color(0x3b2a20);

  constructor(body: Body, baseUrl = "avatar/") {
    this.body = body;
    this.baseUrl = baseUrl;
    const d = body.data;
    const n = d.bodyVertexCount;
    this.bodyPosed = new Float32Array(n * 3);
    this.bodyNormals = new Float32Array(n * 3);
    this.bodySrcIndex = new Uint32Array(d.body.index.length);
    for (let i = 0; i < d.body.index.length; i++) this.bodySrcIndex[i] = d.body.src[d.body.index[i]];

    const g = new THREE.BufferGeometry();
    const rv = d.body.src.length;
    g.setAttribute("position", new THREE.BufferAttribute(new Float32Array(rv * 3), 3));
    g.setAttribute("normal", new THREE.BufferAttribute(new Float32Array(rv * 3), 3));
    g.setAttribute("uv", new THREE.BufferAttribute(d.body.uv, 2));
    g.setIndex(new THREE.BufferAttribute(d.body.index, 1));
    this.skinMaterial = new THREE.MeshPhysicalMaterial({
      map: loadTex(baseUrl + d.skins[0].texture),
      roughness: 0.62,
      sheen: 0.25,
      sheenRoughness: 0.8,
      sheenColor: new THREE.Color(0xffd8c8),
      clearcoat: 0.04,
      clearcoatRoughness: 0.6,
    });
    this.bodyMesh = new THREE.Mesh(g, this.skinMaterial);
    this.bodyMesh.castShadow = true;
    this.bodyMesh.receiveShadow = true;
    this.bodyMesh.name = "body";
    this.group.add(this.bodyMesh);

    for (const p of d.extras) {
      const mat = p.name === "eyes"
        ? new THREE.MeshPhysicalMaterial({ map: loadTex(baseUrl + p.texture), roughness: 0.15, clearcoat: 1 })
        : new THREE.MeshStandardMaterial({
          map: loadTex(baseUrl + p.texture), transparent: true, alphaTest: 0.05, depthWrite: false,
          color: 0x2a1c14, roughness: 0.8, side: THREE.DoubleSide,
        });
      const pm = this.makeProxy(p, mat);
      pm.mesh.renderOrder = 2;
      this.extras.push(pm);
    }
    this.setHair(d.hair[0].name);
    this.update();
  }

  private makeProxy(p: ProxyData, mat: THREE.Material): ProxyMesh {
    const nv = p.refIdx.length / 3;
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(new Float32Array(nv * 3), 3));
    g.setAttribute("normal", new THREE.BufferAttribute(new Float32Array(nv * 3), 3));
    g.setAttribute("uv", new THREE.BufferAttribute(p.uv, 2));
    g.setIndex(new THREE.BufferAttribute(p.index, 1));
    const mesh = new THREE.Mesh(g, mat);
    mesh.name = p.name;
    mesh.castShadow = true;
    this.group.add(mesh);
    return { data: p, mesh, rest: new Float32Array(nv * 3), posed: new Float32Array(nv * 3) };
  }

  setHair(name: string | null): void {
    if (this.hairMesh) {
      this.group.remove(this.hairMesh.mesh);
      this.hairMesh.mesh.geometry.dispose();
      this.hairMesh = null;
    }
    const p = this.body.data.hair.find((h) => h.name === name);
    if (!p) return;
    const mat = new THREE.MeshStandardMaterial({
      map: loadTex(this.baseUrl + p.texture), color: this.hairColor, transparent: false,
      alphaTest: 0.35, alphaToCoverage: true, roughness: 0.55, metalness: 0.0, side: THREE.DoubleSide,
    });
    this.hairMesh = this.makeProxy(p, mat);
    this.updateProxy(this.hairMesh);
  }

  private refMesh: ProxyMesh | null = null;
  /** Show one of the CC0 reference garments (development aid for garment proportions). */
  setReference(name: string | null): void {
    if (this.refMesh) { this.group.remove(this.refMesh.mesh); this.refMesh.mesh.geometry.dispose(); this.refMesh = null; }
    const p = this.body.data.refClothes.find((r) => r.name === name);
    if (!p) return;
    const mat = new THREE.MeshStandardMaterial({ map: loadTex(this.baseUrl + p.texture), roughness: 0.85, side: THREE.DoubleSide });
    this.refMesh = this.makeProxy(p, mat);
    this.updateProxy(this.refMesh);
  }

  setHairColor(hex: string): void {
    this.hairColor.set(hex);
    if (this.hairMesh) (this.hairMesh.mesh.material as THREE.MeshStandardMaterial).color.copy(this.hairColor);
  }

  setSkin(name: string, tint?: string): void {
    const s = this.body.data.skins.find((k) => k.name === name) ?? this.body.data.skins[0];
    this.skinMaterial.map = loadTex(this.baseUrl + s.texture);
    if (tint) this.skinMaterial.color.set(tint);
    this.skinMaterial.needsUpdate = true;
  }

  private updateProxy(pm: ProxyMesh): void {
    const p = pm.data;
    const nv = p.refIdx.length / 3;
    this.body.fitProxy(p, pm.rest);
    this.body.skinRaw(pm.rest, p.skinIdx, p.skinW, nv, pm.posed);
    const g = pm.mesh.geometry;
    (g.attributes.position.array as Float32Array).set(pm.posed);
    computeNormals(pm.posed, p.index, nv, g.attributes.normal.array as Float32Array);
    g.attributes.position.needsUpdate = true;
    g.attributes.normal.needsUpdate = true;
    g.computeBoundingSphere();
  }

  /** Recompute all geometry after morph or pose changes. */
  update(): void {
    const d = this.body.data;
    const n = d.bodyVertexCount;
    this.body.posedBody(this.bodyPosed);
    computeNormals(this.bodyPosed, this.bodySrcIndex, n, this.bodyNormals);
    const g = this.bodyMesh.geometry;
    const pos = g.attributes.position.array as Float32Array;
    const nor = g.attributes.normal.array as Float32Array;
    const src = d.body.src;
    for (let i = 0; i < src.length; i++) {
      const s = src[i] * 3, o = i * 3;
      pos[o] = this.bodyPosed[s]; pos[o + 1] = this.bodyPosed[s + 1]; pos[o + 2] = this.bodyPosed[s + 2];
      nor[o] = this.bodyNormals[s]; nor[o + 1] = this.bodyNormals[s + 1]; nor[o + 2] = this.bodyNormals[s + 2];
    }
    g.attributes.position.needsUpdate = true;
    g.attributes.normal.needsUpdate = true;
    g.computeBoundingSphere();
    for (const e of this.extras) this.updateProxy(e);
    if (this.hairMesh) this.updateProxy(this.hairMesh);
    if (this.refMesh) this.updateProxy(this.refMesh);
  }

  get posedBodyPositions(): Float32Array { return this.bodyPosed; }
  get posedBodyNormals(): Float32Array { return this.bodyNormals; }
}
