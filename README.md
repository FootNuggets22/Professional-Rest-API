# Professional REST API

A robust and scalable Node.js REST API built with Express.js, featuring modern backend development practices, comprehensive error handling, input validation, and professional project structure.

## ✨ Features

- **RESTful API Design** - Clean, intuitive endpoints following REST principles
- **Professional Architecture** - Organized codebase with controllers, routes, models, and middleware
- **Input Validation** - Comprehensive request validation using Joi
- **Error Handling** - Centralized error handling with custom error classes
- **Security** - Helmet.js, CORS, rate limiting, and input sanitization
- **Logging** - Structured logging with different levels and colors
- **Environment Configuration** - Environment-based configuration with dotenv
- **Code Quality** - ESLint and Prettier for consistent code formatting
- **Performance** - Compression middleware and response optimization
- **Health Checks** - Built-in health monitoring endpoint
- **Documentation** - Comprehensive API documentation

## 🚀 Quick Start

### Prerequisites
- Node.js >= 16.0.0
- npm >= 8.0.0

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd professional-rest-api
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
```bash
cp .env.example .env
# Edit .env with your configuration
```

4. Start the development server:
```bash
npm run dev
```

5. Start the production server:
```bash
npm start
```

## 📋 API Endpoints

### Health Check
- `GET /health` - Application health status

### Users
- `GET /api/v1/users` - Get all users (with pagination)
- `GET /api/v1/users/:id` - Get user by ID
- `GET /api/v1/users/search?q=term` - Search users
- `POST /api/v1/users` - Create new user
- `PUT /api/v1/users/:id` - Update user
- `DELETE /api/v1/users/:id` - Delete user

### Products
- `GET /api/v1/products` - Get all products (with filtering and pagination)
- `GET /api/v1/products/:id` - Get product by ID
- `GET /api/v1/products/categories` - Get product categories
- `POST /api/v1/products` - Create new product
- `PUT /api/v1/products/:id` - Update product
- `DELETE /api/v1/products/:id` - Delete product

## 📊 API Examples

### Create User
```bash
curl -X POST http://localhost:3000/api/v1/users \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "age": 30,
    "role": "user"
  }'
```

### Get Products with Filtering
```bash
curl "http://localhost:3000/api/v1/products?category=Electronics&minPrice=100&maxPrice=500&page=1&limit=10"
```

### Search Users
```bash
curl "http://localhost:3000/api/v1/users/search?q=john"
```

## 🏗️ Project Structure

```
src/
├── controllers/          # Business logic
│   ├── userController.js
│   └── productController.js
├── middleware/           # Custom middleware
│   ├── errorHandler.js
│   └── notFound.js
├── models/              # Data models
│   ├── User.js
│   └── Product.js
├── routes/              # API routes
│   ├── userRoutes.js
│   └── productRoutes.js
├── utils/               # Utility functions
│   ├── AppError.js
│   ├── logger.js
│   └── validation.js
└── index.js             # Application entry point
```

## 🛠️ Scripts

- `npm start` - Start production server
- `npm run dev` - Start development server with debugging
- `npm test` - Run tests
- `npm run test:watch` - Run tests in watch mode
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues
- `npm run format` - Format code with Prettier

## 🔧 Configuration

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `NODE_ENV` | Environment mode | `development` |
| `PORT` | Server port | `3000` |
| `API_VERSION` | API version | `v1` |
| `API_BASE_URL` | API base path | `/api/v1` |
| `RATE_LIMIT_WINDOW_MS` | Rate limit window | `900000` |
| `RATE_LIMIT_MAX_REQUESTS` | Max requests per window | `100` |

## 🔒 Security Features

- **Helmet.js** - Sets various HTTP headers for security
- **CORS** - Configurable Cross-Origin Resource Sharing
- **Rate Limiting** - Prevents abuse with configurable limits
- **Input Validation** - Validates all incoming data
- **Error Sanitization** - Prevents information leakage

## 📈 Performance Optimizations

- **Compression** - Gzip compression for responses
- **Efficient Pagination** - Limit data transfer with pagination
- **Structured Logging** - Optimized logging for production
- **Memory Management** - Proper cleanup and garbage collection

## 🧪 Testing

The project includes Jest for testing:
```bash
npm test
```

## 📝 Code Quality

- **ESLint** - JavaScript linting
- **Prettier** - Code formatting
- **Consistent Structure** - Organized file structure
- **Error Handling** - Comprehensive error management

## 🚀 Deployment

### Production Checklist
- [ ] Set `NODE_ENV=production`
- [ ] Configure production database
- [ ] Set strong JWT secret
- [ ] Configure CORS for production domains
- [ ] Set up monitoring and logging
- [ ] Configure reverse proxy (nginx)
- [ ] Set up SSL/TLS certificates

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new features
5. Ensure all tests pass
6. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🔗 Links

- [Express.js Documentation](https://expressjs.com/)
- [Node.js Best Practices](https://github.com/goldbergyoni/nodebestpractices)
- [REST API Guidelines](https://restfulapi.net/)

---

**Note**: This is a demonstration project showcasing professional backend development practices. For production use, consider implementing a proper database, authentication, and additional security measures.
