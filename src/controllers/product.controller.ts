import { Request, Response, NextFunction } from 'express';
import * as productService from '../services/product.service';
import { HttpStatusCode, Message } from '../utils/constants';
import { HttpError } from '../errors/http.error';
import { ProductEntity } from '../entities/product.entity';

type GetProductByIdRequest = Request<{ id: ProductEntity['id'] }>;

export async function getAllProducts(req: Request, res: Response, next: NextFunction) {
  try {
    const products = await productService.getAllProducts();

    const responseData = { data: products, error: null };
    res.status(HttpStatusCode.Ok).json(responseData);
  } catch (err) {
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
  } catch (err) {
    next(err);
  }
}
