# Supabase Infrastructure

Supabase project providing authentication (magic link) and a Postgres database with Row Level Security for the Fueled Technical Showcase app.

## Prerequisites

- **Supabase CLI** (`npx supabase`)
- **Docker** (required for local Supabase)

## Local Setup

1. **Start local Supabase:**

   ```bash
   cd infra/supabase
   npx supabase start
   ```

   This starts Postgres, Auth, Storage, and Studio locally via Docker.

2. **Apply migrations:**

   ```bash
   npx supabase db reset
   ```

3. **Access local services:**

   | Service | URL |
   |---|---|
   | Studio | http://localhost:54323 |
   | API | http://localhost:54321 |
   | Database | postgresql://postgres:postgres@localhost:54322/postgres |

4. **Copy local credentials to the mobile app:**

   After `supabase start`, the CLI prints your local `API URL` and `anon key`. Add them to `apps/mobile/.env.local`.

## Database Schema

### `items` Table

The primary data table for the Data Fetching demo screen. Stores task-like items scoped per user.

| Column | Type | Default | Description |
|---|---|---|---|
| `id` | UUID | `gen_random_uuid()` | Primary key |
| `user_id` | UUID | -- | Foreign key to `auth.users(id)`, cascade delete |
| `title` | TEXT | -- | Item title (required) |
| `description` | TEXT | -- | Optional description |
| `category` | TEXT | `'frontend'` | Category: frontend, backend, design, devops |
| `priority` | TEXT | `'medium'` | Priority: low, medium, high |
| `status` | TEXT | `'active'` | Status: active, completed, archived |
| `created_at` | TIMESTAMPTZ | `now()` | Creation timestamp |
| `updated_at` | TIMESTAMPTZ | `now()` | Last update timestamp |

### Indexes

- `idx_items_user_id` on `user_id` -- Optimizes RLS policy checks and user-scoped queries
- `idx_items_category` on `category` -- Optimizes filter-by-category queries

### Row Level Security (RLS)

All policies enforce that users can only access their own data (`auth.uid() = user_id`):

| Policy | Operation | Rule |
|---|---|---|
| Users can view own items | SELECT | `auth.uid() = user_id` |
| Users can insert own items | INSERT | `auth.uid() = user_id` |
| Users can update own items | UPDATE | `auth.uid() = user_id` (both USING and WITH CHECK) |
| Users can delete own items | DELETE | `auth.uid() = user_id` |

### Seed Trigger

A `SECURITY DEFINER` function `seed_user_items()` runs on `AFTER INSERT` on `auth.users`. It creates 35 demo items per new user across 4 categories (frontend, backend, design, devops) with varied priorities and statuses.

## Migrations

Migration files in `migrations/` are applied in chronological order:

| File | Description |
|---|---|
| `20260310120000_create_items_table.sql` | Creates items table, RLS policies, indexes, and seed trigger |

**Reset local database** (drops and re-applies all migrations):

```bash
npx supabase db reset
```

**Create a new migration:**

```bash
npx supabase migration new <name>
```

## Deployment

Migrations are automatically applied to production via GitHub Actions CI/CD pipeline on push to `main`.

See [`.github/workflows/ci.yml`](../../.github/workflows/ci.yml) for the full pipeline configuration.
