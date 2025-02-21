import express from "express";
import passport from "passport";
import { signUp, signIn } from "../controllers/authControllers.js";
import isAuthenticated from "../middleware/authMiddleware.js";
import { generateToken } from "../config/jwt.js";
import User from "../models/UserModel.js";

const router = express.Router();

// Local Sign-Up & Sign-In
router.post("/signup", signUp);
router.post("/signin", signIn);

// Google OAuth
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// Google OAuth Callback with Redirect
router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/signin" }),
  (req, res) => {
    // Generate JWT Token
    const token = generateToken(req.user);
    // Redirect to frontend dashboard with token
    res.redirect(`${process.env.FRONTEND_URL}/dashboard?token=${token}`);
  }
);

// GitHub OAuth
router.get(
  "/github",
  passport.authenticate("github", { scope: ["user:email"] })
);

// GitHub OAuth Callback with Redirect
router.get(
  "/github/callback",
  passport.authenticate("github", { failureRedirect: "/signin" }),
  (req, res) => {
    // Generate JWT Token
    const token = generateToken(req.user);
    // Redirect to frontend dashboard with token
    res.redirect(`${process.env.FRONTEND_URL}/dashboard?token=${token}`);
  }
);

// Protected Profile Route
router.get("/profile", isAuthenticated, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json({
      username: user.username,
      email: user.email,
      authMethod: user.authMethod,
      profilePic: user.profilePic || "https://via.placeholder.com/150",
    });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

export default router;

