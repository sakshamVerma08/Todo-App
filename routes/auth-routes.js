import express from "express";
import {
  validateCredentials,
  validateLoginCredentials,
} from "../middlewares/validation-rules.js";
import {
  loginController,
  logoutController,
  signUpController,
} from "../controllers/auth-controller.js";
import { authMiddleware } from "../middlewares/auth.js";

const router = express.Router();

router.post("/login", validateLoginCredentials, loginController);

router.post("/signup", validateCredentials, signUpController);

router.post("/logout", authMiddleware, logoutController);

export default router;
