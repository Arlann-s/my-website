@echo off
title Arlann Web Server
cd /d "%~dp0"
echo ====================================================
echo   Starting Arlann Web Server...
echo ====================================================
echo.
node server.js
if %ERRORLEVEL% NEQ 0 (
    echo.
    echo [!] ไม่สามารถเริ่มเซิร์ฟเวอร์ด้วย Node.js ได้
    echo ตรวจสอบว่าได้ติดตั้ง Node.js จาก https://nodejs.org/ เรียบร้อยแล้ว
    echo หรือลองเปิดเครื่องใหม่หนึ่งครั้งเพื่อให้ Windows อัปเดต Path ของ Node
    echo.
    pause
)
