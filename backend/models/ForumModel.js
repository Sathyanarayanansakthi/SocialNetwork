import mongoose from "mongoose";

// Forum Post Schema
const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  tags: { type: [String], default: [] }, // Array to store tags
  createdAt: { type: Date, default: Date.now }, // Date of creation
});

const Post = mongoose.model("Post", postSchema);

export default Post;
