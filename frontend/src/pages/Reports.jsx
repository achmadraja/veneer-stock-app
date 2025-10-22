import { useState, useEffect } from "react";
import api from "../utils/api";

export default function Reports(){
  const [date, setDate] = useState("");
  const [batches, setBatches] = useState([]);
  const [batchId, setBatchId] = useState("");

  useEffect(()=>{ (async()=>{ const r = await api.get("/batches"); setBatches(r.data); })(); }, []);

  const download = async (endpoint, params, filename) => {
    const res = await api.get(endpoint, { params, responseType: "blob" });
    const url = window.URL.createObjectURL(new Blob([res.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
  };

  return (
    <div className="p-6 max-w-3xl">
      <h1 className="text-xl font-bold mb-4">Laporan</h1>

      <div className="bg-white p-4 rounded shadow mb-4">
        <h2 className="font-semibold mb-2">Report Update Stock (harian)</h2>
        <input type="date" value={date} onChange={e=>setDate(e.target.value)} className="border p-2 mr-2" />
        <button onClick={()=>download('/reports/stock-update',{ date, format: 'excel' }, `stock_update_${date}.xlsx`)} className="bg-green-600 text-white px-3 py-1 rounded mr-2">Excel</button>
        <button onClick={()=>download('/reports/stock-update',{ date, format: 'pdf' }, `stock_update_${date}.pdf`)} className="bg-red-600 text-white px-3 py-1 rounded">PDF</button>
      </div>

      <div className="bg-white p-4 rounded shadow">
        <h2 className="font-semibold mb-2">Report Total Produksi per Partai</h2>
        <select value={batchId} onChange={e=>setBatchId(e.target.value)} className="border p-2 mr-2">
          <option value="">-- Pilih Partai --</option>
          {batches.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}
        </select>
        <button onClick={()=>download('/reports/production',{ batchId, format: 'excel' }, `production_batch_${batchId}.xlsx`)} className="bg-green-600 text-white px-3 py-1 rounded mr-2">Excel</button>
        <button onClick={()=>download('/reports/production',{ batchId, format: 'pdf' }, `production_batch_${batchId}.pdf`)} className="bg-red-600 text-white px-3 py-1 rounded">PDF</button>
      </div>
    </div>
  );
}
