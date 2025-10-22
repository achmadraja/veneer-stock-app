import { Link, useNavigate } from "react-router-dom";
export default function Navbar(){
  const nav = useNavigate();
  const logout = () => { localStorage.removeItem("token"); nav("/"); };
  return (
    <nav className="bg-veneer-500 p-4 text-white">
      <div className="max-w-6xl mx-auto flex justify-between">
        <div className="font-bold">VeneerStock</div>
        <div className="flex gap-4">
          <Link to="/products">Produk</Link>
          <Link to="/batches">Partai</Link>
          <Link to="/production">Produksi</Link>
          <Link to="/stock">Stok</Link>
          <Link to="/reports">Laporan</Link>
          <button onClick={logout} className="ml-2 bg-veneer-100 text-veneer-500 px-3 rounded">Logout</button>
        </div>
      </div>
    </nav>
  );
}
