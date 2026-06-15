import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

let db = null;

export async function connectDB() {
  try {
    if (!db) {
      db = await mongoose.connect(
        process.env.DBURL
      );

      console.log(
        "✅ MongoDB Connected Successfully"
      );
    }

    return db;
  } catch (error) {
    console.log(
      "❌ MongoDB Error:",
      error.message
    );

    process.exit(1);
  }
}