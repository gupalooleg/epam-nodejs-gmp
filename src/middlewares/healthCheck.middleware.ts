import { Request, Response, NextFunction } from 'express';
import { HttpError } from '../errors/http.error';
import { HttpStatusCode, Message } from '../utils/constants';
import { DI } from '../db';
import { logger } from '../utils/logger';

export async function healthCheckMiddleware(req: Request, res: Response, next: NextFunction) {
  try {
    const dbConnected = await DI.orm.isConnected();
    if (dbConnected) {
      const responseData = { data: { dbConnected }, error: null };
      res.status(HttpStatusCode.Ok).json(responseData);
    } else {
      throw new HttpError(Message.DBNotConnected, HttpStatusCode.InternalServerError);
    }

    logger.debug('Middleware healthCheckMiddleware - OK.');
  } catch (err) {
    logger.debug(`Middleware healthCheckMiddleware - Error: ${err}.`);
    next(err);
  }
}
