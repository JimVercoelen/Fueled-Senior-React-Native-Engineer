# Requirements: Fueled Technical Showcase

**Defined:** 2026-03-10
**Core Value:** Every screen must clearly and impressively demonstrate the Fueled requirement it represents

## v1 Requirements

### Authentication

- [ ] **AUTH-01**: User can log in via magic link (email input → link sent → auto-redirect)
- [ ] **AUTH-02**: User session persists across browser refreshes
- [ ] **AUTH-03**: User can log out from any screen
- [ ] **AUTH-04**: Unauthenticated users are redirected to login (protected routes)

### Dashboard

- [ ] **DASH-01**: Dashboard displays 4 rich cards (icon, title, description, tech tags) linking to demo screens
- [ ] **DASH-02**: Dashboard shows welcome greeting with user email/name from auth
- [ ] **DASH-03**: Persistent app header with logo + logout across all screens

### Data Fetching

- [ ] **DATA-01**: Paginated list from public API with infinite scroll or page controls
- [ ] **DATA-02**: Search input with debounced queries + filter dropdowns showing query invalidation
- [ ] **DATA-03**: Create/update/delete mutations via Supabase with optimistic updates + cache invalidation
- [ ] **DATA-04**: Loading states (skeleton loaders), error boundaries, and retry buttons

### State Management

- [ ] **STAT-01**: TanStack Query cache viewer displaying live app state as styled JSON
- [ ] **STAT-02**: Toast system via Context API — trigger toasts that render Alert components
- [ ] **STAT-03**: Modal system via Context API — show/hide modal popups programmatically

### Component Library

- [ ] **COMP-01**: Button component with primary, secondary, outline, disabled variants
- [ ] **COMP-02**: Card component with header, body, footer slots
- [ ] **COMP-03**: Typography components (headings, body, caption, label) with consistent theming
- [ ] **COMP-04**: Badge and Avatar components
- [ ] **COMP-05**: Table component
- [ ] **COMP-06**: List component
- [ ] **COMP-07**: Modal component (used by STAT-03 provider)
- [ ] **COMP-08**: Toast/Alert component (used by STAT-02 provider)
- [ ] **COMP-09**: TextField with label, error state, helper text
- [ ] **COMP-10**: Select (single-select dropdown)
- [ ] **COMP-11**: MultiSelect with chips/tags
- [ ] **COMP-12**: Toggle switch and Checkbox with labels
- [ ] **COMP-13**: Dropdown/Menu (popover with action items)
- [ ] **COMP-14**: Tabs (tabbed content switching)
- [ ] **COMP-15**: Accordion (collapsible sections)
- [ ] **COMP-16**: Skeleton loader component
- [ ] **COMP-17**: MUI-style live playground screen showing all components grouped by section with variants

### About

- [ ] **ABUT-01**: Visual checklist mapping each Fueled requirement to where it's demonstrated
- [ ] **ABUT-02**: Author section with mini cover letter
- [ ] **ABUT-03**: Tech stack list with rationale for each choice
- [ ] **ABUT-04**: Links to GitHub, portfolio, and email

### Infrastructure

- [ ] **INFR-01**: Supabase cloud project with auth config + Resend email (info@vecotech.io)
- [ ] **INFR-02**: Expo web build deployed on Vercel
- [ ] **INFR-03**: GitHub Actions CI/CD — lint + test + build on push, deploy on merge to master (tests must pass)
- [ ] **INFR-04**: 3 READMEs (root, apps/mobile, infra/supabase)
- [ ] **INFR-05**: Proper .gitignore (include .planning, exclude .claude, node_modules, env files)

### Testing

- [ ] **TEST-01**: Unit tests for reusable UI components (rendering, variants, interactions)
- [ ] **TEST-02**: Tests for custom hooks (TanStack Query hooks, context hooks)
- [ ] **TEST-03**: Test fixtures and mocks (Supabase mock, test data)

## v2 Requirements

### Enhanced Auth

- **AUTH-05**: OAuth login (Google, Apple)
- **AUTH-06**: Profile management (edit name, avatar)

### Polish

- **POLH-01**: Dark/light theme toggle
- **POLH-02**: Animations and transitions between screens

## Out of Scope

| Feature | Reason |
|---------|--------|
| Native iOS/Android builds | Web-only deployment — mobile-friendly styling sufficient |
| E2E testing (Detox/Maestro) | Jest + RNTL sufficient for demonstrating testing competency |
| Real business logic / backend | Demo data and public APIs sufficient for showcase |
| App Store submission | Vercel web deploy only |
| Real-time features | Not needed for a showcase app |

## Traceability

| Requirement | Phase | Status |
|-------------|-------|--------|
| AUTH-01 | — | Pending |
| AUTH-02 | — | Pending |
| AUTH-03 | — | Pending |
| AUTH-04 | — | Pending |
| DASH-01 | — | Pending |
| DASH-02 | — | Pending |
| DASH-03 | — | Pending |
| DATA-01 | — | Pending |
| DATA-02 | — | Pending |
| DATA-03 | — | Pending |
| DATA-04 | — | Pending |
| STAT-01 | — | Pending |
| STAT-02 | — | Pending |
| STAT-03 | — | Pending |
| COMP-01 | — | Pending |
| COMP-02 | — | Pending |
| COMP-03 | — | Pending |
| COMP-04 | — | Pending |
| COMP-05 | — | Pending |
| COMP-06 | — | Pending |
| COMP-07 | — | Pending |
| COMP-08 | — | Pending |
| COMP-09 | — | Pending |
| COMP-10 | — | Pending |
| COMP-11 | — | Pending |
| COMP-12 | — | Pending |
| COMP-13 | — | Pending |
| COMP-14 | — | Pending |
| COMP-15 | — | Pending |
| COMP-16 | — | Pending |
| COMP-17 | — | Pending |
| ABUT-01 | — | Pending |
| ABUT-02 | — | Pending |
| ABUT-03 | — | Pending |
| ABUT-04 | — | Pending |
| INFR-01 | — | Pending |
| INFR-02 | — | Pending |
| INFR-03 | — | Pending |
| INFR-04 | — | Pending |
| INFR-05 | — | Pending |
| TEST-01 | — | Pending |
| TEST-02 | — | Pending |
| TEST-03 | — | Pending |

**Coverage:**
- v1 requirements: 38 total
- Mapped to phases: 0
- Unmapped: 38 ⚠️

---
*Requirements defined: 2026-03-10*
*Last updated: 2026-03-10 after initial definition*
