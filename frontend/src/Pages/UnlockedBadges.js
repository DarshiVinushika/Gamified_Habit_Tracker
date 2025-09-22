import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { 
  FaMedal, 
  FaTrophy, 
  FaStar, 
  FaFire, 
  FaCheckCircle, 
  FaLock, 
  FaUsers, 
  FaChartLine,
  FaAward,
  FaGem
} from "react-icons/fa";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { useUser } from "../Components/UserContext";

const UnlockedBadges = () => {
  const { user, loadingUser } = useUser();
  const [badges, setBadges] = useState([]);
  const [loadingBadges, setLoadingBadges] = useState(true);
  const [error, setError] = useState(null);
  const [completedHabitsCount, setCompletedHabitsCount] = useState(0);
  const [retryCount, setRetryCount] = useState(0);

  const API_URL = process.env.REACT_APP_API_URL || "";

  // Fetch badges
  useEffect(() => {
    const fetchBadges = async () => {
      setLoadingBadges(true);
      setError(null);
      try {
        const token = localStorage.getItem("token");
        const headers = token ? { Authorization: `Bearer ${token}` } : {};
        
        const res = await axios.get(`${API_URL}/api/badges`, { headers });
        setBadges(res.data || []);
        setRetryCount(0); // Reset retry count on success
      } catch (err) {
        console.error("Error fetching badges:", err);
        setError(err.response?.data?.message || "Failed to fetch badges");
        
        // Auto-retry on network errors
        if (err.code === 'NETWORK_ERROR' || !err.response) {
          setTimeout(() => {
            if (retryCount < 3) {
              setRetryCount(prev => prev + 1);
            }
          }, 2000);
        }
      } finally {
        setLoadingBadges(false);
      }
    };
    
    // Only fetch badges if we have a user or if we're not loading user
    if (!loadingUser) {
      fetchBadges();
    }
  }, [API_URL, loadingUser, retryCount]);

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
      case "level": return <FaTrophy className="text-lg" />;
      case "xp": return <FaStar className="text-lg" />;
      case "streak": return <FaFire className="text-lg" />;
      case "completion": return <FaCheckCircle className="text-lg" />;
      case "combined": return <FaGem className="text-lg" />;
      default: return <FaAward className="text-lg" />;
    }
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case "level": return "from-blue-600 to-indigo-600";
      case "xp": return "from-yellow-500 to-orange-500";
      case "streak": return "from-red-500 to-pink-500";
      case "completion": return "from-green-500 to-teal-500";
      case "combined": return "from-purple-600 to-indigo-600";
      default: return "from-gray-500 to-gray-600";
    }
  };

  const getCategoryLabel = (category) => {
    switch (category) {
      case "level": return "Level";
      case "xp": return "XP";
      case "streak": return "Streak";
      case "completion": return "Completion";
      case "combined": return "Combined";
      default: return "Other";
    }
  };

  if (loadingUser) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        <Navbar />
        <main className="flex-grow flex items-center justify-center px-4 py-8 md:ml-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-slate-600 text-lg">Loading user data...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (loadingBadges) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        <Navbar />
        <main className="flex-grow flex items-center justify-center px-4 py-8 md:ml-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-slate-600 text-lg">Loading badges...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <Navbar />
      <main className="flex-grow px-4 py-6 md:ml-64">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full mb-6 shadow-lg">
              <FaMedal className="text-3xl text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
              Badge Collection
            </h1>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
              Unlock achievements by completing habits, building streaks, and leveling up your professional development journey.
            </p>
          </div>

          {/* Error Display */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-2xl p-6 text-center">
              <p className="text-red-600 font-medium">{error}</p>
            </div>
          )}

          {/* Login Required Message */}
          {!loadingUser && !loadingBadges && !error && !user && (
            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-8 text-center">
              <FaUsers className="text-4xl text-blue-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-blue-800 mb-2">Login Required</h3>
              <p className="text-blue-600">Please Refresh the Page.</p>
            </div>
          )}

          {/* User Stats Summary */}
          {user && (
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-slate-200/60">
              <h2 className="text-2xl font-bold text-slate-800 mb-6 text-center">Your Progress Overview</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <FaTrophy className="text-2xl text-white" />
                  </div>
                  <h3 className="text-3xl font-bold text-slate-800 mb-1">{userStats.level}</h3>
                  <p className="text-slate-600">Current Level</p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <FaStar className="text-2xl text-white" />
                  </div>
                  <h3 className="text-3xl font-bold text-slate-800 mb-1">{userStats.xp}</h3>
                  <p className="text-slate-600">Total XP</p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-pink-600 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <FaFire className="text-2xl text-white" />
                  </div>
                  <h3 className="text-3xl font-bold text-slate-800 mb-1">{userStats.streak}</h3>
                  <p className="text-slate-600">Current Streak</p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-teal-600 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <FaCheckCircle className="text-2xl text-white" />
                  </div>
                  <h3 className="text-3xl font-bold text-slate-800 mb-1">{userStats.completedHabits}</h3>
                  <p className="text-slate-600">Habits Completed</p>
                </div>
              </div>
            </div>
          )}

          {/* Badges Grid */}
          {user && (
            <div className="space-y-8">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-slate-800">Available Badges</h2>
                <div className="text-sm text-slate-600">
                  {badgesWithStatus.filter(b => b.unlocked).length} of {badgesWithStatus.length} unlocked
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {badgesWithStatus.map((badge) => {
                  const category = getBadgeCategory(badge);
                  const progress = getProgressPercentage(badge);
                  const isUnlocked = badge.unlocked;

                  return (
                                         <div
                       key={badge._id}
                       className={`relative bg-white/90 backdrop-blur-sm rounded-xl shadow-lg border transition-all duration-300 hover:shadow-xl transform hover:scale-105 ${
                         isUnlocked
                           ? 'border-green-200 ring-2 ring-green-500 ring-opacity-30'
                           : 'border-slate-200'
                       }`}
                     >
                       {/* Category Badge */}
                       <div className="absolute top-2 right-2">
                         <div className={`bg-gradient-to-r ${getCategoryColor(category)} text-white text-xs px-2 py-1 rounded-full font-semibold flex items-center space-x-1`}>
                           {getCategoryIcon(category)}
                           <span className="text-xs">{getCategoryLabel(category)}</span>
                         </div>
                       </div>

                       {/* Badge Content */}
                       <div className="p-4 text-center">
                         <div className="text-4xl mb-3 mt-1">{badge.icon}</div>
                         
                         <h3 className={`font-bold text-base mb-2 ${
                           isUnlocked ? 'text-slate-800' : 'text-slate-600'
                         }`}>
                           {badge.name}
                         </h3>
                         
                         <p className="text-slate-600 text-xs mb-3 leading-relaxed">
                           {badge.description}
                         </p>

                         {/* Progress Bar */}
                         {!isUnlocked && progress > 0 && (
                           <div className="w-full mb-3">
                             <div className="flex justify-between text-xs text-slate-500 mb-1">
                               <span>Progress</span>
                               <span>{Math.round(progress)}%</span>
                             </div>
                             <div className="w-full bg-slate-200 rounded-full h-1.5">
                               <div
                                 className="bg-gradient-to-r from-blue-500 to-purple-500 h-1.5 rounded-full transition-all duration-300"
                                 style={{ width: `${progress}%` }}
                               ></div>
                             </div>
                           </div>
                         )}

                         {/* Status */}
                         {isUnlocked ? (
                           <div className="flex items-center justify-center text-green-600 font-semibold text-sm">
                             <FaCheckCircle className="mr-1 text-sm" />
                             <span>Unlocked</span>
                           </div>
                         ) : (
                           <div className="flex items-center justify-center text-slate-400 font-semibold text-sm">
                             <FaLock className="mr-1 text-sm" />
                             <span>Locked</span>
                           </div>
                         )}
                       </div>
                     </div>
                  );
                })}
              </div>

              {/* Empty State */}
              {badgesWithStatus.length === 0 && (
                <div className="text-center py-12">
                  <FaMedal className="text-6xl text-slate-300 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-slate-600 mb-2">No badges available</h3>
                  <p className="text-slate-500">Contact admin to add badges to the system!</p>
                </div>
              )}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default UnlockedBadges;
