const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: false }, 
  role: { type: String, enum: ["intern", "admin"], default: "intern" },
  profilePic: { type: String, default: "" },
  googleId: { type: String, unique: true, sparse: true }, 
  authSource: { type: String, enum: ["email", "google"], default: "email" },
  xp: { type: Number, default: 0 },
  completedHabits: [{
  habit: { type: mongoose.Schema.Types.ObjectId, ref: "Habit" },
  date: { type: Date, required: true }
}],

  level: { type: Number, default: 1 },
  streak: { type: Number, default: 0 },
  badges: [{ type: mongoose.Schema.Types.ObjectId, ref: "Badge" }],
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("User", userSchema);