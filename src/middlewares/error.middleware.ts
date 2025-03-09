import { Request, Response, NextFunction } from 'express';
import { HttpError } from '../errors/http.error';
import { HttpStatusCode } from '../utils/constants';
import { logger } from '../utils/logger';

export function errorMiddleware(err: Error, req: Request, res: Response, next: NextFunction) {
  logger.error(`Middleware errorMiddleware - ${err}.`);

  if (res.headersSent) {
    next(err);
  } else {
    const statusCode =
      err instanceof HttpError ? err.statusCode : HttpStatusCode.InternalServerError;
    const responseData = { data: null, error: { message: err.message } };

    res.status(statusCode).json(responseData);
  }
}
