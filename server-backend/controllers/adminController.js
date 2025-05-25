const Admin = require('../models/AdminModel');
const User = require('../models/UserModel');
const Seller = require('../models/SellerModel');
const bcrypt = require('bcrypt');
const createToken = require('../utils/generateToken');


//  Admin Registration

const registerAdmin = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const existing = await Admin.findOne({ email });
    if (existing) {
      return res.status(400).json({ error: 'Admin already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newAdmin = await Admin.create({
      name,
      email,
      password: hashedPassword,
    });

    res.status(201).json({ message: 'Admin registered successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


//  Admin Login
const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body || {};
    if (!email || !password) {
      return res.status(400).json({ error: "All fields are mandatory" });
    }

    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(404).json({ error: "Admin not found" });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid password" });
    }

    const token = createToken(admin._id, 'admin');
    res.cookie('token', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict'
    });

    const adminData = admin.toObject();
    delete adminData.password;

    res.status(200).json({ message: "Admin login successful", admin: adminData });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message || "Internal Server Error" });
  }
};

//  Admin Logout
//logout

const logoutAdmin = async (req, res, next) => {
  try {
    res.clearCookie('token')
    res.status(200).json({
      success: true,
      message: "Logout successfully"
    })
  } catch (error) {
    console.log(error)
    res.status(error.status || 500).json({ error: error.message || 'Internal Server Error' })
  }
}

//  Get All Users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json({ error: error.message || "Internal Server Error" });
  }
};

//  Delete User By Admin
const deleteUserByAdmin = async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findByIdAndDelete(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json({ message: "User deleted successfully", deletedUserId: user._id });
  } catch (error) {
    res.status(500).json({ error: error.message || "Internal Server Error" });
  }
};

//  Get Admin Profile
const getAdminProfile = async (req, res) => {
  try {
    const adminId = req.user.id;
    const admin = await Admin.findById(adminId).select("-password");
    if (!admin) {
      return res.status(404).json({ error: "Admin not found" });
    }
    res.status(200).json({ admin });
  } catch (error) {
    res.status(500).json({ error: error.message || "Internal Server Error" });
  }
};

//  Get All Sellers
const getAllSellers = async (req, res) => {
  try {
    const sellers = await Seller.find().select("-password");
    res.status(200).json({ sellers });
  } catch (error) {
    res.status(500).json({ error: error.message || "Internal Server Error" });
  }
};


// Approve Seller
const approveSeller = async (req, res) => {
  try {

    const sellerId = req.params.sellerId.trim();

    const seller = await Seller.findByIdAndUpdate(
      sellerId,
      { isApproved: true },
      { new: true }
    );

    if (!seller) {
      return res.status(404).json({ error: "Seller not found" });
    }

    res.status(200).json({ message: "Seller approved", seller });
  } catch (error) {
    res.status(500).json({ error: error.message || "Internal Server Error" });
  }
};


//  Delete Seller By Admin
const deleteSellerByAdmin = async (req, res) => {
  try {
    const sellerId = req.params.sellerId;

    // Find the seller first
    const seller = await Seller.findById(sellerId);
    if (!seller) {
      return res.status(404).json({ error: "Seller not found" });
    }

    // Delete the linked user
    await User.findByIdAndDelete(seller.userId);

    // Delete the seller
    await Seller.findByIdAndDelete(sellerId);

    res.status(200).json({ message: "Seller and linked user deleted", deletedSellerId: seller._id });
  } catch (error) {
    res.status(500).json({ error: error.message || "Internal Server Error" });
  }
};


module.exports = {registerAdmin,loginAdmin,logoutAdmin,getAllUsers,deleteUserByAdmin,getAdminProfile,getAllSellers,approveSeller,
  deleteSellerByAdmin
};
