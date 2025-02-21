// config/passport.js
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as GitHubStrategy } from "passport-github2";
import User from "../models/UserModel.js";
import dotenv from "dotenv";

dotenv.config();

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/api/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      // ... (Google Strategy code)
      try {
        const email = profile.emails?.[0]?.value;
        if (!email) {
          return done(new Error("No email found from Google profile"), null);
        }
        let user = await User.findOne({ email });
        if (!user) {
          user = await User.create({
            username: profile.displayName || `${profile.name?.givenName} ${profile.name?.familyName}` || "Unknown User",
            email,
            password: null,
            accessToken,
            refreshToken: refreshToken || null,
            authMethod: "Google",
          });
        } else {
          user.accessToken = accessToken;
          if (refreshToken) user.refreshToken = refreshToken;
          user.authMethod = "Google";
          await user.save();
        }
        done(null, user);
      } catch (error) {
        done(error);
      }
    }
  )
);

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: "/api/auth/github/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      // ... (GitHub Strategy code)
      try {
        let email = profile.emails?.[0]?.value || `github_${profile.id}@noemail.com`;
        let user = await User.findOne({ email });
        if (!user) {
          user = await User.create({
            username: profile.displayName || profile.username || "Unknown User",
            email,
            password: null,
            accessToken,
            refreshToken: refreshToken || null,
            authMethod: "GitHub",
          });
        } else {
          user.accessToken = accessToken;
          if (refreshToken) user.refreshToken = refreshToken;
          user.authMethod = "GitHub";
          await user.save();
        }
        done(null, user);
      } catch (error) {
        done(error);
      }
    }
  )
);

export default passport;