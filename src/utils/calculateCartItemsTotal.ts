import { CartItemEntity } from '../entities/cart.entity';

export function calculateCartItemsTotal(items: CartItemEntity[]) {
  return items.reduce((acc, item) => acc + item.count * item.product.price, 0);
}
