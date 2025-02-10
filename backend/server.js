import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import multer from 'multer';  // Import multer for file uploads
import blogRoutes from './routes/blogRoutes.js'; // Import the blogRoutes.js file

dotenv.config();

const app = express();

// Set up multer storage for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads'); // Save the file in the "uploads" directory
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname); // Ensure unique filenames
  }
});

const upload = multer({ storage: storage }); // Initialize multer with the storage config

app.use(express.json());
app.use(cors({
  origin: "http://localhost:5173", // Update frontend URL if needed
  methods: "GET,POST,PUT,DELETE",
  allowedHeaders: "Content-Type,Authorization"
}));

// Routes
app.use('/api/blogs', blogRoutes); // Use blogRoutes for all blog-related routes
app.post('/api/blogs/create', upload.single('image'), createBlog); // Special route for blog creation with image upload

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected'))
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  });

// Start server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
