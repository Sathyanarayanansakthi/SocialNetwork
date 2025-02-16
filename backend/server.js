import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import path from "path";
import blogRoutes from "./routes/blogRoutes.js";
import collabRoutes from "./routes/collabRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import patternRoutes from "./routes/patternRoutes.js";
import forumRoutes from "./routes/forumRoutes.js";

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB (Directly inside server.js)
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
app.use(bodyParser.json());
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: "Content-Type,Authorization",
  })
);

// Serve static files (PDF uploads)
const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.use("/api/collab", collabRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/pdf", patternRoutes);
app.use("/api/posts", forumRoutes); // ✅ Forum posts added

// Default route (health check)
app.get("/", (req, res) => {
  res.send("🚀 API is running...");
});

// Global Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(" Server Error:", err.message);
  res.status(500).json({ error: "Internal Server Error" });
});

// Start server
app.listen(PORT, () => console.log(` Server running on port ${PORT}`));
