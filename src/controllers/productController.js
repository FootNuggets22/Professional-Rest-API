const Product = require('../models/Product');
const { validateProduct, validateProductUpdate } = require('../utils/validation');
const AppError = require('../utils/AppError');
const logger = require('../utils/logger');

class ProductController {
  // Get all products with filtering and pagination
  async getAllProducts(req, res, next) {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const skip = (page - 1) * limit;
      
      const filters = {
        category: req.query.category,
        minPrice: req.query.minPrice ? parseFloat(req.query.minPrice) : undefined,
        maxPrice: req.query.maxPrice ? parseFloat(req.query.maxPrice) : undefined,
        inStock: req.query.inStock === 'true' ? true : req.query.inStock === 'false' ? false : undefined
      };

      const products = Product.getAll(skip, limit, filters);
      const total = Product.count(filters);

      res.json({
        success: true,
        data: products,
        pagination: {
          currentPage: page,
          totalPages: Math.ceil(total / limit),
          totalItems: total,
          itemsPerPage: limit
        },
        filters: filters
      });
    } catch (error) {
      logger.error('Error getting products:', error);
      next(new AppError('Failed to retrieve products', 500));
    }
  }

  // Get product by ID
  async getProductById(req, res, next) {
    try {
      const { id } = req.params;
      const product = Product.getById(id);

      if (!product) {
        return next(new AppError('Product not found', 404));
      }

      res.json({
        success: true,
        data: product
      });
    } catch (error) {
      logger.error('Error getting product:', error);
      next(new AppError('Failed to retrieve product', 500));
    }
  }

  // Create new product
  async createProduct(req, res, next) {
    try {
      const { error, value } = validateProduct(req.body);
      
      if (error) {
        return next(new AppError(error.details[0].message, 400));
      }

      const product = Product.create(value);
      
      logger.info(`Product created: ${product.id}`);
      
      res.status(201).json({
        success: true,
        message: 'Product created successfully',
        data: product
      });
    } catch (error) {
      logger.error('Error creating product:', error);
      next(new AppError('Failed to create product', 500));
    }
  }

  // Update product
  async updateProduct(req, res, next) {
    try {
      const { id } = req.params;
      const { error, value } = validateProductUpdate(req.body);

      if (error) {
        return next(new AppError(error.details[0].message, 400));
      }

      const existingProduct = Product.getById(id);
      if (!existingProduct) {
        return next(new AppError('Product not found', 404));
      }

      const updatedProduct = Product.update(id, value);
      
      logger.info(`Product updated: ${id}`);
      
      res.json({
        success: true,
        message: 'Product updated successfully',
        data: updatedProduct
      });
    } catch (error) {
      logger.error('Error updating product:', error);
      next(new AppError('Failed to update product', 500));
    }
  }

  // Delete product
  async deleteProduct(req, res, next) {
    try {
      const { id } = req.params;
      
      const product = Product.getById(id);
      if (!product) {
        return next(new AppError('Product not found', 404));
      }

      Product.delete(id);
      
      logger.info(`Product deleted: ${id}`);
      
      res.json({
        success: true,
        message: 'Product deleted successfully'
      });
    } catch (error) {
      logger.error('Error deleting product:', error);
      next(new AppError('Failed to delete product', 500));
    }
  }

  // Get product categories
  async getCategories(req, res, next) {
    try {
      const categories = Product.getCategories();
      
      res.json({
        success: true,
        data: categories
      });
    } catch (error) {
      logger.error('Error getting categories:', error);
      next(new AppError('Failed to retrieve categories', 500));
    }
  }
}

module.exports = new ProductController();