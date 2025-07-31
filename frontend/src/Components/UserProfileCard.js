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
    return <div className="text-center p-4 text-blue-200 font-semibold">Loading profile...</div>;
  }

  if (!user && !loadingUser) {
    return null; // Not logged in or failed to fetch user
  }

  if (error) {
    return <div className="text-center text-red-400 p-4 font-semibold">Error: {error}</div>;
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
      <div className="flex items-center bg-gradient-to-br from-blue-950 to-purple-950 rounded-2xl shadow-2xl p-6 mb-6 border-l-4 border-purple-400 max-w-xl mx-auto transition-all duration-300 hover:shadow-[0_0_15px_rgba(124,58,237,0.7)]">
        <img
          src={avatarUrl}
          alt={user.name || "User avatar"}
          className="w-20 h-20 rounded-full object-cover border-4 border-purple-600/50 shadow-[0_0_10px_rgba(124,58,237,0.5)] mr-4"
        />
        <div className="flex-1">
          <div className="flex items-center mb-4">
            <span className="text-3xl mr-3 text-purple-300 drop-shadow-[0_0_5px_rgba(124,58,237,0.8)]">⭐</span>
            <span className="font-extrabold text-2xl text-blue-200 tracking-wide uppercase drop-shadow-[0_0_3px_rgba(59,130,246,0.5)]">Level Progress</span>
          </div>
          <div className="flex items-center mb-2">
            <div className="flex-1 bg-gray-900/80 rounded-full h-3 mr-2 shadow-[0_0_5px_rgba(124,58,237,0.3)]">
              <div
                className="bg-purple-500 h-3 rounded-full transition-all duration-300 shadow-[0_0_5px_rgba(124,58,237,0.5)]"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <span className="font-bold text-blue-200 text-lg drop-shadow-[0_0_2px_rgba(59,130,246,0.3)]">Level {level}</span>
          </div>
          <div className="text-sm text-gray-400 mb-2">
            <span>{totalXp}/{xpNeededForCurrentLevel} XP</span>
          </div>
          <div className="text-lg font-semibold text-blue-200 drop-shadow-[0_0_2px_rgba(59,130,246,0.3)]">{user.name || "No name"}</div>
          <div className="text-sm text-gray-400">Today is {todayDate}</div>
        </div>
        <div className="flex flex-col items-center ml-4 space-y-4">
          <div className="bg-purple-500/20 rounded-xl px-4 py-2 flex flex-col items-center shadow-[0_0_5px_rgba(124,58,237,0.4)] border border-purple-400/50">
            <span className="text-3xl">🔥</span>
            <span className="text-xl font-bold text-purple-200">{user.streak || 0}</span>
            <span className="text-xs text-purple-200">days streak!</span>
          </div>
          <div className="bg-purple-500/20 rounded-xl px-4 py-2 flex flex-col items-center shadow-[0_0_5px_rgba(124,58,237,0.4)] border border-purple-400/50">
            <span className="text-xl font-bold text-purple-200">+{totalXp}⚡</span>
            <span className="text-xs text-purple-200 text-center">
              Total XP
              <br />
              Keep it up!
            </span>
          </div>
        </div>
      </div>

      {leveledUp && (
       <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
      <div className="relative bg-gradient-to-br from-purple-900 to-blue-900 rounded-2xl p-8 shadow-[0_0_20px_rgba(124,58,237,1)] border-4 border-purple-400/70 animate-[pulse_1.5s_ease-in-out_infinite] max-w-md mx-auto">
        {/* Spark effect corners */}
        <div className="absolute -top-2 -left-2 w-4 h-4 bg-purple-300 rounded-full animate-[sparkle_2s_ease-in-out_infinite]" />
        <div className="absolute -top-2 -right-2 w-4 h-4 bg-purple-300 rounded-full animate-[sparkle_2.2s_ease-in-out_infinite]" />
        <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-purple-300 rounded-full animate-[sparkle_2.4s_ease-in-out_infinite]" />
        <div className="absolute -bottom-2 -right-2 w-4 h-4 bg-purple-300 rounded-full animate-[sparkle_2.6s_ease-in-out_infinite]" />

        {/* Content */}
        <div className="flex flex-col items-center text-center">
          <span className="text-4xl mb-2 animate-[bounce_1s_ease-in-out_infinite]">
            🎉
          </span>
          <h2 className="text-3xl font-extrabold text-blue-200 tracking-wide uppercase drop-shadow-[0_0_5px_rgba(59,130,246,0.8)]">
            Level Up!
          </h2>
          <div className="mt-2 bg-purple-500/20 px-4 py-1 rounded-full text-lg font-bold text-purple-200 shadow-[0_0_5px_rgba(124,58,237,0.4)] border border-purple-400/50">
            Level {level}
          </div>
          <p className="text-lg text-purple-200 mt-2 font-semibold drop-shadow-[0_0_3px_rgba(124,58,237,0.5)]">
            You've reached a new level! Keep dominating!
          </p>
        </div>

        {/* Neon glow effect */}
        <div className="absolute inset-0 rounded-2xl border border-purple-500/50 shadow-[0_0_15px_rgba(124,58,237,0.7)] pointer-events-none" />

        {/* Tailwind animation keyframes */}
        <style jsx>{`
          @keyframes pulse {
            0%, 100% {
              transform: scale(1);
              opacity: 1;
            }
            50% {
              transform: scale(1.05);
              opacity: 0.9;
            }
          }
          @keyframes sparkle {
            0%, 100% {
              transform: scale(1);
              opacity: 0.8;
            }
            50% {
              transform: scale(1.3);
              opacity: 1;
            }
          }
        `}</style>
      </div>
    </div>
      )}
    </div>
  );
};

export default UserProfileCard;