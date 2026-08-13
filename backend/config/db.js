import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const connUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/portfolio';
    console.log(`[Database] Attempting connection to: ${connUri}`);
    
    // Set connection timeout options
    const options = {
      serverSelectionTimeoutMS: 5000, // Timeout after 5s
    };

    const conn = await mongoose.connect(connUri, options);
    console.log(`[Database] MongoDB Connected: ${conn.connection.host}`);
    return true;
  } catch (error) {
    console.error(`[Database] Connection Error: ${error.message}`);
    console.warn(`[Database] MongoDB is currently unavailable. The server will run in offline mode.`);
    return false;
  }
};

export default connectDB;
