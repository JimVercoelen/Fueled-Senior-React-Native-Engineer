import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import type { Item, CreateItemInput, UpdateItemInput } from '@/types/database';

const PAGE_SIZE = 10;

interface UseItemsParams {
  page: number;
  search: string;
  category: string;
  priority: string;
  status: string;
}

interface UseItemsData {
  items: Item[];
  totalCount: number;
  totalPages: number;
  currentPage: number;
}

export function useItems({ page, search, category, priority, status }: UseItemsParams) {
  return useQuery<UseItemsData>({
    queryKey: ['items', { page, search, category, priority, status }],
    queryFn: async () => {
      const from = (page - 1) * PAGE_SIZE;
      const to = from + PAGE_SIZE - 1;

      const buildQuery = (rangeFrom: number, rangeTo: number) => {
        let q = supabase
          .from('items')
          .select('*', { count: 'exact' })
          .order('created_at', { ascending: false })
          .range(rangeFrom, rangeTo);

        if (search) q = q.ilike('title', `%${search}%`);
        if (category) q = q.eq('category', category);
        if (priority) q = q.eq('priority', priority);
        if (status) q = q.eq('status', status);
        return q;
      };

      let { data, error, count } = await buildQuery(from, to);

      // If offset exceeds row count, re-fetch from page 1
      if (error && error.code === 'PGRST103') {
        ({ data, error, count } = await buildQuery(0, PAGE_SIZE - 1));
      }
      if (error) throw error;

      return {
        items: (data as Item[]) ?? [],
        totalCount: count ?? 0,
        totalPages: Math.max(1, Math.ceil((count ?? 0) / PAGE_SIZE)),
        currentPage: count !== null && from >= count ? 1 : page,
      };
    },
  });
}

export function useCreateItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: CreateItemInput) => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');
      const { data, error } = await supabase
        .from('items')
        .insert({ ...input, user_id: user.id })
        .select()
        .single();
      if (error) throw error;
      return data as Item;
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['items'] });
    },
  });
}

export function useUpdateItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: UpdateItemInput) => {
      const { id, ...updates } = input;
      const { data, error } = await supabase
        .from('items')
        .update(updates)
        .eq('id', id)
        .select()
        .single();
      if (error) throw error;
      return data as Item;
    },
    onMutate: async (input) => {
      await queryClient.cancelQueries({ queryKey: ['items'] });

      const previousQueries = queryClient.getQueriesData<UseItemsData>({
        queryKey: ['items'],
      });

      queryClient.setQueriesData<UseItemsData>({ queryKey: ['items'] }, (old) => {
        if (!old) return old;
        return {
          ...old,
          items: old.items.map((item) => (item.id === input.id ? { ...item, ...input } : item)),
        };
      });

      return { previousQueries };
    },
    onError: (_err, _input, context) => {
      context?.previousQueries.forEach(([queryKey, data]) => {
        queryClient.setQueryData(queryKey, data);
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['items'] });
    },
  });
}

export function useDeleteItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('items').delete().eq('id', id);
      if (error) throw error;
    },
    onMutate: async (deletedId) => {
      await queryClient.cancelQueries({ queryKey: ['items'] });

      const previousQueries = queryClient.getQueriesData<UseItemsData>({
        queryKey: ['items'],
      });

      queryClient.setQueriesData<UseItemsData>({ queryKey: ['items'] }, (old) => {
        if (!old) return old;
        return {
          ...old,
          items: old.items.filter((item) => item.id !== deletedId),
          totalCount: old.totalCount - 1,
        };
      });

      return { previousQueries };
    },
    onError: (_err, _id, context) => {
      context?.previousQueries.forEach(([queryKey, data]) => {
        queryClient.setQueryData(queryKey, data);
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['items'] });
    },
  });
}
