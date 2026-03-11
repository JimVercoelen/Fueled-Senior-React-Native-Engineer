# Supabase Infrastructure

Supabase cloud project providing authentication (magic link) and a Postgres database with Row Level Security for the Fueled Technical Showcase app.

## Cloud Setup

1. **Create a project** at [supabase.com/dashboard](https://supabase.com/dashboard) (free tier works)
2. **Enable Email auth** under Authentication -> Providers -> Email
3. **Set Site URL** to your production URL under Authentication -> URL Configuration
4. **Add Redirect URLs:**
   - `http://localhost:8081` (local development)
   - `https://your-vercel-url.vercel.app` (production)
5. **Copy credentials** from Settings -> API:
   - Project URL -> `EXPO_PUBLIC_SUPABASE_URL`
   - anon key -> `EXPO_PUBLIC_SUPABASE_ANON_KEY`

## Database Schema

### `items` Table

The primary data table used by the Data Fetching demo screen. Stores task-like items that users can create, read, update, and delete.

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

### Row Level Security (RLS) Policies

All policies enforce that users can only access their own data (`auth.uid() = user_id`):

| Policy | Operation | Rule |
|---|---|---|
| Users can view own items | SELECT | `auth.uid() = user_id` |
| Users can insert own items | INSERT | `auth.uid() = user_id` |
| Users can update own items | UPDATE | `auth.uid() = user_id` (both USING and WITH CHECK) |
| Users can delete own items | DELETE | `auth.uid() = user_id` |

### Seed Trigger

A `SECURITY DEFINER` function `seed_user_items()` runs on `AFTER INSERT` on `auth.users`. It creates 35 demo items per new user across 4 categories (frontend, backend, design, devops) with varied priorities and statuses. This ensures every new user immediately has data to explore in the Data Fetching demo.

## Migrations

Migration files in `migrations/` are applied in chronological order:

| File | Description |
|---|---|
| `20260310120000_create_items_table.sql` | Creates items table, RLS policies, indexes, and seed trigger |

To apply migrations to a local Supabase instance:

```bash
npx supabase db reset
```

For production, migrations are applied via the Supabase dashboard (SQL Editor) or CLI push:

```bash
npx supabase db push
```

## Custom SMTP with Resend

By default, Supabase limits email sending to 2 emails per hour from a generic address. For production, configure Resend as the custom SMTP provider to send magic link emails from `info@vecotech.io`.

### Prerequisites

- A [Resend](https://resend.com) account
- The `vecotech.io` domain verified in Resend

### Step 1: Add Domain in Resend

1. Go to [Resend Dashboard](https://resend.com/domains) -> Domains -> Add Domain
2. Enter `vecotech.io`
3. Resend will provide DNS records to add

### Step 2: Add DNS Records

Add the following records at your domain registrar's DNS management:

- **SPF** (TXT record) -- Authorizes Resend to send email for your domain
- **DKIM** (CNAME records) -- Cryptographic email signing
- **DMARC** (TXT record) -- Email authentication policy

The exact values are provided by the Resend dashboard after adding the domain.

### Step 3: Verify Domain

1. Return to Resend Dashboard -> Domains
2. Click "Verify" next to vecotech.io
3. DNS propagation can take up to 24 hours

### Step 4: Create API Key

1. Go to Resend Dashboard -> API Keys -> Create API Key
2. Save the key securely -- it will be used as the SMTP password

### Step 5: Configure Supabase SMTP

1. Go to Supabase Dashboard -> Authentication -> SMTP Settings
2. Enable "Custom SMTP"
3. Enter the following credentials:

| Setting | Value |
|---|---|
| Host | `smtp.resend.com` |
| Port | `465` |
| Username | `resend` |
| Password | Your Resend API Key |
| Sender email | `info@vecotech.io` |
| Sender name | `Fueled Showcase` |

4. Save and test by triggering a magic link login

## Environment Variables

| Variable | Where to Set | Purpose |
|---|---|---|
| `EXPO_PUBLIC_SUPABASE_URL` | `.env.local`, Vercel env vars, GitHub Secrets | Supabase API endpoint |
| `EXPO_PUBLIC_SUPABASE_ANON_KEY` | `.env.local`, Vercel env vars, GitHub Secrets | Supabase anonymous key (safe for client) |
| `VERCEL_TOKEN` | GitHub Secrets only | Vercel deployment token (CI/CD) |
| `VERCEL_ORG_ID` | GitHub Secrets only | Vercel organization ID (CI/CD) |
| `VERCEL_PROJECT_ID` | GitHub Secrets only | Vercel project ID (CI/CD) |
