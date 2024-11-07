
import prisma from '../config/database';

export const submitReview = async (userId: number, busId: number, rating: number, feedback: string, service: string, images: string[]) => {
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

export const getBusInfo = async (busId: number) => {
  return await prisma.bus.findUnique({
    where: { id: busId },
    select: {
      route: true,
      schedule: true,
      location: true,
    },
  });
};
