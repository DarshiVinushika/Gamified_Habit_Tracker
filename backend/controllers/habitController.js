const Habit = require("../models/Habit");

// Create a new habit
exports.createHabit = async (req, res) => {
  try {
    const { name, category, xpValue, frequency = "daily", isActive = true } = req.body;
    const habit = new Habit({ name, category, xpValue, frequency, isActive });
    await habit.save();
    res.status(201).json(habit);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all habits
exports.getHabits = async (req, res) => {
  try {
    const habits = await Habit.find();
    res.json(habits);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
