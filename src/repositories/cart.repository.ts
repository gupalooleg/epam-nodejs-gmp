import { CartEntity } from '../entities/cart.entity';
import { cartModel } from '../models/cart.model';

export async function getUserCart(userId: CartEntity['userId']) {
  return cartModel.findOne({ userId, isDeleted: false });
}

export async function createUserCart(userId: CartEntity['userId']) {
  return cartModel.create({ userId });
}

export async function deleteUserCart(userId: CartEntity['userId']) {
  return cartModel.findOneAndUpdate(
    { userId, isDeleted: false },
    { isDeleted: true },
    { new: true },
  );
}

export async function updateUserCart(userId: CartEntity['userId'], items: CartEntity['items']) {
  return cartModel.findOneAndUpdate({ userId, isDeleted: false }, { items }, { new: true });
}
