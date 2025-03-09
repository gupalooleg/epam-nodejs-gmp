import { Router } from 'express';
import * as productController from '../controllers/product.controller';

export const productRouter = Router();

productRouter.get('/products', productController.getAllProducts);
productRouter.get('/products/:id', productController.getProductById);
