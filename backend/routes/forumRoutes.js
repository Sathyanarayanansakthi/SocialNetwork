import express from "express";
import {
  createForumPost,
  getAllForumPosts,
  getForumPostById,
  deleteForumPost,
} from "../controllers/forumControllers.js";

const router = express.Router();

// Create a new forum post
router.post("/", createForumPost);

// Get all forum posts
router.get("/", getAllForumPosts);

// Get a single forum post by ID
router.get("/:id", getForumPostById);

// Delete a forum post by ID
router.delete("/:id", deleteForumPost);

export default router;
