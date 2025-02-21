import express from "express";
import passport from "passport";
import { signUp, signIn } from "../controllers/authControllers.js";
import User from "../models/UserModel.js";
import isAuthenticated from "../middleware/authMiddleware.js";
import { generateToken } from "../config/jwt.js";

const router = express.Router();

// Local Sign-Up Route
router.post("/signup", signUp);

// Local Sign-In Route
router.post("/signin", signIn);

// Google OAuth Route
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// Google OAuth Callback
router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/signin" }),
  (req, res) => {
    const token = generateToken(req.user);
    res.redirect(`${process.env.FRONTEND_URL}/?token=${token}`);
  }
);

// GitHub OAuth Route
router.get(
  "/github",
  passport.authenticate("github", { scope: ["user:email"] })
);

// GitHub OAuth Callback
router.get(
  "/github/callback",
  passport.authenticate("github", { failureRedirect: "/signin" }),
  (req, res) => {
    const token = generateToken(req.user);
    res.redirect(`${process.env.FRONTEND_URL}/?token=${token}`);
  }
);

// Protected Profile Route
router.get("/profile", isAuthenticated, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const profileData = {
      name: user.username,
      username: user.username,
      bio: user.bio || "",
      description: user.description || "",
      authMethod: user.authMethod || "Local",
      profilePic: user.profilePic || "https://via.placeholder.com/150",
    };
    res.json(profileData);
  } catch (error) {
    console.error("Error fetching profile:", error);
    res.status(500).json({ error: "Failed to fetch profile" });
  }
});

export default router;
