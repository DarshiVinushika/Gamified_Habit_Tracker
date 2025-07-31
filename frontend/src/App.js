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
<<<<<<< Updated upstream
=======
import HabitCategories from "./Pages/HabitCategories";
import Leaderboard from "./Pages/leaderboard";
// Import UserProvider from your context file
import { UserProvider } from "./Components/UserContext"; // Adjust path if needed
>>>>>>> Stashed changes

function App() {
  return (
    <>
      {/* Toast notifications */}
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />

<<<<<<< Updated upstream
      {/* Routing */}
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
        </Routes>
      </BrowserRouter>
=======
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
            <Route path="/leaderboard" element={<Leaderboard />} />
          </Routes>
        </BrowserRouter>
      </UserProvider>
>>>>>>> Stashed changes
    </>
  );
}

export default App;
