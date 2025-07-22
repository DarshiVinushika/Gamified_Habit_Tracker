import React from 'react';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';

function About() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main 
        className="flex-grow flex items-center justify-center px-4 bg-cover bg-center"
        style={{ backgroundImage: "url(/wallpaper.jpg)" }}
      >
        <div className="bg-white shadow-xl rounded-lg p-8 w-full max-w-4xl mx-auto my-8">
          <h1 className="text-3xl font-bold text-center text-indigo-700 mb-6">
            About the Gamified Habit Tracker
          </h1>
          <div className="space-y-6 text-gray-700">
            <section>
              <h2 className="text-2xl font-semibold text-indigo-600 mb-3">Our Mission</h2>
              <p className="text-lg leading-relaxed">
                The Gamified Habit Tracker, developed by the Intern Software Development Team at SLT – Digital Platform Division, is designed to empower interns and junior employees to build positive work habits and boost engagement. By integrating gamification elements like XP rewards, badges, and streaks, we aim to make professional growth fun, motivating, and measurable.
              </p>
            </section>
            <section>
              <h2 className="text-2xl font-semibold text-indigo-600 mb-3">What We Offer</h2>
              <ul className="list-disc list-inside space-y-2">
                <li><strong>Habit Tracking</strong>: Log daily and weekly work, learning, and collaboration habits to stay consistent.</li>
                <li><strong>Gamified Experience</strong>: Earn XP, level up, and unlock badges for achieving milestones.</li>
                <li><strong>Engagement Insights</strong>: Mentors can monitor progress and assign challenges through a dedicated admin panel.</li>
                <li><strong>Community Leaderboard</strong>: Compete with peers and showcase your progress.</li>
              </ul>
            </section>
            <section>
              <h2 className="text-2xl font-semibold text-indigo-600 mb-3">About SLT – Digital Platform Division</h2>
              <p className="text-lg leading-relaxed">
                As part of SLT, Sri Lanka’s leading telecommunications provider, the Digital Platform Division is committed to fostering innovation and nurturing talent. This project, guided by our mentor Janaka Harambearachchi, reflects our dedication to creating tools that inspire and empower the next generation of professionals.
              </p>
            </section>
            <section className="text-center">
              <h2 className="text-2xl font-semibold text-indigo-600 mb-3">Join Us</h2>
              <p className="text-lg leading-relaxed mb-4">
                Ready to start your journey of growth and achievement? Log in or register to begin tracking your habits and earning rewards!
              </p>
              <div className="flex justify-center space-x-4">
                <a
                  href="/login"
                  className="px-6 py-2 rounded-full text-white font-semibold bg-indigo-600 hover:bg-indigo-700 transition"
                >
                  Login
                </a>
                <a
                  href="/register"
                  className="px-6 py-2 rounded-full text-white font-semibold bg-indigo-600 hover:bg-indigo-700 transition"
                >
                  Register
                </a>
              </div>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default About;