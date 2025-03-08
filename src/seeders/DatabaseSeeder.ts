import type { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import { products, users } from '../configs/initDBData';
import { User } from '../entities/user.entity';
import { Product } from '../entities/product.entity';

export class DatabaseSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    users.forEach((user) => em.create(User, user));
    products.forEach((product) => em.create(Product, product));
  }
}
