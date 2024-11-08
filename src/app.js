import express from 'express';
import busRoutes from './routes/busRoutes.js';
import gameRoutes from './routes/gameRoutes.js';
import itemsRoutes from './routes/itemsRoutes.js';
import userRoutes from './routes/userRoutes.js';  // User routes for signup/login
import { errorHandler } from './middlewares/errorHandler.js';
import { verifyToken } from './middlewares/jwtMiddleware.js';  // Import JWT verification middleware

const app = express();

app.use(express.json());

// Public routes
app.use('/api/users', userRoutes); // Public signup/login routes

// Protected routes (only accessible with a valid JWT)
app.use('/api/buses', verifyToken, busRoutes);  // Protect buses routes
app.use('/api/game', verifyToken, gameRoutes);  // Protect game routes
app.use('/api/items', verifyToken, itemsRoutes);  // Protect items routes

app.use(errorHandler);

export default app;
