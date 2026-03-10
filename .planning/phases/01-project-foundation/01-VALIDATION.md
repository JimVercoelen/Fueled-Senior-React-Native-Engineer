---
phase: 1
slug: project-foundation
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-03-10
---

# Phase 1 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | None in Phase 1 (Jest + RNTL deferred to Phase 6) |
| **Config file** | none — no automated test framework |
| **Quick run command** | N/A — manual verification only |
| **Full suite command** | N/A — manual verification only |
| **Estimated runtime** | N/A |

---

## Sampling Rate

- **After every task commit:** Manual visual verification (run `npx expo start --web`, check browser)
- **After every plan wave:** Full manual checklist against success criteria
- **Before `/gsd:verify-work`:** All 5 success criteria manually verified
- **Max feedback latency:** N/A (manual)

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|-----------|-------------------|-------------|--------|
| 01-01-01 | 01 | 1 | INFR-05 | smoke | `git ls-files --others --ignored --exclude-standard \| grep -E "(node_modules\|\.env\|\.claude)"` | N/A | ⬜ pending |
| 01-01-02 | 01 | 1 | INFR-01 | manual | Manual: verify Supabase project exists with auth enabled | N/A | ⬜ pending |
| 01-02-01 | 02 | 1 | SC-1 | manual | `npx expo start --web` — verify app opens in browser | N/A | ⬜ pending |
| 01-02-02 | 02 | 1 | SC-2 | manual | Manual: verify NativeWind styled element visible | N/A | ⬜ pending |
| 01-02-03 | 02 | 1 | SC-3 | manual | Manual: navigate between auth and dashboard routes | N/A | ⬜ pending |
| 01-02-04 | 02 | 1 | SC-4 | manual | Manual: send magic link, click, verify redirect | N/A | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

Existing infrastructure covers all phase requirements. No test framework setup needed in Phase 1. All verification is manual or via shell commands.

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| App opens in browser | SC-1 | Visual UI verification | Run `npx expo start --web`, check browser loads app |
| NativeWind classes render | SC-2 | Visual styling verification | Check styled elements have correct colors/fonts |
| Route navigation works | SC-3 | Navigation flow verification | Click between auth group and dashboard group |
| Magic link login works | INFR-01/SC-4 | External email service involved | Send magic link to real email, click link, verify auth |
| .gitignore correctness | INFR-05 | File exclusion check | Run `git status`, verify no node_modules/.env/.claude tracked |

---

## Validation Sign-Off

- [x] All tasks have `<automated>` verify or Wave 0 dependencies
- [x] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [x] No watch-mode flags
- [x] Feedback latency < N/A (manual phase)
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
