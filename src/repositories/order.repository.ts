import { OrderEntity } from '../entities/order.entity';
import { orderModel } from '../models/order.model';

export async function createUserCartOrder(
  userId: OrderEntity['userId'],
  cartId: OrderEntity['cartId'],
  items: OrderEntity['items'],
  total: OrderEntity['total'],
) {
  return orderModel.create({ userId, cartId, items, total });
}
