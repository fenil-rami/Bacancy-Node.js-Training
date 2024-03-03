/* eslint-disable no-async-promise-executor */
import { userModel } from '../models/user.model.js';
import { genSaltSync, hash, compare } from 'bcrypt'
const salt = genSaltSync(10);

export const getUsers = async () => new Promise(async (resolve, reject) => {
  try {
    const users = await userModel.find().lean().select('-password');
    resolve(users);
  } catch (error) {
    reject(error);
  }
});

export const getUser = async (userId) => new Promise(async (resolve, reject) => {
  try {
    const user = await userModel.findById(userId).lean().select('-password');
    resolve([user]);
  } catch (error) {
    reject(error);
  }
});

export const createUser = async (userData) => new Promise(async (resolve, reject) => {
  try {
    if (userData.password) userData.password = await hash(userData.password, salt);
    const { _id, username, role, createdAt, updatedAt } = await userModel.create(userData);
    resolve({ _id, username, role, createdAt, updatedAt });
  } catch (error) {
    reject(error);
  }
});

export const updateUser = async (userId, userData) => new Promise(async (resolve, reject) => {
  try {
    if (userData.password) userData.password = await hash(userData.password, salt);
    const user = await userModel.findByIdAndUpdate(userId, userData).select('-password').lean();
    resolve(user);
  } catch (error) {
    reject(error);
  }
});

export const deleteUser = async (userId) => new Promise(async (resolve, reject) => {
  try {
    const user = await userModel.findByIdAndDelete(userId).lean();
    resolve(user);
  } catch (error) {
    reject(error);
  }
});

export const getUserByUsername = async (username) => new Promise(async (resolve, reject) => {
  try {
    const user = await userModel.find({ username: username }).lean();
    resolve(user);
  } catch (error) {
    reject(error);
  }
})