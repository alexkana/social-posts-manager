import mongoose from "mongoose";

import { config } from "./variables";

const clientOptions = {
  serverApi: { version: "1" as const, strict: true, deprecationErrors: true },
};

export const connectToDB = () =>
  mongoose
    .connect(config.MONGODB_URI, clientOptions)
    .then(() => console.log("MongoDB connected"))
    .catch((err: any) => {
      console.error("MongoDB connection error:", err);
      process.exit(1);
    });
