# Fueled Technical Showcase

A React Native showcase app demonstrating production-quality patterns for Fueled's senior engineer evaluation. Built with Expo, NativeWind, Supabase, and TanStack Query.

## Structure

```
apps/mobile/     → Expo React Native app (web + mobile)
infra/supabase/  → Supabase configuration and migrations
```

## Quick Start

```bash
# Install all workspace dependencies
npm install

# Start the mobile app (web)
npm run dev

# Lint
npm run lint

# Format
npm run format
```

See each app's README for detailed setup instructions.

## Tech Stack

- **Framework:** Expo SDK 55 + Expo Router
- **Styling:** NativeWind v4 (Tailwind CSS for React Native)
- **Backend:** Supabase (auth, database)
- **Language:** TypeScript (strict mode)
- **Quality:** ESLint (flat config) + Prettier + Husky pre-commit hooks
