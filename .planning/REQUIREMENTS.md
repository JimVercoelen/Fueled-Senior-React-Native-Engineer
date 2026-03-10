# Requirements: Fueled Technical Showcase

**Defined:** 2026-03-10
**Core Value:** Every screen must clearly and impressively demonstrate the Fueled requirement it represents

## v1 Requirements

### Authentication

- [x] **AUTH-01**: User can log in via magic link (email input -> link sent -> auto-redirect)
- [x] **AUTH-02**: User session persists across browser refreshes
- [x] **AUTH-03**: User can log out from any screen
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
- [ ] **STAT-02**: Toast system via Context API -- trigger toasts that render Alert components
- [ ] **STAT-03**: Modal system via Context API -- show/hide modal popups programmatically

### Component Library

- [x] **COMP-01**: Button component with primary, secondary, outline, disabled variants
- [x] **COMP-02**: Card component with header, body, footer slots
- [x] **COMP-03**: Typography components (headings, body, caption, label) with consistent theming
- [x] **COMP-04**: Badge and Avatar components
- [x] **COMP-05**: Table component
- [x] **COMP-06**: List component
- [x] **COMP-07**: Modal component (used by STAT-03 provider)
- [x] **COMP-08**: Toast/Alert component (used by STAT-02 provider)
- [x] **COMP-09**: TextField with label, error state, helper text -- integrated with react-hook-form
- [x] **COMP-10**: Select (single-select dropdown) -- integrated with react-hook-form
- [x] **COMP-11**: MultiSelect with chips/tags -- integrated with react-hook-form
- [x] **COMP-12**: Toggle switch and Checkbox with labels -- integrated with react-hook-form
- [x] **COMP-13**: Dropdown/Menu (popover with action items)
- [x] **COMP-14**: Tabs (tabbed content switching)
- [x] **COMP-15**: Accordion (collapsible sections)
- [x] **COMP-16**: Skeleton loader component
- [x] **COMP-17**: MUI-style live playground screen at app/(dashboard)/components showing all components grouped by section with variants -- built incrementally alongside components

### About

- [ ] **ABUT-01**: Visual checklist mapping each Fueled requirement to where it's demonstrated
- [ ] **ABUT-02**: Author section with mini cover letter
- [ ] **ABUT-03**: Tech stack list with rationale for each choice
- [ ] **ABUT-04**: Links to GitHub, portfolio, and email

### Infrastructure

- [x] **INFR-01**: Supabase cloud project with auth enabled (magic link works with default Supabase email in dev)
- [ ] **INFR-02**: Expo web build deployed on Vercel
- [ ] **INFR-03**: GitHub Actions CI/CD -- lint + test + build on push, deploy on merge to master (tests must pass)
- [ ] **INFR-04**: 3 READMEs (root, apps/mobile, infra/supabase)
- [x] **INFR-05**: Proper .gitignore (include .planning, exclude .claude, node_modules, env files)
- [ ] **INFR-06**: Resend custom email domain configured for production (info@vecotech.io sender address)

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

| Feature                       | Reason                                                      |
| ----------------------------- | ----------------------------------------------------------- |
| Native iOS/Android builds     | Web-only deployment -- mobile-friendly styling sufficient   |
| E2E testing (Detox/Maestro)   | Jest + RNTL sufficient for demonstrating testing competency |
| Real business logic / backend | Demo data and public APIs sufficient for showcase           |
| App Store submission          | Vercel web deploy only                                      |
| Real-time features            | Not needed for a showcase app                               |

## Traceability

| Requirement | Phase   | Status   |
| ----------- | ------- | -------- |
| AUTH-01     | Phase 3 | Complete |
| AUTH-02     | Phase 3 | Complete |
| AUTH-03     | Phase 3 | Complete |
| AUTH-04     | Phase 3 | Pending  |
| DASH-01     | Phase 4 | Pending  |
| DASH-02     | Phase 4 | Pending  |
| DASH-03     | Phase 4 | Pending  |
| DATA-01     | Phase 5 | Pending  |
| DATA-02     | Phase 5 | Pending  |
| DATA-03     | Phase 5 | Pending  |
| DATA-04     | Phase 5 | Pending  |
| STAT-01     | Phase 5 | Pending  |
| STAT-02     | Phase 5 | Pending  |
| STAT-03     | Phase 5 | Pending  |
| COMP-01     | Phase 2 | Complete |
| COMP-02     | Phase 2 | Complete |
| COMP-03     | Phase 2 | Complete |
| COMP-04     | Phase 2 | Complete |
| COMP-05     | Phase 2 | Complete |
| COMP-06     | Phase 2 | Complete |
| COMP-07     | Phase 2 | Complete |
| COMP-08     | Phase 2 | Complete |
| COMP-09     | Phase 2 | Complete |
| COMP-10     | Phase 2 | Complete |
| COMP-11     | Phase 2 | Complete |
| COMP-12     | Phase 2 | Complete |
| COMP-13     | Phase 2 | Complete |
| COMP-14     | Phase 2 | Complete |
| COMP-15     | Phase 2 | Complete |
| COMP-16     | Phase 2 | Complete |
| COMP-17     | Phase 2 | Complete |
| ABUT-01     | Phase 4 | Pending  |
| ABUT-02     | Phase 4 | Pending  |
| ABUT-03     | Phase 4 | Pending  |
| ABUT-04     | Phase 4 | Pending  |
| INFR-01     | Phase 1 | Complete |
| INFR-02     | Phase 6 | Pending  |
| INFR-03     | Phase 6 | Pending  |
| INFR-04     | Phase 6 | Pending  |
| INFR-05     | Phase 1 | Complete |
| INFR-06     | Phase 6 | Pending  |
| TEST-01     | Phase 6 | Pending  |
| TEST-02     | Phase 6 | Pending  |
| TEST-03     | Phase 6 | Pending  |

**Coverage:**

- v1 requirements: 44 total
- Mapped to phases: 44
- Unmapped: 0

---

_Requirements defined: 2026-03-10_
_Last updated: 2026-03-10 after roadmap revision (INFR-01 split, INFR-06 created, react-hook-form added to COMP-09/10/11/12)_
