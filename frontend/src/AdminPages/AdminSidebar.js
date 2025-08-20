import React from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/logo.png";

const AdminSidebar = () => {
  const location = useLocation();

  const linkClass = (path) =>
    `block py-2 px-4 rounded transition ${location.pathname === path
      ? "bg-purple-900 text-white font-bold"
      : "text-indigo-100 hover:bg-purple-800 hover:text-white"
    }`;

  return (
    <aside className="bg-[#301467] min-h-screen w-64 p-6 flex flex-col rounded-bl-3xl shadow-lg ">
              
      <div className="mb-10 ">
        <img
          src={logo}
          alt="HabitHero Logo"
          className="h-12 rounded-full shadow-md hover:scale-110 transition-transform duration-300 border border-purple-700 w-20 h-20 ml-30 "
        />

        <h1 className="text-xl font-bold text-orange-300 mb-2">Habit Hero<br />Admin Panel</h1>
      </div>
      <nav className="flex flex-col space-y-2 text-lg">
        <Link to="/AdminDashboard" className={linkClass("/AdminDashboard")}>
          Overview
        </Link>
        <Link to="/admin/habits" className={linkClass("/admin/habits")}>
          Habit management
        </Link>
        <Link to="/admin/users" className={linkClass("/admin/users")}>
          User management
        </Link>
        <Link to="/admin/badges" className={linkClass("/admin/badges")}>
          Badge management
        </Link>
        <Link to="/admin/admins" className={linkClass("/admin/admins")}>
          Admin management
        </Link>
        <Link to="/viewleaderboard" className={linkClass("/ViewLeaderboard")}>
          Intern Leaderboard
        </Link>
        <Link to="/adminprofile" className={linkClass("/AdminProfile")}>
          Profile
        </Link>
        <Link
          to="/login"
          className="bg-red-500 hover:bg-red-700 text-white px-4 py-2 rounded-lg shadow-md transition duration-200"
        >
          Logout
        </Link>

      </nav>
    </aside>
  );
};

export default AdminSidebar;