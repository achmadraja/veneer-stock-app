import { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";
import Navbar from "../components/Navbar";

export default function Dashboard() {
  const [stocks, setStocks] = useState([]);

  const fetchStocks = async () => {
    const res = await axiosInstance.get("/stocks");
    setStocks(res.data);
  };

  const exportReport = async (format) => {
    const res = await axiosInstance.get(`/reports/daily?format=${format}`, {
      responseType: "blob",
    });
    const url = window.URL.createObjectURL(new Blob([res.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute(
      "download",
      `report_harian_${new Date().toISOString().split("T")[0]}.${format === "excel" ? "xlsx" : "pdf"}`
    );
    document.body.appendChild(link);
    link.click();
  };

  useEffect(() => {
    fetchStocks();
  }, []);

  return (
    <>
      <Navbar />
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">📦 Stok Harian</h2>
          <div className="space-x-2">
            <button
              onClick={() => exportReport("excel")}
              className="bg-green-500 text-white px-3 py-1 rounded"
            >
              Export Excel
            </button>
            <button
              onClick={() => exportReport("pdf")}
              className="bg-red-500 text-white px-3 py-1 rounded"
            >
              Export PDF
            </button>
          </div>
        </div>

        <table className="w-full border-collapse bg-white shadow-md rounded-xl overflow-hidden">
          <thead className="bg-amber-600 text-white">
            <tr>
              <th className="p-3">Tanggal</th>
              <th className="p-3">Produk</th>
              <th className="p-3">Stok Terakhir</th>
              <th className="p-3">Produksi Hari Ini</th>
              <th className="p-3">Total Stok</th>
            </tr>
          </thead>
          <tbody>
            {stocks.map((s) => (
              <tr key={s.id} className="border-b hover:bg-amber-50">
                <td className="p-3">{s.date}</td>
                <td className="p-3">{s.product_name}</td>
                <td className="p-3 text-center">{s.last_stock}</td>
                <td className="p-3 text-center">{s.production_today}</td>
                <td className="p-3 text-center font-bold">{s.total_stock}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
