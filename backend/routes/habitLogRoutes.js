const express = require("express");
const router = express.Router();
const habitLogController = require("../controllers/habitLogController");

router.post("/log", habitLogController.logHabit);

module.exports = router;
