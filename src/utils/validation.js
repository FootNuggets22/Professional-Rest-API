const Joi = require('joi');

// User validation schemas
const userSchema = Joi.object({
  name: Joi.string().min(2).max(50).required().messages({
    'string.min': 'Name must be at least 2 characters long',
    'string.max': 'Name cannot exceed 50 characters',
    'any.required': 'Name is required'
  }),
  email: Joi.string().email().required().messages({
    'string.email': 'Please provide a valid email address',
    'any.required': 'Email is required'
  }),
  age: Joi.number().integer().min(18).max(120).required().messages({
    'number.min': 'Age must be at least 18',
    'number.max': 'Age cannot exceed 120',
    'any.required': 'Age is required'
  }),
  role: Joi.string().valid('user', 'admin', 'moderator').default('user').messages({
    'any.only': 'Role must be one of: user, admin, moderator'
  })
});

const userUpdateSchema = Joi.object({
  name: Joi.string().min(2).max(50).messages({
    'string.min': 'Name must be at least 2 characters long',
    'string.max': 'Name cannot exceed 50 characters'
  }),
  email: Joi.string().email().messages({
    'string.email': 'Please provide a valid email address'
  }),
  age: Joi.number().integer().min(18).max(120).messages({
    'number.min': 'Age must be at least 18',
    'number.max': 'Age cannot exceed 120'
  }),
  role: Joi.string().valid('user', 'admin', 'moderator').messages({
    'any.only': 'Role must be one of: user, admin, moderator'
  })
}).min(1);

// Product validation schemas
const productSchema = Joi.object({
  name: Joi.string().min(2).max(100).required().messages({
    'string.min': 'Product name must be at least 2 characters long',
    'string.max': 'Product name cannot exceed 100 characters',
    'any.required': 'Product name is required'
  }),
  description: Joi.string().min(10).max(500).required().messages({
    'string.min': 'Description must be at least 10 characters long',
    'string.max': 'Description cannot exceed 500 characters',
    'any.required': 'Description is required'
  }),
  price: Joi.number().positive().precision(2).required().messages({
    'number.positive': 'Price must be a positive number',
    'any.required': 'Price is required'
  }),
  category: Joi.string().min(2).max(50).required().messages({
    'string.min': 'Category must be at least 2 characters long',
    'string.max': 'Category cannot exceed 50 characters',
    'any.required': 'Category is required'
  }),
  stock: Joi.number().integer().min(0).required().messages({
    'number.min': 'Stock cannot be negative',
    'any.required': 'Stock is required'
  })
});

const productUpdateSchema = Joi.object({
  name: Joi.string().min(2).max(100).messages({
    'string.min': 'Product name must be at least 2 characters long',
    'string.max': 'Product name cannot exceed 100 characters'
  }),
  description: Joi.string().min(10).max(500).messages({
    'string.min': 'Description must be at least 10 characters long',
    'string.max': 'Description cannot exceed 500 characters'
  }),
  price: Joi.number().positive().precision(2).messages({
    'number.positive': 'Price must be a positive number'
  }),
  category: Joi.string().min(2).max(50).messages({
    'string.min': 'Category must be at least 2 characters long',
    'string.max': 'Category cannot exceed 50 characters'
  }),
  stock: Joi.number().integer().min(0).messages({
    'number.min': 'Stock cannot be negative'
  })
}).min(1);

// Validation functions
const validateUser = (data) => {
  return userSchema.validate(data, { abortEarly: false });
};

const validateUserUpdate = (data) => {
  return userUpdateSchema.validate(data, { abortEarly: false });
};

const validateProduct = (data) => {
  return productSchema.validate(data, { abortEarly: false });
};

const validateProductUpdate = (data) => {
  return productUpdateSchema.validate(data, { abortEarly: false });
};

module.exports = {
  validateUser,
  validateUserUpdate,
  validateProduct,
  validateProductUpdate
};