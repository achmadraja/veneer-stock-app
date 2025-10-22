import PDFDocument from "pdfkit";
import fs from "fs";

export const generateStockReportPDF = (data, filename) => {
  const doc = new PDFDocument({ margin: 30 });
  const stream = fs.createWriteStream(filename);
  doc.pipe(stream);

  doc.fontSize(18).text("Laporan Stok Harian Veneer", { align: "center" });
  doc.moveDown();

  data.forEach((item, index) => {
    doc
      .fontSize(12)
      .text(
        `${index + 1}. ${item.product_name} | Tanggal: ${item.date} | Stok Terakhir: ${item.last_stock} | Produksi: ${item.production_today} | Total: ${item.total_stock}`
      );
  });

  doc.end();
  return filename;
};
