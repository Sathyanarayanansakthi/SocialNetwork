import express from 'express';
import { signUp, signIn } from '../controllers/authControllers.js';

const router = express.Router();

// Register Route
router.post('/signup', signUp);

// Sign In Route
router.post('/signin', signIn);

export default router;
