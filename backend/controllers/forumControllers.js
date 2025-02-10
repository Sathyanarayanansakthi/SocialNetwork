import Forum from "../models/ForumModel.js";

// @desc    Create a new forum post
// @route   POST /api/forums
// @access  Public
export const createForumPost = async (req, res) => {
  try {
    const { title, content, tags } = req.body;

    if (!title || !content || !tags) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newForumPost = new Forum({
      title,
      content,
      tags: tags.split(",").map((tag) => tag.trim()), // Convert tags into an array
    });

    await newForumPost.save();
    res.status(201).json({ message: "Forum post created successfully", newForumPost });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all forum posts
// @route   GET /api/forums
// @access  Public
export const getAllForumPosts = async (req, res) => {
  try {
    const forumPosts = await Forum.find().sort({ createdAt: -1 });
    res.status(200).json(forumPosts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get a single forum post by ID
// @route   GET /api/forums/:id
// @access  Public
export const getForumPostById = async (req, res) => {
  try {
    const forumPost = await Forum.findById(req.params.id);
    if (!forumPost) {
      return res.status(404).json({ message: "Forum post not found" });
    }
    res.status(200).json(forumPost);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete a forum post
// @route   DELETE /api/forums/:id
// @access  Public
export const deleteForumPost = async (req, res) => {
  try {
    const forumPost = await Forum.findById(req.params.id);
    if (!forumPost) {
      return res.status(404).json({ message: "Forum post not found" });
    }

    await forumPost.deleteOne();
    res.status(200).json({ message: "Forum post deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
