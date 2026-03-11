# Fueled Technical Showcase

![CI/CD](https://github.com/JimVercoelen/Fueled-Senior-React-Native-Engineer/actions/workflows/ci.yml/badge.svg)

A React Native (Expo) showcase app demonstrating production-quality patterns for Fueled's senior engineer evaluation. Every screen maps directly to a required competency -- the app itself is the proof of skill.

[Live Demo](https://your-vercel-url.vercel.app)

## Tech Stack

| Technology | Version | Purpose |
|---|---|---|
| React Native | 0.83 | Cross-platform UI framework |
| Expo SDK | 55 | Development platform and web deployment |
| TypeScript | 5.9 | Static typing across the codebase |
| NativeWind | v4 | Tailwind CSS for React Native styling |
| TanStack Query | v5 | Server state management with caching |
| Supabase | v2 | Authentication (magic link) and Postgres database |
| react-hook-form | v7 | Performant form state management |
| Yup | v1 | Schema-based form validation |
| Reanimated | v4 | 60fps animations and micro-interactions |
| Jest + RNTL | v29 / v13 | Automated testing (109+ tests) |

## Project Structure

```
Fueled-Senior-React-Native-Engineer/
  apps/mobile/         -- Expo React Native app (web + mobile)
  infra/supabase/      -- Supabase config, migrations, RLS policies
  .github/workflows/   -- CI/CD pipeline (lint, test, deploy)
  .planning/           -- Development planning documentation
```

## Key Features

- **Magic Link Authentication** -- Passwordless auth via Supabase with custom email domain (info@vecotech.io)
- **Component Library** -- 20+ reusable components (Button, Card, Typography, Badge, Avatar, TextField, Select, MultiSelect, Toggle, Checkbox, Modal, Alert, Tabs, Accordion, Dropdown, Skeleton, and more)
- **Interactive Playground** -- MUI-style live component playground where reviewers can explore every component variant
- **Data Fetching Demo** -- Paginated CRUD with search, filters, optimistic updates, and cache invalidation via TanStack Query
- **State Management Demo** -- Live TanStack Query cache viewer, toast system, and modal system
- **Automated Testing** -- 109+ tests covering UI components, form controls, hooks, contexts, and screens
- **CI/CD Pipeline** -- GitHub Actions runs lint and tests on every push; deploys to Vercel on merge to main

## Documentation

- **[Mobile App Guide](apps/mobile/README.md)** -- Setup, scripts, project structure, and tech rationale
- **[Supabase Infrastructure](infra/supabase/README.md)** -- Database schema, RLS policies, migrations, and SMTP setup

## Author

**Jim Vercoelen** -- Senior React Native Engineer

Built as a technical submission for Fueled, demonstrating React Native expertise, TypeScript proficiency, meaningful React patterns, and professional engineering practices.
