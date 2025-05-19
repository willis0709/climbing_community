
# Firebase Studio - Climbers Community

This is a NextJS starter project for "Climbers Community" in Firebase Studio.

To get started, take a look at `src/app/page.tsx`.

## 部署故障排除 (Deployment Troubleshooting)

### 錯誤：「指定的根目錄無效。在 '/workspace/your-folder-name' 中找不到可建置的應用程式...」 (Error: "Invalid root directory specified. No buildable app found...")

如果您在 Firebase App Hosting 部署期間遇到類似以下的錯誤：
`Invalid root directory specified. No buildable app found rooted at '/workspace/your-folder-name'.`
或
`No buildable app found rooted at '/workspace/climber community'.`

這通常表示您的 Firebase App Hosting 後端設定中的**根目錄 (Root directory)** 指向了一個子資料夾，而您的 Next.js 應用程式主要檔案（例如 `package.json`、`next.config.ts`、`src/`）並不在該位置。對於大多數 Next.js 專案，這些檔案位於您 Git 儲存庫的頂層（根目錄）。

**如何修正：**

1.  **前往 Firebase 控制台 (Go to the Firebase Console)：** 瀏覽至 [https://console.firebase.google.com/](https://console.firebase.google.com/)。
2.  **選擇您的專案 (Select your Project)** (例如："vertical-visions")。
3.  前往 **App Hosting** 部分 (通常在左側邊欄的「建置」(Build) 或 「主機代管」(Hosting) 下方)。
4.  選擇您的**後端 (backend)**。
5.  前往**部署 (Deployment)** 分頁或尋找**建置設定 (Build Settings)**。
6.  找到**根目錄 (Root directory)** (或「來源目錄」(Source directory)) 設定。
7.  **如果此欄位設定為子資料夾名稱 (例如：`climber community` 或 `./climber-community`)：**
    *   **將其更改為空值，或設定為 `/` 或 `./`**。
    這會告知 Firebase 在您儲存庫的頂層尋找您應用程式的 `package.json`。
8.  儲存變更並嘗試重新部署您的應用程式。

此設定會告知 Firebase 在您的儲存庫中何處尋找您的應用程式程式碼。如果您的 `package.json` 位於儲存庫的最頂層，則 Firebase App Hosting 中的「根目錄」設定應為空值或 `/` 以反映此情況。

## 將 GitHub 儲存庫連接到 Firebase App Hosting

若要設定從 GitHub 自動部署到 Firebase App Hosting，請依照以下步驟操作：

1.  **前往 Firebase 控制台 (Firebase Console)：**
    *   打開網頁瀏覽器，前往 [https://console.firebase.google.com/](https://console.firebase.google.com/)
    *   登入您的 Google 帳戶。

2.  **選擇您的 Firebase 專案：**
    *   選擇 "vertical-visions" 或您對應的專案。

3.  **進入 App Hosting：**
    *   在左側導覽選單中，點擊「App Hosting」。

4.  **選擇您的後端：**
    *   點擊您要設定的後端。

5.  **連接版本控制：**
    *   在後端設定中，尋找「連接儲存庫 (Connect repository)」或類似選項。

6.  **選擇 GitHub 並授權：**
    *   選擇 GitHub 作為您的版本控制提供商。
    *   依照指示授權 Firebase App Hosting 存取您的 GitHub 帳戶。您可能需要為您的帳戶或組織安裝 Firebase App Hosting GitHub 應用程式。

7.  **選擇儲存庫與分支：**
    *   從列表中選擇包含您 Next.js 專案的 GitHub 儲存庫。
    *   選擇您希望從哪個分支進行部署 (例如 `main` 或 `master`)。

8.  **設定根目錄 (Root Directory)：**
    *   **極其重要：** 確保此設定指向您 Next.js 應用程式的根目錄。
        *   如果您的 `package.json` 位於儲存庫的頂層，請將此欄位設定為空、`/` 或 `./`。
        *   如果您的 `package.json` 位於儲存庫的子資料夾中 (例如 `my-next-app`)，請在此處填寫該子資料夾的名稱。

9.  **啟用自動部署：**
    *   確保已啟用自動部署，以便在推送到所選分支時觸發部署。

10. **儲存設定：**
    *   儲存您的後端設定。

完成後，每當您將程式碼推送到指定的分支時，Firebase App Hosting 都應自動開始建置和部署您的應用程式。您可以在 Firebase 控制台中監控部署狀態。

