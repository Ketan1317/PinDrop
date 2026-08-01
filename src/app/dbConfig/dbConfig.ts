import mongoose from "mongoose";

let isConnected = false; 

export default async function connect() {
  if (isConnected) {
    console.log("MongoDB already connected");
    return;
  }

  if (!process.env.MONGO_DB_URL) {
    console.error("MONGO_DB_URL is not defined in environment variables.");
    process.exit(1);
  }

  try {
    console.log("🔄 Connecting to MongoDB...");
    console.log(process.env.MONGO_DB_URL);

    await mongoose.connect(process.env.MONGO_DB_URL!, {
      bufferCommands: false,
    });

    const connection = mongoose.connection;

    connection.on("connected", () => {
      isConnected = true;
      console.log("MongoDB connected successfully");
    });

    connection.on("error", (err:unknown) => {
      console.error("MongoDB connection error:", err);
      process.exit(1);
    });
  } catch (error) {
    console.error("Connection failed:", error);
    process.exit(1);
  }
}
