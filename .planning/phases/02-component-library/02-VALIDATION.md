---
phase: 2
slug: component-library
status: draft
nyquist_compliant: true
wave_0_complete: false
wave_0_plan: 02-00-PLAN.md
created: 2026-03-10
---

# Phase 2 -- Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | jest-expo + @testing-library/react-native |
| **Config file** | `apps/mobile/jest.config.js` -- created by 02-00-PLAN.md |
| **Quick run command** | `cd apps/mobile && npx jest --passWithNoTests` |
| **Full suite command** | `cd apps/mobile && npx jest` |
| **Estimated runtime** | ~15 seconds |

---

## Sampling Rate

- **After every task commit:** Run `cd apps/mobile && npx jest --passWithNoTests`
- **After every plan wave:** Run `cd apps/mobile && npx jest`
- **Before `/gsd:verify-work`:** Full suite must be green
- **Max feedback latency:** 15 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|-----------|-------------------|-------------|--------|
| 02-00-01 | 00 | 0 | COMP-01..04,09,12,17 | infra | `npx jest --passWithNoTests` | 02-00-PLAN | ⬜ pending |
| 02-01-01 | 01 | 1 | COMP-01 | unit | `npx jest tests/components/ui/Button.test.tsx -x` | ⬜ W0 | ⬜ pending |
| 02-01-02 | 01 | 1 | COMP-02 | unit | `npx jest tests/components/ui/Card.test.tsx -x` | ⬜ W0 | ⬜ pending |
| 02-01-03 | 01 | 1 | COMP-03 | unit | `npx jest tests/components/ui/Typography.test.tsx -x` | ⬜ W0 | ⬜ pending |
| 02-01-04 | 01 | 1 | COMP-04 | unit | `npx jest tests/components/ui/Badge.test.tsx -x` | ⬜ W0 | ⬜ pending |
| 02-02-01 | 02 | 2 | COMP-09 | unit | `npx jest tests/components/forms/TextField.test.tsx -x` | ⬜ W0 | ⬜ pending |
| 02-02-02 | 02 | 2 | COMP-12 | unit | `npx jest tests/components/forms/Toggle.test.tsx -x` | ⬜ W0 | ⬜ pending |
| 02-03-01 | 03 | 3 | COMP-17 | smoke | `npx jest tests/screens/components.test.tsx -x` | ⬜ W0 | ⬜ pending |

*Status: ⬜ pending / ✅ green / ❌ red / ⚠️ flaky*

---

## Wave 0 Requirements

- [ ] `jest-expo` + `@testing-library/react-native` -- install as devDependencies (02-00-PLAN Task 1)
- [ ] `apps/mobile/jest.config.js` -- jest-expo preset config (02-00-PLAN Task 1)
- [ ] `apps/mobile/tests/` -- directory structure matching `src/components/` (02-00-PLAN Task 2)
- [ ] `apps/mobile/tests/setup.ts` -- shared test utilities and mocks (02-00-PLAN Task 1)
- [ ] Stub test files for COMP-01, COMP-02, COMP-03, COMP-04, COMP-09, COMP-12, COMP-17 (02-00-PLAN Task 2)

**Implementing plan:** `02-00-PLAN.md` (Wave 0)

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Gradient renders correctly on primary/danger buttons | COMP-01 | Visual rendering of LinearGradient cannot be verified via JSDOM | Open playground, verify gradient buttons show blue->cyan / red->orange |
| Press animation scale effect | COMP-01 | Reanimated animations not testable in jest-expo | Press buttons in playground, verify 0.95 scale animation |
| Popover positioning for Select/MultiSelect/Dropdown | COMP-10, COMP-11, COMP-13 | getBoundingClientRect positioning requires real layout engine | Open playground, click Select/MultiSelect/Dropdown triggers, verify popover appears below trigger |
| NativeWind theming consistency across components | COMP-05 through COMP-16 | Visual consistency requires human review | Scroll playground, verify consistent dark theme, borders, spacing |
| Playground layout on mobile vs desktop viewport | COMP-17 | Responsive layout requires real viewport testing | Resize browser window, verify all sections readable at both widths |

---

## Validation Sign-Off

- [x] All tasks have `<automated>` verify or Wave 0 dependencies
- [x] Sampling continuity: no 3 consecutive tasks without automated verify
- [x] Wave 0 covers all MISSING references (02-00-PLAN.md)
- [x] No watch-mode flags
- [x] Feedback latency < 15s (tsc ~10s, jest ~15s)
- [x] `nyquist_compliant: true` set in frontmatter

**Approval:** approved (revision pass)
