import ExcelJS from "exceljs";

export const generateStockReportExcel = async (data, filename) => {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet("Laporan Stok Harian");

  worksheet.columns = [
    { header: "Tanggal", key: "date", width: 15 },
    { header: "Produk", key: "product_name", width: 25 },
    { header: "Stok Terakhir", key: "last_stock", width: 15 },
    { header: "Produksi Hari Ini", key: "production_today", width: 20 },
    { header: "Total Stok Hari Ini", key: "total_stock", width: 20 },
  ];

  data.forEach((item) => worksheet.addRow(item));

  await workbook.xlsx.writeFile(filename);
  return filename;
};
