import Post from "../models/ForumModel.js";

// Create a new forum post
export const createPost = async (req, res) => {
  try {
    const { title, content, tags } = req.body;
    const tagsArray = tags.split(",").map(tag => tag.trim());

    const newPost = new Post({ title, content, tags: tagsArray });
    await newPost.save();

    res.status(201).json({ message: "Post created successfully", post: newPost });
  } catch (error) {
    res.status(500).json({ error: "Error creating post" });
  }
};

// Get all posts
export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: "Error fetching posts" });
  }
};
