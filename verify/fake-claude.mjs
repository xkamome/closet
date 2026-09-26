// Stand-in for `claude -p` in tests: echoes a canned answer that includes the prompt length.
let s = "";
process.stdin.on("data", (d) => (s += d));
process.stdin.on("end", () => process.stdout.write(`FAKE-CLAUDE 建議（收到 ${s.length} 字）`));
