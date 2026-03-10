---
phase: 05-data-fetching-state-management
plan: 01
subsystem: infra
tags: [tanstack-query, supabase, context-api, toast, modal, rls, postgresql]

# Dependency graph
requires:
  - phase: 02-component-library
    provides: Alert, Modal, ModalContent, Button, Typography components
  - phase: 03-authentication
    provides: AuthProvider, Supabase client, auth context
provides:
  - QueryClient singleton with TanStack Query v5 defaults
  - ToastProvider with replace-not-append behavior and auto-dismiss
  - ModalProvider with confirmation and generic modal types
  - Item, CreateItemInput, UpdateItemInput database types
  - CATEGORIES, PRIORITIES, STATUSES const arrays
  - Supabase items table with RLS and per-user seed trigger
  - Extended Supabase mock with .from() chainable methods
affects: [05-02, 05-03, 05-04]

# Tech tracking
tech-stack:
  added: ["@tanstack/react-query ^5.90.21"]
  patterns: [context-provider-pattern, replace-not-append-toast, typed-modal-registry]

key-files:
  created:
    - apps/mobile/src/lib/query-client.ts
    - apps/mobile/src/types/database.ts
    - apps/mobile/src/contexts/toast.tsx
    - apps/mobile/src/contexts/modal.tsx
    - infra/supabase/migrations/20260310120000_create_items_table.sql
    - apps/mobile/tests/lib/query-client.test.ts
    - apps/mobile/tests/types/database.test.ts
    - apps/mobile/tests/contexts/toast.test.tsx
    - apps/mobile/tests/contexts/modal.test.tsx
  modified:
    - apps/mobile/app/_layout.tsx
    - apps/mobile/tests/__mocks__/supabase.ts
    - apps/mobile/package.json

key-decisions:
  - "Tasks entity chosen for demo data -- natural CRUD domain with frontend/backend/design/devops categories"
  - "35 seed items per user via SECURITY DEFINER trigger on auth.users INSERT"
  - "Provider nesting: ThemeProvider > AuthProvider > QueryClientProvider > ToastProvider > ModalProvider"
  - "Toast positioned fixed top-right on web, absolute top full-width on mobile"

patterns-established:
  - "Context provider pattern: createContext + Provider + useHook with throw on missing provider"
  - "Replace-not-append toast: single toast visible, new toast replaces existing, auto-dismiss with clearTimeout"
  - "Supabase mock chainable: .from().select/insert/update/delete returns chainable .eq/.ilike/.range/.order"

requirements-completed: [STAT-02, STAT-03]

# Metrics
duration: 5min
completed: 2026-03-10
---

# Phase 05 Plan 01: Infrastructure Foundation Summary

**TanStack Query v5 with QueryClient singleton, Toast/Modal context providers using existing Alert/Modal components, Supabase items table with RLS and per-user seed trigger**

## Performance

- **Duration:** 5 min
- **Started:** 2026-03-10T20:54:19Z
- **Completed:** 2026-03-10T20:59:41Z
- **Tasks:** 2
- **Files modified:** 12

## Accomplishments
- TanStack Query v5.90 installed and QueryClientProvider wrapping the entire app with sensible defaults (5min staleTime, 30min gcTime, retry 1)
- ToastProvider with replace-not-append behavior, 4-second auto-dismiss, platform-aware positioning, and Alert component rendering
- ModalProvider with confirmation (Cancel/Confirm) and generic (Close) modal types using existing Modal + ModalContent + Button components
- Supabase migration with items table, 4 RLS policies, indexes, and SECURITY DEFINER trigger seeding 35 realistic demo tasks per new user
- 25 new passing tests across 4 test suites (QueryClient config, database types, toast context, modal context)

## Task Commits

Each task was committed atomically:

1. **Task 1: Install TanStack Query, create QueryClient, database types, and Supabase migration** - `f8e4a61` (feat)
2. **Task 2: Create Toast and Modal context providers, wire all providers into root layout, and add tests** - `7a48ab6` (feat)

## Files Created/Modified
- `apps/mobile/src/lib/query-client.ts` - QueryClient singleton with TanStack Query v5 defaults
- `apps/mobile/src/types/database.ts` - Item, CreateItemInput, UpdateItemInput types and const arrays
- `apps/mobile/src/contexts/toast.tsx` - ToastProvider with useToast hook, Alert overlay rendering
- `apps/mobile/src/contexts/modal.tsx` - ModalProvider with useModal hook, confirmation/generic types
- `apps/mobile/app/_layout.tsx` - Root layout with QueryClientProvider + ToastProvider + ModalProvider wired
- `apps/mobile/tests/__mocks__/supabase.ts` - Extended with .from() chainable query methods
- `apps/mobile/tests/lib/query-client.test.ts` - 6 tests for QueryClient config
- `apps/mobile/tests/types/database.test.ts` - 6 tests for database types and constants
- `apps/mobile/tests/contexts/toast.test.tsx` - 6 tests for toast show/hide/auto-dismiss/replace
- `apps/mobile/tests/contexts/modal.test.tsx` - 7 tests for modal show/hide/confirm/cancel
- `infra/supabase/migrations/20260310120000_create_items_table.sql` - Full DDL with RLS + trigger
- `apps/mobile/package.json` - @tanstack/react-query dependency added

## Decisions Made
- Tasks entity chosen for Supabase demo data -- natural CRUD domain with categories (frontend, backend, design, devops), priorities (high, medium, low), statuses (active, completed, archived)
- 35 demo items per user (not 30 or 50) -- enough variety across all categories without being excessive
- SECURITY DEFINER on trigger function to bypass RLS during seed insert (trigger runs in auth context, not user context)
- Provider nesting order follows TanStack Query docs rationale: Auth wraps QueryClient (queries need auth), QueryClient wraps Toast/Modal (mutation callbacks may trigger query invalidation)
- Toast positioned fixed top-right (max-w-sm) on web, absolute full-width top on mobile -- platform-aware UX
- ModalProvider content supports both string and ReactNode -- string content auto-wrapped in Typography

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Fixed useRef initial value for TypeScript strict mode**
- **Found during:** Task 2 (Toast context)
- **Issue:** `useRef<ReturnType<typeof setTimeout>>()` without initial value causes TS2554 in strict mode
- **Fix:** Changed to `useRef<ReturnType<typeof setTimeout>>(undefined)` with explicit initial value
- **Files modified:** apps/mobile/src/contexts/toast.tsx
- **Verification:** TypeScript check passes with no errors in toast.tsx
- **Committed in:** 7a48ab6 (Task 2 commit)

**2. [Rule 1 - Bug] Fixed test helpers using HTML elements instead of React Native components**
- **Found during:** Task 2 (Toast and Modal tests)
- **Issue:** Test helpers used `<button>` and `<text>` HTML elements which cause TS errors with React Native types
- **Fix:** Changed to `<Pressable>` and `<Text>` from react-native
- **Files modified:** tests/contexts/toast.test.tsx, tests/contexts/modal.test.tsx
- **Verification:** TypeScript check passes, all tests still pass
- **Committed in:** 7a48ab6 (Task 2 commit)

---

**Total deviations:** 2 auto-fixed (2 bugs)
**Impact on plan:** Both auto-fixes were TypeScript strictness corrections. No scope creep.

## Issues Encountered
- Pre-commit hooks prevented TDD RED-phase commit of failing tests (lint-staged catches unresolvable imports). Combined RED+GREEN into single commit per task instead of separate test/implementation commits.
- Pre-existing test failure in `tests/screens/meet-jim.test.tsx` from uncommitted changes to `meet-jim.tsx` -- not caused by this plan, out of scope.

## User Setup Required
None - no external service configuration required. Supabase migration must be applied to the project database when deploying.

## Next Phase Readiness
- TanStack Query infrastructure ready for data-fetching hooks (Plan 02)
- Toast and Modal contexts ready for CRUD feedback and delete confirmation
- Database types ready for query/mutation type safety
- Supabase mock extended for unit testing data operations

## Self-Check: PASSED

All 9 created files verified on disk. Both task commits (f8e4a61, 7a48ab6) verified in git log.

---
*Phase: 05-data-fetching-state-management*
*Completed: 2026-03-10*
