const mongoose = require('mongoose');
const dotenv = require('dotenv');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ MongoDB connected');
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error.message);
    process.exit(1); // stop the server
  }
};

module.exports = connectDB;
