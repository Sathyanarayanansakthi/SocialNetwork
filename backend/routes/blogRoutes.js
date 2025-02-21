import express from 'express';
import { createBlog, getAllBlogs } from '../controllers/blogControllers.js';
import multer from 'multer';

const router = express.Router();

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

// Route to create a new blog (with image upload)
router.post('/create', upload.single('image'), createBlog);

// Route to fetch all blogs
router.get('/', getAllBlogs);

export default router;