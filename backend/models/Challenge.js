const mongoose = require("mongoose");

const challengeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  goal: { type: String, required: true }, // e.g. "Complete 5 habits in 7 days"
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  participants: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  rewardXP: { type: Number, default: 0 }
});

module.exports = mongoose.model("Challenge", challengeSchema);
