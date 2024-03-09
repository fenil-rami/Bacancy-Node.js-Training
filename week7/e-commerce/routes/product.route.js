import express from 'express'
import { getProductsController, createProductController, getProductController, updateProductController, deleteProductContoller } from '../controllers/product.controller.js';
import { userTokenVerification } from '../middlewares/token_verification.js';

const productRouter = express.Router();

productRouter.get('/', getProductsController)
productRouter.get('/:id', getProductController);
productRouter.post('/', userTokenVerification,createProductController);
productRouter.put('/:id', userTokenVerification, updateProductController);
productRouter.delete('/:id', userTokenVerification, deleteProductContoller);

export { productRouter }