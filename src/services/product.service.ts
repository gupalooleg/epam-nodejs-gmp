import { ProductEntity } from '../entities/product.entity';
import * as productRepository from '../repositories/product.repository';

export function getAllProducts() {
  return productRepository.getAllProducts();
}

export function getProductById(id: ProductEntity['id']) {
  return productRepository.getProductById(id);
}
