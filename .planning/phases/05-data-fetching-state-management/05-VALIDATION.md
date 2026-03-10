---
phase: 5
slug: data-fetching-state-management
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-03-10
---

# Phase 5 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | Jest 29.7.0 + @testing-library/react-native 13.3.3 |
| **Config file** | `apps/mobile/jest.config.js` |
| **Quick run command** | `cd apps/mobile && npx jest --testPathPattern="tests/(contexts\|hooks)" --no-coverage -x` |
| **Full suite command** | `cd apps/mobile && npx jest --no-coverage` |
| **Estimated runtime** | ~15 seconds |

---

## Sampling Rate

- **After every task commit:** Run `cd apps/mobile && npx jest --no-coverage -x`
- **After every plan wave:** Run `cd apps/mobile && npx jest --no-coverage`
- **Before `/gsd:verify-work`:** Full suite must be green
- **Max feedback latency:** 15 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|-----------|-------------------|-------------|--------|
| 05-01-01 | 01 | 0 | DATA-01 | unit | `npx jest tests/hooks/use-items.test.ts -x` | ❌ W0 | ⬜ pending |
| 05-01-02 | 01 | 0 | DATA-02 | unit | `npx jest tests/hooks/use-items.test.ts -x` | ❌ W0 | ⬜ pending |
| 05-01-03 | 01 | 0 | DATA-03 | unit | `npx jest tests/hooks/use-items.test.ts -x` | ❌ W0 | ⬜ pending |
| 05-01-04 | 01 | 0 | DATA-04 | unit | `npx jest tests/screens/data-fetching.test.tsx -x` | ❌ W0 | ⬜ pending |
| 05-01-05 | 01 | 0 | STAT-01 | unit | `npx jest tests/screens/state-management.test.tsx -x` | ❌ W0 | ⬜ pending |
| 05-01-06 | 01 | 0 | STAT-02 | unit | `npx jest tests/contexts/toast.test.tsx -x` | ❌ W0 | ⬜ pending |
| 05-01-07 | 01 | 0 | STAT-03 | unit | `npx jest tests/contexts/modal.test.tsx -x` | ❌ W0 | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

- [ ] `tests/hooks/use-items.test.ts` — stubs for DATA-01, DATA-02, DATA-03
- [ ] `tests/screens/data-fetching.test.tsx` — stubs for DATA-04
- [ ] `tests/screens/state-management.test.tsx` — stubs for STAT-01
- [ ] `tests/contexts/toast.test.tsx` — stubs for STAT-02
- [ ] `tests/contexts/modal.test.tsx` — stubs for STAT-03
- [ ] `tests/__mocks__/tanstack-query.ts` — shared mock for QueryClient/useQuery/useMutation
- [ ] Extend `tests/__mocks__/supabase.ts` with `.from().select().range()` chain mocks
- [ ] `npm install @tanstack/react-query --legacy-peer-deps`

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Infinite scroll smooth performance | DATA-01 | Requires device/emulator interaction | Scroll list, verify no jank or dropped frames |
| Optimistic UI rollback on error | DATA-03 | Requires network failure simulation | Toggle airplane mode during mutation, verify rollback |
| Toast auto-dismiss timing | STAT-02 | Visual timing verification | Trigger toast, confirm 3s auto-dismiss |
| Modal overlay backdrop press | STAT-03 | Touch interaction | Show modal, tap backdrop, verify dismissal |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 15s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
