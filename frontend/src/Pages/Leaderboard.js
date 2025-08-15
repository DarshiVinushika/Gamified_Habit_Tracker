import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaMedal } from "react-icons/fa";
import Navbar from "../Components/Navbar";

const Leaderboard = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [filterType, setFilterType] = useState("xp");

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const res = await axios.get("http://localhost:8080/api/users/leaderboard", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setUsers(res.data.users);
        setFilteredUsers(sortUsers(res.data.users, "xp")); // default sort
      } catch (error) {
        console.error("Error fetching leaderboard:", error);
      }
    };

    fetchLeaderboard();
  }, []);

  const sortUsers = (userList, type) => {
    if (type === "xp") {
      return [...userList].sort((a, b) => b.xp - a.xp);
    } else if (type === "streak") {
      return [...userList].sort((a, b) => b.streak - a.streak);
    }
    return userList;
  };

  const handleFilterChange = (e) => {
    const selectedFilter = e.target.value;
    setFilterType(selectedFilter);
    setFilteredUsers(sortUsers(users, selectedFilter));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#e0c4ff] via-[#8a2be2] to-[#8a2be2] text-white font-sans">
      <div className="flex-1 p-6">
        <Navbar title="🏆 Leaderboard" />

        <div className="flex justify-end w-[80%] mx-auto ml-60 mt-6">
          <select
            value={filterType}
            onChange={handleFilterChange}
            className="bg-[#1e0033] border border-purple-600 text-white rounded-lg px-4 py-2 shadow-lg"
          >
            <option value="xp">Filter by XP</option>
            <option value="streak">Filter by Streak</option>
          </select>
        </div>

        <div className="bg-[#1e0033] text-white rounded-2xl mt-4 p-6 shadow-2xl border border-purple-800 w-[80%] mx-auto ml-60">
          <h2 className="text-3xl font-bold text-center font-extrabold text-2xl text-blue-200 tracking-wide uppercase drop-shadow-[0_0_3px_rgba(59,130,246,0.5)]">
            👾 Top Users
          </h2>
          <table className="w-full text-center mt-4">
            <thead>
              <tr className="text-lg text-purple-300 border-b border-purple-700 pb-2">
                <th className="py-2">Rank</th>
                <th className="py-2">Player</th>
                <th className="py-2">⚡ XP</th>
                <th className="py-2">💜 Level</th>
                <th className="py-2">🐦‍🔥 Streak</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user, idx) => (
                <tr
                  key={idx}
                  className={`border-b border-purple-800 hover:bg-purple-800/40 transition duration-200 ${
                    idx === 0 ? "text-yellow-300" : idx === 1 ? "text-gray-300" : idx === 2 ? "text-orange-400" : ""
                  }`}
                >
                  <td className="py-3 font-semibold">
                    {idx + 1}{" "}
                    {idx === 0 && <FaMedal className="inline ml-2 text-yellow-300" />}
                    {idx === 1 && <FaMedal className="inline ml-2 text-gray-300" />}
                    {idx === 2 && <FaMedal className="inline ml-2 text-orange-400" />}
                  </td>
                  <td className="py-3">{user.name}</td>
                  <td className="py-3">{user.xp}</td>
                  <td className="py-3">{user.level}</td>
                  <td className="py-3">{user.streak}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
