// Copies MediaPipe WASM runtime into public/ and downloads the pose / face / segmentation models,
// so the app works offline after setup.
import fs from "node:fs";
import path from "node:path";

const wasmSrc = "node_modules/@mediapipe/tasks-vision/wasm";
const wasmDst = "public/mediapipe/wasm";
fs.mkdirSync(wasmDst, { recursive: true });
for (const f of fs.readdirSync(wasmSrc)) fs.copyFileSync(path.join(wasmSrc, f), path.join(wasmDst, f));
console.log("wasm ->", wasmDst);

const models = {
  "public/models/pose_landmarker_full.task":
    "https://storage.googleapis.com/mediapipe-models/pose_landmarker/pose_landmarker_full/float16/latest/pose_landmarker_full.task",
  "public/models/face_landmarker.task":
    "https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/latest/face_landmarker.task",
  "public/models/selfie_multiclass_256x256.tflite":
    "https://storage.googleapis.com/mediapipe-models/image_segmenter/selfie_multiclass_256x256/float32/latest/selfie_multiclass_256x256.tflite",
};
for (const [dst, url] of Object.entries(models)) {
  if (fs.existsSync(dst) && fs.statSync(dst).size > 0) continue;
  fs.mkdirSync(path.dirname(dst), { recursive: true });
  const r = await fetch(url);
  if (!r.ok) throw new Error(`download failed ${url}: ${r.status}`);
  fs.writeFileSync(dst, Buffer.from(await r.arrayBuffer()));
  console.log("model ->", dst);
}
