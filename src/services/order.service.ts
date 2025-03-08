import * as orderRepository from '../repositories/order.repository';
import { OrderEntity } from '../entities/order.entity';
import { calculateCartItemsTotal } from '../utils/calculateCartItemsTotal';

export async function createUserCartOrder(
  userId: OrderEntity['userId'],
  cartId: OrderEntity['cartId'],
  items: OrderEntity['items'],
) {
  const total = calculateCartItemsTotal(items);
  return orderRepository.createUserCartOrder(userId, cartId, items, total);
}
