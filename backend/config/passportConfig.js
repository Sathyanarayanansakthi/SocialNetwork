import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as GitHubStrategy } from "passport-github2";
import dotenv from "dotenv";
import User from "../models/UserModel.js";

dotenv.config();

// Serialize User
passport.serializeUser((user, done) => done(null, user.id));

// Deserialize User
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

// Google Strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/api/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails?.[0]?.value;
        if (!email) return done(new Error("No email found"), null);

        let user = await User.findOne({ email });

        if (!user) {
          user = await User.create({
            username: profile.displayName || "Google User",
            email,
            accessToken,
            refreshToken,
            authMethod: "Google",
            profilePic: profile.photos[0].value,
          });
        } else {
          user.accessToken = accessToken;
          if (refreshToken) user.refreshToken = refreshToken;
          user.authMethod = "Google";
          await user.save();
        }

        done(null, user);
      } catch (error) {
        done(error, null);
      }
    }
  )
);

// GitHub Strategy
passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: "/api/auth/github/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails?.[0]?.value || `github_${profile.id}@noemail.com`;

        let user = await User.findOne({ email });

        if (!user) {
          user = await User.create({
            username: profile.username || "GitHub User",
            email,
            accessToken,
            refreshToken,
            authMethod: "GitHub",
            profilePic: profile.photos[0]?.value || "",
          });
        } else {
          user.accessToken = accessToken;
          if (refreshToken) user.refreshToken = refreshToken;
          user.authMethod = "GitHub";
          await user.save();
        }

        done(null, user);
      } catch (error) {
        done(error, null);
      }
    }
  )
);

export default passport;
