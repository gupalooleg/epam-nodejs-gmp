import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';
import { HttpError } from '../errors/http.error';
import { HttpStatusCode } from '../utils/constants';

export function validateLoginUserMiddleware(req: Request, res: Response, next: NextFunction) {
  const schema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    next(new HttpError(error.message, HttpStatusCode.BadRequest));
  } else {
    next();
  }
}
