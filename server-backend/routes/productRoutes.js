const express = require('express');
const productRouter = express.Router();
const {
  createProduct,
  updateProduct,
  deleteProduct,
  getProducts,
  getProductById,
  getSellerProducts,createProductByAdmin
} = require('../controllers/productController');

const authUser = require('../middlewares/authUser');
const authAdmin = require('../middlewares/authAdmin');
const authSeller = require('../middlewares/authSeller');

const upload = require('../middlewares/multer');


// PUBLIC ROUTES (No auth required)
productRouter.get('/', getProducts); // Browse all products
productRouter.get('/:id', getProductById); // Get single product


// SELLER ROUTES (Auth: User + Seller)
productRouter.post('/seller', upload.single('image'), authUser, authSeller, createProduct); // Seller creates product
productRouter.get('/seller/my-products', authUser, authSeller, getSellerProducts); // Seller views their products
productRouter.put('/seller/:id', authUser, authSeller, updateProduct); // Seller updates THEIR product
productRouter.delete('/seller/:id', authUser, authSeller, deleteProduct); // Seller deletes THEIR product

// // ADMIN ROUTES (Auth: User + Admin)
productRouter.post('/admin', upload.single('image'), authUser, authAdmin, createProductByAdmin); // Admin creates product
productRouter.put('/admin/:id', authUser, authAdmin, updateProduct); // Admin updates ANY product
productRouter.delete('/admin/:id', authUser, authAdmin, deleteProduct); // Admin deletes ANY product

module.exports = productRouter;