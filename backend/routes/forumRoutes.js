import express from "express";
import { createPost, getPosts } from "../controllers/forumControllers.js";

const router = express.Router();

router.post("/", createPost);
router.get("/", getPosts);

export default router;
