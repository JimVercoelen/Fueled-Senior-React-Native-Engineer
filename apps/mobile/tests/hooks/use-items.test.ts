import React from 'react';
import { renderHook, act, waitFor } from '@testing-library/react-native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { mockSupabase } from '../__mocks__/supabase';

// Import after mocks
import { useItems, useCreateItem, useUpdateItem, useDeleteItem } from '../../src/hooks/use-items';
import { useDebouncedValue } from '../../src/hooks/use-debounced-value';

// Mock supabase module
jest.mock('@/lib/supabase', () => ({
  supabase: require('../__mocks__/supabase').mockSupabase,
}));

function createWrapper() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false, gcTime: 0 },
      mutations: { retry: false },
    },
  });

  return function Wrapper({ children }: { children: React.ReactNode }) {
    return React.createElement(QueryClientProvider, { client: queryClient }, children);
  };
}

describe('useItems', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockSupabase.lastFrom = null;
  });

  it('calls supabase.from("items").select with correct params', async () => {
    const wrapper = createWrapper();

    const { result } = renderHook(
      () =>
        useItems({
          page: 1,
          search: '',
          category: '',
          priority: '',
          status: '',
        }),
      { wrapper },
    );

    await waitFor(() => expect(result.current.isPending).toBe(false));

    expect(mockSupabase.from).toHaveBeenCalledWith('items');
  });

  it('applies ilike filter when search is provided', async () => {
    const wrapper = createWrapper();

    const { result } = renderHook(
      () =>
        useItems({
          page: 1,
          search: 'test',
          category: '',
          priority: '',
          status: '',
        }),
      { wrapper },
    );

    await waitFor(() => expect(result.current.isPending).toBe(false));

    const fromResult = mockSupabase.lastFrom;
    const selectResult = fromResult?.select.mock.results[0]?.value;
    expect(selectResult?.ilike).toHaveBeenCalledWith('title', '%test%');
  });

  it('applies eq filter when category is provided', async () => {
    const wrapper = createWrapper();

    const { result } = renderHook(
      () =>
        useItems({
          page: 1,
          search: '',
          category: 'frontend',
          priority: '',
          status: '',
        }),
      { wrapper },
    );

    await waitFor(() => expect(result.current.isPending).toBe(false));

    const fromResult = mockSupabase.lastFrom;
    const selectResult = fromResult?.select.mock.results[0]?.value;
    expect(selectResult?.eq).toHaveBeenCalledWith('category', 'frontend');
  });

  it('applies eq filter when priority is provided', async () => {
    const wrapper = createWrapper();

    const { result } = renderHook(
      () =>
        useItems({
          page: 1,
          search: '',
          category: '',
          priority: 'high',
          status: '',
        }),
      { wrapper },
    );

    await waitFor(() => expect(result.current.isPending).toBe(false));

    const fromResult = mockSupabase.lastFrom;
    const selectResult = fromResult?.select.mock.results[0]?.value;
    expect(selectResult?.eq).toHaveBeenCalledWith('priority', 'high');
  });

  it('returns data with items, totalCount, totalPages, currentPage', async () => {
    const wrapper = createWrapper();

    const { result } = renderHook(
      () =>
        useItems({
          page: 1,
          search: '',
          category: '',
          priority: '',
          status: '',
        }),
      { wrapper },
    );

    await waitFor(() => expect(result.current.data).toBeDefined());

    expect(result.current.data).toHaveProperty('items');
    expect(result.current.data).toHaveProperty('totalCount');
    expect(result.current.data).toHaveProperty('totalPages');
    expect(result.current.data).toHaveProperty('currentPage');
  });
});

describe('useCreateItem', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockSupabase.lastFrom = null;
  });

  it('calls supabase insert with the provided input', async () => {
    const wrapper = createWrapper();

    const { result } = renderHook(() => useCreateItem(), { wrapper });

    await act(async () => {
      result.current.mutate({
        title: 'New Task',
        description: 'Test description',
        category: 'frontend',
        priority: 'high',
        status: 'active',
      });
    });

    await waitFor(() => expect(result.current.isIdle || result.current.isSuccess).toBe(true));

    expect(mockSupabase.from).toHaveBeenCalledWith('items');
    expect(mockSupabase.lastFrom.insert).toHaveBeenCalledWith(
      expect.objectContaining({
        title: 'New Task',
        description: 'Test description',
        category: 'frontend',
        priority: 'high',
        status: 'active',
        user_id: 'test-user-id',
      }),
    );
  });
});

describe('useUpdateItem', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockSupabase.lastFrom = null;
  });

  it('calls supabase update with the provided input', async () => {
    const wrapper = createWrapper();

    const { result } = renderHook(() => useUpdateItem(), { wrapper });

    await act(async () => {
      result.current.mutate({
        id: 'test-id',
        title: 'Updated Task',
      });
    });

    await waitFor(() => expect(result.current.isIdle || result.current.isSuccess).toBe(true));

    expect(mockSupabase.from).toHaveBeenCalledWith('items');
    expect(mockSupabase.lastFrom.update).toHaveBeenCalledWith({ title: 'Updated Task' });
  });
});

describe('useDeleteItem', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockSupabase.lastFrom = null;
  });

  it('calls supabase delete with the correct id', async () => {
    const wrapper = createWrapper();

    const { result } = renderHook(() => useDeleteItem(), { wrapper });

    await act(async () => {
      result.current.mutate('test-delete-id');
    });

    await waitFor(() => expect(result.current.isIdle || result.current.isSuccess).toBe(true));

    expect(mockSupabase.from).toHaveBeenCalledWith('items');
    expect(mockSupabase.lastFrom.delete).toHaveBeenCalled();
  });
});

describe('useDebouncedValue', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('returns initial value immediately', () => {
    const { result } = renderHook(() => useDebouncedValue('hello', 300));
    expect(result.current).toBe('hello');
  });

  it('debounces value changes', () => {
    const { result, rerender } = renderHook(
      ({ value }: { value: string }) => useDebouncedValue(value, 300),
      {
        initialProps: { value: 'hello' },
      },
    );

    expect(result.current).toBe('hello');

    rerender({ value: 'world' });

    // Value should not have changed yet
    expect(result.current).toBe('hello');

    act(() => {
      jest.advanceTimersByTime(300);
    });

    expect(result.current).toBe('world');
  });

  it('resets timer on rapid changes', () => {
    const { result, rerender } = renderHook(
      ({ value }: { value: string }) => useDebouncedValue(value, 300),
      {
        initialProps: { value: 'a' },
      },
    );

    rerender({ value: 'ab' });
    act(() => {
      jest.advanceTimersByTime(200);
    });

    rerender({ value: 'abc' });
    act(() => {
      jest.advanceTimersByTime(200);
    });

    // Should still be 'a' because timer resets
    expect(result.current).toBe('a');

    act(() => {
      jest.advanceTimersByTime(100);
    });

    // Now 300ms since last change, should update
    expect(result.current).toBe('abc');
  });
});
