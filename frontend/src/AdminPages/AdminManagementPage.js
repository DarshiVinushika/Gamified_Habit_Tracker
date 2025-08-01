import React, { useEffect, useState } from "react";
import AdminSidebar from "./AdminSidebar";
import axios from "axios";
import { Link } from "react-router-dom";

function AdminManagementPage() {
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const token = localStorage.getItem("token"); // Assumes token is stored on login
        const res = await axios.get("http://localhost:8080/api/users", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Filter only admins
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

  return (
    <div className="flex">
      <AdminSidebar />
      <div className="p-6 flex-1">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-indigo-800">Admin Management</h1>
          <Link
            to="/register"
            className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition"
          >
            Add New Admin
          </Link>
        </div>

        {loading ? (
          <p>Loading admins...</p>
        ) : admins.length === 0 ? (
          <p>No admin users found.</p>
        ) : (
          <table className="w-full table-auto border border-gray-300">
            <thead className="bg-indigo-100">
              <tr>
                <th className="px-4 py-2 border">Name</th>
                <th className="px-4 py-2 border">Email</th>
                <th className="px-4 py-2 border">Role</th>
              </tr>
            </thead>
            <tbody>
              {admins.map((admin) => (
                <tr key={admin._id} className="text-center hover:bg-gray-50">
                  <td className="px-4 py-2 border">{admin.name}</td>
                  <td className="px-4 py-2 border">{admin.email}</td>
                  <td className="px-4 py-2 border capitalize">{admin.role}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default AdminManagementPage;
