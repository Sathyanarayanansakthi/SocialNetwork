import Post from "../models/ForumModel.js";

// Create a new forum post
export const createPost = async (req, res) => {
  try {
    const { title, content, tags } = req.body;

    if (!title || !content) {
      return res.status(400).json({ error: "Title and content are required" });
    }

    // Ensure tags are handled as an array
    const tagsArray = Array.isArray(tags) ? tags : tags.split(",").map(tag => tag.trim());

    const newPost = new Post({ title, content, tags: tagsArray });

    await newPost.save();

    res.status(201).json({ message: "Post created successfully", post: newPost });
  } catch (error) {
    res.status(500).json({ error: "Error creating post", details: error.message });
  }
};

// Get all forum posts
export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });

    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: "Error fetching posts", details: error.message });
  }
};

// Add a comment to a post
export const addComment = async (req, res) => {
  try {
    const { postId } = req.params;
    const { author, text } = req.body;

    if (!author || !text) {
      return res.status(400).json({ error: "Author and comment text are required" });
    }

    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    post.comments.push({ author, text });
    await post.save();

    res.status(201).json({ message: "Comment added", post });
  } catch (error) {
    res.status(500).json({ error: "Error adding comment", details: error.message });
  }
};
