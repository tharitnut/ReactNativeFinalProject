const mongoose = require("mongoose");

const alarmSchema = new mongoose.Schema(
  {
    time: { type: String },
    alert: { type: Boolean, default: false },
    part: { type: String },
    day: { type: [String], default: [] },
    duration: { type: Number },
  },
  { _id: false }
);

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    alarm: [alarmSchema],
    bodyPart: {
      type: [String],
      default: [],
    },
  },
  { versionKey: false }
);

module.exports = mongoose.model("User", userSchema);
