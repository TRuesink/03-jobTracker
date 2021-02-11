const mongoose = require("mongoose");

const { Schema } = mongoose;

const meetingSchema = new Schema({
  topic: { type: String, required: true },
  meetingDate: { type: Date, required: true },
  notes: { type: String, required: false },
  contact: {
    type: mongoose.Schema.ObjectId,
    ref: "Contact",
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const meetingClass = mongoose.model("Meeting", meetingSchema);

module.exports = meetingClass;
