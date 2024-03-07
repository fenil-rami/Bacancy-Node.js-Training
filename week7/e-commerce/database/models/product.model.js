import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'product must have a name'],
    maxLength: [50, 'product name cannot be more than 50 characters']
  },
  price: {
    type: Number,
    required: [true, 'product must have a price'],
  },
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, 'product must have a seller id'],
    ref: 'User'
  }
}, { timestamps: true });

export const productModel = mongoose.model('Product', productSchema);