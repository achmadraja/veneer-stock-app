import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-white shadow-md p-5">
      <h2 className="text-2xl font-bold text-blue-600 mb-8">VeneerStock</h2>
      <nav className="flex flex-col gap-3">
        <Link to="/dashboard" className="hover:text-blue-600">Dashboard</Link>
        <Link to="/report-stock" className="hover:text-blue-600">Report Stok</Link>
        <Link to="/report-production" className="hover:text-blue-600">Report Produksi</Link>
      </nav>
    </aside>
  );
}
