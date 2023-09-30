const mongoose = require("mongoose");

const resourceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter name"],
    trim: true,
  },

  description: {
    type: String,
    required: [true, "Please enter description"],
  },

  link: {
    type: String,
    required: [true, "Please enter link"],
  },

  images: [
    {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],

  category: {
    type: String,
    required: [true, "Please enter topic"],
  },

  user: {
    type: String,
    ref: "User",
    requireed: true,
  },

  userID: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    requireed: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Resource", resourceSchema);