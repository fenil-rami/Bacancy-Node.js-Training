import { productModel } from "../models/product.model.js";

export const getProducts = async () => new Promise(async (resolve, reject) => {
  try {
    const products = await productModel.find().lean().populate('seller', '-password').lean();
    resolve(products);
  } catch (error) {
    reject(error);
  }
})

export const getProduct = async (producId) => new Promise(async (resolve, reject) => {
  try {
    const product = await productModel.findById(producId).lean().populate('seller', '-password').lean();
    resolve(product);
  } catch (error) {
    reject(error);
  }
})

export const createProduct = async (productData) => new Promise(async (resolve, reject) => {
  try {
    const product = await productModel.create(productData);
    resolve(product);
  } catch (error) {
    reject(error);
  }
})

export const updateProduct = async (productId, productData) => new Promise(async (resolve, reject) => {
  try {
    await productModel.findByIdAndUpdate(productId, productData).lean().populate('seller', '-password').lean();
    resolve();
  } catch (error) {
    reject(error);
  }
})

export const deleteProduct = async (productId) => new Promise(async (resolve, reject) => {
  try {
    await productModel.findByIdAndDelete(productId).lean();
    resolve();
  } catch (error) {
    reject(error);
  }
})