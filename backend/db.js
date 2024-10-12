const mongoose = require("mongoose");
require("dotenv").config(); // Ensure environment variables are loaded

const url = process.env.MONGO_URI;

const db = async () => {
  try {
    await mongoose.connect(url);
    console.log("Database connected successfully to atlas");
  } catch (error) {
    console.error("Database connection error:", error);
    process.exit(1); // Exit the process with failure
  }
};

module.exports = db;
