import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      match: [
        /^[A-Za-z0-9._%+-]+@gmail\.com$/,
        "Email must be a valid @gmail.com address",
      ],
      lowercase: true,  
      trim:true,
    },

    password: {
      type: String,
      required: true,
      select: false,
      length: { min: 5 },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User",userSchema);
