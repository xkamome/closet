// App side of "my face": analyse a selfie once, keep the avatar's own landmarks cached per body shape,
// compose the skin texture, and apply it (plus eye colour, hair guess) to any AvatarView.

import * as THREE from "three";
import type { Body } from "../avatar/body";
import type { AvatarView } from "../viewer/avatarView";
import { segmentPerson } from "../photo/segmenter";
import { composeSkin, detectFace, fitFace, guessHair, irisColor, recolorEyes, renderAvatarFace, type AvatarFaceShot, type FaceFit, type HairGuess, type P2 } from "./faceSwap";

export interface Selfie {
  canvas: HTMLCanvasElement;
  lm: P2[];
  hair: HairGuess | null;
  iris: [number, number, number] | null;
}

const MAX = 720;

function toCanvas(img: HTMLImageElement | HTMLCanvasElement): HTMLCanvasElement {
  const w = "naturalWidth" in img ? img.naturalWidth : img.width;
  const h = "naturalHeight" in img ? img.naturalHeight : img.height;
  const k = Math.min(1, MAX / Math.max(w, h));
  const c = document.createElement("canvas");
  c.width = Math.round(w * k); c.height = Math.round(h * k);
  c.getContext("2d")!.drawImage(img, 0, 0, c.width, c.height);
  return c;
}

/** Landmarks, hair and eye colour of a selfie; null when no face is found. */
export async function analyzeSelfie(img: HTMLImageElement | HTMLCanvasElement): Promise<Selfie | null> {
  const canvas = toCanvas(img);
  const lm = await detectFace(canvas);
  if (!lm) return null;
  let hair: HairGuess | null = null;
  try {
    const labels = await segmentPerson(canvas);
    const rgb = canvas.getContext("2d", { willReadFrequently: true })!.getImageData(0, 0, canvas.width, canvas.height).data;
    hair = guessHair(labels, rgb, canvas.width, canvas.height, lm);
  } catch (e) { console.warn("hair segmentation failed", e); }
  return { canvas, lm, hair, iris: irisColor(canvas, lm) };
}

const loadImg = (url: string) => new Promise<HTMLImageElement>((res, rej) => { const im = new Image(); im.onload = () => res(im); im.onerror = rej; im.src = url; });

export class MyFace {
  private shotKey = "";
  private shot: { shot: AvatarFaceShot; lm: P2[] } | null = null;
  private fitCache: { key: string; fit: FaceFit } | null = null;
  private eyeBase: HTMLImageElement | null = null;

  constructor(private readonly body: Body, private readonly baseUrl = "avatar/") {}

  /** The avatar's own landmarks (re-detected when the body shape changes). */
  private async avatarLandmarks(skinTexture: string): Promise<{ shot: AvatarFaceShot; lm: P2[] } | null> {
    const key = JSON.stringify(this.body.morphValues);
    if (this.shot && this.shotKey === key) return this.shot;
    const saved = this.body.pose;
    this.body.setPose({});
    try {
      const shot = await renderAvatarFace(this.body, this.baseUrl + skinTexture);
      const lm = await detectFace(shot.canvas);
      this.shot = lm ? { shot, lm } : null;
      this.shotKey = key;
      this.fitCache = null;
      return this.shot;
    } finally {
      this.body.setPose(saved);
    }
  }

  /** Skin texture (with the face) and eye texture for the given base skin. */
  async compose(selfie: Selfie, skinTexture: string, strength: number): Promise<{ skin: HTMLCanvasElement; eyes: HTMLCanvasElement | null } | null> {
    const a = await this.avatarLandmarks(skinTexture);
    if (!a) return null;
    const fkey = this.shotKey + "|" + selfie.lm.length + selfie.lm[1][0];
    if (!this.fitCache || this.fitCache.key !== fkey) this.fitCache = { key: fkey, fit: fitFace(this.body, a.shot, a.lm, selfie.canvas, selfie.lm) };
    const base = await loadImg(this.baseUrl + skinTexture);
    const skin = composeSkin(this.body, base, selfie.canvas, this.fitCache.fit, strength);
    let eyes: HTMLCanvasElement | null = null;
    if (selfie.iris) {
      this.eyeBase ??= await loadImg(this.baseUrl + "tex/eyes.jpg");
      eyes = recolorEyes(this.eyeBase, selfie.iris);
    }
    return { skin, eyes };
  }

  /** Put a composed face on an avatar view (null = back to the plain skin, which the caller reloads). */
  static apply(av: AvatarView, c: { skin: HTMLCanvasElement; eyes: HTMLCanvasElement | null } | null): void {
    const tex = (cnv: HTMLCanvasElement) => { const t = new THREE.CanvasTexture(cnv); t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 8; return t; };
    if (c) {
      av.skinMaterial.map = tex(c.skin);
      av.skinMaterial.needsUpdate = true;
    }
    av.group.traverse((o) => {
      // the selfie brings its own eyebrows
      if (o.name === "eyebrows") o.visible = !c;
      if (o.name === "eyes") {
        const m = (o as THREE.Mesh).material as THREE.MeshPhysicalMaterial;
        const orig = (m.userData.origMap ??= m.map);
        m.map = c?.eyes ? tex(c.eyes) : orig;
        m.needsUpdate = true;
      }
    });
  }
}
