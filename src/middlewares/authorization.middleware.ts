import { Request, Response, NextFunction } from 'express';
import { HttpError } from '../errors/http.error';
import { HttpStatusCode, Message } from '../utils/constants';
import * as userService from '../services/user.service';

export async function authorizationMiddleware(req: Request, res: Response, next: NextFunction) {
  try {
    const userId = req.header('x-user-id');

    if (!userId) {
      throw new HttpError(Message.UserMustBeAuthorized, HttpStatusCode.Unauthorized);
    }

    const user = await userService.getUserById(userId);
    if (!user) {
      throw new HttpError(Message.UserNotAuthorized, HttpStatusCode.NotFound);
    }

    next();
  } catch (err) {
    next(err);
  }
}
