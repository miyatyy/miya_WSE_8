# Praktikum WSE 8 – RESTful Secure API
**Nama:** Nurmiyaty  
**NIM:** 230104040083  

## Deskripsi
Project ini membuat RESTful API dengan Node.js + Express + MongoDB.  
Fitur utama:
- Register & Login (JWT)
- Access Token + Refresh Token
- CRUD Articles
- Role (user/admin)
- Security: Helmet, Rate Limit, CORS
- Logging dengan Pino

## Cara Menjalankan
1. Install:
   ```bash
   npm install
 isi .env
 PORT=3000
DB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/miya_WSE_8
JWT_ACCESS_SECRET=xxx
JWT_REFRESH_SECRET=xxx

Jalankan:
npm run dev

AUTH

POST /api/auth/register

POST /api/auth/login

POST /api/auth/refresh

GET /api/auth/me

ARTICLES

GET /api/articles

POST /api/articles

PUT /api/articles/:id

DELETE /api/articles/:id

SYSTEM

GET /health

Kesimpulan

API berjalan dengan baik, semua endpoint berfungsi, dan seluruh pengujian Postman berhasil.