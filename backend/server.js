import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import session from "express-session";
import passport from "./config/passportConfig.js";
import path from "path";


// Import Routes
import blogRoutes from "./routes/blogRoutes.js";
import collabRoutes from "./routes/collabRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import patternRoutes from "./routes/patternRoutes.js";
import forumRoutes from "./routes/forumRoutes.js";
import eventRoutes from "./routes/eventRoutes.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();

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

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
  })
);
app.use(
  session({
    secret: process.env.SESSION_SECRET || "secret",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

// Serve uploaded files
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.use("/api/collab", collabRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/patterns", patternRoutes);
app.use("/api/posts", forumRoutes);
app.use("/api/events", eventRoutes);

// Health Check
app.get("/", (req, res) => {
  res.send("🚀 API is running...");
});

// Handling 404 errors
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error("🚨 Server Error:", err);
  res.status(500).json({ message: "Internal Server Error", error: err.message });
});

// Server Listen
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));