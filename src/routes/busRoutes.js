import { Router } from 'express';
import { getBusInfoController, submitBusReview, fetchBusReviews, updateReviewController, deleteReviewController } from '../controllers/busReviewController.js';

const router = Router();

router.get('/info/:busId', getBusInfoController); // Get bus info (route, schedule, etc.)
router.post('/review', submitBusReview); // Submit a bus review
router.get('/reviews/:busId', fetchBusReviews); // Get reviews for a bus
router.put('/review', updateReviewController); // Update a bus review
router.delete('/review/:reviewId', deleteReviewController); // Delete a bus review

export default router;
