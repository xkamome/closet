// Browser side: run MediaPipe Pose Landmarker (with segmentation) on a full-body photo.

import type { Landmark, PhotoMeasureResult, Silhouette } from "./measureMath";
import { measureFromSilhouette } from "./measureMath";

let landmarkerPromise: Promise<any> | null = null;

async function getLandmarker(): Promise<any> {
  if (!landmarkerPromise) {
    landmarkerPromise = (async () => {
      const { FilesetResolver, PoseLandmarker } = await import("@mediapipe/tasks-vision");
      const base = new URL("mediapipe/wasm", document.baseURI).href;
      const fileset = await FilesetResolver.forVisionTasks(base);
      return PoseLandmarker.createFromOptions(fileset, {
        baseOptions: { modelAssetPath: new URL("models/pose_landmarker_full.task", document.baseURI).href, delegate: "CPU" },
        runningMode: "IMAGE",
        numPoses: 1,
        outputSegmentationMasks: true,
      });
    })();
  }
  return landmarkerPromise;
}

export interface Detection { silhouette: Silhouette; landmarks: Landmark[] | null }

export async function detectPerson(img: HTMLImageElement): Promise<Detection> {
  const lmk = await getLandmarker();
  const res = lmk.detect(img);
  const W = img.naturalWidth, H = img.naturalHeight;
  const mask = new Uint8Array(W * H);
  if (res.segmentationMasks?.length) {
    const m = res.segmentationMasks[0];
    const f: Float32Array = m.getAsFloat32Array();
    const mw = m.width, mh = m.height;
    for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
      mask[y * W + x] = f[Math.floor((y * mh) / H) * mw + Math.floor((x * mw) / W)] > 0.5 ? 1 : 0;
    }
    m.close?.();
  }
  const lm = res.landmarks?.[0]?.map((p: any) => ({ x: p.x * W, y: p.y * H, visibility: p.visibility })) ?? null;
  return { silhouette: { mask, width: W, height: H }, landmarks: lm };
}

export async function measureFromPhotos(front: HTMLImageElement, heightCm: number, side?: HTMLImageElement | null): Promise<PhotoMeasureResult> {
  const f = await detectPerson(front);
  if (!f.landmarks) throw new Error("照片中找不到人，請使用全身、正面、背景單純的照片。");
  const s = side ? await detectPerson(side) : null;
  return measureFromSilhouette(f.silhouette, f.landmarks, heightCm, s ? { s: s.silhouette, lm: s.landmarks } : undefined);
}

/** Start loading the pose model in the background (first photo is then much faster). */
export function preloadPoseModel(): void { getLandmarker().catch(() => { landmarkerPromise = null; }); }
