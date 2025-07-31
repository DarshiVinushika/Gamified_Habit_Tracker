const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  getAllUsers,
  updateUser,
  deleteUser,
  getUserById,
  getCurrentUser,
  uploadProfilePic,
  googleLogin,
  addXpToUser,
  getCompletedHabits,
  updateCompletedHabits,
  getLoggedInInternDetails,
  updateXpAndLevel,
  recalculateLevel,
  getLeaderboard
} = require("../controllers/UserController");

const { authMiddleware, requireRole } = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware"); 

router.get("/leaderboard", getLeaderboard);
// Public routes
router.post("/register", upload.single("profilePic"), registerUser);
router.post("/login", loginUser);

// Google login route
router.post("/google", googleLogin);

// Admin-only routes
router.get("/", authMiddleware, requireRole("admin"), getAllUsers);
router.delete("/:id", authMiddleware, requireRole("admin"), deleteUser);

// Authenticated user routes
router.get("/:id", authMiddleware, getUserById);
router.put("/:id", authMiddleware, updateUser);
router.get("/me", authMiddleware, getCurrentUser);

// Upload profile picture
router.post(
  "/upload-profile-pic",
  authMiddleware,
  upload.single("profilePic"),
  uploadProfilePic
);

// Add XP (authenticated user)
router.post("/add-xp", authMiddleware, addXpToUser);

router.get("/me/completed-habits", authMiddleware, getCompletedHabits);
router.post("/me/completed-habits", authMiddleware, updateCompletedHabits);
router.get("/me/intern",  authMiddleware, getLoggedInInternDetails);
router.patch("/me/xp-level", authMiddleware, updateXpAndLevel);
router.put("/me/recalculate-level", authMiddleware, recalculateLevel);


module.exports = router;
