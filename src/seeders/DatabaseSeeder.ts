import type { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import { products } from '../configs/initDBData';
import { Product } from '../entities/product.entity';

export class DatabaseSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    products.forEach((product) => em.create(Product, product));
  }
}
