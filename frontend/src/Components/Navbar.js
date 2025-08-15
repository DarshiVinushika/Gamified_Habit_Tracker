import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { FaBars, FaTimes } from "react-icons/fa";
import { googleLogout } from "@react-oauth/google";
import { useUser } from "../Components/UserContext";

const navLinkClass =
  "relative text-gray-800 hover:text-cyan-600 font-medium tracking-wide transition-all duration-200 ease-out " +
  "after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-0 after:h-0.5 " +
  "after:bg-gradient-to-r after:from-cyan-500 after:to-pink-500 hover:after:w-full " +
  "after:transition-all after:duration-300";

const Navbar = () => {
  const { logout } = useUser();
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    googleLogout();
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    logout();
    navigate("/login");
  };

  const desktopLinks = user.userId
    ? [
        { to: "/InternDashboard", label: "Dashboard" },
        { to: "/habit-categories", label: "Habit Categories" },
        { to: "/leaderboard", label: "Leaderboard" },
        { to: "/unlocked", label: "My Badges" },
        ...(user.role === "admin"
          ? [{ to: "/admin/unlocked", label: "Admin Dashboard" }]
          : []),
      ]
    : [
        { to: "/", label: "Home" },
        { to: "/Features", label: "Features" },
        { to: "/About", label: "About" },
      ];

  const authButtons = user.userId
    ? [
        {
          label: "Logout",
          onClick: handleLogout,
          className:
            "bg-gradient-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-900",
        },
      ]
    : [
        {
          label: "Login",
          to: "/login",
          className:
            "bg-gradient-to-r from-indigo-700 to-purple-700 hover:from-indigo-800 hover:to-purple-800",
        },
        {
          label: "Register",
          to: "/register",
          className:
            "bg-gradient-to-r from-indigo-700 to-purple-700 hover:from-indigo-800 hover:to-purple-800",
        },
      ];

  return (
    <div className="h-screen w-64 flex flex-col justify-between py-6 px-4 bg-white/80 backdrop-blur-md shadow-[4px_0_6px_rgba(0,0,0,0.1)] fixed left-0 top-0 z-50">
      {/* Logo Section */}
      <div className="flex flex-col items-center space-y-4">
        <img
          src={logo}
          alt="HabitHero Logo"
          className="h-16 rounded-full shadow-md hover:shadow-lg hover:scale-105 transition-all duration-200 border border-gray-300"
        />
        <span className="text-xl font-bold bg-gradient-to-r from-cyan-500 to-pink-500 text-transparent bg-clip-text">
          HabitHero
        </span>

        {/* Desktop Navigation */}
        <nav className="flex flex-col space-y-4 text-lg w-full">
          {desktopLinks.map(({ to, label }) => (
            <NavLink
              key={label}
              to={to}
              className={({ isActive }) =>
                `${navLinkClass} ${isActive ? "text-cyan-600 after:w-full" : ""}`
              }
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {label}
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Auth Buttons */}
      <div className="flex flex-col items-center space-y-4 w-full">
        {authButtons.map(({ label, to, onClick, className }) =>
          to ? (
            <NavLink
              key={label}
              to={to}
              className={`px-5 py-2 rounded-lg text-white font-medium shadow-md hover:shadow-lg 
                transition-all duration-200 hover:scale-105 focus:ring-2 focus:ring-offset-2 focus:ring-cyan-400 w-full text-center ${className}`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {label}
            </NavLink>
          ) : (
            <button
              key={label}
              onClick={() => {
                onClick();
                setIsMobileMenuOpen(false);
              }}
              className={`px-5 py-2 rounded-lg text-white font-medium shadow-md hover:shadow-lg 
                transition-all duration-200 hover:scale-105 focus:ring-2 focus:ring-offset-2 focus:ring-cyan-400 w-full text-center ${className}`}
            >
              {label}
            </button>
          )
        )}
      </div>

    </div>
  );
};

export default Navbar;
