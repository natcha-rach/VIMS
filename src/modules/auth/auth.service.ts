import bcrypt from "bcrypt";
import { AppError } from "../../common/errors/AppError";
import { generateToken } from "../../common/security/jwt";
import { authRepository } from "./auth.repository";
import { LoginRequest, RegisterRequest } from "./auth.types";

export class AuthService {
  async register(data: RegisterRequest) {
    const existingEmail = await authRepository.findByEmail(data.email);

    if (existingEmail) {
      throw new AppError("Email already exists", 400);
    }

    const existingUsername = await authRepository.findByUsername(
      data.username
    );

    if (existingUsername) {
      throw new AppError("Username already exists", 400);
    }

    const passwordHash = await bcrypt.hash(data.password, 10);

    const user = await authRepository.create({
      ...data,
      passwordHash,
    });

    return {
      id: user.id,
      email: user.email,
      username: user.username,
    };
  }


  async login(data: LoginRequest) {
    const user = await authRepository.findByEmail(data.email);

    if (!user) {
      throw new AppError("Invalid credentials", 401);
    }


    const isPasswordValid = await bcrypt.compare(
      data.password,
      user.passwordHash
    );


    if (!isPasswordValid) {
      throw new AppError("Invalid credentials", 401);
    }


    const accessToken = generateToken({
      userId: user.id,
      email: user.email,
      username: user.username,
    });


    return {
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
      },
      accessToken,
    };
  }
}

export const authService = new AuthService();