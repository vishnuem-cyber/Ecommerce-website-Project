const { cloudinaryInstance } = require('../config/cloudinary');
const Product = require('../models/ProductModel');
const Seller = require('../models/SellerModel');

//  Get all products (public)
const getProducts = async (req, res) => {
  try {
    const products = await Product.find().populate('seller', 'storeName'); // optional populate seller info
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
}



//  Get product by ID (public)
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate('seller', 'storeName');
    if (!product) return res.status(404).json({ error: 'Product not found' });

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
};



// create product by seller (seller only)
const createProduct = async (req, res, next) => {
  try {
    console.log("Request Body:", req.body); // Debug log
    const { name, description, price, category } = req.body;

    

    if (!name || !description || !price || !category) {
      return res.status(400).json({ error: "Name, description, price, and category are required" });
    }

    if (!req.file) {
      return res.status(400).json({ error: "Product image is required" });
    }
    // take files from mutler
    const file = req.file;
    // console.log("Uploaded file:", file); // Debug log

    const cloudinaryResponse = await cloudinaryInstance.uploader.upload(req.file.path)

    // console.log( cloudinaryResponse); // Debug log
    const sellerId = req.seller._id;
    const newProduct = new Product({
      name,
      description,
      price,
      category,
      image:cloudinaryResponse.secure_url,
      seller: sellerId,
    });

    const savedProduct = await newProduct.save();
    res.status(201).json({
  success: true,
  message: "Product created successfully",
  product: savedProduct,
});
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};



// Admin creates product

const createProductByAdmin = async (req, res) => {
  try {
    const { name, description, price, category, sellerId } = req.body;

    // Check for missing required fields
    if (!name || !description || !price || !category || !sellerId) {
      return res.status(400).json({ error: "Name, description, price, category, and sellerId are required" });
    }

    // Check if image file is provided
    if (!req.file) {
      return res.status(400).json({ error: "Product image is required" });
    }

    // Upload image to Cloudinary
    const cloudinaryResponse = await cloudinaryInstance.uploader.upload(req.file.path);

    // Create new product
    const newProduct = new Product({
      name,
      description,
      price,
      category,
      image: cloudinaryResponse.secure_url,
      seller: sellerId,
    });

    const savedProduct = await newProduct.save();

    return res.status(201).json({
      success: true,
      message: "Product created by admin successfully",
      product: savedProduct,
    });
  } catch (error) {
    console.error("Admin Product Creation Error:", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};






//  Get seller's own products (seller only)
const getSellerProducts = async (req, res) => {
  try {
    console.log('req.user.id:', req.user.id); // should log seller userId

    const seller = await Seller.findOne({ userId: req.user.id });

    if (!seller) {
      return res.status(404).json({ error: 'Seller profile not found' });
    }

    const products = await Product.find({ seller: seller._id });

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
};



//  Update product (seller or admin)
const updateProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const updates = req.body;

    let product;

    if (req.user.role === 'admin') {
      // Admin can update any product
      product = await Product.findByIdAndUpdate(productId, updates, { new: true });
    } else if (req.user.role === 'seller') {
      // Seller can update only their own product
      product = await Product.findOneAndUpdate(
        { _id: productId, seller: req.seller._id },
        updates,
        { new: true }
      );
    } else {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    if (!product) {
      return res.status(404).json({ error: 'Product not found or unauthorized' });
    }

    res.status(200).json({ message: 'Product updated', product });
  } catch (error) {
    res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
};


//  Delete product (seller or admin)
const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    let deletedProduct;

    if (req.user.role === 'admin') {
      // Admin can delete any product
      deletedProduct = await Product.findByIdAndDelete(productId);
    } else if (req.user.role === 'seller') {
      // Seller can delete only their own product
      deletedProduct = await Product.findOneAndDelete({
        _id: productId,
        seller: req.seller._id,  // use seller _id from DB
      });
    } else {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    if (!deletedProduct) {
      return res.status(404).json({ error: 'Product not found or unauthorized' });
    }

    res.status(200).json({ message: 'Product deleted successfully', product: deletedProduct });
  } catch (error) {
    res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
};


module.exports = {
  getProducts,
  getProductById,
  getSellerProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  createProductByAdmin
};