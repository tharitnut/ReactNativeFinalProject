const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    user_id: {
      type: String,
      required: true,
      unique: true,
    },
    alram: {
      type: String,
    },
    chestRecord: {
      duration: Number,
      cal: Number,
    },
    backRecord: {
      duration: Number,
      cal: Number,
    },
    armsRecord: {
      duration: Number,
      cal: Number,
    },
    abdominalRecord: {
      duration: Number,
      cal: Number,
    },
    legsRecord: {
      duration: Number,
      cal: Number,
    },
    shoulderRecord: {
      duration: Number,
      cal: Number,
    },
  },
  { versionKey: false }
);

module.exports = mongoose.model("users", userSchema);
