// MediaPipe selfie multiclass segmentation: 0 background, 1 hair, 2 body skin, 3 face skin, 4 clothes, 5 others.

let segPromise: Promise<any> | null = null;

async function getSegmenter(): Promise<any> {
  if (!segPromise) {
    segPromise = (async () => {
      const { FilesetResolver, ImageSegmenter } = await import("@mediapipe/tasks-vision");
      const fileset = await FilesetResolver.forVisionTasks(new URL("mediapipe/wasm", document.baseURI).href);
      return ImageSegmenter.createFromOptions(fileset, {
        baseOptions: { modelAssetPath: new URL("models/selfie_multiclass_256x256.tflite", document.baseURI).href, delegate: "CPU" },
        runningMode: "IMAGE",
        outputCategoryMask: true,
        outputConfidenceMasks: false,
      });
    })();
  }
  return segPromise;
}

export const SEG = { background: 0, hair: 1, body: 2, face: 3, clothes: 4, other: 5 } as const;

/** Per-pixel class labels at the image's natural resolution. */
export async function segmentPerson(img: HTMLImageElement | HTMLCanvasElement): Promise<Uint8Array> {
  const seg = await getSegmenter();
  const res = seg.segment(img);
  const W = "naturalWidth" in img ? img.naturalWidth : img.width;
  const H = "naturalHeight" in img ? img.naturalHeight : img.height;
  const m = res.categoryMask;
  const src: Uint8Array = m.getAsUint8Array();
  const mw = m.width, mh = m.height;
  const out = new Uint8Array(W * H);
  for (let y = 0; y < H; y++) {
    const sy = Math.min(mh - 1, Math.floor((y * mh) / H));
    for (let x = 0; x < W; x++) out[y * W + x] = src[sy * mw + Math.min(mw - 1, Math.floor((x * mw) / W))];
  }
  m.close?.();
  res.close?.();
  return out;
}
