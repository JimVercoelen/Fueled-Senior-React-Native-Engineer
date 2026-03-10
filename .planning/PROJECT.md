# Fueled Technical Showcase

## What This Is

A React Native showcase app built as a technical submission for a Senior React Native Engineer position at Fueled. The app is a living portfolio — each screen directly demonstrates a required competency (React Native, TypeScript, meaningful React patterns, automated testing). Deployed as a web build on Vercel so reviewers can click a link and explore immediately.

## Core Value

Every screen must clearly and impressively demonstrate the Fueled requirement it represents — the app *is* the proof of skill.

## Requirements

### Validated

(None yet — ship to validate)

### Active

- [ ] Supabase magic link authentication with custom email (info@vecotech.io via Resend)
- [ ] Dashboard with 4 rich cards (icon, title, description, tech tags) navigating to demo screens
- [ ] Data Fetching screen: paginated list, search + filter, mutations, loading/error states via TanStack Query
- [ ] State Management screen: TanStack Query cache viewer displaying live app state as styled JSON
- [ ] Component Library screen: MUI-style live playground with all reusable components grouped by section
- [ ] Component set — Core UI: Button, Card, Typography, Badge, Avatar, Divider
- [ ] Component set — Form Controls: TextField, Select, MultiSelect, Toggle, Checkbox, Radio
- [ ] Component set — Feedback: Toast (Context API), Modal (Context API), Alert, Skeleton loader
- [ ] Component set — Layout: Lists, Grid, Dropdown/Menu, Tabs, Accordion
- [ ] About screen: Fueled requirement checklist mapping + author section with mini cover letter
- [ ] Automated tests with Jest + React Native Testing Library across components and hooks
- [ ] Vercel web deployment with GitHub Actions CI/CD (deploy on merge to master, tests must pass)
- [ ] READMEs: root overview, apps/mobile setup guide, infra/supabase guide

### Out of Scope

- Native mobile builds (iOS/Android) — web-only deployment, mobile-friendly styling
- OAuth/social login — magic link only
- Real backend data/business logic — demo data and public APIs sufficient
- App Store submission — Vercel web deploy only
- E2E testing (Detox/Maestro) — Jest + RNTL sufficient for this scope

## Context

**Assignment**: Fueled requires code samples demonstrating React Native, TypeScript, meaningful React code (data fetching, state management, complex components, hooks), and automated testing. Submissions must be a singular application with an explanation of what reviewers should look for.

**Strategy**: Instead of pulling files from past NDA projects, build a purpose-built showcase app where the app itself is the portfolio. Each screen maps directly to a required competency area. The About screen serves as both the required explanation and a mini cover letter.

**Reviewer experience**: They'll receive a Vercel URL, click it, see a login screen, get a magic link email, and land on a dashboard that guides them through each demo area. The About page tells them exactly what to look for and where.

## Constraints

- **Tech stack**: React Native (Expo) + TypeScript + NativeWind + Expo Router + TanStack Query + Context API + Supabase
- **Deployment**: Vercel web build only — must be mobile-friendly but no native builds
- **Auth**: Supabase magic link with Resend email (info@vecotech.io) in production
- **Monorepo**: Single repo, `apps/mobile/` + `infra/supabase/`
- **CI/CD**: GitHub Actions — lint, test, build on push; deploy on merge to master only if tests pass
- **Testing**: Jest + React Native Testing Library
- **Styling**: NativeWind (Tailwind CSS for React Native)

## File Structure

```
root/
├── apps/
│   └── mobile/
│       ├── app/                    # Expo Router
│       │   ├── (auth)/             # Auth group: login, magic link
│       │   └── (dashboard)/        # Main app: home, demos
│       ├── src/
│       │   ├── actions/            # Data mutations / API actions
│       │   ├── components/         # Shared UI (buttons, forms, modals, etc.)
│       │   ├── constants/          # Config, routes, errors
│       │   ├── contexts/           # Auth, Modal, Toast providers
│       │   ├── hooks/              # TanStack Query + custom hooks
│       │   ├── lib/                # Supabase client, utilities
│       │   ├── types/              # TypeScript types
│       │   ├── utils/              # Helpers
│       │   ├── __fixtures__/       # Test data
│       │   └── __mocks__/          # Test mocks (Supabase etc.)
│       ├── assets/                 # Images
│       ├── package.json
│       ├── app.json
│       ├── tsconfig.json
│       ├── tailwind.config.js
│       └── vercel.json
├── infra/
│   └── supabase/
│       ├── migrations/             # SQL schema migrations
│       ├── functions/              # Edge Functions
│       ├── config.toml
│       └── .env.*
├── .github/
│   └── workflows/                  # CI/CD
├── .claude/
├── .planning/
├── .vscode/
└── README.md
```

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Build showcase app instead of pulling NDA files | Purpose-built app tells a stronger story — every file is intentional | — Pending |
| Expo + web deploy on Vercel | Reviewers click a URL instead of cloning a repo — lowest friction | — Pending |
| NativeWind over Tamagui/StyleSheet | Shows Tailwind familiarity, fast to build, good cross-platform support | — Pending |
| TanStack Query over raw useEffect | Industry-standard server state — shows modern React patterns | — Pending |
| Context API for Toast/Modal over Zustand | Demonstrates built-in React patterns without unnecessary dependencies | — Pending |
| Magic link only, no OAuth | Simpler auth flow, still demonstrates Supabase integration fully | — Pending |
| Jest + RNTL without E2E | Sufficient for demonstrating testing competency without Detox/Maestro overhead | — Pending |
| MUI-style component playground | Visual proof of component quality — reviewers can interact, not just read code | — Pending |

---
*Last updated: 2026-03-10 after initialization*
