---
phase: 4
slug: dashboard-about
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-03-10
---

# Phase 4 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | Jest 29.7 + jest-expo 55.0.9 + @testing-library/react-native 13.3.3 |
| **Config file** | `apps/mobile/jest.config.js` |
| **Quick run command** | `cd apps/mobile && npx jest tests/screens/ --no-coverage` |
| **Full suite command** | `cd apps/mobile && npx jest` |
| **Estimated runtime** | ~2 seconds |

---

## Sampling Rate

- **After every task commit:** Run `cd apps/mobile && npx jest tests/screens/ --no-coverage`
- **After every plan wave:** Run `cd apps/mobile && npx jest`
- **Before `/gsd:verify-work`:** Full suite must be green
- **Max feedback latency:** 3 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|-----------|-------------------|-------------|--------|
| 04-01-01 | 01 | 1 | DASH-01 | unit | `npx jest tests/screens/dashboard.test.tsx` | ❌ W0 | ⬜ pending |
| 04-01-02 | 01 | 1 | DASH-02 | unit | `npx jest tests/screens/dashboard.test.tsx` | ❌ W0 | ⬜ pending |
| 04-01-03 | 01 | 1 | DASH-03 | unit | `npx jest tests/screens/dashboard.test.tsx` | ❌ W0 | ⬜ pending |
| 04-02-01 | 02 | 1 | ABUT-01 | unit | `npx jest tests/screens/about.test.tsx` | ❌ W0 | ⬜ pending |
| 04-02-02 | 02 | 1 | ABUT-02 | unit | `npx jest tests/screens/about.test.tsx` | ❌ W0 | ⬜ pending |
| 04-02-03 | 02 | 1 | ABUT-03 | unit | `npx jest tests/screens/about.test.tsx` | ❌ W0 | ⬜ pending |
| 04-02-04 | 02 | 1 | ABUT-04 | unit | `npx jest tests/screens/about.test.tsx` | ❌ W0 | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

- [ ] `tests/screens/dashboard.test.tsx` — stubs for DASH-01, DASH-02, DASH-03
- [ ] `tests/screens/about.test.tsx` — stubs for ABUT-01, ABUT-02, ABUT-03, ABUT-04

*Existing test infrastructure (jest.config.js, setup.ts, Supabase mocks) covers framework needs.*

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Card navigation works | DASH-01 | Router navigation in Expo Router | Click each card, verify correct screen loads |
| External links open | ABUT-04 | Linking.openURL requires browser context | Click GitHub/portfolio/email links in About screen |
| Animated gradient visible | DASH-03 | Visual animation not testable with RNTL | Verify purple breathing gradient on dashboard |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 3s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
