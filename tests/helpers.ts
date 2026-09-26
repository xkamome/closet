import fs from "node:fs";
import { parseAvatar, type AvatarData } from "../src/avatar/data";

let cached: AvatarData | null = null;
export function loadTestAvatar(): AvatarData {
  if (cached) return cached;
  const meta = JSON.parse(fs.readFileSync("public/avatar/avatar.json", "utf8"));
  const buf = fs.readFileSync("public/avatar/avatar.bin");
  const ab = buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength);
  cached = parseAvatar(meta, ab as ArrayBuffer);
  return cached;
}
