# Phase 2: Component Library - Context

**Gathered:** 2026-03-10
**Status:** Ready for planning

<domain>
## Phase Boundary

Build all reusable UI components (COMP-01 through COMP-17), with react-hook-form integration for form controls, and an interactive playground screen at `app/(dashboard)/components` built incrementally alongside components. This phase does NOT include wiring components to real data, auth flows, or screen-level features.

</domain>

<decisions>
## Implementation Decisions

### Visual design language
- Flat components — no shadows, use borders for definition
- Subtle white borders at 15-20% opacity (`border-white/15`, `border-white/20`)
- Dark-only app: black backgrounds (`bg-black`, `bg-[#0a0a0a]`), white/gray text hierarchy
- `bg-white/5` for hover/selected states, interactive surfaces
- Rounded corners: `rounded-2xl` (cards, modals), `rounded-xl` (inputs, buttons), `rounded-lg` (badges, tags)
- Gradient on primary contained buttons (blue→cyan: `#2563eb` → `#06b6d4`)
- Danger gradient (red→orange: `#ef4444` → `#f97316`) for destructive contained buttons
- Press animation: scale 0.95 (buttons), 0.98 (cards)

### Reference project approach
- Use logbook project (`/Users/jimvercoelen/Development/veco.tech/logbook`) as design base
- Same visual DNA but built fresh — evolve and improve organically during implementation
- Port logbook's `colors.js` constants file as starting point
- Claude has discretion to refine and improve patterns where it makes sense

### Typography
- Orbitron (semibold) for headings, button labels — always UPPERCASE
- Inter (regular/medium/semibold) for body text, labels, captions
- Text hierarchy: `text-white` (primary), `text-neutral-300` (body), `text-neutral-400` (caption), `text-white/50` (muted/disabled)

### Icons
- MaterialIcons from `@expo/vector-icons` (same as logbook)
- Sizes: 16px (small), 20px (medium), 24px (large)

### Playground screen
- Single scrollable page with section headings (Core UI, Form Controls, Feedback, Layout)
- All component variants always visible — no collapse/expand, no tabs
- Each component shows all its variants rendered (e.g., Button: primary, secondary, outline, disabled all shown at once)
- Each component includes a small collapsible code snippet showing example usage
- Form Controls section: individual fields in all states (default, focused, error, disabled) PLUS a working mini form demo at the end showing react-hook-form validation in action

### Table component
- Bordered rows — each row separated by `border-white/10` lines
- Header row with slightly different treatment (`bg-white/5` or bolder text)

### Tabs component
- Underline style — text labels with active underline indicator in primary blue
- Inactive tabs in `text-white/50`
- Will be reused in Data Fetching and State Management screens (Phases 4-5)

### Badge component
- Semantic colors by type/severity (green/success, blue/info, yellow/warning, red/error)
- Subtle treatment: transparent tinted bg (e.g., `bg-green-500/10`) + colored border (`border-green-500/30`) + colored text (`text-green-400`)
- No solid background fills — dark theme makes subtle approach work

### Avatar component
- Circular (`rounded-full`) with primary gradient background (blue→cyan)
- White initials on gradient
- Optional image support
- Sizes: sm, md, lg

### Accordion component
- Claude's discretion — whatever is easiest and cleanest
- Should fit the flat + bordered design language

### Dropdown/Menu (COMP-13)
- Popover anchored to trigger element
- Icon + label items (e.g., Edit, Delete)
- Dark bg with border, same styling as logbook's menu popover

### Select (COMP-10) and MultiSelect (COMP-11)
- Dropdown popover that opens below the field (web-conventional, not bottom sheet)
- Select: scrollable list of options in popover
- MultiSelect: checkboxes in popover with "Done" button, selected items show as chips/tags in the field
- All popovers on web — more natural for Vercel-deployed showcase where reviewers use laptops

### Form field styling (from logbook base)
- Base: `bg-white/5 border-white/15 rounded-xl px-4 py-3`
- Focus: `border-primary`
- Error: `border-red-500` + red error text replacing helper text
- Disabled: `opacity-50 pointer-events-none`
- Placeholder: gray-400

### Component file structure
- Grouped subfolders in `src/components/`:
  - `ui/` — Button, Card, Typography, Badge, Avatar, Divider
  - `forms/` — TextField, Select, MultiSelect, Toggle, Checkbox, Radio
  - `feedback/` — Modal, Toast, Alert, Skeleton
  - `layout/` — List, Dropdown, Tabs, Accordion
- Barrel exports (index.ts) per subfolder for clean imports
- Table component in `ui/` or `layout/` — Claude's discretion

### Claude's Discretion
- Accordion visual details (border style, animation, chevron behavior)
- Table placement in folder structure (ui/ or layout/)
- Exact spacing and padding refinements
- Loading/spinner animation details
- Code snippet display format in playground
- Any logbook pattern improvements discovered during implementation

</decisions>

<specifics>
## Specific Ideas

- "Flat components, no shade or anything, just use borders"
- Gradient over primary contained button would be fancy
- Logbook's menu popover (three-dot → Edit/Delete popup) is the pattern to follow for Dropdown/Menu
- Logbook's Select/MultiSelect use bottom sheets — but for this web-first showcase, popovers are preferred
- Mini form demo at end of Form Controls section combining all form fields with react-hook-form validation
- User has a login background image to supply (separate from component library, noted for Phase 3)

</specifics>

<code_context>
## Existing Code Insights

### Reusable Assets
- Dashboard layout with custom header + breadcrumb navigation exists (`app/(dashboard)/_layout.tsx`)
- Placeholder components screen exists at `app/(dashboard)/components.tsx` — ready to be replaced
- Auth context exists in `src/contexts/`
- Supabase client exists in `src/lib/`
- Tailwind config already has primary, accent, danger colors + font families defined

### Established Patterns
- NativeWind 4.x with `darkMode: 'class'` — all styling via Tailwind utility classes
- Custom font loading: Orbitron (semibold) + Inter (regular, medium, semibold) via expo-font
- Expo Router file-based routing with groups: `(auth)` and `(dashboard)`
- Stack navigation with `headerShown: false` + custom header component

### Integration Points
- Components screen: `app/(dashboard)/components.tsx` — playground goes here
- `src/components/` directory needs to be created (currently empty)
- Toast/Modal context providers will go in `src/contexts/` (Phase 5 wires them up)
- react-hook-form needs to be installed (not yet in package.json)

### Reference Project
- Logbook at `/Users/jimvercoelen/Development/veco.tech/logbook` — established design patterns to port/evolve
- Key reference files: Button, Card, Typography, TextField, Select, MultiSelect, Toggle, Modal, Alert, Skeleton, colors.js

</code_context>

<deferred>
## Deferred Ideas

- Login page background image — user will supply, relevant for Phase 3 (Authentication)

</deferred>

---

*Phase: 02-component-library*
*Context gathered: 2026-03-10*
