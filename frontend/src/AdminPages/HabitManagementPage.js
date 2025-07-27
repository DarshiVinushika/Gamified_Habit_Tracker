import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminSidebar from "./AdminSidebar";

const CATEGORY_LABELS = {
  work: "Work & Task",
  learning: "Learning & Growth",
  collaboration: "Collaboration",
  discipline: "Personal Discipline",
  challenge: "Challenge-Based",
};

const HabitManagementPage = () => {
  const [habits, setHabits] = useState([]);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    name: "",
    category: "work",
    xpValue: 10,
    frequency: "daily",
    isActive: true,
  });
  const [editId, setEditId] = useState(null);

  // Fetch habits from backend
  useEffect(() => {
    axios.get("http://localhost:8080/api/habits")
      .then(res => setHabits(res.data))
      .catch(err => console.error(err));
  }, []);

  // Filter habits by search
  const filteredHabits = habits.filter(habit =>
    habit.name.toLowerCase().includes(search.toLowerCase()) ||
    CATEGORY_LABELS[habit.category].toLowerCase().includes(search.toLowerCase())
  );

  // Handle form input
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle form submit (add or edit)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        // Edit habit
        const res = await axios.put(`http://localhost:8080/api/habits/${editId}`, form);
        setHabits(habits.map(h => h._id === editId ? res.data : h));
      } else {
        // Add habit
        const res = await axios.post("http://localhost:8080/api/habits", form);
        setHabits([...habits, res.data]);
      }
      setShowModal(false);
      setForm({
        name: "",
        category: "work",
        xpValue: 10,
        frequency: "daily",
        isActive: true,
      });
      setEditId(null);
    } catch (err) {
      alert(err.response?.data?.error || "Failed to save habit");
    }
  };

  // Delete habit
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this habit?")) {
      try {
        await axios.delete(`http://localhost:8080/api/habits/${id}`);
        setHabits(habits.filter(h => h._id !== id));
      } catch {
        alert("Delete failed");
      }
    }
  };

  // Edit habit: open modal and fill form
  const handleEdit = (habit) => {
    setForm({
      name: habit.name,
      category: habit.category,
      xpValue: habit.xpValue,
      frequency: habit.frequency,
      isActive: habit.isActive,
    });
    setEditId(habit._id);
    setShowModal(true);
  };

  return (
    <div className="flex min-h-screen bg-gray-100" style={{ backgroundColor: "#E6E6FA" }}>
      <AdminSidebar />
      <div className="flex-1 p-8">
        <h1 className="text-3xl font-bold text-purple-900 mb-6">Habits Management</h1>
        <div className="flex justify-between items-center mb-4">
          <input
            className="border px-3 py-2 rounded w-80"
            placeholder="Search by habit or category"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <button
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            onClick={() => { setShowModal(true); setEditId(null); setForm({ name: "", category: "work", xpValue: 10, frequency: "daily", isActive: true }); }}
          >
            <span className="mr-2">➕</span> New Habit
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border">
            <thead>
              <tr className="bg-purple-100">
                <th className="border px-4 py-2">Habit</th>
                <th className="border px-4 py-2">Habit Category</th>
                <th className="border px-4 py-2">XP Value</th>
                <th className="border px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredHabits.map(habit => (
                <tr key={habit._id}>
                  <td className="border px-4 py-2">{habit.name}</td>
                  <td className="border px-4 py-2">{CATEGORY_LABELS[habit.category]}</td>
                  <td className="border px-4 py-2">+{habit.xpValue} XP</td>
                  <td className="border px-4 py-2">
                    <button
                      className="text-green-600 mr-2 hover:underline"
                      onClick={() => handleEdit(habit)}
                    >✏️</button>
                    <button
                      className="text-red-600 hover:underline"
                      onClick={() => handleDelete(habit._id)}
                    >🗑️</button>
                  </td>
                </tr>
              ))}
              {filteredHabits.length === 0 && (
                <tr>
                  <td colSpan={4} className="text-center py-6 text-gray-400">No habits found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Modal for add/edit habit */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md relative">
              <button
                className="absolute top-2 right-3 text-2xl text-gray-400 hover:text-red-500"
                onClick={() => { setShowModal(false); setEditId(null); }}
              >
                &times;
              </button>
              <h2 className="text-xl font-bold mb-4 text-purple-800">{editId ? "Edit Habit" : "Add New Habit"}</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Habit Name</label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    className="w-full mt-1 px-3 py-2 border rounded"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Category</label>
                  <select
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                    className="w-full mt-1 px-3 py-2 border rounded"
                    required
                  >
                    {Object.entries(CATEGORY_LABELS).map(([key, label]) => (
                      <option key={key} value={key}>{label}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">XP Value</label>
                  <input
                    type="number"
                    name="xpValue"
                    value={form.xpValue}
                    onChange={handleChange}
                    className="w-full mt-1 px-3 py-2 border rounded"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Frequency</label>
                  <select
                    name="frequency"
                    value={form.frequency}
                    onChange={handleChange}
                    className="w-full mt-1 px-3 py-2 border rounded"
                    required
                  >
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                  </select>
                </div>
                <button
                  type="submit"
                  className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
                >
                  {editId ? "Save Changes" : "Add Habit"}
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HabitManagementPage;