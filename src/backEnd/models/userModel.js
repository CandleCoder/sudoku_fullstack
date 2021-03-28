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
    password: {
      type: String,
      required: true,
      min: 6,
      max: 1024,
      select: false
    },
    generatedSudoku: {
      type: Object,
    },
    userSudokuData: {
      type: Object,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("User", userSchema);
