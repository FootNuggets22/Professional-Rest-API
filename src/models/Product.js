const { v4: uuidv4 } = require('uuid');

class Product {
  constructor() {
    this.products = [
      {
        id: uuidv4(),
        name: 'Laptop Pro',
        description: 'High-performance laptop for professionals',
        price: 1299.99,
        category: 'Electronics',
        stock: 50,
        inStock: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: uuidv4(),
        name: 'Wireless Headphones',
        description: 'Premium noise-cancelling headphones',
        price: 199.99,
        category: 'Electronics',
        stock: 100,
        inStock: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: uuidv4(),
        name: 'Coffee Mug',
        description: 'Ceramic coffee mug with company logo',
        price: 12.99,
        category: 'Home & Kitchen',
        stock: 0,
        inStock: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    ];
  }

  getAll(skip = 0, limit = 10, filters = {}) {
    let filteredProducts = this.products;

    // Apply filters
    if (filters.category) {
      filteredProducts = filteredProducts.filter(p => 
        p.category.toLowerCase() === filters.category.toLowerCase()
      );
    }

    if (filters.minPrice !== undefined) {
      filteredProducts = filteredProducts.filter(p => p.price >= filters.minPrice);
    }

    if (filters.maxPrice !== undefined) {
      filteredProducts = filteredProducts.filter(p => p.price <= filters.maxPrice);
    }

    if (filters.inStock !== undefined) {
      filteredProducts = filteredProducts.filter(p => p.inStock === filters.inStock);
    }

    return filteredProducts.slice(skip, skip + limit);
  }

  count(filters = {}) {
    let filteredProducts = this.products;

    // Apply same filters for count
    if (filters.category) {
      filteredProducts = filteredProducts.filter(p => 
        p.category.toLowerCase() === filters.category.toLowerCase()
      );
    }

    if (filters.minPrice !== undefined) {
      filteredProducts = filteredProducts.filter(p => p.price >= filters.minPrice);
    }

    if (filters.maxPrice !== undefined) {
      filteredProducts = filteredProducts.filter(p => p.price <= filters.maxPrice);
    }

    if (filters.inStock !== undefined) {
      filteredProducts = filteredProducts.filter(p => p.inStock === filters.inStock);
    }

    return filteredProducts.length;
  }

  getById(id) {
    return this.products.find(product => product.id === id);
  }

  create(productData) {
    const product = {
      id: uuidv4(),
      ...productData,
      inStock: productData.stock > 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    this.products.push(product);
    return product;
  }

  update(id, productData) {
    const index = this.products.findIndex(product => product.id === id);
    if (index === -1) return null;

    this.products[index] = {
      ...this.products[index],
      ...productData,
      inStock: (productData.stock !== undefined ? productData.stock : this.products[index].stock) > 0,
      updatedAt: new Date().toISOString()
    };
    
    return this.products[index];
  }

  delete(id) {
    const index = this.products.findIndex(product => product.id === id);
    if (index === -1) return false;
    
    this.products.splice(index, 1);
    return true;
  }

  getCategories() {
    const categories = [...new Set(this.products.map(p => p.category))];
    return categories.map(category => ({
      name: category,
      count: this.products.filter(p => p.category === category).length
    }));
  }
}

module.exports = new Product();