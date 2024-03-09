import { getProducts, createProduct, getProduct, updateProduct, deleteProduct } from "../database/database_functions/product.js";
import { CustomError, httpStatusCodes } from '../constants/constants.js';
import { errRes, sendResponse } from '../helpers/sendReponse.js';

export const getProductsController = async (req, res, next) => {
  const { page } = req.query;

  try {
    const products = await getProducts(parseInt(page));
    console.log(products.length);
    return sendResponse(res, httpStatusCodes.OK, 'success', 'get all products', products);
  } catch (error) {
    return errRes(new CustomError(httpStatusCodes["Bad Request"], error.message), req, res, next);
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
    return errRes(new CustomError(httpStatusCodes["Bad Request"], error.message), req, res, next);
  }
}

export const createProductController = async (req, res, next) => {
  const { name, price } = req.body;
  const { _id } = req.body.decoded;

  try {
    const product = await createProduct({ name, price, user_id:_id });
    return sendResponse(res, httpStatusCodes.Created, 'success', 'product created', product);
  } catch (error) {
    return errRes(new CustomError(httpStatusCodes["Bad Request"], error.message), req, res, next);
  }
}

export const updateProductController = async (req, res, next) => {
  const body = req.body;
  const { id } = req.params;
  const dataToUpdate = {};
  if (body.name) dataToUpdate.name = body.name;
  if (body.price) dataToUpdate.price = body.price;

  try {
    const product = await getProduct(id);

    if (!product) return errRes({
      message: 'product with given id does not exists',
      status: httpStatusCodes["Not Found"]
    }, req, res, next);

    // If the user(seller) tries to update a product which is not created/owned by them 
    if (req.body.decoded._id !== product.seller._id.toString()) {
      return errRes({
        message: "Forbidden",
        status: httpStatusCodes.Forbidden
      }, req, res, next);
    }

    await updateProduct(id, dataToUpdate);
    return sendResponse(res, httpStatusCodes.OK, 'success', 'update product', null);
  } catch (error) {
    return errRes(new CustomError(httpStatusCodes["Bad Request"], error.message), req, res, next);
  }
}

export const deleteProductContoller = async (req, res, next) => {
  const { id } = req.params;

  try {
    const product = await getProduct(id);

    if (!product) return errRes({
      message: 'product with given id does not exists',
      status: httpStatusCodes["Not Found"]
    }, req, res, next);

    // If the user(seller) tries to delete a product which is not created/owned by them 
    if (req.body.decoded._id !== product.seller._id.toString()) {
      return errRes({
        message: "Forbidden",
        status: httpStatusCodes.Forbidden
      }, req, res, next);
    }

    await deleteProduct(id);
    return sendResponse(res, httpStatusCodes.OK, 'success', 'delete product', null);
  } catch (error) {
    return errRes(new CustomError(httpStatusCodes["Bad Request"], error.message), req, res, next);
  }
}