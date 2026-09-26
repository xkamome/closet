#!/usr/bin/env node
// Local AI bridge: POST /api/ask {prompt} -> runs `claude -p` (Claude Code CLI, which uses your
// own subscription login — no API key) and returns {text}. Listens on 127.0.0.1 only.
//
//   npm run bridge            (default port 8787)
//   CLAUDE_BIN=/path/to/claude npm run bridge
//   CLAUDE_CMD='["node","fake.mjs"]' npm run bridge   (tests)

import http from "node:http";
import { spawn } from "node:child_process";

const PORT = Number(process.env.BRIDGE_PORT || 8787);
const TIMEOUT_MS = Number(process.env.BRIDGE_TIMEOUT_MS || 180000);
const MAX_PROMPT = 20000;

function command() {
  if (process.env.CLAUDE_CMD) {
    const c = JSON.parse(process.env.CLAUDE_CMD);
    return { bin: c[0], args: c.slice(1) };
  }
  return { bin: process.env.CLAUDE_BIN || "claude", args: ["-p", "--output-format", "text"] };
}

export function runClaude(prompt) {
  return new Promise((resolve, reject) => {
    const { bin, args } = command();
    const child = spawn(bin, args, { stdio: ["pipe", "pipe", "pipe"], windowsHide: true });
    let out = "", err = "";
    const timer = setTimeout(() => { child.kill(); reject(new Error("claude 回應逾時")); }, TIMEOUT_MS);
    child.stdout.on("data", (d) => (out += d));
    child.stderr.on("data", (d) => (err += d));
    child.on("error", (e) => { clearTimeout(timer); reject(new Error(`無法執行 ${bin}：${e.message}`)); });
    child.on("close", (code) => {
      clearTimeout(timer);
      if (code === 0) resolve(out.trim());
      else reject(new Error(`claude 結束代碼 ${code}：${err.trim().slice(0, 500)}`));
    });
    child.stdin.end(prompt);
  });
}

const cors = (req, res) => {
  const origin = req.headers.origin || "";
  if (/^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
    res.setHeader("Access-Control-Allow-Headers", "content-type");
    res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  }
};

const send = (res, status, body) => {
  res.writeHead(status, { "content-type": "application/json; charset=utf-8" });
  res.end(JSON.stringify(body));
};

export function createServer() {
  return http.createServer(async (req, res) => {
    cors(req, res);
    if (req.method === "OPTIONS") return res.end();
    if (req.method === "GET" && req.url === "/api/health") return send(res, 200, { ok: true, bin: command().bin });
    if (req.method === "POST" && req.url === "/api/ask") {
      let body = "";
      req.on("data", (d) => { body += d; if (body.length > MAX_PROMPT * 4) req.destroy(); });
      req.on("end", async () => {
        try {
          const { prompt } = JSON.parse(body || "{}");
          if (typeof prompt !== "string" || !prompt.trim()) return send(res, 400, { error: "缺少 prompt" });
          if (prompt.length > MAX_PROMPT) return send(res, 413, { error: "提示詞太長" });
          const text = await runClaude(prompt);
          send(res, 200, { text });
        } catch (e) {
          send(res, 502, { error: e.message });
        }
      });
      return;
    }
    send(res, 404, { error: "not found" });
  });
}

if (import.meta.url === `file://${process.argv[1].replace(/\\/g, "/")}` || import.meta.url === `file:///${process.argv[1].replace(/\\/g, "/")}`) {
  createServer().listen(PORT, "127.0.0.1", () => {
    console.log(`AI bridge listening on http://127.0.0.1:${PORT}  (claude: ${command().bin})`);
  });
}
