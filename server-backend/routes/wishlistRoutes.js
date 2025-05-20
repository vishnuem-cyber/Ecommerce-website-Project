const express = require('express');
const wishlistRouter = express.Router();
const {
  addToWishlist,
  getWishlist,
  removeFromWishlist
} = require('../controllers/wishlistController');
const authUser = require('../middlewares/authUser');

// Add to wishlist
wishlistRouter.post('/', authUser, addToWishlist);

// Get wishlist
wishlistRouter.get('/', authUser, getWishlist);

// Remove from wishlist
wishlistRouter.delete('/:id', authUser, removeFromWishlist);

module.exports = wishlistRouter;
