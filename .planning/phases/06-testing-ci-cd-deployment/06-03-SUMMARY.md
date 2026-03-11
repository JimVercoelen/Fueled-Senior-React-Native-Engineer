---
phase: 06-testing-ci-cd-deployment
plan: 03
subsystem: infra
tags: [github-actions, vercel, ci-cd, deployment, readme, resend, smtp]

# Dependency graph
requires:
  - phase: 06-01
    provides: test infrastructure, fixtures, Supabase mock
  - phase: 06-02
    provides: 109 passing tests baseline for CI pipeline
provides:
  - GitHub Actions CI/CD workflow with lint, test, and conditional deploy
  - Vercel SPA deployment config for Expo web build
  - Comprehensive READMEs (root, mobile app, Supabase infrastructure)
  - Resend SMTP documentation for custom email domain
affects: []

# Tech tracking
tech-stack:
  added: [github-actions, vercel-cli]
  patterns: [CI/CD pipeline with conditional deployment, SPA rewrites for client-side routing]

key-files:
  created:
    - .github/workflows/ci.yml
    - apps/mobile/vercel.json
  modified:
    - README.md
    - apps/mobile/README.md
    - infra/supabase/README.md

key-decisions:
  - "Vercel CLI approach in GitHub Actions instead of Vercel GitHub integration for monorepo control"
  - "framework: null in vercel.json to prevent auto-detection interference"
  - "SPA rewrites in vercel.json for client-side routing support"
  - "--legacy-peer-deps in all CI npm install steps for React 19 peer conflict"
  - "--forceExit on jest in CI to prevent hanging test workers"

patterns-established:
  - "CI jobs use working-directory: apps/mobile for monorepo scoping"
  - "build-and-deploy job conditional on main branch push with needs: [lint, test]"

requirements-completed: [INFR-02, INFR-03, INFR-04, INFR-06]

# Metrics
duration: 3min
completed: 2026-03-11
---

# Phase 6 Plan 03: CI/CD, Deployment, and Documentation Summary

**GitHub Actions CI/CD pipeline with lint/test/deploy jobs, Vercel SPA config with rewrites, comprehensive READMEs for root/mobile/Supabase, and Resend SMTP setup documentation**

## Performance

- **Duration:** 3 min
- **Started:** 2026-03-11T08:13:40Z
- **Completed:** 2026-03-11T08:16:30Z
- **Tasks:** 2 (of 3; Task 3 is human-verify checkpoint)
- **Files modified:** 5

## Accomplishments
- Created GitHub Actions CI/CD workflow with 3 jobs: lint (ESLint), test (Jest --forceExit), and build-and-deploy (Vercel CLI, conditional on main branch push)
- Created Vercel deployment config with SPA rewrites, expo export build command, and framework: null to prevent auto-detection
- Rewrote root README with CI badge, tech stack table, feature summary, and links to sub-READMEs
- Rewrote mobile app README (162 lines) with full setup guide, scripts table, expanded project structure, tech rationale, testing section, and deployment docs
- Rewrote Supabase README (136 lines) with database schema, RLS policies, migration docs, step-by-step Resend SMTP setup, and environment variable reference

## Task Commits

Each task was committed atomically:

1. **Task 1: Create CI/CD workflow and Vercel deployment config** - `5cd8146` (feat)
2. **Task 2: Write comprehensive READMEs** - `f2f9953` (docs)

## Files Created/Modified
- `.github/workflows/ci.yml` - CI/CD pipeline: lint, test, conditional build-and-deploy via Vercel CLI
- `apps/mobile/vercel.json` - Vercel SPA config with rewrites, expo export build, dist output
- `README.md` - Root project overview with CI badge, tech stack, features, and navigation links
- `apps/mobile/README.md` - Complete setup guide, scripts, project structure, tech rationale, testing docs
- `infra/supabase/README.md` - Database schema, RLS policies, migrations, Resend SMTP setup, env vars

## Decisions Made
- Used Vercel CLI approach in GitHub Actions (vercel pull/build/deploy) instead of Vercel GitHub integration for full control in monorepo
- Set `framework: null` in vercel.json to prevent Vercel from auto-detecting and applying wrong build settings
- SPA rewrites (`/:path*` -> `/`) handle client-side routing so direct URL access works
- `--legacy-peer-deps` in all CI npm install steps to match local behavior (React 19 peer conflict)
- `--forceExit` on jest in CI test step to prevent hanging workers from blocking the pipeline

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered
None

## User Setup Required

**External services require manual configuration before the pipeline works:**

1. **GitHub Secrets** (repo Settings -> Secrets and variables -> Actions):
   - `VERCEL_TOKEN` -- Vercel Dashboard -> Settings -> Tokens -> Create
   - `VERCEL_ORG_ID` -- Run `vercel link` in apps/mobile/ then check .vercel/project.json
   - `VERCEL_PROJECT_ID` -- Run `vercel link` in apps/mobile/ then check .vercel/project.json
   - `EXPO_PUBLIC_SUPABASE_URL` -- Supabase Dashboard -> Settings -> API -> Project URL
   - `EXPO_PUBLIC_SUPABASE_ANON_KEY` -- Supabase Dashboard -> Settings -> API -> anon key

2. **Vercel Environment Variables** (Vercel Dashboard -> Project -> Settings -> Environment Variables):
   - `EXPO_PUBLIC_SUPABASE_URL`
   - `EXPO_PUBLIC_SUPABASE_ANON_KEY`

3. **Resend SMTP** (follow infra/supabase/README.md):
   - Add vecotech.io domain in Resend, add DNS records, wait for verification
   - Configure SMTP in Supabase Dashboard -> Authentication -> SMTP Settings

## Next Phase Readiness
- All automated work for Phase 6 is complete
- Pending: human verification of CI/CD pipeline, Vercel deployment, and Resend SMTP (Task 3 checkpoint)
- After user configures secrets and pushes to main, the full pipeline should run end-to-end

## Self-Check: PASSED

All 6 files verified present. Both task commits (5cd8146, f2f9953) verified in git log.

---
*Phase: 06-testing-ci-cd-deployment*
*Completed: 2026-03-11*
