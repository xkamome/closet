// Starts the AI bridge with a fake claude binary and checks /api/health and /api/ask.
import { spawn } from "node:child_process";

const port = 18787;
const env = { ...process.env, BRIDGE_PORT: String(port), CLAUDE_CMD: JSON.stringify(["node", "verify/fake-claude.mjs"]) };
const srv = spawn("node", ["server/ai-bridge.mjs"], { env, stdio: ["ignore", "pipe", "pipe"], windowsHide: true });
let log = "";
srv.stdout.on("data", (d) => (log += d));
srv.stderr.on("data", (d) => (log += d));
const fail = (m) => { console.error("FAIL bridge:", m, "\n", log); srv.kill(); process.exit(1); };
const base = `http://127.0.0.1:${port}`;
for (let i = 0; i < 50; i++) {
  try { const r = await fetch(base + "/api/health"); if (r.ok) break; } catch { /* not up yet */ }
  await new Promise((r) => setTimeout(r, 100));
}
try {
  const h = await (await fetch(base + "/api/health")).json();
  if (!h.ok) fail("health not ok");
  const r = await fetch(base + "/api/ask", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ prompt: "我是梨型身材" }) });
  const j = await r.json();
  if (!r.ok || !/FAKE-CLAUDE/.test(j.text || "")) fail("ask failed: " + JSON.stringify(j));
  const bad = await fetch(base + "/api/ask", { method: "POST", body: "{}" });
  if (bad.status !== 400) fail("empty prompt should be 400");
  console.log("PASS bridge:", j.text);
} catch (e) { fail(e.message); }
srv.kill();
process.exit(0);
