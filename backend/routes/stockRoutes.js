import express from "express";
import {
  addStock,
  getAllStocks,
  getStockByProduct,
} from "../controllers/stockController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", verifyToken, addStock);
router.get("/", verifyToken, getAllStocks);
router.get("/:product_id", verifyToken, getStockByProduct);

export default router;
