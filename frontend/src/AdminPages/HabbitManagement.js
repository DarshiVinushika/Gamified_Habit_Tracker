import React, { useState, useEffect } from "react";
import { FiSearch, FiPlus } from "react-icons/fi";
import AdminSidebar from "./AdminSidebar";
import axios from "axios";

const HABIT_OPTIONS = [
  "Daily Work Reporte",
  "Read Technical Article",
  "Completed Weekly Goal",
  "Helped a Peer",
  "Took a Break Mindfully",
  "Other",
];
const CATEGORY_OPTIONS = [
  "Learning & Growth",
  "Work & Task",
  "Collaboration"
];

const HabbitManagement = () => {
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    habit: "",
    customHabit: "",
    category: "",
    xp: "",
  });
  const [habits, setHabits] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchHabits();
  }, []);

  const fetchHabits = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/habits");
      setHabits(res.data);
    } catch (err) {
      // handle error
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const habitValue = form.habit === "Other" ? form.customHabit : form.habit;
    try {
      await axios.post("http://localhost:8080/api/habits", {
        name: habitValue,
        category: form.category,
        xpValue: form.xp,
        frequency: "daily",
        isActive: true,
      });
      setShowModal(false);
      setForm({ habit: "", customHabit: "", category: "", xp: "" });
      fetchHabits();
    } catch (err) {
      // handle error
    }
    setLoading(false);
  };

  const isOtherHabit = form.habit === "Other";

  return (
    <div className="flex min-h-screen bg-gray-100" style={{ backgroundColor: "#D0C5E6" }}>
      <AdminSidebar />
      <div className="flex-1 p-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-5xl font-serif text-purple-900">Habits Management</h1>
          <button
            className="flex items-center gap-2 bg-green-400 hover:bg-green-500 text-black px-8 py-3 rounded-xl text-xl font-normal transition-colors"
            onClick={() => setShowModal(true)}
          >
            <FiPlus className="text-purple-600 text-2xl" />
            New Habit
          </button>
        </div>
        <div className="flex items-center bg-gray-100 rounded-full px-4 py-2 w-[370px] mb-8">
          <FiSearch className="text-blue-500 text-2xl mr-2" />
          <input
            type="text"
            placeholder="Search by habit or category"
            className="bg-transparent outline-none text-lg w-full text-gray-600"
            // TODO: implement search filter if needed
          />
        </div>

        {/* Table of Habits */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-bold mb-4 text-purple-800">All Habits</h2>
          <table className="min-w-full bg-white border">
            <thead>
              <tr className="bg-purple-100">
                <th className="border px-4 py-2">Habit</th>
                <th className="border px-4 py-2">Category</th>
                <th className="border px-4 py-2">XP Value</th>
                <th className="border px-4 py-2">Frequency</th>
                <th className="border px-4 py-2">Active</th>
              </tr>
            </thead>
            <tbody>
              {habits.map((habit) => (
                <tr key={habit._id}>
                  <td className="border px-4 py-2">{habit.name}</td>
                  <td className="border px-4 py-2">{habit.category}</td>
                  <td className="border px-4 py-2">{habit.xpValue}</td>
                  <td className="border px-4 py-2">{habit.frequency}</td>
                  <td className="border px-4 py-2">{habit.isActive ? "Yes" : "No"}</td>
                </tr>
              ))}
              {habits.length === 0 && (
                <tr>
                  <td colSpan={5} className="text-center py-6 text-gray-400">No habits found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Modal for Add New Habit */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md relative">
              <button
                className="absolute top-2 right-3 text-2xl text-gray-400 hover:text-red-500"
                onClick={() => setShowModal(false)}
              >
                &times;
              </button>
              <h2 className="text-xl font-bold mb-4 text-purple-800">Add New Habit</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Habit</label>
                  <select
                    name="habit"
                    value={form.habit}
                    onChange={handleChange}
                    className="w-full mt-1 px-3 py-2 border rounded"
                    required
                  >
                    <option value="" disabled>Select a habit</option>
                    {HABIT_OPTIONS.map((h) => (
                      <option key={h} value={h}>{h}</option>
                    ))}
                  </select>
                  {isOtherHabit && (
                    <input
                      type="text"
                      name="customHabit"
                      value={form.customHabit}
                      onChange={handleChange}
                      className="w-full mt-2 px-3 py-2 border rounded"
                      placeholder="Enter custom habit"
                      required
                    />
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Habit Category</label>
                  <select
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                    className="w-full mt-1 px-3 py-2 border rounded"
                    required
                  >
                    <option value="" disabled>Select a category</option>
                    {CATEGORY_OPTIONS.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">XP Value</label>
                  <input
                    type="number"
                    name="xp"
                    value={form.xp}
                    onChange={handleChange}
                    className="w-full mt-1 px-3 py-2 border rounded"
                    required
                    min="0"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
                  disabled={loading}
                >
                  {loading ? "Adding..." : "Add Habit"}
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HabbitManagement;
