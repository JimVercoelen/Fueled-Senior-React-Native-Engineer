---
phase: 6
slug: testing-ci-cd-deployment
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-03-11
---

# Phase 6 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | jest ~29.7.0 + jest-expo ^55.0.9 + @testing-library/react-native ^13.3.3 |
| **Config file** | `apps/mobile/jest.config.js` |
| **Quick run command** | `cd apps/mobile && npx jest --passWithNoTests` |
| **Full suite command** | `cd apps/mobile && npx jest --passWithNoTests --forceExit` |
| **Estimated runtime** | ~15 seconds |

---

## Sampling Rate

- **After every task commit:** Run `cd apps/mobile && npx jest --passWithNoTests`
- **After every plan wave:** Run `cd apps/mobile && npx jest --passWithNoTests --forceExit`
- **Before `/gsd:verify-work`:** Full suite must be green
- **Max feedback latency:** 15 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|-----------|-------------------|-------------|--------|
| 06-01-01 | 01 | 1 | TEST-03 | unit | `npx jest tests/__mocks__/supabase.ts` | ✅ (fix) | ⬜ pending |
| 06-01-02 | 01 | 1 | TEST-03 | unit | `npx jest tests/hooks/use-items.test.ts` | ✅ (fix) | ⬜ pending |
| 06-01-03 | 01 | 1 | TEST-03 | unit | N/A (fixtures used by other tests) | ❌ W0 | ⬜ pending |
| 06-01-04 | 01 | 1 | TEST-01 | unit | N/A (test helper used by form tests) | ❌ W0 | ⬜ pending |
| 06-02-01 | 02 | 1 | TEST-01 | unit | `npx jest tests/components/ui/Button.test.tsx` | ✅ (stubs) | ⬜ pending |
| 06-02-02 | 02 | 1 | TEST-01 | unit | `npx jest tests/components/ui/Card.test.tsx` | ✅ (stubs) | ⬜ pending |
| 06-02-03 | 02 | 1 | TEST-01 | unit | `npx jest tests/components/ui/Badge.test.tsx` | ✅ (stubs) | ⬜ pending |
| 06-02-04 | 02 | 1 | TEST-01 | unit | `npx jest tests/components/ui/Typography.test.tsx` | ✅ (stubs) | ⬜ pending |
| 06-02-05 | 02 | 1 | TEST-01 | unit | `npx jest tests/components/forms/TextField.test.tsx` | ✅ (stubs) | ⬜ pending |
| 06-02-06 | 02 | 1 | TEST-01 | unit | `npx jest tests/components/forms/Toggle.test.tsx` | ✅ (stubs) | ⬜ pending |
| 06-02-07 | 02 | 1 | TEST-01 | unit | `npx jest tests/screens/components.test.tsx` | ✅ (stubs) | ⬜ pending |
| 06-02-08 | 02 | 1 | TEST-02 | unit | `npx jest tests/hooks/use-cache-entries.test.ts` | ❌ W0 | ⬜ pending |
| 06-03-01 | 03 | 2 | INFR-03 | CI | GitHub Actions workflow | ❌ W0 | ⬜ pending |
| 06-03-02 | 03 | 2 | INFR-02 | build | `cd apps/mobile && npx expo export -p web` | ❌ W0 | ⬜ pending |
| 06-03-03 | 03 | 2 | INFR-06 | manual | Send test magic link email | N/A | ⬜ pending |
| 06-03-04 | 03 | 2 | INFR-04 | manual | Visual inspection of READMEs | ✅ (stubs) | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

- [ ] `src/__fixtures__/items.ts` — shared test data for TEST-03
- [ ] `src/__fixtures__/sessions.ts` — shared session data for TEST-03
- [ ] `tests/helpers/form-wrapper.tsx` — reusable form test utility for TEST-01
- [ ] `tests/hooks/use-cache-entries.test.ts` — test stub for TEST-02
- [ ] `.github/workflows/ci.yml` — CI/CD pipeline for INFR-03
- [ ] `apps/mobile/vercel.json` — Vercel deployment config for INFR-02
- [ ] Fix `tests/__mocks__/supabase.ts` mutation chainable pattern — TEST-03

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Resend SMTP sends from info@vecotech.io | INFR-06 | Requires Supabase dashboard config + DNS verification | 1. Verify domain in Resend dashboard 2. Configure SMTP in Supabase 3. Trigger magic link 4. Check sender address |
| READMEs have correct architecture docs | INFR-04 | Documentation quality is subjective | 1. Read each README 2. Verify setup instructions work 3. Confirm architecture diagrams match code |
| App accessible at Vercel URL | INFR-02 | Requires live deployment | 1. Visit Vercel URL 2. Navigate through all screens 3. Test auth flow |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 15s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
