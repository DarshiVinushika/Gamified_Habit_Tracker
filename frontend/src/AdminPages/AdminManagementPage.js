import React, { useEffect, useState } from "react";
import AdminSidebar from "./AdminSidebar";
import axios from "axios";
import { Link } from "react-router-dom";

function AdminManagementPage() {
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:8080/api/users", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const adminUsers = res.data.users.filter((user) => user.role === "admin");
        setAdmins(adminUsers);
      } catch (err) {
        console.error("Error fetching admins:", err.response?.data || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAdmins();
  }, []);

  const filteredAdmins = admins.filter(
    (admin) =>
      admin.name.toLowerCase().includes(search.toLowerCase()) ||
      admin.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex min-h-screen bg-gray-100" style={{ backgroundColor: "#E6E6FA" }}>
      <AdminSidebar />
      <div className="flex-1 p-8">
        <h1 className="text-3xl font-bold text-purple-900 mb-6">Admin Management</h1>

        <div className="flex justify-between items-center mb-4">
          <input
            className="border px-3 py-2 rounded w-80"
            placeholder="Search by name or email"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Link
            to="/register"
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            <span className="mr-2">➕</span> Add New Admin
          </Link>
        </div>

        {loading ? (
          <p>Loading admins...</p>
        ) : filteredAdmins.length === 0 ? (
          <p className="text-gray-500 text-center mt-6">No admin users found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border">
              <thead className="bg-purple-100">
                <tr>
                  <th className="border px-4 py-2">Name</th>
                  <th className="border px-4 py-2">Email</th>
                  <th className="border px-4 py-2">Role</th>
                </tr>
              </thead>
              <tbody>
                {filteredAdmins.map((admin) => (
                  <tr key={admin._id} className="text-center hover:bg-gray-50">
                    <td className="border px-4 py-2">{admin.name}</td>
                    <td className="border px-4 py-2">{admin.email}</td>
                    <td className="border px-4 py-2 capitalize">{admin.role}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminManagementPage;
