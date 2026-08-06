import jwt from "jsonwebtoken";
import { jwtConfig } from "../config/jwt";

export function generateToken(payload: object) {
  return jwt.sign(payload, jwtConfig.secret, {
    expiresIn: jwtConfig.expiresIn,
  });
}

export function verifyToken(token: string) {
  return jwt.verify(token, jwtConfig.secret);
}