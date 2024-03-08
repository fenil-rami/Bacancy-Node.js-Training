import { Product } from "../models/product.model.js";


export const getProducts = async (page) => new Promise(async (resolve, reject) => {
  const pageSize = 10;
  const skip = (page - 1) * pageSize;

  try {
    let products;
    
    // If pagination is not applied
    if(!page || page===undefined) products = await productModel.find().lean().populate('seller', '-password').lean();

    // pagination is applied
    else products = await productModel.find().skip(skip).limit(pageSize).lean().populate('seller', '-password').lean();

    resolve(products);
  } catch (error) {
    reject(error);
  }
})

export const getProduct = async (productId) => new Promise(async (resolve, reject) => {
  try {
    const product = await productModel.findById(productId).lean().populate('seller', '-password').lean();
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