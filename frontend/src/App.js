import React from "react";
import Home from "./Pages/Home";
import Register from "./Pages/Register";
import AdminDashboard from "./AdminPages/AdminDashboard";
import InternDashboard from "./Pages/InternDashboard";
import About from "./Pages/About";
import Features from "./Pages/Features";
import LoginPage from "./Pages/LoginPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BadgesManagementPage from "./AdminPages/BadgesManagementPage";
import MyBadges from "./Pages/MyBadges";
import HabitManagementPage from "./AdminPages/HabitManagementPage";
import HabitCategories from "./Pages/HabitCategories";

// Import UserProvider from your context file
import { UserProvider } from "./Components/UserContext"; // Adjust path if needed

function App() {
  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />

      {/* Wrap BrowserRouter inside UserProvider */}
      <UserProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/AdminDashboard" element={<AdminDashboard />} />
            <Route path="/InternDashboard" element={<InternDashboard />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/About" element={<About />} />
            <Route path="/Features" element={<Features />} />
            <Route path="/admin/badges" element={<BadgesManagementPage />} />
            <Route path="/badges" element={<MyBadges />} />
            <Route path="/admin/habits" element={<HabitManagementPage />} />
            <Route path="/habit-categories" element={<HabitCategories />} />
            <Route path="/leaderboard" element={<InternDashboard />} />
          </Routes>
        </BrowserRouter>
      </UserProvider>
    </>
  );
}

export default App;
