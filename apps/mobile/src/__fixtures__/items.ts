import type { Item, CreateItemInput } from '@/types/database';

export const mockItem: Item = {
  id: '123e4567-e89b-12d3-a456-426614174000',
  user_id: '123e4567-e89b-12d3-a456-426614174001',
  title: 'Build login page',
  description: 'Create the authentication flow',
  category: 'frontend',
  priority: 'high',
  status: 'active',
  created_at: '2026-01-01T00:00:00Z',
  updated_at: '2026-01-01T00:00:00Z',
};

export const mockItems: Item[] = [
  mockItem,
  {
    ...mockItem,
    id: '2',
    title: 'Setup CI pipeline',
    category: 'devops',
    priority: 'medium',
    status: 'completed',
  },
  {
    ...mockItem,
    id: '3',
    title: 'Design system tokens',
    category: 'design',
    priority: 'low',
    status: 'active',
  },
];

export const mockCreateInput: CreateItemInput = {
  title: 'New Task',
  description: 'Test description',
  category: 'frontend',
  priority: 'high',
  status: 'active',
};
