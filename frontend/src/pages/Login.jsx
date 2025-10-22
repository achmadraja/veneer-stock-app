import { useState } from "react";
import api from "../utils/api";
import { useNavigate } from "react-router-dom";

export default function Login(){
  const [form, setForm] = useState({ username: "", password: "" });
  const [msg, setMsg] = useState("");
  const nav = useNavigate();

  const submit = async e => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/login", form);
      localStorage.setItem("token", res.data.token);
      nav("/stock");
    } catch (err) {
      setMsg(err.response?.data?.message || "Login gagal");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-16 bg-white p-6 rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Login VeneerStock</h1>
      <form onSubmit={submit} className="flex flex-col gap-3">
        <input value={form.username} onChange={e=>setForm({...form,username:e.target.value})} placeholder="username" className="border p-2" />
        <input type="password" value={form.password} onChange={e=>setForm({...form,password:e.target.value})} placeholder="password" className="border p-2" />
        <button className="bg-veneer-500 text-white p-2 rounded">Login</button>
      </form>
      {msg && <div className="mt-2 text-red-500">{msg}</div>}
    </div>
  );
}
