
import express from 'express';
import busRoutes from './routes/busRoutes.js';
import gameRoutes from './routes/gameRoutes.js';
import { errorHandler } from './middlewares/errorHandler.js';

const app = express();

app.use(express.json());
app.use('/api/buses', busRoutes);
app.use('/api/game', gameRoutes);

app.use(errorHandler);

export default app;
