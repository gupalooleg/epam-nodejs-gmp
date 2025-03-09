import { Collection, Entity, Enum, OneToMany, PrimaryKey, Property } from '@mikro-orm/core';
import { Cart } from './cart.entity';
import { Order } from './order.entity';

export enum UserRole {
  Admin = 'admin',
  User = 'user',
}

@Entity()
export class User {
  @PrimaryKey({ type: 'uuid', defaultRaw: 'gen_random_uuid()' })
  id!: string;

  @Property({ unique: true })
  email: string;

  @Property()
  password: string;

  @Enum({ items: () => UserRole })
  role: string;

  @OneToMany(() => Cart, (cart) => cart.user, {})
  carts: Collection<Cart> = new Collection<Cart>(this);

  @OneToMany(() => Order, (order) => order.user, {})
  orders: Collection<Order> = new Collection<Order>(this);

  constructor(email: string, password: string, role: string) {
    this.email = email;
    this.password = password;
    this.role = role;
  }

  toResponse() {
    return {
      id: this.id,
      email: this.email,
      role: this.role,
    };
  }
}
