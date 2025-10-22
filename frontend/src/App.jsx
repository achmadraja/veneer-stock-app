import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Products from "./pages/Products";
import Batches from "./pages/Batches";
import ProductionEntry from "./pages/ProductionEntry";
import Stock from "./pages/Stock";
import Reports from "./pages/Reports";
import Navbar from "./components/Navbar";

function Private({ children }) {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/" />;
}

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/products" element={<Private><Products /></Private>} />
        <Route path="/batches" element={<Private><Batches /></Private>} />
        <Route path="/production" element={<Private><ProductionEntry /></Private>} />
        <Route path="/stock" element={<Private><Stock /></Private>} />
        <Route path="/reports" element={<Private><Reports /></Private>} />
      </Routes>
    </>
  );
}
