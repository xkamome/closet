#!/usr/bin/env node
// Harness Constitution Article III.4 — optional LLM judge (cheap model reviews the
// diff against ACCEPTANCE.md). Called by stop-gate.mjs; fail-open with a warning so a
// judge outage can never deadlock the loop.
// CLI test: node judge.mjs "<projectRoot>"

import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { execSync } from "node:child_process";

export function parseVerdict(text) {
  const m = (text || "").match(/VERDICT:\s*(PASS|FAIL)/i);
  if (!m) return { pass: true, warning: "judge output had no VERDICT line", reasons: "" };
  return {
    pass: m[1].toUpperCase() === "PASS",
    reasons: (text || "").slice(m.index).trim(),
  };
}

export function runJudge(projectRoot, cfg) {
  let acceptance;
  try {
    acceptance = fs.readFileSync(path.join(projectRoot, "ACCEPTANCE.md"), "utf8");
  } catch {
    return { pass: true, warning: "no ACCEPTANCE.md — judge skipped" };
  }

  let diff = "";
  try {
    diff = execSync("git diff HEAD --stat && git diff HEAD", {
      cwd: projectRoot,
      timeout: 30000,
      stdio: ["ignore", "pipe", "ignore"],
      windowsHide: true,
    }).toString();
  } catch {
    return { pass: true, warning: "git diff unavailable — judge skipped" };
  }
  if (diff.length > 14000) diff = diff.slice(0, 14000) + "\n…(truncated)";
  if (!diff.trim()) return { pass: true, warning: "empty diff — judge skipped" };

  const prompt = [
    "You are a strict acceptance reviewer for an autonomous coding loop.",
    "Judge ONLY whether the diff satisfies the acceptance criteria. Do not review style.",
    "",
    "## Acceptance criteria",
    acceptance,
    "",
    "## Diff (working tree vs HEAD)",
    "```diff",
    diff,
    "```",
    "",
    "Reply with exactly one line `VERDICT: PASS` or `VERDICT: FAIL`,",
    "then, if FAIL, bullet points naming each unmet criterion.",
  ].join("\n");

  try {
    const out = execSync(`claude -p --model ${cfg.judge?.model || "claude-haiku-4-5"}`, {
      input: prompt,
      cwd: os.tmpdir(), // neutral cwd: the judge session must not load this project's hooks
      env: { ...process.env, HARNESS_JUDGE: "1" },
      timeout: 180000,
      stdio: ["pipe", "pipe", "pipe"],
      windowsHide: true,
      shell: true,
    }).toString();
    return parseVerdict(out);
  } catch (e) {
    return { pass: true, warning: `judge spawn failed: ${(e.message || "").slice(0, 200)}` };
  }
}

// CLI test mode
if (process.argv[1] && process.argv[1].endsWith("judge.mjs") && process.argv[2]) {
  const root = process.argv[2];
  const cfgPath = path.join(root, "loop.config.json");
  let cfg = { judge: { enabled: true, model: "claude-haiku-4-5" } };
  try {
    cfg = JSON.parse(fs.readFileSync(cfgPath, "utf8").replace(/^﻿/, ""));
  } catch { /* defaults */ }
  console.log(JSON.stringify(runJudge(root, cfg), null, 2));
}
