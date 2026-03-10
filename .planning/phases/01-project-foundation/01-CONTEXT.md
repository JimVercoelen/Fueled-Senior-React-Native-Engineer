# Phase 1: Project Foundation - Context

**Gathered:** 2026-03-10
**Status:** Ready for planning

<domain>
## Phase Boundary

Expo monorepo scaffolding, basic Supabase cloud + local CLI setup with auth enabled, NativeWind theming foundation, Expo Router navigation skeleton with placeholder screens, ESLint + Prettier, .gitignore. This is the base every subsequent phase builds on.

</domain>

<decisions>
## Implementation Decisions

### Visual identity & theming
- Dark UI throughout -- black/dark gray backgrounds, white/5-white/20 for surfaces
- Colors: Primary `#2563eb`, accent cyan `#06b6d4`, danger `#ef4444`, dangerOrange `#f97316`, gray500 `#6b7280`. No separate secondary color; cyan is the accent.
- Tailwind theme extended with primary (50-950 scale), danger, gradient-from/gradient-to. Default Tailwind neutrals/grays.
- Typography: Orbitron for headings and buttons (uppercase, semibold); Inter for body, captions, links. Sizes text-sm to text-4xl via Typography component variants.
- Borders on dark surfaces: `border-white/15` or `border-white/20` -- enough definition without being harsh
- Gradient (blue->cyan) only on contained/filled button variants, not on text buttons or other UI elements
- Background image with dark overlay on login screen only; in-app screens use solid dark background
- Usage pattern: Prefer Tailwind classes (text-primary, bg-primary); use Colors.* constant in style props; Gradients.* for LinearGradient
- App branding: `FUELED.SHOWCASE` in Orbitron (similar to MOTO.LOGBOOK style)

### Navigation skeleton
- Top header: `FUELED.SHOWCASE / breadcrumbs` in Orbitron. On small screens, show back arrow instead of full breadcrumbs.
- Bottom tabs: 2 tabs -- Dashboard (home icon) and Profile (person icon). Active tab has blue indicator line on top + blue icon/text.
- Tabs remain visible on all screens including demo sub-screens
- Dashboard tab: 4 centered cards linking to demo screens (Data Fetching, State Management, Component Library, About)
- Profile tab: Card showing "Signed in as" + user email. Danger-colored "SIGN OUT" button at the bottom.
- Logout lives in Profile tab, NOT in the header (differs from original DASH-03 spec)
- Login screen: Centered card on background image with dark overlay, email input + gradient "SEND MAGIC LINK" button

### Monorepo & package tooling
- npm workspaces (no yarn, pnpm, or Turborepo)
- ESLint (with typescript-eslint) + Prettier set up from Phase 1 -- every file from Phase 2 onward is consistently formatted
- Lint-on-save and pre-commit hooks (husky + lint-staged)
- npm scripts in root package.json for orchestration
- CI/CD lint check deferred to Phase 6 alongside test runs before deploy

### Supabase dev setup
- Local Supabase CLI for development (requires Docker) + cloud project for staging/production
- .env.local + .env.example pattern, one set per app (apps/mobile and infra/supabase)
- Auto-redeploy via GitHub Actions CI/CD in Phase 6

### Claude's Discretion
- Placeholder screen content style (screen title + coming soon, or requirement preview)
- Whether to create cloud Supabase project in Phase 1 or defer to Phase 3 (success criteria requires magic link works -- evaluate if local CLI satisfies this)
- Exact ESLint rule configuration
- Exact spacing, card sizing, and responsive breakpoints
- Pre-commit hook scope (lint-staged files only vs full lint)

</decisions>

<specifics>
## Specific Ideas

- Visual style inspired by Moto.Logbook app -- dark theme, centered content cards with subtle borders, background image on login, Orbitron uppercase headings
- Login screen: centered card with email input and gradient button, app name above in Orbitron (like MOTO.LOGBOOK login)
- Dashboard cards should feel like the Moto.Logbook vehicle detail cards -- dark bg, white/15-20 border, label text on top, main content below, icon on right
- Profile screen mirrors Moto.Logbook profile -- simple card with auth info, danger sign-out button at bottom
- Breadcrumb navigation in header follows the MOTO.LOGBOOK / section / page pattern

</specifics>

<code_context>
## Existing Code Insights

### Reusable Assets
- No existing source code -- greenfield project. All code will be created in this phase.

### Established Patterns
- No patterns yet -- this phase establishes them. Key patterns to set:
  - NativeWind theming configuration (tailwind.config.js)
  - Colors/Gradients constants module (src/constants/colors.ts)
  - Typography component with Orbitron/Inter font variants
  - Expo Router file-based routing structure

### Integration Points
- Monorepo root: package.json with workspaces, shared ESLint/Prettier configs
- apps/mobile/: Expo app with Router, NativeWind, Supabase client
- infra/supabase/: Supabase CLI project with config.toml, migrations, edge functions

</code_context>

<deferred>
## Deferred Ideas

- CI/CD lint + test checks before deploy -- Phase 6
- Resend custom email domain (info@vecotech.io) -- Phase 6
- Supabase auto-redeploy in GitHub Actions -- Phase 6

</deferred>

---

*Phase: 01-project-foundation*
*Context gathered: 2026-03-10*
