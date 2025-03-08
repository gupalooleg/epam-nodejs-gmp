import mongoose, { Schema } from 'mongoose';
import { randomUUID } from 'crypto';
import { ProductEntity } from '../entities/product.entity';

export const ProductSchema: Schema = new Schema(
  {
    _id: { type: String, required: true, default: () => randomUUID() },
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
  },
  {
    toJSON: {
      transform(doc, ret, options) {
        const { _id, ...product } = ret;
        product.id = _id;
        return product;
      },
    },
  },
);

export const productModel = mongoose.model<ProductEntity>('Product', ProductSchema, 'products');
