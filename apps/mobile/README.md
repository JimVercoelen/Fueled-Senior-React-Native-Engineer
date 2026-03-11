# Mobile App

Expo React Native app with NativeWind styling, Expo Router navigation, TanStack Query data fetching, and Supabase authentication. Built as a web-deployable showcase for Fueled's senior engineer evaluation.

## Prerequisites

- **Node.js** >= 20.19.4 (see `.nvmrc` for exact version)
- **npm** >= 10.8.2

## Setup

1. **Navigate to the app directory:**

   ```bash
   cd apps/mobile
   ```

2. **Use the correct Node version:**

   ```bash
   nvm use
   ```

3. **Install dependencies:**

   ```bash
   npm install --legacy-peer-deps
   ```

   > `--legacy-peer-deps` is required due to a React 19 peer dependency conflict with react-test-renderer.

4. **Configure environment variables:**

   ```bash
   cp .env.example .env.local
   ```

   Add your Supabase credentials to `.env.local`:

   ```
   EXPO_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   EXPO_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   ```

5. **Start the development server:**

   ```bash
   npx expo start --web
   ```

## Available Scripts

| Script    | Command                | Description            |
| --------- | ---------------------- | ---------------------- |
| `dev`     | `expo start --web`     | Start dev server (web) |
| `start`   | `expo start`           | Start Expo dev server  |
| `test`    | `jest`                 | Run test suite         |
| `lint`    | `eslint .`             | Lint codebase          |
| `format`  | `prettier --write .`   | Format codebase        |
| `ios`     | `expo start --ios`     | Start iOS simulator    |
| `android` | `expo start --android` | Start Android emulator |

## Project Structure

```
app/
  _layout.tsx             -- Root layout with providers
  (auth)/
    login.tsx             -- Magic link login screen
  (dashboard)/
    _layout.tsx           -- Dashboard layout with persistent header
    index.tsx             -- Dashboard with navigation cards
    data-fetching.tsx     -- TanStack Query CRUD demo
    state-management.tsx  -- Cache viewer, toast/modal demos
    components.tsx        -- Live component playground
    meet-jim.tsx          -- About the author
    the-showcase.tsx      -- Requirements checklist + tech stack
    profile.tsx           -- User profile with sign out

src/
  components/
    ui/                   -- Button, Card, Typography, Badge, Avatar, Divider, Table, ScrollToTop
    forms/                -- TextField, Select, MultiSelect, Toggle, Checkbox, Field
    feedback/             -- Modal, Alert, ErrorBoundary, Skeleton
    layout/               -- Tabs, Accordion, Dropdown, List
    index.ts              -- Barrel export for all components
  contexts/
    auth.tsx              -- AuthProvider with Supabase session management
    toast.tsx             -- ToastProvider for global notifications
    modal.tsx             -- ModalProvider for programmatic modals
  hooks/
    use-items.ts          -- TanStack Query hooks for CRUD operations
    use-cache-entries.ts  -- Cache snapshot hook for state management demo
    use-debounced-value.ts -- Debounced input for search
  constants/
    colors.ts             -- Color palette and gradients
    requirements.ts       -- Fueled requirement mapping data
    tech-stack.ts         -- Tech stack with rationale
    author.ts             -- Author profile data
  lib/
    supabase.ts           -- Supabase client initialization
    query-client.ts       -- TanStack Query client configuration
  types/
    database.ts           -- Database types (Item, CreateItemInput, etc.)

tests/
  components/
    ui/                   -- Button, Card, Badge, Typography tests
    forms/                -- TextField, Toggle tests
  contexts/               -- Auth, Toast, Modal provider tests
  hooks/                  -- useItems, useCacheEntries, useDebouncedValue tests
  screens/                -- Dashboard, data-fetching, meet-jim, the-showcase, state-management, components tests
  lib/                    -- QueryClient config tests
  types/                  -- Database type tests
  __mocks__/              -- Supabase mock with chainable API
  helpers/                -- FormTestWrapper for react-hook-form tests
  setup.ts                -- Global test setup (reanimated, expo-router, vector-icons mocks)
```

## Tech Stack

| Library               | Why                                                                          |
| --------------------- | ---------------------------------------------------------------------------- |
| Expo SDK 55           | Cross-platform with excellent web support via Metro bundler                  |
| NativeWind v4         | Tailwind CSS for React Native -- familiar DX, fast styling, responsive       |
| TanStack Query v5     | Server state management with caching, optimistic updates, cache invalidation |
| react-hook-form + Yup | Performant forms with schema validation and minimal re-renders               |
| Supabase              | Auth (magic link) + Postgres database with Row Level Security                |
| Reanimated 4          | 60fps animations for micro-interactions and transitions                      |
| Expo Router           | File-based routing with type-safe navigation                                 |

## Testing

- **Framework:** Jest 29 + React Native Testing Library 13
- **Test count:** 109+ tests across 19 test suites
- **Coverage areas:** UI components, form controls, custom hooks, context providers, screens

**Run tests:**

```bash
npm test

# With force exit (prevents hanging workers)
npx jest --forceExit
```

**Test patterns used:**

- Behavior-only testing (no NativeWind className assertions)
- FormTestWrapper for react-hook-form controlled component tests
- Shared fixtures at `src/__fixtures__/` for consistent test data
- Chainable Supabase mock with `lastFrom` pattern for mutation testing

## Deployment

The app is deployed to Vercel via GitHub Actions CI/CD pipeline.

- **Trigger:** Push to `main` branch (after lint and test jobs pass)
- **Build command:** `npx expo export -p web`
- **Output:** Static SPA with client-side routing
- **Config:** See `vercel.json` for SPA rewrites and build settings

See [`.github/workflows/ci.yml`](../../.github/workflows/ci.yml) for the full pipeline configuration.
