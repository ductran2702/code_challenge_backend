import { PrismaClient } from '@prisma/client';
import {
  CreateItemRequest,
  UpdateItemRequest,
  ItemResponse,
  DeleteItemResponse
} from '../interfaces';

const prisma = new PrismaClient();

export class ItemService {
  /**
   * Create a new item
   */
  static async createItem(data: CreateItemRequest): Promise<ItemResponse> {
    return await prisma.item.create({
      data: {
        name: data.name,
        description: data.description || null,
      },
    });
  }

  /**
   * Get all items with optional name filter
   */
  static async getItems(nameFilter?: string): Promise<ItemResponse[]> {
    return await prisma.item.findMany({
      where: nameFilter ? {
        name: {
          contains: nameFilter,
          mode: 'insensitive',
        },
      } : undefined,
      orderBy: {
        createdAt: 'desc'
      }
    });
  }

  /**
   * Get item by ID
   */
  static async getItemById(id: number): Promise<ItemResponse | null> {
    return await prisma.item.findUnique({
      where: { id },
    });
  }

  /**
   * Update item by ID
   */
  static async updateItem(id: number, data: UpdateItemRequest): Promise<ItemResponse> {
    return await prisma.item.update({
      where: { id },
      data: {
        name: data.name,
        description: data.description || null,
      },
    });
  }

  /**
   * Delete item by ID
   */
  static async deleteItem(id: number): Promise<ItemResponse> {
    return await prisma.item.delete({
      where: { id },
    });
  }
} 