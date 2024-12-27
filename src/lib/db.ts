import mongoose from "mongoose";
export const mongoConnection = process.env.MONGODB_URL;

let isConnected = false;
async function connectToMongoDb() {
  if (isConnected) return;
  try {
    await mongoose.connect(mongoConnection || "");
    isConnected = true;
    // console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB", error);
    throw new Error("Could not connect to MongoDB");
  }

  mongoose.connection.setMaxListeners(20);

  mongoose.connection.on("disconnected", () => {
    // console.log("MongoDB connection lost");
    isConnected = false;
  });

  mongoose.connection.on("error", (err) => {
    console.error("MongoDB connection error:", err);
    isConnected = false;
  });
}

export { connectToMongoDb };
