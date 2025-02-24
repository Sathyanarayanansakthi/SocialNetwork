import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/UserModel.js";
import { generateToken } from "../config/jwt.js";

const signUp = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }
    if (password.length < 8) {
      return res.status(400).json({ error: "Password must be at least 8 characters long" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email already in use" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
      authMethod: "Local",
    });

    const token = generateToken(user);

    return res.status(201).json({
      message: "User registered successfully",
      token,
      user: { id: user._id, username: user.username, email: user.email },
    });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ error: "Something went wrong. Please try again later." });
  }
};

const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    const token = generateToken(user);

    return res.status(200).json({
      message: "Login successful",
      token,
      user: { id: user._id, username: user.username, email: user.email },
    });
  } catch (error) {
    console.error("Error during sign-in:", error);
    res.status(500).json({ error: "Something went wrong. Please try again later." });
  }
};

const oauthCallback = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(400).json({ error: "OAuth authentication failed" });
    }

    const token = generateToken(req.user);
    res.redirect(`${process.env.FRONTEND_URL}/?token=${token}`);
  } catch (error) {
    console.error("OAuth sign-in error:", error);
    res.status(500).json({ error: "OAuth sign-in failed" });
  }
};

const updateProfile = async (req, res) => {
  try {
    const { username, bio, description, profilePic } = req.body;

    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    user.username = username || user.username;
    user.bio = bio || user.bio;
    user.description = description || user.description;
    user.profilePic = profilePic || user.profilePic;

    await user.save();

    res.status(200).json({
      message: "Profile updated successfully",
      user: {
        username: user.username,
        bio: user.bio,
        description: user.description,
        profilePic: user.profilePic,
      },
    });
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ error: "Something went wrong. Please try again later." });
  }
};

export { signUp, signIn, oauthCallback, updateProfile };