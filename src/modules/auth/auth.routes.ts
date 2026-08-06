import { Router } from "express";
import { authController } from "./auth.controller";
import { validate } from "../../common/middleware/validate";
import { registerSchema, loginSchema } from "./auth.validation";

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

export default router;