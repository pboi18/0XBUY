const express = require('express');
const router = express.Router();
const authController = require('../controllers/authControllers');

// Firebase authentication route
router.post('/firebase/google', authController.firebaseAuth);
router.get('/test', authController.test);

module.exports = router;