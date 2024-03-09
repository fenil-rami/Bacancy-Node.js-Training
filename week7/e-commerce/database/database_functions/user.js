/* eslint-disable no-async-promise-executor */
import { User } from '../models/user.model.js';
import { genSaltSync, hash} from 'bcrypt'
const salt = genSaltSync(10);

export const getUsers = async () => new Promise(async (resolve, reject) => {
  try {
    const users = await User.findAll({
      attributes: {
        exclude: ['password']
      }
    })
    console.log(users);
    resolve(users);
  } catch (error) {
    reject(error);
  }
});

export const getUser = async (userId) => new Promise(async (resolve, reject) => {
  try {
    const user = await User.findByPk(userId, {
      attributes: {
        exclude: ['password']
      }
    });

    console.log('user in db function', user)
    resolve(user);
  } catch (error) {
    reject(error);
  }
});

export const createUser = async (userData) => new Promise(async (resolve, reject) => {
  try {
    if (userData.password) userData.password = await hash(userData.password, salt);

    const user = await User.create(userData);
    resolve({
      _id: user._id,
      username: user.username,
      role: user.role
    });
  } catch (error) {
    reject(error);
  }
});

export const updateUser = async (userId, userData) => new Promise(async (resolve, reject) => {
  try {
    if (userData.password) userData.password = await hash(userData.password, salt);
    const user = await User.update(userData, {
      where: {
        _id: userId
      }
    });

    if (user[0] === 1) {
      resolve({
        _id: user._id,
        username: user.username,
        role: user.role
      });
      return;
    }
    resolve(null);
  } catch (error) {
    reject(error);
  }
});

export const deleteUser = async (userId) => new Promise(async (resolve, reject) => {
  try {
    const user = await User.destroy({
      where: {
        _id: userId
      }
    })
    resolve(user);
  } catch (error) {
    reject(error);
  }
});

export const getUserByUsername = async (username) => new Promise(async (resolve, reject) => {
  try {
    const user = await User.findOne({
      where: {
        username: username
      }
    })
    if(!user) resolve(null)
    else resolve(user.dataValues);
  } catch (error) {
    reject(error);
  }
})