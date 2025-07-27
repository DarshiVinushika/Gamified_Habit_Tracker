const express = require("express");
const router = express.Router();
const habitController = require("../controllers/habitController");

// GET all habits
router.get("/", habitController.getHabits);

// POST add habit
router.post("/", habitController.addHabit);

// PUT edit habit
router.put("/:id", habitController.editHabit);

// DELETE habit
router.delete("/:id", habitController.deleteHabit);

module.exports = router;