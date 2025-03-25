const express = require('express');
const router = express.Router();
const productController = require('../controllers/ProductsControllers');
const { authenticate } = require('../middleware/authMiddleware');

// Add a new product
router.post('/products/add-products', authenticate,productController.addProduct);

// Get all products
router.get('/products/get-all-products', authenticate,productController.getAllProducts);

// Get product by ID
router.get('/products/get-product/:id',authenticate, productController.getProductById);

// Delete product by ID
router.delete('/products/delete-product/:id',authenticate, productController.deleteProduct);

// Get product by CATEGORY
router.get('/products/category/:category',authenticate, productController.getProductsByCategory);

// Edit product by ID
router.put('/products/edit-product/:id',authenticate, productController.editProduct);

module.exports = router;