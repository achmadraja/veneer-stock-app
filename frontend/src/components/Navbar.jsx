import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <nav className="bg-amber-700 text-white p-4 flex justify-between">
      <h1 className="font-bold">Veneer Stock System</h1>
      <button onClick={logout} className="bg-amber-500 px-4 py-1 rounded">
        Logout
      </button>
    </nav>
  );
}
