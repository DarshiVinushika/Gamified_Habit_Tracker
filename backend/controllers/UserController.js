const User = require("../models/User");
const Habit = require("../models/Habit");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// Google Login
exports.googleLogin = async (req, res) => {
  try {
    const { credential } = req.body; // Google ID token from frontend
    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    const { email, sub: googleId, name, picture } = payload;

    // Check if user exists
    let user = await User.findOne({ email });
    if (!user) {
      // Create new user if they don't exist
      user = new User({
        name,
        email,
        googleId,
        authSource: "google",
        profilePic: picture,
        role: "intern", // Default role
      });
      await user.save();
    } else if (user.authSource !== "google") {
      // Prevent email conflicts with email/password users
      return res.status(400).json({ message: "Email already registered with email/password login" });
    }

    // Generate JWT
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(200).json({
      message: "Google login successful",
      userId: user._id,
      name: user.name,
      role: user.role,
      token,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Register
exports.registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "Email already exists" });

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);
    const profilePic = req.file ? req.file.filename : "";

    const newUser = new User({
      name,
      email,
      passwordHash,
      role: role === "admin" ? "admin" : "intern", 
      profilePic,
    });

    await newUser.save();

    res
      .status(201)
      .json({ message: "User registered successfully", userId: newUser._id });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Login
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ message: "Invalid email or password" });

    // Compare password
    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid email or password" });

    // Generate JWT
    const token = jwt.sign(
      {
        userId: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(200).json({
      message: "Login successful",
      userId: user._id,
      name: user.name,
      role: user.role,
      token,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select(
      "_id name email role xp level streak createdAt"
    );

    res.status(200).json({
      message: "Users fetched successfully",
      count: users.length,
      users,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Get a user by ID
exports.getUserById = async (req, res) => {
  try {
    const userId = req.params.id;

    const user = await User.findById(userId).select(
      "_id name email role xp level streak createdAt"
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (req.user.userId !== userId && req.user.role !== "admin") {
      return res
        .status(403)
        .json({
          message: "Access denied. You can only view your own profile.",
        });
    }

    res.status(200).json({
      message: "User fetched successfully",
      user,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Update user profile
exports.updateUser = async (req, res) => {
  try {
    const { name, password } = req.body;
    const userId = req.params.id;

    if (req.user.userId !== userId && req.user.role !== "admin") {
      return res
        .status(403)
        .json({
          message: "Access denied. You can only update your own profile.",
        });
    }

    // Find user
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Update fields
    if (name) user.name = name;
    if (password) {
      const salt = await bcrypt.genSalt(10);
      user.passwordHash = await bcrypt.hash(password, salt);
    }

    await user.save();

    res
      .status(200)
      .json({
        message: "User updated successfully",
        name: user.name,
        userId: user._id,
      });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Delete a user
exports.deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;

    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully", userId });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Get Current User
// Controller: getCurrentUser
exports.getCurrentUser = async (req, res) => {
  try {
    if (!req.user || !req.user.userId) {
      return res.status(401).json({ message: "Unauthorized: user info missing" });
    }

    const user = await User.findById(req.user.userId).select(
      "_id name email role xp level streak profilePic"
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ user });
  } catch (err) {
    console.error("Error in getCurrentUser:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};``


// Uploads profile picture
exports.uploadProfilePic = async (req, res) => {
  try {
    const userId = req.user.userId;
    const file = req.file;

    if (!file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Delete old profile picture if it exists
    if (user.profilePic) {
      const oldPicPath = path.join(__dirname, "..", "uploads", user.profilePic);
      if (fs.existsSync(oldPicPath)) {
        fs.unlinkSync(oldPicPath); // delete file
      }
    }

    // Save new profile pic filename
    user.profilePic = file.filename;
    await user.save();

    res.status(200).json({
      message: "Profile picture uploaded successfully",
      filename: file.filename,
      url: `/uploads/${file.filename}`,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};


exports.addXpToUser = async (req, res) => {
  try {
    const { xp } = req.body;
    const userId = req.user.userId;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.xp += xp;
    await user.save();

    res.status(200).json({ message: "XP added", newXp: user.xp });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Get user's completed habits
exports.getCompletedHabits = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).populate("completedHabits", "name xpValue");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json({ completedHabits: user.completedHabits });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Update user's completed habits (add or remove one habit)
exports.updateCompletedHabits = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { habitId, completed } = req.body;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const habit = await Habit.findById(habitId);
    if (!habit) return res.status(404).json({ message: "Habit not found" });

    const isCompletedAlready = user.completedHabits.some(
      (id) => id.toString() === habitId
    );

    if (completed && !isCompletedAlready) {
      user.completedHabits.push(habitId);
      user.xp += habit.xpValue;
    } else if (!completed && isCompletedAlready) {
      user.completedHabits = user.completedHabits.filter(
        (id) => id.toString() !== habitId
      );
      user.xp = Math.max(0, user.xp - habit.xpValue);
    }

    await user.save();

    res.status(200).json({
      message: `Habit ${completed ? "added" : "removed"} successfully`,
      newXp: user.xp,
      completedHabits: user.completedHabits,
    });
  } catch (err) {
    console.error("Error updating completed habits:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};


// Get Logged-in Intern Details Only
exports.getLoggedInInternDetails = async (req, res) => {
  try {
    // Check if user is authenticated
    if (!req.user || !req.user.userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // Fetch user from DB
    const user = await User.findById(req.user.userId).select(
      "_id name email role xp level streak profilePic"
    );

    // Check role
    if (!user || user.role !== "intern") {
      return res.status(403).json({ message: "Access denied: Not an intern" });
    }

    res.status(200).json({
      message: "Intern details fetched successfully",
      intern: user,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};


exports.updateXpAndLevel = async (req, res) => {
  try {
    const { streakChange } = req.body;

    const user = await User.findById(req.user.userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Only update streak (if needed)
    if (streakChange) {
      user.streak = (user.streak || 0) + streakChange;
    }

    // LEVEL CALCULATION BASED ON TOTAL XP ONLY (no XP change here)
    const totalXp = user.xp || 0;
    const baseXp = 100;
    let level = 1;
    let xpNeeded = 0;

    while (totalXp >= xpNeeded + level * baseXp) {
      xpNeeded += level * baseXp;
      level++;
    }

    user.level = level;

    await user.save();

    return res.status(200).json({
      message: "Level and streak updated",
      xp: user.xp,
      level: user.level,
      streak: user.streak,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};


exports.recalculateLevel = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId);

    if (!user) return res.status(404).json({ message: "User not found" });

    let xp = user.xp || 0;
    let level = 1;
    let xpForPreviousLevels = 0;
    let xpNeededForLevel = level * 100;

    while (xp >= xpForPreviousLevels + xpNeededForLevel) {
      xpForPreviousLevels += xpNeededForLevel;
      level++;
      xpNeededForLevel = level * 100;
    }

    if (user.level !== level) {
      user.level = level;
      await user.save();
    }

    return res.status(200).json({ message: "Level updated", level });
  } catch (error) {
    console.error("Level recalculation failed:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

// Controller to get leaderboard users in descending order by xp
exports.getLeaderboard = async (req, res) => {
  try {
    const users = await User.find()
      .select("name xp level streak badges")
      .lean(); // Use lean for faster response

    const sortedUsers = users
      .map(user => ({
        ...user,
        badgeCount: user.badges?.length || 0,
      }))
      .sort((a, b) => b.xp - a.xp); // Sort by xp descending

    res.status(200).json({ users: sortedUsers });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
