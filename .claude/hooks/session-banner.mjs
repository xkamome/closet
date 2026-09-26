#!/usr/bin/env node
// Harness Constitution Article IV.1 — SessionStart hook. Injects the loop protocol
// into context at every session start (survives /clear and compaction).
// Usage (wired by apply.ps1): node session-banner.mjs "<projectRoot>"

import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import { loadConfig } from "./guard-lib.mjs";

if (process.env.HARNESS_JUDGE === "1") process.exit(0);

const projectRoot = process.argv[2];
if (!projectRoot) process.exit(0);

const cfg = loadConfig(projectRoot);
const stateFile = path.join(projectRoot, ".claude", "loop-state.json");
let armed = "not armed (normal session)";
try {
  const s = JSON.parse(fs.readFileSync(stateFile, "utf8").replace(/^﻿/, ""));
  armed = s.halted
    ? `HALTED: ${s.halted} — human review needed, see STATUS.md`
    : `ARMED — iteration ${s.iteration || 0}/${cfg.maxIterations}`;
} catch {
  /* not armed */
}

console.log(
  [
    `[loop-harness] mode=${cfg.mode} | stop-gate: ${armed} | constitution: Toko_Claude_works/_docs/harness-constitution.md`,
    `Protocol: (1) read STATUS.md and ACCEPTANCE.md before working; (2) append a STATUS.md entry after each unit of work;`,
    `(3) redirect verbose output to _logs/ and read only the tail; (4) same error twice -> write BLOCKER in STATUS.md, stop retrying;`,
    `(5) done = verify commands pass (${(cfg.verify || []).join(" && ") || "none configured"}), never your own claim.`,
  ].join("\n")
);
process.exit(0);
