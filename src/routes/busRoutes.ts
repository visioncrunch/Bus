import { Router } from 'express';
import { getBusInfoController, submitBusReview } from '../controllers/busReviewController';

const router = Router();

router.get('/info/:busId', getBusInfoController); // Get bus info (route, schedule, etc.)
router.post('/review', submitBusReview); // Submit a bus review

export default router;
