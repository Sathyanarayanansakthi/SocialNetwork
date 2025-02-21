import mongoose from "mongoose";

// Define the comment schema
const commentSchema = new mongoose.Schema({
  author: { type: String, required: true },
  text: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

// Define the forum post schema
const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  tags: { type: [String], default: [] },
  comments: { type: [commentSchema], default: [] }, // Array of comments
  createdAt: { type: Date, default: Date.now },
});

// Prevent model overwrite issue
const Post = mongoose.models.Post || mongoose.model("Post", postSchema);

export default Post;
