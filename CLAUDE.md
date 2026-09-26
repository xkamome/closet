# Loop Protocol (Harness Constitution)

This project runs under the harness constitution
(`Toko_Claude_works/_docs/harness-constitution.md`). Hooks enforce the safety rules;
the rules below are the working protocol you must follow. They are short on purpose —
follow all of them.

## Before working
1. Read `STATUS.md` (where the last session stopped) and `ACCEPTANCE.md` (definition of done).
2. Work ONLY toward `ACCEPTANCE.md`. No drive-by refactors, no extra features.

## While working
3. After each meaningful unit of work, append one entry to `STATUS.md`
   (timestamp, what changed, what's next). A fresh session must be able to resume
   from `STATUS.md` alone. — *why: sessions are short-lived; STATUS.md is the baton.*
4. Redirect verbose output to `_logs/` and read back only the tail:
   `command > _logs/step.log 2>&1` then read the last ~30 lines.
   Never let raw build/test/HTTP logs into the conversation. — *why: context rot kills loops.*
5. Stay inside this project folder. Temp files go to the session scratchpad.
   (Hooks enforce this; do not try to work around them.)

## Finishing
6. Done = the verify commands in `loop.config.json` pass. Never claim completion
   yourself; the stop gate re-checks every time you try to finish.
7. Never delete or weaken a test to make verification pass. If a test is wrong,
   write it up in `STATUS.md` and stop.

## When stuck
8. Same error twice → STOP retrying. Write a `BLOCKER:` entry in `STATUS.md`
   (what you tried, exact error), then finish your turn; the iteration cap will
   end the loop for human review. Do not widen scope to route around a blocker.

## 中文摘要
先讀 STATUS.md / ACCEPTANCE.md 才動工；做完一段就寫 STATUS.md；長輸出導到 _logs/ 再
tail；不出專案資料夾；完成與否由驗收腳本決定，不由你宣布；不准刪測試換過關；同一個
錯誤卡兩次就寫 BLOCKER 停手，等人類接手。
