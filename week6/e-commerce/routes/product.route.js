import express from 'express'
import { getProductsController, createProductController, getProductController, updateProductController, deleteProductContoller } from '../controllers/product.controller.js';

const productRouter = express.Router();

productRouter.get('/', getProductsController)
productRouter.get('/:id', getProductController);
productRouter.post('/', createProductController);
productRouter.put('/:id', updateProductController);
productRouter.delete('/:id', deleteProductContoller);

export { productRouter }