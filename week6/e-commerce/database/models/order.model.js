import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  items: {
    type : Object,
    required: [true, 'order must contain items']
  },
  buyer: {
    type: String,
    required: [true, 'order must contain buyer id']
  }
},
{ timestamps: true });

export const orderModel = mongoose.model('Order', orderSchema);