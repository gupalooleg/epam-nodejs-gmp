import { Request, Response, NextFunction } from 'express';
import { UserRole } from '../entities/user.entity';
import { HttpError } from '../errors/http.error';
import { HttpStatusCode, Message } from '../utils/constants';
import { logger } from '../utils/logger';

export function deleteCartAuthorizationMiddleware(req: Request, res: Response, next: NextFunction) {
  try {
    const { role } = req.tokenPayload;
    if (role !== UserRole.Admin) {
      throw new HttpError(Message.NoPermissionsForAction, HttpStatusCode.Forbidden);
    }

    next();

    logger.debug('Middleware deleteCartAuthorizationMiddleware - OK.');
  } catch (err) {
    logger.debug(`Middleware deleteCartAuthorizationMiddleware - Error: ${err}.`);
    next(err);
  }
}
