import React from "react";
import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <nav className="bg-gradient-to-r from-indigo-500 via-violet-600 to-purple-700 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2 text-2xl font-bold tracking-wide hover:opacity-90">
          <span>🎯</span>
          <span>HabitTracker</span>
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex space-x-6 text-sm font-medium">
          <Link to="/" className="hover:text-gray-200">Home</Link>
          <Link to="/habits" className="hover:text-gray-200">Habits</Link>
          <Link to="/leaderboard" className="hover:text-gray-200">Leaderboard</Link>
          <Link to="/badges" className="hover:text-gray-200">Badges</Link>
        </div>

        {/* Auth Actions or Profile */}
        <div className="flex items-center space-x-4">
          {/* Show this when user is NOT logged in */}
          <div className="hidden md:flex space-x-2">
            <Link
              to="/login"
              className="px-4 py-1 text-sm font-medium border border-white rounded-full hover:bg-white hover:text-purple-700 transition"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="px-4 py-1 text-sm font-medium bg-white text-purple-700 rounded-full hover:bg-gray-100 transition"
            >
              Sign Up
            </Link>
          </div>

          {/* Dropdown Placeholder (for future authenticated user) */}
          <div className="relative group hidden">
            <button className="flex items-center space-x-2 bg-white text-purple-700 font-semibold px-4 py-1 rounded-full shadow-sm hover:bg-gray-100 transition">
              <span>Intern</span>
              <svg
                className="w-4 h-4 transform group-hover:rotate-180 transition"
                fill="none" stroke="currentColor" viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            <div className="absolute right-0 mt-2 w-40 bg-white text-gray-800 rounded-lg shadow-lg hidden group-hover:block z-10">
              <Link to="/profile" className="block px-4 py-2 hover:bg-gray-100">Profile</Link>
              <Link to="/settings" className="block px-4 py-2 hover:bg-gray-100">Settings</Link>
              <button className="w-full text-left px-4 py-2 hover:bg-gray-100">Logout</button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
