import { Router } from 'express';
import { 
  createLostFoundPost,
  getLostFoundItems,
  getLostFoundPostById,
  updateLostFoundPost,
  deleteLostFoundPost 
} from '../controllers/itemsController.js';

const router = Router();

// Create a lost/found item post
router.post('/', createLostFoundPost);

// Get all recent lost and found items
router.get('/', getLostFoundItems);

// Get a specific lost/found item post by its ID
router.get('/:postId', getLostFoundPostById);

// Update a lost/found item post by its ID
router.put('/:postId', updateLostFoundPost);

// Delete a lost/found item post by its ID
router.delete('/:postId', deleteLostFoundPost);

export default router;
