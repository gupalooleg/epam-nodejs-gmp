import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import { HttpError } from '../errors/http.error';
import { HttpStatusCode, Message } from '../utils/constants';
import * as userService from '../services/user.service';
import { TOKEN_KEY } from '../configs/config';

declare global {
  namespace Express {
    interface Request {
      tokenPayload: userService.TokenPayload;
    }
  }
}

export async function authenticationMiddleware(req: Request, res: Response, next: NextFunction) {
  try {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader?.startsWith('Bearer ')) {
      throw new HttpError(Message.UserNotAuthorized, HttpStatusCode.Unauthorized);
    }

    const token = authorizationHeader.split(' ')[1];

    let tokenPayload;
    try {
      tokenPayload = jwt.verify(token, TOKEN_KEY!) as userService.TokenPayload;
    } catch (err) {
      throw new HttpError(Message.UserNotAuthorized, HttpStatusCode.Unauthorized);
    }

    const user = await userService.getUserById(tokenPayload.id);
    if (!user) {
      throw new HttpError(Message.ActionForbidden, HttpStatusCode.Forbidden);
    }

    req.tokenPayload = tokenPayload;

    next();
  } catch (err) {
    next(err);
  }
}
