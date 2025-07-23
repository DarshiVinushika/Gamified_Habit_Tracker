import React from "react";
import { Link, useLocation } from "react-router-dom";
import logo from '../assets/logo.png';

const Sidebar = () => {
  const location = useLocation();

  const linkClass = (path) =>
    `block py-2 px-4 rounded transition ${
      location.pathname === path
        ? "bg-purple-900 text-white font-bold"
        : "text-indigo-100 hover:bg-purple-800 hover:text-white"
    }`;

  return (
    <aside className="bg-[#5F27CD] min-h-screen w-64 p-6 flex flex-col rounded-bl-3xl shadow-lg">
      <div className="mb-10 items-center flex justify-center">
        <img
                  src={logo}
                  alt="HabitHero Logo"
                  className="h-12 rounded-full shadow-md hover:scale-110 transition-transform duration-300 border border-purple-700 w-20 h-20"
                />
      </div>
      <nav className="flex flex-col space-y-2 text-xl">
        <Link to="/Dashboard" className={linkClass("/Dashboard")}>
          Dashboard
        </Link>
        <Link to="/habit-categories" className={linkClass("/habit-categories")}>
          Habit Categories
        </Link>
        <Link to="/leaderboard" className={linkClass("/leaderboard")}>
          Leaderboard
        </Link>
        <Link to="/badges" className={linkClass("/badges")}>
          My Badges
        </Link>
      </nav>
    </aside>
  );
};

export default Sidebar;