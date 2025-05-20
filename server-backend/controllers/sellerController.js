// sellerController.js
const Seller = require('../models/SellerModel');
const Product = require('../models/ProductModel');
const Order = require('../models/OrderModel');
const bcrypt = require('bcrypt');
const createToken = require('../utils/generateToken');

// Get seller profile
const getSellerProfile = async (req, res) => {
  try {
    const seller = await Seller.findById(req.user.id).select('-password');
    if (!seller) return res.status(404).json({ error: 'Seller not found' });
    res.status(200).json({ seller });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Update seller profile
const updateSellerProfile = async (req, res) => {
  try {
    const updates = req.body;
    if (updates.password) {
      const salt = await bcrypt.genSalt(10);
      updates.password = await bcrypt.hash(updates.password, salt);
    }
    const updatedSeller = await Seller.findByIdAndUpdate(req.user.id, updates, {
      new: true,
    }).select('-password');

    res.status(200).json({ message: 'Profile updated', updatedSeller });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Add new product
const addProduct = async (req, res) => {
  try {
    const { name, description, price, stock, imageUrl } = req.body;
    const product = new Product({
      name,
      description,
      price,
      stock,
      imageUrl,
      seller: req.user.id,
    });
    await product.save();
    res.status(201).json({ message: 'Product added', product });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Update product
const updateProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const updates = req.body;

    const product = await Product.findOneAndUpdate(
      { _id: productId, seller: req.user.id },
      updates,
      { new: true }
    );

    if (!product) return res.status(404).json({ error: 'Product not found' });

    res.status(200).json({ message: 'Product updated', product });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Delete product
const deleteProduct = async (req, res) => {
  try {
    const { productId } = req.params;

    const product = await Product.findOneAndDelete({
      _id: productId,
      seller: req.user.id,
    });

    if (!product) return res.status(404).json({ error: 'Product not found' });

    res.status(200).json({ message: 'Product deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get all seller's products
const getSellerProducts = async (req, res) => {
  try {
    const products = await Product.find({ seller: req.user.id });
    res.status(200).json({ products });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get seller orders
const getSellerOrders = async (req, res) => {
  try {
    const orders = await Order.find({ 'items.seller': req.user.id });
    res.status(200).json({ orders });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Update order status
const updateOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    const order = await Order.findOneAndUpdate(
      { _id: orderId, 'items.seller': req.user.id },
      { $set: { 'items.$.status': status } },
      { new: true }
    );

    if (!order) return res.status(404).json({ error: 'Order not found' });

    res.status(200).json({ message: 'Order status updated', order });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  getSellerProfile,
  updateSellerProfile,
  addProduct,
  updateProduct,
  deleteProduct,
  getSellerProducts,
  getSellerOrders,
  updateOrderStatus,
};
