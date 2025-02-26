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
    type: String,
    ref: "User",
    requireed: true,
  },

  userID: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    requireed: true,
  },

  userAvatar: {
    public_id: {
      type: String,
      required: true,
      ref: "User",
    },
    url: {
      type: String,
      required: true,
      ref: "User",
    },
  },

  clicks: { type: Number, default: 0 },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Community", communitySchema);
