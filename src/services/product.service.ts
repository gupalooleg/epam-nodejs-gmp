import { DI } from '../db';

export function getAllProducts() {
  return DI.productRepository.findAll();
}

export function getProductById(id: string) {
  return DI.productRepository.findOne({ id });
}
