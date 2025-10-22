import express from "express";
import { generateDailyReport } from "../controllers/reportController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/daily", verifyToken, generateDailyReport);

export default router;
