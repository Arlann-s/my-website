# Arlann — Writer, Educator & Systems Engineer (Web Project)

โครงสร้างโปรเจกต์ได้รับการตรวจสอบ เรียบเรียง และจัดระเบียบใหม่ตามมาตรฐานการพัฒนาเว็บอย่างเป็นระบบ โดยแยก **HTML**, **CSS**, **JavaScript** และ **JSON Data** ออกจากกันอย่างชัดเจน พร้อมระบบเชื่อมโยงหน้าเว็บ (Interlinked Navigation) ที่สมบูรณ์แบบ

---

## 📁 ผังโครงสร้างโปรเจกต์ (Project Architecture)

```text
MyWeb-agy/
├── index.html                   # หน้าแรก (Home / Sanctuary)
├── page/                        # หน้าเว็บอื่นๆ ทั้งหมด
│   ├── about.html               # หน้าประวัติและผลงาน (About & Portfolio)
│   ├── blog.html                # คลังบทความและความรู้ (Blog & Knowledge Hub)
│   ├── shop.html                # คลังป้ายยาของใช้คุณภาพ (Curated Shop)
│   └── english-studio.html      # สตูดิโอเรียนภาษาอังกฤษเชิงลึก (English Learning Studio)
│
├── css/                         # สไตล์ชีตทั้งหมด
│   ├── style.css                # Base reset, Typography, Scrollbar & Global styles
│   └── components.css           # Flashcards 3D, Glassmorphism, Animation helpers
│
├── js/                          # โมดูล JavaScript แยกตามฟังก์ชันการทำงาน
│   ├── tailwind.config.js       # การตั้งค่า Design Tokens & Theme ของ Tailwind CSS
│   ├── main.js                  # สคริปต์ส่วนกลาง (Active navigation highlight, Header shadow)
│   ├── home.js                  # Speech pronunciation micro-interaction & Newsletter form
│   ├── about.js                 # Portfolio project filtering
│   ├── blog.js                  # Reading drawer modal, Cmd+K search shortcut, Topic filters
│   ├── shop.js                  # Curated product filters & animated transitions
│   └── english-studio.js        # 12 Tenses matrix, Interactive dialogue runner, 3D cards
│
├── data/                        # ฐานข้อมูล JSON แยกจากโค้ด UI เพื่อความยืดหยุ่น
│   ├── tense-data.json          # ข้อมูล 12 Tenses ฉบับสมบูรณ์ (สูตร, คำอธิบายภาษาไทย, ประโยคตัวอย่าง, ข้อควรระวัง)
│   ├── scenarios.json           # บทสนทนาจำลองสถานการณ์จริง (Cafe, Smalltalk, Travel, Empathy)
│   ├── shop-products.json       # รายการสินค้าแนะนำ สเปก ราคา ลิงก์ และรีวิวส่วนตัว
│   ├── blog-articles.json       # รายการบทความวิชาการและความคิดสร้างสรรค์
│   └── portfolio-projects.json  # รายการผลงานทางวิศวกรรมและการเขียนเชิงวิชาการ
│
├── assets/                      # ทรัพยากรมีเดีย
│   └── images/
│       └── screenshots/         # ภาพหน้าจอ UI ของแต่ละหน้า
│           ├── home.png
│           ├── about-portfolio.png
│           ├── blog-knowledge-hub.png
│           ├── curated-shop.png
│           └── english-studio.png
│
├── docs/                        # เอกสารระบบการออกแบบ
│   └── DESIGN.md                # บันทึกแนวคิดสถาปัตยกรรม Arlann Literary & Pedagogical
```

---

## 🌟 จุดเด่นของการปรับปรุงโครงสร้าง (Key Enhancements)

1. **การแยกโค้ดอย่างสมบูรณ์ (Clean Separation of Concerns)**:
   - **HTML**: เหลือเฉพาะ Semantic Markup ที่สะอาดตา ปราศจากก้อนโค้ด `<style>` หรือ `<script>` ขนาดยาวนับพันบรรทัด
   - **CSS**: รวบรวมคลาสพื้นฐาน รีเซ็ต และเอฟเฟกต์ 3D Card / Glassmorphism ไว้ในโฟลเดอร์ `css/`
   - **JavaScript**: แยกสคริปต์แต่ละหน้าไว้ใน `js/` พร้อมโหลดแบบ `defer` ช่วยให้หน้าเว็บโหลดได้รวดเร็ว
   - **JSON**: ดึงข้อมูลเนื้อหา เช่น 12 Tenses, บทสนทนา, สินค้า, บทความ ออกมาเป็นไฟล์ `.json` ในโฟลเดอร์ `data/` เพื่อให้แก้ไขข้อมูลได้ง่ายโดยไม่ต้องแก้โค้ด HTML

2. **ระบบเปลี่ยนหน้าแบบนุ่มนวล (Silky-Smooth Page Transitions)**:
   - สลับหน้าระหว่าง `index.html` และหน้าต่างๆ ใน `page/` ได้อย่างสมูท นุ่มตา ไม่แข็งกระด้าง
   - มาพร้อม **Top Progress Spine Bar** หลอดไฟโหลดสีฟ้าครามไล่เฉด สไตล์พรีเมียม (เช่น GitHub / Linear / Medium)
   - มีระบบตรวจจับหน้าปัจจุบันและไฮไลต์แท็บที่กำลังเปิดอยู่โดยอัตโนมัติ (Active State Auto-Highlight)
   - รองรับ Browser History & BFCache (ปุ่ม Back/Forward ของเบราว์เซอร์ทำงานได้อย่างลื่นไหล)

3. **โหมดมือถือระดับมืออาชีพ (Professional Mobile Mode & Touch UX)**:
   - **Mobile Navigation Drawer**: เมนูแบบ Frosted Glass สวยงาม เปิด-ปิดลื่นไหลด้วย Hamburger Button พร้อม Backdrop Blur เบื้องหลัง
   - มีคำอธิบายภาษาไทยและไอคอนบอกฟังก์ชันของแต่ละหน้าอย่างชัดเจน
   - **Touch-Scroll Chip Carousels**: แถบฟิลเตอร์หมวดหมู่บทความ สินค้า และหัวข้อคำศัพท์ สามารถปัดซ้าย-ขวาด้วยนิ้วได้อย่างเป็นธรรมชาติ (Native-like feel)
   - **Swipe Gesture Cue**: มีสัญลักษณ์แจ้งเตือนให้ผู้ใช้มือถือทราบว่าสามารถปัดตาราง 12 Tenses Navigator ไปทางขวาเพื่อสำรวจข้อมูลได้ครบทุกช่อง

4. **ความเข้ากันได้ 100% (Offline & Server Compatible)**:
   - สามารถดับเบิลคลิกเปิดไฟล์ `.html` ผ่านเบราว์เซอร์ได้ทันที (`file:///`) โดยไม่มีปัญหา CORS บล็อกการแสดงผล
   - หรือรันผ่าน Local Server เพื่อดึง JSON แบบ Dynamic ก็ทำงานได้อย่างสมบูรณ์

---

## 🚀 วิธีการเปิดใช้งาน (How to Run)

### วิธีที่ 1: ดับเบิลคลิกไฟล์ start.bat (ง่ายที่สุดบน Windows)
- เพียงดับเบิลคลิกที่ไฟล์ `start.bat` ในโฟลเดอร์นี้ ระบบจะสตาร์ตเซิร์ฟเวอร์และเปิดเว็บเบราว์เซอร์ให้โดยอัตโนมัติ

### วิธีที่ 2: รันผ่าน Terminal / Command Line
เปิด Terminal ในโฟลเดอร์นี้ แล้วรันคำสั่ง:
```bash
npm start
# หรือ node server.js
```
จากนั้นเปิดเบราว์เซอร์ไปที่ `http://localhost:3000`

### วิธีที่ 3: เปิดดูโดยตรงผ่านเบราว์เซอร์ (Offline Mode)
- ดับเบิลคลิกที่ไฟล์ `index.html` เพื่อเริ่มใช้งานได้ทันที
