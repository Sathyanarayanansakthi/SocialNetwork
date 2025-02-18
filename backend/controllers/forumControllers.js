import Post from "../models/ForumModel.js";

// Create a new forum post
export const createPost = async (req, res) => {
  try {
    const { title, content, tags } = req.body;

    // Ensure tags are handled as an array (split by commas if it's a string)
    const tagsArray = Array.isArray(tags) ? tags : tags.split(",").map(tag => tag.trim());

    // Create a new post instance
    const newPost = new Post({ title, content, tags: tagsArray });
    
    // Save the post to the database
    await newPost.save();

    // Return the response after saving the post
    res.status(201).json({ message: "Post created successfully", post: newPost });
  } catch (error) {
    res.status(500).json({ error: "Error creating post", details: error.message });
  }
};

// Get all forum posts
export const getPosts = async (req, res) => {
  try {
    // Fetch posts from the database, sorted by creation date
    const posts = await Post.find().sort({ createdAt: -1 });
    
    // Return the posts in the response
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: "Error fetching posts" });
  }
};
