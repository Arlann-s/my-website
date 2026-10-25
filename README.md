# Personal Website Starter

เว็บไซต์ส่วนตัวแบบ static + Node server พร้อมโครงสร้างสำหรับเติมข้อมูลของเจ้าของเว็บไซต์เอง

## Pages
- Home
- About & Portfolio
- Blog & Hub
- Curated Shop
- English Studio
- Weather Intelligence

## Content
ข้อมูลตัวอย่างเดิมถูกล้างออกแล้ว:
- `data/blog-articles.json`
- `data/portfolio-projects.json`
- `data/shop-products.json`
- `data/tense-data.json`
- `data/scenarios.json`

ไฟล์ทั้งหมดเริ่มจากข้อมูลว่างเพื่อให้คุณเติมของตัวเอง

## Media
รูปตัวอย่างถูกนำออกจาก active website assets แล้ว เก็บไว้ใน `docs/_removed-demo-images` เพื่อไม่ให้ถูกโหลดโดยเว็บไซต์
รูปของคุณเองให้ใส่ใน `assets/`

## Styling
Tailwind CDN ถูกถอดออกแล้ว เว็บไซต์ใช้ CSS local ใน `css/style.css`, `css/components.css` และ `css/weather.css`

## Weather
Weather Intelligence ใช้ RainViewer + Open-Meteo + Leaflet + Chart.js และวิเคราะห์จากเวลาปัจจุบันไปข้างหน้า 6 ชั่วโมง โดยแยก radar/nowcast ออกจาก model forecast

## Run
`npm start`
