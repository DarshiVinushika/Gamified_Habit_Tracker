import React, { useEffect, useState } from "react";
import axios from "axios";

import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

const MyBadges = () => {
  const [allBadges, setAllBadges] = useState([]);
  const [earnedBadges, setEarnedBadges] = useState([]);
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  useEffect(() => {
    axios.get("http://localhost:8080/api/badges")
      .then(res => setAllBadges(res.data))
      .catch(err => console.error(err));

    if (user.userId) {
      axios.get(`http://localhost:8080/api/users/${user.userId}`)
        .then(res => setEarnedBadges(res.data.user.badges || []))
        .catch(err => console.error(err));
    }
  }, [user.userId]);

  const isEarned = (badge) => {
    if (earnedBadges.includes(badge._id)) return true;

    if (badge.criteria && badge.criteria.includes("xp")) {
      const match = badge.criteria.match(/xp\s*>=\s*(\d+)/i);
      if (match && user.xp >= parseInt(match[1], 10)) return true;
    }

    return false;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#e0c4ff] via-[#8a2be2] to-[#8a2be2] text-white font-sans">
      <Navbar />
      <div className="flex-1 p-6">
        <div className="bg-[#1e0033] text-white rounded-2xl mt-8 p-6 shadow-2xl border border-purple-800 w-[80%] mx-auto ml-60">
          <h2 className="text-3xl font-bold text-center font-extrabold text-blue-200 tracking-wide uppercase drop-shadow-[0_0_3px_rgba(59,130,246,0.5)] mb-8">
            🏅 My Badges
          </h2>
          {allBadges.length === 0 ? (
            <p className="text-center text-purple-200">No badges available.</p>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {allBadges.map((badge) => (
                <div key={badge._id} className="bg-purple-900/60 border border-purple-700 rounded-xl shadow-lg flex flex-col items-center p-6 hover:scale-105 transition-transform duration-300">
                  <div className="text-5xl mb-2">{badge.icon}</div>
                  <div className="font-bold text-lg text-center text-teal-200">{badge.name}</div>
                  <div className="text-sm text-purple-200 text-center mb-2">{badge.description}</div>
                  {isEarned(badge) ? (
                    <div className="flex items-center text-green-400 font-semibold mt-2">
                      <span className="text-2xl mr-1">✅</span> Earned
                    </div>
                  ) : (
                    <div className="flex items-center text-gray-400 font-semibold mt-2">
                      <span className="text-2xl mr-1">🔒</span> Locked
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MyBadges;
