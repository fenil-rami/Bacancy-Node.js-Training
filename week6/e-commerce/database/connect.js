/* eslint-disable no-async-promise-executor */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/prefer-default-export */
/* eslint-disable no-console */
import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

export const connectDB = async () => new Promise(async (resolve, reject) => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    resolve();
  } catch (error) {
    reject(error);
  }
});
