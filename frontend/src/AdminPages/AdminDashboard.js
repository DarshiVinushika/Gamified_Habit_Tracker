import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminSidebar from "./AdminSidebar";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Legend,
} from "recharts";

// Purple-themed colors
const COLORS = ["#7e22ce", "#9333ea", "#a855f7", "#c084fc"];

function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [userStats, setUserStats] = useState([]);
  const [topUsers, setTopUsers] = useState([]);
  const [roleCounts, setRoleCounts] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:8080/api/users", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const allUsers = res.data.users;
        setUsers(allUsers);

        // Top XP users
        const sortedByXP = [...allUsers]
          .filter((u) => u.xp)
          .sort((a, b) => b.xp - a.xp)
          .slice(0, 5);
        setTopUsers(sortedByXP);

        // Monthly registration stats
        const stats = {};
        allUsers.forEach((user) => {
          const month = new Date(user.createdAt).toLocaleString("default", {
            month: "short",
          });
          stats[month] = (stats[month] || 0) + 1;
        });
        const chartData = Object.keys(stats).map((month) => ({
          month,
          users: stats[month],
        }));
        setUserStats(chartData);

        // Role counts
        const roleCounter = { admin: 0, intern: 0, user: 0 };
        allUsers.forEach((u) => {
          if (u.role in roleCounter) {
            roleCounter[u.role]++;
          }
        });
        setRoleCounts(roleCounter);
      } catch (err) {
        console.error("Failed to load dashboard data", err);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-100" style={{ backgroundColor: "#E6E6FA" }}>
      <AdminSidebar />
      <main className="flex-1 p-8">
        <h1 className="text-3xl font-bold text-purple-900 mb-6">Admin Dashboard</h1>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-sm font-medium text-gray-500">Total Users</h2>
            <p className="text-2xl font-bold text-purple-800">{users.length}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-sm font-medium text-gray-500">Admins</h2>
            <p className="text-2xl font-bold text-purple-800">{roleCounts.admin || 0}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-sm font-medium text-gray-500">Interns</h2>
            <p className="text-2xl font-bold text-purple-800">{roleCounts.intern || 0}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-sm font-medium text-gray-500">Regular Users</h2>
            <p className="text-2xl font-bold text-purple-800">{roleCounts.user || 0}</p>
          </div>
        </div>

        {/* Graphs Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
          {/* Bar Chart */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-purple-800 mb-4">Monthly User Registrations</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={userStats}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="users" fill="#9333ea" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Pie Chart */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-purple-800 mb-4">User Role Distribution</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  dataKey="value"
                  data={[
                    { name: "Admins", value: roleCounts.admin || 0 },
                    { name: "Interns", value: roleCounts.intern || 0 },
                    { name: "Users", value: roleCounts.user || 0 },
                  ]}
                  cx="50%"
                  cy="50%"
                  outerRadius={90}
                  label
                >
                  {COLORS.map((color, index) => (
                    <Cell key={`cell-${index}`} fill={color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Top Users Table */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-purple-800 mb-4">Top 5 Users by XP</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-gray-700">
              <thead>
                <tr className="bg-purple-100 text-left">
                  <th className="px-4 py-2">Name</th>
                  <th className="px-4 py-2">Email</th>
                  <th className="px-4 py-2">XP</th>
                </tr>
              </thead>
              <tbody>
                {topUsers.map((user) => (
                  <tr key={user._id} className="border-t">
                    <td className="px-4 py-2">{user.name}</td>
                    <td className="px-4 py-2">{user.email}</td>
                    <td className="px-4 py-2">{user.xp || 0}</td>
                  </tr>
                ))}
                {topUsers.length === 0 && (
                  <tr>
                    <td colSpan="3" className="text-center py-4 text-gray-400">
                      No XP data available.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-12">
        </div>
      </main>
    </div>
  );
}

export default AdminDashboard;
