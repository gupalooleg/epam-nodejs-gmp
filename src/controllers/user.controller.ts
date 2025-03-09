import { Request, Response, NextFunction } from 'express';
import * as userService from '../services/user.service';
import { HttpStatusCode } from '../utils/constants';

export async function loginUser(req: Request, res: Response, next: NextFunction) {
  try {
    const { email, password } = req.body;
    const token = await userService.loginUser(email, password);

    const responseData = { data: token, error: null };
    res.status(HttpStatusCode.Ok).json(responseData);
  } catch (err) {
    next(err);
  }
}

export async function registerUser(req: Request, res: Response, next: NextFunction) {
  try {
    const { email, password, role } = req.body;
    const user = await userService.registerUser(email, password, role);

    const responseData = { data: user, error: null };
    res.status(HttpStatusCode.Ok).json(responseData);
  } catch (err) {
    next(err);
  }
}
