import express from "express";
import passport from "passport";
import { signUp, signIn } from "../controllers/authControllers.js";

const router = express.Router();

router.post("/signup", signUp);
router.post("/signin", signIn);

router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

router.get(
    "/google/callback",
    passport.authenticate("google", { failureRedirect: process.env.FRONTEND_URL + "/login" }),
    (req, res) => {
        res.redirect(process.env.FRONTEND_URL + "/dashboard");
    }
);

// GitHub authentication (Optional)
router.get("/github", passport.authenticate("github", { scope: ["user:email"] }));

router.get(
    "/github/callback",
    passport.authenticate("github", { failureRedirect: process.env.FRONTEND_URL + "/login" }),
    (req, res) => {
        res.redirect(process.env.FRONTEND_URL + "/dashboard");
    }
);

export default router;
