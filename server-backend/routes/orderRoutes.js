const express = require('express');
const orderRouter = express.Router();
const {
  createOrder,
  getOrderById,
  updateOrder,
  deleteOrder,
  getAllOrders,
  getUserOrders
} = require('../controllers/orderController');
const authUser = require('../middlewares/authUser');
const authAdmin = require('../middlewares/authAdmin');

// Create a new order
orderRouter.post('/', authUser, createOrder);

// Get order by ID
orderRouter.get('/:id', authUser, getOrderById);

// Update order
orderRouter.put('/:id', authUser, updateOrder);

// Delete order
orderRouter.delete('/:id', authUser, deleteOrder);

// Get all orders (Admin)
orderRouter.get('/', authAdmin, getAllOrders);

// Get orders for a specific user
orderRouter.get('/user/:userId', authUser, getUserOrders);
// Get orders for a specific seller
orderRouter.get('/seller/:sellerId', authUser, getUserOrders);


module.exports = orderRouter;