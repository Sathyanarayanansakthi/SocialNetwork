import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import multer from 'multer'; // Import multer for file uploads
import blogRoutes from './routes/blogRoutes.js'; // Import blog routes
import collabRoutes from './routes/collabRoutes.js';

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Multer configuration for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Save uploaded files to the 'uploads' folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname); // Unique filename
  },
});

const upload = multer({ storage });

// Middleware
app.use(express.json()); // Parse JSON request bodies
app.use(cors({
  origin: "http://localhost:5173", // Allow requests from your frontend URL
  methods: "GET,POST,PUT,DELETE", // Allow these HTTP methods
  allowedHeaders: "Content-Type,Authorization", // Allow these headers
}));

// Serve static files (e.g., uploaded images)
app.use("/uploads", express.static("uploads"));

// Use routes
app.use("/api/collab", collabRoutes); // Mount collabRoutes at /api/collab
app.use("/api/blogs", blogRoutes); // Mount blogRoutes at /api/blogs

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected'))
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1); // Exit the process if MongoDB connection fails
  });

// Start server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});