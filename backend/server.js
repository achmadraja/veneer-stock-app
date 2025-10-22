import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';
import productRoutes from './routes/productRoutes.js';
import productionRoutes from './routes/productionRoutes.js';
import batchRoutes from './routes/batchRoutes.js';
import stockRoutes from './routes/stockRoutes.js';
import reportRoutes from "./routes/reportRoutes.js";
import "./cron/dailyReport.js";


dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/productions', productionRoutes);
app.use('/api/batches', batchRoutes);
app.use('/api/stocks', stockRoutes);
app.use('/api/reports', reportRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
