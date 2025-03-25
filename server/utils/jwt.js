const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

// Generate a JWT token
const generateToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
};

// Verify a JWT token
const verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    console.error('Error verifying token:', error);
    throw error;
  }
};

module.exports = { generateToken, verifyToken };