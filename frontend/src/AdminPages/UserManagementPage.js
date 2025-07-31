import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminSidebar from "./AdminSidebar";
import Footer from "../Components/Footer";

const UserManagementPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("Not authenticated");

        const res = await axios.get("http://localhost:8080/api/users", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setUsers(res.data.users || res.data);
      } catch (err) {
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) return <div className="p-8">Loading users...</div>;
  if (error) return <div className="p-8 text-red-600">Error: {error}</div>;

  return (
    <div className="flex flex-col min-h-screen" style={{ backgroundColor: "#E6E6FA" }}>
      <div className="flex flex-1">
        <AdminSidebar />
        <main className="flex-1 p-8">
          <h1 className="text-3xl font-bold text-purple-900 mb-6">User Management</h1>

          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border rounded-lg shadow">
              <thead className="bg-purple-100">
                <tr>
                  <th className="border px-4 py-2 text-left">Name</th>
                  <th className="border px-4 py-2 text-left">Email</th>
                  <th className="border px-4 py-2 text-left">Role</th>
                  <th className="border px-4 py-2 text-left">XP</th>
                  <th className="border px-4 py-2 text-left">Level</th>
                  <th className="border px-4 py-2 text-left">Streak</th>
                  <th className="border px-4 py-2 text-left">Status</th>
                </tr>
              </thead>
              <tbody>
                {users.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="text-center py-6 text-gray-400">
                      No users found.
                    </td>
                  </tr>
                ) : (
                  users.map((user) => (
                    <tr key={user._id} className="hover:bg-gray-50 transition">
                      <td className="border px-4 py-2">{user.name || "N/A"}</td>
                      <td className="border px-4 py-2">{user.email || "N/A"}</td>
                      <td className="border px-4 py-2 capitalize">{user.role || "user"}</td>
                      <td className="border px-4 py-2">{user.xp ?? 0}</td>
                      <td className="border px-4 py-2">{user.level ?? "N/A"}</td>
                      <td className="border px-4 py-2">{user.streak ?? 0}</td>
                      <td className="border px-4 py-2">
                        {user.isActive ? (
                          <span className="text-green-600 font-semibold">Active</span>
                        ) : (
                          <span className="text-red-600 font-semibold">Inactive</span>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default UserManagementPage;
