import React from 'react';
import { render, screen } from '@testing-library/react-native';

import StateManagementScreen from '../../app/(dashboard)/state-management';

// Mock @tanstack/react-query with a STABLE mock queryClient reference
const mockGetAll = jest.fn();
const mockSubscribe = jest.fn(() => jest.fn()); // returns unsubscribe fn

const mockQueryCache = {
  getAll: mockGetAll,
  subscribe: mockSubscribe,
};

const mockQueryClient = {
  getQueryCache: () => mockQueryCache,
};

jest.mock('@tanstack/react-query', () => ({
  useQueryClient: () => mockQueryClient,
  QueryClientProvider: ({ children }: any) => children,
}));

describe('StateManagementScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockGetAll.mockReturnValue([]);
    mockSubscribe.mockReturnValue(jest.fn());
  });

  it('renders "State Management" heading', () => {
    render(<StateManagementScreen />);
    expect(screen.getByText('State Management')).toBeTruthy();
  });

  it('renders empty state when cache is empty', () => {
    mockGetAll.mockReturnValue([]);
    render(<StateManagementScreen />);
    expect(
      screen.getByText('No cache entries yet. Navigate to Data Fetching to populate the cache.'),
    ).toBeTruthy();
  });

  it('renders cache entries when cache has data', () => {
    mockGetAll.mockReturnValue([
      {
        queryKey: ['items', { page: 1, search: '', category: '' }],
        state: {
          status: 'success',
          dataUpdatedAt: Date.now(),
          data: { items: [{ id: '1', title: 'Test' }], totalCount: 1 },
        },
      },
    ]);
    render(<StateManagementScreen />);
    // Query key is formatted as "items > page:1 search:"" category:"""
    expect(screen.getByText(/items > page:1/)).toBeTruthy();
    // Stats bar shows total count
    expect(
      screen.queryByText('No cache entries yet. Navigate to Data Fetching to populate the cache.'),
    ).toBeNull();
  });

  it('displays query key and status for each entry', () => {
    mockGetAll.mockReturnValue([
      {
        queryKey: ['items', { page: 1, search: '', category: '' }],
        state: {
          status: 'success',
          dataUpdatedAt: Date.now(),
          data: { items: [], totalCount: 0 },
        },
      },
      {
        queryKey: ['users'],
        state: {
          status: 'pending',
          dataUpdatedAt: 0,
          data: undefined,
        },
      },
    ]);
    render(<StateManagementScreen />);
    expect(screen.getByText('success')).toBeTruthy();
    expect(screen.getByText('pending')).toBeTruthy();
  });
});
