import {
  Collection,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryKey,
  Property,
  Ref,
  Reference,
} from '@mikro-orm/core';
import { User } from './user.entity';
import { Order } from './order.entity';
import { CartItem } from './cartItem.entity';
import { DI } from '../db';

@Entity()
export class Cart {
  @PrimaryKey({ type: 'uuid', defaultRaw: 'gen_random_uuid()' })
  id!: string;

  @Property({ default: false })
  isDeleted?: boolean = false;

  @ManyToOne(() => User, { ref: true })
  user: Ref<User>;

  @OneToMany(() => Order, (order) => order.cart, {})
  orders: Collection<Order> = new Collection<Order>(this);

  @OneToMany(() => CartItem, (cartItem) => cartItem.cart, {})
  cartItems: Collection<CartItem> = new Collection<CartItem>(this);

  constructor(userId: User['id']) {
    this.user = Reference.createFromPK(User, userId);
  }

  async toResponse() {
    await DI.cartRepository.populate(this, ['cartItems', 'cartItems.product']);

    const items = this.cartItems.map(({ product, count }) => ({ product, count }));
    const total = items.reduce(
      (acc, item) => item.product.getProperty('price') * item.count + acc,
      0,
    );

    return { cart: { id: this.id, items }, total };
  }
}
