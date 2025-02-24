import express from "express";
import { createEvent, getAllEvents } from "../controllers/eventController.js";
import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Store in uploads folder
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, `${uniqueSuffix}-${file.originalname}`);
  },
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png|gif/;
    const isValid = fileTypes.test(path.extname(file.originalname).toLowerCase());
    if (isValid) {
      return cb(null, true);
    } else {
      cb("Only image files are allowed!");
    }
  },
});

const router = express.Router();
router.post("/", upload.single("poster"), createEvent);
router.get("/", getAllEvents);

export default router;
