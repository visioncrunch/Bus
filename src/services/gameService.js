
import prisma from '../config/database.js';

export const startNewGame = async (userId, busId) => {
  return await prisma.gameSession.create({
    data: {
      userId,
      roomId: `${userId}-${busId}-${Date.now()}`,
      score: 0,
    },
  });
};

export const submitGameAnswer = async (userId, gameSessionId, answer) => {
  // Evaluate the answer and update the score
  const session = await prisma.gameSession.update({
    where: { id: gameSessionId },
    data: { score: 10 }, // Add scoring logic here
  });
  return session;
};
