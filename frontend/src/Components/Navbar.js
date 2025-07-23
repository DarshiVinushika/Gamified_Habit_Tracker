import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';
import '../App.css';
import { FaBars, FaTimes } from 'react-icons/fa';

const navLinkClass =
  "relative text-indigo-200 hover:text-teal-200 font-semibold transition duration-300 ease-in-out after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-0 after:h-0.5 after:bg-gradient-to-r after:from-teal-400 after:to-pink-400 hover:after:w-full after:transition-all after:duration-300 hover:shadow-glow animate-fade-in";

const Navbar = () => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="w-full h-20 flex items-center justify-between px-6 md:px-12 bg-transparent backdrop-blur-md shadow-[0_4px_5px_rgba(14,7,25,0.3)] ">
      <div className="flex items-center space-x-3">
        <img
          src={logo}
          alt="HabitHero Logo"
          className="h-12 rounded-full shadow-md hover:scale-110 transition-transform duration-300 border border-purple-700"
        />
        <span className="text-2xl font-bold bg-gradient-to-r from-teal-600 to-pink-600 text-transparent bg-clip-text adamina-regular">
          HabitHero
        </span>
      </div>

      <div className="hidden md:flex items-center space-x-6 text-lg adamina-regular">
        <Link to="/" className={navLinkClass}>
          Home
        </Link>
        <Link to="/Features" className={navLinkClass}>
          Features
        </Link>
        <Link to="/About" className={navLinkClass}>
          About
        </Link>
        {user.role === "admin" && (
          <Link to="/admin/badges" className={navLinkClass}>
            Admin Dashboard
          </Link>
        )}
        <Link
          to="/login"
          className="px-6 py-2 rounded-full text-white font-semibold bg-gradient-to-r from-indigo-700 to-purple-700 shadow-lg hover:shadow-glow hover:from-indigo-800 hover:to-purple-800 transition-all duration-300 scale-100 hover:scale-105 hover:animate-pulse"
        >
          Login
        </Link>
        <Link
          to="/register"
          className="px-6 py-2 rounded-full text-white font-semibold bg-gradient-to-r from-indigo-700 to-purple-700 shadow-lg hover:shadow-glow hover:from-indigo-800 hover:to-purple-800 transition-all duration-300 scale-100 hover:scale-105 hover:animate-pulse"
        >
          Register
        </Link>
      </div>

      <div className="md:hidden flex items-center">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="text-indigo-200 text-2xl focus:outline-none hover:text-teal-200 transition-colors duration-300"
        >
          {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-20 left-0 w-full bg-gradient-to-r from-indigo-950 to-purple-950 backdrop-blur-md flex flex-col items-center space-y-4 py-6 z-50 animate-slide-in-right">
          <Link
            to="/"
            className={`${navLinkClass} block w-full text-center py-2 bg-indigo-800/30 rounded-lg hover:bg-indigo-800/50 transition-colors duration-300`}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/Features"
            className={`${navLinkClass} block w-full text-center py-2 bg-indigo-800/30 rounded-lg hover:bg-indigo-800/50 transition-colors duration-300`}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Features
          </Link>
          <Link
            to="/About"
            className={`${navLinkClass} block w-full text-center py-2 bg-indigo-800/30 rounded-lg hover:bg-indigo-800/50 transition-colors duration-300`}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            About
          </Link>
          {user.role === "admin" && (
            <Link
              to="/admin/badges"
              className={`${navLinkClass} block w-full text-center py-2 bg-indigo-800/30 rounded-lg hover:bg-indigo-800/50 transition-colors duration-300`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Admin Dashboard
            </Link>
          )}
          <Link
            to="/login"
            className="px-6 py-2 rounded-full text-white font-semibold bg-gradient-to-r from-indigo-700 to-purple-700 shadow-lg hover:shadow-glow hover:from-indigo-800 hover:to-purple-800 transition-all duration-300 scale-100 hover:scale-105 hover:animate-pulse w-full text-center"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Login
          </Link>
          <Link
            to="/register"
            className="px-6 py-2 rounded-full text-white font-semibold bg-gradient-to-r from-indigo-700 to-purple-700 shadow-lg hover:shadow-glow hover:from-indigo-800 hover:to-purple-800 transition-all duration-300 scale-100 hover:scale-105 hover:animate-pulse w-full text-center"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Register
          </Link>
        </div>
      )}
    </div>
  );
};

export default Navbar;