# Express TypeScript CRUD API with Prisma and Swagger

A complete REST API built with Express.js, TypeScript, Prisma ORM, PostgreSQL, and Swagger documentation. Features full CRUD operations with validation, proper error handling, and interactive API documentation.

## Features

- ✅ **TypeScript**: Full type safety throughout the application
- ✅ **Prisma ORM**: Type-safe database operations with PostgreSQL
- ✅ **Swagger Documentation**: Interactive API documentation
- ✅ **Request Validation**: Joi-based validation for all endpoints
- ✅ **CORS Support**: Cross-origin request handling
- ✅ **Docker Compose**: Easy development setup with PostgreSQL
- ✅ **Layered Architecture**: Controllers, Services, and Interfaces
- ✅ **Error Handling**: Comprehensive error responses
- ✅ **Timestamps**: Automatic created/updated timestamps

## Prerequisites

- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **Docker** and **Docker Compose** (for database)

## Quick Start

### 1. Clone and Setup

```bash
# Navigate to the backend directory
cd backend

# Install dependencies
npm install
```

### 2. Environment Configuration

Create a `.env` file in the `backend/` directory:

```env
# Database Configuration
DATABASE_URL="postgresql://postgres:password@db:5432/testdb"

# Server Configuration
PORT=3000
```

### 3. Start the Application

#### Option A: Using Docker Compose (Recommended)

```bash
# Start both backend and PostgreSQL database
docker-compose up --build

# The API will be available at http://localhost:3000
# Swagger documentation at http://localhost:3000/api-docs
```

#### Option B: Local Development

```bash
# Start PostgreSQL database only
docker-compose up db

# In a new terminal, run the backend
npm run dev
```

### 4. Database Setup

If using Docker Compose, the database will be automatically created. For local development:

```bash
# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma migrate dev --name init
```

## API Endpoints

### Health Check
- **GET** `/health` - Check API status

### Items CRUD Operations
- **POST** `/items` - Create a new item
- **GET** `/items` - List all items (with optional name filter)
- **GET** `/items/:id` - Get item by ID
- **PUT** `/items/:id` - Update item by ID
- **DELETE** `/items/:id` - Delete item by ID

### Swagger Documentation
- **GET** `/api-docs` - Interactive API documentation

## API Usage Examples

### Create an Item
```bash
curl -X POST http://localhost:3000/items \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Sample Item",
    "description": "This is a sample item"
  }'
```

### Get All Items
```bash
curl http://localhost:3000/items
```

### Get Items with Filter
```bash
curl "http://localhost:3000/items?name=sample"
```

### Get Item by ID
```bash
curl http://localhost:3000/items/1
```

### Update an Item
```bash
curl -X PUT http://localhost:3000/items/1 \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Updated Item",
    "description": "Updated description"
  }'
```

### Delete an Item
```bash
curl -X DELETE http://localhost:3000/items/1
```

## Project Structure

```
backend/
├── src/
│   ├── controllers/          # HTTP request handlers
│   │   ├── item.controller.ts
│   │   ├── health.controller.ts
│   │   └── index.ts
│   ├── services/             # Business logic layer
│   │   ├── item.service.ts
│   │   └── index.ts
│   ├── interfaces/           # TypeScript interfaces
│   │   ├── item.interface.ts
│   │   ├── error.interface.ts
│   │   └── index.ts
│   ├── validations/          # Request validation schemas
│   │   └── item.validation.ts
│   ├── middleware/           # Express middleware
│   │   └── validation.middleware.ts
│   └── index.ts              # Application entry point
├── prisma/
│   └── schema.prisma         # Database schema
├── docker-compose.yml        # Docker services configuration
├── Dockerfile               # Backend container configuration
├── package.json
├── tsconfig.json
└── README.md
```

## Validation Rules

### Create Item (POST /items)
- **name**: Required, 1-255 characters
- **description**: Optional, max 1000 characters

### Update Item (PUT /items/:id)
- **name**: Optional, 1-255 characters
- **description**: Optional, max 1000 characters
- At least one field must be provided

### Path Parameters
- **id**: Must be a positive integer

### Query Parameters
- **name**: Optional filter, 1-255 characters

## Development Commands

```bash
# Development mode (auto-reload)
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Generate Prisma client
npx prisma generate

# Run migrations
npx prisma migrate dev

# Reset database
npx prisma migrate reset

# Open Prisma Studio (database GUI)
npx prisma studio
```

## Docker Commands

```bash
# Start all services
docker-compose up

# Start in background
docker-compose up -d

# Stop all services
docker-compose down

# Rebuild and start
docker-compose up --build

# View logs
docker-compose logs -f backend
```

## Error Handling

The API returns consistent error responses:

```json
{
  "error": "Error message",
  "details": "Additional error information"
}
```

Common HTTP status codes:
- **200**: Success
- **201**: Created
- **400**: Bad Request (validation errors)
- **404**: Not Found
- **500**: Internal Server Error

## Contributing

1. Follow the existing code structure
2. Add validation for new endpoints
3. Update Swagger documentation
4. Add appropriate error handling
5. Test with the provided examples

## Troubleshooting

### Database Connection Issues
- Ensure PostgreSQL is running: `docker-compose ps`
- Check environment variables in `.env`
- Verify database URL format

### Port Conflicts
- Change `PORT` in `.env` if 3000 is occupied
- Update `docker-compose.yml` if needed

### Prisma Issues
- Regenerate client: `npx prisma generate`
- Reset database: `npx prisma migrate reset`
- Check schema: `npx prisma validate`

## License

This project is open source and available under the [MIT License](LICENSE). 