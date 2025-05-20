const jwt = require('jsonwebtoken');

const authAdmin = (req, res, next) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      return res.status(401).json({ message: 'Access denied: No token provided' });
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);

    if (!decodedToken || decodedToken.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied: Not an admin' });
    }

    req.user = decodedToken; // contains id and role
    next();

  } catch (error) {
    console.error('AuthAdmin Error:', error.message);
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};

module.exports = authAdmin;
