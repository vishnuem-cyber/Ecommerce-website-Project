// const express = require('express');
// const router = express.Router();
// const authUser = require('../middlewares/authUser');
// const authSeller = require('../middlewares/authSeller');
// const authAdmin = require('../middlewares/authAdmin');

// const {
//   createOrder,
//   getAllOrders,
//   getUserOrders,
//   getSellerOrders,
//   getOrderById,
//   cancelOrder,
//   sellerUpdateOrder,
//   adminUpdateOrder
    
// } = require('../controllers/orderController');

// // User: Create an order
// router.post('/', authUser, createOrder);

// // User: Get their own orders
// router.get('/user/orders', authUser, getUserOrders);


// // User: Get single order (if it's theirs)
// router.get('/:id', authUser, getOrderById);

// // User: Cancel an order (if status is still Pending)
// router.put('/:id/cancel', authUser, cancelOrder);

// // Route for seller to update order status or approve cancellation
// orderRouter.put('/:id/seller-update', authSeller, sellerUpdateOrder);

// // Route for admin to fully update order status or details
// orderRouter.put('/:id/admin-update', authAdmin, adminUpdateOrder);

// // Admin: Get all orders
// router.get('/', authAdmin, getAllOrders);

// // Seller: Get orders related to their products
// router.get('/seller/orders', authSeller, getSellerOrders);

// module.exports = router;
