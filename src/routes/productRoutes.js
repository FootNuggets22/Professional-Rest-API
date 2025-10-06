const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// GET /api/v1/products - Get all products with filtering and pagination
router.get('/', productController.getAllProducts);

// GET /api/v1/products/categories - Get product categories
router.get('/categories', productController.getCategories);

// GET /api/v1/products/:id - Get product by ID
router.get('/:id', productController.getProductById);

// POST /api/v1/products - Create new product
router.post('/', productController.createProduct);

// PUT /api/v1/products/:id - Update product
router.put('/:id', productController.updateProduct);

// DELETE /api/v1/products/:id - Delete product
router.delete('/:id', productController.deleteProduct);

module.exports = router;