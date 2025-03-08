import { Request, Response, NextFunction } from 'express';
import { HttpError } from '../errors/http.error';
import { HttpStatusCode } from '../utils/constants';

export function errorMiddleware(err: Error, req: Request, res: Response, next: NextFunction) {
  if (res.headersSent) {
    next(err);
  }

  const statusCode = err instanceof HttpError ? err.statusCode : HttpStatusCode.InternalServerError;
  const responseData = { data: null, error: { message: err.message } };

  res.status(statusCode).json(responseData);
}
