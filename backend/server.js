import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import path from "path";
import blogRoutes from "./routes/blogRoutes.js"; // Import your routes
import collabRoutes from "./routes/collabRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import patternRoutes from "./routes/patternRoutes.js";
import forumRoutes from "./routes/forumRoutes.js";
import eventRoutes from "./routes/eventRoutes.js";


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

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
    origin: process.env.FRONTEND_URL || "http://localhost:5173", // **CRITICAL: Verify this!**
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: "Content-Type,Authorization",
  })
);

const __dirname = path.resolve(); // This is important for correct path resolution
app.use("/uploads", express.static(path.join(__dirname, "uploads"))); // Serve static files

// Routes - Make sure you are using correct paths here.
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