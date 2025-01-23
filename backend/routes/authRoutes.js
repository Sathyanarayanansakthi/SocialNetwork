//imports
import express from 'express';
// import cors from 'cors';
import {test,registerUser} from '../controllers/authControllers.js';

const router = express.Router();

// Middleware to enable CORS
// router.use(
//   cors({
//     credentials: true,
//     origin: 'http://localhost:5173',
//   })
// );

// Route
router.get('/', test);
router.post('/register',registerUser)

export default router;

