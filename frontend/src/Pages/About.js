import React from 'react';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import { FaRocket, FaStar, FaBuilding, FaUserPlus } from 'react-icons/fa';

function About() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main 
        className="flex-grow flex items-center justify-center px-4 bg-cover bg-center"
      >
        <div className="w-full max-w-4xl mx-auto my-8 space-y-8">
          <h1 className="text-4xl font-bold text-center text-violet-800 mb-10 animate-fade-in">
            About the Gamified Habit Tracker
          </h1>
          
          <section className="bg-white shadow-lg rounded-xl p-6 flex items-center space-x-6 hover:shadow-2xl transition-all duration-300 border-r-4 border-pink-500 animate-fade-in-up">
            <FaRocket className="text-pink-500 text-5xl flex-shrink-0" />
            <div>
              <h2 className="text-xl font-semibold text-pink-600 mb-2">Our Mission</h2>
              <p className="text-gray-600 text-sm leading-relaxed">
                Developed by SLT’s Intern Software Development Team, our platform empowers interns and junior employees to build positive work habits through gamification, making professional growth fun and measurable.
              </p>
            </div>
          </section>

          <section className="bg-white shadow-lg rounded-xl p-6 flex items-center space-x-6 hover:shadow-2xl transition-all duration-300 border-r-4 border-violet-500 animate-fade-in-up animation-delay-200">
            <FaBuilding className="text-violet-500 text-5xl flex-shrink-0" />
            <div>
              <h2 className="text-xl font-semibold text-violet-600 mb-2">SLT – Digital Platform Division</h2>
              <p className="text-gray-600 text-sm leading-relaxed">
                Part of SLT, Sri Lanka’s leading telecom provider, our Digital Platform Division fosters innovation. Guided by mentor Janaka Harambearachchi, this project inspires the next generation of professionals.
              </p>
            </div>
          </section>

          <section className="bg-white shadow-lg rounded-xl p-6 flex flex-row-reverse items-center space-x-6 space-x-reverse hover:shadow-2xl transition-all duration-300 border-l-4 border-teal-500 animate-fade-in-up animation-delay-100">
            <FaStar className="text-teal-500 text-5xl flex-shrink-0" />
            <div>
              <h2 className="text-xl font-semibold text-teal-600 mb-2">What We Offer</h2>
              <ul className="list-disc list-inside text-gray-600 text-sm space-y-1">
                <li><strong>Habit Tracking</strong>: Log work, learning, and collaboration habits.</li>
                <li><strong>Gamified Experience</strong>: Earn XP, level up, and unlock badges.</li>
                <li><strong>Engagement Insights</strong>: Mentors monitor progress via an admin panel.</li>
                <li><strong>Leaderboard</strong>: Compete and showcase your achievements.</li>
              </ul>
            </div>
          </section>

          <section className="bg-gradient-to-r from-pink-100 to-teal-100 shadow-lg rounded-xl p-6 text-center hover:shadow-2xl transition-all duration-300 animate-fade-in-up animation-delay-300">
            <FaUserPlus className="text-indigo-600 text-5xl mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-indigo-600 mb-3">Join Us</h2>
            <p className="text-gray-600 text-sm mb-4">
              Start your journey of growth! Log in or register to track habits and earn rewards.
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

export default About;