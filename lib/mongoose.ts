import mongoose from "mongoose";

let isConnected = false; // track connection

export const connectToDb = async () => {
  if (isConnected) {
    console.log(
      "---------------------\nMONGODB already connected\n---------------------"
    );
    return;
  }

  if (mongoose.connections.length > 0) {
    const connection = mongoose.connections[0];
    if (connection.readyState === 1) {
      console.log(
        "---------------------\nUsing Exsisting DB connection...\n---------------------"
      );
      isConnected = true;
      return;
    }
    await mongoose.disconnect();
  }

  const MONGODB_URL = process.env.MONGODB_URL;

  if (!MONGODB_URL) throw new Error("MONGODB_URL not set");

  await mongoose.connect(MONGODB_URL, {
    dbName: "ArturHub", // optional, depends on you
  });

  console.log(
    "---------------------\nMONGODB connected\n---------------------"
  );
  isConnected = true;
};
