import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
<footer className="bg-gradient-to-r from-indigo-900 via-purple-900 to-pink-900 text-white py-10 mt-auto md:ml-72 mx-4 md:mx-8 rounded-xl shadow-inner">

      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-3 gap-8 text-sm">
        {/* Logo & About */}
        <div>
          <h1 className="text-2xl font-extrabold mb-2 bg-gradient-to-r from-pink-500 to-teal-400 text-transparent bg-clip-text pixel-font">
            🎮 HabitHero
          </h1>
          <p className="text-purple-200 leading-relaxed">
            Boost productivity with quests, streaks, XP, and badges. Track your habits like a hero in your own adventure.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h2 className="text-lg font-bold mb-3 text-teal-300 tracking-wider">Explore</h2>
          <ul className="space-y-2 text-purple-100">
            <li>
              <Link to="/" className="hover:text-pink-400 transition duration-200">🏠 Home</Link>
            </li>
            <li>
              <Link to="/Features" className="hover:text-pink-400 transition duration-200">🧩 Features</Link>
            </li>
            <li>
              <Link to="/About" className="hover:text-pink-400 transition duration-200">📜 About</Link>
            </li>
            <li>
              <Link to="/InternDashboard" className="hover:text-pink-400 transition duration-200">🎯 Dashboard</Link>
            </li>
          </ul>
        </div>

        {/* Connect */}
        <div>
          <h2 className="text-lg font-bold mb-3 text-teal-300 tracking-wider">Connect</h2>
          <div className="flex space-x-6 text-xl">
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-pink-400 transition transform hover:scale-125">🐤</a>
            <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-pink-400 transition transform hover:scale-125">🕹️</a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-pink-400 transition transform hover:scale-125">💼</a>
          </div>
        </div>
      </div>

      {/* Divider line */}
      <div className="border-t border-purple-700 mt-10 pt-4">
        <p className="text-center text-xs text-purple-400 tracking-wide">
          © {new Date().getFullYear()} <span className="text-pink-400 font-semibold">HabitHero</span> — Level up your life. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
