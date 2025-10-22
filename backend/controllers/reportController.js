import pool from "../config/db.js";
import { generateStockReportExcel } from "../utils/excelHelper.js";
import { generateStockReportPDF } from "../utils/pdfHelper.js";

const today = new Date().toISOString().split("T")[0];

export const generateDailyReport = async (req, res) => {
  try {
    const { start_date, end_date, format } = req.query;

    const result = await pool.query(
      `SELECT s.date, p.name AS product_name, s.last_stock, s.production_today, s.total_stock
       FROM stocks s
       JOIN products p ON s.product_id = p.id
       WHERE s.date BETWEEN $1 AND $2
       ORDER BY s.date DESC`,
      [start_date || today, end_date || today]
    );

    const data = result.rows;
    if (data.length === 0)
      return res.status(404).json({ message: "Tidak ada data untuk rentang waktu tersebut" });

    const filename =
      format === "excel"
        ? `./reports/stock_report_${today}.xlsx`
        : `./reports/stock_report_${today}.pdf`;

    if (format === "excel") {
      await generateStockReportExcel(data, filename);
    } else {
      generateStockReportPDF(data, filename);
    }

    res.download(filename);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Gagal membuat laporan harian" });
  }
};
