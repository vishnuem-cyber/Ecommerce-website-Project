const express = require('express');
const sellerRouter = express.Router();
const {getSellerProfile,updateSellerProfile,addProduct,updateProduct,deleteProduct,getSellerProducts,
  getSellerOrders,updateOrderStatus} = require('../controllers/sellerController');
const authSeller = require('../middlewares/authSeller');


//  seller profile
// GET /api/seller/profile 
sellerRouter.get('/profile', authSeller, getSellerProfile);

//Update seller profile
// PATCH /api/seller/profile 
sellerRouter.patch('/profile', authSeller, updateSellerProfile);


//Add new product
// POST /api/seller/products 
sellerRouter.post('/products', authSeller, addProduct);

//update product
// PATCH /api/seller/products/:productId 
sellerRouter.patch('/products/:productId', authSeller, updateProduct);

//Delete product
// DELETE /api/seller/products/:productId 
sellerRouter.delete('/products/:productId', authSeller, deleteProduct);

//Get all seller's products
// GET /api/seller/products 
sellerRouter.get('/products', authSeller, getSellerProducts);



// Seller's orders

//Getseller's orders
// GET /api/seller/orders 
sellerRouter.get('/orders', authSeller, getSellerOrders);

//Update order status
// PATCH /api/seller/orders/:orderId 
sellerRouter.patch('/orders/:orderId', authSeller, updateOrderStatus);


module.exports = sellerRouter;