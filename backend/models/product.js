const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
  productName: {
    type: String,
    required: true
  },
  brandName: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    productImage: {
        type: Array,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    sellingPrice: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    }
},{
    timestamps: true
});

module.exports = mongoose.model('product', productSchema);