import { Check, Collection, Entity, OneToMany, PrimaryKey, Property } from '@mikro-orm/core';
import { CartItem } from './cartItem.entity';
import { OrderItem } from './orderItem.entity';

@Entity()
export class Product {
  @PrimaryKey({ type: 'uuid', defaultRaw: 'gen_random_uuid()' })
  id!: string;

  @Property()
  title: string;

  @Property()
  description: string;

  @Property()
  @Check({ expression: 'price > 0' })
  price: number;

  @OneToMany(() => CartItem, (cartItem) => cartItem.product, {})
  cartItems: Collection<CartItem> = new Collection<CartItem>(this);

  @OneToMany(() => OrderItem, (orderItem) => orderItem.product, {})
  orderItems: Collection<OrderItem> = new Collection<OrderItem>(this);

  constructor(title: string, description: string, price: number) {
    this.title = title;
    this.description = description;
    this.price = price;
  }
}
