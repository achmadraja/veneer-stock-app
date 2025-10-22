import { useEffect, useState } from "react";
import api from "../utils/api";

export default function Products(){
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ sku: "", name: "", unit: "lembar" });

  const load = async () => {
    const res = await api.get("/products");
    setProducts(res.data);
  };

  useEffect(()=>{ load(); }, []);

  const add = async e => {
    e.preventDefault();
    await api.post("/products", form);
    setForm({ sku: "", name: "", unit: "lembar" });
    load();
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Produk</h1>
      <form onSubmit={add} className="flex gap-2 mb-4">
        <input className="border p-2" placeholder="SKU" value={form.sku} onChange={e=>setForm({...form,sku:e.target.value})} required />
        <input className="border p-2" placeholder="Nama" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} required />
        <input className="border p-2" placeholder="Unit" value={form.unit} onChange={e=>setForm({...form,unit:e.target.value})} />
        <button className="bg-veneer-500 text-white px-3 rounded">Tambah</button>
      </form>

      <table className="w-full bg-white rounded shadow">
        <thead><tr className="bg-gray-100"><th className="p-2">SKU</th><th>Nama</th><th>Stok</th></tr></thead>
        <tbody>
          {products.map(p => (
            <tr key={p.id} className="border-t">
              <td className="p-2">{p.sku}</td>
              <td>{p.name}</td>
              <td>{p.stock?.quantity ?? 0}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
