import React, { useEffect, useState } from "react";
import axios from "axios";
import { 
  FaMedal, 
  FaTrophy, 
  FaCrown, 
  FaStar, 
  FaFire, 
  FaUsers, 
  FaChartLine,
  FaArrowUp,
  FaArrowDown
} from "react-icons/fa";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

const Leaderboard = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [filterType, setFilterType] = useState("xp");
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:8080/api/users/leaderboard", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        // Filter to only show intern users (additional safety check)
        const internUsers = res.data.users.filter(user => user.role === "intern" || !user.role);
        setUsers(internUsers);
        setFilteredUsers(sortUsers(internUsers, "xp")); // default sort
        
        // Get current user info
        if (token) {
          try {
            const userRes = await axios.get("http://localhost:8080/api/users/me/intern", {
              headers: { Authorization: `Bearer ${token}` }
            });
            setCurrentUser(userRes.data.intern);
          } catch (err) {
            console.log("Could not fetch current user");
          }
        }
      } catch (error) {
        console.error("Error fetching leaderboard:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  const sortUsers = (userList, type) => {
    if (type === "xp") {
      return [...userList].sort((a, b) => b.xp - a.xp);
    } else if (type === "streak") {
      return [...userList].sort((a, b) => b.streak - a.streak);
    }
    return userList;
  };

  const handleFilterChange = (e) => {
    const selectedFilter = e.target.value;
    setFilterType(selectedFilter);
    setFilteredUsers(sortUsers(users, selectedFilter));
  };

  const getRankIcon = (rank) => {
    if (rank === 0) return <FaCrown className="text-2xl text-yellow-400" />;
    if (rank === 1) return <FaTrophy className="text-xl text-gray-300" />;
    if (rank === 2) return <FaMedal className="text-lg text-orange-400" />;
    return null;
  };

  const getRankColor = (rank) => {
    if (rank === 0) return "bg-gradient-to-r from-yellow-400 to-amber-500 text-yellow-900";
    if (rank === 1) return "bg-gradient-to-r from-gray-300 to-gray-400 text-gray-800";
    if (rank === 2) return "bg-gradient-to-r from-orange-400 to-red-500 text-orange-900";
    return "bg-white/90 text-slate-700";
  };

  const getCurrentUserRank = () => {
    if (!currentUser) return null;
    const rank = filteredUsers.findIndex(user => user._id === currentUser._id);
    return rank >= 0 ? rank + 1 : null;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        <Navbar />
        <main className="flex-grow flex items-center justify-center px-4 py-8 md:ml-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-slate-600 text-lg">Loading leaderboard...</p>
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
              <FaTrophy className="text-3xl text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
              Leaderboard
            </h1>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
              Compete with your peers and see who's leading the way in professional development and habit building.
            </p>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-slate-200/60 text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center mx-auto mb-3">
                <FaUsers className="text-xl text-white" />
              </div>
              <h3 className="text-2xl font-bold text-slate-800 mb-1">{users.length}</h3>
              <p className="text-slate-600">Total Participants</p>
            </div>
            
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-slate-200/60 text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-xl flex items-center justify-center mx-auto mb-3">
                <FaCrown className="text-xl text-white" />
              </div>
              <h3 className="text-2xl font-bold text-slate-800 mb-1">{users[0]?.name || 'N/A'}</h3>
              <p className="text-slate-600">Top Performer</p>
            </div>
            
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-slate-200/60 text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center mx-auto mb-3">
                <FaStar className="text-xl text-white" />
              </div>
              <h3 className="text-2xl font-bold text-slate-800 mb-1">{users[0]?.xp || 0}</h3>
              <p className="text-slate-600">Highest XP</p>
            </div>
            
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-slate-200/60 text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-orange-600 rounded-xl flex items-center justify-center mx-auto mb-3">
                <FaFire className="text-xl text-white" />
              </div>
              <h3 className="text-2xl font-bold text-slate-800 mb-1">{users[0]?.streak || 0}</h3>
              <p className="text-slate-600">Best Streak</p>
            </div>
          </div>

          {/* Current User Position */}
          {currentUser && (
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-6 text-white shadow-xl">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-semibold mb-2">Your Position</h3>
                  <p className="text-blue-100">
                    {getCurrentUserRank() ? `Rank #${getCurrentUserRank()} out of ${users.length}` : 'Not ranked yet'}
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold mb-1">{currentUser.xp || 0}</div>
                  <div className="text-blue-100">Your XP</div>
                </div>
              </div>
            </div>
          )}

          {/* Filter Controls */}
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-slate-800">Rankings</h2>
            <div className="flex items-center space-x-4">
              <label className="text-slate-600 font-medium">Sort by:</label>
              <select
                value={filterType}
                onChange={handleFilterChange}
                className="bg-white border border-slate-300 text-slate-700 rounded-lg px-4 py-2 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
              >
                <option value="xp">Total XP</option>
                <option value="streak">Current Streak</option>
              </select>
            </div>
          </div>

          {/* Leaderboard Table */}
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-slate-200/60 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gradient-to-r from-slate-100 to-slate-200 border-b border-slate-300">
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700 uppercase tracking-wider">
                      Rank
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700 uppercase tracking-wider">
                      Player
                    </th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-slate-700 uppercase tracking-wider">
                      <div className="flex items-center justify-center">
                        <FaStar className="mr-2 text-yellow-500" />
                        XP
                      </div>
                    </th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-slate-700 uppercase tracking-wider">
                      <div className="flex items-center justify-center">
                        <FaTrophy className="mr-2 text-purple-500" />
                        Level
                      </div>
                    </th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-slate-700 uppercase tracking-wider">
                      <div className="flex items-center justify-center">
                        <FaFire className="mr-2 text-orange-500" />
                        Streak
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {filteredUsers.map((user, idx) => (
                    <tr
                      key={user._id || idx}
                      className={`hover:bg-slate-50 transition-colors duration-200 ${
                        currentUser && user._id === currentUser._id ? 'bg-blue-50 ring-2 ring-blue-200' : ''
                      }`}
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${getRankColor(idx)}`}>
                            {idx + 1}
                          </div>
                          {getRankIcon(idx)}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mr-3">
                            <span className="text-white font-semibold text-sm">
                              {user.name?.charAt(0)?.toUpperCase() || 'U'}
                            </span>
                          </div>
                          <div>
                            <div className="font-semibold text-slate-800">
                              {user.name}
                              {currentUser && user._id === currentUser._id && (
                                <span className="ml-2 inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                  You
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <div className="font-bold text-slate-800">{user.xp || 0}</div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <div className="font-semibold text-slate-700">{user.level || 1}</div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <div className="flex items-center justify-center">
                          <span className="font-semibold text-slate-700 mr-2">{user.streak || 0}</span>
                          {user.streak > 0 && <FaFire className="text-orange-500" />}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Empty State */}
          {filteredUsers.length === 0 && (
            <div className="text-center py-12">
              <FaUsers className="text-6xl text-slate-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-slate-600 mb-2">No users found</h3>
              <p className="text-slate-500">Be the first to join the leaderboard!</p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Leaderboard;