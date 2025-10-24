import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <header className="bg-white shadow p-4 flex justify-between items-center">
      <h1 className="text-xl font-semibold">Panel Admin</h1>
      <button
        onClick={handleLogout}
        className="bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700"
      >
        Logout
      </button>
    </header>
  );
}
