import mongoose from 'mongoose';

const cartSchema = new mongoose.Schema({
  product_id: {
    type: String,
    required:[true, 'cart must have a product id'],
  },
  product_name: {
    type: String,
    required:[true, 'cart must have a product name']
  },
  product_price: {
    type: Number,
    required:[true, 'cart must have a product price']
  },
  buyer: {
    type: String,
    required: [true, 'cart must have a buyer id'],
  }
}, { timestamps: true });

export const cartModel = mongoose.model('Cart', cartSchema); 