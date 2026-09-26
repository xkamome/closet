#!/usr/bin/env node
// Harness Constitution Article I — scope of authority (file boundary).
// PreToolUse hook for Write|Edit|NotebookEdit|Read.
// Usage (wired by apply.ps1): node path-guard.mjs "<projectRoot>"

import path from "node:path";
import process from "node:process";
import {
  readHookInput,
  preToolDecision,
  loadConfig,
  isInside,
  allowedWriteRoots,
  allowedReadRoots,
} from "./guard-lib.mjs";

if (process.env.HARNESS_JUDGE === "1") process.exit(0);

const projectRoot = process.argv[2];
if (!projectRoot) process.exit(0);

const input = await readHookInput();
if (!input) process.exit(0);

const tool = input.tool_name || "";
const filePath =
  input.tool_input?.file_path || input.tool_input?.notebook_path || "";
if (!filePath) process.exit(0);

const resolved = path.resolve(input.cwd || projectRoot, filePath);
const cfg = loadConfig(projectRoot);

// Article I.4 — secrets are off-limits everywhere, even inside the project.
const SECRET_RE =
  /(^|[\\/])(\.env(?!\.(example|template|sample))(\.[^\\/]*)?|id_rsa[^\\/]*|id_ed25519[^\\/]*|[^\\/]*credentials[^\\/]*)$|(^|[\\/])\.ssh([\\/]|$)/i;
if (SECRET_RE.test(resolved)) {
  preToolDecision(
    "deny",
    `[harness 憲法 I.4] 禁止存取秘密檔案：${resolved}。金鑰/憑證不進 loop。`
  );
  process.exit(0);
}

const WRITE_TOOLS = new Set(["Write", "Edit", "NotebookEdit"]);

if (WRITE_TOOLS.has(tool)) {
  if (!allowedWriteRoots(projectRoot).some((r) => isInside(resolved, r))) {
    preToolDecision(
      "deny",
      `[harness 憲法 I.1] 禁止寫入專案外路徑：${resolved}。可寫範圍＝專案根目錄（${projectRoot}）與暫存區。`
    );
  }
  process.exit(0);
}

if (tool === "Read") {
  if (!allowedReadRoots(projectRoot).some((r) => isInside(resolved, r))) {
    if (cfg.mode === "unattended") {
      preToolDecision(
        "deny",
        `[harness 憲法 I.3] unattended 模式禁止讀取專案外路徑：${resolved}。需要的參考資料請事先複製進專案。`
      );
    } else {
      preToolDecision(
        "ask",
        `[harness 憲法 I.3] 要求讀取專案外路徑：${resolved}。請人類確認。`
      );
    }
  }
  process.exit(0);
}

process.exit(0);
