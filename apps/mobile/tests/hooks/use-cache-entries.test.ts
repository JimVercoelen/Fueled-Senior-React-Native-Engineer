import React from 'react';
import { renderHook } from '@testing-library/react-native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useCacheEntries } from '../../src/hooks/use-cache-entries';

function createWrapper(queryClient?: QueryClient) {
  const client =
    queryClient ??
    new QueryClient({
      defaultOptions: { queries: { retry: false, gcTime: Infinity } },
    });

  return {
    queryClient: client,
    Wrapper: ({ children }: { children: React.ReactNode }) =>
      React.createElement(QueryClientProvider, { client }, children),
  };
}

describe('useCacheEntries', () => {
  it('returns cache entries on mount', () => {
    const { queryClient, Wrapper } = createWrapper();
    queryClient.setQueryData(['test-key'], { items: [1, 2, 3] });

    const { result } = renderHook(() => useCacheEntries(), { wrapper: Wrapper });

    expect(result.current.length).toBeGreaterThan(0);
    expect(result.current[0]).toHaveProperty('queryKey');
    expect(result.current[0]).toHaveProperty('status');
    expect(result.current[0]).toHaveProperty('dataUpdatedAt');
    expect(result.current[0]).toHaveProperty('data');
  });

  it('includes dataLength for array data with items property', () => {
    const { queryClient, Wrapper } = createWrapper();
    queryClient.setQueryData(['test-key'], { items: [1, 2, 3] });

    const { result } = renderHook(() => useCacheEntries(), { wrapper: Wrapper });

    const entry = result.current.find(
      (e) => JSON.stringify(e.queryKey) === JSON.stringify(['test-key']),
    );
    // data.items is [1,2,3] so dataLength should be 3
    expect(entry?.dataLength).toBe(3);
  });

  it('returns empty array when cache is empty', () => {
    const { Wrapper } = createWrapper(
      new QueryClient({ defaultOptions: { queries: { retry: false } } }),
    );

    const { result } = renderHook(() => useCacheEntries(), { wrapper: Wrapper });

    expect(result.current).toEqual([]);
  });
});
