const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  category: { type: String, enum: ['beer', 'wine', 'whiskey', 'vodka', 'rum', 'other'], required: true },
  image: { type: String },
  stock: { type: Number, default: 0 },
  isAvailable: { type: Boolean, default: true }
});

module.exports = mongoose.model('Product', productSchema);