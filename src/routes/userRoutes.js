import express from 'express';
import { signup, login } from '../controllers/userController.js';
import { sendOTPMiddleware, verifyOTPMiddleware } from '../middlewares/otpmiddleware.js';

const router = express.Router();

// Route for user signup
router.post('/signup', sendOTPMiddleware);
router.post('/signup/verify', verifyOTPMiddleware, signup);

// Route for user login
router.post('/login', login);

export default router;
