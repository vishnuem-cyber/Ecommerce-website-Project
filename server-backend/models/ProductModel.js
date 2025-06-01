const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    image: {
      type: String, // URL or filename
      required: true,
    },

    demoVideo: {
      type: String, // URL or filename
      default: '',
    },
    category: {
      type: String,
      default: 'general',
    },
    stock: {
      type: Number,
      default: 1,
    },
    ratings: {
      type: Number,
      default: 0,
    },
    numReviews: {
      type: Number,
      default: 0,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Seller',
      required: true,
    },
  },
  { timestamps: true }
);

module.exports =  mongoose.model('Product', productSchema);
