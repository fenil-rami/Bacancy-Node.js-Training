import { getProducts, createProduct, getProduct, updateProduct, deleteProduct } from "../database/database_functions/product.js";
import { httpStatusCodes } from '../constants/constants.js';
import { errRes, sendResponse } from '../helpers/sendReponse.js';

export const getProductsController = async (req, res, next) => {
  try {
    const products = await getProducts();
    return sendResponse(res, httpStatusCodes.OK, 'success', 'get all products', products);
  } catch (error) {
    next(error);
  }
}

export const getProductController = async (req, res, next) => {
  const { id } = req.params;
  try {
    const product = await getProduct(id);
    if (!product) return errRes({
      message: 'product with given id does not exsits',
      status: httpStatusCodes["Not Found"]
    }, req, res, next)
    return sendResponse(res, httpStatusCodes.OK, 'success', 'get product from id', product);
  } catch (error) {
    next(error);
  }
}

export const createProductController = async (req, res, next) => {
  const { name, price, seller } = req.body;
  try {
    const product = await createProduct({ name, price, seller });
    return sendResponse(res, httpStatusCodes.Created, 'success', 'product created', product);
  } catch (error) {
    next(error);
  }
}

export const updateProductController = async (req, res, next) => {
  const body = req.body;
  const { id } = req.params;
  const dataToUpdate = {};
  if (body.name) dataToUpdate.name = body.name;
  if (body.price) dataToUpdate.price = body.price;

  try {
    const product = await updateProduct(id, dataToUpdate);
    if (!product) return errRes({
      message: 'product with given id does not exists',
      status: httpStatusCodes["Not Found"]
    }, req, res, next);
    return sendResponse(res, httpStatusCodes.OK, 'success', 'update product', null);
  } catch (error) {
    next(error);
  }
}

export const deleteProductContoller = async (req, res, next) => {
  const { id } = req.params;

  try {
    const product = await deleteProduct(id);
    if (!product) return errRes({
      message: 'product with given id does not exists',
      status: httpStatusCodes["Not Found"]
    }, req, res, next);
    return sendResponse(res, httpStatusCodes.OK, 'success', 'delete product', null);
  } catch (error) {
    next(error);
  }
}