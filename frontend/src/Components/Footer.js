import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-purple-800 to-indigo-900 text-white py-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-3 gap-6 text-sm">
        {/* About */}
        <div>
          <h1 className="text-xl font-bold mb-2">🎯 HabitHero</h1>
          <p className="text-purple-200">
            Gamify your work habits, track your growth, and rise through the ranks with XP, badges, and streaks.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h2 className="text-lg font-semibold mb-2">Navigation</h2>
          <ul className="space-y-1 text-purple-200">
            <li><Link to="/" className="hover:underline">Home</Link></li>
            <li><Link to="/Features" className="hover:underline">Features</Link></li>
            <li><Link to="/About" className="hover:underline">About</Link></li>
            <li><Link to="/InternDashboard" className="hover:underline">Dashboard</Link></li>
          </ul>
        </div>

        {/* Connect */}
        <div>
          <h2 className="text-lg font-semibold mb-2">Connect</h2>
          <div className="flex space-x-4 text-purple-100 text-lg">
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-white">🐦</a>
            <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-white">💻</a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-white">🔗</a>
          </div>
        </div>
      </div>

      <div className="mt-8 text-center text-xs text-purple-300 border-t border-purple-700 pt-4">
        © {new Date().getFullYear()} HabitHero — All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;