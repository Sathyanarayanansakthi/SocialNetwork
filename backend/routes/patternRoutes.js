  import express from "express";
  import multer from "multer";
  import { uploadPdf, getPatterns } from "../controllers/patternController.js";

  const router = express.Router();

  // File upload configuration
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`);
    },
  });

  const upload = multer({ storage });

  // Routes
  router.post("/upload", upload.single("file"), uploadPdf);
  router.get("/", getPatterns);

  export default router;
