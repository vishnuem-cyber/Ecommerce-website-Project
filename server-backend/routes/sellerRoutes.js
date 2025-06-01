const express = require('express');
const sellerRouter = express.Router();
const {registerSeller,loginSeller,logoutSeller,
  getSellerProfile,updateSellerProfile,} = require('../controllers/sellerController');
const authSeller = require('../middlewares/authSeller');
const authAdmin = require('../middlewares/authAdmin');


//  seller profile

//Seller Registration
// POST /api/seller/register
sellerRouter.post('/register', registerSeller);

//Seller login
// POST /api/seller/login
sellerRouter.post('/login', loginSeller);

// GET /api/seller/profile 
sellerRouter.get('/profile', authSeller, getSellerProfile);

//Update seller profile
// PATCH /api/seller/update
sellerRouter.patch('/update', authSeller, updateSellerProfile);

//Logout seller
// POST /api/seller/logout
sellerRouter.post('/logout', logoutSeller);





// //Add new product
// // POST /api/seller/products 
// sellerRouter.post('/products', authSeller, addProduct);

// //update product
// // PATCH /api/seller/products/:productId 
// sellerRouter.patch('/products/:productId', authSeller, updateProduct);

// //Delete product
// // DELETE /api/seller/products/:productId 
// sellerRouter.delete('/products/:productId', authSeller, deleteProduct);

// //Get all seller's products
// // GET /api/seller/products 
// sellerRouter.get('/products', authSeller, getSellerProducts);



// // Seller's orders

// //Getseller's orders
// // GET /api/seller/orders 
// sellerRouter.get('/orders', authSeller, getSellerOrders);

// //Update order status
// // PATCH /api/seller/orders/:orderId 
// sellerRouter.patch('/orders/:orderId', authSeller, updateOrderStatus);


module.exports = sellerRouter;