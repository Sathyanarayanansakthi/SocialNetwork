import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/UserModel.js";
import { generateToken } from "../config/jwt.js"; // JWT token generator

// User Sign-Up (Local)
const signUp = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Validation checks
    if (!username || !email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }
    if (password.length < 8) {
      return res
        .status(400)
        .json({ error: "Password must be at least 8 characters long" });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email already in use" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
      authMethod: "Local",
    });

    // Generate JWT token
    const token = generateToken(user);

    // Respond with success
    return res.status(201).json({
      message: "User registered successfully",
      token,
      user: { id: user._id, username: user.username, email: user.email },
    });
  } catch (error) {
    console.error("Error registering user:", error);
    res
      .status(500)
      .json({ error: "Something went wrong. Please try again later." });
  }
};

// User Sign-In (Local)
const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation checks
    if (!email || !password) {
      return res
        .status(400)
        .json({ error: "Email and password are required" });
    }

    // Find the user
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    // Generate JWT token
    const token = generateToken(user);

    // Respond with success
    return res.status(200).json({
      message: "Login successful",
      token,
      user: { id: user._id, username: user.username, email: user.email },
    });
  } catch (error) {
    console.error("Error during sign-in:", error);
    res
      .status(500)
      .json({ error: "Something went wrong. Please try again later." });
  }
};

// OAuth Sign-In Callback Handler
const oauthCallback = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(400).json({ error: "OAuth authentication failed" });
    }

    // Generate JWT token
    const token = generateToken(req.user);

    // Redirect or respond with token
    res.redirect(`${process.env.FRONTEND_URL}/?token=${token}`);
  } catch (error) {
    console.error("OAuth sign-in error:", error);
    res.status(500).json({ error: "OAuth sign-in failed" });
  }
};

export { signUp, signIn, oauthCallback };
