import { Request, Response } from 'express';
import {
  CreateItemRequest,
  UpdateItemRequest,
  ItemResponse,
  DeleteItemResponse,
  ErrorResponse
} from '../interfaces';
import { ItemService } from '../services';

export class ItemController {
  /**
   * Create a new item
   */
  static async createItem(req: Request<{}, {}, CreateItemRequest>, res: Response<ItemResponse | ErrorResponse>) {
    const { name, description } = req.body;
    if (!name) return res.status(400).json({ error: 'Name is required' });
    
    try {
      const item = await ItemService.createItem({ name, description });
      res.status(201).json(item);
    } catch (err: any) {
      console.log("Failed to create item:", err);
      res.status(500).json({ error: 'Failed to create item', details: err });
    }
  }

  /**
   * Get all items with optional name filter
   */
  static async getItems(req: Request<{}, {}, {}, { name?: string }>, res: Response<ItemResponse[] | ErrorResponse>) {
    const { name } = req.query;
    
    try {
      const items = await ItemService.getItems(name);
      res.json(items);
    } catch (err: any) {
      console.log("Failed to fetch items:", err);
      res.status(500).json({ error: 'Failed to fetch items', details: err });
    }
  }

  /**
   * Get item by ID
   */
  static async getItemById(req: Request<{ id: string }>, res: Response<ItemResponse | ErrorResponse>) {
    const { id } = req.params;
    
    try {
      const item = await ItemService.getItemById(parseInt(id));
      if (!item) return res.status(404).json({ error: 'Item not found' });
      res.json(item);
    } catch (err: any) {
      console.log("Failed to fetch item:", err);
      res.status(500).json({ error: 'Failed to fetch item', details: err });
    }
  }

  /**
   * Update item by ID
   */
  static async updateItem(req: Request<{ id: string }, {}, UpdateItemRequest>, res: Response<ItemResponse | ErrorResponse>) {
    const { id } = req.params;
    const { name, description } = req.body;
    
    try {
      const item = await ItemService.updateItem(parseInt(id), { name, description });
      res.json(item);
    } catch (err: any) {
      if (err.code === 'P2025') {
        return res.status(404).json({ error: 'Item not found' });
      }
      console.log("Failed to update item:", err);
      res.status(500).json({ error: 'Failed to update item', details: err });
    }
  }

  /**
   * Delete item by ID
   */
  static async deleteItem(req: Request<{ id: string }>, res: Response<DeleteItemResponse | ErrorResponse>) {
    const { id } = req.params;
    
    try {
      const item = await ItemService.deleteItem(parseInt(id));
      res.json({ message: 'Item deleted', item });
    } catch (err: any) {
      if (err.code === 'P2025') {
        return res.status(404).json({ error: 'Item not found' });
      }
      console.log("Failed to delete item:", err);
      res.status(500).json({ error: 'Failed to delete item', details: err });
    }
  }
} 