// routes/eventRoutes.js
import express from 'express';
import { createEvent, getAllEvents } from '../controllers/eventController.js'; // Import your controller
import multer from 'multer';
import path from 'path';

const router = express.Router();

const storage = multer.diskStorage({/* ... */});
const upload = multer({ storage: storage });

router.post('/', upload.single('poster'), createEvent); // This is the CRITICAL line
router.get('/', getAllEvents);

export default router;