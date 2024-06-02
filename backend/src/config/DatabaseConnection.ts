import mongoose, { ConnectOptions } from "mongoose";
import { config } from "./config.js";

const DatabaseConnection = async (): Promise<void> => {
  try {
    const options: ConnectOptions = {};

    if (!config.MONGODB_URL) {
      throw new Error('MONGODB_URL environment variable is not defined');
    }

    const response = await mongoose.connect(config.MONGODB_URL, options);
    console.log('MongoDB connection established:', response.connections[0].name);
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  }
}

export default DatabaseConnection;