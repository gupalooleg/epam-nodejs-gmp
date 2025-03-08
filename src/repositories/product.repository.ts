import { ProductEntity } from '../entities/product.entity';
import { productModel } from '../models/product.model';

export async function getAllProducts() {
  return productModel.find();
}

export async function getProductById(id: ProductEntity['id']) {
  return productModel.findById(id);
}
