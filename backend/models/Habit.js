const mongoose = require("mongoose");

const habitSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: {
    type: String,
    enum: ["work", "learning", "collaboration", "discipline", "challenge"],
    required: true
  },
  xpValue: { type: Number, required: true },
  frequency: { type: String, enum: ["daily", "weekly"], required: true },
  isActive: { type: Boolean, default: true }
});

module.exports = mongoose.model("Habit", habitSchema);
