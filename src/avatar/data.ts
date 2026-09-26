// Loads the baked avatar (public/avatar/avatar.json + avatar.bin) into typed arrays.
// Pure data — no three.js — so tests can load it in Node.

export interface BufferRef { offset: number; length: number; type: "f32" | "u32" | "u16" | "u8" | "i32" }

export interface MorphData { name: string; label: string; idx: Uint32Array; delta: Float32Array }

export interface BoneDef { name: string; parent: number; head: number; tail: number; plane: number[] | null }

export interface ProxyData {
  name: string;
  label: string;
  texture: string | null;
  scale: { x_scale: [number, number, number]; y_scale: [number, number, number]; z_scale: [number, number, number] };
  refIdx: Uint32Array;
  refW: Float32Array;
  refOff: Float32Array;
  uv: Float32Array;
  index: Uint32Array;
  skinIdx: Uint16Array;
  skinW: Float32Array;
}

export interface AvatarData {
  vertexCount: number;
  bodyVertexCount: number;
  base: Float32Array;
  morphs: Map<string, MorphData>;
  morphLabels: Map<string, string>;
  body: { src: Uint32Array; uv: Float32Array; index: Uint32Array; skinIdx: Uint16Array; skinW: Float32Array };
  bones: BoneDef[];
  joints: number[][];
  jointNames: string[];
  hair: ProxyData[];
  extras: ProxyData[];
  skins: { name: string; label: string; texture: string }[];
  poses: Record<string, Record<string, [number, number, number, number]>>;
}

export function parseAvatar(meta: any, bin: ArrayBuffer): AvatarData {
  const get = (name: string): any => {
    const b: BufferRef = meta.buffers[name];
    if (!b) throw new Error(`avatar buffer missing: ${name}`);
    switch (b.type) {
      case "f32": return new Float32Array(bin, b.offset, b.length);
      case "u32": return new Uint32Array(bin, b.offset, b.length);
      case "u16": return new Uint16Array(bin, b.offset, b.length);
      case "u8": return new Uint8Array(bin, b.offset, b.length);
      case "i32": return new Int32Array(bin, b.offset, b.length);
    }
  };
  const proxy = (p: any): ProxyData => ({
    name: p.name, label: p.label, texture: p.texture, scale: p.scale,
    refIdx: get(p.refIdx), refW: get(p.refW), refOff: get(p.refOff), uv: get(p.uv),
    index: get(p.index), skinIdx: get(p.skinIdx), skinW: get(p.skinW),
  });
  const morphs = new Map<string, MorphData>();
  const morphLabels = new Map<string, string>();
  for (const m of meta.morphs) {
    morphs.set(m.name, { name: m.name, label: m.label, idx: get(m.idx), delta: get(m.delta) });
    morphLabels.set(m.name.replace(/[+-]$/, ""), m.label);
  }
  return {
    vertexCount: meta.vertexCount,
    bodyVertexCount: meta.bodyVertexCount,
    base: get(meta.base),
    morphs,
    morphLabels,
    body: {
      src: get(meta.body.src), uv: get(meta.body.uv), index: get(meta.body.index),
      skinIdx: get(meta.body.skinIdx), skinW: get(meta.body.skinW),
    },
    bones: meta.skeleton.bones,
    joints: meta.skeleton.joints,
    jointNames: meta.skeleton.jointNames,
    hair: meta.hair.map(proxy),
    extras: meta.extras.map(proxy),
    skins: meta.skin.options,
    poses: meta.poses,
  };
}

export async function loadAvatar(baseUrl = "avatar/"): Promise<AvatarData> {
  const [meta, bin] = await Promise.all([
    fetch(baseUrl + "avatar.json").then((r) => r.json()),
    fetch(baseUrl + "avatar.bin").then((r) => r.arrayBuffer()),
  ]);
  return parseAvatar(meta, bin);
}
