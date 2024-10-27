const mongoose = require("mongoose");

const alarmSchema = new mongoose.Schema(
  {
    time: { type: Date },
    timeFormat: { type: String },
    part: { type: String },
    day: { type: [String], default: [] },
    duration: { type: Number },
    alert: { type: Boolean, default: false },
    startNotifyId: {type:String},
    endNotifyId: {type:String},
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
    image:{
      type: String,
    },
    alarm: [alarmSchema],
  },
  { versionKey: false }
);

module.exports = mongoose.model("User", userSchema);
