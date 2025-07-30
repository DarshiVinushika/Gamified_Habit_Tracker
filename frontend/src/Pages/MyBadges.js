import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../Components/Sidebar";

const MyBadges = () => {
  const [allBadges, setAllBadges] = useState([]);
  const [earnedBadges, setEarnedBadges] = useState([]);
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  useEffect(() => {
    // Fetch all badges
    axios.get("http://localhost:8080/api/badges")
      .then(res => setAllBadges(res.data))
      .catch(err => console.error(err));

    // Fetch user's earned badges
    if (user.userId) {
      axios.get(`http://localhost:8080/api/users/${user.userId}`)
        .then(res => setEarnedBadges(res.data.user.badges || []))
        .catch(err => console.error(err));
    }
  }, [user.userId]);

  // Helper to check if badge is earned
  const isEarned = (badge) => {
    // Already earned (from DB)
    if (earnedBadges.includes(badge._id)) return true;
    // XP-based badge logic (frontend check)
    if (badge.criteria && badge.criteria.includes("xp")) {
      // Example: "xp >= 1000"
      const match = badge.criteria.match(/xp\s*>=\s*(\d+)/i);
      if (match && user.xp >= parseInt(match[1], 10)) {
        return true;
      }
    }
    return false;
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-blue-400 to-purple-400">
      <Sidebar />
      <div className="flex-1 p-8">
        <h1 className="text-3xl font-bold mb-8 text-white">My Badges</h1>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {allBadges.map(badge => (
            <div key={badge._id} className="bg-white rounded-xl shadow-lg flex flex-col items-center p-6">
              <div className="text-5xl mb-2">{badge.icon}</div>
              <div className="font-bold text-lg text-center">{badge.name}</div>
              <div className="text-sm text-gray-500 text-center mb-2">{badge.description}</div>
              {isEarned(badge._id) ? (
                <div className="flex items-center text-green-600 font-semibold mt-2">
                  <span className="text-2xl mr-1">✅</span> Earned
                </div>
              ) : (
                <div className="flex items-center text-gray-500 font-semibold mt-2">
                  <span className="text-2xl mr-1">🔒</span> Locked
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyBadges;