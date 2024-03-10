import sequelize from "../connect.js";
import { Cart } from "../models/cart.model.js";
import { getProduct } from "./product.js";
import { getUser } from "./user.js";
import { Order } from "../models/order.model.js";
import { Order_Product } from "../models/order_product.model.js";

export const getCartItem = async (cartId) => new Promise(async (resolve, reject) => {
  try {
    const cartItem = await Cart.findByPk(cartId);
    resolve(cartItem);
  } catch (error) {
    reject(error);
  }
})

export const getAllCartItems = async (buyerId) => new Promise(async (resolve, reject) => {
  try {
    const cartItems = await Cart.findAll({
      where: {
        user_id: buyerId
      }
    });
    resolve(cartItems);
  } catch (error) {
    reject(error);
  }
})

export const createCartItem = async (cartData) => new Promise(async (resolve, reject) => {
  const t = await sequelize.transaction();
  try {
    const { user_id, product_id } = cartData;
    const user = await getUser(user_id);
    const product = await getProduct(product_id);

    if (!user) {
      await t.rollback();
      reject({
        message: 'User with given id does not exists'
      });
      return;
    }

    if (!product) {
      await t.rollback();
      reject({
        message: 'Product with given id does not exists'
      });
      return;
    }

    const new_cartItem = await Cart.create({
      user_id,
      product_id
    }, {
      transaction: t
    })

    await new_cartItem.setUser(user, { transaction: t })
    await new_cartItem.setProduct(product, { transaction: t })
    await t.commit();
    resolve(new_cartItem);
  } catch (error) {
    await t.rollback();
    reject(error);
  }
})

export const deleteCartItem = async (cartId) => new Promise(async (resolve, reject) => {
  try {
    await Cart.destroy({
      where: {
        _id: cartId
      }
    })
    resolve();
  } catch (error) {
    reject(error);
  }
})

export const placeOrder = async (buyerId) => new Promise(async (resolve, reject) => {
  const t = await sequelize.transaction();

  try {
    // get all cart items 
    const cartItems = await getAllCartItems(buyerId);

    // No items in cart, so cant place order
    if (!cartItems || cartItems === undefined || cartItems.length === 0) {
      await t.rollback();
      reject({
        message: 'No items in cart to make order'
      })
      return;
    }

    // delete items from cart
    await Cart.destroy({
      where: {
        user_id: buyerId
      }
    }, { transaction: t })

    // save order history
    const order = await Order.create({
      user_id: buyerId,
    }, {
      transaction: t
    })

    let orderProducts = [];

    // save all the products in order
    for (let i = 0; i < cartItems.length; i++) {
      const orderProduct = await Order_Product.create({
        order_id: order._id,
        product_id: cartItems[i].product_id
      }, {
        transaction: t
      })

      orderProducts.push(orderProduct.product_id);
    }

    // commit transaction
    await t.commit();

    resolve({
      order: order,
      products: orderProducts
    });
  } catch (error) {
    await t.rollback();
    console.log('Error ', error);
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