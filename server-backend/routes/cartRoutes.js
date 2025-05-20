const express = require('express');
const cartRouter = express.Router();
const { createCart, getCart, updateCart, deleteCart } = require('../controllers/cartController');


const authUser = require('../middlewares/authUser');



// Create a new cart
cartRouter.post('/', authUser, createCart);

// Get cart by user ID
cartRouter.get('/:userId', authUser, getCart);

// Update cart
cartRouter.put('/:id', authUser, updateCart);

// Delete cart
cartRouter.delete('/:id', authUser, deleteCart);

module.exports = cartRouter;
  
