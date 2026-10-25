# Arlann — Personal Website

เว็บไซต์ส่วนตัวแบบ static + Node server ที่ออกแบบให้ดูแลระยะยาวง่าย ใช้ HTML/CSS/JavaScript แบบ vanilla และ Node.js server ขนาดเล็กสำหรับ local development

## Pages
- Home
- About & Portfolio
- Blog & Hub
- Curated Shop

English Studio และ Weather ถูกถอดออกจาก active website แล้ว

## Project structure

```text
my-website/
├─ assets/                 # รูปและ media ของคุณเอง
├─ css/
│  ├─ style.css            # design system + layout
│  └─ components.css       # reusable UI
├─ data/
│  ├─ blog-articles.json
│  ├─ portfolio-projects.json
│  └─ shop-products.json
├─ js/
│  ├─ main.js
│  ├─ home.js
│  ├─ about.js
│  ├─ blog.js
│  └─ shop.js
├─ page/
│  ├─ about.html
│  ├─ blog.html
│  └─ shop.html
├─ docs/                   # archived/removed material
├─ index.html
├─ server.js
├─ package.json
└─ start.bat
```

## Content
Dynamic content แยกออกจาก HTML เพื่อให้แก้ข้อมูลได้โดยไม่ต้องแก้ UI:

- `data/portfolio-projects.json` → ผลงาน
- `data/blog-articles.json` → บทความ
- `data/shop-products.json` → สินค้า/คำแนะนำ

ไฟล์ JSON ที่ไม่ใช้งานแล้วไม่ควรถูกนำกลับมาเป็น dependency

## Media
ไม่มี demo images ที่ active อยู่แล้ว ให้ใส่รูปของคุณเองใน `assets/` แนะนำ WebP หรือ AVIF สำหรับเว็บ และควรใส่ `alt`, `width` และ `height` ให้กับรูปจริง

## Development

ต้องมี Node.js ก่อน จากนั้นรัน:

```bash
npm start
```

เปิด `http://127.0.0.1:3000`

ถ้าพอร์ต 3000 ถูกใช้งาน server จะลองพอร์ตถัดไปอัตโนมัติ

## Engineering baseline

- ไม่มี Tailwind CDN
- ไม่มี framework ที่ไม่จำเป็น
- ไม่มีข้อมูล demo ของบุคคลอื่นใน active pages
- content แยกจาก presentation
- dynamic JSON ถูก escape ก่อน render
- external URL ถูกตรวจ protocol ก่อนใช้
- server ป้องกัน path traversal
- server รองรับ GET/HEAD และ security headers พื้นฐาน
- mobile navigation มี ARIA state และรองรับ Escape
- รองรับ `prefers-reduced-motion`

## Production checklist

ก่อน deploy จริงควรตรวจ:

1. Navigation และ 404 paths
2. Console และ Network errors
3. Mobile 360/390/430 px
4. Tablet และ desktop
5. รูปจริงและ alt text
6. SEO title/description/OG metadata
7. favicon และ web manifest
8. Lighthouse performance/accessibility/SEO
9. Keyboard navigation
10. HTTPS และ hosting configuration

โปรเจกต์นี้เป็น clean baseline สำหรับค่อย ๆ เติมตัวตน เนื้อหา ผลงาน และรูปภาพจริงของ Arlann ต่อไป
