# Roadmap: Fueled Technical Showcase

## Overview

This roadmap delivers a React Native showcase app where every screen proves a Fueled competency. We start with project scaffolding and basic Supabase setup (auth enabled, default email for dev), then build the full component library with react-hook-form integration and a live playground screen (the largest body of work and a dependency for every screen), wire up authentication, assemble the dashboard and about screens, build the data fetching and state management demo screens (the reviewer's main evaluation targets), and finish with automated tests, CI/CD, Resend custom email domain for production, and Vercel deployment.

## Phases

**Phase Numbering:**
- Integer phases (1, 2, 3): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions (marked with INSERTED)

Decimal phases appear between their surrounding integers in numeric order.

- [ ] **Phase 1: Project Foundation** - Expo monorepo scaffolding, basic Supabase cloud setup with auth enabled, NativeWind, Expo Router, .gitignore
- [ ] **Phase 2: Component Library** - All reusable UI components with react-hook-form integration for form controls, and MUI-style live playground screen built alongside components
- [ ] **Phase 3: Authentication** - Magic link login, session persistence, logout, protected routes
- [ ] **Phase 4: Dashboard + About** - Navigation hub with rich cards, persistent header, about screen with checklist and cover letter
- [ ] **Phase 5: Data Fetching + State Management** - Demo screens for TanStack Query, mutations, cache viewer, toast and modal systems
- [ ] **Phase 6: Testing + CI/CD + Deployment** - Automated tests, GitHub Actions pipeline, Resend custom email domain (info@vecotech.io), Vercel deploy, READMEs

## Phase Details

### Phase 1: Project Foundation
**Goal**: A running Expo web app with NativeWind styling, Expo Router navigation skeleton, and a basic Supabase cloud project with auth enabled -- the base every subsequent phase builds on
**Depends on**: Nothing (first phase)
**Requirements**: INFR-01, INFR-05
**Success Criteria** (what must be TRUE):
  1. Running `npx expo start --web` opens the app in a browser with a visible placeholder screen
  2. NativeWind utility classes render correctly (e.g., a styled test element is visible)
  3. Expo Router navigates between at least two placeholder routes (auth group and dashboard group)
  4. Supabase cloud project exists with auth enabled; magic link login works with default Supabase email in dev
  5. .gitignore correctly excludes node_modules, .env files, and .claude while including .planning
**Plans**: TBD

Plans:
- [ ] 01-01: TBD
- [ ] 01-02: TBD

### Phase 2: Component Library
**Goal**: A complete set of reusable, styled UI components -- with form controls integrated with react-hook-form -- and an interactive playground screen at `app/(dashboard)/components` built incrementally alongside the components so every component can be visually verified during development
**Depends on**: Phase 1
**Requirements**: COMP-01, COMP-02, COMP-03, COMP-04, COMP-05, COMP-06, COMP-07, COMP-08, COMP-09, COMP-10, COMP-11, COMP-12, COMP-13, COMP-14, COMP-15, COMP-16, COMP-17
**Success Criteria** (what must be TRUE):
  1. Every component (Button, Card, Typography, Badge, Avatar, Table, List, Modal, Toast/Alert, TextField, Select, MultiSelect, Toggle, Checkbox, Dropdown, Tabs, Accordion, Skeleton) renders with all specified variants and states
  2. Form field components (TextField, Select, MultiSelect, Toggle, Checkbox) integrate with react-hook-form -- they accept `control` and `name` props and surface validation errors via react-hook-form's error state
  3. The playground screen at `app/(dashboard)/components` is built alongside the components (not after), so each component can be visually verified as it is developed
  4. The playground screen displays all components grouped by section (Core UI, Form Controls, Feedback, Layout) in an MUI-style interactive layout where users can toggle component variants
  5. Components use consistent NativeWind theming and are visually polished on both mobile and desktop viewport widths
**Plans**: TBD

Plans:
- [ ] 02-01: TBD
- [ ] 02-02: TBD
- [ ] 02-03: TBD

### Phase 3: Authentication
**Goal**: Users can securely access the app via magic link email, stay logged in across browser sessions, and be redirected when unauthenticated
**Depends on**: Phase 1
**Requirements**: AUTH-01, AUTH-02, AUTH-03, AUTH-04
**Success Criteria** (what must be TRUE):
  1. User enters email on login screen, receives a magic link email, clicks it, and is redirected into the app (uses default Supabase email in dev; production custom domain configured in Phase 6)
  2. User closes the browser tab, reopens the app URL, and is still logged in (session persists)
  3. User can log out from any screen and is returned to the login screen
  4. Visiting any dashboard/demo URL while logged out redirects to the login screen
**Plans**: TBD

Plans:
- [ ] 03-01: TBD
- [ ] 03-02: TBD

### Phase 4: Dashboard + About
**Goal**: Authenticated users land on a polished dashboard that guides them to each demo screen, and an About screen that tells reviewers exactly what to evaluate and who built it
**Depends on**: Phase 2, Phase 3
**Requirements**: DASH-01, DASH-02, DASH-03, ABUT-01, ABUT-02, ABUT-03, ABUT-04
**Success Criteria** (what must be TRUE):
  1. Dashboard displays 4 rich cards (with icon, title, description, and tech tags) that navigate to Data Fetching, State Management, Component Library, and About screens
  2. Dashboard shows a welcome greeting with the logged-in user's email
  3. A persistent header with logo and logout button is visible on every screen inside the app
  4. About screen shows a visual checklist mapping each Fueled requirement to where it is demonstrated in the app
  5. About screen includes author section with mini cover letter, tech stack rationale, and links to GitHub/portfolio/email
**Plans**: TBD

Plans:
- [ ] 04-01: TBD
- [ ] 04-02: TBD

### Phase 5: Data Fetching + State Management
**Goal**: Two demo screens that showcase production-quality React patterns -- paginated data fetching with search/filter/mutations via TanStack Query, and a state management screen with a live cache viewer, toast system, and modal system
**Depends on**: Phase 2, Phase 3
**Requirements**: DATA-01, DATA-02, DATA-03, DATA-04, STAT-01, STAT-02, STAT-03
**Success Criteria** (what must be TRUE):
  1. Data Fetching screen displays a paginated list from a public API with working infinite scroll or page controls
  2. User can search with debounced input and apply filter dropdowns, seeing query invalidation in action
  3. User can create, update, and delete items via Supabase with optimistic updates (UI updates before server confirms) and cache invalidation
  4. Loading states show skeleton loaders, errors display with retry buttons, and error boundaries catch failures gracefully
  5. State Management screen displays a live TanStack Query cache viewer showing styled JSON of current app state, and users can trigger toasts and modals programmatically
**Plans**: TBD

Plans:
- [ ] 05-01: TBD
- [ ] 05-02: TBD
- [ ] 05-03: TBD

### Phase 6: Testing + CI/CD + Deployment
**Goal**: The app is thoroughly tested, production email configured via Resend, deployed to a live Vercel URL, and documented with READMEs -- reviewers receive a link with magic link emails from info@vecotech.io and can explore immediately
**Depends on**: Phase 2, Phase 3, Phase 4, Phase 5
**Requirements**: TEST-01, TEST-02, TEST-03, INFR-02, INFR-03, INFR-04, INFR-06
**Success Criteria** (what must be TRUE):
  1. Jest + RNTL test suite passes with tests covering UI components (rendering, variants, interactions) and custom hooks (TanStack Query hooks, context hooks)
  2. Test fixtures and Supabase mocks exist and are used across the test suite
  3. GitHub Actions pipeline runs lint, test, and build on every push, and deploys to Vercel on merge to master only when tests pass
  4. Resend is configured as the custom email provider with info@vecotech.io as the sender -- magic link emails arrive from this address in production
  5. The app is live and accessible at a Vercel URL -- a reviewer can click the link and use the full app
  6. Three READMEs exist (root overview, apps/mobile setup guide, infra/supabase guide) with clear setup and architecture documentation
**Plans**: TBD

Plans:
- [ ] 06-01: TBD
- [ ] 06-02: TBD
- [ ] 06-03: TBD

## Progress

**Execution Order:**
Phases execute in numeric order: 1 -> 2 -> 3 -> 4 -> 5 -> 6
(Phases 2 and 3 could run in parallel; Phases 4 and 5 depend on both.)

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Project Foundation | 0/2 | Not started | - |
| 2. Component Library | 0/3 | Not started | - |
| 3. Authentication | 0/2 | Not started | - |
| 4. Dashboard + About | 0/2 | Not started | - |
| 5. Data Fetching + State Management | 0/3 | Not started | - |
| 6. Testing + CI/CD + Deployment | 0/3 | Not started | - |
