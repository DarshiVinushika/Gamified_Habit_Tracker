// src/Pages/HabitCategories.jsx
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

  const { user, updateUserXpAndStreak } = useUser();

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/habits")
      .then((res) => setHabits(res.data))
      .catch(() => setHabits([]));
  }, []);

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
        completed.forEach((habit) => {
          completedMap[habit.name] = true;
        });
        setCheckedHabits(completedMap);
      })
      .catch((err) => {
        console.error("Failed to load completed habits:", err);
      });
  }, [habits]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(checkedHabits));
  }, [checkedHabits]);

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

      updateUserXpAndStreak(checked ? habit.xp : -habit.xp);

      setCheckedHabits((prev) => ({
        ...prev,
        [habit.name]: checked,
      }));
    } catch (error) {
      console.error("Error updating habit completion:", error.response?.data || error.message);
      alert("Failed to update habit status");
    }
  };

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
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex flex-col items-center flex-grow py-8 md:ml-64">
        <div className="w-full max-w-2xl space-y-8">
          <UserProfileCard />
          {habitsByCategory.map(
            (cat) =>
              cat.habits.length > 0 && (
                <HabitCategoryBox
                  key={cat.key}
                  title={cat.title}
                  icon={cat.icon}
                  habits={cat.habits}
                  checkedHabits={checkedHabits}
                  onHabitCheck={handleHabitCheck}
                />
              )
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default HabitCategories;
