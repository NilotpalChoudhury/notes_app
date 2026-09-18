const express = require("express");
const router = express.Router();
const Note = require("../models/Note");

// POST /api/notes -> create a new note
router.post("/", async (req, res) => {
  try {
    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(400).json({ message: "Title and content are required." });
    }

    const newNote = new Note({ title, content });
    const savedNote = await newNote.save();

    res.status(201).json(savedNote);
  } catch (error) {
    console.error("Error creating note:", error.message);
    res.status(500).json({ message: "Server error while creating note." });
  }
});

// GET /api/notes -> fetch all notes, newest first
router.get("/", async (req, res) => {
  try {
    const notes = await Note.find().sort({ createdAt: -1 });
    res.status(200).json(notes);
  } catch (error) {
    console.error("Error fetching notes:", error.message);
    res.status(500).json({ message: "Server error while fetching notes." });
  }
});

// DELETE /api/notes/:id -> delete a note by its Mongo _id
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedNote = await Note.findByIdAndDelete(id);

    if (!deletedNote) {
      return res.status(404).json({ message: "Note not found." });
    }

    res.status(200).json({ message: "Note deleted successfully.", deletedNote });
  } catch (error) {
    console.error("Error deleting note:", error.message);
    res.status(500).json({ message: "Server error while deleting note." });
  }
});

module.exports = router;
