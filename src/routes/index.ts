// ==========================================
// Import Express Router
// ==========================================
//
// Router คือ Object ของ Express
// ใช้สำหรับรวมกลุ่ม API Route
//
// เช่น:
// /api/auth/*
// /api/users/*
//
// แล้วนำไปเชื่อมกับ app.ts

import { Router } from "express";


// ==========================================
// Import Module Routes
// ==========================================
//
// แต่ละ Module จะดูแล Route ของตัวเอง
//
// Auth Module:
// - register
// - login
//
// Users Module:
// - profile
// - user management
//

import authRoutes from "../modules/auth/auth.routes";
import usersRoutes from "../modules/users/users.routes";



// ==========================================
// Create Main Router
// ==========================================
//
// สร้าง Router หลักของระบบ
//
// Request Flow:
//
// Client
//   |
//   ↓
// Express App (app.ts)
//   |
//   ↓
// Main Router (ไฟล์นี้)
//   |
//   ├── Auth Router
//   |
//   └── Users Router
//

const router = Router();



// ==========================================
// Register Auth Module
// ==========================================
//
// ทุก API ที่อยู่ใน authRoutes
// จะถูกเติม Prefix:
//
// /api/auth
//
// ตัวอย่าง:
//
// POST /api/auth/register
// POST /api/auth/login
//

router.use("/auth", authRoutes);



// ==========================================
// Register Users Module
// ==========================================
//
// ทุก API ที่อยู่ใน usersRoutes
// จะถูกเติม Prefix:
//
// /api/users
//
// ตัวอย่าง:
//
// GET /api/users/me
//
// Flow:
//
// Request
//   |
//   ↓
// authMiddleware
//   |
//   ↓
// usersController
//   |
//   ↓
// usersService
//   |
//   ↓
// usersRepository
//   |
//   ↓
// Database
//

router.use("/users", usersRoutes);



// ==========================================
// Export Router
// ==========================================
//
// ส่ง Router นี้กลับไปให้ app.ts ใช้งาน
//

export default router;