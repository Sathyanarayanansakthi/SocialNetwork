import { PDFDocument } from "pdf-lib";
import PatternModel from "../models/PatternModel.js";
import fs from "fs/promises";

export const uploadPdf = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: "No file uploaded." });

    const { name, about, submittedDate, guide, patternDetails } = req.body;

    if (!name || !about || !submittedDate || !guide || !patternDetails) {
      await fs.unlink(req.file.path);
      return res.status(400).json({ error: "All fields are required." });
    }

    const pdfBuffer = await fs.readFile(req.file.path);
    const pdfDoc = await PDFDocument.load(pdfBuffer);

    if (pdfDoc.getPageCount() > 1) {
      await fs.unlink(req.file.path);
      return res.status(400).json({ error: "Only single-page PDFs are allowed." });
    }

    const newPattern = new PatternModel({
      filename: req.file.filename,
      fileUrl: `/uploads/${req.file.filename}`,
      name,
      about,
      submittedDate,
      guide,
      patternDetails,
    });

    await newPattern.save();
    res.status(201).json({ message: "PDF uploaded successfully!", pattern: newPattern });
  } catch (error) {
    if (req.file) await fs.unlink(req.file.path);
    console.error("Upload Error:", error);
    res.status(500).json({ error: "PDF upload failed." });
  }
};

export const getPatterns = async (req, res) => {
  try {
    const patterns = await PatternModel.find();
    res.status(200).json({ patterns });
  } catch (error) {
    console.error("Fetch Error:", error);
    res.status(500).json({ error: "Failed to fetch patterns." });
  }
};
