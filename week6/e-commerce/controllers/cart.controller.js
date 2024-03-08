import { getCartItem, getAllCartItems, createCartItem, deleteCartItem, placeOrder, getOrderHistory } from "../database/database_functions/cart.js"
import { httpStatusCodes } from '../constants/constants.js';
import { errRes, sendResponse } from '../helpers/sendReponse.js';
import { getProduct } from "../database/database_functions/product.js";

export const getCartItemsController = async (req, res, next) => {
  const { id } = req.params;

  try {
    const cartItems = await getAllCartItems(id);

    if (!cartItems) return errRes({ message: "Cart item with given buyer id does not exists", status: httpStatusCodes["Not Found"] }, req, res, next);

    return sendResponse(res, httpStatusCodes.OK, 'success', 'get cart items', cartItems);
  } catch (error) {
    return errRes(new CustomError(httpStatusCodes['Bad Request'], error.message), req, res, next);
  }
}

export const createCartItemController = async (req, res, next) => {
  const { id } = req.params;
  const { product_id } = req.body;

  try {
    const product_data = await getProduct(product_id);

    if (!product_data) return errRes({
      message: 'product with given id does not exists',
      status: httpStatusCodes["Not Found"]
    }, req, res, next);

    const cartItem = await createCartItem({
      product_id: product_data._id.toString(),
      product_name: product_data.name,
      product_price: product_data.price,
      buyer: id
    });

    return sendResponse(res, httpStatusCodes.Created, 'success', 'create cart item', cartItem);
  } catch (error) {
    return errRes(new CustomError(httpStatusCodes['Bad Request'], error.message), req, res, next);
  }
}

export const deleteCartItemController = async (req, res, next) => {
  const { id } = req.params;
  const { cartItemId } = req.body;

  try {
    const cartItem = await getCartItem(cartItemId);

    if (!cartItem) return errRes({ message: 'cart item with given id does not exists', status: httpStatusCodes["Not Found"] }, req, res, next);

    // If user tries to delete cart item of another user
    if (cartItem.buyer !== id) {
      return errRes({ message: 'Forbidden', status: httpStatusCodes.Forbidden }, req, res, next);
    }

    await deleteCartItem(cartItemId);
    return sendResponse(res, httpStatusCodes.OK, 'success', 'delete cart item', null);
  } catch (error) {
    return errRes(new CustomError(httpStatusCodes['Bad Request'], error.message), req, res, next);
  }
}

export const placeOrderController = async (req, res, next) => {
  const { id } = req.params;

  try {
    const orderData = await placeOrder(id);

    if (!orderData) {
      return errRes({ message: 'invalid order', status: httpStatusCodes["Bad Request"] }, req, res, next);
    }

    return sendResponse(res, httpStatusCodes.OK, 'success', 'place order', orderData);
  } catch (error) {
    return errRes(new CustomError(httpStatusCodes['Bad Request'], error.message), req, res, next);
  }
}

export const getOrderHistoryController = async (req, res, next) => {
  const { id } = req.params;
  try {
    const orders = await getOrderHistory(id);

    if(!orders) {
      return errRes({
        message: "bad request",
        status: httpStatusCodes["Bad Request"]
      }, req, res, next);
    }

    return sendResponse(res, httpStatusCodes.OK, 'success', 'get order history', orders);
  } catch (error) {
    return errRes(new CustomError(httpStatusCodes['Bad Request'], error.message), req, res, next);
  }
}