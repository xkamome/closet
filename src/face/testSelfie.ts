// Synthetic "selfies" for testing the face feature without real people's photos: a differently shaped
// MakeHuman face (another ethnicity morph, skin and hair) photographed from the front with a
// perspective camera and soft light, cropped like a phone selfie.

import * as THREE from "three";
import type { AvatarData } from "../avatar/data";
import { Body } from "../avatar/body";
import { AvatarView } from "../viewer/avatarView";

export async function makeTestSelfie(data: AvatarData, kind: "caucasian" | "african", size = 720): Promise<HTMLCanvasElement> {
  const body = new Body(data);
  body.setMorphs(kind === "caucasian" ? { "race-caucasian": 1, weight: -0.2 } : { "race-african": 1, weight: 0.2 });
  body.setPose({});
  const renderer = new THREE.WebGLRenderer({ antialias: true, preserveDrawingBuffer: true });
  renderer.setSize(size, Math.round(size * 1.25), false);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.NeutralToneMapping;
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(kind === "caucasian" ? 0x8fa3b8 : 0xb8a58f);
  const av = new AvatarView(body);
  av.setSkin(kind === "caucasian" ? "young_caucasian_female" : "young_african_female");
  av.setHair(kind === "caucasian" ? "hair_long01" : "hair_ponytail01");
  av.setHairColor(kind === "caucasian" ? "#8a5a2b" : "#1a1210");
  scene.add(av.group);
  scene.add(new THREE.HemisphereLight(0xffffff, 0x8a7f73, 1.3));
  const key = new THREE.DirectionalLight(0xfff2e6, 1.6);
  key.position.set(-0.8, 1.0, 1.6);
  scene.add(key);
  for (let i = 0; i < 200; i++) {
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
  const cam = new THREE.PerspectiveCamera(28, 1 / 1.25, 0.05, 10);
  cam.position.set(head.x, head.y + 0.08, 0.95);
  cam.lookAt(head.x, head.y + 0.05, 0);
  renderer.render(scene, cam);
  const c = document.createElement("canvas");
  c.width = size; c.height = Math.round(size * 1.25);
  c.getContext("2d")!.drawImage(renderer.domElement, 0, 0);
  renderer.dispose();
  renderer.forceContextLoss();
  return c;
}
