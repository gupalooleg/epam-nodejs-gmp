import { Entity, Property, ManyToOne, Ref, Reference, Check } from '@mikro-orm/core';
import { Product } from './product.entity';
import { Cart } from './cart.entity';

@Entity()
export class CartItem {
  @ManyToOne(() => Cart, { ref: true, primary: true })
  cart: Ref<Cart>;

  @ManyToOne(() => Product, { ref: true, primary: true })
  product: Ref<Product>;

  @Property()
  @Check({ expression: 'count > 0' })
  count: number;

  constructor(cartId: Cart['id'], productId: Product['id'], count: number) {
    this.product = Reference.createFromPK(Product, productId);
    this.cart = Reference.createFromPK(Cart, cartId);
    this.count = count;
  }
}
