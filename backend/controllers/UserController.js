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


// Get user's completed habits with dates
exports.getCompletedHabits = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).populate("completedHabits.habit", "name xpValue");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json({ completedHabits: user.completedHabits });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Function to recalculate and update user streak based on current completedHabits in DB
exports.recalculateUserStreak = async (req, res) => {
  try {
    const userId = req.user.userId;
    const user = await User.findById(userId);
    
    if (!user) return res.status(404).json({ message: "User not found" });

    // Calculate streak based on current completedHabits array in DB
    const calculatedStreak = calculateStreakFromDates(user.completedHabits);
    
    // Store old streak for comparison
    const oldStreak = user.streak;
    
    // Update streak in database
    user.streak = calculatedStreak;
    await user.save();

    res.status(200).json({
      message: "Streak recalculated and updated successfully",
      oldStreak: oldStreak,
      newStreak: calculatedStreak,
      streakChanged: oldStreak !== calculatedStreak
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Function to fix streak for all users (admin function)
exports.recalculateAllUsersStreaks = async (req, res) => {
  try {
    const users = await User.find({});
    let updatedCount = 0;
    
    for (let user of users) {
      const calculatedStreak = calculateStreakFromDates(user.completedHabits);
      
      if (user.streak !== calculatedStreak) {
        user.streak = calculatedStreak;
        await user.save();
        updatedCount++;
      }
    }

    res.status(200).json({
      message: "All user streaks recalculated",
      totalUsers: users.length,
      updatedUsers: updatedCount
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Debug function to check streak calculation (remove in production)
exports.debugStreak = async (req, res) => {
  try {
    const userId = req.user.userId;
    const user = await User.findById(userId);
    
    if (!user) return res.status(404).json({ message: "User not found" });

    // Get unique dates from completedHabits
    const uniqueDates = [...new Set(
      user.completedHabits.map(entry => {
        const date = new Date(entry.date);
        return date.toISOString().split('T')[0];
      })
    )].sort((a, b) => new Date(b) - new Date(a));

    const calculatedStreak = calculateStreakFromDates(user.completedHabits);
    
    const today = new Date().toISOString().split('T')[0];

    res.status(200).json({
      currentStreak: user.streak,
      calculatedStreak: calculatedStreak,
      uniqueCompletionDates: uniqueDates,
      totalCompletions: user.completedHabits.length,
      today: today,
      mostRecentCompletion: uniqueDates[0] || null,
      daysSinceLastCompletion: uniqueDates.length > 0 ? 
        Math.floor((new Date(today) - new Date(uniqueDates[0])) / (1000 * 60 * 60 * 24)) : null
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Helper function to get current user streak (always recalculates from DB)
exports.getUserStreak = async (req, res) => {
  try {
    const userId = req.user.userId;
    const user = await User.findById(userId);
    
    if (!user) return res.status(404).json({ message: "User not found" });

    // Always recalculate streak from current completedHabits in DB
    const calculatedStreak = calculateStreakFromDates(user.completedHabits);
    
    // Update user's streak in database if it's different
    if (user.streak !== calculatedStreak) {
      user.streak = calculatedStreak;
      await user.save();
    }

    res.status(200).json({ 
      streak: calculatedStreak,
      wasUpdated: user.streak !== calculatedStreak 
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Update user's completed habits (add or remove one habit with date)
exports.updateCompletedHabits = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { habitId, completed, date } = req.body;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const habit = await Habit.findById(habitId);
    if (!habit) return res.status(404).json({ message: "Habit not found" });

    // Use provided date or current date if not provided
    const completionDate = date ? new Date(date) : new Date();
    
    // Check if this specific habit is already completed on this date
    const isCompletedAlready = user.completedHabits.some(
      (entry) => 
        entry.habit.toString() === habitId && 
        entry.date.toDateString() === completionDate.toDateString()
    );

    if (completed && !isCompletedAlready) {
      // Add new habit completion with date
      user.completedHabits.push({
        habit: habitId,
        date: completionDate
      });
      user.xp += habit.xpValue;
    } else if (!completed && isCompletedAlready) {
      // Remove habit completion for the specific date
      user.completedHabits = user.completedHabits.filter(
        (entry) => !(
          entry.habit.toString() === habitId && 
          entry.date.toDateString() === completionDate.toDateString()
        )
      );
      user.xp = Math.max(0, user.xp - habit.xpValue);
    }

    // Calculate and update streak based on unique completion dates
    user.streak = calculateStreakFromDates(user.completedHabits);

    await user.save();

    res.status(200).json({
      message: `Habit ${completed ? "added" : "removed"} successfully`,
      newXp: user.xp,
      streak: user.streak,
      completedHabits: user.completedHabits,
    });
  } catch (err) {
    console.error("Error updating completed habits:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Additional helper function to get habits completed on a specific date
exports.getHabitsForDate = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { date } = req.params; // Expected format: YYYY-MM-DD
    
    const targetDate = new Date(date);
    const user = await User.findById(userId).populate("completedHabits.habit", "name xpValue");
    
    if (!user) return res.status(404).json({ message: "User not found" });

    // Filter habits completed on the specific date
    const habitsForDate = user.completedHabits.filter(
      (entry) => entry.date.toDateString() === targetDate.toDateString()
    );

    res.status(200).json({ 
      date: targetDate,
      completedHabits: habitsForDate 
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Helper function to calculate streak from completion dates
const calculateStreakFromDates = (completedHabits) => {
  if (!completedHabits || completedHabits.length === 0) {
    return 0;
  }

  // Get unique dates only (multiple habits on same day = 1 day)
  const uniqueDateStrings = [...new Set(
    completedHabits.map(entry => {
      const date = new Date(entry.date);
      // Convert to local date string to avoid timezone issues
      return date.toISOString().split('T')[0]; // YYYY-MM-DD format
    })
  )];

  if (uniqueDateStrings.length === 0) {
    return 0;
  }

  // Sort dates (newest first)
  const sortedDates = uniqueDateStrings.sort((a, b) => new Date(b) - new Date(a));

  const today = new Date();
  const todayString = today.toISOString().split('T')[0];
  
  const mostRecentDateString = sortedDates[0];
  const mostRecentDate = new Date(mostRecentDateString);
  const todayDate = new Date(todayString);

  // Calculate days difference
  const daysDifference = Math.floor((todayDate - mostRecentDate) / (1000 * 60 * 60 * 24));
  
  // If more than 1 day has passed since last completion, streak is broken
  if (daysDifference > 1) {
    return 0;
  }

  let streak = 1; // Start with 1 since we have at least one completion date
  
  // Check consecutive days backwards from the most recent date
  for (let i = 1; i < sortedDates.length; i++) {
    const currentDate = new Date(sortedDates[i]);
    const previousDate = new Date(sortedDates[i - 1]);
    
    // Calculate difference between consecutive dates
    const dayGap = Math.floor((previousDate - currentDate) / (1000 * 60 * 60 * 24));
    
    if (dayGap === 1) {
      // Consecutive day found
      streak++;
    } else {
      // Gap found - break the streak
      break;
    }
  }

  return streak;
};

// Helper function to get habit completion streak for a specific habit
exports.getHabitStreak = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { habitId } = req.params;
    
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Get all completions for this specific habit
    const habitCompletions = user.completedHabits
      .filter(entry => entry.habit.toString() === habitId);

    const streak = calculateStreakFromDates(habitCompletions);

    res.status(200).json({ streak });
  } catch (err) {
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

// Get logged-in user's completed habits count
exports.getCompletedHabitsCount = async (req, res) => {
  try {
    const userId = req.user.userId; // from auth middleware

    const user = await User.findById(userId).select("completedHabits");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const count = user.completedHabits.length;

    res.status(200).json({
      message: "Completed habits count fetched successfully",
      count,
      completedHabits: user.completedHabits // optional: send full array
    });
  } catch (err) {
    console.error("Error fetching completed habits count:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

