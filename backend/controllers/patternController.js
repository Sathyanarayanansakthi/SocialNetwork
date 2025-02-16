import fs from "fs";
import { PDFDocument } from "pdf-lib";
import PatternModel from "../models/PatternModel.js";

export const uploadPdf = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: "No file uploaded" });
        }

        const pdfBuffer = await fs.promises.readFile(req.file.path);
        const pdfDoc = await PDFDocument.load(pdfBuffer);
        const totalPages = pdfDoc.getPageCount();

        // Check if PDF has more than one page
        if (totalPages > 1) {
            await fs.promises.unlink(req.file.path); // Async file deletion
            return res.status(400).json({ error: "Only single-page PDFs are allowed" });
        }

        // Save file details to the database
        const newPdf = new PatternModel({
            filename: req.file.filename,
            fileUrl: `/uploads/${req.file.filename}`
        });

        await newPdf.save();
        res.status(200).json({ message: "PDF uploaded successfully", pdf: newPdf });

    } catch (error) {
        console.error("Upload Error:", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};
// Assuming you already have other necessary imports
export const getPatterns = (req, res) => {
    // Sample data for patterns
    const patterns = [
        { id: 1, name: "Pattern 1", description: "Description of Pattern 1" },
        { id: 2, name: "Pattern 2", description: "Description of Pattern 2" },
        { id: 3, name: "Pattern 3", description: "Description of Pattern 3" },
        // You can retrieve this data from a database in real cases
    ];

    res.json({ patterns });
};

