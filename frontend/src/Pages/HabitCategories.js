import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  FaBriefcase,
  FaBook,
  FaUsers,
  FaUserTie,
  FaTrophy,
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

const LOCAL_STORAGE_KEY = "checkedHabits";

function HabitCategories() {
  const [habits, setHabits] = useState([]);
  const [checkedHabits, setCheckedHabits] = useState({});

  const { updateUserXpAndStreak } = useUser();

  // Load all habits on mount
  useEffect(() => {
    axios
      .get("http://localhost:8080/api/habits")
      .then((res) => setHabits(res.data))
      .catch(() => setHabits([]));
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
    habits: habits
      .filter((h) => h.category === catKey)
      .map((h) => ({
        _id: h._id,
        name: h.name,
        xp: h.xpValue,
      })),
  }));

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f3e5f5] via-[#bb86fc] to-[#7b1fa2] text-white font-sans">
      <Navbar />
      <main className="flex flex-col items-center flex-grow py-8 md:ml-64">
        <div className="w-full max-w-4xl space-y-10 bg-[rgba(26,0,37,0.4)] p-10 rounded-2xl border-2 border-[#e0c4ff] shadow-[0_0_40px_rgba(156,39,176,0.9)] text-white font-['Press_Start_2P'] backdrop-blur-md">
          <UserProfileCard />
          {habitsByCategory.map(
            (cat) =>
              cat.habits.length > 0 && (
                <div className="ml-16" key={cat.key}>
                  <HabitCategoryBox
                    title={cat.title}
                    icon={cat.icon}
                    habits={cat.habits}
                    checkedHabits={checkedHabits}
                    onHabitCheck={handleHabitCheck}
                  />
                </div>
              )
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default HabitCategories;
