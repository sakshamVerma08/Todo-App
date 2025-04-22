import jwt from "jsonwebtoken";
import User from "../schemas/user-schema.js";
import Blacklist from "../schemas/blacklist-schema.js";
import { validationResult } from "express-validator";
import bcrypt from "bcrypt";
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

    const hashedPassword = await bcrypt.hash(password, 10);
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

    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const payload = { userId: user._id, email: user.email };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });

    return res.status(200).json({ success: true, data: token });
  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const logoutController = async (req, res) => {
  // PROTECTED ROUTE
  if (req.headers.authorization === undefined) {
    return res.status(400).json({ message: "Token is required to logout" });
  }
  const token = req.headers.authorization.split(" ")[1];

  if (!token) {
    return res.status(400).json({ message: "Token is required to logout" });
  }

  try {
    const existingToken = await Blacklist.findOne({ token });

    if (existingToken) {
      return res.status(400).json({ message: "Token already blacklisted" });
    }

    Blacklist.create({ token });

    return res
      .status(200)
      .json({ message: "Logout successful", success: true });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal Server error" });
  }
};
