---
phase: 3
slug: authentication
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-03-10
---

# Phase 3 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | Jest 29.7 + jest-expo 55 + @testing-library/react-native 13.3 |
| **Config file** | `apps/mobile/jest.config.js` |
| **Quick run command** | `cd apps/mobile && npx jest --testPathPattern="tests/auth" --no-coverage` |
| **Full suite command** | `cd apps/mobile && npx jest --no-coverage` |
| **Estimated runtime** | ~10 seconds |

---

## Sampling Rate

- **After every task commit:** Run `cd apps/mobile && npx jest --testPathPattern="tests/auth" --no-coverage`
- **After every plan wave:** Run `cd apps/mobile && npx jest --no-coverage`
- **Before `/gsd:verify-work`:** Full suite must be green
- **Max feedback latency:** 10 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|-----------|-------------------|-------------|--------|
| 03-01-01 | 01 | 1 | AUTH-01 | unit | `cd apps/mobile && npx jest tests/contexts/auth.test.tsx -x` | ❌ W0 | ⬜ pending |
| 03-01-02 | 01 | 1 | AUTH-02 | unit | `cd apps/mobile && npx jest tests/contexts/auth.test.tsx -x` | ❌ W0 | ⬜ pending |
| 03-01-03 | 01 | 1 | AUTH-03 | unit | `cd apps/mobile && npx jest tests/contexts/auth.test.tsx -x` | ❌ W0 | ⬜ pending |
| 03-02-01 | 02 | 1 | AUTH-04 | manual-only | Manual browser test | N/A | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

- [ ] `tests/contexts/auth.test.tsx` — stubs for AUTH-01, AUTH-02, AUTH-03 (AuthProvider unit tests)
- [ ] `tests/__mocks__/supabase.ts` — mock Supabase client for auth testing

*If none: "Existing infrastructure covers all phase requirements."*

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Protected routes redirect when session is null | AUTH-04 | Stack.Protected is an Expo Router internal that cannot be meaningfully unit-tested | 1. Log out of the app. 2. Navigate to any dashboard URL directly. 3. Verify redirect to login screen. |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 10s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
