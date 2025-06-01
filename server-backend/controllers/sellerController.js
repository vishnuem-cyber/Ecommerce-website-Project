// sellerController.js
const user = require('../models/UserModel');
const Seller = require('../models/SellerModel');
// const Product = require('../models/ProductModel');
// const Order = require('../models/OrderModel');
const bcrypt = require('bcrypt');
const createToken = require('../utils/generateToken');


// Seller Registration
const registerSeller = async (req, res) => {
  try {
    //input-variable store
    const { name,email,password,storeName,companyName,gstNumber,phone,address,bio,expertise,profilePic } = req.body;

    //valid input
    if (!name || !email || !password || !storeName || !companyName || 
        !gstNumber || !phone || !address || !bio || !expertise) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    //check if user exists
    const userExists = await user.findOne({ email });
    if (userExists) {
      return res.status(400).json({ error: 'User already exists' });
    }

    //password hashing
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //user save to db
    const newUser = new user({
  name,
  email,
  password: hashedPassword,
  profilePic: profilePic || 'default.jpg',
  role: 'seller',
   
});

const savedUser = await newUser.save();

//create seller document(linked to user)
  const newSeller = new Seller({
  userId: savedUser._id,
  email: savedUser.email,
  storeName,
  companyName,
  gstNumber,
  phone,
  address,
  bio,
  expertise,
  isApproved: false // for admin approval flow

  });

  const savedSeller = await newSeller.save();

    // remove password from user to send back
    const userData = savedUser.toObject();
    delete userData.password;

    res.status(201).json({ message: 'Seller registered. Waiting for admin approval.', userData: userData,
      sellerData: savedSeller });
  } catch (error) {
    console.error(error);
    res.status(error.status || 500).json({ error: error.message || 'Internal Server Error' });
  }
};


// Seller Login
const loginSeller = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // 1. Find the user by email
    const userData = await user.findOne({ email });
    if (!userData) {
      return res.status(404).json({ error: "User not found" });
    }

    // 2. Check role
    if (userData.role !== 'seller') {
      return res.status(403).json({ error: "Not a seller account" });
    }

    // 3. Compare password
    const isMatch = await bcrypt.compare(password, userData.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid password" });
    }

    // 4. Get Seller document linked to userId
    const seller = await Seller.findOne({ userId: userData._id });
    if (!seller) {
      return res.status(404).json({ error: "Seller profile not found" });
    }

    // 5. Check approval
    if (!seller.isApproved) {
      return res.status(403).json({ error: "Your seller account is pending admin approval" });
    }

    // 6. Create token
    const token = createToken(userData._id, 'seller');

    // 7. Set cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
    });

    // 8. Return user and seller data
    const cleanUser = userData.toObject();
    delete cleanUser.password;

    res.status(200).json({
      message: "Login successful",
      user: cleanUser,
      seller: seller,
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message || "Internal Server Error" });
  }
};


// Seller Logout
const logoutSeller = async (req, res) => {
  try {
    res.clearCookie('token');
    res.status(200).json({
      success: true,
      message: "Logout successful"
    });
  } catch (error) {
    res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
};

//Delete seller profile
const deleteSellerByAdmin = async (req, res, next) => {
  try {
    const sellerId = req.params.sellerId;  // get sellerId param from URL

    if (!sellerId) {
      return res.status(400).json({ error: "Seller ID is required" });
    }

    // Find seller by sellerId and delete
    const sellerData = await Seller.findByIdAndDelete(sellerId);

    if (!sellerData) {
      return res.status(404).json({ error: "Seller not found" });
    }

    // Optional: Also delete linked user by sellerData.userId if you want
    // await user.findByIdAndDelete(sellerData.userId);

    return res.status(200).json({ deletedSeller: sellerData._id, message: "Seller Deleted" });
  } catch (error) {
    console.error(error);
    res.status(error.status || 500).json({ error: error.message || 'Internal Server Error' });
  }
};


// Get seller profile
const getSellerProfile = async (req, res) => {
  try {
    const seller = await Seller.findOne({ userId: req.user.id }).select('-password');
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
    const {
      storeName,
      companyName,
      gstNumber,
      phone,
      address,
      bio,
      expertise,
      password,
    } = req.body;

    const updates = {
      storeName,
      companyName,
      gstNumber,
      phone,
      address,
      bio,
      expertise,
    };

    if (password) {
      const salt = await bcrypt.genSalt(10);
      updates.password = await bcrypt.hash(password, salt);
    }

    const updatedSeller = await Seller.findOneAndUpdate(
      { userId: req.user.id },
      updates,
      { new: true }
    ).select('-password');

    if (!updatedSeller) {
      return res.status(404).json({ error: 'Seller not found' });
    }

    res.status(200).json({
      message: 'Seller profile updated',
      updatedSeller,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};












// // Get seller orders
// const getSellerOrders = async (req, res) => {
//   try {
//     const orders = await Order.find({ 'items.seller': req.user.id });
//     res.status(200).json({ orders });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// };

// // Update order status
// const updateOrderStatus = async (req, res) => {
//   try {
//     const { orderId } = req.params;
//     const { status } = req.body;

//     const order = await Order.findOneAndUpdate(
//       { _id: orderId, 'items.seller': req.user.id },
//       { $set: { 'items.$.status': status } },
//       { new: true }
//     );

//     if (!order) return res.status(404).json({ error: 'Order not found' });

//     res.status(200).json({ message: 'Order status updated', order });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// };

module.exports = {registerSeller,loginSeller,logoutSeller,
  getSellerProfile,updateSellerProfile
};
