import mongoose from "mongoose";

const forumSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    tags: {
      type: [String],
      required: true,
    },
  },
  { timestamps: true }
);

const Forum = mongoose.model("Forum", forumSchema); 

export default Forum; 
