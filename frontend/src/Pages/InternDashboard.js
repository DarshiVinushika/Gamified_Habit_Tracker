import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';

function InternDashboard() {
  const [intern, setIntern] = useState(null);

  useEffect(() => {
    const fetchInternData = async () => {
      try {
        const res = await axios.get("http://localhost:8080/api/users/profile", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setIntern(res.data.user);
      } catch (err) {
        console.error("Failed to fetch intern data", err);
      }
    };

    fetchInternData();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#e0c4ff] via-[#8a2be2] to-[#8a2be2] text-white font-sans">
      <Navbar />
      <main className="flex-grow flex flex-col items-center px-6 py-10 md:ml-64">
        <h1 className="text-4xl font-extrabold text-blue-200 tracking-wide uppercase mb-6 drop-shadow-[0_0_3px_rgba(59,130,246,0.5)]">
          🌟 Welcome Intern!
        </h1>

        {/* Intern Card */}
        <div className="bg-[#1e0033] w-full max-w-4xl rounded-2xl shadow-2xl border border-purple-800 p-6 mb-10">
          {intern ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h2 className="text-xl text-purple-300 mb-1">Name</h2>
                <p className="text-lg font-semibold">{intern.name}</p>
              </div>
              <div>
                <h2 className="text-xl text-purple-300 mb-1">Email</h2>
                <p className="text-lg font-semibold">{intern.email}</p>
              </div>
              <div>
                <h2 className="text-xl text-purple-300 mb-1">XP</h2>
                <p className="text-lg font-semibold">{intern.xp || 0}</p>
              </div>
              <div>
                <h2 className="text-xl text-purple-300 mb-1">Level</h2>
                <p className="text-lg font-semibold">{intern.level || 1}</p>
              </div>
            </div>
          ) : (
            <p className="text-gray-300">Loading your data...</p>
          )}
        </div>

        {/* Progress & Stats */}
        <div className="bg-[#1e0033] w-full max-w-4xl rounded-2xl shadow-2xl border border-purple-800 p-6">
          <h2 className="text-2xl text-blue-200 font-bold mb-4">📈 Your Progress</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-purple-900/20 p-4 rounded-lg">
              <p className="text-lg">🗓️ Active Days</p>
              <p className="text-3xl font-bold text-green-300 mt-2">{intern?.activeDays || 0}</p>
            </div>
            <div className="bg-purple-900/20 p-4 rounded-lg">
              <p className="text-lg">✅ Completed Tasks</p>
              <p className="text-3xl font-bold text-green-300 mt-2">{intern?.completedTasks || 0}</p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default InternDashboard;
