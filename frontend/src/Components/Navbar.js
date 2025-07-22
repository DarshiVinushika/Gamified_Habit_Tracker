import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';
import '../App.css';

const navLinkClass =
  "relative text-white hover:text-orange-200 transition duration-300 ease-in-out after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-0 after:h-0.5 after:bg-orange-200 hover:after:w-full after:transition-all after:duration-300";

const Navbar = () => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  return (
    <div className='w-full h-20 flex items-center justify-between px-12 bg-[rgba(223,197,254,0.31)] shadow'>
      <div className='flex items-center'>
        <img src={logo} alt="Logo" className='h-12' />
      </div>
      
      <div className='flex items-center space-x-16 text-xl adamina-regular'>
        <Link to="/" className={navLinkClass}>
          Home
        </Link>
        <Link to="/features" className={navLinkClass}>
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
          className="px-8 py-2 rounded-full text-white shadow-md bg-gradient-to-r from-blue-400 to-purple-400 hover:from-blue-500 hover:to-purple-500 transition duration-300 scale-100 hover:scale-105"
        >
          Login
        </Link>
        <Link
          to="/register"
          className="px-8 py-2 rounded-full text-white shadow-md bg-gradient-to-r from-blue-400 to-purple-400 hover:from-blue-500 hover:to-purple-500 transition duration-300 scale-100 hover:scale-105"
        >
          Register
        </Link>
      </div>
    </div>
  );
};

export default Navbar;