import { useState, useEffect } from "react";
import api from "../utils/api";

export default function Batches(){
  const [batches, setBatches] = useState([]);
  const [name, setName] = useState("");

  const load = async () => {
    const res = await api.get("/batches");
    setBatches(res.data);
  };
  useEffect(()=>{ load(); }, []);

  const create = async e => {
    e.preventDefault();
    await api.post("/batches", { name });
    setName("");
    load();
  };

  const closeBatch = async (id) => {
    await api.put(`/batches/${id}/close`);
    load();
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Partai Produksi</h1>
      <form onSubmit={create} className="flex gap-2 mb-4">
        <input className="border p-2" placeholder="Nama partai (mis: Partai 1)" value={name} onChange={e=>setName(e.target.value)} />
        <button className="bg-veneer-500 text-white px-3 rounded">Buat Partai</button>
      </form>

      <ul className="space-y-2">
        {batches.map(b => (
          <li key={b.id} className="bg-white p-3 rounded shadow flex justify-between">
            <div>
              <div className="font-semibold">{b.name} {b.status === "active" && <span className="text-green-600">(Active)</span>}</div>
              <div className="text-sm text-gray-500">Mulai: {new Date(b.startedAt).toLocaleString()}</div>
            </div>
            {b.status === "active" && <button onClick={()=>closeBatch(b.id)} className="bg-red-500 text-white px-3 rounded">Tutup</button>}
          </li>
        ))}
      </ul>
    </div>
  );
}
