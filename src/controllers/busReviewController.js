import { submitReview, getBusInfo, getReviewsForBus } from '../services/busReviewService.js';

export const getBusInfoController = async (req, res) => {
  const busId = parseInt(req.params.busId);
  try {
    const busInfo = await getBusInfo(busId); // Call the service function
    res.status(200).json(busInfo); 
  } catch (error) {
    res.status(500).json({ message: 'Error fetching bus info' });
  }
};

export const submitBusReview = async (req, res) => {
  const { userId, busId, rating, feedback, service, images } = req.body;
  try {
    const review = await submitReview(userId, busId, rating, feedback, service, images);
    res.status(201).json(review); // Return the created review
  } catch (error) {
    console.error(error); // Log the error details to the console for debugging
    res.status(500).json({ message: 'Error submitting review', error: error.message });
  }
};

export const fetchBusReviews = async (req, res) => {
  const busId = parseInt(req.params.busId);
  try {
    const reviews = await getReviewsForBus(busId);
    res.status(200).json(reviews);
  } catch (error) {
    console.error(error); // Log the error details to the console for debugging
    res.status(500).json({ message: 'Error submitting review', error: error.message });
  }
};
