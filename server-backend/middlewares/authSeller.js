const jwt = require('jsonwebtoken');
const Seller = require('../models/SellerModel');


const authSeller = async(req, res, next) => {
  try {
    const { token } = req.cookies;

     // No token found
    if (!token) {
      return res.status(401).json({ message: 'Seller not authorized, token missing' });
    }
     // Decode token
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);

    // Check if the token is valid and has the role of 'seller'
    if (!decodedToken || decodedToken.role !== 'seller') {
      return res.status(403).json({ message: 'Access denied. Not a seller' });
    }
    //  Get seller from DB
    const seller = await Seller.findOne({ userId: decodedToken.id });

    if (!seller) {
      return res.status(404).json({ message: 'Seller profile not found' });
    }

     

    // Attach user info to request
    req.user = decodedToken; // Includes id and role
    req.seller = seller;         // full seller doc (with _id)
    next();

  } catch (error) {
    console.log('AuthSeller error:', error);
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};

module.exports = authSeller;
