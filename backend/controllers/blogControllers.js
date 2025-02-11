import Blog from '../models/Blog.Model.js';

export const createBlog = async (req, res) => {
  const { title, content } = req.body;
  const image = req.file ? req.file.path : null; // Get the file path if image is uploaded

  if (!title || !content) {
    return res.status(400).json({ message: 'Title and content are required.' });
  }

  try {
    const newBlog = new Blog({ title, content, image });
    await newBlog.save();
    res.status(201).json({ message: 'Blog created successfully', blog: newBlog });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create blog', error: error.message });
  }
};

export const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.status(200).json({ blogs });
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve blogs', error: error.message });
  }
};