# Phase 5: Data Fetching + State Management - Context

**Gathered:** 2026-03-10
**Status:** Ready for planning

<domain>
## Phase Boundary

Two demo screens that showcase production-quality React patterns: (1) a Data Fetching screen with paginated list, server-side search/filter, and CRUD mutations via TanStack Query + Supabase, and (2) a State Management screen with a read-only live TanStack Query cache viewer. Toast and modal Context API providers are wired app-wide and integrated into data fetching (CRUD feedback, delete confirmation) and the component playground (interactive demos).

</domain>

<decisions>
## Implementation Decisions

### Data source & entity
- Supabase-only — one table for everything (list, search, filter, CRUD mutations)
- Entity type: Claude's discretion — pick what best demonstrates pagination, search, filter, and mutations
- Seed data via SQL migration (30-50 records) — reproducible, committed to repo
- RLS enabled — only authenticated users can create/update/delete, reads scoped to user
- Records linked to user (user_id column) — each user has their own data
- Seed data per user via Supabase DB trigger function on new sign-up (not a one-time migration seed)

### Data fetching screen
- Screen layout: Claude's discretion — pick the layout that best showcases the patterns (tabbed, single-page, or modal-based CRUD)
- Pagination: Page controls (Previous/Next buttons), not infinite scroll — uses useQuery with page param
- Search & filter: Server-side — search/filter params sent to Supabase, triggers new query (not client-side filtering)
- Debounced search input + filter dropdowns above the list
- Changing search/filter resets pagination to page 1
- Loading state: Skeleton component with spinner inside for simplicity
- Error handling: Alert shown as toast via Context API — generic "Oops! Something went wrong. Please try again." copy
- Retry: Via page refresh / pull-to-refresh (not inline retry button)
- Optimistic updates on mutations (UI updates before server confirms) + cache invalidation

### State management screen
- Cache viewer ONLY — read-only, no actions or demo triggers on this screen
- Displays live TanStack Query cache as styled JSON showing current app state
- Cache viewer design: Claude's discretion

### Toast system (Context API)
- ToastProvider wired app-wide (wraps entire app)
- Uses existing Alert component for rendering
- Reference implementation: logbook's ToastContext.tsx pattern — replace-not-append, auto-dismiss with timeout, pressable to dismiss
- Toast position: Claude's discretion (logbook uses top-right on web, full-width top on mobile)
- Integrated into data fetching screen for CRUD success/error feedback
- Interactive demo on component playground — trigger toasts of all severity variants (success, error, warning, info)

### Modal system (Context API)
- ModalProvider wired app-wide (wraps entire app)
- Reference implementation: logbook's ModalContext.tsx pattern — stack-based, typed modal registry
- Uses existing Modal + ModalContent components
- Integrated into data fetching screen for delete confirmation ("Are you sure?")
- Interactive demo on component playground — confirmation modal and other variants
- Simplified version of logbook's modal types — this showcase only needs generic/confirmation modals

### Claude's Discretion
- Entity type for Supabase table (projects, tasks, contacts — whatever demonstrates patterns best)
- Data fetching screen layout structure (tabs, single-page, or modal-based CRUD)
- Cache viewer visual design (JSON tree, formatted cards, etc.)
- Toast position on screen
- Exact Supabase DB trigger implementation for per-user seed data
- TanStack Query configuration (stale time, cache time, retry policies)

</decisions>

<specifics>
## Specific Ideas

- Reference source code for toast/modal Context: logbook's ToastContext.tsx and ModalContext.tsx — port and adapt patterns
- Logbook's ToastContext: replace-not-append toast behavior, auto-dismiss after 4s, platform-aware positioning
- Logbook's ModalContext: stack-based modal system with typed modal map and hideModal injection
- Error toast copy: "Oops! Something went wrong. Please try again." — generic for now
- User wants each user to have isolated demo data via DB trigger on sign-up, not shared seed data

</specifics>

<code_context>
## Existing Code Insights

### Reusable Assets
- Modal component (`src/components/feedback/Modal.tsx`): RN Modal wrapper with backdrop, fade/slide animation
- ModalContent component (`src/components/feedback/ModalContent.tsx`): Styled modal body
- Alert component (`src/components/feedback/Alert.tsx`): Typed alerts (success/info/warning/error) with icons, animated enter/exit
- Skeleton component (`src/components/feedback/Skeleton.tsx`): Loading placeholder
- Tabs component (`src/components/layout/Tabs.tsx`): Underline-style tabs — noted for reuse in these screens
- List component (`src/components/layout/List.tsx`): Rendered list items
- Table component (`src/components/ui/Table.tsx`): Bordered rows with header
- TextField, Select, MultiSelect (`src/components/forms/`): Form inputs for search/filter
- Button, Card, Typography, Badge (`src/components/ui/`): Core UI
- Supabase client (`src/lib/supabase.ts`): Configured and ready
- Auth hook (`src/hooks/auth.tsx`): Session/user access

### Established Patterns
- NativeWind 4.x with dark theme — all styling via Tailwind classes
- Orbitron headings (uppercase), Inter body text
- Flat components with `border-white/15` borders, `bg-white/5` hover states
- Data-driven screens: typed constants in `src/constants/` consumed by screen components
- react-hook-form for form state management (already installed)
- Yup for validation (already installed)

### Integration Points
- Placeholder screens exist: `app/(dashboard)/data-fetching.tsx` and `app/(dashboard)/state-management.tsx` — replace with real implementations
- Component playground at `app/(dashboard)/components.tsx` — add toast/modal interactive demos
- Toast/Modal providers wrap at root layout level (`app/_layout.tsx` or `app/(dashboard)/_layout.tsx`)
- TanStack Query needs to be installed (not yet in package.json) — QueryClientProvider at root
- Supabase migration for new table goes in `infra/supabase/migrations/`
- DB trigger function for per-user seed data goes in Supabase (migration or edge function)

</code_context>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 05-data-fetching-state-management*
*Context gathered: 2026-03-10*
