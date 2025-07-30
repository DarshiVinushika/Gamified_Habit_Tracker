import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import heroBg1 from '../assets/heroBg1.jpg';
import Navbar from "../Components/Navbar";

const animatedWords = ["Habits,", "Career!"];

const Hero = () => {
  const [wordIndex, setWordIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [animating, setAnimating] = useState(true);

  useEffect(() => {
    let timeout;
    const currentWord = animatedWords[wordIndex];

    if (animating) {
      if (displayedText.length < currentWord.length) {
        timeout = setTimeout(() => {
          setDisplayedText(currentWord.slice(0, displayedText.length + 1));
        }, 200);
      } else {
        setAnimating(false);
        timeout = setTimeout(() => setAnimating(true), 1000);
      }
    } else {
      if (displayedText.length > 0) {
        timeout = setTimeout(() => {
          setDisplayedText(currentWord.slice(0, displayedText.length - 1));
        }, 60);
      } else {
        setAnimating(true);
        setWordIndex((prev) => (prev + 1) % animatedWords.length);
      }
    }

    return () => clearTimeout(timeout);
  }, [displayedText, animating, wordIndex]);

  useEffect(() => {
    setDisplayedText("");
    setAnimating(true);
  }, [wordIndex]);

  return (
    <div
      className="relative"
      style={{
        backgroundImage: `url(${heroBg1})`,
        minHeight: "800px",
        minWidth: "100%",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Navbar />

      <div className="flex items-between justify-between pr-16 pt-16">
        <div className="pl-48 pt-24 amaranth-bold text-6xl text-[#8B5CF6]">
          <p className="relative left-16 top-16">
            Level Up Your{" "}<br/>
            <span className="transition-all duration-500 ease-in-out text-[#3B82F6] pl-52">
              {displayedText}
              <span className="animate-pulse"></span>
            </span>
          </p>
        </div>
        <div>
          <h1
            className="text-4xl md:text-8xl mb-7 mt-7 amaranth-bold text-[#473b3b] drop-shadow-lg text-center"
          >
            Level Up Your <br />
            Internship Journey
          </h1>
          <h2 className="text-xl md:text-3xl text-white font-semibold mb-5 drop-shadow text-center pr-12">
            Transform habits into XP, streaks into success
          </h2>
          <p className="text-white/90 mb-9 max-w-2xl drop-shadow text-center text-xl">
            Join the gamified habit tracking platform designed specifically for SLT interns. Build positive work habits,
            earn XP, unlock badges, and climb the leaderboard while developing skills that matter.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/register"
              className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-3 rounded-full shadow transition flex items-center justify-center text-2xl"
            >
              <span className="mr-2">🚀</span> Start your journey
            </Link>
            <Link
              to="/features"
              className="border border-white text-white font-semibold px-8 py-3 rounded-full shadow transition hover:bg-white hover:text-purple-600 flex items-center justify-center text-2xl"
            >
              <span className="mr-2">🛠️</span> Explore Features
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;