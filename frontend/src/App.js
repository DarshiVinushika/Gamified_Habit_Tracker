import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Home from "./Pages/Home";
import Register from "./Pages/Register";
import AdminDashboard from "./AdminPages/AdminDashboard";
import InternDashboard from "./Pages/InternDashboard";
import About from "./Pages/About";
import Features from "./Pages/Features";
import LoginPage from "./Pages/LoginPage";
import BadgesManagementPage from "./AdminPages/BadgesManagementPage";
import HabitManagementPage from "./AdminPages/HabitManagementPage";
import HabitCategories from "./Pages/HabitCategories";
import Leaderboard from "./Pages/Leaderboard";
import UserManagementPage from "./AdminPages/UserManagementPage";
import AdminManagementPage from "./AdminPages/AdminManagementPage";
import { UserProvider } from "./Components/UserContext";
import UnlockedBadges from "./Pages/UnlockedBadges";
import InternRegister from "./Pages/InternRegister";
import ViewLeaderboard from "./AdminPages/ViewLeaderboard";
import AdminProfile from "./AdminPages/AdminProfile";

function App() {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
      />
      <UserProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/iregister" element={<InternRegister />} />
            <Route path="/AdminDashboard" element={<AdminDashboard />} />
            <Route path="/InternDashboard" element={<InternDashboard />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/About" element={<About />} />
            <Route path="/Features" element={<Features />} />
            <Route path="/admin/badges" element={<BadgesManagementPage />} />
            <Route path="/admin/habits" element={<HabitManagementPage />} />
            <Route path="/habit-categories" element={<HabitCategories />} />

            <Route path="/dashboard" element={<InternDashboard />} />
            <Route path="/leaderboard" element={<Leaderboard />} />

            <Route path="/admin/users" element={<UserManagementPage />} />
            <Route path="/admin/admins" element={<AdminManagementPage />} />
            <Route path="/unlocked" element={<UnlockedBadges />} />
            <Route path="/viewleaderboard" element={<ViewLeaderboard/>}/>
            <Route path="/adminprofile" element={<AdminProfile/>}/>
          </Routes>
        </BrowserRouter>
      </UserProvider>
    </>
  );
}

export default App;
