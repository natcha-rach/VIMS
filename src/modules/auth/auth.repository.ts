import prisma from "../../common/database/prisma";
import { RegisterRequest } from "./auth.types";

export class AuthRepository {
  async findByEmail(email: string) {
    return prisma.user.findUnique({
      where: {
        email,
      },
    });
  }

  async findByUsername(username: string) {
    return prisma.user.findUnique({
      where: {
        username,
      },
    });
  }

  async create(data: RegisterRequest & { passwordHash: string }) {
    return prisma.user.create({
      data: {
        email: data.email,
        username: data.username,
        passwordHash: data.passwordHash,
        firstName: data.firstName,
        lastName: data.lastName,
      },
    });
  }
}

export const authRepository = new AuthRepository();