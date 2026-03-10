export interface Item {
  id: string;
  user_id: string;
  title: string;
  description: string | null;
  category: string;
  priority: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export type CreateItemInput = Omit<Item, 'id' | 'user_id' | 'created_at' | 'updated_at'>;

export type UpdateItemInput = Partial<CreateItemInput> & { id: string };

export const CATEGORIES = ['frontend', 'backend', 'design', 'devops'] as const;

export const PRIORITIES = ['high', 'medium', 'low'] as const;

export const STATUSES = ['active', 'completed', 'archived'] as const;
