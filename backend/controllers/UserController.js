const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Register
exports.registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check for existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "Email already exists" });

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    // Create user
    const newUser = new User({ name, email, passwordHash });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully", userId: newUser._id });
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
      if (!user) return res.status(400).json({ message: "Invalid email or password" });
  
      // Compare password
      const isMatch = await bcrypt.compare(password, user.passwordHash);
      if (!isMatch) return res.status(400).json({ message: "Invalid email or password" });
  
      // Generate JWT
      const token = jwt.sign(
        {
          userId: user._id,
          role: user.role
        },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
      );
  
      res.status(200).json({
        message: "Login successful",      
        userId: user._id,
        name: user.name,
        role: user.role,
        token
      });
      
    } catch (err) {
      res.status(500).json({ message: "Server error", error: err.message });
    }
  };

  // Get all users
exports.getAllUsers = async (req, res) => {
    try {
      const users = await User.find().select("_id name email role xp level streak createdAt");
  
      res.status(200).json({
        message: "Users fetched successfully",
        count: users.length,
        users
      });
    } catch (err) {
      res.status(500).json({ message: "Server error", error: err.message });
    }
  };

  // Get a user by ID
exports.getUserById = async (req, res) => {
    try {
      const userId = req.params.id;
  
      const user = await User.findById(userId).select("_id name email role xp level streak createdAt");
  
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      res.status(200).json({
        message: "User fetched successfully",
        user
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
  
      res.status(200).json({ message: "User updated successfully", name: user.name, userId: user._id });
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
  
