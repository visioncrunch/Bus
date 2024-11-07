import { Router } from 'express';
import { startGame, submitGameAnswerController } from '../controllers/gameController';

const router = Router();

router.post('/start', startGame);  // Start a new game
router.post('/submit-answer', submitGameAnswerController); // Submit answer for the game

export default router;
