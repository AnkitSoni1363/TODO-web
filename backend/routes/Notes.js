const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const Note = require("../models/note");
const { body, validationResult } = require("express-validator");

// fetch all notes of user
router.get("/fetchtodos", fetchuser, async (req, res) => {
  try {
    const userId = req.user;
    const notes = await Note.find({ user: userId });
    if (notes.length === 0) {
      return res.status(200).json({ notes: [], msg: "no todos found" });
    }
    const priorityOrder = {
      High: 1,
      Medium: 2,
      Low: 3,
    };
    notes.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
    res.status(200).json({ notes: notes });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "internal server error" });
  }
});

router.post(
  "/addtodo",
  fetchuser,
  [body("todo").isLength({ min: 3 })],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const user = req.user;
      const { todo, priority } = req.body;
      const addtodo = new Note({
        todo: todo,
        priority: priority,
        user: user,
      });
      await addtodo.save();
      res.json(addtodo);
    } catch (error) {
      return res.status(500).json({ msg: "internal server error" });
    }
  }
);

router.delete("/deletetodo/:id", fetchuser, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const user = req.user;
    const noteId = req.params.id;
    const notes = await Note.findOneAndDelete({ _id: noteId, user: user });

    if (!notes) {
      return res.status(404).json({ msg: "Note not found" });
    }
    await Note.findByIdAndDelete(noteId);
    res.status(200).json({ msg: "Note deleted successfully" });
  } catch (error) {
    return res.status(500).json({ msg: "internal server error" });
  }
});

router.get("/search", fetchuser, async (req, res) => {
  try {
    // Access the query parameter 'text'
    const text = req.query.text;

    if (!text || text.length <= 0) {
      return res.status(404).json({ msg: "Enter at least 1 character" });
    }

    const user = req.user;

    // Perform a case-insensitive search using a regular expression
    const notes = await Note.find({
      user: user,
      todo: { $regex: text, $options: "i" }, // 'i' makes it case-insensitive
    });

    if (notes.length === 0) {
      return res.status(404).json({ msg: "No todos found" });
    }

    return res.status(200).json(notes);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ msg: "Internal server error" });
  }
});

module.exports = router;
