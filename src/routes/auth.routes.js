import express from "express";
import { signup, login } from "../controllers/auth.controller.js";
import { signupValidator, loginValidator } from "../middleware/validators.js";
import { authLimiter } from "../middleware/rateLimiter.js";

const router = express.Router();

router.post("/signup", authLimiter, signupValidator, signup);
router.post("/login", authLimiter, loginValidator, login);

export default router;
