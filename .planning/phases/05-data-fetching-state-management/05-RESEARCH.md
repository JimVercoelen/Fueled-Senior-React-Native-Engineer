# Phase 5: Data Fetching + State Management - Research

**Researched:** 2026-03-10
**Domain:** TanStack Query, Supabase CRUD, Context API patterns, React Native data layer
**Confidence:** HIGH

## Summary

This phase builds two demo screens and three app-wide systems (TanStack Query, Toast, Modal) on top of a Supabase-backed data layer. The core technical challenge is wiring TanStack Query v5 with Supabase-js v2 for paginated, searchable, filterable CRUD operations with optimistic updates -- then exposing that cache state in a live viewer. Toast and Modal Context providers follow the logbook reference patterns (replace-not-append, stack-based) and integrate with existing Alert/Modal components. Three UX polish fixes (count-up animation, accordion overflow, subtitle wrapping) round out the phase.

TanStack Query v5 (latest: 5.90.x) works out of the box with React Native and Expo. The existing Supabase client is already configured. The existing component library provides all UI primitives needed (Alert, Modal, ModalContent, Skeleton, Select, TextField, Button, Card, Tabs, List, Badge). The key architectural decision is where to place the QueryClientProvider -- it must wrap at the root layout level alongside the new ToastProvider and ModalProvider.

**Primary recommendation:** Install `@tanstack/react-query`, create a Supabase migration with RLS-protected table + signup trigger, build Toast/Modal context providers first (app-wide infrastructure), then data-fetching screen (paginated list + search/filter + CRUD), then state-management screen (cache viewer), then UX polish fixes.

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions
- Supabase-only data source -- one table for everything (list, search, filter, CRUD mutations)
- Seed data per user via Supabase DB trigger function on new sign-up (not a one-time migration seed)
- RLS enabled -- only authenticated users can create/update/delete, reads scoped to user
- Records linked to user (user_id column) -- each user has their own data
- Seed data via SQL migration (30-50 records schema) -- reproducible, committed to repo
- Page controls (Previous/Next buttons), not infinite scroll -- uses useQuery with page param
- Server-side search & filter -- params sent to Supabase, triggers new query
- Debounced search input + filter dropdowns above the list
- Changing search/filter resets pagination to page 1
- Loading state: Skeleton component with spinner inside for simplicity
- Error handling: Alert shown as toast via Context API -- generic "Oops! Something went wrong. Please try again." copy
- Retry: Via page refresh / pull-to-refresh (not inline retry button)
- Optimistic updates on mutations + cache invalidation
- Cache viewer ONLY on state management screen -- read-only, no actions or demo triggers
- Cache viewer displays live TanStack Query cache as styled JSON
- ToastProvider wired app-wide -- uses existing Alert component, logbook's replace-not-append pattern, auto-dismiss with timeout, pressable to dismiss
- Toast integrated into data fetching screen for CRUD success/error feedback
- Interactive toast demo on component playground -- trigger toasts of all severity variants
- ModalProvider wired app-wide -- logbook's stack-based pattern, typed modal registry
- Uses existing Modal + ModalContent components
- Modal integrated into data fetching screen for delete confirmation ("Are you sure?")
- Interactive modal demo on component playground
- Simplified modal types -- generic/confirmation only
- Meet Jim animated stat counters: count-up from 0 on screen load
- The Showcase accordion must expand to fit ALL content (no hidden overflow)
- The Showcase tech stack card subtitles must wrap on narrow viewports

### Claude's Discretion
- Entity type for Supabase table (projects, tasks, contacts -- whatever demonstrates patterns best)
- Data fetching screen layout structure (tabs, single-page, or modal-based CRUD)
- Cache viewer visual design (JSON tree, formatted cards, etc.)
- Toast position on screen
- Exact Supabase DB trigger implementation for per-user seed data
- TanStack Query configuration (stale time, cache time, retry policies)
- Count-up animation approach (reanimated, JS interval, or library)

### Deferred Ideas (OUT OF SCOPE)
None -- discussion stayed within phase scope
</user_constraints>

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| DATA-01 | Paginated list from Supabase with page controls | TanStack Query `useQuery` with page param + Supabase `.range()` + `{ count: 'exact' }` for total pages |
| DATA-02 | Search with debounced queries + filter dropdowns showing query invalidation | Debounced search state as query key dependency, Supabase `.ilike()` for search, `.eq()` for filters, page reset on param change |
| DATA-03 | CRUD mutations via Supabase with optimistic updates + cache invalidation | TanStack Query `useMutation` with `onMutate` (cancel queries, snapshot, setQueryData), `onError` (rollback), `onSettled` (invalidate) |
| DATA-04 | Loading states (skeleton loaders), error boundaries, and retry | Existing `SkeletonCard` component, error shown as toast via ToastProvider, pull-to-refresh for retry |
| STAT-01 | TanStack Query cache viewer displaying live app state as styled JSON | `queryClient.getQueryCache().subscribe()` for live updates, `.getAll()` to read entries, render as formatted JSON |
| STAT-02 | Toast system via Context API | ToastProvider with replace-not-append behavior, auto-dismiss timeout, renders existing Alert component, wired at root layout |
| STAT-03 | Modal system via Context API | ModalProvider with stack-based management, typed modal registry (generic/confirmation), uses existing Modal + ModalContent, wired at root layout |
</phase_requirements>

## Standard Stack

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| @tanstack/react-query | ^5.90 | Server state management, caching, mutations | De facto standard for React/RN data fetching; built-in cache, optimistic updates, query invalidation |
| @supabase/supabase-js | ^2.99.0 (installed) | Database client for CRUD, auth, RLS | Already configured in project; provides typed queries, filters, pagination via `.range()` |
| react-native-reanimated | 4.2.1 (installed) | Count-up animation for Meet Jim stats | Already installed; `withTiming` + `useSharedValue` for smooth number interpolation |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| react (Context API) | 19.2.0 (installed) | Toast + Modal global state providers | App-wide state that doesn't need server sync |
| react-hook-form | ^7.71.2 (installed) | CRUD form state (create/edit modals) | Form validation for mutation inputs |
| yup | ^1.7.1 (installed) | Validation schema for CRUD forms | Validate entity fields before mutation |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| @tanstack/react-query | SWR | TanStack has better mutation support, devtools, cache manipulation APIs -- required by project |
| Context API (toast/modal) | Zustand | Context API is sufficient for simple app-wide UI state; no external dep needed |
| Reanimated count-up | use-count-up library | Reanimated already installed; no additional dependency; more control over animation |

**Installation:**
```bash
cd apps/mobile && npm install @tanstack/react-query --legacy-peer-deps
```

Note: `--legacy-peer-deps` required due to React 19.2.0 peer conflict with react-test-renderer (established pattern from Phase 2).

## Architecture Patterns

### Recommended Project Structure
```
src/
  contexts/
    auth.tsx           # (existing)
    toast.tsx           # NEW: ToastProvider + useToast
    modal.tsx           # NEW: ModalProvider + useModal
  hooks/
    use-items.ts        # NEW: TanStack Query hooks for Supabase CRUD
  lib/
    supabase.ts         # (existing)
    query-client.ts     # NEW: QueryClient instance + config
  types/
    database.ts         # NEW: Supabase table types
app/
  _layout.tsx           # MODIFY: wrap with QueryClientProvider + ToastProvider + ModalProvider
  (dashboard)/
    data-fetching.tsx   # REPLACE: full data fetching screen
    state-management.tsx # REPLACE: cache viewer screen
    components.tsx      # MODIFY: add toast/modal interactive demos
    meet-jim.tsx        # MODIFY: add count-up animation to stats
    the-showcase.tsx    # MODIFY: fix accordion overflow + subtitle wrapping
infra/
  supabase/
    migrations/
      YYYYMMDDHHMMSS_create_items_table.sql  # NEW: table + RLS + trigger
```

### Pattern 1: QueryClient Configuration
**What:** Centralized QueryClient with sensible defaults for a showcase app
**When to use:** Single instance shared across the app
**Example:**
```typescript
// src/lib/query-client.ts
import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,    // 5 minutes
      gcTime: 1000 * 60 * 30,       // 30 minutes (formerly cacheTime in v4)
      retry: 1,
      refetchOnWindowFocus: false,   // disable for showcase stability
    },
    mutations: {
      retry: 0,
    },
  },
});
```

### Pattern 2: Provider Nesting Order in Root Layout
**What:** Correct nesting order for all providers
**When to use:** Root layout (`app/_layout.tsx`)
**Example:**
```typescript
// Provider order (outermost to innermost):
// ThemeProvider > AuthProvider > QueryClientProvider > ToastProvider > ModalProvider > Navigator
<ThemeProvider value={AppTheme}>
  <AuthProvider>
    <QueryClientProvider client={queryClient}>
      <ToastProvider>
        <ModalProvider>
          <RootNavigator />
        </ModalProvider>
      </ToastProvider>
    </QueryClientProvider>
  </AuthProvider>
</ThemeProvider>
```
**Rationale:** QueryClientProvider wraps Toast/Modal because toast/modal callbacks may trigger query invalidation. Auth wraps QueryClient because queries need auth context.

### Pattern 3: Paginated Query with Search/Filter
**What:** TanStack Query hook with dynamic query keys for server-side pagination + filtering
**When to use:** Data fetching screen
**Example:**
```typescript
// src/hooks/use-items.ts
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';

const PAGE_SIZE = 10;

interface UseItemsParams {
  page: number;
  search: string;
  category: string;
}

export function useItems({ page, search, category }: UseItemsParams) {
  return useQuery({
    queryKey: ['items', { page, search, category }],
    queryFn: async () => {
      const from = (page - 1) * PAGE_SIZE;
      const to = from + PAGE_SIZE - 1;

      let query = supabase
        .from('items')
        .select('*', { count: 'exact' })
        .order('created_at', { ascending: false })
        .range(from, to);

      if (search) {
        query = query.ilike('title', `%${search}%`);
      }
      if (category) {
        query = query.eq('category', category);
      }

      const { data, error, count } = await query;
      if (error) throw error;

      return {
        items: data,
        totalCount: count ?? 0,
        totalPages: Math.ceil((count ?? 0) / PAGE_SIZE),
        currentPage: page,
      };
    },
  });
}
```

### Pattern 4: Optimistic Mutation with Cache Rollback
**What:** useMutation with onMutate snapshot, optimistic update, error rollback, and invalidation
**When to use:** Create, update, delete operations
**Example:**
```typescript
import { useMutation, useQueryClient } from '@tanstack/react-query';

export function useDeleteItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('items').delete().eq('id', id);
      if (error) throw error;
    },
    onMutate: async (deletedId) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({ queryKey: ['items'] });

      // Snapshot current cache
      const previousQueries = queryClient.getQueriesData({ queryKey: ['items'] });

      // Optimistically remove the item from all cached pages
      queryClient.setQueriesData({ queryKey: ['items'] }, (old: any) => {
        if (!old) return old;
        return {
          ...old,
          items: old.items.filter((item: any) => item.id !== deletedId),
          totalCount: old.totalCount - 1,
        };
      });

      return { previousQueries };
    },
    onError: (_err, _id, context) => {
      // Rollback on failure
      context?.previousQueries.forEach(([queryKey, data]) => {
        queryClient.setQueryData(queryKey, data);
      });
    },
    onSettled: () => {
      // Always refetch after mutation
      queryClient.invalidateQueries({ queryKey: ['items'] });
    },
  });
}
```

### Pattern 5: Toast Context (replace-not-append, auto-dismiss)
**What:** Global toast state with single toast display, auto-dismiss, pressable dismiss
**When to use:** App-wide feedback for mutations
**Example:**
```typescript
// src/contexts/toast.tsx
import React, { createContext, useContext, useState, useCallback, useRef } from 'react';

type ToastType = 'success' | 'info' | 'warning' | 'error';

interface Toast {
  type: ToastType;
  title?: string;
  message: string;
}

interface ToastContextValue {
  toast: Toast | null;
  showToast: (toast: Toast) => void;
  hideToast: () => void;
}

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toast, setToast] = useState<Toast | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>();

  const showToast = useCallback((newToast: Toast) => {
    // Replace-not-append: clear existing toast and timer
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setToast(newToast);
    timeoutRef.current = setTimeout(() => setToast(null), 4000);
  }, []);

  const hideToast = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setToast(null);
  }, []);

  return (
    <ToastContext.Provider value={{ toast, showToast, hideToast }}>
      {children}
      {/* Render toast overlay using Alert component */}
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) throw new Error('useToast must be used within ToastProvider');
  return context;
}
```

### Pattern 6: Modal Context (stack-based, typed registry)
**What:** Global modal state with stack-based management and typed modal definitions
**When to use:** App-wide modal management (delete confirmation, CRUD forms)
**Example:**
```typescript
// src/contexts/modal.tsx
type ModalType = 'confirmation' | 'generic';

interface ModalConfig {
  type: ModalType;
  title: string;
  content?: React.ReactNode;
  onConfirm?: () => void;
  onCancel?: () => void;
}

interface ModalContextValue {
  showModal: (config: ModalConfig) => void;
  hideModal: () => void;
}
```

### Pattern 7: Live Cache Viewer
**What:** Subscribe to QueryCache changes and render cache entries as styled JSON
**When to use:** State management screen
**Example:**
```typescript
import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

export function useCacheEntries() {
  const queryClient = useQueryClient();
  const [entries, setEntries] = useState<any[]>([]);

  useEffect(() => {
    const update = () => {
      const all = queryClient.getQueryCache().getAll();
      setEntries(all.map(query => ({
        queryKey: query.queryKey,
        state: query.state.status,
        dataUpdatedAt: query.state.dataUpdatedAt,
        data: query.state.data,
      })));
    };

    update(); // initial
    const unsubscribe = queryClient.getQueryCache().subscribe(update);
    return unsubscribe;
  }, [queryClient]);

  return entries;
}
```

### Pattern 8: Supabase DB Trigger for Per-User Seed Data
**What:** PostgreSQL trigger on auth.users insert to populate demo items for new users
**When to use:** Supabase migration
**Example:**
```sql
-- Function to seed demo data for new users
CREATE OR REPLACE FUNCTION public.seed_user_items()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.items (user_id, title, description, category, priority, status)
  VALUES
    (NEW.id, 'Item 1', 'Description', 'category_a', 'high', 'active'),
    -- ... 30-50 records
    (NEW.id, 'Item N', 'Description', 'category_b', 'low', 'completed');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger on new user creation
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.seed_user_items();
```

### Anti-Patterns to Avoid
- **Client-side filtering:** Never filter/search in JS when Supabase can do it server-side. Always push search/filter params to the query.
- **useInfiniteQuery for page controls:** Use regular `useQuery` with page number in query key. `useInfiniteQuery` is for infinite scroll (not needed here).
- **Append-mode toasts:** The logbook pattern is replace-not-append. Only one toast visible at a time.
- **Direct QueryClient import in components:** Use `useQueryClient()` hook instead of importing the instance directly.
- **Hardcoded maxHeight in Accordion:** The current `maxHeight: height.value * 500` truncates long content. Use dynamic measurement or a large-enough max.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Server state caching | Custom fetch + useState + useEffect | TanStack Query useQuery/useMutation | Handles stale data, background refetch, cache invalidation, optimistic updates |
| Pagination state | Manual page/offset tracking with useEffect | useQuery with page in queryKey | Automatic cache per page, parallel prefetch, stale-while-revalidate |
| Debounced search | Custom setTimeout in onChange | useState + useEffect with delay, feeding into queryKey | Simple pattern; TanStack Query deduplicates rapid key changes automatically |
| Optimistic updates | Manual state rollback with try/catch | useMutation onMutate/onError/onSettled | Built-in snapshot, rollback, and cache sync |
| Count-up animation | setInterval + useState counter | Reanimated useSharedValue + withTiming | Already installed; smooth 60fps animation, no re-renders |

**Key insight:** TanStack Query eliminates all the boilerplate of loading/error/refetch state management. Every query automatically gets `isPending`, `isError`, `data`, `error`, `refetch` -- no need for manual state tracking.

## Common Pitfalls

### Pitfall 1: Supabase RLS Blocking Deletes
**What goes wrong:** Delete operations silently fail because RLS requires both SELECT and DELETE policies.
**Why it happens:** By default no rows are visible through SELECT, so DELETE has nothing to delete.
**How to avoid:** Always create both SELECT and DELETE policies. Test each CRUD operation after migration.
**Warning signs:** Mutation succeeds (no error) but item remains in list after refetch.

### Pitfall 2: Supabase Insert Not Returning Data
**What goes wrong:** `insert()` returns null data because supabase-js v2 doesn't return rows by default.
**Why it happens:** Changed behavior in v2 -- insert/update/delete require `.select()` chained after to return the row.
**How to avoid:** Always chain `.select()` after `.insert()`, `.update()`, `.delete()` when you need the result.
**Warning signs:** Optimistic update works but `onSuccess` data is null.

### Pitfall 3: Query Key Mismatch on Invalidation
**What goes wrong:** Invalidating `['items']` doesn't invalidate `['items', { page: 1, search: '' }]` -- or it invalidates too broadly.
**Why it happens:** TanStack Query v5 uses partial matching: `invalidateQueries({ queryKey: ['items'] })` invalidates ALL queries that START with `['items']`.
**How to avoid:** Use `['items']` as the base key for all item queries. Invalidation of `['items']` will cascade to all pages/filter combos.
**Warning signs:** Stale data shown after mutation completes.

### Pitfall 4: React 19 Peer Dependency Conflicts
**What goes wrong:** `npm install @tanstack/react-query` fails with peer dep errors.
**Why it happens:** React 19.2.0 + react-test-renderer override causes peer dep resolution issues.
**How to avoid:** Use `--legacy-peer-deps` flag (established project pattern).
**Warning signs:** npm ERR! ERESOLVE unable to resolve dependency tree.

### Pitfall 5: Accordion Content Truncation (Known Bug)
**What goes wrong:** AccordionItem content with many items is clipped at ~500px height.
**Why it happens:** `maxHeight: height.value * 500` in the animated style caps the expanded height.
**How to avoid:** Measure actual content height with `onLayout` and animate to measured height, or use a sufficiently large multiplier (e.g., 2000).
**Warning signs:** Requirement lists show only first 7 of 17 items.

### Pitfall 6: SECURITY DEFINER on Trigger Function
**What goes wrong:** Trigger function can't insert into `public.items` because it runs as the inserting user (the auth system), which may not have permissions.
**Why it happens:** PostgreSQL triggers on `auth.users` run in auth context, not the user's context.
**How to avoid:** Use `SECURITY DEFINER` on the trigger function so it runs with the function owner's privileges (typically postgres/superuser).
**Warning signs:** New user signup succeeds but no seed data appears.

## Code Examples

### Supabase Migration: Table + RLS + Trigger
```sql
-- Create the items table
CREATE TABLE public.items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL DEFAULT 'general',
  priority TEXT NOT NULL DEFAULT 'medium',
  status TEXT NOT NULL DEFAULT 'active',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.items ENABLE ROW LEVEL SECURITY;

-- SELECT: users can only read their own items
CREATE POLICY "Users can view own items"
  ON public.items FOR SELECT
  USING (auth.uid() = user_id);

-- INSERT: users can only insert items for themselves
CREATE POLICY "Users can insert own items"
  ON public.items FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- UPDATE: users can only update their own items
CREATE POLICY "Users can update own items"
  ON public.items FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- DELETE: users can only delete their own items
CREATE POLICY "Users can delete own items"
  ON public.items FOR DELETE
  USING (auth.uid() = user_id);

-- Index for common queries
CREATE INDEX idx_items_user_id ON public.items(user_id);
CREATE INDEX idx_items_category ON public.items(category);
CREATE INDEX idx_items_title_trgm ON public.items USING gin(title gin_trgm_ops);
```

Note: The `gin_trgm_ops` index enables fast `ILIKE` searches. If the `pg_trgm` extension is not enabled on the Supabase project, use a simpler btree index or enable the extension: `CREATE EXTENSION IF NOT EXISTS pg_trgm;`

### Debounced Search Hook
```typescript
import { useState, useEffect } from 'react';

export function useDebouncedValue<T>(value: T, delay: number = 300): T {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debounced;
}
```

### Count-Up Animation with Reanimated
```typescript
import { useEffect } from 'react';
import { Text } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedProps,
  withTiming,
  useDerivedValue,
} from 'react-native-reanimated';

const AnimatedText = Animated.createAnimatedComponent(Text);

function CountUp({ to, duration = 1500 }: { to: number; duration?: number }) {
  const count = useSharedValue(0);

  useEffect(() => {
    count.value = withTiming(to, { duration });
  }, [to, count, duration]);

  // For web/text display, use useAnimatedStyle or a polling approach
  // since animatedProps doesn't work with Text on web.
  // Alternative: use a JS interval for cross-platform compatibility.
}
```

**Important note on count-up:** `Animated.createAnimatedComponent(Text)` with `useAnimatedProps` for the `text` prop may not work reliably on React Native Web. A simpler cross-platform approach is a `useEffect` with `requestAnimationFrame` or a short `setInterval` that increments from 0 to target over ~1.5 seconds, using `useState` for the displayed value.

### Standalone Search Input (Not react-hook-form)
```typescript
// The existing TextField component requires react-hook-form `control`.
// For the search input on the data fetching screen, use a plain TextInput
// or create a thin wrapper since this is query state, not form state.
import { TextInput, View, Platform } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

function SearchInput({ value, onChangeText, placeholder }: {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
}) {
  return (
    <View className="flex-row items-center bg-white/5 border border-white/15 rounded-xl px-4 py-3">
      <MaterialIcons name="search" size={20} color="rgba(255,255,255,0.5)" />
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="rgb(156, 163, 175)"
        className="flex-1 ml-2 text-white font-body text-base"
        style={Platform.OS === 'web' ? { outlineStyle: 'none' } : undefined}
      />
    </View>
  );
}
```

### Filter Dropdown (Standalone, not react-hook-form)
```typescript
// The existing Select component requires react-hook-form control.
// For filter dropdowns, build a simpler standalone select or
// wrap the Dropdown component with value state.
// Option: Use the existing Dropdown component with a trigger that shows selected value.
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| `cacheTime` option | `gcTime` option | TanStack Query v5 | Renamed; same behavior -- controls garbage collection timeout |
| `useQuery(key, fn, options)` | `useQuery({ queryKey, queryFn, ...options })` | TanStack Query v5 | Single object argument only -- no overloads |
| `onSuccess`/`onError` on useQuery | Removed from useQuery | TanStack Query v5 | Use `useEffect` with `data`/`error` or handle in queryFn; still available on useMutation |
| `queryCache.find(key)` | `queryCache.find({ queryKey })` | TanStack Query v5 | Object parameter signature |
| Supabase insert returns data | Insert/update/delete require `.select()` | supabase-js v2 | Must chain `.select()` to get returned rows |

**Deprecated/outdated:**
- `cacheTime`: Renamed to `gcTime` in TanStack Query v5
- `useQuery` callbacks (`onSuccess`, `onError`, `onSettled`): Removed from useQuery in v5 (still on useMutation)
- `isLoading` on useQuery: Renamed to `isPending` in v5 (isLoading is `isPending && isFetching`)

## Open Questions

1. **pg_trgm extension availability on Supabase cloud**
   - What we know: Supabase projects have many extensions available but pg_trgm may need explicit enabling
   - What's unclear: Whether the cloud project already has it enabled
   - Recommendation: Use simple `ILIKE` without trigram index initially; if search is slow, enable `pg_trgm` via SQL editor

2. **Entity type selection (Claude's Discretion)**
   - What we know: Need an entity with title, description, category (filterable), priority (filterable), status -- demonstrating all patterns
   - Recommendation: Use "projects" or "tasks" as the entity -- familiar domain, natural categories (frontend/backend/design), priorities (high/medium/low), statuses (active/completed/archived). "Tasks" is slightly better because it's a more recognizable CRUD domain and naturally maps to create/edit/delete actions.

3. **Count-up animation cross-platform reliability**
   - What we know: Reanimated's `createAnimatedComponent(Text)` with `animatedProps` is unreliable on web; `useAnimatedProps` for text content has known issues
   - Recommendation: Use a JS `useEffect` with `requestAnimationFrame` loop for the count-up. Simple, cross-platform, no additional dependencies. Animation runs once on mount -- no performance concern.

## Validation Architecture

### Test Framework
| Property | Value |
|----------|-------|
| Framework | Jest 29.7.0 + @testing-library/react-native 13.3.3 |
| Config file | `apps/mobile/jest.config.js` |
| Quick run command | `cd apps/mobile && npx jest --testPathPattern="tests/(contexts\|hooks)" --no-coverage -x` |
| Full suite command | `cd apps/mobile && npx jest --no-coverage` |

### Phase Requirements -> Test Map
| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| DATA-01 | useItems hook returns paginated data with totalPages | unit | `npx jest tests/hooks/use-items.test.ts -x` | No -- Wave 0 |
| DATA-02 | useItems hook re-fetches when search/filter params change | unit | `npx jest tests/hooks/use-items.test.ts -x` | No -- Wave 0 |
| DATA-03 | Mutation hooks call Supabase and invalidate queries | unit | `npx jest tests/hooks/use-items.test.ts -x` | No -- Wave 0 |
| DATA-04 | Data fetching screen shows skeleton while loading | unit | `npx jest tests/screens/data-fetching.test.tsx -x` | No -- Wave 0 |
| STAT-01 | Cache viewer displays query cache entries | unit | `npx jest tests/screens/state-management.test.tsx -x` | No -- Wave 0 |
| STAT-02 | ToastProvider shows/hides toast, auto-dismisses | unit | `npx jest tests/contexts/toast.test.tsx -x` | No -- Wave 0 |
| STAT-03 | ModalProvider shows/hides modals, supports confirmation | unit | `npx jest tests/contexts/modal.test.tsx -x` | No -- Wave 0 |

### Sampling Rate
- **Per task commit:** `cd apps/mobile && npx jest --no-coverage -x`
- **Per wave merge:** `cd apps/mobile && npx jest --no-coverage`
- **Phase gate:** Full suite green before `/gsd:verify-work`

### Wave 0 Gaps
- [ ] `tests/hooks/use-items.test.ts` -- covers DATA-01, DATA-02, DATA-03 (TanStack Query hooks with mocked Supabase)
- [ ] `tests/screens/data-fetching.test.tsx` -- covers DATA-04 (screen rendering with loading/error states)
- [ ] `tests/screens/state-management.test.tsx` -- covers STAT-01 (cache viewer rendering)
- [ ] `tests/contexts/toast.test.tsx` -- covers STAT-02 (toast show/hide/auto-dismiss)
- [ ] `tests/contexts/modal.test.tsx` -- covers STAT-03 (modal show/hide/confirm)
- [ ] `tests/__mocks__/tanstack-query.ts` -- shared mock for QueryClient/useQuery/useMutation
- [ ] Extend `tests/__mocks__/supabase.ts` with `.from().select().range()` chain mocks
- [ ] Framework install: `npm install @tanstack/react-query --legacy-peer-deps`

## Sources

### Primary (HIGH confidence)
- [@tanstack/react-query npm](https://www.npmjs.com/package/@tanstack/react-query) - v5.90.x confirmed latest, React 18+ required
- [TanStack Query v5 React Native docs](https://tanstack.com/query/v5/docs/framework/react/react-native) - confirmed React Native compatibility, setup patterns
- [TanStack Query v5 Optimistic Updates](https://tanstack.com/query/v5/docs/react/guides/optimistic-updates) - onMutate/onError/onSettled pattern
- [TanStack Query v5 QueryCache reference](https://tanstack.com/query/v5/docs/reference/QueryCache) - subscribe(), findAll(), getAll() APIs
- [TanStack Query v5 Mutations](https://tanstack.com/query/v5/docs/react/guides/mutations) - useMutation API in v5
- [Supabase RLS docs](https://supabase.com/docs/guides/database/postgres/row-level-security) - policy structure per operation
- [Supabase Triggers docs](https://supabase.com/docs/guides/database/postgres/triggers) - trigger on auth.users pattern
- [Supabase JS select/insert/update/delete](https://supabase.com/docs/reference/javascript/select) - v2 API, .range(), .ilike(), .eq()
- Existing project source code - component APIs, layout structure, test infrastructure verified by direct reading

### Secondary (MEDIUM confidence)
- [Supabase community discussions on signup triggers](https://github.com/orgs/supabase/discussions/306) - SECURITY DEFINER pattern for trigger functions
- [Supabase pagination pattern](https://supalaunch.com/blog/supabase-nextjs-pagination) - range() with count: 'exact' verified approach
- [TanStack Query v5 migration guide](https://tanstack.com/query/latest/docs/framework/react/guides/migrating-to-v5) - API changes (cacheTime -> gcTime, removed useQuery callbacks)

### Tertiary (LOW confidence)
- Count-up animation with Reanimated on web -- cross-platform reliability uncertain; JS fallback recommended

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - TanStack Query v5 and Supabase-js v2 are well-documented, stable, already partially integrated
- Architecture: HIGH - Provider pattern, query hooks, and Context API patterns are established React patterns; project already uses this architecture
- Pitfalls: HIGH - Supabase RLS gotchas, v5 API changes, and accordion bug verified through source code and official docs
- Validation: MEDIUM - Test patterns follow established project conventions but TanStack Query mocking adds complexity

**Research date:** 2026-03-10
**Valid until:** 2026-04-10 (stable libraries, 30-day window)
