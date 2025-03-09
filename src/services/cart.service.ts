import { DI } from '../db';
import { HttpError } from '../errors/http.error';
import { HttpStatusCode, Message } from '../utils/constants';
import * as productService from './product.service';
import * as orderService from './order.service';
import { Cart } from '../entities/cart.entity';

export async function getOrCreateUserCart(userId: string) {
  let cart = (await DI.cartRepository.findOne({ user: userId, isDeleted: false })) as Cart;
  if (!cart) {
    cart = DI.cartRepository.create({ user: userId });
    await DI.em.flush();
  }

  return cart.toResponse();
}

export async function deleteUserCart(userId: string) {
  const cart = await DI.cartRepository.findOne({ user: userId, isDeleted: false });
  if (!cart) {
    return false;
  }

  cart.isDeleted = true;
  await DI.em.flush();

  return true;
}

export async function updateUserCart(userId: string, productId: string, count: number) {
  const cart = await DI.cartRepository.findOne({ user: userId, isDeleted: false });
  if (!cart) {
    throw new HttpError(Message.CartNotFound, HttpStatusCode.NotFound);
  }

  const cartItem = await DI.cartItemRepository.findOne({ cart: cart.id, product: productId });
  if (cartItem) {
    if (count > 0) {
      cartItem.count = count;
    } else {
      DI.em.remove(cartItem);
    }
  } else {
    if (count > 0) {
      const product = await productService.getProductById(productId);
      if (product) {
        DI.cartItemRepository.create({
          cart: cart.id,
          product: productId,
          count,
        });
      }
    }
  }

  await DI.em.flush();

  return cart.toResponse();
}

export async function checkoutUserCart(userId: string) {
  const cart = await DI.cartRepository.findOne(
    { user: userId, isDeleted: false },
    { populate: ['cartItems', 'cartItems.product'] },
  );

  if (!cart?.cartItems.length) {
    throw new HttpError(Message.CartEmpty, HttpStatusCode.BadRequest);
  }

  const items = cart.cartItems.map(({ product, count }) => ({
    productId: product.getProperty('id'),
    price: product.getProperty('price'),
    count,
  }));

  return orderService.createUserCartOrder(userId, cart.id, items);
}
