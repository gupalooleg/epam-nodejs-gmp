import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';
import { HttpError } from '../errors/http.error';
import { HttpStatusCode } from '../utils/constants';
import { UserRole } from '../entities/user.entity';
import { logger } from '../utils/logger';

export function validateRegisterUserMiddleware(req: Request, res: Response, next: NextFunction) {
  try {
    const schema = Joi.object({
      email: Joi.string().required().email(),
      password: Joi.string().required().min(4),
      role: Joi.string()
        .required()
        .valid(...Object.values(UserRole)),
    });

    const { error } = schema.validate(req.body);
    if (error) {
      throw new HttpError(error.message, HttpStatusCode.BadRequest);
    }

    next();

    logger.debug('Middleware validateRegisterUserMiddleware - OK.');
  } catch (err) {
    logger.debug(`Middleware validateRegisterUserMiddleware - Error: ${err}.`);
    next(err);
  }
}
