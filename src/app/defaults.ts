// Default wardrobe: a starter set of garments (drawn flat-lay photos) added to an empty 衣櫃.
// They are stored as presets (type + cut), so they are sized for whichever body wears them.

import { cutoutGarment } from "../garment/photo";
import type { GarmentType, StyleChoice } from "../garment/spec";
import { makeSample, type SampleId } from "../look/sampleGen";
import { drawDesign, type Design } from "../look/designer";
import { wardrobe, type SavedGarment } from "./wardrobe";

export type Preset = StyleChoice & { type: GarmentType };

interface DefaultItem { id: string; name: string; sample?: SampleId; design?: Design; preset: Preset; fabricText: string; /** version that added it */ since?: string }

export const DEFAULT_ITEMS: DefaultItem[] = [
  { id: "default-tee", name: "印花 T 恤", sample: "graphicTee", fabricText: "棉100% 針織",
    preset: { type: "top", sleeve: "short", neckline: "crew", silhouette: "straight", rise: "natural" } },
  { id: "default-stripe", name: "條紋長袖上衣", sample: "stripeLong", fabricText: "棉95% 彈性纖維5% 針織",
    preset: { type: "top", sleeve: "long", neckline: "crew", silhouette: "straight", rise: "natural" } },
  { id: "default-tank", name: "羅紋背心", sample: "ribTank", fabricText: "棉92% 彈性纖維8% 羅紋針織",
    preset: { type: "top", sleeve: "none", neckline: "scoop", silhouette: "fitted", rise: "natural" } },
  { id: "default-dress", name: "碎花洋裝", sample: "floralDress", fabricText: "嫘縈100% 梭織",
    preset: { type: "dress", sleeve: "short", neckline: "crew", silhouette: "aline", rise: "natural" } },
  { id: "default-skirt", name: "格紋 A 字裙", sample: "plaidSkirt", fabricText: "聚酯纖維65% 嫘縈35% 梭織",
    preset: { type: "skirt", sleeve: "none", neckline: "crew", silhouette: "aline", rise: "natural" } },
  { id: "default-jeans", name: "直筒牛仔褲", sample: "denim", fabricText: "棉98% 彈性纖維2% 牛仔布",
    preset: { type: "pants", sleeve: "none", neckline: "crew", silhouette: "straight", rise: "natural" } },
];

const toBlob = (c: HTMLCanvasElement) => new Promise<Blob>((res, rej) => c.toBlob((b) => (b ? res(b) : rej(new Error("toBlob failed"))), "image/png"));

/** Serialize a drawn flat-lay (cut out) as a wardrobe preset item. */
export async function packPreset(id: string, name: string, image: HTMLCanvasElement, preset: Preset, fabricText: string, createdAt = Date.now()): Promise<SavedGarment> {
  const c = cutoutGarment(image);
  const thumb = document.createElement("canvas");
  thumb.width = thumb.height = 96;
  const k = Math.min(96 / c.width, 96 / c.height);
  thumb.getContext("2d")!.drawImage(c.canvas, (96 - c.width * k) / 2, (96 - c.height * k) / 2, c.width * k, c.height * k);
  return {
    id, name, createdAt, plainBack: false, fabricText, preset,
    // spec is rebuilt for the current body when worn (see preset); this copy only describes the item
    spec: { type: preset.type, sleeve: preset.sleeve, neckline: preset.neckline, silhouette: preset.silhouette, rise: preset.rise, m: {}, fabric: null as any },
    thumb: await toBlob(thumb), cutout: await toBlob(c.canvas), color: c.color,
  };
}

/** Add the starter set once (first visit, or when asked again). Existing items are kept. */
/** bump when DEFAULT_ITEMS change: stored copies are refreshed, new items added */
const DEFAULTS_VERSION = "2";

export async function seedDefaults(force = false): Promise<number> {
  const KEY = "closet2.defaultsSeeded";
  let stored: string | null = null;
  try { stored = localStorage.getItem(KEY); } catch { /* storage unavailable: seed anyway */ }
  if (!force && stored === DEFAULTS_VERSION) return 0;
  const upgrade = !!stored && stored !== DEFAULTS_VERSION;
  const have = new Set((await wardrobe.list()).map((g) => g.id));
  let n = 0;
  // oldest first, so the list shows them in this order under newer items
  const base = Date.now() - DEFAULT_ITEMS.length * 1000;
  for (const [i, it] of DEFAULT_ITEMS.entries()) {
    // stored items are refreshed on an upgrade; an item the user deleted stays deleted, unless it is
    // new in this version or they asked for the defaults back
    const add = have.has(it.id) ? upgrade || force : !stored || force || (upgrade && it.since === DEFAULTS_VERSION);
    if (!add) continue;
    await wardrobe.put(await packPreset(it.id, it.name, it.sample ? makeSample(it.sample) : drawDesign(it.design!), it.preset, it.fabricText, base + (DEFAULT_ITEMS.length - i) * 1000));
    n++;
  }
  try { localStorage.setItem(KEY, DEFAULTS_VERSION); } catch { /* ignore */ }
  return n;
}
