import mongoose from "mongoose";

// Define the comment schema
const commentSchema = new mongoose.Schema({
  author: { type: String, required: true },
  text: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

// Define the post schema
const postSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    tags: [{ type: String }],
    comments: [commentSchema],
  },
  { timestamps: true }
);

// Create and export the Post model
const Post = mongoose.model("Post", postSchema);
export default Post;
