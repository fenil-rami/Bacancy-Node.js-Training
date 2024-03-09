import express from 'express'
import { getCartItemsController, createCartItemController, deleteCartItemController, placeOrderController, getOrderHistoryController } from '../controllers/cart.controller.js'
import { buyercartVerification } from '../middlewares/token_verification.js';

const cartRouter = express.Router();

cartRouter.get('/:id', buyercartVerification, getCartItemsController);
cartRouter.post('/', buyercartVerification, createCartItemController);
cartRouter.delete('/:id', buyercartVerification, deleteCartItemController);
cartRouter.post('/orders/:id', buyercartVerification, placeOrderController);
cartRouter.get('/orders/:id', buyercartVerification, getOrderHistoryController);

export { cartRouter };