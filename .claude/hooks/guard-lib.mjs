// Shared helpers for loop-harness hooks. Harness Constitution: _docs/harness-constitution.md
import fs from "node:fs";
import path from "node:path";
import process from "node:process";

export async function readHookInput() {
  const chunks = [];
  for await (const c of process.stdin) chunks.push(c);
  try {
    return JSON.parse(Buffer.concat(chunks).toString("utf8").replace(/^﻿/, ""));
  } catch {
    return null;
  }
}

export function preToolDecision(decision, reason) {
  console.log(
    JSON.stringify({
      hookSpecificOutput: {
        hookEventName: "PreToolUse",
        permissionDecision: decision,
        permissionDecisionReason: reason,
      },
    })
  );
}

const CONFIG_DEFAULTS = {
  mode: "attended", // attended | unattended
  maxIterations: 20,
  verify: [], // e.g. ["node verify/verify.mjs", "node verify/browser-check.mjs"]
  verifyTimeoutMs: 300000,
  judge: { enabled: false, model: "claude-haiku-4-5" },
  allowedInstalls: [], // package names the loop may install
};

export function loadConfig(projectRoot) {
  try {
    const raw = JSON.parse(
      fs
        .readFileSync(path.join(projectRoot, "loop.config.json"), "utf8")
        .replace(/^﻿/, "")
    );
    return {
      ...CONFIG_DEFAULTS,
      ...raw,
      judge: { ...CONFIG_DEFAULTS.judge, ...(raw.judge || {}) },
    };
  } catch {
    return { ...CONFIG_DEFAULTS };
  }
}

export function isInside(child, parent) {
  const rel = path.relative(path.resolve(parent), path.resolve(child));
  return rel === "" || (!rel.startsWith("..") && !path.isAbsolute(rel));
}

export function allowedWriteRoots(projectRoot) {
  const roots = [projectRoot];
  for (const v of [process.env.TEMP, process.env.TMP, process.env.TMPDIR]) {
    if (v) roots.push(v);
  }
  if (process.env.LOCALAPPDATA) roots.push(path.join(process.env.LOCALAPPDATA, "Temp"));
  return roots;
}

export function allowedReadRoots(projectRoot) {
  const roots = allowedWriteRoots(projectRoot);
  const home = process.env.USERPROFILE || process.env.HOME;
  if (home) roots.push(path.join(home, ".claude"));
  return roots;
}

// ---- catastrophic command rules ----
// Keep in sync with the global floor: ~/.claude/hooks/bash-guard.mjs
// (duplicated so the template works on machines without the global layer)

const DANGEROUS_TARGET = new RegExp(
  [
    String.raw`^/+\*?$`,
    String.raw`^~[/\\]?\*?$`,
    String.raw`^\$HOME[/\\]?\*?$`,
    String.raw`^%USERPROFILE%[/\\]?\*?$`,
    String.raw`^\$env:USERPROFILE[/\\]?\*?$`,
    String.raw`^[A-Za-z]:[/\\]?\*?$`,
    String.raw`^[A-Za-z]:[/\\](Users|Windows|Program Files( \(x86\))?|ProgramData)[/\\]?\*?$`,
    String.raw`^[A-Za-z]:[/\\]Users[/\\][^/\\]+[/\\]?\*?$`,
  ].join("|"),
  "i"
);

export const RECURSIVE_DELETE =
  /\b(rm\s+(-[a-z]+\s+)*-[a-z]*[rf][a-z]*\s|rd\s+\/s|rmdir\s+\/s|del\s+\/[sq]|remove-item\b[^\n|;]*(-recurse|-force))/i;

const CATASTROPHIC_RULES = [
  { re: /--no-preserve-root/i, why: "rm --no-preserve-root (catastrophic delete)" },
  { re: /\bmkfs(\.\w+)?\b/i, why: "mkfs：格式化檔案系統" },
  { re: /\bformat-volume\b/i, why: "Format-Volume：格式化磁碟區" },
  { re: /\bformat\s+[a-z]:/i, why: "format：格式化磁碟區" },
  { re: /\bdd\b[^\n]*\bof=\/dev\//i, why: "dd 直寫裝置" },
  {
    re: /\b(curl|wget|iwr|invoke-webrequest)\b[^|\n]*\|\s*(sudo\s+)?(bash|sh|zsh|iex|invoke-expression|powershell|pwsh)\b/i,
    why: "pipe-to-shell：下載內容直接執行 (supply-chain risk)",
  },
  { re: /\biex\s*\(\s*(iwr|invoke-webrequest)\b/i, why: "iex(iwr ...)：下載內容直接執行" },
  { re: /:\(\)\s*\{\s*:\s*\|\s*:\s*&\s*\}\s*;/, why: "fork bomb" },
  { re: /\breg\s+delete\s+("?HKLM|"?HKEY_LOCAL_MACHINE)/i, why: "遞迴刪除 HKLM 登錄" },
  { re: /remove-item\b[^\n|;]*\bHKLM:/i, why: "遞迴刪除 HKLM 登錄" },
];

/** Return a reason string if the command is catastrophic, else null. */
export function judgeCatastrophic(cmd) {
  if (!cmd || typeof cmd !== "string") return null;
  const flat = cmd.replace(/\s+/g, " ");
  for (const rule of CATASTROPHIC_RULES) {
    if (rule.re.test(flat)) return rule.why;
  }
  if (RECURSIVE_DELETE.test(flat)) {
    for (const t of pathishTokens(flat)) {
      if (DANGEROUS_TARGET.test(t)) {
        return `遞迴刪除危險目標「${t}」(recursive delete of protected root)`;
      }
    }
  }
  return null;
}

/** Rough tokenizer: unquoted, non-flag tokens that could be paths. */
export function pathishTokens(flat) {
  return flat
    .split(/\s+/)
    .map((t) => t.replace(/^["']|["']$/g, ""))
    .filter((t) => t && !t.startsWith("-") && !/^\/[sqfa]$/i.test(t));
}
