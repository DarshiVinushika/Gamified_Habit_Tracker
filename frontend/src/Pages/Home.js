import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <main className="bg-gradient-to-br from-indigo-500 via-violet-600 to-purple-800 min-h-screen text-white flex items-center justify-center px-4">
      <div className="max-w-4xl text-center space-y-8">
        {/* Title */}
        <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight drop-shadow-lg">
          🎮 Build Habits. Earn XP. <br />
          Level Up Your Internship!
        </h1>

        {/* Description */}
        <p className="text-lg text-purple-100">
          The Habit Tracker designed for SLT interns. Log your daily actions,
          grow your XP, collect badges, and dominate the leaderboard!
        </p>

        {/* Get Started Button */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/register"
            className="px-6 py-3 bg-white text-indigo-700 rounded-full font-semibold shadow hover:bg-gray-100 transition"
          >
            🚀 Get Started
          </Link>
        </div>

        {/* Highlights */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm mt-10 text-purple-100">
          <div className="bg-white/10 p-4 rounded-lg backdrop-blur text-center">
            <div className="text-2xl mb-2">🏆</div>
            <div className="font-semibold">XP & Levels</div>
            <p className="text-xs mt-1 text-purple-200">
              Earn XP for every habit and level up as you grow.
            </p>
          </div>

          <div className="bg-white/10 p-4 rounded-lg backdrop-blur text-center">
            <div className="text-2xl mb-2">🎖️</div>
            <div className="font-semibold">Badges</div>
            <p className="text-xs mt-1 text-purple-200">
              Collect badges for milestones and achievements.
            </p>
          </div>

          <div className="bg-white/10 p-4 rounded-lg backdrop-blur text-center">
            <div className="text-2xl mb-2">🔥</div>
            <div className="font-semibold">Streak Tracker</div>
            <p className="text-xs mt-1 text-purple-200">
              Track how many days in a row you’ve stayed consistent.
            </p>
          </div>

          <div className="bg-white/10 p-4 rounded-lg backdrop-blur text-center">
            <div className="text-2xl mb-2">📊</div>
            <div className="font-semibold">Leaderboard</div>
            <p className="text-xs mt-1 text-purple-200">
              Compete with others and see who’s most engaged.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Home;
