import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { 
  FaTrophy, 
  FaFire, 
  FaStar, 
  FaChartLine, 
  FaCalendarAlt, 
  FaCheckCircle, 
  FaClock, 
  FaMedal,
  FaGraduationCap,
  FaUsers,
  FaBell,
  FaArrowRight
} from 'react-icons/fa';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import UserProfileCard from '../Components/UserProfileCard';

function InternDashboard() {
  const [intern, setIntern] = useState(null);
  const [recentHabits, setRecentHabits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userBadges, setUserBadges] = useState([]);
  const [completedHabits, setCompletedHabits] = useState([]);
  const [allHabits, setAllHabits] = useState([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        
        // Fetch user profile
        const profileRes = await axios.get("http://localhost:8080/api/users/me/intern", {
          headers: { Authorization: `Bearer ${token}` }
        });
        setIntern(profileRes.data.intern);

        // Fetch all available habits
        const habitsRes = await axios.get("http://localhost:8080/api/habits", {
          headers: { Authorization: `Bearer ${token}` }
        });
        setAllHabits(habitsRes.data);
        setRecentHabits(habitsRes.data.slice(0, 5));

        // Fetch user badges
        const badgesRes = await axios.get("http://localhost:8080/api/badges", {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUserBadges(badgesRes.data.slice(0, 5)); // Show first 5 badges

        // Fetch completed habits
        const completedHabitsRes = await axios.get("http://localhost:8080/api/users/me/completed-habits", {
          headers: { Authorization: `Bearer ${token}` }
        });
        setCompletedHabits(completedHabitsRes.data.completedHabits || []);

      } catch (err) {
        console.error("Failed to fetch dashboard data", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  // Calculate stats from available data
  const calculateStats = () => {
    if (!intern || !allHabits || !completedHabits) return {
      totalHabits: 0,
      completedToday: 0,
      weeklyProgress: 0,
      monthlyProgress: 0
    };

    const totalHabits = allHabits.length;
    
    // Calculate today's completions
    const today = new Date().toISOString().split('T')[0];
    const completedToday = completedHabits.filter(entry => 
      new Date(entry.date).toISOString().split('T')[0] === today
    ).length;

    // Calculate weekly progress (last 7 days)
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    const weeklyCompletions = completedHabits.filter(entry => 
      new Date(entry.date) >= weekAgo
    ).length;
    const weeklyProgress = totalHabits > 0 ? Math.round((weeklyCompletions / (totalHabits * 7)) * 100) : 0;

    // Calculate monthly progress (last 30 days)
    const monthAgo = new Date();
    monthAgo.setDate(monthAgo.getDate() - 30);
    const monthlyCompletions = completedHabits.filter(entry => 
      new Date(entry.date) >= monthAgo
    ).length;
    const monthlyProgress = totalHabits > 0 ? Math.round((monthlyCompletions / (totalHabits * 30)) * 100) : 0;

    return {
      totalHabits,
      completedToday,
      weeklyProgress: Math.min(weeklyProgress, 100),
      monthlyProgress: Math.min(monthlyProgress, 100)
    };
  };

  const stats = calculateStats();

  const getLevelColor = (level) => {
    if (level >= 10) return 'text-yellow-400';
    if (level >= 5) return 'text-purple-400';
    return 'text-blue-400';
  };

  const getProgressColor = (progress) => {
    if (progress >= 80) return 'text-green-400';
    if (progress >= 60) return 'text-yellow-400';
    if (progress >= 40) return 'text-orange-400';
    return 'text-red-400';
  };

  const getStreakEmoji = (streak) => {
    if (streak >= 30) return '🔥🔥🔥';
    if (streak >= 15) return '🔥🔥';
    if (streak >= 7) return '🔥';
    return '💪';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        <Navbar />
        <main className="flex-grow flex items-center justify-center px-4 py-8 md:ml-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-slate-600 text-lg">Loading your dashboard...</p>
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
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Welcome Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-2">
              Welcome back, {intern?.name?.split(' ')[0]}! 👋
            </h1>
            <p className="text-slate-600 text-lg">
              Ready to crush your goals today?
            </p>
          </div>

          {/* Detailed User Information */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-slate-200/60 animate-fade-in-up animation-delay-100">
            <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center">
              <FaUsers className="text-blue-500 mr-3" />
              My Profile Details
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Personal Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-slate-700 border-b border-slate-200 pb-2">Personal Information</h3>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                    <span className="text-slate-600 font-medium">Full Name:</span>
                    <span className="font-semibold text-slate-800">{intern?.name || 'Not specified'}</span>
                  </div>
                  
                  <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                    <span className="text-slate-600 font-medium">Email Address:</span>
                    <span className="font-semibold text-slate-800">{intern?.email || 'Not specified'}</span>
                  </div>
                  
                  <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                    <span className="text-slate-600 font-medium">Account Role:</span>
                    <span className="font-semibold text-slate-800 capitalize">{intern?.role || 'Not specified'}</span>
                  </div>
                  
                  <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                    <span className="text-slate-600 font-medium">Member Since:</span>
                    <span className="font-semibold text-slate-800">
                      {intern?.createdAt ? new Date(intern.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      }) : 'Not available'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Achievement Statistics */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-slate-700 border-b border-slate-200 pb-2">Achievement Statistics</h3>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg border border-blue-200">
                    <span className="text-blue-700 font-medium">Current Level:</span>
                    <span className="font-bold text-blue-800 text-lg">{intern?.level || 1} 🏆</span>
                  </div>
                  
                  <div className="flex justify-between items-center p-3 bg-gradient-to-r from-orange-50 to-orange-100 rounded-lg border border-orange-200">
                    <span className="text-orange-700 font-medium">Current Streak:</span>
                    <span className="font-bold text-orange-800 text-lg">{intern?.streak || 0} 🔥</span>
                  </div>
                  
                  <div className="flex justify-between items-center p-3 bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg border border-purple-200">
                    <span className="text-purple-700 font-medium">Total XP:</span>
                    <span className="font-bold text-purple-800 text-lg">{intern?.xp || 0} ⚡</span>
                  </div>
                  
                  <div className="flex justify-between items-center p-3 bg-gradient-to-r from-green-50 to-green-100 rounded-lg border border-green-200">
                    <span className="text-green-700 font-medium">Today's Progress:</span>
                    <span className="font-bold text-green-800 text-lg">{stats.completedToday} ✅</span>
                  </div>
                  
                  <div className="flex justify-between items-center p-3 bg-gradient-to-r from-indigo-50 to-indigo-100 rounded-lg border border-indigo-200">
                    <span className="text-indigo-700 font-medium">Total Completed:</span>
                    <span className="font-bold text-indigo-800 text-lg">{completedHabits.length} 🎯</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Account Status Section */}
            <div className="mt-6 pt-6 border-t border-slate-200">
              <h3 className="text-lg font-semibold text-slate-700 mb-4">Account Status</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                    <div>
                      <p className="text-green-800 font-medium">Account Status</p>
                      <p className="text-green-600 text-sm">Active</p>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-blue-500 rounded-full mr-3"></div>
                    <div>
                      <p className="text-blue-800 font-medium">Login Method</p>
                      <p className="text-blue-600 text-sm capitalize">{intern?.authSource || 'Email'}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Completed Habits Section */}
            <div className="mt-6 pt-6 border-t border-slate-200">
              <h3 className="text-lg font-semibold text-slate-700 mb-4 flex items-center">
                <FaCheckCircle className="text-green-500 mr-2" />
                Recent Completed Habits
              </h3>
              <div className="space-y-3">
                {completedHabits.length > 0 ? (
                  completedHabits.slice(0, 5).map((completedHabit, index) => (
                    <div key={index} className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg border border-green-200 hover:shadow-md transition-shadow">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                            <FaCheckCircle className="text-green-600" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-slate-800">{completedHabit.habit?.name || 'Unknown Habit'}</h4>
                            <p className="text-sm text-slate-600">+{completedHabit.habit?.xpValue || 0} XP</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-slate-500">
                            {new Date(completedHabit.date).toLocaleDateString()}
                          </p>
                          <p className="text-xs text-slate-400">
                            {new Date(completedHabit.date).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-slate-500">
                    <FaCheckCircle className="text-4xl mx-auto mb-2 text-slate-300" />
                    <p>No completed habits yet</p>
                    <p className="text-sm">Start completing habits to see your progress here!</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Quick Actions */}
            <div className="lg:col-span-2">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-slate-200/60 animate-fade-in-up animation-delay-500">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-slate-800">Quick Actions</h2>
                  <FaArrowRight className="text-slate-400" />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Link 
                    to="/habit-categories"
                    className="group bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl p-6 text-white hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-xl font-semibold mb-2">Track Habits</h3>
                        <p className="text-blue-100 text-sm">Complete your daily tasks</p>
                      </div>
                      <FaCheckCircle className="text-3xl text-blue-200 group-hover:scale-110 transition-transform" />
                    </div>
                  </Link>

                  <Link 
                    to="/leaderboard"
                    className="group bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl p-6 text-white hover:from-purple-600 hover:to-pink-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-xl font-semibold mb-2">Leaderboard</h3>
                        <p className="text-purple-100 text-sm">See your ranking</p>
                      </div>
                      <FaTrophy className="text-3xl text-purple-200 group-hover:scale-110 transition-transform" />
                    </div>
                  </Link>

                  <Link 
                    to="/unlocked"
                    className="group bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl p-6 text-white hover:from-green-600 hover:to-emerald-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-xl font-semibold mb-2">My Badges</h3>
                        <p className="text-green-100 text-sm">View achievements</p>
                      </div>
                      <FaMedal className="text-3xl text-green-200 group-hover:scale-110 transition-transform" />
                    </div>
                  </Link>

                  <div className="group bg-gradient-to-r from-orange-500 to-red-600 rounded-xl p-6 text-white hover:from-orange-600 hover:to-red-700 transition-all duration-300 transform hover:scale-105 shadow-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-xl font-semibold mb-2">Dashboard</h3>
                        <p className="text-orange-100 text-sm">View analytics</p>
                      </div>
                      <FaChartLine className="text-3xl text-orange-200 group-hover:scale-110 transition-transform" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Progress Overview */}
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-slate-200/60 animate-fade-in-up animation-delay-700">
                <h2 className="text-xl font-bold text-slate-800 mb-4">Progress Overview</h2>
                
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-slate-600">Weekly Progress</span>
                      <span className="font-semibold">{stats.weeklyProgress}%</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <div 
                        className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${stats.weeklyProgress}%` }}
                      ></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-slate-600">Monthly Progress</span>
                      <span className="font-semibold">{stats.monthlyProgress}%</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <div 
                        className="bg-purple-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${stats.monthlyProgress}%` }}
                      ></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-slate-600">Total Habits</span>
                      <span className="font-semibold">{stats.totalHabits}</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <div 
                        className="bg-green-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${Math.min(100, (stats.totalHabits / 20) * 100)}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default InternDashboard;