import { PDFDocument } from "pdf-lib";
import PatternModel from "../models/PatternModel.js";
import fs from "fs/promises";

export const uploadPdf = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const { name, about, submittedDate, guide, patternDetails } = req.body;

    if (!name || !about || !submittedDate || !guide || !patternDetails) {
      await fs.unlink(req.file.path);
      return res.status(400).json({ error: "All fields must be filled" });
    }

    const pdfBuffer = await fs.readFile(req.file.path);
    const pdfDoc = await PDFDocument.load(pdfBuffer);
    const totalPages = pdfDoc.getPageCount();

    if (totalPages > 1) {
      await fs.unlink(req.file.path);
      return res.status(400).json({ error: "Only single-page PDFs are allowed" });
    }

    const newPdf = new PatternModel({
      filename: req.file.filename,
      fileUrl: `/uploads/${req.file.filename}`,
      name,
      about,
      submittedDate,
      guide,
      patternDetails,
    });

    await newPdf.save();
    res.status(200).json({ message: "PDF uploaded successfully", pdf: newPdf });

  } catch (error) {
    console.error("Upload PDF Error:", error);
    if (req.file) {
      await fs.unlink(req.file.path);
    }
    res.status(500).json({ error: "Failed to upload PDF" });
  }
};

export const getPatterns = async (req, res) => {
  try {
    const patterns = await PatternModel.find();
    console.log("Patterns being sent:", { patterns });
    res.json({ patterns }); 
  } catch (error) {
    console.error("Fetch Patterns Error:", error);
    res.status(500).json({ error: "Failed to fetch patterns" });
  }
};
