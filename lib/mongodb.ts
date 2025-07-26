import mongoose from "mongoose";
const { MONGODB_URI } = process.env;

export const connectDB = async () => {
  try {
    const { connection } = await mongoose.connect(MONGODB_URI as string);
    if (connection.readyState === 1) {
      console.log("Connected to MongoDB Database");
      return Promise.resolve(true);
    }
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
    return Promise.reject(error);
  }
};
