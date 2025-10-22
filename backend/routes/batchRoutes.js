import express from 'express';
import { createBatch, getBatches, closeBatch } from '../controllers/batchController.js';
import { verifyToken } from '../middleware/authMiddleware.js';

const router = express.Router();
router.use(verifyToken);

router.post('/', createBatch);
router.get('/', getBatches);
router.put('/:id/close', closeBatch);

export default router;
