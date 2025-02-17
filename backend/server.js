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
app.use(bodyParser.json());
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: "Content-Type,Authorization",
  })
);

const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api/collab", collabRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/patterns", patternRoutes); // Correct route for patterns
app.use("/api/posts", forumRoutes);

app.get("/", (req, res) => {
  res.send("🚀 API is running...");
});

app.use((err, req, res, next) => {
  console.error("Server Error:", err);
  res.status(500).json({ error: "Internal Server Error" });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));