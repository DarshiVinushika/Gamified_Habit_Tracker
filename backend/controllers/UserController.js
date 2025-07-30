const User = require("../models/User");
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
exports.getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select(
      "_id name email role xp level streak"
    );
    res.status(200).json({ user });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

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
