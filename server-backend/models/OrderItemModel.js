// const mongoose = require('mongoose');

// const orderItemSchema = new mongoose.Schema({
//   product: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Product',
//     required: true,
//   },
//   quantity: {
//     type: Number,
//     required: true,
//     min: 1,
//   },
//   price: {
//     type: Number,
//     required: true,
//   },
//   seller: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Seller',
//     required: true,
//   },
// });

// const orderSchema = new mongoose.Schema(
//   {
//     user: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: 'User',
//       required: true,
//     },
//     items: [orderItemSchema],
//     shippingAddress: {
//       fullName: String,
//       address: String,
//       city: String,
//       postalCode: String,
//       country: String,
//     },
//     paymentMethod: {
//       type: String,
//       enum: ['COD', 'Credit Card', 'Debit Card', 'UPI', 'Wallet', 'Net Banking', 'Other'], // example methods
//       default: 'COD',
//     },
//     paymentStatus: {
//       type: String,
//       enum: ['Pending', 'Paid', 'Failed'],
//       default: 'Pending',
//     },
//     totalPrice: {
//       type: Number,
//       required: true,
//     },
//     status: {
//       type: String,
//       enum: ['Processing', 'Shipped', 'Delivered', 'Cancelled'],
//       default: 'Processing',
//     },
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model('Order', orderSchema);
