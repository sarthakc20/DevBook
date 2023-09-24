const mongoose = require("mongoose");

const communitySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter name"],
    trim: true,
  },

  description: {
    type: String,
    required: [true, "Please enter description"],
  },

  image: [
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

  topic: {
    type: String,
    required: [true, "Please enter topic"],
  },

  numOfComments: {
    type: Number,
    default: 0,
  },

  comments: [
    {
      user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        requireed: true,
      },
      name: {
        type: String,
        required: true,
      },
      comment: {
        type: String,
        required: true,
      },
    },
  ],

  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    requireed: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Community", communitySchema);