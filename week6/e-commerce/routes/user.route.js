/* eslint-disable import/prefer-default-export */
import express from 'express';
import { getUsersController, getUserController, createUserController, updateUserController, deleteUserController, loginUserController } from '../controllers/user.controller.js';
import { userTokenVerification } from '../middlewares/token_verification.js'

const userRouter = express.Router();

userRouter.get('/', getUsersController);
userRouter.get('/:id', getUserController);
userRouter.post('/', createUserController);
userRouter.put('/:id',userTokenVerification, updateUserController);
userRouter.delete('/:id', userTokenVerification, deleteUserController);
userRouter.post('/login', loginUserController)

export { userRouter };
