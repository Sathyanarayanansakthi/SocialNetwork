import express from "express";
import { createPost, getPosts, addComment } from "../controllers/forumControllers.js";

const router = express.Router();

router.post("/", createPost);
router.get("/", getPosts);
router.post("/:postId/comments", addComment);

export default router;
