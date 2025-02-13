import mongoose from 'mongoose';
import colors from 'colors';

import dotenv from 'dotenv';
dotenv.config();

const connectDB = async () => {
  try {
     const conn =await mongoose.connect(process.env.MONGODB_URI);
    console.log(`MongoDB Connected...${conn.connection.host}`.bgMagenta.white);
  } catch (error) {
    console.log(error);
  }
};

export default connectDB;