#!/usr/bin/env node
// Harness Constitution Article II.2–3 — loop-mode strict command guard.
// PreToolUse hook for Bash|PowerShell. Includes the catastrophic floor (II.1)
// so the template is self-contained on machines without the global layer.
// Usage (wired by apply.ps1): node bash-guard-strict.mjs "<projectRoot>"

import path from "node:path";
import process from "node:process";
import {
  readHookInput,
  preToolDecision,
  loadConfig,
  isInside,
  judgeCatastrophic,
  pathishTokens,
  RECURSIVE_DELETE,
} from "./guard-lib.mjs";

if (process.env.HARNESS_JUDGE === "1") process.exit(0);

const projectRoot = process.argv[2];
if (!projectRoot) process.exit(0);

const input = await readHookInput();
if (!input) process.exit(0);
if (input.tool_name !== "Bash" && input.tool_name !== "PowerShell") process.exit(0);

const cmd = input.tool_input?.command || "";
const flat = cmd.replace(/\s+/g, " ");
const cwd = input.cwd || projectRoot;
const cfg = loadConfig(projectRoot);
const unattended = cfg.mode === "unattended";

function deny(why) {
  preToolDecision("deny", `[harness 憲法 II loop 模式] ${why}`);
  process.exit(0);
}
function escalate(why) {
  if (unattended) deny(`${why}（unattended 模式一律拒絕）`);
  preToolDecision("ask", `[harness 憲法 II loop 模式] ${why}。請人類確認。`);
  process.exit(0);
}

// --- II.1 catastrophic floor ---
const cat = judgeCatastrophic(cmd);
if (cat) deny(cat);

// --- II.2 bulk-discard git commands: denied in every mode ---
const GIT_DENY = [
  { re: /\bgit\s+reset\s+--hard\b/i, why: "git reset --hard：批量丟棄工作成果" },
  { re: /\bgit\s+clean\s+-[a-z]*f/i, why: "git clean -f：刪除未追蹤檔案" },
  { re: /\bgit\s+checkout\s+(--\s+)?\.(\s|$)/i, why: "git checkout .：批量丟棄未提交變更" },
  { re: /\bgit\s+restore\s+\.(\s|$)/i, why: "git restore .：批量丟棄未提交變更" },
  { re: /\bgit\s+push\b[^\n]*(\s--force\b|\s-f\b)/i, why: "force push：改寫遠端歷史" },
  { re: /\bgit\s+branch\s+-D\b/i, why: "git branch -D：強制刪除分支" },
];
for (const rule of GIT_DENY) {
  if (rule.re.test(flat)) deny(rule.why);
}

// --- recursive delete / redirection escaping the project root: denied ---
if (RECURSIVE_DELETE.test(flat)) {
  for (const t of pathishTokens(flat)) {
    if (!/^([A-Za-z]:[\\/]|\\\\|\/|\.|~)/.test(t) && !t.includes("/") && !t.includes("\\"))
      continue; // not path-like
    const resolved = path.resolve(cwd, t.replace(/^~([\\/]|$)/, `${process.env.USERPROFILE || ""}$1`));
    if (!isInside(resolved, projectRoot)) {
      deny(`遞迴刪除指向專案外路徑：${resolved}`);
    }
  }
}

const REDIRECT_RE =
  /(?:>>?|\|\s*(?:out-file|set-content|tee)(?:\s+-\w+)*)\s*["']?([A-Za-z]:[\\/][^\s"'|;]+|\/[^\s"'|;]+)/gi;
let m;
while ((m = REDIRECT_RE.exec(flat)) !== null) {
  const resolved = path.resolve(cwd, m[1]);
  if (!isInside(resolved, projectRoot)) {
    deny(`輸出重導向指向專案外路徑：${resolved}`);
  }
}

// --- II.3 escalated actions: ask (attended) / deny (unattended) ---
if (/\bgit\s+push\b/i.test(flat)) {
  escalate("git push：把內容送出本機屬對外發布");
}

const INSTALL_RE =
  /\b(?:npm|pnpm|yarn)\s+(?:install|i|add)\s+(?!$)((?:-[^\s]+\s+)*)([^\s-][^\n]*)|\bpip3?\s+install\s+([^\n]+)/i;
const im = flat.match(INSTALL_RE);
if (im) {
  const pkgs = (im[2] || im[3] || "")
    .split(/\s+/)
    .filter((p) => p && !p.startsWith("-"))
    .filter((p) => p !== "." && !/\.txt$/i.test(p)) // pip install -e . / -r requirements.txt = restoring declared deps
    .map((p) => p.replace(/@[\d^~x.*]+$/, "").toLowerCase());
  const allowed = (cfg.allowedInstalls || []).map((p) => p.toLowerCase());
  const outside = pkgs.filter((p) => !allowed.includes(p));
  if (outside.length > 0) {
    escalate(`安裝允許清單外的套件：${outside.join(", ")}（allowlist 在 loop.config.json 的 allowedInstalls）`);
  }
}

process.exit(0);
