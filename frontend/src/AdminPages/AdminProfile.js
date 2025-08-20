import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminProfile = () => {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAdmin = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("Not authenticated. Please log in.");

        const res = await axios.get("http://localhost:8080/api/users/me", {
          headers: { Authorization: `Bearer ${token}` },
        });

        // Ensure role is admin
        if (res.data.user.role !== "admin") {
          throw new Error("Access denied: Not an admin");
        }

        setAdmin(res.data.user);
      } catch (err) {
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAdmin();
  }, []);

  if (loading)
    return <div className="p-8 text-center text-lg">Loading profile...</div>;

  if (error)
    return (
      <div className="p-8 text-red-600 text-center text-lg">
        Error: {error}
      </div>
    );

  return (
    <div className="flex justify-center mt-12">
      <div className="bg-white rounded-lg shadow p-8 w-full max-w-md">
        <div className="flex flex-col items-center">
          {admin.profilePic ? (
            <img
              src={`http://localhost:8080/uploads/${admin.profilePic}`}
              alt="Profile"
              className="w-32 h-32 rounded-full object-cover mb-4"
            />
          ) : (
            <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 mb-4">
              No Image
            </div>
          )}
          <h2 className="text-2xl font-bold mb-2">{admin.name}</h2>
          <p className="text-gray-700 mb-1">
            <strong>Email:</strong> {admin.email}
          </p>
          <p className="text-gray-700 mb-1">
            <strong>Role:</strong> {admin.role}
          </p>
          <p className="text-gray-700 mb-1">
            <strong>XP:</strong> {admin.xp ?? 0}
          </p>
          <p className="text-gray-700 mb-1">
            <strong>Level:</strong> {admin.level ?? 1}
          </p>
          <p className="text-gray-700 mb-1">
            <strong>Streak:</strong> {admin.streak ?? 0}
          </p>
          <p className="text-gray-500 text-sm mt-2">
            Account Created: {new Date(admin.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
