# Phase 4: Dashboard + About - Research

**Researched:** 2026-03-10
**Domain:** React Native (Expo) dashboard screens, portfolio/showcase About page, Supabase session access
**Confidence:** HIGH

## Summary

Phase 4 completes the dashboard with a welcome greeting and builds the About screen. Crucially, most dashboard work is already done -- DASH-01 (4 rich cards with ImageBackground, gradient overlay, hover/press animations, tags as pills, navigation) and DASH-03 (persistent header with Fueled logo, breadcrumb navigation, profile icon) were completed during Phase 3's UX checkpoint. The remaining dashboard work is limited to DASH-02: adding a welcome greeting that displays the logged-in user's email.

The About screen (ABUT-01 through ABUT-04) is entirely new. It replaces the current placeholder with a polished showcase page containing: a visual requirements checklist mapping each Fueled requirement to its demo location, an author section with mini cover letter, a tech stack rationale section, and external links (GitHub, portfolio, email). All building blocks exist in the component library (Card, Badge, Typography, Accordion, List, Button, Avatar, Divider).

**Primary recommendation:** Use the existing component library exclusively -- no new component creation needed. The About screen is a data-driven layout composing existing components over a typed requirements data structure. For external links, use `Linking.openURL` from `react-native` (works on web via `window.open` under the hood).

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| DASH-01 | Dashboard displays 4 rich cards (icon, title, description, tech tags) linking to demo screens | ALREADY DONE -- completed during Phase 3 UX checkpoint. Cards exist in `app/(dashboard)/index.tsx` with ImageBackground, gradient, animations, tags, navigation |
| DASH-02 | Dashboard shows welcome greeting with user email/name from auth | Use `useSession()` hook from `@/contexts/auth` -- `session?.user?.email` gives the email. Pattern already used in `profile.tsx` |
| DASH-03 | Persistent app header with logo + logout across all screens | ALREADY DONE -- DashboardHeader in `app/(dashboard)/_layout.tsx` with Fueled logo, breadcrumb nav, profile icon |
| ABUT-01 | Visual checklist mapping each Fueled requirement to where it's demonstrated | Build from a typed data structure mapping requirement IDs to screen routes with completion status. Use Card, Badge, Typography, MaterialIcons for check/pending icons |
| ABUT-02 | Author section with mini cover letter | Avatar + Typography in a Card. Content: brief personal statement about engineering approach and what makes this submission notable |
| ABUT-03 | Tech stack list with rationale for each choice | Data array of {name, purpose, rationale} rendered with existing components. Each tech choice explained in 1 sentence |
| ABUT-04 | Links to GitHub, portfolio, and email | Use `Linking.openURL()` from `react-native` for GitHub/portfolio, `Linking.openURL('mailto:...')` for email. Button component with icon prop for visual treatment |
</phase_requirements>

## Standard Stack

### Core (Already Installed -- No New Dependencies)

| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| react-native `Linking` | 0.83.2 | Open external URLs (GitHub, portfolio, email) | Built into RN, works on web via window.open |
| @expo/vector-icons `MaterialIcons` | 15.0.2 | Check/pending icons, link icons | Already used throughout app |
| expo-linear-gradient | 55.0.8 | Gradient backgrounds (if needed for About sections) | Already used in dashboard layout |
| react-native-reanimated | 4.2.1 | Animations (press effects on cards) | Already used throughout |
| NativeWind | 4.2.2 | Styling | Already used throughout |

### Supporting (Already Available in Component Library)

| Component | Module | Purpose |
|-----------|--------|---------|
| Typography | `@/components` | All text rendering (h1, h2, h3, body, caption, label) |
| Card | `@/components` | Section containers with header/body/footer slots |
| Badge | `@/components` | Status indicators (success/info/warning/error) |
| Avatar | `@/components` | Author photo or initials |
| Button | `@/components` | External link buttons with icon support |
| Divider | `@/components` | Section separators |
| Accordion / AccordionItem | `@/components` | Collapsible requirement groups |
| List | `@/components` | Requirement item lists |

### Alternatives Considered

| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| `Linking.openURL` | `expo-linking` | expo-linking adds URL parsing but openURL from react-native is sufficient for simple external links; already in deps |
| Accordion for requirements | Flat list | Accordion groups by category (Auth, Data, State, etc.) making it scannable; flat list would be too long |
| Static data array | Supabase query | Requirements are static content, no reason to fetch from backend |

**Installation:**
```bash
# No new dependencies needed -- everything required is already installed
```

## Architecture Patterns

### Recommended Project Structure

```
app/(dashboard)/
  about.tsx              # Replace placeholder with full About screen
  index.tsx              # Add welcome greeting (DASH-02) to existing screen

src/
  constants/
    requirements.ts      # Typed requirements data for ABUT-01 checklist
    tech-stack.ts         # Typed tech stack data for ABUT-03
    author.ts             # Author info for ABUT-02 / ABUT-04
```

### Pattern 1: Welcome Greeting (DASH-02)

**What:** Add a greeting section above the dashboard cards that displays the user email from the auth session.
**When to use:** Top of dashboard scroll view, before cards.
**Example:**

```typescript
// In app/(dashboard)/index.tsx
import { useSession } from '@/contexts/auth';

export default function DashboardScreen() {
  const { session } = useSession();
  const email = session?.user?.email;

  return (
    <ScrollView ...>
      {/* Welcome greeting */}
      <View className="mb-2">
        <Typography variant="h2" className="text-white">
          Welcome back
        </Typography>
        {email && (
          <Typography variant="body" className="text-white/60 mt-1">
            {email}
          </Typography>
        )}
      </View>

      {/* Existing cards */}
      {DEMO_CARDS.map((card) => (
        <DashboardCard key={card.route} card={card} />
      ))}
    </ScrollView>
  );
}
```

**Key detail:** `useSession()` is already used in `profile.tsx` with the exact pattern `session?.user?.email`. The hook is available from `@/contexts/auth`.

### Pattern 2: Requirements Data Structure (ABUT-01)

**What:** A typed constant mapping all Fueled requirements to their demo locations and completion status.
**When to use:** Drives the visual checklist on the About screen.
**Example:**

```typescript
// src/constants/requirements.ts
export type RequirementStatus = 'complete' | 'in-progress' | 'pending';

export type Requirement = {
  id: string;
  title: string;
  description: string;
  screen: string;       // route path or screen name where demonstrated
  status: RequirementStatus;
};

export type RequirementGroup = {
  category: string;
  icon: string;          // MaterialIcons name
  requirements: Requirement[];
};

export const REQUIREMENTS: RequirementGroup[] = [
  {
    category: 'Authentication',
    icon: 'lock',
    requirements: [
      {
        id: 'AUTH-01',
        title: 'Magic Link Login',
        description: 'Email-based passwordless authentication via Supabase',
        screen: 'Login Screen',
        status: 'complete',
      },
      // ... more requirements
    ],
  },
  // ... more groups
];
```

### Pattern 3: External Links (ABUT-04)

**What:** Open GitHub, portfolio, and email links from the About screen.
**When to use:** Author section contact buttons.
**Example:**

```typescript
import { Linking } from 'react-native';

// For web: Linking.openURL uses window.open under the hood
const openLink = (url: string) => Linking.openURL(url);

// Email link
const openEmail = () => Linking.openURL('mailto:jim@vecotech.io');

// GitHub
const openGitHub = () => Linking.openURL('https://github.com/username');

// Portfolio
const openPortfolio = () => Linking.openURL('https://vecotech.io');
```

**Key detail:** `Linking` from `react-native` works on web because `react-native-web` maps `Linking.openURL` to `window.open`. No need for `expo-linking` or platform-specific code.

### Pattern 4: Tech Stack Rationale (ABUT-03)

**What:** A data-driven list of technologies with reasons for each choice.
**Example:**

```typescript
// src/constants/tech-stack.ts
export type TechStackItem = {
  name: string;
  category: string;     // 'Framework' | 'Styling' | 'State' | 'Auth' | 'Testing'
  purpose: string;
  rationale: string;
};

export const TECH_STACK: TechStackItem[] = [
  {
    name: 'React Native (Expo)',
    category: 'Framework',
    purpose: 'Cross-platform mobile + web',
    rationale: 'Expo SDK 55 with web deployment -- reviewers click a URL, no build required',
  },
  {
    name: 'TypeScript',
    category: 'Language',
    purpose: 'Type safety',
    rationale: 'Catches errors at compile time, documents intent, enables IDE tooling',
  },
  // ... more items
];
```

### Anti-Patterns to Avoid

- **Hardcoding requirements in JSX:** Use a data structure in constants/ so it is easy to update status as phases complete. The About screen should render from data, not embed requirement text inline in JSX.
- **Creating new components for one-off layouts:** The About screen sections are compositions of existing components. Do not create `RequirementCard`, `TechStackCard`, etc. -- use Card + Badge + Typography directly.
- **Fetching static content from Supabase:** Requirements, tech stack, and author info are compile-time constants. No API calls needed.
- **Using `window.open` directly:** Always use `Linking.openURL` for cross-platform safety, even though this app is web-only for now.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| External URL opening | Custom window.open wrapper | `Linking.openURL` from react-native | Cross-platform, handles edge cases, already in RN |
| Status indicators | Custom colored dots | `Badge` component with success/info/warning/error types | Already built with proper theming |
| Collapsible sections | Custom animated show/hide | `Accordion` / `AccordionItem` from component library | Already animated with Reanimated |
| Section containers | Custom View with border/bg | `Card` component with header/body/footer slots | Already themed with press animations |
| Check/X icons | Custom SVG or image | `MaterialIcons` with `check-circle` / `radio-button-unchecked` | Already in deps, consistent with app |

**Key insight:** The entire About screen can be built from existing components + data. The work is content architecture (defining the data structures) and composition (arranging components), not UI development.

## Common Pitfalls

### Pitfall 1: Forgetting to handle null session on dashboard
**What goes wrong:** If session is null (during initial load or edge case), the greeting crashes or shows "undefined".
**Why it happens:** `useSession()` returns session as `Session | null`. During initial load, `isLoading` is true and session is null.
**How to avoid:** Always use optional chaining: `session?.user?.email`. Show a fallback or hide the greeting when email is unavailable.
**Warning signs:** TypeScript will flag direct property access on nullable session.

### Pitfall 2: Making the About screen scroll poorly on mobile viewports
**What goes wrong:** Long content with multiple sections overflows or has awkward spacing on narrow screens.
**Why it happens:** The About screen has more content than any other screen (checklist + author + tech stack + links).
**How to avoid:** Use `ScrollView` with `contentContainerClassName="p-4 pb-8 max-w-3xl mx-auto w-full"` -- the same pattern used on dashboard and profile screens. Test at 375px width.
**Warning signs:** Content extending past screen edge, horizontal scroll appearing.

### Pitfall 3: Requirements checklist becoming stale
**What goes wrong:** The checklist shows requirements as "pending" even after they are implemented in later phases.
**Why it happens:** Status is hardcoded at build time.
**How to avoid:** Use a centralized constants file (`src/constants/requirements.ts`) that is easy to update. Add a comment noting it should be updated as phases complete.
**Warning signs:** Checklist data scattered across multiple files.

### Pitfall 4: Linking.openURL failing silently
**What goes wrong:** External links do not open on certain platforms or in certain contexts.
**Why it happens:** `Linking.openURL` can fail if the URL scheme is not supported.
**How to avoid:** The app is web-only so this is low risk, but always use full URLs with `https://` prefix and `mailto:` for email. Can optionally wrap in try/catch.
**Warning signs:** Button press with no visible result.

### Pitfall 5: Inconsistent visual treatment with rest of app
**What goes wrong:** About screen looks like it belongs to a different app.
**Why it happens:** Using raw View/Text instead of the component library, or different spacing/color patterns.
**How to avoid:** Use only components from `@/components` barrel export. Match the dark theme (`bg-white/5`, `border-white/15`, `text-white`, `text-white/60` patterns seen throughout app). Follow the `max-w-3xl mx-auto w-full` container pattern.
**Warning signs:** Light backgrounds, different font sizes, mismatched border colors.

## Code Examples

### Verified: useSession for user email access

```typescript
// Source: apps/mobile/app/(dashboard)/profile.tsx (existing working code)
import { useSession } from '@/contexts/auth';

const { session } = useSession();
// session?.user?.email gives the authenticated user's email
// session is of type Session | null from @supabase/supabase-js
```

### Verified: ScrollView container pattern

```typescript
// Source: apps/mobile/app/(dashboard)/index.tsx (existing working code)
<ScrollView
  className="flex-1"
  contentContainerClassName="p-4 pb-8 max-w-3xl mx-auto w-full gap-4"
  style={{ backgroundColor: 'transparent' }}
>
```

### Verified: Card with header/body/footer slots

```typescript
// Source: apps/mobile/src/components/ui/Card.tsx
<Card
  header={<Typography variant="h3">Section Title</Typography>}
  footer={<Button variant="text" label="Action" onPress={handler} />}
>
  <Typography variant="body">Content here</Typography>
</Card>
```

### Verified: Badge for status indicators

```typescript
// Source: apps/mobile/src/components/ui/Badge.tsx
// Types: 'success' | 'info' | 'warning' | 'error'
<Badge type="success" label="Complete" />
<Badge type="warning" label="In Progress" />
<Badge type="info" label="Pending" />
```

### Verified: Accordion for collapsible groups

```typescript
// Source: apps/mobile/src/components/layout/Accordion.tsx
<Accordion>
  <AccordionItem title="Authentication" defaultOpen>
    {/* Requirement items */}
  </AccordionItem>
  <AccordionItem title="Data Fetching">
    {/* Requirement items */}
  </AccordionItem>
</Accordion>
```

### Verified: Linking.openURL for external links

```typescript
// Source: React Native Linking API (react-native 0.83.2)
import { Linking } from 'react-native';

// Works on web via react-native-web mapping to window.open
Linking.openURL('https://github.com/username');
Linking.openURL('mailto:email@example.com');
```

### Verified: MaterialIcons for check/status icons

```typescript
// Source: apps/mobile/app/(dashboard)/_layout.tsx (existing usage)
import { MaterialIcons } from '@expo/vector-icons';

<MaterialIcons name="check-circle" size={20} color="#22c55e" />
<MaterialIcons name="radio-button-unchecked" size={20} color="rgba(255,255,255,0.3)" />
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Custom scroll handling | ScrollView with NativeWind contentContainerClassName | NativeWind 4.x | Cleaner responsive layouts |
| StyleSheet.create for all styles | NativeWind utility classes + inline style for edge cases | Project convention | Consistent with rest of app |
| Direct supabase.auth.getSession() calls | useSession() context hook | Phase 1 (01-02) | Single source of truth for auth state |

**Already established patterns:**
- Dark theme with `bg-white/5`, `border-white/15`, transparent backgrounds
- `max-w-3xl mx-auto w-full` container constraint
- Component library barrel export from `@/components`
- MaterialIcons for all icons (no other icon library)
- Reanimated for animations (press scale effects)

## Open Questions

1. **Author personal details (name, photo, email, GitHub URL, portfolio URL)**
   - What we know: The About screen needs an author section with links
   - What's unclear: The exact personal details to display (the developer's real name, URLs, etc.)
   - Recommendation: Use placeholder constants in `src/constants/author.ts` with clear labels like `YOUR_NAME`, `YOUR_GITHUB_URL`, etc. that the developer fills in. Or use Jim Vercoelen's details based on the project context (vecotech.io domain, info@vecotech.io email already referenced).

2. **Requirement completion status at Phase 4 time**
   - What we know: AUTH-01/02/03, COMP-01 through COMP-17, INFR-01/05, DASH-01/03 are complete. AUTH-04 is pending.
   - What's unclear: Whether to mark Phase 5/6 items as "pending" or omit them
   - Recommendation: Include ALL requirements in the checklist with accurate status. Show pending items -- this demonstrates the app is a work in progress and gives reviewers a roadmap. Update statuses as phases complete.

3. **Mini cover letter content**
   - What we know: Should explain what reviewers should look for
   - What's unclear: The exact tone and content
   - Recommendation: Brief, confident, technically specific. Focus on: what makes this submission unique (purpose-built showcase, not NDA extracts), the tech choices and why, and what to evaluate on each screen.

## Validation Architecture

### Test Framework

| Property | Value |
|----------|-------|
| Framework | Jest 29.7 + jest-expo 55.0.9 + @testing-library/react-native 13.3.3 |
| Config file | `apps/mobile/jest.config.js` |
| Quick run command | `cd apps/mobile && npx jest --testPathPattern="tests/(screens\|contexts)" --no-coverage` |
| Full suite command | `cd apps/mobile && npx jest` |

### Phase Requirements -> Test Map

| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| DASH-02 | Dashboard shows welcome greeting with user email | unit | `cd apps/mobile && npx jest tests/screens/dashboard.test.tsx -x` | No -- Wave 0 |
| ABUT-01 | About screen renders requirements checklist with correct categories | unit | `cd apps/mobile && npx jest tests/screens/about.test.tsx -x` | No -- Wave 0 |
| ABUT-02 | About screen renders author section | unit | `cd apps/mobile && npx jest tests/screens/about.test.tsx -x` | No -- Wave 0 |
| ABUT-03 | About screen renders tech stack items | unit | `cd apps/mobile && npx jest tests/screens/about.test.tsx -x` | No -- Wave 0 |
| ABUT-04 | About screen link buttons call Linking.openURL | unit | `cd apps/mobile && npx jest tests/screens/about.test.tsx -x` | No -- Wave 0 |
| DASH-01 | Dashboard renders 4 cards with correct titles | unit | `cd apps/mobile && npx jest tests/screens/dashboard.test.tsx -x` | No -- Wave 0 |
| DASH-03 | Header renders logo and profile icon | unit | `cd apps/mobile && npx jest tests/screens/dashboard.test.tsx -x` | No -- Wave 0 |

### Sampling Rate

- **Per task commit:** `cd apps/mobile && npx jest tests/screens/ --no-coverage`
- **Per wave merge:** `cd apps/mobile && npx jest`
- **Phase gate:** Full suite green before `/gsd:verify-work`

### Wave 0 Gaps

- [ ] `tests/screens/dashboard.test.tsx` -- covers DASH-01, DASH-02, DASH-03
- [ ] `tests/screens/about.test.tsx` -- covers ABUT-01, ABUT-02, ABUT-03, ABUT-04
- [ ] Mock for `react-native` Linking module (add to `tests/setup.ts`)
- [ ] Mock for `expo-router` useRouter/usePathname (for navigation assertions)
- [ ] Wrapper helper to render with AuthProvider + mock session (for DASH-02 greeting)

Note: `tests/setup.ts` already exists with mocks for reanimated, expo-linear-gradient, and vector-icons. The Supabase mock at `tests/__mocks__/supabase.ts` and `createMockSession` helper also already exist.

## Sources

### Primary (HIGH confidence)
- **Codebase inspection** -- Direct reading of all relevant source files:
  - `app/(dashboard)/index.tsx` -- existing dashboard with 4 cards (DASH-01 done)
  - `app/(dashboard)/_layout.tsx` -- existing header with logo + breadcrumb (DASH-03 done)
  - `app/(dashboard)/about.tsx` -- current placeholder
  - `app/(dashboard)/profile.tsx` -- working pattern for `useSession()` + email display
  - `src/contexts/auth.tsx` -- AuthProvider with Session type, useSession hook
  - `src/components/` -- full component library inventory
  - `src/constants/colors.ts` -- theme colors and gradients
  - `tailwind.config.js` -- custom theme extensions
  - `tests/` -- existing test infrastructure and patterns

### Secondary (MEDIUM confidence)
- **React Native Linking API** -- `Linking.openURL` from react-native works on web via react-native-web's window.open mapping. Well-documented, standard API.
- **Supabase Session type** -- `session.user.email` is a standard field in the Supabase JS client Session type.

### Tertiary (LOW confidence)
- None -- all findings verified from codebase inspection and established React Native/Supabase APIs.

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH -- no new dependencies, everything already installed and working
- Architecture: HIGH -- patterns directly observed in existing codebase (profile.tsx, dashboard layout)
- Pitfalls: HIGH -- identified from actual code patterns and types in the project
- Validation: HIGH -- test infrastructure already exists with established patterns

**Research date:** 2026-03-10
**Valid until:** 2026-04-10 (stable -- no external dependencies or fast-moving libraries involved)
