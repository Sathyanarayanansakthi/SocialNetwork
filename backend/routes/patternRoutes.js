  import express from "express";
  import multer from "multer";
  import path from "path";
  import PatternModel from "../models/PatternModel.js";

  const router = express.Router();

  // Configure multer for file uploads
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "uploads/"); // Ensure this directory exists
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`);
    },
  });

  const upload = multer({ storage });

  // Handle file upload
  router.post("/upload", upload.single("pdfFile"), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
      }

      const { name, about, submittedDate, guide, patternDetails } = req.body;

      // Create a new pattern document
      const newPattern = new PatternModel({
        filename: req.file.filename,
        fileUrl: `/uploads/${req.file.filename}`,
        name,
        about,
        submittedDate: new Date(submittedDate),
        guide,
        patternDetails,
      });

      await newPattern.save();

      res.status(201).json({ message: "File uploaded successfully!", pattern: newPattern });
    } catch (error) {
      console.error("Error uploading file:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

  // Fetch all patterns
  router.get("/", async (req, res) => {
    try {
      const patterns = await PatternModel.find();
      res.status(200).json({ patterns });
    } catch (error) {
      console.error("Error fetching patterns:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

  export default router;