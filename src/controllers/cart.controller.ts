import { Request, Response, NextFunction } from 'express';
import * as cartService from '../services/cart.service';
import { HttpStatusCode } from '../utils/constants';

type UpdateUserCartRequest = Request<unknown, unknown, { productId: string; count: number }>;

export async function getOrCreateUserCart(req: Request, res: Response, next: NextFunction) {
  try {
    const { id: userId } = req.tokenPayload;
    const cart = await cartService.getOrCreateUserCart(userId);

    const responseData = { data: cart, error: null };
    res.status(HttpStatusCode.Ok).json(responseData);
  } catch (err) {
    next(err);
  }
}

export async function deleteUserCart(req: Request, res: Response, next: NextFunction) {
  try {
    const { id: userId } = req.tokenPayload;
    const result = await cartService.deleteUserCart(userId);

    const responseData = { data: { success: result }, error: null };
    res.status(HttpStatusCode.Ok).json(responseData);
  } catch (err) {
    next(err);
  }
}

export async function updateUserCart(
  req: UpdateUserCartRequest,
  res: Response,
  next: NextFunction,
) {
  try {
    const { id: userId } = req.tokenPayload;
    const { productId, count } = req.body;
    const cart = await cartService.updateUserCart(userId, productId, count);

    const responseData = { data: cart, error: null };
    res.status(HttpStatusCode.Ok).json(responseData);
  } catch (err) {
    next(err);
  }
}

export async function checkoutUserCart(req: Request, res: Response, next: NextFunction) {
  try {
    const { id: userId } = req.tokenPayload;
    const order = await cartService.checkoutUserCart(userId);

    const responseData = { data: order, error: null };
    res.status(HttpStatusCode.Ok).json(responseData);
  } catch (err) {
    next(err);
  }
}
