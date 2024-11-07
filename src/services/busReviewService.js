// src/services/busReviewService.ts
import prisma from '../prismaClient.js';

export const submitReview = async (userId, busId, rating, feedback, service, images) => {
  try {
    // Check if the bus exists
    const busExists = await prisma.bus.findUnique({
      where: { id: busId }
    });

    if (!busExists) {
      throw new Error('Bus not found');
    }

    // Proceed with creating the review if the bus exists
    const review = await prisma.review.create({
      data: {
        userId: userId,
        busId: busId,
        rating: rating,
        feedback: feedback,
        service: service,
        images: images, // Ensure this is an array of image URLs
      },
    });
    return review; // Return the created review
  } catch (error) {
    console.error(error); // Log any database errors
    throw error; // Rethrow the error to be caught in the controller
  }
};


export const getReviewsForBus = async (busId) => {
  return await prisma.review.findMany({
    where: { busId },
    orderBy: { createdAt: 'desc' },
  });
};

export const getBusInfo = async (busId) => {
  try {
    const busInfo = await prisma.bus.findUnique({
      where: { id: busId },
      include: {
        reviews: true,  // Include reviews if you want them with bus info
      },
    });
    if (!busInfo) {
      throw new Error('Bus not found');
    }
    return busInfo;
  } catch (error) {
    console.error('Error fetching bus info:', error);
    throw error;
  }
};

export const updateReview = async (reviewId, userId, rating, feedback, service, images) => {
  try {
    const review = await prisma.review.update({
      where: { id: reviewId },
      data: {
        rating,
        feedback,
        service,
        images, // Update the images array
      },
    });

    if (!review) {
      throw new Error('Review not found');
    }

    return review;
  } catch (error) {
    console.error('Error updating review:', error);
    throw error;
  }
};

export const deleteReview = async (reviewId) => {
  try {
    const review = await prisma.review.delete({
      where: { id: reviewId },
    });

    if (!review) {
      throw new Error('Review not found');
    }

    return review;
  } catch (error) {
    console.error('Error deleting review:', error);
    throw error;
  }
};
