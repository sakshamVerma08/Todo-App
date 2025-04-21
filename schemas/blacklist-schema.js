import mongoose from "mongoose";

const blacklistSchema = new mongoose.Schema({
  token: {
    type: String,
    required: true,
    unique: true,
  },

  blacklistedAt: {
    type: Date,
    default: Date.now,
  },

  expiresAt: {
    type: Date,
    default: 24 * 60 * 60 * 1000,
  },
});

export default mongoose.model("Blacklist", blacklistSchema);
