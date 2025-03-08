import { EntityManager, EntityRepository, MikroORM } from '@mikro-orm/core';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import { User } from './entities/user.entity';
import { Product } from './entities/product.entity';
import { Cart } from './entities/cart.entity';
import { CartItem } from './entities/cartItem.entity';
import { Order } from './entities/order.entity';
import { OrderItem } from './entities/orderItem.entity';
import options from './configs/mikro-orm.config';

export const DI = {} as {
  orm: MikroORM;
  em: EntityManager;
  userRepository: EntityRepository<User>;
  productRepository: EntityRepository<Product>;
  cartRepository: EntityRepository<Cart>;
  cartItemRepository: EntityRepository<CartItem>;
  orderRepository: EntityRepository<Order>;
  orderItemRepository: EntityRepository<OrderItem>;
};

export async function createDBConnection() {
  try {
    DI.orm = await MikroORM.init<PostgreSqlDriver>(options);

    DI.em = DI.orm.em;
    DI.userRepository = DI.orm.em.getRepository(User);
    DI.productRepository = DI.orm.em.getRepository(Product);
    DI.cartRepository = DI.orm.em.getRepository(Cart);
    DI.cartItemRepository = DI.orm.em.getRepository(CartItem);
    DI.orderRepository = DI.orm.em.getRepository(Order);
    DI.orderItemRepository = DI.orm.em.getRepository(OrderItem);

    console.log('DB connection created. MicroORM initialized.');
  } catch (err) {
    console.error(`Error creating DB connection: ${err}.`);
    throw err;
  }
}

export async function closeDBConnection() {
  try {
    if (!DI.orm) {
      return;
    }

    await DI.orm.close();

    console.log('DB connection closed.');
  } catch (err) {
    console.error(`Error closing DB connection: ${err}.`);
  }
}
