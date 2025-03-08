import mongoose, { Schema } from 'mongoose';
import { randomUUID } from 'crypto';
import { CartEntity } from '../entities/cart.entity';
import { ProductSchema } from './product.model';

export const CartItemSchema: Schema = new Schema(
  {
    product: { type: ProductSchema, required: true },
    count: { type: Number, required: true },
  },
  { _id: false },
);

const CartSchema: Schema = new Schema(
  {
    _id: { type: String, required: true, default: () => randomUUID() },
    userId: { type: String, required: true, ref: 'User' },
    isDeleted: { type: Boolean, required: true, default: false },
    items: { type: [CartItemSchema], required: true, default: [] },
  },
  {
    toJSON: {
      transform: (doc, ret, options) => {
        const { _id, userId, isDeleted, __v, ...cart } = ret;
        cart.id = _id;
        return cart;
      },
    },
  },
);

export const cartModel = mongoose.model<CartEntity>('Cart', CartSchema, 'carts');
