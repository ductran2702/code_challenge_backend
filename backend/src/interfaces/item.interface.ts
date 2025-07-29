export interface CreateItemRequest {
  name: string;
  description?: string;
}

export interface UpdateItemRequest {
  name?: string;
  description?: string;
}

export interface ItemResponse {
  id: number;
  name: string;
  description: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface DeleteItemResponse {
  message: string;
  item: ItemResponse;
} 