// routes/paymentRoutes.js
const express = require('express');
const paymentRouter = express.Router();

const {   } = require('../controllers/paymentController');
const authUser = require('../middlewares/authUser');


// Initiate payment
paymentRouter.post('/initiate', authUser, initiatePayment);

// Verify payment
paymentRouter.post('/verify', authUser, verifyPayment);

module.exports = paymentRouter;
