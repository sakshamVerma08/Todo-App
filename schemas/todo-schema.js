import mongoose from "mongoose";

const todoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
    },

    priority: {
      type: String,
      enum: ["low", "medium", "high", "ASAP"],
      default: "low",
      required: true,
    },

    status: {
      type: String,
      enum: ["pending", "in-progress", "completed"],
      default: "in-progress",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Todo", todoSchema);
