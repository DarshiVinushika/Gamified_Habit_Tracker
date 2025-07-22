const Badge = require('../models/Badge');

// Create a new badge
exports.createBadge = async (req, res) => {
  try {
    const badge = new Badge(req.body);
    await badge.save();
    res.status(201).json(badge);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all badges
exports.getBadges = async (req, res) => {
  try {
    const badges = await Badge.find();
    res.json(badges);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a single badge by ID
exports.getBadge = async (req, res) => {
  try {
    const badge = await Badge.findById(req.params.id);
    if (!badge) return res.status(404).json({ error: 'Badge not found' });
    res.json(badge);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a badge
exports.updateBadge = async (req, res) => {
  try {
    const badge = await Badge.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!badge) return res.status(404).json({ error: 'Badge not found' });
    res.json(badge);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete a badge
exports.deleteBadge = async (req, res) => {
  try {
    const badge = await Badge.findByIdAndDelete(req.params.id);
    if (!badge) return res.status(404).json({ error: 'Badge not found' });
    res.json({ message: 'Badge deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
