import { CATEGORIES, PRIORITIES, STATUSES } from '../../src/types/database';
import type { Item, CreateItemInput, UpdateItemInput } from '../../src/types/database';

describe('Database types', () => {
  describe('Item type', () => {
    it('has all required fields', () => {
      const item: Item = {
        id: '123e4567-e89b-12d3-a456-426614174000',
        user_id: '123e4567-e89b-12d3-a456-426614174001',
        title: 'Test item',
        description: null,
        category: 'frontend',
        priority: 'high',
        status: 'active',
        created_at: '2026-01-01T00:00:00Z',
        updated_at: '2026-01-01T00:00:00Z',
      };

      expect(item.id).toBeDefined();
      expect(item.user_id).toBeDefined();
      expect(item.title).toBeDefined();
      expect(item.description).toBeNull();
      expect(item.category).toBeDefined();
      expect(item.priority).toBeDefined();
      expect(item.status).toBeDefined();
      expect(item.created_at).toBeDefined();
      expect(item.updated_at).toBeDefined();
    });
  });

  describe('CreateItemInput type', () => {
    it('omits id, user_id, created_at, updated_at', () => {
      const input: CreateItemInput = {
        title: 'New item',
        description: 'A description',
        category: 'backend',
        priority: 'medium',
        status: 'active',
      };

      expect(input.title).toBe('New item');
      expect(input).not.toHaveProperty('id');
      expect(input).not.toHaveProperty('user_id');
      expect(input).not.toHaveProperty('created_at');
      expect(input).not.toHaveProperty('updated_at');
    });
  });

  describe('UpdateItemInput type', () => {
    it('requires id and allows partial fields', () => {
      const input: UpdateItemInput = {
        id: '123e4567-e89b-12d3-a456-426614174000',
        title: 'Updated title',
      };

      expect(input.id).toBeDefined();
      expect(input.title).toBe('Updated title');
    });
  });

  describe('Constants', () => {
    it('exports CATEGORIES as readonly array', () => {
      expect(Array.isArray(CATEGORIES)).toBe(true);
      expect(CATEGORIES).toContain('frontend');
      expect(CATEGORIES).toContain('backend');
      expect(CATEGORIES).toContain('design');
      expect(CATEGORIES).toContain('devops');
      expect(CATEGORIES.length).toBe(4);
    });

    it('exports PRIORITIES as readonly array', () => {
      expect(Array.isArray(PRIORITIES)).toBe(true);
      expect(PRIORITIES).toContain('high');
      expect(PRIORITIES).toContain('medium');
      expect(PRIORITIES).toContain('low');
      expect(PRIORITIES.length).toBe(3);
    });

    it('exports STATUSES as readonly array', () => {
      expect(Array.isArray(STATUSES)).toBe(true);
      expect(STATUSES).toContain('active');
      expect(STATUSES).toContain('completed');
      expect(STATUSES).toContain('archived');
      expect(STATUSES.length).toBe(3);
    });
  });
});
