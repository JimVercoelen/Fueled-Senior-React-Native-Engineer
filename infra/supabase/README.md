# Supabase

Supabase project configuration and database migrations.

## Setup

1. Create a project at [supabase.com/dashboard](https://supabase.com/dashboard) (free tier)
2. Enable Email auth under Authentication → Providers
3. Set Site URL to `http://localhost:8081` under Authentication → URL Configuration
4. Copy your Project URL and anon key from Project Settings → API

```bash
# Create environment file
cp .env.example .env.local
```

Add your credentials to `.env.local`:

```
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

## Local Development (optional)

```bash
# Requires Docker
npx supabase start
npx supabase db reset
```

## Migrations

```
migrations/    → SQL migration files applied in order
config.toml    → Supabase CLI configuration
```
