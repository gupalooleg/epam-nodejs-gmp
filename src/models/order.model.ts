import mongoose, { Schema } from 'mongoose';
import { randomUUID } from 'crypto';
import { OrderEntity, OrderStatus } from '../entities/order.entity';
import { CartItemSchema } from './cart.model';

const OrderSchema: Schema = new Schema(
  {
    _id: { type: String, required: true, default: () => randomUUID() },
    userId: { type: String, required: true, ref: 'User' },
    cartId: { type: String, required: true, ref: 'Cart' },
    items: { type: [CartItemSchema], required: true },
    status: {
      type: String,
      required: true,
      enum: Object.values(OrderStatus),
      default: OrderStatus.Created,
    },
    total: { type: Number, required: true },
  },
  {
    toJSON: {
      transform: (doc, ret, options) => {
        const { _id, __v, ...order } = ret;
        order.id = _id;
        return order;
      },
    },
  },
);

export const orderModel = mongoose.model<OrderEntity>('Order', OrderSchema, 'orders');
