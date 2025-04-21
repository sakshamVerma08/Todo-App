import jwt from "jsonwebtoken";
import bcrypt, { compareSync } from "bcrypt";
import User from "../schemas/user-schema.js";

import { validationResult } from "express-validator";

export const signUpController = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await existingUser.hashPassword(password);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();

    const token = jwt.sign(
      { userId: savedUser._id, email: savedUser.email },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    if (!token) {
      return res.status(400).json({ message: "Token generation failed" });
    }

    return res
      .status(201)
      .json({ sucess: true, data: token, message: "Signup successful" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const loginController = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    const existingUser = await User.findOne({ email }).select("+password");

    if (!existingUser) {
      return res.status(400).json({ message: "User doesn't exist" });
    }

    const samePassword = await existingUser.comparePassword(password);
    if (!samePassword) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign(
      { userId: existingUser._id, email: existingUser.email },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    if (!token) {
      return res.status(400).json({ message: "Token generation failed" });
    }

    return res
      .status(201)
      .json({ message: "Login successful", data: token, success: true });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal Server error" });
  }
};

export const logoutController = async (req, res) => {};
