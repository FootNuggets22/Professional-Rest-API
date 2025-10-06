const User = require('../models/User');
const { validateUser, validateUserUpdate } = require('../utils/validation');
const AppError = require('../utils/AppError');
const logger = require('../utils/logger');

class UserController {
  // Get all users with pagination
  async getAllUsers(req, res, next) {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const skip = (page - 1) * limit;

      const users = User.getAll(skip, limit);
      const total = User.count();

      res.json({
        success: true,
        data: users,
        pagination: {
          currentPage: page,
          totalPages: Math.ceil(total / limit),
          totalItems: total,
          itemsPerPage: limit
        }
      });
    } catch (error) {
      logger.error('Error getting users:', error);
      next(new AppError('Failed to retrieve users', 500));
    }
  }

  // Get user by ID
  async getUserById(req, res, next) {
    try {
      const { id } = req.params;
      const user = User.getById(id);

      if (!user) {
        return next(new AppError('User not found', 404));
      }

      res.json({
        success: true,
        data: user
      });
    } catch (error) {
      logger.error('Error getting user:', error);
      next(new AppError('Failed to retrieve user', 500));
    }
  }

  // Create new user
  async createUser(req, res, next) {
    try {
      const { error, value } = validateUser(req.body);
      
      if (error) {
        return next(new AppError(error.details[0].message, 400));
      }

      // Check if email already exists
      const existingUser = User.getByEmail(value.email);
      if (existingUser) {
        return next(new AppError('Email already exists', 409));
      }

      const user = User.create(value);
      
      logger.info(`User created: ${user.id}`);
      
      res.status(201).json({
        success: true,
        message: 'User created successfully',
        data: user
      });
    } catch (error) {
      logger.error('Error creating user:', error);
      next(new AppError('Failed to create user', 500));
    }
  }

  // Update user
  async updateUser(req, res, next) {
    try {
      const { id } = req.params;
      const { error, value } = validateUserUpdate(req.body);

      if (error) {
        return next(new AppError(error.details[0].message, 400));
      }

      const existingUser = User.getById(id);
      if (!existingUser) {
        return next(new AppError('User not found', 404));
      }

      // Check if email already exists (excluding current user)
      if (value.email && value.email !== existingUser.email) {
        const emailExists = User.getByEmail(value.email);
        if (emailExists) {
          return next(new AppError('Email already exists', 409));
        }
      }

      const updatedUser = User.update(id, value);
      
      logger.info(`User updated: ${id}`);
      
      res.json({
        success: true,
        message: 'User updated successfully',
        data: updatedUser
      });
    } catch (error) {
      logger.error('Error updating user:', error);
      next(new AppError('Failed to update user', 500));
    }
  }

  // Delete user
  async deleteUser(req, res, next) {
    try {
      const { id } = req.params;
      
      const user = User.getById(id);
      if (!user) {
        return next(new AppError('User not found', 404));
      }

      User.delete(id);
      
      logger.info(`User deleted: ${id}`);
      
      res.json({
        success: true,
        message: 'User deleted successfully'
      });
    } catch (error) {
      logger.error('Error deleting user:', error);
      next(new AppError('Failed to delete user', 500));
    }
  }

  // Search users
  async searchUsers(req, res, next) {
    try {
      const { q } = req.query;
      
      if (!q) {
        return next(new AppError('Search query is required', 400));
      }

      const users = User.search(q);
      
      res.json({
        success: true,
        data: users,
        count: users.length
      });
    } catch (error) {
      logger.error('Error searching users:', error);
      next(new AppError('Failed to search users', 500));
    }
  }
}

module.exports = new UserController();