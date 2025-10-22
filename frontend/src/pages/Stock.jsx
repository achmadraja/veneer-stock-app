import { useEffect, useState } from "react";
import api from "../utils/api";

export default function Stock(){
  const [stocks, setStocks] = useState([]);
  useEffect(()=>{ load(); }, []);
  const load = async ()=> {
    const res = await api.get("/products");
    setStocks(res.data);
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Stok Saat Ini</h1>
      <div className="grid grid-cols-3 gap-4">
        {stocks.map(p => (
          <div key={p.id} className="bg-white p-4 rounded shadow">
            <div className="font-semibold">{p.name}</div>
            <div className="text-sm text-gray-500">{p.sku}</div>
            <div className="mt-3 text-2xl">{p.stock?.quantity ?? 0} <span className="text-sm">{p.unit}</span></div>
          </div>
        ))}
      </div>
    </div>
  );
}
