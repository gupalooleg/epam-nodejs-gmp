import { Request, Response, NextFunction } from 'express';
import * as productService from '../services/product.service';
import { HttpStatusCode, Message } from '../utils/constants';
import { HttpError } from '../errors/http.error';
import { logger } from '../utils/logger';

type GetProductByIdRequest = Request<{ id: string }>;

export async function getAllProducts(req: Request, res: Response, next: NextFunction) {
  try {
    const products = await productService.getAllProducts();

    const responseData = { data: products, error: null };
    res.status(HttpStatusCode.Ok).json(responseData);

    logger.debug('Controller getAllProducts - OK.');
  } catch (err) {
    logger.debug(`Controller getAllProducts - Error: ${err}.`);
    next(err);
  }
}

export async function getProductById(
  req: GetProductByIdRequest,
  res: Response,
  next: NextFunction,
) {
  try {
    const { id } = req.params;

    const product = await productService.getProductById(id);
    if (!product) {
      throw new HttpError(Message.ProductNotFound, HttpStatusCode.NotFound);
    }

    const responseData = { data: product, error: null };
    res.status(HttpStatusCode.Ok).json(responseData);

    logger.debug('Controller getProductById - OK.');
  } catch (err) {
    logger.debug(`Controller getProductById - Error: ${err}.`);
    next(err);
  }
}
