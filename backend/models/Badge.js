const mongoose = require('mongoose');

const badgeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  criteria: {
    type: String,
    required: true, // e.g., "streak >= 7"
  },
  icon: {
    type: String, // You can store a URL, emoji, or icon filename
    required: true,
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Badge', badgeSchema);