import sequelize from "../connect.js";
import { Product } from "../models/product.model.js";
import { User } from "../models/user.model.js";
import { getUser } from "./user.js";


export const getProducts = async (page) => new Promise(async (resolve, reject) => {
  const limit = 10;
  const offset = (page - 1) * limit;

  try {
    let products;

    // If pagination is not applied
    if (!page || page === undefined) products = await Product.findAll();

    // pagination is applied
    else products = await Product.findAll({
      offset: offset,
      limit: limit
    })

    resolve(products);
  } catch (error) {
    reject(error);
  }
})

export const getProduct = async (productId) => new Promise(async (resolve, reject) => {
  try {
    const product = await Product.findByPk(productId);
    resolve(product);
  } catch (error) {
    reject(error);
  }
})

export const createProduct = async (productData) => new Promise(async (resolve, reject) => {
  const t = await sequelize.transaction()

  try {
    const { user_id, name, price } = productData;
    const user = await getUser(user_id);

    if (!user) {
      await t.rollback();
      reject('User with given id does not exists');
      return;
    }

    const new_product = await Product.create({ user_id, name, price }, { transaction: t })
    await new_product.setUser(user, { transaction: t })
    await t.commit();
    resolve(new_product);
  } catch (error) {
    await t.rollback()
    reject(error);
  }
})

export const updateProduct = async (productId, productData) => new Promise(async (resolve, reject) => {
  try {
    await Product.update(productData, {
      where: {
        _id: productId
      }
    })
    resolve();
  } catch (error) {
    reject(error);
  }
})

export const deleteProduct = async (productId) => new Promise(async (resolve, reject) => {
  try {
    await Product.destroy({
      where: {
        _id: productId
      }
    })
    resolve();
  } catch (error) {
    reject(error);
  }
})