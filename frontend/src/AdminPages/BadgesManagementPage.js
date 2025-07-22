import React, { useEffect, useState } from "react";
import axios from "axios";

const BadgesManagementPage = () => {
  const [badges, setBadges] = useState([]);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    name: "",
    description: "",
    criteria: "",
    icon: "",
  });
  const [loading, setLoading] = useState(false);
  const [editId, setEditId] = useState(null); // Track editing badge

  // Fetch badges from backend
  useEffect(() => {
    axios.get("http://localhost:8080/api/badges")
      .then(res => setBadges(res.data))
      .catch(err => console.error(err));
  }, []);

  // Delete badge
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this badge?")) {
      axios.delete(`http://localhost:8080/api/badges/${id}`)
        .then(() => setBadges(badges.filter(b => b._id !== id)))
        .catch(err => alert("Delete failed"));
    }
  };

  // Edit badge: open modal and fill form
  const handleEdit = (badge) => {
    setForm({
      name: badge.name,
      description: badge.description,
      criteria: badge.criteria,
      icon: badge.icon,
    });
    setEditId(badge._id);
    setShowModal(true);
  };

  // Filter badges by search
  const filteredBadges = badges.filter(badge =>
    badge.name.toLowerCase().includes(search.toLowerCase())
  );

  // Handle form input
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle form submit (add or edit)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (editId) {
        // Edit badge
        const res = await axios.put(`http://localhost:8080/api/badges/${editId}`, form);
        setBadges(badges.map(b => b._id === editId ? res.data : b));
      } else {
        // Add badge
        const res = await axios.post("http://localhost:8080/api/badges", form);
        setBadges([...badges, res.data]);
      }
      setShowModal(false);
      setForm({ name: "", description: "", criteria: "", icon: "" });
      setEditId(null);
    } catch (err) {
      alert(err.response?.data?.error || "Failed to save badge");
    }
    setLoading(false);
  };

  // Modal title
  const modalTitle = editId ? "Edit Badge" : "Add New Badge";

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-purple-900 ">Badges Management</h1>
        <button
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          onClick={() => { setShowModal(true); setEditId(null); setForm({ name: "", description: "", criteria: "", icon: "" }); }}
        >
          <span className="mr-2">➕</span> New Badge
        </button>
      </div>
      <div className="mb-4">
        <input
          className="border px-3 py-2 rounded w-80"
          placeholder="Search by name"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border">
          <thead>
            <tr className="bg-purple-100">
              <th className="border px-4 py-2">Badge icon</th>
              <th className="border px-4 py-2">Badge name</th>
              <th className="border px-4 py-2">Badge description</th>
              <th className="border px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredBadges.map(badge => (
              <tr key={badge._id}>
                <td className="border px-4 py-2 text-2xl">{badge.icon}</td>
                <td className="border px-4 py-2">{badge.name}</td>
                <td className="border px-4 py-2">{badge.description}</td>
                <td className="border px-4 py-2">
                  <button
                    className="text-green-600 mr-2 hover:underline"
                    onClick={() => handleEdit(badge)}
                  >✏️</button>
                  <button
                    className="text-red-600 hover:underline"
                    onClick={() => handleDelete(badge._id)}
                  >🗑️</button>
                </td>
              </tr>
            ))}
            {filteredBadges.length === 0 && (
              <tr>
                <td colSpan={4} className="text-center py-6 text-gray-400">No badges found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal for add/edit badge */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md relative">
            <button
              className="absolute top-2 right-3 text-2xl text-gray-400 hover:text-red-500"
              onClick={() => { setShowModal(false); setEditId(null); }}
            >
              &times;
            </button>
            <h2 className="text-xl font-bold mb-4 text-purple-800">{modalTitle}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Badge Name</label>
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
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <input
                  type="text"
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  className="w-full mt-1 px-3 py-2 border rounded"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Criteria</label>
                <input
                  type="text"
                  name="criteria"
                  value={form.criteria}
                  onChange={handleChange}
                  className="w-full mt-1 px-3 py-2 border rounded"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Icon (emoji or URL)</label>
                <input
                  type="text"
                  name="icon"
                  value={form.icon}
                  onChange={handleChange}
                  className="w-full mt-1 px-3 py-2 border rounded"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
                disabled={loading}
              >
                {loading ? (editId ? "Saving..." : "Adding...") : (editId ? "Save Changes" : "Add Badge")}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default BadgesManagementPage;