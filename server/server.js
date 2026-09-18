require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const noteRoutes = require("./routes/noteRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors()); // Permits cross-origin requests from http://localhost:5173
app.use(express.json());

// Routes
app.use("/api/notes", noteRoutes);

// Simple health check route
app.get("/", (req, res) => {
  res.send("Notes API is running.");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
