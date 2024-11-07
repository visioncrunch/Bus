import { Router } from 'express';
import { getBusInfoController, submitBusReview, fetchBusReviews  } from '../controllers/busReviewController.js';

const router = Router();

router.get('/info/:busId', getBusInfoController); // Get bus info (route, schedule, etc.)
router.post('/review', submitBusReview); // Submit a bus review
router.get('/reviews/:busId', fetchBusReviews);
export default router;
