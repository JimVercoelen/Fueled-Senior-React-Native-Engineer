# Phase 6: Testing + CI/CD + Deployment - Research

**Researched:** 2026-03-11
**Domain:** Jest/RNTL testing, GitHub Actions CI/CD, Vercel deployment, Resend SMTP, documentation
**Confidence:** HIGH

## Summary

Phase 6 covers four distinct domains: (1) completing the test suite with real implementations for stub tests and adding missing component/hook tests, (2) building a GitHub Actions CI/CD pipeline, (3) deploying the Expo web build to Vercel, and (4) configuring Resend as the custom SMTP provider for Supabase auth emails. The project already has a solid testing foundation -- 18 test files exist with 72 passing tests and 33 todo stubs. The infrastructure is jest-expo + @testing-library/react-native 13.x with a shared Supabase mock and reanimated/expo mocks in `tests/setup.ts`. There is one failing test in `use-items.test.ts` (mutation mock chain issue) that must be fixed.

The Expo web build uses `output: 'single'` (SPA mode) with Metro bundler. Deployment to Vercel requires a `vercel.json` with SPA rewrites and the `expo export -p web` build command. GitHub Actions will use the Vercel CLI (`vercel build --prod` + `vercel deploy --prebuilt --prod`) approach for full control over the pipeline. Resend SMTP configuration is done in the Supabase dashboard with host `smtp.resend.com`, port `465`, username `resend`, and the Resend API key as password.

**Primary recommendation:** Implement tests in 4 groups (UI components, form components, hooks, missing coverage), set up CI/CD as a single workflow with lint/test/build jobs and conditional Vercel deploy, configure Resend SMTP in Supabase dashboard, and write comprehensive READMEs last after all code is finalized.

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| TEST-01 | Unit tests for reusable UI components (rendering, variants, interactions) | 33 todo stubs exist for Button, Card, Badge, Typography, TextField, Toggle; need real implementations. Component source code analyzed -- all testable with RNTL render/fireEvent |
| TEST-02 | Tests for custom hooks (TanStack Query hooks, context hooks) | useItems, useDebouncedValue, auth context, toast context, modal context already tested (72 passing). useCacheEntries hook needs test. Fix failing useCreateItem mutation test |
| TEST-03 | Test fixtures and mocks (Supabase mock, test data) | Supabase mock exists at `tests/__mocks__/supabase.ts`. Need `src/__fixtures__/` with shared test data (items, sessions). Mock needs fix for mutation chainable pattern |
| INFR-02 | Expo web build deployed on Vercel | SPA build via `expo export -p web`, vercel.json with rewrites, Vercel CLI deploy. App uses `web.output: 'single'` in app.json |
| INFR-03 | GitHub Actions CI/CD -- lint + test + build on push, deploy on merge to master | Single workflow file with jobs: lint, test, build, deploy (conditional on main branch + tests pass). Uses Vercel CLI for deployment |
| INFR-04 | 3 READMEs (root, apps/mobile, infra/supabase) | All 3 README files exist but are minimal stubs. Need comprehensive rewrites with architecture docs, setup guides, tech stack |
| INFR-06 | Resend custom email domain configured for production (info@vecotech.io) | Resend SMTP configured in Supabase dashboard: smtp.resend.com:465, username "resend", API key as password. Domain must be verified in Resend dashboard first |
</phase_requirements>

## Standard Stack

### Core (Already Installed)
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| jest | ~29.7.0 | Test runner | Standard for React Native, already configured |
| jest-expo | ^55.0.9 | Expo-specific Jest preset | Handles Expo module mocking, matches SDK 55 |
| @testing-library/react-native | ^13.3.3 | Component/hook testing | Standard RNTL, render/fireEvent/renderHook |
| typescript | ~5.9.2 | Type checking | Already configured with strict mode |
| eslint | ^9.39.4 | Linting | Flat config with expo + prettier plugins |

### Infrastructure (To Add)
| Tool | Version | Purpose | When to Use |
|------|---------|---------|-------------|
| Vercel CLI | latest | Build + deploy from CI | GitHub Actions deployment step |
| GitHub Actions | N/A | CI/CD pipeline | .github/workflows/ci.yml |
| Resend | N/A | SMTP email provider | Supabase dashboard configuration only |

### No New Dependencies Needed
The project already has all testing libraries installed. No npm packages need to be added for this phase. Vercel CLI is installed globally in the GitHub Actions runner, not as a project dependency.

## Architecture Patterns

### Existing Test Structure
```
apps/mobile/
  tests/
    __mocks__/
      supabase.ts         # Chainable Supabase mock (auth + from/select/insert/etc.)
    setup.ts              # Global mocks: reanimated, linear-gradient, vector-icons, expo-router
    components/
      ui/
        Button.test.tsx   # TODO stubs only
        Card.test.tsx     # TODO stubs only
        Badge.test.tsx    # TODO stubs only
        Typography.test.tsx # TODO stubs only
      forms/
        TextField.test.tsx  # TODO stubs only
        Toggle.test.tsx     # TODO stubs only
    contexts/
      auth.test.tsx       # 6 passing tests
      toast.test.tsx      # 5 passing tests
      modal.test.tsx      # 7 passing tests
    hooks/
      use-items.test.ts   # 4 passing, 1 FAILING (mutation mock issue)
    screens/
      dashboard.test.tsx  # 4 passing tests
      data-fetching.test.tsx # 9 passing tests
      meet-jim.test.tsx   # 9 passing tests
      the-showcase.test.tsx  # 4 passing tests
      state-management.test.tsx # 4 passing tests
      components.test.tsx # TODO stubs only
    lib/
      query-client.test.ts # 5 passing tests
    types/
      database.test.ts    # 5 passing tests
```

### Current Test Stats
- **Test Suites:** 17 passed, 1 failed, 18 total
- **Tests:** 72 passed, 1 failed, 33 todo, 106 total
- **Failing test:** `useCreateItem` in `use-items.test.ts` -- mutation mock returns undefined because `mockSupabase.from()` creates a new chainable on each call, but mutations call `.from()` in the mutation function (not during hook init), so `mock.results[0]` may not capture the right call

### Pattern 1: Component Test Pattern (Established)
**What:** Render component with RNTL, assert text/testID presence, fireEvent for interactions
**When to use:** All UI component tests (TEST-01)
**Example (from existing dashboard.test.tsx):**
```typescript
import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Button from '../../src/components/ui/Button';

describe('Button', () => {
  it('renders label text', () => {
    const { getByText } = render(<Button label="Click me" />);
    expect(getByText('Click me')).toBeTruthy();
  });

  it('calls onPress when pressed', () => {
    const onPress = jest.fn();
    const { getByText } = render(<Button label="Click" onPress={onPress} />);
    fireEvent.press(getByText('Click'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('does not call onPress when disabled', () => {
    const onPress = jest.fn();
    const { getByText } = render(<Button label="Click" onPress={onPress} disabled />);
    fireEvent.press(getByText('Click'));
    expect(onPress).not.toHaveBeenCalled();
  });
});
```

### Pattern 2: Form Component Test Pattern (New -- requires react-hook-form wrapper)
**What:** Form components use react-hook-form Controller, so tests must wrap in useForm
**When to use:** TextField, Toggle, Checkbox, Select tests
**Example:**
```typescript
import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { useForm, FormProvider } from 'react-hook-form';
import { View } from 'react-native';
import TextField from '../../src/components/forms/TextField';

function TestWrapper({ children }: { children: (control: any) => React.ReactNode }) {
  const { control } = useForm({ defaultValues: { field: '' } });
  return <View>{children(control)}</View>;
}

describe('TextField', () => {
  it('renders with label', () => {
    const { getByText } = render(
      <TestWrapper>
        {(control) => <TextField control={control} name="field" label="Email" />}
      </TestWrapper>
    );
    expect(getByText('Email')).toBeTruthy();
  });
});
```

### Pattern 3: Hook Test Pattern (Established)
**What:** Use renderHook with QueryClientProvider wrapper for TanStack Query hooks
**When to use:** Custom hook tests (TEST-02)
**Example (from existing use-items.test.ts):**
```typescript
import { renderHook, waitFor } from '@testing-library/react-native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

function createWrapper() {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false, gcTime: 0 } },
  });
  return function Wrapper({ children }: { children: React.ReactNode }) {
    return React.createElement(QueryClientProvider, { client: queryClient }, children);
  };
}
```

### Pattern 4: Context Test Pattern (Established)
**What:** Create TestConsumer component that uses the hook, render inside Provider
**When to use:** Context hook tests (already done for auth, toast, modal)

### GitHub Actions Workflow Structure
```
.github/
  workflows/
    ci.yml                # Single workflow: lint -> test -> build -> deploy
```

### Vercel Configuration
```
apps/mobile/
  vercel.json             # SPA config: buildCommand, outputDirectory, rewrites
```

### Anti-Patterns to Avoid
- **Testing implementation details:** Test what the user sees (text, testIDs), not internal state or className values. NativeWind classes are not reliably testable in JSDOM.
- **Snapshot testing:** Avoid snapshots for this project -- they add maintenance burden and don't demonstrate testing skill as well as behavioral assertions.
- **Mocking too deep:** Mock at module boundaries (jest.mock), not deep internal functions. The existing pattern of mocking `@/hooks/use-items` for screen tests is correct.
- **Testing NativeWind styles:** NativeWind className-to-style conversion doesn't run in test environment. Test behavior (renders, interactions) not visual styling.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Supabase mock | Custom fetch interceptor | Existing `tests/__mocks__/supabase.ts` chainable mock | Already handles auth + CRUD chains |
| CI/CD pipeline | Shell scripts for deployment | GitHub Actions + Vercel CLI | Industry standard, secret management built in |
| Expo web build | Custom webpack config | `expo export -p web` | Official Expo build command, handles Metro bundling |
| Email delivery | Custom SMTP server | Resend SMTP via Supabase dashboard | Managed service, DNS verification, deliverability |
| SPA routing on Vercel | Custom server-side redirect | vercel.json `rewrites` | Built-in Vercel feature for SPAs |

**Key insight:** This phase is almost entirely configuration and test implementation. No new runtime code is needed except test files and CI/CD config files.

## Common Pitfalls

### Pitfall 1: NativeWind Styles Not Available in Tests
**What goes wrong:** Tests try to assert className-based styling (e.g., checking if a Badge has green styling) but NativeWind doesn't process Tailwind classes in Jest environment.
**Why it happens:** NativeWind requires the CSS-to-style transformation pipeline which doesn't run in Jest.
**How to avoid:** Test behavior, not styles. For Badge, test that the label text renders -- don't assert on color classes. For variant tests, verify structural differences (e.g., Button "contained" renders differently from "outlined") via presence/absence of elements, not style values.
**Warning signs:** Tests asserting on `className` prop or checking for specific Tailwind class strings.

### Pitfall 2: Mutation Mock Chain Issue (Existing Bug)
**What goes wrong:** `useCreateItem` test fails because `mockSupabase.from.mock.results[0]?.value` is undefined.
**Why it happens:** `mockSupabase.from()` creates a new chainable object on each call. The mutation function calls `from()` internally, but by the time the test checks `mock.results[0]`, the result may not be captured correctly due to async timing.
**How to fix:** Either (a) capture the chainable reference before the mutation fires by making `from()` return a stable reference, or (b) simplify assertions to just verify `mockSupabase.from` was called with 'items' without checking the chain.
**Warning signs:** Tests that deeply inspect mock call chains for async operations.

### Pitfall 3: Expo Web Build in Monorepo on Vercel
**What goes wrong:** Vercel can't find the Expo app or runs the build from the wrong directory.
**Why it happens:** The app is at `apps/mobile/`, not the repo root. Vercel needs to know the root directory.
**How to avoid:** In vercel.json OR Vercel project settings, set Root Directory to `apps/mobile`. Use `vercel --cwd apps/mobile` in CLI commands. OR place vercel.json in `apps/mobile/` and configure the Vercel project to point there.
**Warning signs:** Build errors about missing `app.json` or `expo` command not found.

### Pitfall 4: Environment Variables in CI/CD
**What goes wrong:** Build fails because `EXPO_PUBLIC_SUPABASE_URL` and `EXPO_PUBLIC_SUPABASE_ANON_KEY` are undefined.
**Why it happens:** These env vars are in `.env.local` which is gitignored. CI doesn't have them.
**How to avoid:** Add these as GitHub Secrets and pass them to the build step. For Vercel, add them in Vercel project settings (Environment Variables). The `vercel pull` command in CI will fetch them.
**Warning signs:** Runtime errors about undefined Supabase URL in deployed app.

### Pitfall 5: Resend Domain Not Verified
**What goes wrong:** Emails sent from info@vecotech.io are rejected or land in spam.
**Why it happens:** Resend requires DNS record verification (SPF, DKIM, DMARC) for the sending domain before emails can be sent.
**How to avoid:** Verify vecotech.io domain in Resend dashboard first. Add the required DNS records (MX, TXT for SPF, CNAME for DKIM). Wait for DNS propagation (up to 24h). Only then configure Supabase SMTP settings.
**Warning signs:** Resend dashboard shows domain status as "Pending" or "Failed".

### Pitfall 6: SPA Routing 404 on Vercel
**What goes wrong:** Direct URL access to routes like `/data-fetching` returns 404.
**Why it happens:** Vercel serves static files and doesn't know about client-side routing.
**How to avoid:** The vercel.json must include the rewrite rule `{ "source": "/:path*", "destination": "/" }` to redirect all requests to index.html.
**Warning signs:** App works when navigating from dashboard but 404s on page refresh.

### Pitfall 7: react-hook-form in Tests Without Wrapper
**What goes wrong:** Form component tests crash because `control` prop is required.
**Why it happens:** TextField, Toggle, Select, etc. use react-hook-form Controller which needs a valid `control` object from `useForm()`.
**How to avoid:** Create a reusable test wrapper function that provides `useForm()` control. Each test creates an isolated form context.
**Warning signs:** Error about "Cannot read property 'register' of undefined" or similar react-hook-form errors.

### Pitfall 8: GitHub Actions Node Version
**What goes wrong:** CI uses wrong Node version, causing engine warnings or failures.
**Why it happens:** The project requires Node >= 20.19.4 but local machine runs 20.17.0. CI needs to pin the correct version.
**How to avoid:** Use `actions/setup-node@v4` with `node-version: '20'` (or `node-version-file: 'apps/mobile/.nvmrc'`). The .nvmrc specifies 20.20.1.
**Warning signs:** `EBADENGINE` warnings in CI logs.

## Code Examples

### vercel.json for Expo SPA
```json
{
  "buildCommand": "npx expo export -p web",
  "outputDirectory": "dist",
  "devCommand": "npx expo start --web",
  "cleanUrls": true,
  "framework": null,
  "rewrites": [
    {
      "source": "/:path*",
      "destination": "/"
    }
  ]
}
```
Source: [Expo docs - Publishing websites](https://docs.expo.dev/guides/publishing-websites/)

### GitHub Actions CI/CD Workflow
```yaml
name: CI/CD

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  lint:
    runs-on: ubuntu-latest
    defaults:
      run:
        working-directory: apps/mobile
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
          cache-dependency-path: apps/mobile/package-lock.json
      - run: npm install --legacy-peer-deps
      - run: npm run lint

  test:
    runs-on: ubuntu-latest
    defaults:
      run:
        working-directory: apps/mobile
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
          cache-dependency-path: apps/mobile/package-lock.json
      - run: npm install --legacy-peer-deps
      - run: npm test

  build-and-deploy:
    needs: [lint, test]
    if: github.ref == 'refs/heads/main' && github.event_name == 'push'
    runs-on: ubuntu-latest
    defaults:
      run:
        working-directory: apps/mobile
    env:
      VERCEL_ORG_ID: ${{ secrets.VERCEL_ORG_ID }}
      VERCEL_PROJECT_ID: ${{ secrets.VERCEL_PROJECT_ID }}
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
          cache-dependency-path: apps/mobile/package-lock.json
      - run: npm install --legacy-peer-deps
      - run: npm install -g vercel@latest
      - run: vercel pull --yes --environment=production --token=${{ secrets.VERCEL_TOKEN }}
      - run: vercel build --prod --token=${{ secrets.VERCEL_TOKEN }}
      - run: vercel deploy --prebuilt --prod --token=${{ secrets.VERCEL_TOKEN }}
```
Source: [Vercel - GitHub Actions guide](https://vercel.com/kb/guide/how-can-i-use-github-actions-with-vercel)

### Supabase SMTP Configuration (Resend)
```
Host: smtp.resend.com
Port: 465
Username: resend
Password: <Resend API Key>
Sender email: info@vecotech.io
Sender name: Fueled Showcase
```
Source: [Resend - Send with Supabase SMTP](https://resend.com/docs/send-with-supabase-smtp)

### Test Fixture Pattern
```typescript
// src/__fixtures__/items.ts
import type { Item } from '@/types/database';

export const mockItem: Item = {
  id: '123e4567-e89b-12d3-a456-426614174000',
  user_id: '123e4567-e89b-12d3-a456-426614174001',
  title: 'Build login page',
  description: 'Create the authentication flow',
  category: 'frontend',
  priority: 'high',
  status: 'active',
  created_at: '2026-01-01T00:00:00Z',
  updated_at: '2026-01-01T00:00:00Z',
};

export const mockItems: Item[] = [
  mockItem,
  { ...mockItem, id: '2', title: 'Setup CI pipeline', category: 'devops', priority: 'medium', status: 'completed' },
];
```

### Form Component Test Wrapper
```typescript
// tests/helpers/form-wrapper.tsx
import React from 'react';
import { View } from 'react-native';
import { useForm } from 'react-hook-form';

export function FormTestWrapper({
  defaultValues,
  children,
}: {
  defaultValues: Record<string, any>;
  children: (control: any) => React.ReactNode;
}) {
  const { control } = useForm({ defaultValues });
  return <View>{children(control)}</View>;
}
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| @testing-library/jest-native | Extended matchers built into @testing-library/react-native 12.4+ | 2024 | `toBeOnTheScreen()` available without extra package |
| renderHook from @testing-library/react-hooks | renderHook from @testing-library/react-native | 2023 | No separate hooks library needed |
| Vercel GitHub integration (auto-deploy) | Vercel CLI in GitHub Actions | Ongoing | Full control over CI pipeline, required for monorepos |
| Supabase default email (2 emails/hour) | Custom SMTP via Resend | Ongoing | Production-ready email delivery |

**Deprecated/outdated:**
- `@testing-library/react-hooks`: Superseded by built-in renderHook in RNTL -- the project already uses the correct import
- `@testing-library/jest-native`: Extended matchers now in RNTL itself (v12.4+), though the project uses v13.x which includes them

## Open Questions

1. **Vercel Project Configuration for Monorepo**
   - What we know: Vercel can be configured with Root Directory pointing to `apps/mobile/`, and vercel.json placed there
   - What's unclear: Whether `vercel pull` in CI correctly scopes to the subdirectory, or if additional `--cwd` flags are needed
   - Recommendation: Place vercel.json in `apps/mobile/`, configure Vercel project Root Directory to `apps/mobile` via dashboard or `vercel link`

2. **Resend Domain Verification Timing**
   - What we know: DNS propagation takes up to 24 hours. Domain must be verified before emails work
   - What's unclear: Whether vecotech.io is already set up in Resend or needs fresh configuration
   - Recommendation: This is a manual step the user must do. Document the required DNS records and Supabase dashboard path. Plan should note this as a prerequisite/manual step

3. **--legacy-peer-deps in CI**
   - What we know: React 19.2.0 has peer dependency conflicts with react-test-renderer, requiring `--legacy-peer-deps` flag
   - What's unclear: Whether the overrides in package.json are sufficient or if CI also needs the flag
   - Recommendation: Always use `npm install --legacy-peer-deps` in CI to match local behavior. Already decided in Phase 2

## Validation Architecture

### Test Framework
| Property | Value |
|----------|-------|
| Framework | jest ~29.7.0 + jest-expo ^55.0.9 + @testing-library/react-native ^13.3.3 |
| Config file | `apps/mobile/jest.config.js` |
| Quick run command | `cd apps/mobile && npx jest --passWithNoTests` |
| Full suite command | `cd apps/mobile && npx jest --passWithNoTests --forceExit` |

### Phase Requirements to Test Map
| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| TEST-01 | Button renders variants, handles press/disabled | unit | `npx jest tests/components/ui/Button.test.tsx -x` | Yes (stubs) |
| TEST-01 | Card renders header/body/footer, onPress | unit | `npx jest tests/components/ui/Card.test.tsx -x` | Yes (stubs) |
| TEST-01 | Badge renders type variants with label | unit | `npx jest tests/components/ui/Badge.test.tsx -x` | Yes (stubs) |
| TEST-01 | Typography renders variants | unit | `npx jest tests/components/ui/Typography.test.tsx -x` | Yes (stubs) |
| TEST-01 | TextField renders label, placeholder, disabled | unit | `npx jest tests/components/forms/TextField.test.tsx -x` | Yes (stubs) |
| TEST-01 | Toggle renders, toggles on press, disabled | unit | `npx jest tests/components/forms/Toggle.test.tsx -x` | Yes (stubs) |
| TEST-01 | Components screen renders section headings | unit | `npx jest tests/screens/components.test.tsx -x` | Yes (stubs) |
| TEST-02 | useCacheEntries returns cache snapshot | unit | `npx jest tests/hooks/use-cache-entries.test.ts -x` | No (Wave 0) |
| TEST-02 | useCreateItem/useUpdateItem/useDeleteItem | unit | `npx jest tests/hooks/use-items.test.ts -x` | Yes (1 failing) |
| TEST-03 | Shared test fixtures for items and sessions | unit | N/A -- fixtures used by other tests | No (Wave 0) |
| TEST-03 | Supabase mock handles mutations correctly | unit | `npx jest tests/hooks/use-items.test.ts -x` | Yes (needs fix) |
| INFR-02 | Expo web build succeeds | build | `cd apps/mobile && npx expo export -p web` | N/A |
| INFR-03 | CI pipeline runs lint, test, build | CI | GitHub Actions workflow | No (Wave 0) |
| INFR-04 | READMEs exist with setup docs | manual | Visual inspection | Yes (stubs) |
| INFR-06 | Resend SMTP configured | manual | Send test magic link email | N/A |

### Sampling Rate
- **Per task commit:** `cd apps/mobile && npx jest --passWithNoTests`
- **Per wave merge:** `cd apps/mobile && npx jest --passWithNoTests --forceExit`
- **Phase gate:** Full suite green + lint passes + build succeeds before `/gsd:verify-work`

### Wave 0 Gaps
- [ ] `tests/hooks/use-cache-entries.test.ts` -- covers TEST-02 (useCacheEntries hook)
- [ ] `src/__fixtures__/items.ts` -- covers TEST-03 (shared test data)
- [ ] `src/__fixtures__/sessions.ts` -- covers TEST-03 (shared session data)
- [ ] `tests/helpers/form-wrapper.tsx` -- shared form test utility for TEST-01 form components
- [ ] `.github/workflows/ci.yml` -- covers INFR-03 (CI/CD pipeline)
- [ ] `apps/mobile/vercel.json` -- covers INFR-02 (Vercel deployment config)
- [ ] Fix `tests/__mocks__/supabase.ts` mutation chainable pattern -- covers TEST-03

## Sources

### Primary (HIGH confidence)
- Expo docs: [Publishing websites / Vercel deployment](https://docs.expo.dev/guides/publishing-websites/) -- vercel.json config, build command
- Vercel docs: [GitHub Actions integration](https://vercel.com/kb/guide/how-can-i-use-github-actions-with-vercel) -- CI/CD workflow with Vercel CLI
- Resend docs: [Send with Supabase SMTP](https://resend.com/docs/send-with-supabase-smtp) -- SMTP credentials
- Supabase docs: [Custom SMTP configuration](https://supabase.com/docs/guides/auth/auth-smtp) -- Dashboard setup path, rate limits
- Project source code: Direct analysis of 18 existing test files, jest.config.js, setup.ts, component source files

### Secondary (MEDIUM confidence)
- Vercel Community: [Monorepo deployment via CLI](https://community.vercel.com/t/deploy-app-in-monorepo-via-vercel-cli-in-github-actions/4039) -- working-directory approach for monorepos
- Expo Starter: [Vercel hosting guide](https://www.expostarter.com/docs/deployment/hosting/vercel) -- confirmed SPA rewrite pattern

### Tertiary (LOW confidence)
- GitHub Actions monorepo patterns from community blog posts -- general patterns, need validation against this specific project structure

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH -- all libraries already installed, versions confirmed from package.json
- Architecture: HIGH -- existing test patterns analyzed from 18 test files, clear conventions established
- Testing patterns: HIGH -- 72 passing tests show established patterns; 1 failing test root-caused
- CI/CD: HIGH -- Vercel CLI approach well-documented, GitHub Actions YAML straightforward
- Resend/SMTP: MEDIUM -- configuration values verified from official docs, but domain verification is external/manual
- Pitfalls: HIGH -- identified from actual failing tests and known React Native testing gotchas

**Research date:** 2026-03-11
**Valid until:** 2026-04-11 (stable domain, libraries already locked)
