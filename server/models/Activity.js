const mongoose = require("mongoose");

const { Schema } = mongoose;

const activitySchema = new Schema({
  description: { type: String, required: true },
  contact: {
    type: mongoose.Schema.ObjectId,
    ref: "Contact",
    required: false,
  },
  opportunity: {
    type: mongoose.Schema.ObjectId,
    ref: "Opportunity",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const activityClass = mongoose.model("Activity", activitySchema);

module.exports = activityClass;
