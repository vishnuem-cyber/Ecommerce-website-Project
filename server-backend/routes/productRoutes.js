// const express = require('express');
// const productRouter = express.Router();
// const {
//   createProduct,
//   updateProduct,
//   deleteProduct,
//   getProducts,
//   getProductById,
//   getSellerProducts,
// } = require('../controllers/productController');

// const authUser = require('../middlewares/authUser');
// const authAdmin = require('../middlewares/authAdmin');
// const authSeller = require('../middlewares/authSeller');


// // user routes (No auth)

// // All users browse products
// productRouter.get('/', getProducts); 
// // Get single product
// productRouter.get('/:id', getProductById); 


// // SELLER ROUTES (Auth: User + Seller)

// // Seller creates product
// productRouter.post('/', authUser, authSeller, createProduct);

// // Seller views their own products
// productRouter.get('/seller/my-products', authUser, authSeller, getSellerProducts);

// // Seller updates their own product
// productRouter.put('/seller/:id', authUser, authSeller, updateProduct); 

// // Seller deletes their own product
// productRouter.delete('/seller/:id', authUser, authSeller, deleteProduct); 


// // ADMIN ROUTES (Auth: User + Admin)

// // Admin creates product
// productRouter.post('/admin', authUser, authAdmin, createProduct); 

// // Admin updates ANY product
// productRouter.put('/admin/:id', authUser, authAdmin, updateProduct); 

// // Admin deletes ANY product
// productRouter.delete('/admin/:id', authUser, authAdmin, deleteProduct); 

// module.exports = productRouter;