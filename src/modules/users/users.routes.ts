import { Router } from "express";
import { usersController } from "./users.controller";
import { authMiddleware } from "../../common/middleware/auth";

const router = Router();

router.get(
  "/me",
  authMiddleware,
  usersController.me.bind(usersController)
);

export default router;