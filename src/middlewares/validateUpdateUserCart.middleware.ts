import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';
import { HttpError } from '../errors/http.error';
import { HttpStatusCode, Message } from '../utils/constants';

export function validateUpdateUserCartMiddleware(req: Request, res: Response, next: NextFunction) {
  const schema = Joi.object({
    productId: Joi.string().required(),
    count: Joi.number().min(0).required(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    next(new HttpError(Message.ProductsNotValid, HttpStatusCode.BadRequest));
  } else {
    next();
  }
}
