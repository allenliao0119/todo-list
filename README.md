# 待辦清單 (Todo List)
此專案為Alpha Capm Dev C4 M2 課程引導所建立。
目的為運用 Node.js 建立本機伺服器，並透過 Express 及 Template Engine 建立待辦清單網頁。

# 版本
- v1.0.0(2024/7/13) ⭐ 目前版本

# 功能
- 使用者可以進行以下操作：
  - 瀏覽所有待辦事項
  - 檢視單一待辦事項
  - 編輯待辦事項
  - 刪除待辦事項

# 執行環境
[Node.js](https://nodejs.org/) (v16.13.0)
[MySQL](https://dev.mysql.com/downloads/mysql/) (v8.0.15)
⚠️ *執行此專案前，需要先安裝 Node.js 及 MySQL。*

# 安裝
1. 開啟終端機 (Terminal)，cd 至存放本專案的資料夾，執行以下指令將本專案 clone 至本機電腦。

```
git clone https://github.com/allenliao0119/todo-list.git
```

2. 進入此專案資料夾

```
cd todo-list
```

3. 執行以下指令以安裝套件

```
npm install
```

4. 資料庫設定

建立資料庫restaurant。

--- MySQL server 連線之預設設定如下：
```
host: '127.0.0.1'  // localhost
username: 'root'
password: 'password'
database: 'restaurant'
```
若欲更改設定，請編輯專案資料夾中 `/config/config.json` 中的 "development"  
  
您可以透過以下指令執行資料表建立、匯入種子資料：

```
npm run db:migrate
```
```
npm run db:seed
```

5. 啟動伺服器

```
npm run start
```

當 Terminal 出現以下字樣，即代表伺服器啟動成功：  
`App is running on http://localhost:3000`  
現在，您可開啟任一瀏覽器輸入 http://localhost:3000 來使用待辦清單網頁。