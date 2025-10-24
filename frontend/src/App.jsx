import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ReportStock from "./pages/ReportStock";
import ReportProduction from "./pages/ReportProduction";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/report-stock" element={<ReportStock />} />
        <Route path="/report-production" element={<ReportProduction />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
