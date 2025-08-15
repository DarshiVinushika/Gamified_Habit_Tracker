import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  FaBriefcase,
  FaBook,
  FaUsers,
  FaUserTie,
  FaTrophy,
  FaStar,
  FaCheckCircle,
  FaArrowRight,
} from "react-icons/fa";
import HabitCategoryBox from "../Components/HabitCategoryBox";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import UserProfileCard from "../Components/UserProfileCard";
import { useUser } from "../Components/UserContext";

const CATEGORY_LABELS = {
  work: "Work & Task Habits",
  learning: "Learning & Growth Habits",
  collaboration: "Collaboration Habits",
  discipline: "Personal Discipline Habits",
  challenge: "Challenge-based Habits",
};

const CATEGORY_ICONS = {
  work: <FaBriefcase />,
  learning: <FaBook />,
  collaboration: <FaUsers />,
  discipline: <FaUserTie />,
  challenge: <FaTrophy />,
};

const CATEGORY_COLORS = {
  work: "from-blue-600 to-indigo-700",
  learning: "from-emerald-600 to-teal-700",
  collaboration: "from-purple-600 to-pink-700",
  discipline: "from-orange-600 to-red-700",
  challenge: "from-yellow-600 to-amber-700",
};

const LOCAL_STORAGE_KEY = "checkedHabits";

function HabitCategories() {
  const [habits, setHabits] = useState([]);
  const [checkedHabits, setCheckedHabits] = useState({});
  const [loading, setLoading] = useState(true);

  const { updateUserXpAndStreak } = useUser();

  // Load all habits on mount
  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:8080/api/habits")
      .then((res) => {
        setHabits(res.data);
        setLoading(false);
      })
      .catch(() => {
        setHabits([]);
        setLoading(false);
      });
  }, []);

  // Load completed habits for user from backend after habits load
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;
    if (habits.length === 0) return;

    axios
      .get("http://localhost:8080/api/users/me/completed-habits", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        const completed = res.data.completedHabits || [];
        const completedMap = {};

        // completedHabits expected to be an array of objects with habit info
        completed.forEach((completedEntry) => {
          // Defensive: habit could be nested object or just a name
          const habitName = completedEntry.habit?.name || completedEntry.name;
          if (habitName) {
            completedMap[habitName] = true;
          }
        });

        setCheckedHabits(completedMap);
      })
      .catch((err) => {
        console.error("Failed to load completed habits:", err);
      });
  }, [habits]);

  // Save to local storage (optional)
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(checkedHabits));
  }, [checkedHabits]);

  // Handle checkbox toggle and update backend
  const handleHabitCheck = async (habit, checked) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("You must be logged in");
        return;
      }

      await axios.post(
        "http://localhost:8080/api/users/me/completed-habits",
        {
          habitId: habit._id || habit.id,
          completed: checked,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Update XP and streak accordingly
      updateUserXpAndStreak(checked ? habit.xp : -habit.xp);

      // Update local UI state
      setCheckedHabits((prev) => ({
        ...prev,
        [habit.name]: checked,
      }));
    } catch (error) {
      console.error(
        "Error updating habit completion:",
        error.response?.data || error.message
      );
      alert("Failed to update habit status");
    }
  };

  // Organize habits by category for rendering
  const habitsByCategory = Object.keys(CATEGORY_LABELS).map((catKey) => ({
    key: catKey,
    title: CATEGORY_LABELS[catKey],
    icon: CATEGORY_ICONS[catKey],
    color: CATEGORY_COLORS[catKey],
    habits: habits
      .filter((h) => h.category === catKey)
      .map((h) => ({
        _id: h._id,
        name: h.name,
        xp: h.xpValue,
      })),
  }));

  // Calculate total habits and completed habits
  const totalHabits = habits.length;
  const completedHabitsCount = Object.keys(checkedHabits).filter(key => checkedHabits[key]).length;
  const completionRate = totalHabits > 0 ? Math.round((completedHabitsCount / totalHabits) * 100) : 0;

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        <Navbar />
        <main className="flex-grow flex items-center justify-center px-4 py-8 md:ml-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-slate-600 text-lg">Loading habit categories...</p>
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
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mb-6 shadow-lg">
              <FaStar className="text-3xl text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
              Habit Categories
            </h1>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
              Track your daily habits across different categories and build consistency in your professional development journey.
            </p>
          </div>

          {/* User Profile Card */}
          <div className="mb-8">
            <UserProfileCard />
          </div>

          {/* Progress Overview */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-slate-200/60 mb-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaCheckCircle className="text-2xl text-white" />
                </div>
                <h3 className="text-2xl font-bold text-slate-800 mb-2">{completedHabitsCount}</h3>
                <p className="text-slate-600">Completed Today</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaStar className="text-2xl text-white" />
                </div>
                <h3 className="text-2xl font-bold text-slate-800 mb-2">{totalHabits}</h3>
                <p className="text-slate-600">Total Habits</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaTrophy className="text-2xl text-white" />
                </div>
                <h3 className="text-2xl font-bold text-slate-800 mb-2">{completionRate}%</h3>
                <p className="text-slate-600">Completion Rate</p>
              </div>
            </div>
          </div>

          {/* Categories Grid */}
          <div className="space-y-8">
            {habitsByCategory.map(
              (cat) =>
                cat.habits.length > 0 && (
                  <div key={cat.key} className="animate-fade-in-up">
                    <div className="mb-6">
                      <div className="flex items-center mb-4">
                        <div className={`w-12 h-12 bg-gradient-to-br ${cat.color} rounded-xl flex items-center justify-center mr-4 shadow-lg`}>
                          <span className="text-2xl text-white">{cat.icon}</span>
                        </div>
                        <div>
                          <h2 className="text-3xl font-bold text-slate-800">{cat.title}</h2>
                          <p className="text-slate-600 text-lg">{cat.habits.length} habits available</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                      {cat.habits.map((habit) => (
                        <div
                          key={habit._id}
                          className={`bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-slate-200/60 hover:shadow-xl transition-all duration-300 transform hover:scale-105 ${
                            checkedHabits[habit.name] ? 'ring-2 ring-green-500 ring-opacity-50' : ''
                          }`}
                        >
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex-1">
                              <div className="flex items-center mb-3">
                                <input
                                  type="checkbox"
                                  checked={!!checkedHabits[habit.name]}
                                  onChange={() => handleHabitCheck(habit, !checkedHabits[habit.name])}
                                  className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2 cursor-pointer"
                                />
                                <span className="ml-3 text-sm font-medium text-slate-500">
                                  {checkedHabits[habit.name] ? 'Completed' : 'Mark as done'}
                                </span>
                              </div>
                              
                              <h3 className={`text-lg font-semibold mb-2 ${
                                checkedHabits[habit.name] 
                                  ? 'text-slate-400 line-through' 
                                  : 'text-slate-800'
                              }`}>
                                {habit.name}
                              </h3>
                              
                              <div className="flex items-center justify-between">
                                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800 border border-purple-200">
                                  +{habit.xp} XP
                                </span>
                                
                                {checkedHabits[habit.name] && (
                                  <div className="flex items-center text-green-600">
                                    <FaCheckCircle className="mr-1" />
                                    <span className="text-sm font-medium">Done!</span>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default HabitCategories;
