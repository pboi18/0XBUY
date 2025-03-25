const { verifyToken } = require('../utils/jwt');

// Middleware to validate JWT token
exports.authenticate = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1]; // Extract token from "Bearer <token>"

    if (!token) {
      return res.status(401).json({ error: 'Unauthorized: No token provided' });
    }

    // Verify token
    const decoded = verifyToken(token);
    req.user = decoded; // Attach user data to the request object
    next();
  } catch (error) {
    console.error('Error validating token:', error);
    res.status(401).json({ error: 'Unauthorized: Invalid token' });
  }
};