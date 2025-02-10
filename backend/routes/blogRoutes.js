import express from 'express';
import { createBlog, getAllBlogs } from '../controllers/blogControllers.js'; // Adjust path as needed

const router = express.Router();

// Route to create a new blog (handled with multer upload in server.js)
router.post('/create', createBlog);

// Route to fetch all blogs
router.get('/', getAllBlogs);

export default router;
