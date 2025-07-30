import React from "react";
import { useUser } from "./UserContext";

function formatDateWithSuffix(dateObj) {
  const day = dateObj.getDate();
  const month = dateObj.toLocaleString("en-GB", { month: "long" });
  const year = dateObj.getFullYear();

  const j = day % 10,
    k = day % 100;
  let suffix = "th";
  if (j === 1 && k !== 11) suffix = "st";
  else if (j === 2 && k !== 12) suffix = "nd";
  else if (j === 3 && k !== 13) suffix = "rd";

  return `${day.toString().padStart(2, "0")}${suffix} of ${month}, ${year}`;
}

const UserProfileCard = () => {
  const { user, loadingUser, error, leveledUp } = useUser();

  // ✅ Prevent rendering too early
  if (!user && loadingUser) {
    return <div className="text-center p-4">Loading profile...</div>;
  }

  if (!user && !loadingUser) {
    return null; // Not logged in or failed to fetch user
  }

  if (error) {
    return <div className="text-center text-red-600 p-4">Error: {error}</div>;
  }

  const todayDate = formatDateWithSuffix(new Date());
  const totalXp = user.xp || 0;
  const baseXpPerLevel = 100;

  // Compute current level based on cumulative XP
  let level = 1;
  let totalXpRequiredForPreviousLevels = 0;
  let xpNeededForCurrentLevel = level * baseXpPerLevel;

  while (totalXp >= totalXpRequiredForPreviousLevels + xpNeededForCurrentLevel) {
    totalXpRequiredForPreviousLevels += xpNeededForCurrentLevel;
    level++;
    xpNeededForCurrentLevel = level * baseXpPerLevel;
  }

  const xpInCurrentLevel = totalXp - totalXpRequiredForPreviousLevels;
  const progressPercent = Math.min(100, (xpInCurrentLevel / xpNeededForCurrentLevel) * 100);

  const API_URL = process.env.REACT_APP_API_URL || "";
  const avatarUrl = user.profilePic
    ? `${API_URL}/uploads/${user.profilePic}`
    : "https://via.placeholder.com/80";

  return (
    <div className="relative">
      <div className="flex items-center bg-white bg-opacity-80 rounded-2xl shadow-lg p-4 mb-6 border-2 border-purple-300 max-w-xl mx-auto">
        <img
          src={avatarUrl}
          alt={user.name || "User avatar"}
          className="w-20 h-20 rounded-full object-cover border-4 border-white shadow mr-4"
        />
        <div className="flex-1">
          <div className="flex items-center mb-2">
            <span className="text-yellow-500 text-lg mr-2">⭐</span>
            <span className="font-semibold">Level Progress</span>
          </div>
          <div className="flex items-center mb-1">
            <div className="flex-1 bg-gray-200 rounded-full h-2 mr-2">
              <div
                className="bg-blue-400 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <span className="font-bold text-gray-700 ml-2">Level {level}</span>
          </div>
          <div className="flex justify-between text-xs text-gray-600 mb-2">
            <span>{totalXp}/{xpNeededForCurrentLevel} XP</span>
          </div>
          <div className="text-sm text-gray-700 font-semibold">{user.name || "No name"}</div>
          <div className="text-xs text-gray-500">Today is {todayDate}</div>
        </div>
        <div className="flex flex-col items-center ml-4">
          <div className="bg-gradient-to-r from-orange-200 to-orange-400 rounded-xl px-4 py-2 mb-2 flex flex-col items-center shadow">
            <span className="text-3xl">🔥</span>
            <span className="text-xl font-bold text-orange-700">{user.streak || 0}</span>
            <span className="text-xs text-orange-700">days streak!</span>
          </div>
          <div className="bg-gradient-to-r from-yellow-200 to-yellow-400 rounded-xl px-4 py-2 flex flex-col items-center shadow">
            <span className="text-xl font-bold text-yellow-700">+{totalXp}⚡</span>
            <span className="text-xs text-yellow-700 text-center">
              Total XP
              <br />
              Keep it up!
            </span>
          </div>
        </div>
      </div>

      {leveledUp && (
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 mt-[-20px] bg-purple-600 text-white font-bold px-4 py-2 rounded-xl shadow-xl animate-bounce z-10">
          🎉 Level Up!
        </div>
      )}
    </div>
  );
};

export default UserProfileCard;
