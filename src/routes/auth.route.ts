import { Router } from 'express';
import * as userController from '../controllers/user.controller';
import { validateLoginUserMiddleware } from '../middlewares/validateLoginUser.middleware';
import { validateRegisterUserMiddleware } from '../middlewares/validateRegisterUser.middleware';

export const authRouter = Router();

authRouter.post('/auth/login', validateLoginUserMiddleware, userController.loginUser);
authRouter.post('/auth/register', validateRegisterUserMiddleware, userController.registerUser);
