const User = require("../models/User");
const HabitLog = require("../models/HabitLog");
const Habit = require("../models/Habit");

async function updateStreak(userId, date) {
  // Find all active habits
  const activeHabits = await Habit.find({ isActive: true });

  // Find habit logs for this user & date where completed=true and habit is active
  const logs = await HabitLog.find({
    userId,
    date,
    completed: true,
    habitId: { $in: activeHabits.map(h => h._id) },
  });

  // Check if user completed all active habits for the date
  if (logs.length === activeHabits.length) {
    const user = await User.findById(userId);
    const yesterday = new Date(date);
    yesterday.setDate(yesterday.getDate() - 1);

    const lastStreakDate = user.lastStreakDate ? new Date(user.lastStreakDate) : null;

    if (lastStreakDate && lastStreakDate.toDateString() === yesterday.toDateString()) {
      user.streak = (user.streak || 0) + 1;  // Continue streak
    } else {
      user.streak = 1; // New streak starts
    }

    user.lastStreakDate = date;
    await user.save();

  } else {
    // Reset streak if not all habits done
    await User.findByIdAndUpdate(userId, { streak: 0, lastStreakDate: null });
  }
}

module.exports = updateStreak;