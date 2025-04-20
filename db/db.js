import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();
const connectToDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB connected successfully");
  } catch (err) {
    console.log("MongoDB connection failed\n", err.message);
    process.exit(1);
  }
};

export default connectToDB();
