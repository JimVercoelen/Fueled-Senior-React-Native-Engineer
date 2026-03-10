import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

export interface CacheEntry {
  queryKey: readonly unknown[];
  status: string;
  dataUpdatedAt: number;
  data: unknown;
  dataLength: number | null;
}

export function useCacheEntries(): CacheEntry[] {
  const queryClient = useQueryClient();
  const [entries, setEntries] = useState<CacheEntry[]>([]);

  useEffect(() => {
    const readSnapshot = (): CacheEntry[] =>
      queryClient
        .getQueryCache()
        .getAll()
        .map((query) => ({
          queryKey: query.queryKey,
          status: query.state.status,
          dataUpdatedAt: query.state.dataUpdatedAt,
          data: query.state.data,
          dataLength: Array.isArray((query.state.data as any)?.items)
            ? (query.state.data as any).items.length
            : null,
        }));

    setEntries(readSnapshot());

    const unsubscribe = queryClient.getQueryCache().subscribe(() => {
      // Defer setState so we never update during another component's render.
      // TanStack Query can notify subscribers synchronously when the cache
      // changes during render (e.g. when DataFetchingContent mounts/queries).
      queueMicrotask(() => setEntries(readSnapshot()));
    });
    return unsubscribe;
  }, [queryClient]);

  return entries;
}
