# Acceptance Criteria / 驗收標準 — closet2 MVP

## Goal / 目標
純瀏覽器（Vite + TypeScript + Three.js）的寫實女性 3D 試衣假人：可用三圍尺寸或照片自訂身形、
站姿／坐姿／半身特寫＋自動旋轉、上傳衣服照片穿到假人身上、貼上商品尺寸表與材質判斷合身度、
依體型給穿搭建議（規則庫＋選用本機 `claude -p` 中繼）。本機使用。

## Done means / 怎樣算完成（全部由 `node verify/verify.mjs` 檢查）
- [ ] `npm run build`（tsc 型別檢查＋vite build）成功
- [ ] `npm test`（vitest）全部通過，至少涵蓋：
  - 尺寸表解析（中文／英文、平量 vs 圍度、S/M/L 多尺碼、cm/inch）
  - 材質解析 → 彈性係數（含彈性纖維／spandex／針織／梭織）
  - 合身判斷（逐部位 過小／合身／寬鬆／過大 ＋推薦尺碼）
  - 體型分類（沙漏／梨形／蘋果／H 型／倒三角）與穿搭規則輸出
  - 身形求解器：用真實 avatar 資料，把身高、胸圍、腰圍、臀圍求解到目標值 ±1.5cm
- [ ] `public/avatar/avatar.json`＋`avatar.bin` 存在，含：身體網格、UV、骨架、權重、
      所需 morph（height/weight/bust/waist/hips/...）、至少 1 個髮型、膚色貼圖
- [ ] `server/ai-bridge.mjs` 可啟動，用假的 claude 執行檔（`CLAUDE_BIN`）測試能回傳結果
- [ ] 瀏覽器 E2E（Playwright + vite preview，`verify/e2e.mjs`）：
  - 頁面載入 0 個 console error，3D canvas 非空白（像素檢查）
  - 輸入三圍後，畫面顯示的模型量測值與輸入相差 ≤ 2cm
  - 站姿／坐姿／半身按鈕可切換、自動旋轉可開關（截圖存 `_artifacts/`）
  - 上傳範例衣服照片後，衣服網格出現在場景且使用上傳的貼圖
  - 貼上範例尺寸表後，出現逐部位合身結果與推薦尺碼
  - 穿搭建議面板顯示體型與建議文字

## Out of scope / 不要做
- 雲端 AI 試穿、GPU 後端、臉部五官自訂、爬取商品網址、部署上網、帳號系統

## Escalate when / 遇到就停下來問人
- MakeHuman 素材無法取得或授權不是 CC0
- 需要允許清單外的套件
