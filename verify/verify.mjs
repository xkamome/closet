#!/usr/bin/env node
// Acceptance checks for closet2 — one check per ACCEPTANCE.md criterion.
// Exit 0 = pass, non-zero = fail (stop-gate feeds stderr back to the model).
// Verbose output goes to _logs/verify-*.log; only tails are printed.

import fs from "node:fs";
import { execSync } from "node:child_process";

fs.mkdirSync("_logs", { recursive: true });
const failures = [];
const tail = (s, n = 1200) => {
  const t = (s || "").toString().trim();
  return t.length > n ? "…" + t.slice(-n) : t;
};
const run = (name, cmd, timeout = 240000) => {
  const log = `_logs/verify-${name}.log`;
  try {
    const out = execSync(cmd, { stdio: "pipe", timeout, windowsHide: true });
    fs.writeFileSync(log, out);
  } catch (e) {
    fs.writeFileSync(log, `${e.stdout || ""}\n${e.stderr || ""}`);
    throw new Error(`${cmd} failed (see ${log})\n${tail(e.stdout)}\n${tail(e.stderr)}`);
  }
};
const check = (name, fn) => {
  try {
    fn();
    console.log(`PASS ${name}`);
  } catch (e) {
    failures.push(`FAIL ${name}: ${e.message}`);
  }
};

check("avatar assets", () => {
  for (const f of ["public/avatar/avatar.json", "public/avatar/avatar.bin"]) {
    if (!fs.existsSync(f)) throw new Error(`missing ${f}`);
  }
  const meta = JSON.parse(fs.readFileSync("public/avatar/avatar.json", "utf8"));
  const morphs = (meta.morphs || []).map((m) => m.name);
  for (const m of ["height", "weight", "bust", "waist", "hips"]) {
    if (!morphs.some((n) => n.startsWith(m))) throw new Error(`avatar missing morph ${m}*`);
  }
  if (!meta.skeleton?.bones?.length) throw new Error("avatar has no skeleton");
  if (!meta.hair?.length) throw new Error("avatar has no hair");
  if (!meta.skin?.texture) throw new Error("avatar has no skin texture");
});

check("required unit test files", () => {
  for (const t of ["sizeChart", "fabric", "fit", "bodyShape", "solver"]) {
    const f = `tests/${t}.test.ts`;
    if (!fs.existsSync(f)) throw new Error(`missing ${f}`);
  }
});

check("build (tsc + vite)", () => run("build", "npm run build"));
check("unit tests (vitest)", () => run("test", "npm test"));
check("ai bridge", () => run("bridge", "node verify/bridge-check.mjs", 60000));
check("browser e2e", () => run("e2e", "node verify/e2e.mjs", 300000));

if (failures.length) {
  console.error(failures.join("\n"));
  process.exit(1);
}
console.log("verify: all checks passed");
