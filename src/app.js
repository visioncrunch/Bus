
import express, { Application } from 'express';
import busRoutes from './routes/busRoutes';
import gameRoutes from './routes/gameRoutes';
import { errorHandler } from './middlewares/errorHandler';

const app = express();

app.use(express.json());
app.use('/api/bus', busRoutes);
app.use('/api/game', gameRoutes);

app.use(errorHandler);

export default app;
