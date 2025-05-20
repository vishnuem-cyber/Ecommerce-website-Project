// server-backend/routes/adminRoutes.js
const express = require('express');
const adminRouter = express.Router();

const {registerAdmin,
  loginAdmin,logoutAdmin,getAllUsers,deleteUserByAdmin,getAdminProfile,getAllSellers,approveSeller,deleteSellerByAdmin}
   = require('../controllers/adminController');

const authAdmin = require('../middlewares/authAdmin');

// //signup
// // /api/Admin/register
adminRouter.post('/register', registerAdmin);

// Admin login
// POST /api/admin/login
adminRouter.post('/login', loginAdmin);

//admin logout
// POST /api/admin/logout
adminRouter.post('/logout', logoutAdmin);


// Get all users (admin only)
// GET /api/admin/users
adminRouter.get('/users', authAdmin, getAllUsers);

// Delete a user by admin
// DELETE /api/admin/user/:userId
adminRouter.delete('/user/:userId', authAdmin, deleteUserByAdmin);

// Get admin profile
// GET /api/admin/profile
adminRouter.get('/profile', authAdmin, getAdminProfile);

// Get all sellers (admin only)
// GET /api/admin/sellers
adminRouter.get('/sellers', authAdmin, getAllSellers);

// Approve all sellers (admin only)
// POST /api/admin/sellers/approve/:sellerId
adminRouter.post('/sellers/approve/:sellerId', authAdmin, approveSeller)

// Delete a seller by admin
// DELETE /api/admin/seller/:sellerId
adminRouter.delete('/sellers/:sellerId', authAdmin, deleteSellerByAdmin);




module.exports = adminRouter;
