# Phase 3: Authentication - Research

**Researched:** 2026-03-10
**Domain:** Supabase magic link auth, Expo Router protected routes, session persistence
**Confidence:** HIGH

## Summary

Phase 3 builds on substantial existing auth scaffolding from Phase 1. The Supabase client is already configured with `detectSessionInUrl: true` (correct for web-only deployment), the `AuthProvider` context with `signIn`/`signOut`/`session`/`isLoading` is in place, Expo Router's `Stack.Protected` guards are wired up in the root layout, and a functional login screen exists. The login screen currently uses raw `TextInput`/`Pressable` instead of the Phase 2 component library (TextField, Button, Alert).

The primary work for this phase is: (1) upgrade the login screen to use the component library for visual polish and showcase value, (2) verify and harden the magic link redirect flow on web (the `detectSessionInUrl: true` setting means Supabase JS auto-detects the session from URL hash fragments -- this should work out-of-the-box on Expo web), (3) add a logout button to the persistent dashboard header (currently only on the Profile tab), and (4) ensure the auth guard redirect works for direct URL access to protected routes.

**Primary recommendation:** This phase is largely a hardening and polish pass on existing Phase 1 scaffolding. Focus on upgrading the login screen to use the component library, adding logout to the header, and verifying the full magic link flow end-to-end. No new libraries needed.

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| AUTH-01 | User can log in via magic link (email input -> link sent -> auto-redirect) | Existing `signInWithOtp` flow + `detectSessionInUrl: true` + `onAuthStateChange` listener already handle this. Login screen needs component library upgrade. Verify Supabase dashboard Site URL and redirect URL config. |
| AUTH-02 | User session persists across browser refreshes | Already implemented via `persistSession: true` + `expo-sqlite/localStorage` storage adapter + `supabase.auth.getSession()` on mount. Needs verification test. |
| AUTH-03 | User can log out from any screen | `signOut` exists in AuthProvider. Needs logout button added to the persistent dashboard header (currently only in Profile tab). |
| AUTH-04 | Unauthenticated users are redirected to login (protected routes) | Already implemented via `Stack.Protected` guard={!!session}` in root layout. Needs verification with direct URL access. |
</phase_requirements>

## Standard Stack

### Core (Already Installed)
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| @supabase/supabase-js | ^2.99.0 | Auth client, magic link OTP, session management | Already installed; handles signInWithOtp, onAuthStateChange, session persistence |
| expo-router | ~55.0.4 | File-based routing with Stack.Protected guards | Already installed; provides built-in protected route mechanism |
| expo-sqlite | ~55.0.10 | localStorage polyfill for session storage | Already installed; `expo-sqlite/localStorage/install` provides cross-platform storage |
| expo-linking | ~55.0.7 | URL/deep link handling | Already installed; used for scheme configuration |

### Supporting (Already Installed)
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| react-hook-form | ^7.71.2 | Form validation on login screen | Use with TextField component for email validation |
| zod | ^4.3.6 | Schema validation | Use for email format validation on login form |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| expo-sqlite localStorage | @react-native-async-storage/async-storage | expo-sqlite localStorage is already set up and recommended by Expo docs for Supabase |
| Stack.Protected | Manual redirect in useEffect | Stack.Protected is the Expo Router blessed pattern, already implemented |

**Installation:** No new packages required. All dependencies are already installed.

## Architecture Patterns

### Existing Auth Architecture (from Phase 1)
```
apps/mobile/
├── app/
│   ├── _layout.tsx              # AuthProvider wraps RootNavigator; Stack.Protected guards
│   ├── (auth)/
│   │   ├── _layout.tsx          # Auth group layout (headerless)
│   │   └── login.tsx            # Login screen (needs component library upgrade)
│   └── (dashboard)/
│       ├── _layout.tsx          # Dashboard layout with header (needs logout button)
│       ├── (tabs)/
│       │   ├── index.tsx        # Dashboard home
│       │   └── profile.tsx      # Profile screen (has signOut button)
│       └── ...
├── src/
│   ├── contexts/
│   │   └── auth.tsx             # AuthProvider with signIn/signOut/session/isLoading
│   └── lib/
│       └── supabase.ts          # Client config: detectSessionInUrl: true, persistSession: true
```

### Pattern 1: Magic Link Flow on Web (Implicit Flow)
**What:** User enters email -> Supabase sends magic link email -> user clicks link -> browser navigates to Site URL with hash fragment containing tokens -> `detectSessionInUrl: true` causes supabase-js to auto-extract session -> `onAuthStateChange` fires with `SIGNED_IN` event -> `AuthProvider` updates session state -> `Stack.Protected` guard allows dashboard access.

**When to use:** This is the default flow. No manual token parsing needed on web.

**Critical config:**
- Supabase client: `detectSessionInUrl: true` (already set)
- Supabase dashboard: Site URL must be set to `http://localhost:8081` for dev
- Supabase dashboard: Additional redirect URLs should include `http://localhost:8081/**`
- `signInWithOtp` can optionally pass `emailRedirectTo` to override Site URL

### Pattern 2: Protected Routes via Stack.Protected
**What:** Expo Router's Stack.Protected component conditionally gates screen access based on a boolean guard prop.

**When to use:** Already implemented in the root layout.

**Key behavior:**
- `guard={false}` prevents navigation to the screen
- If a user is on a protected screen and guard flips to false, they are auto-redirected
- Works with deep links -- unauthenticated direct URL access triggers redirect
- Client-side only -- not a server-side security mechanism

**Existing implementation (already correct):**
```typescript
// app/_layout.tsx - RootNavigator
<Stack.Protected guard={!!session}>
  <Stack.Screen name="(dashboard)" />
</Stack.Protected>
<Stack.Protected guard={!session}>
  <Stack.Screen name="(auth)" />
</Stack.Protected>
```

### Pattern 3: Session Persistence
**What:** Supabase session is stored in localStorage (via expo-sqlite polyfill) and restored on app load via `getSession()`.

**Existing implementation (already correct):**
```typescript
// src/lib/supabase.ts
import 'expo-sqlite/localStorage/install';
export const supabase = createClient(url, key, {
  auth: {
    storage: localStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
  },
});

// src/contexts/auth.tsx
useEffect(() => {
  supabase.auth.getSession().then(({ data: { session } }) => {
    setSession(session);
    setIsLoading(false);
  });
  const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, newSession) => {
    setSession(newSession);
  });
  return () => subscription.unsubscribe();
}, []);
```

### Anti-Patterns to Avoid
- **Manual token parsing on web:** Do not manually extract tokens from URL hash fragments. `detectSessionInUrl: true` handles this automatically on web.
- **detectSessionInUrl: false on web:** The Expo docs recommend `false` for native apps, but this project is web-only. Keep it `true`.
- **Storing session in React state only:** Always use the storage adapter (localStorage) for persistence across refreshes.
- **Duplicate logout buttons without consistent behavior:** Ensure all logout triggers call the same `signOut()` from AuthProvider.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Token extraction from URL | Custom URL parser for hash fragments | `detectSessionInUrl: true` in Supabase client | Supabase JS handles implicit flow token extraction automatically |
| Route protection | Custom redirect logic in useEffect | `Stack.Protected` with guard prop | Built into Expo Router, handles edge cases like deep links |
| Session storage | Custom AsyncStorage adapter | `expo-sqlite/localStorage/install` + `persistSession: true` | Already configured, cross-platform, recommended by Expo |
| Token refresh | Manual refresh timer | `autoRefreshToken: true` in Supabase client | Supabase JS handles token refresh automatically |
| Email validation | Custom regex | Zod schema with `z.string().email()` | Already have zod installed, integrates with react-hook-form |

**Key insight:** Almost all auth infrastructure is already built. The main work is UI polish (component library upgrade) and verification.

## Common Pitfalls

### Pitfall 1: Supabase Dashboard Site URL Mismatch
**What goes wrong:** Magic link email contains a redirect URL that doesn't match the running app URL. User clicks link but lands on wrong URL or gets an error.
**Why it happens:** Supabase dashboard Site URL defaults to `http://localhost:3000` but Expo web runs on `http://localhost:8081`.
**How to avoid:** Verify Supabase dashboard Site URL is set to `http://localhost:8081`. Add `http://localhost:8081/**` to additional redirect URLs.
**Warning signs:** Magic link email link points to wrong port/host.

### Pitfall 2: Hash Fragment Stripping in Expo Router
**What goes wrong:** Expo Router historically stripped hash fragments from URLs, breaking OAuth/magic link implicit flow.
**Why it happens:** Expo Router v2/v3 had a known bug (expo/router#724) that stripped `#` fragments.
**How to avoid:** This project uses Expo SDK 55 with expo-router ~55.0.4. The `detectSessionInUrl: true` setting in supabase-js processes the hash before Expo Router can strip it. Supabase JS reads `window.location.hash` directly during client initialization, not through the router. Verify this works in manual testing.
**Warning signs:** User clicks magic link, URL changes but session is not established.

### Pitfall 3: Race Condition Between getSession and onAuthStateChange
**What goes wrong:** `isLoading` stays true or session flashes between null and authenticated.
**Why it happens:** Both `getSession()` and `onAuthStateChange` can fire close together.
**How to avoid:** The existing implementation handles this correctly -- `getSession()` sets initial state, `onAuthStateChange` handles subsequent changes. No modification needed.
**Warning signs:** Flickering between auth and dashboard screens on app load.

### Pitfall 4: Logout Not Clearing Session from All Tabs
**What goes wrong:** User logs out in one tab but another tab still shows authenticated state.
**Why it happens:** `signOut()` clears the session and storage, but other tabs only update if they listen for storage events.
**How to avoid:** For a showcase app this is acceptable behavior. Supabase's `onAuthStateChange` in the active tab handles logout correctly. Multi-tab sync is out of scope.
**Warning signs:** Stale session in background tabs after logout.

### Pitfall 5: Login Screen Not Resetting After Magic Link Sent
**What goes wrong:** User sends magic link, clicks it, session is established, but if they navigate back to auth the form still shows the success message.
**Why it happens:** React state persists in the component.
**How to avoid:** Stack.Protected will redirect away from auth screens when session is established. The form state becomes irrelevant. No action needed.

## Code Examples

### Upgraded Login Screen with Component Library
```typescript
// Using existing TextField, Button, Alert components from Phase 2
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import TextField from '../../src/components/forms/TextField';
import Button from '../../src/components/ui/Button';
import Alert from '../../src/components/feedback/Alert';

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
});

type LoginForm = z.infer<typeof loginSchema>;

// In LoginScreen:
const { control, handleSubmit } = useForm<LoginForm>({
  resolver: zodResolver(loginSchema),
  defaultValues: { email: '' },
});

const onSubmit = async (data: LoginForm) => {
  const { error } = await signIn(data.email);
  // handle success/error
};
```

### Logout Button in Dashboard Header
```typescript
// In DashboardHeader component (dashboard/_layout.tsx)
import { useSession } from '../../src/contexts/auth';
import Button from '../../src/components/ui/Button';

function DashboardHeader() {
  const { signOut } = useSession();
  // ... existing header code ...
  return (
    <View>
      {/* ... existing logo/breadcrumb ... */}
      <Button
        variant="text"
        size="sm"
        color="error"
        icon="logout"
        label="Sign Out"
        onPress={signOut}
      />
    </View>
  );
}
```

### signInWithOtp with emailRedirectTo
```typescript
// src/contexts/auth.tsx - enhanced signIn
const signIn = async (email: string) => {
  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo: window.location.origin, // redirects back to app root
    },
  });
  return { error };
};
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Manual redirect via useEffect + router.replace | Stack.Protected guard prop | Expo Router v3+ (SDK 53+) | Cleaner, declarative auth guards |
| AsyncStorage for session | expo-sqlite/localStorage polyfill | Expo SDK 55 | Better cross-platform compat, recommended by Expo |
| Implicit flow only | PKCE flow available | Supabase JS v2 | More secure option; implicit flow still works fine for web SPAs |
| detectSessionInUrl: false for RN | detectSessionInUrl: true for web | Always | Web-only apps should use true for automatic session detection |

**Deprecated/outdated:**
- `@react-native-async-storage/async-storage` for Supabase storage: Use `expo-sqlite/localStorage/install` instead (Expo recommendation)
- Manual `useEffect` + `router.replace` for auth guards: Use `Stack.Protected` instead
- Custom `useProtectedRoute` hooks: Unnecessary with Stack.Protected

## Open Questions

1. **Supabase Dashboard Configuration**
   - What we know: Site URL and redirect URLs must be configured in the Supabase dashboard for magic links to redirect correctly
   - What's unclear: Whether the project's Supabase dashboard is already configured with `http://localhost:8081` as Site URL
   - Recommendation: Verify during implementation. If not set, update Site URL to `http://localhost:8081` and add `http://localhost:8081/**` to redirect URLs

2. **Hash Fragment Processing Timing**
   - What we know: `detectSessionInUrl: true` causes supabase-js to read `window.location.hash` on client init. Expo Router historically stripped hashes.
   - What's unclear: Whether the timing of supabase-js initialization vs Expo Router URL processing causes any race condition in SDK 55
   - Recommendation: Manual end-to-end test during implementation. If hash is stripped before supabase-js reads it, the workaround is `+native-intent.ts` with `redirectSystemPath` to convert `#` to `?`

3. **emailRedirectTo Configuration**
   - What we know: If not specified, Supabase uses Site URL. Can be overridden per signInWithOtp call.
   - What's unclear: Whether the current signIn function should explicitly pass `emailRedirectTo`
   - Recommendation: Add `emailRedirectTo: window.location.origin` for explicitness. Fall back to Site URL if on server (though this is web-only)

## Validation Architecture

### Test Framework
| Property | Value |
|----------|-------|
| Framework | Jest 29.7 + jest-expo 55 + @testing-library/react-native 13.3 |
| Config file | `apps/mobile/jest.config.js` |
| Quick run command | `cd apps/mobile && npx jest --testPathPattern="tests/auth" --no-coverage` |
| Full suite command | `cd apps/mobile && npx jest --no-coverage` |

### Phase Requirements -> Test Map
| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| AUTH-01 | Magic link signIn calls supabase.auth.signInWithOtp | unit | `cd apps/mobile && npx jest tests/contexts/auth.test.tsx -x` | No - Wave 0 |
| AUTH-02 | Session restored from storage on mount via getSession | unit | `cd apps/mobile && npx jest tests/contexts/auth.test.tsx -x` | No - Wave 0 |
| AUTH-03 | signOut clears session and triggers state update | unit | `cd apps/mobile && npx jest tests/contexts/auth.test.tsx -x` | No - Wave 0 |
| AUTH-04 | Protected routes redirect when session is null | manual-only | Manual browser test (Stack.Protected is Expo Router internal) | N/A |

### Sampling Rate
- **Per task commit:** `cd apps/mobile && npx jest --no-coverage`
- **Per wave merge:** `cd apps/mobile && npx jest --no-coverage`
- **Phase gate:** Full suite green before `/gsd:verify-work`

### Wave 0 Gaps
- [ ] `tests/contexts/auth.test.tsx` -- covers AUTH-01, AUTH-02, AUTH-03 (AuthProvider unit tests)
- [ ] `tests/__mocks__/supabase.ts` -- mock Supabase client for auth testing
- [ ] AUTH-04 is manual-only: Stack.Protected behavior is an Expo Router internal that cannot be meaningfully unit-tested. Verify via manual browser navigation.

## Sources

### Primary (HIGH confidence)
- [Expo docs: Using Supabase](https://docs.expo.dev/guides/using-supabase/) - Client setup, localStorage polyfill, detectSessionInUrl guidance
- [Expo docs: Protected routes](https://docs.expo.dev/router/advanced/protected/) - Stack.Protected API, guard prop behavior, redirect mechanics
- [Supabase docs: Magic Link login](https://supabase.com/docs/guides/auth/passwordless-login/auth-magic-link) - signInWithOtp API, emailRedirectTo, PKCE flow
- [Supabase docs: Redirect URLs](https://supabase.com/docs/guides/auth/redirect-urls) - Site URL config, additional redirect URLs, wildcard patterns
- [Supabase docs: signInWithOtp API](https://supabase.com/docs/reference/javascript/auth-signinwithotp) - Full method signature, options, return type

### Secondary (MEDIUM confidence)
- [Expo blog: Protected routes](https://expo.dev/blog/simplifying-auth-flows-with-protected-routes) - Stack.Protected introduction and patterns
- [Supabase docs: PKCE flow](https://supabase.com/docs/guides/auth/sessions/pkce-flow) - PKCE vs implicit flow, detectSessionInUrl behavior
- [DEV.to: Stack.Protected patterns](https://dev.to/aaronksaunders/simplifying-auth-and-role-based-routing-with-stackprotected-in-expo-router-592m) - Community patterns and examples

### Tertiary (LOW confidence)
- [GitHub issue #724: Hash stripping](https://github.com/expo/router/issues/724) - Historical hash stripping bug; repo archived March 2025. Unclear if fully resolved in SDK 55. Needs manual verification.

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - All libraries already installed and configured in Phase 1. No new deps needed.
- Architecture: HIGH - Auth scaffolding from Phase 1 is solid. Stack.Protected, AuthProvider, Supabase client all in place.
- Pitfalls: MEDIUM - Hash fragment timing and Supabase dashboard config need manual verification during implementation.

**Research date:** 2026-03-10
**Valid until:** 2026-04-10 (stable -- all core libraries are established, no breaking changes expected)
