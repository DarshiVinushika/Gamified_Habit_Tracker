const express = require("express");
const router = express.Router();
const { registerUser, loginUser, getAllUsers, updateUser, deleteUser } = require("../controllers/UserController");

// Register Route
router.post("/register", registerUser);
router.post("/login", loginUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);
router.get("/", getAllUsers);

module.exports = router;