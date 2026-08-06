import bcrypt from "bcrypt";
import { AppError } from "../../common/errors/AppError";
import { authRepository } from "./auth.repository";
import { RegisterRequest } from "./auth.types";

export class AuthService {
  async register(data: RegisterRequest) {
    // ตรวจ Email ซ้ำ
    const existingEmail = await authRepository.findByEmail(data.email);

    if (existingEmail) {
      throw new AppError("Email already exists", 400);
    }

    // ตรวจ Username ซ้ำ
    const existingUsername = await authRepository.findByUsername(
      data.username
    );

    if (existingUsername) {
      throw new AppError("Username already exists", 400);
    }

    // Hash Password
    const passwordHash = await bcrypt.hash(data.password, 10);

    // บันทึกลงฐานข้อมูล
    const user = await authRepository.create({
      ...data,
      passwordHash,
    });

    // ไม่ส่ง passwordHash กลับ
    return {
      id: user.id,
      email: user.email,
      username: user.username,
    };
  }
}

export const authService = new AuthService();