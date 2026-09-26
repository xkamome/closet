// 衣櫃: garments saved in IndexedDB (this browser only) so they can be worn again later.

import type { GarmentSpec } from "../garment/spec";
import type { Cutout } from "../garment/photo";
import type { PersonMarks } from "../garment/personPhoto";

export interface SavedGarment {
  id: string;
  name: string;
  createdAt: number;
  spec: GarmentSpec;
  plainBack: boolean;
  sizeText?: string;
  fabricText?: string;
  thumb: Blob; // PNG of the cut-out (or colour swatch)
  cutout?: Blob; // PNG with alpha (flat-lay photos)
  person?: { image: Blob; mask: Blob; marks: PersonMarks };
  color: [number, number, number];
}

const DB = "closet2", STORE = "wardrobe";

function open(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB, 1);
    req.onupgradeneeded = () => req.result.createObjectStore(STORE, { keyPath: "id" });
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

async function tx<T>(mode: IDBTransactionMode, fn: (s: IDBObjectStore) => IDBRequest<T>): Promise<T> {
  const db = await open();
  return new Promise((resolve, reject) => {
    const t = db.transaction(STORE, mode);
    const r = fn(t.objectStore(STORE));
    r.onsuccess = () => resolve(r.result);
    r.onerror = () => reject(r.error);
  });
}

export const wardrobe = {
  list: async (): Promise<SavedGarment[]> => ((await tx("readonly", (s) => s.getAll())) as SavedGarment[]).sort((a, b) => b.createdAt - a.createdAt),
  put: (g: SavedGarment) => tx("readwrite", (s) => s.put(g)),
  remove: (id: string) => tx("readwrite", (s) => s.delete(id)),
};

const toBlob = (c: HTMLCanvasElement) => new Promise<Blob>((res, rej) => c.toBlob((b) => (b ? res(b) : rej(new Error("toBlob failed"))), "image/png"));

async function blobToCanvas(b: Blob): Promise<HTMLCanvasElement> {
  const bmp = await createImageBitmap(b);
  const c = document.createElement("canvas");
  c.width = bmp.width; c.height = bmp.height;
  c.getContext("2d")!.drawImage(bmp, 0, 0);
  return c;
}

/** Serialize a worn garment. */
export async function packGarment(spec: GarmentSpec, cutout: Cutout | null, plainBack: boolean, extra: { sizeText?: string; fabricText?: string; name: string }): Promise<SavedGarment> {
  const thumbC = document.createElement("canvas");
  thumbC.width = thumbC.height = 96;
  const tctx = thumbC.getContext("2d")!;
  if (cutout) {
    const k = Math.min(96 / cutout.width, 96 / cutout.height);
    tctx.drawImage(cutout.canvas, (96 - cutout.width * k) / 2, (96 - cutout.height * k) / 2, cutout.width * k, cutout.height * k);
  } else {
    tctx.fillStyle = spec.color ?? "#999";
    tctx.fillRect(8, 8, 80, 80);
  }
  const g: SavedGarment = {
    id: crypto.randomUUID(), name: extra.name, createdAt: Date.now(), spec: structuredClone(spec), plainBack,
    sizeText: extra.sizeText, fabricText: extra.fabricText, thumb: await toBlob(thumbC),
    color: cutout?.color ?? [150, 150, 150],
  };
  if (cutout?.person) {
    const p = cutout.person;
    const mc = document.createElement("canvas");
    mc.width = p.image.width; mc.height = p.image.height;
    const mctx = mc.getContext("2d")!;
    const id = mctx.createImageData(mc.width, mc.height);
    for (let i = 0; i < p.mask.length; i++) { id.data[i * 4 + 3] = p.mask[i] ? 255 : 0; }
    mctx.putImageData(id, 0, 0);
    g.person = { image: await toBlob(p.image), mask: await toBlob(mc), marks: p.marks };
  } else if (cutout) {
    g.cutout = await toBlob(cutout.canvas);
  }
  return g;
}

/** Rebuild the Cutout of a saved garment. */
export async function unpackCutout(g: SavedGarment): Promise<Cutout | null> {
  if (g.person) {
    const image = await blobToCanvas(g.person.image);
    const mc = await blobToCanvas(g.person.mask);
    const md = mc.getContext("2d")!.getImageData(0, 0, mc.width, mc.height).data;
    const mask = new Uint8Array(mc.width * mc.height);
    for (let i = 0; i < mask.length; i++) mask[i] = md[i * 4 + 3] > 127 ? 1 : 0;
    const { cutoutFromMask } = await import("../garment/photo");
    return cutoutFromMask(image, mask, g.color, g.person.marks);
  }
  if (g.cutout) {
    const canvas = await blobToCanvas(g.cutout);
    const d = canvas.getContext("2d")!.getImageData(0, 0, canvas.width, canvas.height).data;
    const mask = new Uint8Array(canvas.width * canvas.height);
    for (let i = 0; i < mask.length; i++) mask[i] = d[i * 4 + 3] > 127 ? 1 : 0;
    const row = Math.round(canvas.height * 0.6), cx = Math.round(canvas.width / 2);
    let l = cx, r = cx;
    while (l > 0 && mask[row * canvas.width + l - 1]) l--;
    while (r < canvas.width - 1 && mask[row * canvas.width + r + 1]) r++;
    return { canvas, mask, width: canvas.width, height: canvas.height, color: g.color, torsoHalfWidth: Math.max(4, (r - l) / 2), centerX: (l + r) / 2 };
  }
  return null;
}
