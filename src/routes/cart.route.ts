import { Router } from 'express';
import * as cartController from '../controllers/cart.controller';
import { validateUpdateUserCartMiddleware } from '../middlewares/validateUpdateUserCart.middleware';

export const cartRouter = Router();

cartRouter.get('/profile/cart', cartController.getOrCreateUserCart);
cartRouter.delete('/profile/cart', cartController.deleteUserCart);
cartRouter.put('/profile/cart', validateUpdateUserCartMiddleware, cartController.updateUserCart);
cartRouter.post('/profile/cart/checkout', cartController.checkoutUserCart);
