import { getUsers, createUser, getUser, updateUser, deleteUser, getUserByUsername } from '../database/database_functions/user.js';
import { CustomError, httpStatusCodes } from '../constants/constants.js';
import { errRes, sendResponse } from '../helpers/sendReponse.js';
import { compareSync } from 'bcrypt';
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv';
dotenv.config();

export const getUsersController = async (req, res, next) => {
  try {
    const users = await getUsers();
    return sendResponse(res, httpStatusCodes.OK, 'success', 'get all users', users);
  } catch (error) {
    return errRes(new CustomError(httpStatusCodes['Bad Request'], error.message), req, res, next);
  }
};

export const getUserController = async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = await getUser(id);
    if (!user) return errRes({ status: httpStatusCodes['Not Found'], message: 'user with given id does not exists' }, req, res, next)

    return sendResponse(res, httpStatusCodes.OK, 'success', 'get user by id', user);
  } catch (error) {
    return errRes(new CustomError(httpStatusCodes['Bad Request'], error.message), req, res, next);
  }
};

export const createUserController = async (req, res, next) => {
  const { username, role, password } = req.body;
  try {
    const user = await createUser({ username, role, password });
    return sendResponse(res, httpStatusCodes.Created, 'success', 'user created', user);
  } catch (error) {
    return errRes(new CustomError(httpStatusCodes['Bad Request'], error.message), req, res, next);
  }
}

export const updateUserController = async (req, res, next) => {
  const { id } = req.params;
  const body = req.body;
  const dataToUpdate = {};

  if (body.username) dataToUpdate.username = body.username;
  if (body.password) dataToUpdate.password = body.password;

  try {
    const user = await updateUser(id, dataToUpdate);
    if (!user) return errRes({ status: httpStatusCodes['Not Found'], message: 'user with given id does not exists' }, req, res, next);
    return sendResponse(res, httpStatusCodes.OK, 'success', 'user data updated', null);
  } catch (error) {
    return errRes(new CustomError(httpStatusCodes['Bad Request'], error.message), req, res, next);
  }
}

export const deleteUserController = async (req, res, next) => {
  const { id } = req.params;

  try {
    const user = await deleteUser(id);
    if (!user) return errRes({ status: httpStatusCodes['Not Found'], message: 'user with given id does not exists' }, req, res, next);
    return sendResponse(res, httpStatusCodes.OK, 'success', 'user deleted', null);
  } catch (error) {
    return errRes(new CustomError(httpStatusCodes['Bad Request'], error.message), req, res, next);
  }
}

export const loginUserController = async (req, res, next) => {
  const { username, password } = req.body;

  try {
    const user = await getUserByUsername(username);
    if (!user) return errRes({ status: httpStatusCodes['Not Found'], message: 'user with given username does not exists' }, req, res, next);

    if (compareSync(password, user.password)) {
      const token = await jwt.sign({ username: user.username, role: user.role, _id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
      return sendResponse(res, httpStatusCodes.OK, 'success', 'login successfull', { token });
    }

    return errRes({
      message: 'Wrong password',
      status: httpStatusCodes.Unauthorized
    }, req, res, next);
  } catch (error) {
    return errRes(new CustomError(httpStatusCodes['Bad Request'], error.message), req, res, next);
  }
}