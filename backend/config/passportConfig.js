import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as GitHubStrategy } from "passport-github2"; // If using GitHub
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
            try {
                let user = await User.findOne({ email: profile.emails[0].value });

                if (!user) {
                    user = await User.create({
                        username:
                            profile.displayName ||
                            `${profile.name?.givenName} ${profile.name?.familyName}` ||
                            "Unknown User",
                        email: profile.emails[0].value,
                        password: null, // Password is optional for OAuth users
                    });
                }

                done(null, user);
            } catch (error) {
                done(error);
            }
        }
    )
);

// GitHub Strategy (Optional)
// passport.use(
//     new GitHubStrategy(
//         {
//             clientID: process.env.GITHUB_CLIENT_ID,
//             clientSecret: process.env.GITHUB_CLIENT_SECRET,
//             callbackURL: "/api/auth/github/callback",
//         },
//         async (accessToken, refreshToken, profile, done) => {
//             try {
//                 let user = await User.findOne({ email: profile.emails[0]?.value });

//                 if (!user) {
//                     user = await User.create({
//                         username: profile.username || profile.displayName || "Unknown User",
//                         email: profile.emails[0]?.value,
//                         password: null, // Password is optional for OAuth users
//                     });
//                 }

//                 done(null, user);
//             } catch (error) {
//                 done(error);
//             }
//         }
//     )
// );

export default passport;
