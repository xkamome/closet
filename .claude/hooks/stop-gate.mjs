#!/usr/bin/env node
// Harness Constitution Article III.2 + IV.3 — verification gate with iteration cap.
// Stop hook: blocks the session from ending while verify commands fail.
// Armed only when .claude/loop-state.json exists (created by run-loop.ps1 or /loop-setup).
// Usage (wired by apply.ps1): node stop-gate.mjs "<projectRoot>"

import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import { execSync } from "node:child_process";
import { readHookInput, loadConfig } from "./guard-lib.mjs";
import { runJudge } from "./judge.mjs";

if (process.env.HARNESS_JUDGE === "1") process.exit(0);

const projectRoot = process.argv[2];
if (!projectRoot) process.exit(0);

const input = await readHookInput();
if (!input) process.exit(0);

const stateFile = path.join(projectRoot, ".claude", "loop-state.json");
if (!fs.existsSync(stateFile)) process.exit(0); // gate not armed → normal session

const cfg = loadConfig(projectRoot);
if (!Array.isArray(cfg.verify) || cfg.verify.length === 0) {
  // Article III.1: without acceptance there is nothing to gate. Warn, allow.
  console.error("[stop-gate] loop.config.json has no verify commands — gate cannot run (憲法 III.1).");
  process.exit(0);
}

let state = { iteration: 0 };
try {
  state = JSON.parse(fs.readFileSync(stateFile, "utf8").replace(/^﻿/, ""));
} catch {
  /* keep defaults */
}
state.iteration = (state.iteration || 0) + 1;

if (state.iteration > cfg.maxIterations) {
  // Article IV.3: stop burning tokens. Allow the stop; leave the state file as a FAILED marker.
  state.halted = `iteration cap ${cfg.maxIterations} reached`;
  fs.writeFileSync(stateFile, JSON.stringify(state, null, 2));
  console.error(`[stop-gate] iteration cap ${cfg.maxIterations} reached — loop halted as FAILED.`);
  process.exit(0);
}
fs.writeFileSync(stateFile, JSON.stringify(state, null, 2));

const tail = (s, n = 1500) => {
  const t = (s || "").toString().trim();
  return t.length > n ? "…" + t.slice(-n) : t;
};

const failures = [];
for (const cmd of cfg.verify) {
  try {
    execSync(cmd, {
      cwd: projectRoot,
      timeout: cfg.verifyTimeoutMs,
      stdio: ["ignore", "pipe", "pipe"],
      windowsHide: true,
    });
  } catch (e) {
    failures.push(
      `$ ${cmd}\n${tail(e.stdout)}\n${tail(e.stderr)}${e.signal ? `\n(signal: ${e.signal} — timeout?)` : ""}`
    );
  }
}

if (failures.length === 0 && cfg.judge?.enabled) {
  const verdict = runJudge(projectRoot, cfg);
  if (verdict.warning) console.error(`[stop-gate] judge warning: ${verdict.warning}`);
  if (!verdict.pass) failures.push(`LLM judge (${cfg.judge.model}):\n${tail(verdict.reasons, 1200)}`);
}

if (failures.length === 0) {
  fs.unlinkSync(stateFile); // disarm: loop finished successfully
  console.error(`[stop-gate] verification passed at iteration ${state.iteration} — loop complete.`);
  process.exit(0);
}

console.log(
  JSON.stringify({
    decision: "block",
    reason:
      `[stop-gate 憲法 III.2] Iteration ${state.iteration}/${cfg.maxIterations} — verification FAILED.\n\n` +
      failures.join("\n\n---\n\n") +
      `\n\nRules (憲法 IV): fix the failure, then try to finish again — the gate re-checks automatically. ` +
      `Append a progress entry to STATUS.md. Redirect verbose output to _logs/ and read only the tail. ` +
      `If this is the SAME failure as your previous attempt, do NOT widen scope or delete tests — write a BLOCKER entry in STATUS.md describing what you tried; ` +
      `the loop will end at the iteration cap and a human will take over.`,
  })
);
process.exit(0);
