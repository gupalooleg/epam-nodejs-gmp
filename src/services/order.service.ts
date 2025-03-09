import { DI } from '../db';

export async function createUserCartOrder(
  userId: string,
  cartId: string,
  items: { productId: string; price: number; count: number }[],
) {
  const total = items.reduce((acc, { price, count }) => price * count + acc, 0);

  const order = DI.orderRepository.create({ total, user: userId, cart: cartId });
  items.forEach(({ productId, count }) =>
    DI.orderItemRepository.create({ order, product: productId, count }),
  );

  await DI.em.flush();

  return order.toResponse();
}
