import { Request, Response } from 'express';
import { submitReview, getBusInfo } from '../services/busReviewService';

export const getBusInfoController = async (req: Request, res: Response) => {
  const busId = parseInt(req.params.busId);
  try {
    const busInfo = await getBusInfo(busId); // Call the service function
    res.status(200).json(busInfo); 
  } catch (error) {
    res.status(500).json({ message: 'Error fetching bus info' });
  }
};

export const submitBusReview = async (req: Request, res: Response) => {
  const { userId, busId, rating, feedback, service, images } = req.body;
  try {
    const review = await submitReview(userId, busId, rating, feedback, service, images);
    res.status(201).json(review);
  } catch (error) {
    res.status(500).json({ message: 'Error submitting review' });
  }
};
