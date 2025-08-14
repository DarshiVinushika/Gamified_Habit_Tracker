import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { useUser } from "../Components/UserContext";

const UnlockedBadges = () => {
  const { user, loadingUser } = useUser();
  const [badges, setBadges] = useState([]);
  const [loadingBadges, setLoadingBadges] = useState(true);
  const [error, setError] = useState(null);
  const [completedHabitsCount, setCompletedHabitsCount] = useState(0);

  const API_URL = process.env.REACT_APP_API_URL || "";

  // Fetch badges
  useEffect(() => {
    const fetchBadges = async () => {
      setLoadingBadges(true);
      setError(null);
      try {
        const res = await axios.get(`${API_URL}/api/badges`);
        setBadges(res.data || []);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch badges");
      } finally {
        setLoadingBadges(false);
      }
    };
    fetchBadges();
  }, [API_URL]);

  // Fetch completed habits count from backend
  useEffect(() => {
    const fetchCompletedHabitsCount = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;
        const res = await axios.get(`${API_URL}/api/users/me/count`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCompletedHabitsCount(res.data.count || 0);
      } catch (err) {
        console.error("Failed to fetch completed habits count", err);
      }
    };

    if (user) {
      fetchCompletedHabitsCount();
    }
  }, [user, API_URL]);

  const userStats = useMemo(() => {
    return {
      xp: Number(user?.xp || 0),
      streak: Number(user?.streak || 0),
      level: Number(user?.level || 1),
      completedHabits: completedHabitsCount,
    };
  }, [user, completedHabitsCount]);

  const meetsCriteria = (criteriaString) => {
    if (!criteriaString || typeof criteriaString !== "string") return false;

    const parts = criteriaString
      .split(/&&|and/i)
      .map((s) => s.trim())
      .filter(Boolean);

    for (const part of parts) {
      const match = part.match(/^(xp|streak|level|completedHabits)\s*(>=|<=|==|>|<)\s*(\d+)$/i);
      if (!match) return false;

      const key = match[1].toLowerCase();
      const op = match[2];
      const value = Number(match[3]);
      const actual = userStats[key] || 0;

      switch (op) {
        case ">=": if (!(actual >= value)) return false; break;
        case ">": if (!(actual > value)) return false; break;
        case "<=": if (!(actual <= value)) return false; break;
        case "<": if (!(actual < value)) return false; break;
        case "==": if (!(actual === value)) return false; break;
        default: return false;
      }
    }
    return true;
  };

  const getProgressPercentage = (badge) => {
    const criteria = badge.criteria;
    if (criteria.includes("level")) {
      const match = criteria.match(/level\s*(>=|<=|==|>|<)\s*(\d+)/i);
      if (match && match[1] === ">=") return Math.min(100, (userStats.level / Number(match[2])) * 100);
    }
    if (criteria.includes("xp")) {
      const match = criteria.match(/xp\s*(>=|<=|==|>|<)\s*(\d+)/i);
      if (match && match[1] === ">=") return Math.min(100, (userStats.xp / Number(match[2])) * 100);
    }
    if (criteria.includes("streak")) {
      const match = criteria.match(/streak\s*(>=|<=|==|>|<)\s*(\d+)/i);
      if (match && match[1] === ">=") return Math.min(100, (userStats.streak / Number(match[2])) * 100);
    }
    if (criteria.includes("completedHabits")) {
      const match = criteria.match(/completedHabits\s*(>=|<=|==|>|<)\s*(\d+)/i);
      if (match && match[1] === ">=") return Math.min(100, (userStats.completedHabits / Number(match[2])) * 100);
    }
    return 0;
  };

  const badgesWithStatus = useMemo(() => {
    if (!badges || badges.length === 0) return [];
    const withStatus = badges.map((badge) => {
      const progress = getProgressPercentage(badge);
      return {
        ...badge,
        unlocked: meetsCriteria(badge.criteria) || progress >= 100,
      };
    });
    withStatus.sort((a, b) => {
      if (a.unlocked === b.unlocked) {
        return (a.name || "").localeCompare(b.name || "");
      }
      return a.unlocked ? -1 : 1;
    });
    return withStatus;
  }, [badges, userStats, getProgressPercentage, meetsCriteria]);

  const getBadgeCategory = (badge) => {
    if (badge.criteria.includes("level")) return "level";
    if (badge.criteria.includes("xp")) return "xp";
    if (badge.criteria.includes("streak")) return "streak";
    if (badge.criteria.includes("completedHabits")) return "completion";
    if (badge.criteria.includes("&&")) return "combined";
    return "other";
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case "level": return "🏆";
      case "xp": return "💰";
      case "streak": return "🔥";
      case "completion": return "✅";
      case "combined": return "🌟";
      default: return "🎯";
    }
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case "level": return "from-blue-600 to-purple-600";
      case "xp": return "from-yellow-500 to-orange-500";
      case "streak": return "from-red-500 to-pink-500";
      case "completion": return "from-green-500 to-teal-500";
      case "combined": return "from-purple-600 to-indigo-600";
      default: return "from-gray-500 to-gray-600";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#e0c4ff] via-[#8a2be2] to-[#8a2be2] text-white font-sans">
      <Navbar />
      <div className="flex-1 p-6">
        <div className="bg-[#1e0033] text-white rounded-2xl mt-8 p-6 shadow-2xl border border-purple-800 w-[80%] mx-auto ml-60">
          <h2 className="text-3xl font-bold text-center font-extrabold text-blue-200 tracking-wide uppercase drop-shadow-[0_0_3px_rgba(59,130,246,0.5)] mb-8">
            🏅 All Badges
          </h2>

          {(loadingUser || loadingBadges) && (
            <p className="text-center text-purple-200">Loading...</p>
          )}

          {!loadingUser && !loadingBadges && error && (
            <p className="text-center text-red-300">{error}</p>
          )}

          {!loadingUser && !loadingBadges && !error && (
            <>
              {!user && (
                <p className="text-center text-purple-200">Please log in to view your badge status.</p>
              )}

              {user && (
                <div className="space-y-8">
                  {/* User Stats Summary */}
                  <div className="bg-purple-800/40 rounded-xl p-6 border border-purple-600">
                    <h3 className="text-xl font-bold text-blue-200 mb-4 text-center">Your Progress</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-200">{userStats.level}</div>
                        <div className="text-sm text-purple-200">Level</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-yellow-200">{userStats.xp}</div>
                        <div className="text-sm text-purple-200">XP</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-red-200">{userStats.streak}</div>
                        <div className="text-sm text-purple-200">Streak</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-200">{userStats.completedHabits}</div>
                        <div className="text-sm text-purple-200">Completed</div>
                      </div>
                    </div>
                  </div>

                  {/* Badges Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {badgesWithStatus.map((badge) => {
                      const category = getBadgeCategory(badge);
                      const progress = getProgressPercentage(badge);
                      const isUnlocked = badge.unlocked;

                      return (
                        <div
                          key={badge._id}
                          className={`relative rounded-xl shadow-lg flex flex-col items-center p-6 hover:scale-105 transition-transform duration-300 border ${
                            isUnlocked
                              ? "bg-gradient-to-br from-purple-900/80 to-purple-800/60 border-teal-400 shadow-teal-400/20"
                              : "bg-gradient-to-br from-purple-900/40 to-purple-800/20 border-purple-700"
                          }`}
                        >
                          <div className={`absolute top-2 right-2 bg-gradient-to-r ${getCategoryColor(category)} text-white text-xs px-2 py-1 rounded-full font-semibold`}>
                            {getCategoryIcon(category)}
                          </div>
                          <div className="text-6xl mb-3 mt-2">{badge.icon}</div>
                          <div className="font-bold text-lg text-center text-teal-200 mb-2">{badge.name}</div>
                          <div className="text-sm text-purple-200 text-center mb-4">{badge.description}</div>

                          {!isUnlocked && progress > 0 && (
                            <div className="w-full mb-3">
                              <div className="text-xs text-purple-300 mb-1 text-center">
                                Progress: {Math.round(progress)}%
                              </div>
                              <div className="w-full bg-purple-700 rounded-full h-2">
                                <div
                                  className="bg-gradient-to-r from-teal-400 to-blue-400 h-2 rounded-full transition-all duration-300"
                                  style={{ width: `${progress}%` }}
                                ></div>
                              </div>
                            </div>
                          )}

                          <div className="text-xs text-purple-300 text-center mb-3 font-mono">
                            {badge.criteria}
                          </div>

                          {isUnlocked ? (
                            <div className="flex items-center text-green-400 font-semibold mt-2">
                              <span className="text-2xl mr-2">✅</span> Unlocked
                            </div>
                          ) : (
                            <div className="flex items-center text-gray-400 font-semibold mt-2">
                              <span className="text-2xl mr-2">🔒</span> Locked
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default UnlockedBadges;
