import React from "react";
import Home from "./Pages/Home";
import Register from "./Pages/Register";
import AdminDashboard from "./Pages/AdminDashboard";
import InternDashboard from "./Pages/InternDashboard";
import About from "./Pages/About";
import LoginPage from "./Pages/LoginPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BadgesManagementPage from "./AdminPages/BadgesManagementPage";


function App() {
  return (
    <>
      {/* Toast notifications */}
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />

      {/* Routing */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/AdminDashboard" element={<AdminDashboard />} />
          <Route path="/InternDashboard" element={<InternDashboard />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/About" element={<About />} />
          <Route path="/admin/badges" element={<BadgesManagementPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
