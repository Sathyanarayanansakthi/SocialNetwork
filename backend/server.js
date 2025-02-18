import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import session from "express-session";
import passport from "./config/passportConfig.js";
import authRoutes from "./routes/authRoutes.js";
import blogRoutes from "./routes/blogRoutes.js";  // Import blog routes
import collabRoutes from "./routes/collabRoutes.js";  // Import collaboration routes
import eventRoutes from "./routes/eventRoutes.js";  // Import event routes
import forumRoutes from "./routes/forumRoutes.js";  // Import forum routes
import patternRoutes from "./routes/patternRoutes.js";  // Import pattern routes

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// MongoDB Connection
mongoose
    .connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("✅ MongoDB Connected"))
    .catch((error) => {
        console.error("❌ MongoDB Connection Error:", error);
        process.exit(1);
    });

app.use(express.json());
app.use(
    cors({
        origin: process.env.FRONTEND_URL || "http://localhost:5173",
        methods: "GET,POST,PUT,DELETE",
        allowedHeaders: "Content-Type,Authorization",
        credentials: true,
    })
);

app.use(
    session({
        secret: process.env.SESSION_SECRET || "your-secret-key",
        resave: false,
        saveUninitialized: false,
        cookie: {
            secure: process.env.NODE_ENV === "production",
            httpOnly: true,
        },
    })
);

app.use(passport.initialize());
app.use(passport.session());

// API Routes
app.use("/api/collab", collabRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/patterns", patternRoutes);
app.use("/api/posts", forumRoutes);
app.use("/api/events", eventRoutes);


app.get("/", (req, res) => {
    res.send("🚀 API is running...");
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
