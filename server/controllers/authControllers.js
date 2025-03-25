const { admin } = require('../config/firebase'); // Destructure admin
const { generateToken } = require('../utils/jwt');

exports.firebaseAuth = async (req, res) => {
  try {
    const { token } = req.body;

    if (!token) {
      return res.status(400).json({ error: 'Firebase ID token is required' });
    }

    // Verify Firebase ID token
    const decodedToken = await admin.auth().verifyIdToken(token);
    const { uid, email } = decodedToken;

    // Generate a custom JWT token
    const jwtToken = generateToken({ id: uid, email });

    res.status(200).json({ token: jwtToken });
  } catch (error) {
    console.error('Error during Firebase authentication:', error);
    res.status(500).json({ error: 'Authentication failed' });
  }
};

// Authenticate with Firebase (Google Sign-In)
exports.test = async (req, res) => {
    res.status(200).json({ message: 'Server is working alright!' });
  };