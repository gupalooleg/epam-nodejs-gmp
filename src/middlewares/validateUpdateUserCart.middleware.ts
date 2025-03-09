import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';
import { HttpError } from '../errors/http.error';
import { HttpStatusCode, Message } from '../utils/constants';
import { logger } from '../utils/logger';

export function validateUpdateUserCartMiddleware(req: Request, res: Response, next: NextFunction) {
  try {
    const schema = Joi.object({
      productId: Joi.string().required(),
      count: Joi.number().min(0).required(),
    });

    const { error } = schema.validate(req.body);
    if (error) {
      throw new HttpError(Message.ProductsNotValid, HttpStatusCode.BadRequest);
    }

    next();

    logger.debug('Middleware validateUpdateUserCartMiddleware - OK.');
  } catch (err) {
    logger.debug(`Middleware validateUpdateUserCartMiddleware - Error: ${err}.`);
    next(err);
  }
}
