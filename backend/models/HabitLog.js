const mongoose = require("mongoose");

const habitLogSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  habitId: { type: mongoose.Schema.Types.ObjectId, ref: "Habit", required: true },
  date: { type: Date, required: true },
  completed: { type: Boolean, default: false },
  xpEarned: { type: Number, default: 0 },
  notes: { type: String }
});

module.exports = mongoose.model("HabitLog", habitLogSchema);
