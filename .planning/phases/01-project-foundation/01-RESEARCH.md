# Phase 1: Project Foundation - Research

**Researched:** 2026-03-10
**Domain:** Expo monorepo scaffolding, NativeWind styling, Expo Router navigation, Supabase auth, dev tooling
**Confidence:** HIGH

## Summary

This phase establishes the entire project foundation: an Expo SDK 54 monorepo with npm workspaces, NativeWind v4 for Tailwind-based styling, Expo Router v5 for file-based navigation with auth/dashboard route groups, a Supabase cloud project with magic link auth enabled, and ESLint + Prettier + Husky for code quality. The project targets web-only deployment (Expo web via Metro bundler) but uses React Native primitives throughout.

The stack is well-documented and battle-tested. NativeWind v4.2.0+ is confirmed stable with Expo SDK 54 and Reanimated v4. Expo Router v5 (bundled with SDK 53+) provides `Stack.Protected` for declarative auth guarding. Supabase magic link auth works out of the box on web with `detectSessionInUrl: true` and PKCE flow. The main risk areas are NativeWind configuration (easy to get wrong) and the monorepo Metro config.

**Primary recommendation:** Use Expo SDK 54 (current `create-expo-app` default), NativeWind v4.2.1+ with Tailwind CSS 3.4.17, and Supabase JS v2. Set up the monorepo structure first, then layer in styling, routing, and auth.

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions
- Dark UI throughout -- black/dark gray backgrounds, white/5-white/20 for surfaces
- Colors: Primary `#2563eb`, accent cyan `#06b6d4`, danger `#ef4444`, dangerOrange `#f97316`, gray500 `#6b7280`. No separate secondary color; cyan is the accent.
- Tailwind theme extended with primary (50-950 scale), danger, gradient-from/gradient-to. Default Tailwind neutrals/grays.
- Typography: Orbitron for headings and buttons (uppercase, semibold); Inter for body, captions, links. Sizes text-sm to text-4xl via Typography component variants.
- Borders on dark surfaces: `border-white/15` or `border-white/20`
- Gradient (blue->cyan) only on contained/filled button variants
- Background image with dark overlay on login screen only; in-app screens use solid dark background
- Usage pattern: Prefer Tailwind classes (text-primary, bg-primary); use Colors.* constant in style props; Gradients.* for LinearGradient
- App branding: `FUELED.SHOWCASE` in Orbitron
- Top header: `FUELED.SHOWCASE / breadcrumbs` in Orbitron. On small screens, show back arrow instead of full breadcrumbs.
- Bottom tabs: 2 tabs -- Dashboard (home icon) and Profile (person icon). Active tab has blue indicator line on top + blue icon/text.
- Tabs remain visible on all screens including demo sub-screens
- Dashboard tab: 4 centered cards linking to demo screens
- Profile tab: Card showing "Signed in as" + user email. Danger-colored "SIGN OUT" button at the bottom.
- Logout lives in Profile tab, NOT in the header
- Login screen: Centered card on background image with dark overlay, email input + gradient "SEND MAGIC LINK" button
- npm workspaces (no yarn, pnpm, or Turborepo)
- ESLint (with typescript-eslint) + Prettier set up from Phase 1
- Lint-on-save and pre-commit hooks (husky + lint-staged)
- npm scripts in root package.json for orchestration
- Local Supabase CLI for development (requires Docker) + cloud project for staging/production
- .env.local + .env.example pattern, one set per app

### Claude's Discretion
- Placeholder screen content style (screen title + coming soon, or requirement preview)
- Whether to create cloud Supabase project in Phase 1 or defer to Phase 3 (success criteria requires magic link works -- evaluate if local CLI satisfies this)
- Exact ESLint rule configuration
- Exact spacing, card sizing, and responsive breakpoints
- Pre-commit hook scope (lint-staged files only vs full lint)

### Deferred Ideas (OUT OF SCOPE)
- CI/CD lint + test checks before deploy -- Phase 6
- Resend custom email domain (info@vecotech.io) -- Phase 6
- Supabase auto-redeploy in GitHub Actions -- Phase 6
</user_constraints>

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| INFR-01 | Supabase cloud project with auth enabled (magic link works with default Supabase email in dev) | Supabase cloud project setup, `signInWithOtp` API, PKCE flow for web, `detectSessionInUrl` configuration |
| INFR-05 | Proper .gitignore (include .planning, exclude .claude, node_modules, env files) | Standard Expo .gitignore template with project-specific additions |
</phase_requirements>

## Standard Stack

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| expo | ~54.0.0 | App framework | Current `create-expo-app` default (March 2026), stable, well-documented |
| react-native | 0.81.x | UI primitives | Bundled with Expo SDK 54 |
| react | 19.1.x | Component model | Bundled with Expo SDK 54 |
| nativewind | ^4.2.1 | Tailwind CSS for RN | Stable v4, confirmed compatible with SDK 54 + Reanimated v4 |
| tailwindcss | ^3.4.17 | Utility CSS engine | Required by NativeWind v4 (NOT v4.x Tailwind -- that is NativeWind v5) |
| expo-router | ~5.x | File-based routing | Bundled with SDK 53+, provides Stack.Protected for auth |
| @supabase/supabase-js | ^2.99.0 | Supabase client | Latest stable v2, magic link + PKCE support |
| typescript | ~5.8.3 | Type safety | Recommended by Expo SDK 54 |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| react-native-reanimated | ~4.1.1 | Animation runtime | Peer dep of NativeWind v4.2+, bundled with SDK 54 |
| react-native-safe-area-context | ~5.6.0 | Safe area handling | Peer dep of NativeWind, handles notches/status bars |
| expo-font | latest | Font loading | Load Orbitron + Inter Google Fonts |
| @expo-google-fonts/orbitron | latest | Orbitron font | Heading/button typography |
| @expo-google-fonts/inter | latest | Inter font | Body/caption typography |
| expo-linear-gradient | latest | Gradient backgrounds | Blue-to-cyan gradient on filled buttons, login overlay |
| expo-splash-screen | latest | Splash control | Prevent flash while fonts/auth load |
| expo-sqlite | latest | localStorage polyfill | Supabase session persistence (`expo-sqlite/localStorage/install`) |
| @expo/vector-icons | latest | Icon set | Tab bar icons (home, person), dashboard card icons |
| eslint-config-expo | latest | ESLint config | Flat config format, SDK 53+ compatible |
| prettier | latest | Code formatting | Consistent formatting |
| eslint-config-prettier | latest | Disable format rules | Prevent ESLint/Prettier conflicts |
| eslint-plugin-prettier | latest | Prettier as ESLint rule | Surface formatting violations in lint |
| husky | ^9.x | Git hooks | Pre-commit hook runner |
| lint-staged | ^15.x | Staged file linting | Run lint only on changed files |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| NativeWind v4 | NativeWind v5 (preview) | v5 uses Tailwind v4 + PostCSS, still pre-release/unstable -- not production-ready |
| Expo SDK 54 | Expo SDK 55 | SDK 55 available but not the default template; SDK 54 is more battle-tested |
| Expo SDK 54 | Expo SDK 53 | SDK 53 is older, requires Reanimated v3 with NativeWind -- SDK 54 + NativeWind 4.2+ is officially recommended |
| @react-native-async-storage | expo-sqlite localStorage | expo-sqlite is the modern Expo approach for localStorage polyfill; AsyncStorage is legacy |

**Installation:**
```bash
# Root (monorepo tooling)
npm init -y
# Edit package.json to add workspaces: ["apps/*", "infra/*"]

# Create Expo app in workspace
cd apps && npx create-expo-app mobile --template blank-typescript
cd mobile

# Core styling
npx expo install nativewind react-native-reanimated react-native-safe-area-context
npm install --save-dev tailwindcss@^3.4.17

# Fonts
npx expo install expo-font @expo-google-fonts/orbitron @expo-google-fonts/inter

# Gradients + splash
npx expo install expo-linear-gradient expo-splash-screen

# Supabase
npx expo install @supabase/supabase-js expo-sqlite

# Icons
npx expo install @expo/vector-icons

# Dev tooling (root level)
cd ../..
npm install --save-dev eslint eslint-config-expo prettier eslint-config-prettier eslint-plugin-prettier husky lint-staged
```

## Architecture Patterns

### Recommended Project Structure
```
root/
├── package.json               # workspaces: ["apps/*", "infra/*"]
├── eslint.config.js            # Shared flat config
├── .prettierrc                 # Shared Prettier config
├── .husky/
│   └── pre-commit              # npx lint-staged
├── .lintstagedrc.json          # Lint-staged config
├── .gitignore                  # Root gitignore
├── apps/
│   └── mobile/
│       ├── app/                # Expo Router (file-based routes)
│       │   ├── _layout.tsx     # Root layout: providers, font loading, splash
│       │   ├── (auth)/
│       │   │   ├── _layout.tsx # Auth group layout (Stack)
│       │   │   └── login.tsx   # Login screen placeholder
│       │   └── (dashboard)/
│       │       ├── _layout.tsx # Dashboard layout (Tabs + header)
│       │       ├── (tabs)/
│       │       │   ├── _layout.tsx  # Tab bar layout
│       │       │   ├── index.tsx    # Dashboard tab (home)
│       │       │   └── profile.tsx  # Profile tab
│       │       ├── data-fetching.tsx      # Placeholder
│       │       ├── state-management.tsx   # Placeholder
│       │       ├── components.tsx         # Placeholder
│       │       └── about.tsx             # Placeholder
│       ├── src/
│       │   ├── components/     # Shared UI components
│       │   ├── constants/
│       │   │   └── colors.ts   # Colors, Gradients constants
│       │   ├── contexts/       # Auth context (Phase 3, stub now)
│       │   ├── lib/
│       │   │   └── supabase.ts # Supabase client init
│       │   ├── types/          # TypeScript types
│       │   └── utils/          # Helpers
│       ├── assets/             # Images, fonts if local
│       ├── global.css          # Tailwind directives
│       ├── metro.config.js     # NativeWind + monorepo config
│       ├── babel.config.js     # NativeWind babel preset
│       ├── tailwind.config.js  # Theme: colors, fonts, dark mode
│       ├── nativewind-env.d.ts # NativeWind TypeScript types
│       ├── app.json            # Expo config (web: metro bundler)
│       ├── tsconfig.json       # TypeScript config
│       ├── package.json        # App dependencies
│       ├── .env.local          # EXPO_PUBLIC_SUPABASE_URL, KEY (gitignored)
│       └── .env.example        # Template for .env.local
└── infra/
    └── supabase/
        ├── config.toml         # Supabase CLI config
        ├── migrations/         # SQL migrations (empty in Phase 1)
        ├── .env.local          # Supabase secrets (gitignored)
        └── .env.example        # Template
```

### Pattern 1: Supabase Client Initialization (Web-Optimized)
**What:** Initialize Supabase client with web-appropriate auth settings
**When to use:** Single initialization in `src/lib/supabase.ts`, imported everywhere
**Example:**
```typescript
// Source: Supabase Expo docs + web-specific adjustments
import 'expo-sqlite/localStorage/install';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: localStorage,  // expo-sqlite polyfill
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,  // TRUE for web -- auto-handles magic link redirects via PKCE
  },
});
```
**Critical note:** `detectSessionInUrl` must be `true` for web apps (unlike native React Native where it's `false`). This enables automatic PKCE code exchange when the user clicks the magic link and is redirected back to the app.

### Pattern 2: NativeWind Metro Config (Monorepo)
**What:** Combined NativeWind + monorepo Metro configuration
**When to use:** `metro.config.js` in `apps/mobile/`
**Example:**
```javascript
// Source: NativeWind docs + Expo monorepo docs
const { getDefaultConfig } = require('expo/metro-config');
const { withNativeWind } = require('nativewind/metro');

const config = getDefaultConfig(__dirname);

module.exports = withNativeWind(config, { input: './global.css' });
```
**Note:** As of Expo SDK 52+, Metro automatically detects monorepo structure. No manual `watchFolders` or `nodeModulesPaths` needed.

### Pattern 3: Expo Router Auth Protection (SDK 53+)
**What:** Declarative route protection using Stack.Protected
**When to use:** Root `_layout.tsx` to gate auth vs dashboard routes
**Example:**
```typescript
// Source: Expo Router docs - authentication
import { Stack } from 'expo-router';
import { useSession } from '../src/contexts/auth';

function RootNavigator() {
  const { session, isLoading } = useSession();

  if (isLoading) return null; // Splash screen still showing

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Protected guard={!!session}>
        <Stack.Screen name="(dashboard)" />
      </Stack.Protected>
      <Stack.Protected guard={!session}>
        <Stack.Screen name="(auth)" />
      </Stack.Protected>
    </Stack>
  );
}
```

### Pattern 4: NativeWind Tailwind Theme Configuration
**What:** Extended Tailwind config with project colors and fonts
**When to use:** `tailwind.config.js` in `apps/mobile/`
**Example:**
```javascript
// Source: NativeWind docs + CONTEXT.md design decisions
const { platformSelect } = require('nativewind/theme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx,ts,tsx}',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#2563eb',
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
          950: '#172554',
        },
        accent: '#06b6d4',
        danger: '#ef4444',
        'danger-orange': '#f97316',
      },
      fontFamily: {
        heading: ['Orbitron_600SemiBold'],
        body: ['Inter_400Regular'],
        'body-medium': ['Inter_500Medium'],
        'body-semibold': ['Inter_600SemiBold'],
      },
      gradientColorStops: {
        'gradient-from': '#2563eb',
        'gradient-to': '#06b6d4',
      },
    },
  },
  plugins: [],
};
```

### Pattern 5: Font Loading with Expo
**What:** Load Google Fonts before rendering
**When to use:** Root `_layout.tsx`
**Example:**
```typescript
// Source: expo-google-fonts docs + Expo SplashScreen docs
import { useFonts } from 'expo-font';
import { Orbitron_600SemiBold } from '@expo-google-fonts/orbitron';
import { Inter_400Regular, Inter_500Medium, Inter_600SemiBold } from '@expo-google-fonts/inter';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Orbitron_600SemiBold,
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;

  // ... render providers and navigation
}
```

### Pattern 6: Babel Configuration for NativeWind + Reanimated v4
**What:** Correct babel preset order for NativeWind v4.2+ with Reanimated v4
**When to use:** `babel.config.js` in `apps/mobile/`
**Example:**
```javascript
// Source: NativeWind v4.2+ docs, Expo SDK 54 upgrade guide
module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      ['babel-preset-expo', { jsxImportSource: 'nativewind' }],
      'nativewind/babel',
    ],
    plugins: [
      'react-native-reanimated/plugin',  // MUST be last plugin
    ],
  };
};
```
**Critical:** Do NOT add `@worklets/babel-plugin` separately -- Reanimated v4 includes worklets internally. Adding both causes "Duplicate plugin/preset detected" error.

### Anti-Patterns to Avoid
- **Installing Tailwind CSS v4.x with NativeWind v4:** Tailwind v4 is for NativeWind v5 (preview). NativeWind v4 requires Tailwind v3.4.17.
- **Setting `detectSessionInUrl: false` for web:** This prevents magic link PKCE flow from working. Only set to `false` for native-only apps.
- **Using `@react-native-async-storage/async-storage`:** The modern Expo approach uses `expo-sqlite/localStorage/install` for localStorage polyfill.
- **Manual Metro monorepo config with SDK 52+:** Expo auto-detects monorepo. Remove `watchFolders`, `nodeModulesPaths`, `disableHierarchicalLookup` if present.
- **Naming the TypeScript declarations file `nativewind.d.ts`:** Must NOT match the package name. Use `nativewind-env.d.ts`.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Tailwind for RN | Custom StyleSheet mapper | NativeWind v4 | Handles platform differences, className support, theme |
| File-based routing | Manual React Navigation setup | Expo Router v5 | Type-safe, file-based, built-in auth protection |
| Auth session management | Custom token storage/refresh | Supabase JS client auth | Handles PKCE, token refresh, session persistence |
| Font loading | Manual font file management | @expo-google-fonts/* | Pre-packaged, typed, works with Expo build system |
| Gradient rendering | Custom canvas/SVG gradients | expo-linear-gradient | Native performance, works with NativeWind via cssInterop |
| Code formatting | Manual style enforcement | Prettier + ESLint + Husky | Automated, consistent, enforced on commit |
| Safe area handling | Manual padding calculations | react-native-safe-area-context | Handles all device types including notches |

**Key insight:** This phase is almost entirely configuration and wiring. The value is in getting the configuration exactly right so subsequent phases can focus on features without fighting the toolchain.

## Common Pitfalls

### Pitfall 1: NativeWind Version Mismatch
**What goes wrong:** Styles don't apply, build errors about "worklets", or "Duplicate plugin/preset" errors
**Why it happens:** Mixing NativeWind v4 with Tailwind v4.x, or adding worklets plugin alongside Reanimated v4
**How to avoid:** Pin `nativewind@^4.2.1` and `tailwindcss@^3.4.17`. Do NOT install `@worklets/babel-plugin`. Reanimated v4 includes worklets internally.
**Warning signs:** `className` has no effect, babel compilation errors mentioning "worklets"

### Pitfall 2: Supabase Magic Link Not Working on Web
**What goes wrong:** User clicks magic link but returns to login screen without being authenticated
**Why it happens:** `detectSessionInUrl` set to `false` (copied from native RN tutorials) prevents PKCE code exchange
**How to avoid:** Set `detectSessionInUrl: true` in the Supabase client auth config for web apps
**Warning signs:** URL contains `?code=` parameter but session is not established

### Pitfall 3: Fonts Not Rendering in NativeWind
**What goes wrong:** `font-heading` class applied but Orbitron doesn't render
**Why it happens:** NativeWind does NOT load/link fonts -- it only applies the fontFamily style. Fonts must be loaded separately via `useFonts()`.
**How to avoid:** Load fonts with `expo-font` + `useFonts()` hook in root layout BEFORE rendering any styled content. Use SplashScreen to prevent flash.
**Warning signs:** Text renders in system default font despite correct className

### Pitfall 4: npm Workspaces Dependency Hoisting
**What goes wrong:** "Module not found" errors for packages installed in workspace
**Why it happens:** npm hoists dependencies to root `node_modules`, but some Expo/Metro resolvers expect them locally
**How to avoid:** Use `npx expo install` for Expo-specific packages (ensures correct version). Run `npx expo start --clear` after workspace changes.
**Warning signs:** Module resolution errors after `npm install`

### Pitfall 5: Missing `global.css` Import
**What goes wrong:** No NativeWind styles applied at all
**Why it happens:** The `global.css` file (containing Tailwind directives) is not imported in the app entry point
**How to avoid:** Import `./global.css` at the top of `app/_layout.tsx` (before any component code)
**Warning signs:** All NativeWind classes completely ignored, no build errors

### Pitfall 6: Expo Environment Variable Prefix
**What goes wrong:** `process.env.SUPABASE_URL` is `undefined` at runtime
**Why it happens:** Expo requires the `EXPO_PUBLIC_` prefix for client-accessible env vars
**How to avoid:** Name all client env vars with `EXPO_PUBLIC_` prefix (e.g., `EXPO_PUBLIC_SUPABASE_URL`)
**Warning signs:** Environment variables return `undefined` despite being in `.env`

### Pitfall 7: Supabase Cloud Project Required for Magic Link
**What goes wrong:** Success criteria requires "magic link login works with default Supabase email in dev" but local Supabase CLI email sending is unreliable
**Why it happens:** Local Supabase uses Inbucket for email testing -- functional but less reliable for verifying real magic link flow
**How to avoid:** Create a Supabase cloud project in Phase 1 (it's free tier). Use the cloud URL/key in `.env.local`. Default Supabase email (via cloud) reliably sends magic links to any email address during development.
**Warning signs:** Emails not arriving, Inbucket UI hard to use

## Code Examples

### ESLint Flat Config (Root)
```javascript
// eslint.config.js (root of monorepo)
// Source: Expo ESLint docs (SDK 53+)
const { defineConfig, globalIgnores } = require('eslint/config');
const expoConfig = require('eslint-config-expo/flat');
const eslintPluginPrettierRecommended = require('eslint-plugin-prettier/recommended');

module.exports = defineConfig([
  globalIgnores(['**/dist/*', '**/node_modules/*', '**/.expo/*']),
  expoConfig,
  eslintPluginPrettierRecommended,
]);
```

### Prettier Configuration
```json
// .prettierrc
{
  "semi": true,
  "singleQuote": true,
  "trailingComma": "all",
  "printWidth": 100,
  "tabWidth": 2
}
```

### Husky + lint-staged Setup
```json
// .lintstagedrc.json (root)
{
  "apps/**/*.{ts,tsx,js,jsx}": ["eslint --fix", "prettier --write"],
  "*.{json,md,css}": ["prettier --write"]
}
```

### Colors Constants Module
```typescript
// src/constants/colors.ts
export const Colors = {
  primary: '#2563eb',
  accent: '#06b6d4',
  danger: '#ef4444',
  dangerOrange: '#f97316',
  gray500: '#6b7280',
  background: '#000000',
  surface: 'rgba(255, 255, 255, 0.05)',
  surfaceLight: 'rgba(255, 255, 255, 0.1)',
  border: 'rgba(255, 255, 255, 0.15)',
  borderLight: 'rgba(255, 255, 255, 0.2)',
  textPrimary: '#ffffff',
  textSecondary: 'rgba(255, 255, 255, 0.7)',
} as const;

export const Gradients = {
  primaryButton: {
    colors: ['#2563eb', '#06b6d4'] as const,
    start: { x: 0, y: 0 },
    end: { x: 1, y: 1 },
  },
} as const;
```

### .gitignore
```gitignore
# Dependencies
node_modules/

# Expo
.expo/
dist/
web-build/

# Environment
.env
.env.local
.env.*.local

# Claude
.claude/

# IDE
.vscode/
.idea/

# OS
.DS_Store
Thumbs.db

# Supabase local
infra/supabase/.temp/

# Include planning
!.planning/
```

### Tab Layout with Custom Styling
```typescript
// app/(dashboard)/(tabs)/_layout.tsx
import { Tabs } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Colors } from '../../../src/constants/colors';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.gray500,
        tabBarStyle: {
          backgroundColor: '#000000',
          borderTopColor: 'rgba(255, 255, 255, 0.15)',
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Dashboard',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="home" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="user" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
```

### app.json Configuration
```json
{
  "expo": {
    "name": "FUELED.SHOWCASE",
    "slug": "fueled-showcase",
    "version": "1.0.0",
    "scheme": "fueled-showcase",
    "web": {
      "bundler": "metro",
      "output": "single"
    },
    "plugins": [
      "expo-router",
      "expo-font"
    ]
  }
}
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| NativeWind v2 (className string) | NativeWind v4 (jsxImportSource) | 2024 | Better type safety, JSX className support without wrapping |
| AsyncStorage for sessions | expo-sqlite/localStorage | 2024 (SDK 52+) | Simpler API, better web compat, no extra package |
| Manual Metro monorepo config | Auto-detection (SDK 52+) | 2024 | Remove `watchFolders`, `nodeModulesPaths` boilerplate |
| ESLint legacy config (.eslintrc) | Flat config (eslint.config.js) | SDK 53 (2025) | Modern format, better composability |
| redirect-based auth | Stack.Protected | Expo Router v5 / SDK 53 (2025) | Declarative auth guarding, no useEffect redirects |
| Reanimated v3 | Reanimated v4 (built-in worklets) | SDK 54 (2025) | Remove separate worklets plugin |

**Deprecated/outdated:**
- `@react-native-async-storage/async-storage`: Replaced by `expo-sqlite/localStorage/install` for Expo projects
- `react-native-url-polyfill/auto`: No longer needed with recent Expo SDK versions
- ESLint `.eslintrc.*` format: Replaced by flat config in SDK 53+
- Manual `watchFolders` in Metro config: Auto-detected since SDK 52

## Open Questions

1. **Cloud Supabase vs Local CLI for Phase 1**
   - What we know: Success criteria requires "magic link login works with default Supabase email in dev." Local Supabase CLI uses Inbucket (email captured locally, not sent to real inbox). Cloud Supabase free tier sends real emails via default Supabase email domain.
   - What's unclear: Whether "works" means a real email arrives or just that the flow is testable
   - Recommendation: **Create a cloud Supabase project in Phase 1** (free tier). The success criterion says "magic link login works" -- this is most reliably demonstrated with a cloud project where real emails arrive. Also set up local Supabase CLI for development workflows (migrations, local DB). Use cloud URL in `.env.local` for the running app.

2. **Placeholder screen content style**
   - What we know: Phase 1 needs placeholder screens for at least auth + dashboard route groups
   - Recommendation: Use screen title in Orbitron + "Coming in Phase X" subtitle in Inter. This validates fonts and NativeWind styling work correctly while being informative.

3. **Pre-commit hook scope**
   - What we know: Options are lint-staged (only changed files) vs full project lint
   - Recommendation: Use lint-staged (changed files only). Faster commits, less friction. Full lint runs in CI (Phase 6).

## Validation Architecture

### Test Framework
| Property | Value |
|----------|-------|
| Framework | Not set up in Phase 1 (Jest + RNTL deferred to Phase 6) |
| Config file | none -- see Wave 0 |
| Quick run command | N/A |
| Full suite command | N/A |

### Phase Requirements -> Test Map
| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| INFR-01 | Supabase cloud project with auth enabled, magic link works | manual | Manual: send magic link, check email arrives, click link, verify redirect | N/A (manual) |
| INFR-05 | .gitignore excludes node_modules/.env/.claude, includes .planning | smoke | `git ls-files --others --ignored --exclude-standard \| grep -E "(node_modules\|\.env\|\.claude)"` should return empty; `.planning/` should be tracked | N/A |

### Additional Success Criteria Verification
| Criterion | Verification Method | Type |
|-----------|-------------------|------|
| `npx expo start --web` opens app | manual | Manual: run command, check browser |
| NativeWind classes render correctly | manual | Manual: verify styled element visible |
| Expo Router navigates between routes | manual | Manual: click between auth and dashboard |
| Supabase magic link works | manual | Manual: full email flow |
| .gitignore correct | smoke | Check git status after init |

### Sampling Rate
- **Per task commit:** Manual visual verification (no automated tests in Phase 1)
- **Per wave merge:** Full manual checklist against success criteria
- **Phase gate:** All 5 success criteria manually verified before `/gsd:verify-work`

### Wave 0 Gaps
- No test infrastructure needed in Phase 1 (testing framework setup is Phase 6)
- All verification is manual or via shell commands in this phase

## Sources

### Primary (HIGH confidence)
- [NativeWind v4 Installation](https://www.nativewind.dev/docs/getting-started/installation) - Config files, peer deps, setup steps
- [NativeWind v4 Font Family](https://www.nativewind.dev/docs/tailwind/typography/font-family) - Custom font configuration
- [Expo Router Authentication](https://docs.expo.dev/router/advanced/authentication/) - Stack.Protected, auth flow
- [Expo Router Tabs](https://docs.expo.dev/router/advanced/tabs/) - Tab bar configuration
- [Expo Monorepo Guide](https://docs.expo.dev/guides/monorepos/) - Workspace setup, Metro auto-config
- [Expo ESLint Guide](https://docs.expo.dev/guides/using-eslint/) - Flat config, Prettier integration
- [Supabase Magic Link](https://supabase.com/docs/guides/auth/auth-email-passwordless) - signInWithOtp, PKCE flow
- [Supabase Expo Quickstart](https://supabase.com/docs/guides/getting-started/quickstarts/expo-react-native) - Client setup, env vars
- [Supabase Local Development](https://supabase.com/docs/guides/local-development/overview) - CLI setup, config.toml
- [Expo SDK 53 Changelog](https://expo.dev/changelog/sdk-53) - Version numbers, features
- [Expo SDK 54 Changelog](https://expo.dev/changelog/sdk-54) - Version numbers, Reanimated v4

### Secondary (MEDIUM confidence)
- [NativeWind GitHub Discussion #1604](https://github.com/nativewind/nativewind/discussions/1604) - Officially recommended SDK + NativeWind versions
- [Supabase PKCE Flow Docs](https://supabase.com/docs/guides/auth/sessions/pkce-flow) - detectSessionInUrl behavior
- [@expo-google-fonts/orbitron (npm)](https://www.npmjs.com/package/@expo-google-fonts/orbitron) - Package availability
- [@supabase/supabase-js (npm)](https://www.npmjs.com/package/@supabase/supabase-js) - Latest v2.99.0

### Tertiary (LOW confidence)
- None -- all findings verified against primary or secondary sources

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - All versions verified against official docs and npm
- Architecture: HIGH - File structure follows official Expo Router + NativeWind patterns
- Pitfalls: HIGH - Each pitfall documented from official sources or verified GitHub issues
- Supabase web auth: MEDIUM - `detectSessionInUrl: true` for web is the logical inverse of the documented native setting; confirmed by PKCE docs but not explicitly stated in an Expo+web guide

**Research date:** 2026-03-10
**Valid until:** 2026-04-10 (30 days -- stable ecosystem, no major releases expected)
