const express = require('express');
const router = express.Router();

//userRouter
const userRouter = require('./userRoutes');
//api/user
router.use('/user',userRouter);

//adminRouter
const adminRouter = require('./adminRoutes');
//api/admin
router.use('/admin',adminRouter);

//sellerRouter
const sellerRouter = require('./sellerRoutes');
//api/seller
router.use('/seller',sellerRouter);

//productRouter
const productRouter = require('./productRoutes');
//api/product
router.use('/product',productRouter);

// //paymentRouter
// const paymentRouter = require('./paymentRoutes');
// //api/payment
// router.use('/payment',paymentRouter);

// //addressRouter
// const addressRouter = require('./addressRoutes');
// //api/address
// router.use('/address',addressRouter);

// //orderRouter
// const orderRouter = require('./orderRoutes');
// //api/order
// router.use('/orders',orderRouter);

//cartRouter
const cartRouter = require('./cartRoutes');
//api/cart
router.use('/cart',cartRouter);

//wishlistRouter
const wishlistRouter = require('./wishlistRoutes');
//api/wishlist
router.use('/wishlist',wishlistRouter);

//reviewRouter
const reviewRouter = require('./reviewRoutes');
//api/review
router.use('/review',reviewRouter);

//categoryRouter
const categoryRouter = require('./categoryRoutes');
//api/category
router.use('/category',categoryRouter);





module.exports = router;