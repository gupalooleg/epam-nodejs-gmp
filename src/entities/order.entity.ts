import {
  Check,
  Collection,
  Entity,
  Enum,
  ManyToOne,
  OneToMany,
  PrimaryKey,
  Property,
  Ref,
  Reference,
} from '@mikro-orm/core';
import { User } from './user.entity';
import { Cart } from './cart.entity';
import { OrderItem } from './orderItem.entity';
import { DI } from '../db';

export enum OrderStatus {
  Created = 'created',
  Completed = 'completed',
}

type OrderStatusType = `${OrderStatus}`;

@Entity()
export class Order {
  @PrimaryKey({ type: 'uuid', defaultRaw: 'gen_random_uuid()' })
  id!: string;

  @Enum({ items: () => OrderStatus, default: OrderStatus.Created })
  status?: OrderStatusType = OrderStatus.Created;

  @Property()
  @Check({ expression: 'total > 0' })
  total: number;

  @ManyToOne(() => User, { ref: true })
  user: Ref<User>;

  @ManyToOne(() => Cart, { ref: true })
  cart: Ref<Cart>;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.order, {})
  orderItems: Collection<OrderItem> = new Collection<OrderItem>(this);

  constructor(userId: User['id'], cartId: Cart['id'], total: number) {
    this.user = Reference.createFromPK(User, userId);
    this.cart = Reference.createFromPK(Cart, cartId);
    this.total = total;
  }

  async toResponse() {
    await DI.orderRepository.populate(this, ['orderItems', 'orderItems.product']);

    const items = this.orderItems.map(({ product, count }) => ({ product, count }));

    return {
      order: {
        id: this.id,
        userId: this.user.id,
        cartId: this.cart.id,
        items: items,
        status: this.status,
        total: this.total,
      },
    };
  }
}
