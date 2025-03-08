import { Collection, Entity, OneToMany, PrimaryKey } from '@mikro-orm/core';
import { Cart } from './cart.entity';
import { Order } from './order.entity';

@Entity()
export class User {
  @PrimaryKey()
  id: string;

  @OneToMany(() => Cart, (cart) => cart.user, {})
  carts: Collection<Cart> = new Collection<Cart>(this);

  @OneToMany(() => Order, (order) => order.user, {})
  orders: Collection<Order> = new Collection<Order>(this);

  constructor(id: string) {
    this.id = id;
  }
}
