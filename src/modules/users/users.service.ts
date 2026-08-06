import { AppError } from "../../common/errors/AppError";
import { usersRepository } from "./users.repository";

export class UsersService {

  async getProfile(userId: string) {

    const user = await usersRepository.findById(userId);

    if (!user) {
      throw new AppError(
        "User not found",
        404
      );
    }

    return user;
  }

}

export const usersService = new UsersService();