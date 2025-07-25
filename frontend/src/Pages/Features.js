import React from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import {
  FaTasks,
  FaTrophy,
  FaUsers,
  FaChartLine,
  FaUserPlus,
} from "react-icons/fa";

function Features() {
  return (
    <div
      className="flex flex-col min-h-screen"
    >
      <Navbar />
      {/* Added md:ml-64 to shift content right of sidebar on desktop */}
      <main className="flex-grow flex items-center justify-center px-4 bg-cover bg-center md:ml-64">
        <div className="w-full max-w-5xl mx-auto my-8">
          <h1 className="text-4xl font-bold text-center text-indigo-800 mb-10 animate-fade-in">
            Discover Our Features
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white shadow-lg rounded-lg p-6 hover:shadow-2xl hover:scale-105 transition-all duration-300 border-l-4 border-indigo-500 animate-fade-in-up">
              <FaTasks className="text-indigo-500 text-5xl mb-4 mx-auto" />
              <h2 className="text-xl font-semibold text-indigo-600 mb-2 text-center">
                Build Better Habits
              </h2>
              <p className="text-gray-600 text-center text-sm">
                Develop consistent work and learning habits with ease.
              </p>
              <ul className="list-disc list-inside text-gray-600 mt-3 text-sm">
                <li>
                  Log daily/weekly habits like work reports or code commits.
                </li>
                <li>Mentors assign custom habits for team goals.</li>
              </ul>
            </div>
            <div className="bg-white shadow-lg rounded-lg p-6 hover:shadow-2xl hover:scale-105 transition-all duration-300 border-l-4 border-teal-500 animate-fade-in-up animation-delay-100">
              <FaTrophy className="text-teal-500 text-5xl mb-4 mx-auto" />
              <h2 className="text-xl font-semibold text-teal-600 mb-2 text-center">
                Gamified Progress
              </h2>
              <p className="text-gray-600 text-center text-sm">
                Stay motivated with rewards and achievements.
              </p>
              <ul className="list-disc list-inside text-gray-600 mt-3 text-sm">
                <li>Earn XP and level up with completed habits.</li>
                <li>Unlock badges like "7-Day Streak".</li>
                <li>Track daily streaks for discipline.</li>
              </ul>
            </div>
            <div className="bg-white shadow-lg rounded-lg p-6 hover:shadow-2xl hover:scale-105 transition-all duration-300 border-l-4 border-purple-500 animate-fade-in-up animation-delay-200">
              <FaUsers className="text-purple-500 text-5xl mb-4 mx-auto" />
              <h2 className="text-xl font-semibold text-purple-600 mb-2 text-center">
                Compete & Collaborate
              </h2>
              <p className="text-gray-600 text-center text-sm">
                Connect with peers and showcase progress.
              </p>
              <ul className="list-disc list-inside text-gray-600 mt-3 text-sm">
                <li>Rank on the leaderboard by XP or badges.</li>
                <li>Join team challenges for bonus XP.</li>
              </ul>
            </div>
            <div className="bg-white shadow-lg rounded-lg p-6 hover:shadow-2xl hover:scale-105 transition-all duration-300 border-l-4 border-blue-500 animate-fade-in-up animation-delay-300">
              <FaChartLine className="text-blue-500 text-5xl mb-4 mx-auto" />
              <h2 className="text-xl font-semibold text-blue-600 mb-2 text-center">
                Mentor Insights
              </h2>
              <p className="text-gray-600 text-center text-sm">
                Tools for mentors to support intern growth.
              </p>
              <ul className="list-disc list-inside text-gray-600 mt-3 text-sm">
                <li>Admin panel to review logs and challenges.</li>
                <li>Analytics on habit frequency and rates.</li>
              </ul>
            </div>
          </div>

          <section className="bg-gradient-to-r from-pink-100 to-teal-100 shadow-lg rounded-xl p-6 text-center hover:shadow-2xl transition-all duration-300 animate-fade-in-up animation-delay-400 mt-6">
            <FaUserPlus className="text-indigo-600 text-5xl mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-indigo-600 mb-3">
              Join Us
            </h2>
            <p className="text-gray-600 text-sm mb-4">
              Transform your work habits! Join now to track, earn rewards, and
              grow.
            </p>
            <div className="flex justify-center space-x-4">
              <a
                href="/login"
                className="px-6 py-2 rounded-full text-white font-semibold bg-indigo-600 hover:bg-indigo-700 transition hover:scale-105"
              >
                Login
              </a>
              <a
                href="/register"
                className="px-6 py-2 rounded-full text-white font-semibold bg-indigo-600 hover:bg-indigo-700 transition hover:scale-105"
              >
                Register
              </a>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Features;