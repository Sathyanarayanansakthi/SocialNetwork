import Blog from '../models/Blog.Model.js'; // Adjust the path as needed

export const createBlog = async (req, res) => {
  const { title, content } = req.body;
  const image = req.file ? req.file.path : null; // If image is uploaded, store the file path

  if (!title || !content || !image) {
    return res.status(400).json({ message: 'All fields are required.' });
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
