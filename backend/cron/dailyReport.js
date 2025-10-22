import cron from "node-cron";
import pool from "../config/db.js";
import { generateStockReportExcel } from "../utils/excelHelper.js";

cron.schedule("15 16 * * *", async () => {
  console.log("⏰ Membuat laporan stok harian otomatis...");

  const today = new Date().toISOString().split("T")[0];
  const result = await pool.query(`
    SELECT s.date, p.name AS product_name, s.last_stock, s.production_today, s.total_stock
    FROM stocks s
    JOIN products p ON s.product_id = p.id
    WHERE s.date = $1
  `, [today]);

  if (result.rows.length > 0) {
    const filename = `./reports/stock_report_${today}.xlsx`;
    await generateStockReportExcel(result.rows, filename);
    console.log(`✅ Laporan harian dibuat: ${filename}`);
  } else {
    console.log("⚠️ Tidak ada data stok hari ini.");
  }
});
