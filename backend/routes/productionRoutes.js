import express from 'express';
import {
  createProduction,
  getDailyStockReport,
  getBatchProductionReport
} from '../controllers/productionController.js';
import { verifyToken } from '../middleware/authMiddleware.js';

const router = express.Router();
router.use(verifyToken);

router.post('/', createProduction);
router.get('/report/daily', getDailyStockReport);
router.get('/report/batch/:batch_id', getBatchProductionReport);

export default router;
