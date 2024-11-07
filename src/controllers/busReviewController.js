import { submitReview, getBusInfo, getReviewsForBus, updateReview, deleteReview } from '../services/busReviewService.js';

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
export const updateReviewController = async (req, res) => {
  const { reviewId, userId, rating, feedback, service, images } = req.body;
  try {
    const updatedReview = await updateReview(reviewId, userId, rating, feedback, service, images);
    res.status(200).json(updatedReview); // Return the updated review
  } catch (error) {
    console.error(error); // Log the error details for debugging
    res.status(500).json({ message: 'Error updating review', error: error.message });
  }
};
export const deleteReviewController = async (req, res) => {
  const { reviewId } = req.params;
  try {
    const deletedReview = await deleteReview(parseInt(reviewId));
    res.status(200).json({ message: 'Review deleted successfully', deletedReview });
  } catch (error) {
    console.error(error); // Log the error details for debugging
    res.status(500).json({ message: 'Error deleting review', error: error.message });
  }
};
