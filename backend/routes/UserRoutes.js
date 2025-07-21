const express = require("express");
const router = express.Router();
const { registerUser, loginUser, getAllUsers, updateUser, deleteUser, getUserById, getCurrentUser } = require("../controllers/UserController");
const { authMiddleware, requireRole } = require("../middleware/authMiddleware");

// Public routes
router.post("/register", registerUser);
router.post("/login", loginUser);

// Admin-only routes
router.get("/", authMiddleware, requireRole("admin"), getAllUsers);
router.delete("/:id", authMiddleware, requireRole("admin"), deleteUser);

// Protected for all authenticated users
router.get("/:id", authMiddleware, getUserById);
router.put("/:id", authMiddleware, updateUser);
router.get("/me", authMiddleware, getCurrentUser);



module.exports = router;