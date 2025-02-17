import express from "express";
import multer from "multer";
import fs from "fs";
import { getPatterns, uploadPdf } from "../controllers/patternController.js";

const router = express.Router();

const uploadDir = "./uploads";
fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "application/pdf") {
    cb(null, true);
  } else {
    cb(new Error("Only PDF files are allowed"));
  }
};

const upload = multer({ storage, fileFilter });

router.get("/", getPatterns);
router.post("/upload", upload.single("pdfFile"), uploadPdf); // Added /upload for clarity

export default router;