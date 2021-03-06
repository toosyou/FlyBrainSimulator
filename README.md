# 猴子都會的安裝方法
## 2019-12-19更新資料庫json 格式
將 key 加上 "", 並且單引號' 換成 "

## For MacOS
1.	下載並安裝node.js 8.11.3 LTS版: https://nodejs.org/en/
2.	下載並安裝mongodb 4.0版: https://www.mongodb.com/download-center?jmp=nav#community
3.	下載資料庫: https://drive.google.com/file/d/1_LYOMJ35xm0PKiBFlr6X-G_dezmGxdHa/view?usp=sharing
4.	開啟terminal並且cd進mongodb的資料夾mongodb-osx-x86_64-enterprise-4.0.0/bin 中
5.	輸入下列指令以開啟資料庫服務
```
    sudo mkdir -p /data/db
    sudo ./mongod –bind_ip localhost
```
6. 再開啟一個terminal並且cd進mongodb-osx-x86_64-enterprise-4.0.0/bin 中
7. 輸入下列指令以將資料載入資料庫
```
    ./mongoimport --db neural --collection DATA --file [WebstormProjectTest 的路徑]/WebstormProjectTest/public/sets/linesetLiWarpTransformRelease.json
    ./mongoimport --db neural --collection DATA_group --file  [WebstormProjectTest 的路徑]/WebstormProjectTest/public/sets/Tracts0724_new.json
```
8. cd進從git下載並解壓的FlyBrainSimulator-master資料夾中
9. 輸入以下指令以開啟網頁server
```
    node http_server.js
```
10. 當terminal中顯示”HTTP伺服器在 http://127.0.0.1:1339/ 上運行” 即代表伺服器開啟成功，可以開啟瀏覽器進行網頁測試。

<p>

## For Windows
1.	下載並安裝node.js 8.11.3 LTS版: https://nodejs.org/en/
2.	下載並安裝mongodb 4.0版: https://www.mongodb.com/download-center?jmp=nav#community
3.	開啟cmd並且cd進mongodb的資料夾C:\Program Files\MongoDB\Server\4.0\bin 中
4.	輸入下列指令以開啟資料庫服務
```
    md C:\\data\db
    mongod –bind_ip localhost
```
5. 下載並解壓縮資料庫: https://drive.google.com/file/d/1_LYOMJ35xm0PKiBFlr6X-G_dezmGxdHa/view?usp=sharing
6. 再開啟一個cmd並且cd進C:\Program Files\MongoDB\Server\4.0\bin 中
7. 輸入下列指令以將資料載入資料庫
```
    mongoimport --db neural --collection DATA --file [剛剛解壓完資料庫的資料夾]/linesetLiWarpTransformRelease.json
    mongoimport --db neural --collection DATA_group --file  [剛剛解壓完資料庫的資料夾]/Tracts0724_new.json
```
8. cd進從git下載並解壓的FlyBrainSimulator-master資料夾中
9. 輸入以下指令以開啟網頁server
```
    node http_server.js
```
10. 當terminal中顯示”HTTP伺服器在 http://127.0.0.1:1339/ 上運行” 即代表伺服器開啟成功，可以開啟瀏覽器進行網頁測試。
