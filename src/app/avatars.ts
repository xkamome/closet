// Saved avatars (我的假人): body measurements, fine-tune sliders, look, the selfie and the stance,
// kept under a name in this browser, and exported / imported as a .json file for backup.

export interface AvatarSnapshot {
  targets: Record<string, number>;
  weight?: number;
  extra?: Record<string, number>;
  skin: string;
  skinTint: string;
  hair: string;
  hairColor: string;
  /** JPEG data URL of the selfie, if a face was put on */
  face?: string | null;
  faceStrength?: number;
  stance?: number;
}

export interface SavedAvatar { id: string; name: string; savedAt: number; snapshot: AvatarSnapshot }

const KEY = "closet2.avatars";

export const avatars = {
  list(): SavedAvatar[] {
    try { return (JSON.parse(localStorage.getItem(KEY) ?? "[]") as SavedAvatar[]).sort((a, b) => b.savedAt - a.savedAt); } catch { return []; }
  },
  /** save under a name (the same name overwrites); throws when the browser storage is full */
  save(name: string, snapshot: AvatarSnapshot): SavedAvatar {
    const list = avatars.list().filter((a) => a.name !== name);
    const a: SavedAvatar = { id: crypto.randomUUID(), name, savedAt: Date.now(), snapshot };
    localStorage.setItem(KEY, JSON.stringify([a, ...list]));
    return a;
  },
  remove(id: string): void {
    try { localStorage.setItem(KEY, JSON.stringify(avatars.list().filter((a) => a.id !== id))); } catch { /* ignore */ }
  },
};

export function exportAvatar(a: SavedAvatar): Blob {
  return new Blob([JSON.stringify({ app: "closet2-avatar", version: 1, ...a }, null, 1)], { type: "application/json" });
}

/** Parse an exported file; throws with a readable message when it isn't one. */
export function parseAvatarFile(text: string): { name: string; snapshot: AvatarSnapshot } {
  let d: any;
  try { d = JSON.parse(text); } catch { throw new Error("不是假人檔案（無法讀取 JSON）"); }
  if (d?.app !== "closet2-avatar" || !d.snapshot?.targets) throw new Error("不是這個 App 匯出的假人檔案");
  return { name: String(d.name ?? "匯入的假人"), snapshot: d.snapshot };
}
