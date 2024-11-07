
import prisma from '../config/database';

export const submitReview = async (userId, busId, rating, feedback, service, images) => {
  return await prisma.busReview.create({
    data: {
      userId,
      busId,
      rating,
      feedback,
      service,
      images,
    },
  });
};

export const getBusInfo = async (busId) => {
  return await prisma.bus.findUnique({
    where: { id: busId },
    select: {
      route: true,
      schedule: true,
      location: true,
    },
  });
};
