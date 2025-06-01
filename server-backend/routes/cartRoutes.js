const express = require('express');
const cartRouter = express.Router();

const {
  createCart,
  getCart,
  updateCart,
  removeFromCart,
  clearCart,
  deleteCart
} = require('../controllers/cartController');

const authUser = require('../middlewares/authUser');

//   Add product to Cart (Create or Add Item)
cartRouter.post('/', authUser, createCart);

  // Get Cart by User ID
cartRouter.get('/:userId', authUser, getCart);

//   Update Cart (e.g., change quantity)
cartRouter.put('/:id', authUser, updateCart);

//  Remove Single Item from Cart
cartRouter.put('/:id/remove', authUser, removeFromCart);

//  Clear All Items from Cart
cartRouter.delete('/:userId/clear', authUser, clearCart);

//  Delete Entire Cart Document
cartRouter.delete('/:id', authUser, deleteCart);

module.exports = cartRouter;
