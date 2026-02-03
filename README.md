# Pixel Art Quiz Game 🎮

一個復古像素風格的問答遊戲，結合 React 前端與 Google Sheets 後端。

## 📋 功能特色
- **像素藝術風格**: 懷舊的 8-bit 設計與音效氛圍。
- **Google Sheets 整合**: 題目管理與成績紀錄都在試算表中完成。
- **DiceBear Avatars**: 根據玩家與關卡生成獨特的像素角色。
- **RWD 響應式設計**: 支援手機與電腦遊玩。

---

## 🚀 快速安裝指南

### 1. 前端環境設定
確保電腦已安裝 [Node.js](https://nodejs.org/) (建議 v18+)。

\`\`\`bash
# 1. 安裝相依套件
npm install

# 2. 啟動開發伺服器
npm run dev
\`\`\`

### 2. 環境變數設定 (`.env`)
在專案根目錄建立或修改 \`.env\` 檔案：

\`\`\`ini
# 你的 Google Apps Script 部署網址 (下方教學取得)
VITE_GOOGLE_APPS_SCRIPT_URL=YOUR_DEPLOYED_SCRIPT_URL

# 通關門檻 (答對幾題算過關)
VITE_PASS_THRESHOLD=3

# 總題數 (每次遊戲隨機抽取的題數)
VITE_QUESTION_COUNT=5
\`\`\`

---

## 📊 Google Sheets 與 Apps Script 設定

這部分是遊戲的後端核心，請依照以下步驟操作：

### 步驟 1: 建立 Google Sheet
1. 前往 [Google Sheets](https://sheets.google.com) 建立一個新試算表。
2. 建立兩個分頁，名稱必須完全一致：
   - **`題目`** (用於存放題庫)
   - **`回答`** (用於紀錄玩家成績)

### 步驟 2: 設定欄位
**分頁：`題目`**
請在第一列 (Row 1) 設定以下標題：
| A | B | C | D | E | F | G |
|---|---|---|---|---|---|---|
| ID | Question | Option A | Option B | Option C | Option D | Answer |

**分頁：`回答`**
請在第一列 (Row 1) 設定以下標題：
| A | B | C | D | E | F | G |
|---|---|---|---|---|---|---|
| ID | 闖關次數 | 總分 | 最高分 | 第一次通關分數 | 花了幾次 | 最近遊玩 |

### 步驟 3: 部署 Apps Script
1. 在試算表中，點擊上方選單 **「擴充功能」 (Extensions) > 「Apps Script」**。
2. 將專案中的 `google-apps-script.gs` 內容完整複製並貼上到編輯器中。
3. 點擊磁片圖示💾 儲存。
4. 點擊右上角 **「部署」 (Deploy) > 「新增部署」 (New deployment)**。
5. 設定如下：
   - **選取類型**: `網頁應用程式` (Web app)
   - **執行身分**: `我` (Me)
   - **誰可以存取**: `所有人` (Anyone) **(重要！否則遊戲無法連線)**
6. 點擊「部署」，授權存取權限。
7. 複製產生的 **網頁應用程式網址 (Web app URL)**。
8. 將此網址貼到你的 `.env` 檔案中的 `VITE_GOOGLE_APPS_SCRIPT_URL`。

---

## 📝 測試題庫 (可直接複製貼上)

請將以下 10 筆問答複製到 **`題目`** 分頁的 A2 儲存格開始貼上：

| ID | Question | Option A | Option B | Option C | Option D | Answer |
|---|---|---|---|---|---|---|
| 1 | 什麼是「生成式 AI」 (Generative AI) 的主要特徵？ | 只能分析數據 | 可以創造新的內容 | 只能回答是非題 | 需要手動編寫程式碼 | B |
| 2 | ChatGPT 的底層技術架構是基於哪一種模型？ | RNN | CNN | Transformer | GAN | C |
| 3 | 在大型語言模型 (LLM) 中，「Token」通常代表什麼？ | 區塊鏈代幣 | 登入憑證 | 文字處理的最小單位 | 模型的權重 | C |
| 4 | 下列哪一個是常見的文字生成圖片 (Text-to-Image) 模型？ | Midjourney | Excel | TensorFlow | React | A |
| 5 | 當 AI 產生看似合理但實際上錯誤的資訊，這種現象稱為什麼？ | 夢遊 (Sleepwalking) | 幻覺 (Hallucination) | 詐騙 (Scam) | 超頻 (Overclocking) | B |
| 6 | 下列哪一個不是生成式 AI 的常見應用？ | 撰寫電子郵件 | 生成程式碼 | 物理硬碟修復 | 語言翻譯 | C |
| 7 | 我們用來指導 AI 生成內容的指令文字，通常稱為什麼？ | Log | Prompt (提示詞) | Script | Code | B |
| 8 | 訓練 ChatGPT 這類模型通常需要大量的什麼？ | 水電費 | 顯示卡 (GPU) 與數據 | 滑鼠點擊 | 鍵盤敲擊 | B |
| 9 | 下列哪一個詞彙常用來描述 AI 根據上下文預測下一個字的能力？ | 預知未來 | 下一個標記預測 (Next Token Prediction) | 讀心術 | 隨機猜測 | B |
| 10 | 什麼是 RAG (Retrieval-Augmented Generation) 技術的主要用途？ | 讓 AI 畫圖更漂亮 | 結合外部知識庫以減少幻覺 | 增加 AI 的語音功能 | 加速電腦開機 | B |

---

## 🌐 自動化部署 (GitHub Pages)

本專案支援使用 GitHub Actions 自動部署至 GitHub Pages。

### 步驟 1: 設定 GitHub 儲存庫變數
為了讓 GitHub 在建置時能正確存取環境變數，請在 GitHub 儲存庫的 **Settings > Secrets and variables > Actions** 中設定以下項目：

#### Secrets (機密變數)
| 名稱 | 說明 |
|---|---|
| `VITE_GOOGLE_APPS_SCRIPT_URL` | 你的 Google Apps Script 部署網址 |

#### Variables (一般變數)
| 名稱 | 預設值 | 說明 |
|---|---|---|
| `VITE_QUESTION_COUNT` | `5` | 每局題目數量 |
| `VITE_PASS_THRESHOLD` | `3` | 及格門檻 |

### 步驟 2: 啟動 GitHub Pages
1. 前往 GitHub 儲存庫的 **Settings > Pages**。
2. 在 **Build and deployment > Source** 選擇 `GitHub Actions`。

### 步驟 3: 觸發部署
- 每次推送 (Push) 程式碼至 `main` 分支時，系統將會自動執行建置並更新網站。
- 你也可以在 **Actions** 標籤頁手動觸發 `Deploy to GitHub Pages` 工作流。

---

## ⚠️ 常見問題
1. **遊戲一直顯示 Loading?**
   - 檢查 `.env` (本地) 或 GitHub Secrets (部署) 中的 URL 是否正確。
   - 確認 Apps Script 部署權限是否為「所有人」。
2. **題目選項顯示 undefined?**
   - 確認 Google Sheet 的欄位順序是否正確 (ID, Question, A, B, C, D, Answer)。
3. **部署後畫面空白？**
   - 檢查 `vite.config.js` 是否有設定正確的 `base` 路徑（若部署在子路徑則需要設定，例如 `base: '/repo-name/'`）。
