import { Router } from "express";
import { authController } from "./auth.controller";
import { validate } from "../../common/middleware/validate";
import { registerSchema, loginSchema } from "./auth.validation";
import { authMiddleware } from "../../common/middleware/auth";

const router = Router();

router.post(
  "/register",
  validate(registerSchema),
  authController.register.bind(authController)
);

router.post(
  "/login",
  validate(loginSchema),
  authController.login.bind(authController)
);

router.get(
  "/me",
  authMiddleware,
  authController.me.bind(authController)
);

export default router;