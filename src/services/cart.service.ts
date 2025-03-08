import { CartEntity, CartItemEntity } from '../entities/cart.entity';
import { HttpError } from '../errors/http.error';
import * as cartRepository from '../repositories/cart.repository';
import { calculateCartItemsTotal } from '../utils/calculateCartItemsTotal';
import { HttpStatusCode, Message } from '../utils/constants';
import * as productService from './product.service';
import * as orderService from './order.service';

export async function getOrCreateUserCart(userId: CartEntity['userId']) {
  let cart = await cartRepository.getUserCart(userId);
  if (!cart) {
    cart = await cartRepository.createUserCart(userId);
  }

  const total = calculateCartItemsTotal(cart.items);
  return { cart, total };
}

export async function deleteUserCart(userId: CartEntity['userId']) {
  const cart = await cartRepository.deleteUserCart(userId);
  return !!cart;
}

export async function updateUserCart(
  userId: CartEntity['userId'],
  productId: CartItemEntity['product']['id'],
  count: CartItemEntity['count'],
) {
  const cart = await cartRepository.getUserCart(userId);
  if (!cart) {
    throw new HttpError(Message.CartNotFound, HttpStatusCode.NotFound);
  }

  const itemIndex = cart.items.findIndex((item) => item.product.id === productId);
  if (itemIndex !== -1) {
    if (count === 0) {
      cart.items.splice(itemIndex, 1);
    } else {
      cart.items[itemIndex].count = count;
    }
  } else if (count > 0) {
    const product = await productService.getProductById(productId);
    if (product) {
      cart.items.push({ product, count });
    }
  }

  const updatedCart = await cartRepository.updateUserCart(userId, cart.items);
  if (!updatedCart) {
    throw new HttpError(Message.CartNotUpdated, HttpStatusCode.InternalServerError);
  }

  const total = calculateCartItemsTotal(updatedCart.items);
  return { cart: updatedCart, total };
}

export async function checkoutUserCart(userId: CartEntity['userId']) {
  const cart = await cartRepository.getUserCart(userId);
  if (!cart?.items.length) {
    throw new HttpError(Message.CartEmpty, HttpStatusCode.BadRequest);
  }

  const order = await orderService.createUserCartOrder(userId, cart.id, cart.items);

  return { order };
}
