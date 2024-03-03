import { getUsers, createUser, getUser, updateUser, deleteUser } from '../database/database_functions/user.js';
import { httpStatusCodes } from '../constants/constants.js';
import { errRes, sendResponse } from '../helpers/sendReponse.js';

export const getUsersController = async (req, res, next) => {
  try {
    const users = await getUsers();
    return sendResponse(res, httpStatusCodes.OK, 'success', 'get all users', users);
  } catch (error) {
    next(error);
  }
};

export const getUserController = async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = await getUser(id);
    if (!user) return errRes({ status: 404, message: 'user with given id does not exists' }, req, res, next)

    return sendResponse(res, httpStatusCodes.OK, 'success', 'get user by id', user);
  } catch (error) {
    next(error);
  }
};

export const createUserController = async (req, res, next) => {
  const { username, role, password } = req.body;
  try {
    const user = await createUser({ username, role, password });
    return sendResponse(res, httpStatusCodes.Created, 'success', 'user created', user);
  } catch (error) {
    next(error);
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
    if (!user) return errRes({ status: 404, message: 'user with given id does not exists' }, req, res, next);
    return sendResponse(res, httpStatusCodes.OK, 'success', 'user data updated', null);
  } catch (error) {
    next(error);
  }
}

export const deleteUserController = async (req, res, next) => {
  const { id } = req.params;

  try {
    const user = await deleteUser(id);
    if (!user) return errRes({ status: 404, message: 'user with given id does not exists' }, req, res, next);
    return sendResponse(res, httpStatusCodes.OK, 'success', 'user deleted', null);
  } catch (error) {
    next(error);
  }
}