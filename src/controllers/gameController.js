import { Request, Response } from 'express';
import { startNewGame, submitGameAnswer } from '../services/gameService';

export const startGame = async (req: Request, res: Response) => {
  const { userId, busId } = req.body;
  try {
    const game = await startNewGame(userId, busId);
    res.status(200).json(game);
  } catch (error) {
    res.status(500).json({ message: 'Error starting game' });
  }
};

export const submitGameAnswerController = async (req: Request, res: Response) => {
  const { userId, gameSessionId, answer } = req.body;
  try {
    const result = await submitGameAnswer(userId, gameSessionId, answer); // Call the service function
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: 'Error submitting answer' });
  }
};
