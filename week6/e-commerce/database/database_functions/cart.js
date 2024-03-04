import { cartModel } from "../models/cart.model.js";
import { orderModel } from "../models/order.model.js";
import mongoose from 'mongoose';
const db = mongoose.connection;

export const getCartItem = async (cartId) => new Promise(async (resolve, reject) => {
  try {
    const cartItem = await cartModel.findById(cartId).lean();
    resolve(cartItem);
  } catch (error) {
    reject(error);
  }
})

export const getAllCartItems = async (buyerId) => new Promise(async (resolve, reject) => {
  try {
    const cartItems = await cartModel.find({ buyer: buyerId }).lean();
    resolve(cartItems);
  } catch (error) {
    reject(error);
  }
})

export const createCartItem = async (cartData) => new Promise(async (resolve, reject) => {
  try {
    const cartItem = await cartModel.create(cartData);
    resolve(cartItem);
  } catch (error) {
    reject(error);
  }
})

export const deleteCartItem = async (cartId) => new Promise(async (resolve, reject) => {
  try {
    const cartItem = await cartModel.findByIdAndDelete(cartId).lean();
    resolve(cartItem);
  } catch (error) {
    reject(error);
  }
})

export const placeOrder = async (buyerId) => new Promise(async (resolve, reject) => {
  const session = await db.startSession();

  // start of the transaction
  session.startTransaction();

  try {
    // generate order summary
    const cartItems = await cartModel.aggregate([
      {
        $match: { buyer: buyerId }
      },
      {
        $group: {
          _id: crypto.randomUUID(),
          cartItems: { $push: '$$ROOT' },
          totalAmount: { $sum: '$product_price' }
        }
      }
    ])

    // No items in cart, so cant place order
    if (!cartItems || cartItems === undefined || cartItems.length === 0) {
      await session.abortTransaction();
      session.endSession();
      resolve(null);
      return;
    }

    // delete items from cart
    await cartModel.deleteMany({ buyer: buyerId }).lean();

    // save order history 
    const orderSummary = await orderModel.create({ data: cartItems, buyer: buyerId });

    // commit transaction
    await session.commitTransaction();

    // end of the transaction
    session.endSession();

    resolve(orderSummary);
  } catch (error) {
    reject(error);
  }
})

export const getOrderHistory = async (buyerId) => new Promise(async (resolve, reject) => {
  try {
    const orders = await orderModel.find({ buyer: buyerId }).lean();
    resolve(orders);
  } catch (error) {
    reject(error);
  }
})