import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import { getPatterns, uploadPdf } from "../controllers/patternController.js";

const router = express.Router();

// Ensure uploads directory exists
const uploadDir = "./uploads";
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Multer Storage for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

// File Filter (Allow Only PDFs)
const fileFilter = (req, file, cb) => {
    if (file.mimetype === "application/pdf") {
        cb(null, true);
    } else {
        cb(new Error("Only PDF files are allowed"), false);
    }
};

// Initialize multer
const upload = multer({ storage, fileFilter });

// Route to fetch all patterns
router.get("/patterns", getPatterns);

// Route to upload PDF
router.post("/upload", upload.single("pdfFile"), uploadPdf);

export default router;
