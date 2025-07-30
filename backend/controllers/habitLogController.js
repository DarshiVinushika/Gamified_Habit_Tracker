const HabitLog = require("../models/HabitLog");
const updateStreak = require("../services/updateStreak");

// Log or update habit completion
exports.logHabit = async (req, res) => {
  try {
    const { userId, habitId, date, completed, notes } = req.body;

    // Find existing log for that user, habit, and date
    let habitLog = await HabitLog.findOne({ userId, habitId, date });
    if (habitLog) {
      habitLog.completed = completed;
      habitLog.notes = notes || habitLog.notes;
    } else {
      habitLog = new HabitLog({ userId, habitId, date, completed, notes });
    }

    await habitLog.save();

    // Update streak after saving log
    await updateStreak(userId, date);

    res.status(200).json({ message: "Habit logged successfully", habitLog });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
