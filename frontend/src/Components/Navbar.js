import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../assets/logo.png'
import '../App.css'

const Navbar = () => {
  return (
    <div className='w-full h-20 flex items-center justify-between px-12 bg-[rgba(217,217,217,0.31)] shadow'>
      <div className='flex items-center'>
        <img src={logo} alt="Logo" className='h-12' />
      </div>
      
      <div className='flex items-center space-x-16 text-xl abhaya-libre-semibold'>
        <Link to={"/features"} className="text-white hover:text-orange-200 transition">Features</Link>
        <Link to={"/about"} className="text-white hover:text-orange-200 transition">About</Link>
        <Link to="/login" className="px-8 py-2 rounded-full text-white font-semibold shadow-md bg-gradient-to-r from-blue-400 to-purple-400 hover:from-blue-500 hover:to-purple-500 transition">
          Login
        </Link>
      </div>
    </div>
  )
}

export default Navbar