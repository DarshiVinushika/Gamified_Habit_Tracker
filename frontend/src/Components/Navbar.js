import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../assets/logo.png'
import '../App.css'

const navLinkClass =
  "relative text-white hover:text-orange-200 transition duration-300 ease-in-out after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-0 after:h-0.5 after:bg-orange-200 hover:after:w-full after:transition-all after:duration-300";

const Navbar = () => {
  return (
    <div className='w-full h-20 flex items-center justify-between px-12 bg-[rgba(217,217,217,0.31)] shadow'>
      <div className='flex items-center'>
        <img src={logo} alt="Logo" className='h-12' />
      </div>
      
      <div className='flex items-center space-x-16 text-xl adamina-regular'>
        <Link to={"/features"} className={navLinkClass}>
          Features
        </Link>
        <Link to={"/about"} className={navLinkClass}>
          About
        </Link>
        <Link
          to="/login"
          className="px-8 py-2 rounded-full text-white shadow-md bg-gradient-to-r from-blue-400 to-purple-400 hover:from-blue-500 hover:to-purple-500 transition duration-300 scale-100 hover:scale-105"
        >
          Login
        </Link>
      </div>
    </div>
  )
}

export default Navbar