import mongoose from 'mongoose';
import env from './env.js';

/**
 * Connect to MongoDB database via Mongoose
 */
export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(env.MONGODB_URI);
    console.log(`[MongoDB] Connected successfully: ${conn.connection.host} (${conn.connection.name})`);
    return conn;
  } catch (error) {
    console.error(`[MongoDB] Connection error: ${error.message}`);
    // In production, we might exit, but in development or testing we propagate the error
    throw error;
  }
};

mongoose.connection.on('disconnected', () => {
  console.warn('[MongoDB] Connection disconnected');
});

mongoose.connection.on('error', (err) => {
  console.error('[MongoDB] Connection event error:', err.message);
});

export default connectDB;
