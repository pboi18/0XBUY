const express = require('express');
const router = express.Router();
const authController = require('../controllers/authControllers');

// Firebase authentication route
router.get('/testing', authController.test);

module.exports = router;