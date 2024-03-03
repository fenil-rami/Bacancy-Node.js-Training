/* eslint-disable import/prefer-default-export */
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'must proide a username'],
    maxlength: [50, 'username cannot be more than 50 characters'],
    unique: [true, 'username already in use']
  },
  role: {
    type: String,
    enum: ['buyer', 'seller'],
    required: [true, 'user must have a role'],
  },
  password: {
    type: String,
    required: [true, 'must provide a password'],
    minLength: [8, 'password must be atleast 8 characters long']
  }
}, { timestamps: true });

export const userModel = mongoose.model('User', userSchema);
