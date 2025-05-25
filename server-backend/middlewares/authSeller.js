const jwt = require('jsonwebtoken');

const authSeller = (req, res, next) => {
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

    // Attach user info to request
    req.user = decodedToken; // Includes id and role
    next();

  } catch (error) {
    console.log('AuthSeller error:', error);
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};

module.exports = authSeller;
