const mongoose = require("mongoose");
const { eventNames } = require("./user");

const notesschema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  todo: {
    type: String,
    required: true,
  },
  priority: {
    type: String,
    enum: ["High", "Medium", "Low"],
    default: "Low",
  },
});

module.exports = mongoose.model("note", notesschema);
