import { Request, Response, NextFunction } from 'express';
import * as userService from '../services/user.service';
import { HttpStatusCode } from '../utils/constants';
import { logger } from '../utils/logger';

export async function loginUser(req: Request, res: Response, next: NextFunction) {
  try {
    const { email, password } = req.body;
    const token = await userService.loginUser(email, password);

    const responseData = { data: token, error: null };
    res.status(HttpStatusCode.Ok).json(responseData);

    logger.debug('Controller loginUser - OK.');
  } catch (err) {
    logger.debug(`Controller loginUser - Error: ${err}.`);
    next(err);
  }
}

export async function registerUser(req: Request, res: Response, next: NextFunction) {
  try {
    const { email, password, role } = req.body;
    const user = await userService.registerUser(email, password, role);

    const responseData = { data: user, error: null };
    res.status(HttpStatusCode.Ok).json(responseData);

    logger.debug('Controller registerUser - OK.');
  } catch (err) {
    logger.debug(`Controller registerUser - Error: ${err}.`);
    next(err);
  }
}
