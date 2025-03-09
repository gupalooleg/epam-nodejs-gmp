import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';
import { HttpError } from '../errors/http.error';
import { HttpStatusCode } from '../utils/constants';
import { logger } from '../utils/logger';

export function validateLoginUserMiddleware(req: Request, res: Response, next: NextFunction) {
  try {
    const schema = Joi.object({
      email: Joi.string().required(),
      password: Joi.string().required(),
    });

    const { error } = schema.validate(req.body);
    if (error) {
      throw new HttpError(error.message, HttpStatusCode.BadRequest);
    }

    next();

    logger.debug('Middleware validateLoginUserMiddleware - OK.');
  } catch (err) {
    logger.debug(`Middleware validateLoginUserMiddleware - Error: ${err}.`);
    next(err);
  }
}
