# Loop prompt / 每輪餵給模型的任務指令

> Used by run-loop.ps1: this file is piped to `claude -p` on every iteration.
> Keep it short and stable — per-iteration context lives in STATUS.md, not here.

Read STATUS.md and ACCEPTANCE.md first. Continue the work toward the acceptance
criteria from where STATUS.md says the last session stopped. Follow CLAUDE.md
(loop protocol) strictly. When you believe you are done, just finish — the stop
gate verifies automatically.
