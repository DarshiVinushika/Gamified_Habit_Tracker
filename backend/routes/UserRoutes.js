const express = require("express");
const router = express.Router();
const { registerUser, loginUser, getAllUsers, updateUser, deleteUser, getUserById } = require("../controllers/UserController");

// Register Route
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/", getAllUsers);
router.get("/:id", getUserById);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);


module.exports = router;