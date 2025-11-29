import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import { logger } from "../utils/ApiLogger.js";

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

export const signup = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const existing = await User.findOne({ email });
    if (existing) {
      logger.warn("Signup attempt with existing email", { email });
      return res.status(400).json({ message: "Email already exists" });
    }

    const user = await User.create({ name, email, password });

    const token = generateToken(user._id);
    logger.info("User signed up successfully", {
      token,
      user: { id: user._id, name: user.name, email: user.email },
    });

    res.status(201).json({
      success: true,
      message: "User register successfully",
      token,
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      logger.warn("Login attempt with non-existent email", { email });
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      logger.warn("Login attempt with wrong password", {
        email,
        userId: user._id,
      });
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = generateToken(user._id);

    logger.info("User logged in successfully", {
      token,
      user: { id: user._id, name: user.name, email: user.email },
    });

    res.json({
      success: true,
      message: "User login successfully",
      token,
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (err) {
    next(err);
  }
};
