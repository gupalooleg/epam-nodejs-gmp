import { Entity, Property, ManyToOne, Ref, Reference, Check } from '@mikro-orm/core';
import { Product } from './product.entity';
import { Order } from './order.entity';

@Entity()
export class OrderItem {
  @ManyToOne(() => Order, { ref: true, primary: true })
  order: Ref<Order>;

  @ManyToOne(() => Product, { ref: true, primary: true })
  product: Ref<Product>;

  @Property()
  @Check({ expression: 'count > 0' })
  count: number;

  constructor(orderId: Order['id'], productId: Product['id'], count: number) {
    this.product = Reference.createFromPK(Product, productId);
    this.order = Reference.createFromPK(Order, orderId);
    this.count = count;
  }
}
