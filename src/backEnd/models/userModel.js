const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      min: 6,
      max: 255,
    },
    role: {
      type: String,
      default: "REGISTEREDUSER",
      enum: ["ADMIN", "MODERATOR", "REGISTEREDUSER"],
    },
    email: {
      type: String,
      required: true,
      min: 6,
      max: 255,
    },
    password: {
      type: String,
      required: true,
      min: 6,
      max: 1024,
    },
    generatedSudoku: {
      type: Object,
    },
    userSudokuData: {
      type: Object,
    },
    sudokuSolution: {
      type: Object,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("User", userSchema);
