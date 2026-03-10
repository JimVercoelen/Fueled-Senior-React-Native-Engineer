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
    const update = () => {
      const all = queryClient.getQueryCache().getAll();
      setEntries(
        all.map((query) => ({
          queryKey: query.queryKey,
          status: query.state.status,
          dataUpdatedAt: query.state.dataUpdatedAt,
          data: query.state.data,
          dataLength: Array.isArray((query.state.data as any)?.items)
            ? (query.state.data as any).items.length
            : null,
        })),
      );
    };

    update(); // initial read
    const unsubscribe = queryClient.getQueryCache().subscribe(update);
    return unsubscribe;
  }, [queryClient]);

  return entries;
}
