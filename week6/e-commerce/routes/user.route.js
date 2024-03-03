/* eslint-disable import/prefer-default-export */
import express from 'express';
import { getUsersController, getUserController, createUserController, updateUserController, deleteUserController, loginUserController } from '../controllers/user.controller.js';

const userRouter = express.Router();

userRouter.get('/', getUsersController);
userRouter.get('/:id', getUserController);
userRouter.post('/', createUserController);
userRouter.put('/:id', updateUserController);
userRouter.delete('/:id', deleteUserController);
userRouter.post('/login', loginUserController)

export { userRouter };
