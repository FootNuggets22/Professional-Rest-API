const { v4: uuidv4 } = require('uuid');

class User {
  constructor() {
    this.users = [
      {
        id: uuidv4(),
        name: 'John Doe',
        email: 'john.doe@example.com',
        age: 30,
        role: 'admin',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: uuidv4(),
        name: 'Jane Smith',
        email: 'jane.smith@example.com',
        age: 25,
        role: 'user',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    ];
  }

  getAll(skip = 0, limit = 10) {
    return this.users.slice(skip, skip + limit);
  }

  count() {
    return this.users.length;
  }

  getById(id) {
    return this.users.find(user => user.id === id);
  }

  getByEmail(email) {
    return this.users.find(user => user.email === email);
  }

  create(userData) {
    const user = {
      id: uuidv4(),
      ...userData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    this.users.push(user);
    return user;
  }

  update(id, userData) {
    const index = this.users.findIndex(user => user.id === id);
    if (index === -1) return null;

    this.users[index] = {
      ...this.users[index],
      ...userData,
      updatedAt: new Date().toISOString()
    };
    
    return this.users[index];
  }

  delete(id) {
    const index = this.users.findIndex(user => user.id === id);
    if (index === -1) return false;
    
    this.users.splice(index, 1);
    return true;
  }

  search(query) {
    const searchTerm = query.toLowerCase();
    return this.users.filter(user => 
      user.name.toLowerCase().includes(searchTerm) ||
      user.email.toLowerCase().includes(searchTerm) ||
      user.role.toLowerCase().includes(searchTerm)
    );
  }
}

module.exports = new User();