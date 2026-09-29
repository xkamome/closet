// "Look" display modes for the app: the same body and worn garments, rebuilt as front-view look
// garments and drawn by the LookRenderer on a canvas laid over the 3D viewport.

import type { Body } from "../avatar/body";
import type { BodyMeasurer, Measurements } from "../avatar/measure";
import { lookPose } from "./pose";
import type { Cutout } from "../garment/photo";
import type { GarmentSpec } from "../garment/spec";
import { DEFAULT_FABRIC } from "../fit/fabric";
import { buildFrame } from "./frame";
import { buildLookGarment, type LookGarment } from "./pattern";
import { bleedImage, mapPerson, mapPhoto, personTexture } from "./photoMap";
import { MyFace } from "../face/myFace";
import { fabricSwatch, LookRenderer, type DressedGarment, type LookStyle, type PieceTexture } from "./render";

export interface LookWorn { spec: GarmentSpec; cutout: Cutout | null; /** draw order, inner to outer (default: bottoms, then tops) */ layer?: number }

export const LOOK_LABELS: Record<LookStyle, string> = {
  photo: "寫真",
};

const bleedCache = new WeakMap<object, HTMLCanvasElement>();

export class LookMode {
  readonly canvas: HTMLCanvasElement;
  private r: LookRenderer | null = null;
  style: LookStyle = "photo";
  lastMs = 0;
  private readyP: Promise<void> | null = null;

  constructor(private readonly host: HTMLElement, private readonly body: Body, private readonly measurer: BodyMeasurer) {
    this.canvas = document.createElement("canvas");
    this.canvas.id = "look-canvas";
    this.canvas.hidden = true;
    host.appendChild(this.canvas);
    new ResizeObserver(() => { if (!this.canvas.hidden) this.resize(); }).observe(host);
  }

  get active(): boolean { return !this.canvas.hidden; }

  private size(): [number, number] {
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    return [Math.max(2, Math.round(this.host.clientWidth * dpr)), Math.max(2, Math.round(this.host.clientHeight * dpr))];
  }

  private ensure(): LookRenderer {
    if (!this.r) {
      const [w, h] = this.size();
      this.r = new LookRenderer(this.body, w, h, this.canvas);
      this.readyP = this.r.ready();
    }
    return this.r;
  }

  private resize(): void {
    if (!this.r) return;
    const [w, h] = this.size();
    if (w === this.r.width && h === this.r.height) return;
    this.r.resize(w, h);
    this.r.render();
  }

  hide(): void { this.canvas.hidden = true; }

  setLook(skin: string, tint: string, hair: string | null, hairColor: string): void {
    const r = this.ensure();
    r.avatar.setSkin(skin, tint);
    r.avatar.setHair(hair);
    r.avatar.setHairColor(hairColor);
    if (this.face) MyFace.apply(r.avatar, this.face);
  }

  private face: { skin: HTMLCanvasElement; eyes: HTMLCanvasElement | null } | null = null;
  /** The user's face on the look avatar (null = plain avatar; call setLook afterwards to reload the skin). */
  setFace(c: { skin: HTMLCanvasElement; eyes: HTMLCanvasElement | null } | null): void {
    this.face = c;
    if (this.r) MyFace.apply(this.r.avatar, c);
  }

  /** Rebuild and draw. The body is posed standing for the look and put back afterwards. */
  async show(style: LookStyle, meas: Measurements, worn: LookWorn[], opts: { underwear: boolean; half: boolean; heat: boolean; stance?: number }): Promise<void> {
    const t0 = performance.now();
    this.style = style;
    const r = this.ensure();
    this.canvas.hidden = false;
    this.resize();
    const savedPose = this.body.pose;
    lookPose(this.body, 0.22, opts.stance ?? 1);
    r.syncBody();
    const frame = buildFrame(this.body, this.measurer, meas, r.avatar.posedBodyPositions);
    this.body.setPose(savedPose);

    const list = [...worn];
    const has = (t: string[]) => list.some((w) => t.includes(w.spec.type));
    if (opts.underwear && !has(["skirt", "pants", "dress"])) list.push({ spec: briefSpec(meas), cutout: null });
    if (opts.underwear && !has(["top", "dress"])) list.push({ spec: braSpec(meas), cutout: null });
    const lay = (w: LookWorn) => ((w.spec as any).__underwear ? 0 : w.layer ?? layer(w.spec));
    const order = list.map((_, i) => i).sort((a, b) => lay(list[a]) - lay(list[b]));
    const dressed: DressedGarment[] = [];
    const under: LookGarment[] = [];
    for (const i of order) {
      const w = list[i];
      const g = buildLookGarment(w.spec, frame, { over: [...under] });
      // every later (outer) garment stays outside this one
      under.push(g);
      dressed.push({ garment: g, textures: this.textures(g, w, frame), layer: lay(w), heat: opts.heat && !(w.spec as any).__underwear });
    }
    r.setGarments(dressed);
    r.setStyle(style);
    // leave room for the toolbar above the head
    if (opts.half) r.frame(frame.y.hip - 0.04, frame.y.top + 0.1);
    else r.frame(-0.05, frame.y.top + 0.2);
    await this.readyP;
    // skins / hair may have been swapped since the last draw: wait for their textures
    await r.ready();
    r.render();
    this.lastMs = performance.now() - t0;
  }

  private textures(g: LookGarment, w: LookWorn, frame: ReturnType<typeof buildFrame>): PieceTexture[] {
    const c = w.cutout;
    if (c?.person) {
      let img = bleedCache.get(c.person);
      if (!img) { img = personTexture(c.person); bleedCache.set(c.person, img); }
      return mapPerson(g, c.person, frame, img);
    }
    if (c) {
      let img = bleedCache.get(c);
      if (!img) { img = bleedImage(c.canvas); bleedCache.set(c, img); }
      return mapPhoto(g, c, img);
    }
    const color = w.spec.color ?? "#9aa7b8";
    const sw = fabricSwatch(color, w.spec.fabric.structure === "knit");
    return g.pieces.map(() => ({ image: sw, uv: null, color, repeat: 24 }));
  }
}

const layer = (s: GarmentSpec) => ((s as any).__underwear ? 0 : s.type === "top" ? 2 : 1);

function briefSpec(m: Measurements): GarmentSpec {
  const knit = { ...DEFAULT_FABRIC, structure: "knit" as const, stretch: 0.3, drape: 0.6, thickness: 0.0012, sheen: 0.35, label: "彈性針織" };
  const s: GarmentSpec = {
    type: "skirt", sleeve: "none", neckline: "crew", silhouette: "fitted", rise: "low", fabric: knit, color: "#e9d6c8",
    m: { waist: m.waist + 1, hip: m.hips - 1, hem: m.hips - 1, length: Math.max(8, m.waistY - 6 - (m.crotchY - 2)) },
  };
  (s as any).__underwear = true;
  return s;
}

function braSpec(m: Measurements): GarmentSpec {
  const knit = { ...DEFAULT_FABRIC, structure: "knit" as const, stretch: 0.3, drape: 0.6, thickness: 0.0012, sheen: 0.35, label: "彈性針織" };
  const s: GarmentSpec = {
    type: "top", sleeve: "none", neckline: "scoop", silhouette: "fitted", rise: "natural", fabric: knit, color: "#e9d6c8",
    m: { chest: m.bust - 1, waist: m.underbust - 2, length: Math.max(12, m.neckY - m.bustY + 9) },
  };
  (s as any).__underwear = true;
  return s;
}
