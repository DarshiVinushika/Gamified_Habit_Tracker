import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-purple-800 to-indigo-900 text-white pt-10 pb-6">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-3 gap-6 text-sm">
        
        {/* About */}
        <div>
          <h1 className="text-xl font-bold mb-2">🎯 HabitTracker</h1>
          <p className="text-purple-200">
            Gamify your work habits, track your growth, and rise through the ranks with XP, badges, and streaks.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h2 className="text-lg font-semibold mb-2">Navigation</h2>
          <ul className="space-y-1 text-purple-200">
            <li><Link to="/" className="hover:underline">Home</Link></li>
            <li><Link to="/habits" className="hover:underline">Habits</Link></li>
            <li><Link to="/leaderboard" className="hover:underline">Leaderboard</Link></li>
            <li><Link to="/badges" className="hover:underline">Badges</Link></li>
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
        © {new Date().getFullYear()} HabitTracker — All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
