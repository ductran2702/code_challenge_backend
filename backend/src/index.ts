import express from 'express';
import { PrismaClient } from '@prisma/client';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 3000;
const prisma = new PrismaClient();

// CORS configuration
app.use(cors({
  origin: true, // Allow all origins in development
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Swagger configuration
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Items CRUD API',
      version: '1.0.0',
      description: 'A simple CRUD API for managing items',
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Development server',
      },
    ],
  },
  apis: ['./src/index.ts'],
  swaggerOptions: {
    tryItOutEnabled: true,
    requestInterceptor: (req: any) => {
      req.headers['Content-Type'] = 'application/json';
      return req;
    },
  },
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

app.use(express.json());

// Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

/**
 * @swagger
 * /health:
 *   get:
 *     summary: Health check endpoint
 *     description: Returns the health status of the API
 *     responses:
 *       200:
 *         description: API is healthy
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "ok"
 */
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

/**
 * @swagger
 * components:
 *   schemas:
 *     Item:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated id of the item
 *           example: 1
 *         name:
 *           type: string
 *           description: The name of the item
 *           example: "Sample Item"
 *         description:
 *           type: string
 *           description: The description of the item
 *           example: "This is a sample item description"
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The timestamp when the item was created
 *           example: "2024-01-15T10:30:00.000Z"
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The timestamp when the item was last updated
 *           example: "2024-01-15T10:30:00.000Z"
 *     ItemInput:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         name:
 *           type: string
 *           description: The name of the item
 *           example: "Sample Item"
 *         description:
 *           type: string
 *           description: The description of the item
 *           example: "This is a sample item description"
 */

/**
 * @swagger
 * /items:
 *   post:
 *     summary: Create a new item
 *     description: Creates a new item with the provided name and optional description
 *     tags: [Items]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ItemInput'
 *     responses:
 *       201:
 *         description: Item created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Item'
 *       400:
 *         description: Bad request - name is required
 *       500:
 *         description: Internal server error
 */
app.post('/items', async (req, res) => {
  const { name, description } = req.body;
  if (!name) return res.status(400).json({ error: 'Name is required' });
  try {
    const item = await prisma.item.create({
      data: {
        name,
        description: description || null,
      },
    });
    res.status(201).json(item);
  } catch (err: any) {
    console.log("Failed to create item:", err)
    res.status(500).json({ error: 'Failed to create item', details: err });
  }
});

/**
 * @swagger
 * /items:
 *   get:
 *     summary: Get all items
 *     description: Retrieves a list of all items, optionally filtered by name
 *     tags: [Items]
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: Filter items by name (case-insensitive partial match)
 *         example: "sample"
 *     responses:
 *       200:
 *         description: List of items retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Item'
 *       500:
 *         description: Internal server error
 */
app.get('/items', async (req, res) => {
  const { name } = req.query;
  try {
    const items = await prisma.item.findMany({
      where: name ? {
        name: {
          contains: name as string,
          mode: 'insensitive',
        },
      } : undefined,
    });
    res.json(items);
  } catch (err: any) {
    console.log("Failed to fetch items:", err);
    res.status(500).json({ error: 'Failed to fetch items', details: err });
  }
});

/**
 * @swagger
 * /items/{id}:
 *   get:
 *     summary: Get item by ID
 *     description: Retrieves a specific item by its ID
 *     tags: [Items]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the item to retrieve
 *         example: 1
 *     responses:
 *       200:
 *         description: Item retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Item'
 *       404:
 *         description: Item not found
 *       500:
 *         description: Internal server error
 */
app.get('/items/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const item = await prisma.item.findUnique({
      where: { id: parseInt(id) },
    });
    if (!item) return res.status(404).json({ error: 'Item not found' });
    res.json(item);
  } catch (err: any) {
    console.log("Failed to fetch item:", err)
    res.status(500).json({ error: 'Failed to fetch item', details: err });
  }
});

/**
 * @swagger
 * /items/{id}:
 *   put:
 *     summary: Update item by ID
 *     description: Updates an existing item with the provided data
 *     tags: [Items]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the item to update
 *         example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ItemInput'
 *     responses:
 *       200:
 *         description: Item updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Item'
 *       404:
 *         description: Item not found
 *       500:
 *         description: Internal server error
 */
app.put('/items/:id', async (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;
  try {
    const item = await prisma.item.update({
      where: { id: parseInt(id) },
      data: {
        name,
        description: description || null,
      },
    });
    res.json(item);
  } catch (err: any) {
    if (err.code === 'P2025') {
      return res.status(404).json({ error: 'Item not found' });
    }
    console.log("Failed to update item:", err)
    res.status(500).json({ error: 'Failed to update item', details: err });
  }
});

/**
 * @swagger
 * /items/{id}:
 *   delete:
 *     summary: Delete item by ID
 *     description: Deletes a specific item by its ID
 *     tags: [Items]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the item to delete
 *         example: 1
 *     responses:
 *       200:
 *         description: Item deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Item deleted"
 *                 item:
 *                   $ref: '#/components/schemas/Item'
 *       404:
 *         description: Item not found
 *       500:
 *         description: Internal server error
 */
app.delete('/items/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const item = await prisma.item.delete({
      where: { id: parseInt(id) },
    });
    res.json({ message: 'Item deleted', item });
  } catch (err: any) {
    if (err.code === 'P2025') {
      return res.status(404).json({ error: 'Item not found' });
    }
    console.log("Failed to delete item:", err)
    res.status(500).json({ error: 'Failed to delete item', details: err });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  console.log(`Swagger documentation available at http://localhost:${port}/api-docs`);
}); 