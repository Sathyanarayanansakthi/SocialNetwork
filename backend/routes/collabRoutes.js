import express from "express";
import { createCollab, getAllCollabs } from "../controllers/collabControllers.js";

const router = express.Router();

// Create a new collaboration
router.post("/", createCollab);

// Get all collaborations
router.get("/", getAllCollabs);

export default router;