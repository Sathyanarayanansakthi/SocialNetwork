import express from "express";
import { createPost, getPosts } from "../controllers/forumControllers.js";

const router = express.Router();

// Route for creating a new post
router.post("/", createPost);

// Route for getting all posts
router.get("/", getPosts);

export default router;
