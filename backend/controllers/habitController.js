const Habit = require("../models/Habit");

// Get all habits
exports.getHabits = async (req, res) => {
  try {
    const habits = await Habit.find();
    res.json(habits);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch habits" });
  }
};

// Add a new habit
exports.addHabit = async (req, res) => {
  try {
    const { name, category, xpValue, frequency, isActive } = req.body;
    const habit = new Habit({ name, category, xpValue, frequency, isActive });
    await habit.save();
    res.status(201).json(habit);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Edit habit
exports.editHabit = async (req, res) => {
  try {
    const { name, category, xpValue, frequency, isActive } = req.body;
    const habit = await Habit.findByIdAndUpdate(
      req.params.id,
      { name, category, xpValue, frequency, isActive },
      { new: true }
    );
    if (!habit) return res.status(404).json({ error: "Habit not found" });
    res.json(habit);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete habit
exports.deleteHabit = async (req, res) => {
  try {
    const habit = await Habit.findByIdAndDelete(req.params.id);
    if (!habit) return res.status(404).json({ error: "Habit not found" });
    res.json({ message: "Habit deleted" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete habit" });
  }
};