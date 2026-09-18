const mongoose = require("mongoose");

// Prefers MONGODB_URI from .env (e.g. a MongoDB Atlas connection string).
const MONGO_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/notes_db";

function connectDB() {
  mongoose
    .connect(MONGO_URI)
    .then(() => {
      console.log("MongoDB connected successfully!");
    })
    .catch((error) => {
      console.error("MongoDB connection failed:", error.message);
      process.exit(1);
    });
}

module.exports = connectDB;
