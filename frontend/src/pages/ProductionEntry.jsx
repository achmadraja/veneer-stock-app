import { useEffect, useState } from "react";
import api from "../utils/api";

export default function ProductionEntry(){
  const [batches, setBatches] = useState([]);
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ batchId: "", productId: "", qty: "", note: "" });
  const [message, setMessage] = useState("");

  useEffect(()=>{ load(); }, []);
  const load = async () => {
    const b = await api.get("/batches"); setBatches(b.data);
    const p = await api.get("/products"); setProducts(p.data);
  };

  const submit = async e => {
    e.preventDefault();
    try {
      await api.post("/productions", form);
      setMessage("Produksi tercatat");
      setForm({ batchId: "", productId: "", qty: "", note: "" });
    } catch (err) {
      setMessage(err.response?.data?.message || "Gagal");
    }
    setTimeout(()=>setMessage(""), 3000);
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Input Produksi</h1>
      <form onSubmit={submit} className="bg-white p-4 rounded shadow max-w-md space-y-3">
        <select value={form.batchId} onChange={e=>setForm({...form,batchId:e.target.value})} className="border p-2 w-full" required>
          <option value="">-- Pilih Partai --</option>
          {batches.filter(b=>b.status==="active").map(b => <option key={b.id} value={b.id}>{b.name}</option>)}
        </select>

        <select value={form.productId} onChange={e=>setForm({...form,productId:e.target.value})} className="border p-2 w-full" required>
          <option value="">-- Pilih Produk --</option>
          {products.map(p => <option key={p.id} value={p.id}>{p.name} ({p.sku})</option>)}
        </select>

        <input type="number" value={form.qty} onChange={e=>setForm({...form,qty:e.target.value})} placeholder="Jumlah" className="border p-2 w-full" required />
        <input value={form.note} onChange={e=>setForm({...form,note:e.target.value})} placeholder="Keterangan (opsional)" className="border p-2 w-full" />

        <button className="bg-veneer-500 text-white px-4 py-2 rounded">Simpan Produksi</button>
        {message && <div className="text-sm text-blue-600">{message}</div>}
      </form>
    </div>
  );
}
