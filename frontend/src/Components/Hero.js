import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import heroBg1 from '../assets/heroBg1.jpg';
import { FaTrophy, FaRocket, FaChartLine, FaUsers, FaStar, FaMedal, FaCheckCircle, FaArrowRight } from "react-icons/fa";
import logo from '../assets/logo.png';
const animatedWords = ["Habits", "Career", "Success", "Growth"];

const Hero = () => {
  const [wordIndex, setWordIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [animating, setAnimating] = useState(true);
  const [isPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;

    let timeout;
    const currentWord = animatedWords[wordIndex];

    if (animating) {
      if (displayedText.length < currentWord.length) {
        timeout = setTimeout(() => {
          setDisplayedText(currentWord.slice(0, displayedText.length + 1));
        }, 150);
      } else {
        setAnimating(false);
        timeout = setTimeout(() => setAnimating(true), 2000);
      }
    } else {
      if (displayedText.length > 0) {
        timeout = setTimeout(() => {
          setDisplayedText(currentWord.slice(0, displayedText.length - 1));
        }, 50);
      } else {
        setAnimating(true);
        setWordIndex((prev) => (prev + 1) % animatedWords.length);
      }
    }

    return () => clearTimeout(timeout);
  }, [displayedText, animating, wordIndex, isPaused]);

  useEffect(() => {
    setDisplayedText("");
    setAnimating(true);
  }, [wordIndex]);

  const scrollToFeatures = () => {
    const featuresSection = document.getElementById('features');
    if (featuresSection) {
      featuresSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Professional background with overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroBg1})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/85 via-black-900/100 to-black-900/85"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-slate-900/60"></div>
      </div>

      {/* Professional geometric background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }} />
        </div>

        {/* Floating professional elements */}
        <div className="absolute top-20 left-20 w-32 h-32 border border-blue-400/20 rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-32 w-24 h-24 border border-indigo-400/20 rounded-full animate-pulse animation-delay-1000"></div>
        <div className="absolute bottom-40 left-32 w-20 h-20 border border-purple-400/20 rounded-full animate-pulse animation-delay-2000"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 text-center">
        {/* Professional badge */}
        <div className="mb-6">
        </div>

        {/* Main heading */}
        <div className="mb-8">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-tight mt-10">
            <span className=" bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent mr-6">
              Level Up Your
            </span>
            <span className="text-4xl md:text-6xl lg:text-6xl font-extrabold mt-20">
              <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
                {displayedText}
              </span>
              <span className="inline-block w-2 h-16 md:h-10 bg-blue-400 ml-2 animate-pulse"></span>
            </span>
          </h1>
        </div>
        <img
            src={logo}
            alt="HabitHero Logo"
            className="h-60 w-60 hover:scale-110 ml-10"
          />

        {/* Professional subtitle */}
        <p className="text-xl md:text-2xl text-slate-200 mb-10 max-w-4xl leading-relaxed font-light">
          Transform professional habits into measurable success. Join the enterprise-grade gamified platform
          designed specifically for SLT interns and junior professionals.
        </p>

        {/* Professional feature highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 max-w-5xl">
          <div className="group bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105 hover:-translate-y-2">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg">
              <FaChartLine className="text-white text-2xl group-hover:rotate-12 transition-transform duration-300" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Track Habits</h3>
            <p className="text-slate-200 text-sm leading-relaxed">Build consistent work and learning routines with enterprise-grade tracking</p>
          </div>

          <div className="group bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105 hover:-translate-y-2">
            <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg">
              <FaTrophy className="text-white text-2xl group-hover:rotate-12 transition-transform duration-300" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Earn XP</h3>
            <p className="text-slate-200 text-sm leading-relaxed">Gamified progress with professional rewards and achievement badges</p>
          </div>

          <div className="group bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105 hover:-translate-y-2">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg">
              <FaUsers className="text-white text-2xl group-hover:rotate-12 transition-transform duration-300" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Level Up</h3>
            <p className="text-slate-200 text-sm leading-relaxed">Compete professionally and climb the corporate leaderboard</p>
          </div>
        </div>
        <div className="max-w-4xl mb-8 mx-auto text-center px-6 relative z-10">
          <div className={`transition-all duration-700'animate-fade-in-up' : 'opacity-0 translate-y-4'}`}>
            <span className="text-xs font-medium text-gray-400 uppercase tracking-wider mt-5 mb-4 block animate-fade-in animation-delay-200">
              Ready to Start?
            </span>
            <h2 className="text-3xl font-light text-white mb-8 animate-fade-in animation-delay-300">
              Transform Your Internship Today
            </h2>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto text-sm leading-relaxed animate-fade-in animation-delay-400">
              Join thousands of interns who are already leveling up their careers with our gamified platform
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/login"
                className="group bg-white text-gray-900 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-all duration-300 hover:scale-105 hover:shadow-lg"
              >
                <span className="flex items-center justify-center">
                  <FaRocket className="mr-2 text-sm group-hover:animate-bounce" />
                  Get Started
                  <FaArrowRight className="ml-2 text-sm group-hover:translate-x-1 transition-transform duration-300" />
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;