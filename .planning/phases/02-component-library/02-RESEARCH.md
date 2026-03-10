# Phase 2: Component Library - Research

**Researched:** 2026-03-10
**Domain:** React Native UI Components, NativeWind, react-hook-form, Reanimated
**Confidence:** HIGH

## Summary

This phase builds a complete set of reusable, styled UI components for a dark-themed Expo web showcase app. The existing codebase (Expo SDK 55, NativeWind 4.2.2, Reanimated 4.2.1, TailwindCSS 3.4.x) is already configured with custom fonts (Orbitron + Inter), a dark theme, and a dashboard layout. The logbook reference project provides battle-tested patterns for nearly every component -- Button, Card, Typography, TextField, SelectField, MultiSelectField, Toggle, Modal, Alert, Skeleton, Menu, Divider -- all using the same stack (NativeWind + clsx + Reanimated + expo-linear-gradient + react-hook-form Controller pattern).

The main technical decisions center on: (1) installing `react-hook-form`, `clsx`, and `@hookform/resolvers` + `zod` for form validation, (2) adapting logbook's bottom-sheet Select/MultiSelect to web popover-style dropdowns per user decision, (3) building a popover/dropdown system using React Native `Modal` with absolute positioning (same pattern as logbook's Menu component), and (4) building the playground screen incrementally alongside each component group.

**Primary recommendation:** Port and evolve the logbook component patterns fresh (same visual DNA, improved code), use `clsx` for conditional class merging, `react-hook-form` Controller pattern for all form fields, and React Native `Modal` + absolute positioning for all popover/dropdown needs.

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions
- Flat components -- no shadows, use borders for definition
- Subtle white borders at 15-20% opacity (`border-white/15`, `border-white/20`)
- Dark-only app: black backgrounds (`bg-black`, `bg-[#0a0a0a]`), white/gray text hierarchy
- `bg-white/5` for hover/selected states, interactive surfaces
- Rounded corners: `rounded-2xl` (cards, modals), `rounded-xl` (inputs, buttons), `rounded-lg` (badges, tags)
- Gradient on primary contained buttons (blue->cyan: `#2563eb` -> `#06b6d4`)
- Danger gradient (red->orange: `#ef4444` -> `#f97316`) for destructive contained buttons
- Press animation: scale 0.95 (buttons), 0.98 (cards)
- Use logbook project as design base, same visual DNA but built fresh
- Port logbook's `colors.js` constants file as starting point
- Typography: Orbitron (semibold) for headings/button labels -- always UPPERCASE; Inter (regular/medium/semibold) for body text
- Text hierarchy: `text-white` (primary), `text-neutral-300` (body), `text-neutral-400` (caption), `text-white/50` (muted/disabled)
- Icons: MaterialIcons from `@expo/vector-icons` -- sizes 16/20/24px
- Playground: single scrollable page, all variants always visible, no collapse/expand or tabs for sections
- Playground sections: Core UI, Form Controls, Feedback, Layout
- Each component shows collapsible code snippet with example usage
- Form Controls section: individual fields in all states + working mini form demo with react-hook-form validation
- Table: bordered rows with `border-white/10`, header row `bg-white/5`
- Tabs: underline style with active blue indicator, inactive `text-white/50`
- Badge: semantic colors, subtle treatment -- transparent tinted bg + colored border + colored text
- Avatar: circular, primary gradient background, white initials, optional image, sizes sm/md/lg
- Dropdown/Menu: popover anchored to trigger, icon + label items, dark bg with border
- Select/MultiSelect: dropdown popover (not bottom sheet), web-conventional
- MultiSelect: checkboxes in popover with "Done" button, selected items as chips/tags
- Form field base: `bg-white/5 border-white/15 rounded-xl px-4 py-3`
- Component file structure: `src/components/ui/`, `forms/`, `feedback/`, `layout/` with barrel exports

### Claude's Discretion
- Accordion visual details (border style, animation, chevron behavior)
- Table placement in folder structure (ui/ or layout/)
- Exact spacing and padding refinements
- Loading/spinner animation details
- Code snippet display format in playground
- Any logbook pattern improvements discovered during implementation

### Deferred Ideas (OUT OF SCOPE)
- Login page background image -- user will supply, relevant for Phase 3
</user_constraints>

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| COMP-01 | Button with primary, secondary, outline, disabled variants | Logbook Button.tsx provides exact pattern -- LinearGradient for contained, Reanimated scale press, clsx conditionals |
| COMP-02 | Card with header, body, footer slots | Logbook Card.tsx provides base -- extend with header/body/footer slot pattern |
| COMP-03 | Typography (headings, body, caption, label) with consistent theming | Logbook Typography.tsx provides full variant system with NativeWind font classes |
| COMP-04 | Badge and Avatar components | Badge: semantic color map pattern from Alert.tsx; Avatar: LinearGradient circle with initials |
| COMP-05 | Table component | Custom build -- FlatList/ScrollView with bordered rows, header treatment |
| COMP-06 | List component | FlatList wrapper with consistent item styling and dividers |
| COMP-07 | Modal component (used by STAT-03 provider) | Logbook Modal.tsx + ModalContent.tsx provide exact pattern with header/body/footer |
| COMP-08 | Toast/Alert component (used by STAT-02 provider) | Logbook Alert.tsx provides exact pattern with bold/subtle tones and Reanimated enter/exit |
| COMP-09 | TextField with react-hook-form integration | Logbook TextField.tsx provides exact Controller+Field pattern |
| COMP-10 | Select dropdown with react-hook-form integration | Logbook SelectField.tsx base -- adapt from ModalBottomSheet to popover |
| COMP-11 | MultiSelect with chips/tags and react-hook-form | Logbook MultiSelectField.tsx base -- adapt to popover with chips display |
| COMP-12 | Toggle switch and Checkbox with react-hook-form | Logbook Toggle.tsx for switch; Checkbox from MultiSelectField checkbox pattern |
| COMP-13 | Dropdown/Menu (popover with action items) | Logbook Menu.tsx provides exact popover pattern with trigger measurement |
| COMP-14 | Tabs (tabbed content switching) | Build underline-style tabs (different from logbook's bottom tab CustomTabs) |
| COMP-15 | Accordion (collapsible sections) | Build from scratch -- Reanimated height animation + chevron rotation |
| COMP-16 | Skeleton loader component | Logbook Skeleton.tsx provides exact pattern with SkeletonLine and SkeletonCard |
| COMP-17 | MUI-style playground screen with all components | Replace existing placeholder at `app/(dashboard)/components.tsx` |
</phase_requirements>

## Standard Stack

### Core (already installed)
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| nativewind | 4.2.2 | Tailwind CSS for React Native | Already configured, className-based styling |
| tailwindcss | 3.4.19 | CSS utility framework | NativeWind 4.x requires TailwindCSS 3.x |
| react-native-reanimated | 4.2.1 | Animations (press, skeleton pulse, accordion, toggle) | Already installed, enables performant UI thread animations |
| expo-linear-gradient | 55.0.8 | Gradient backgrounds (buttons, avatar) | Already installed, needed for primary/danger gradient buttons |
| @expo/vector-icons | 15.0.2 | MaterialIcons throughout | Already installed |

### To Install
| Library | Version | Purpose | Why |
|---------|---------|---------|-----|
| react-hook-form | ^7.71.2 | Form state management | Industry standard for React/RN forms, Controller pattern for controlled inputs |
| clsx | ^2.1.1 | Conditional className merging | Lightweight, same as logbook, cleaner than template literals for complex conditionals |
| zod | ^3.25.0 | Schema validation | Type-safe validation schemas, works well with TypeScript |
| @hookform/resolvers | ^5.2.2 | zod/yup resolver for react-hook-form | Bridges validation libraries to react-hook-form |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| clsx | template literals | clsx is more readable for 5+ conditional classes; logbook already uses it |
| zod 3.x | zod 4.x | Zod v4 has known compatibility issues with @hookform/resolvers 5.x as of early 2026; stick with zod 3.25+ |
| zod | yup | Logbook uses yup, but zod is more TypeScript-native; either works -- zod is the modern choice |
| Custom popover | react-native-popover-view | Logbook's Menu.tsx already has a working Modal+absolute popover pattern; no extra dependency needed |

**Installation:**
```bash
cd apps/mobile && npm install react-hook-form clsx zod @hookform/resolvers
```

## Architecture Patterns

### Recommended Project Structure
```
apps/mobile/src/components/
  ui/
    Button.tsx
    Card.tsx
    Typography.tsx
    Badge.tsx
    Avatar.tsx
    Table.tsx          # Claude's discretion: ui/ chosen over layout/
    Divider.tsx
    index.ts           # barrel export
  forms/
    Field.tsx          # shared label + error wrapper
    TextField.tsx
    Select.tsx
    MultiSelect.tsx
    Toggle.tsx
    Checkbox.tsx
    index.ts
  feedback/
    Modal.tsx
    ModalContent.tsx
    Alert.tsx
    Skeleton.tsx
    index.ts
  layout/
    List.tsx
    Dropdown.tsx       # popover menu
    Tabs.tsx
    Accordion.tsx
    index.ts
  index.ts             # re-exports all subfolder barrels
```

### Pattern 1: Component with Variant Props + clsx
**What:** Every component accepts a `variant` prop and uses `clsx()` to compose NativeWind classes conditionally.
**When to use:** All components with visual variants (Button, Badge, Typography, Alert).
**Example:**
```typescript
// Pattern from logbook Button.tsx -- adapted
import clsx from 'clsx';

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'text';
  size?: 'sm' | 'md';
  disabled?: boolean;
  // ...
}

export default function Button({ variant = 'primary', size = 'md', disabled = false }: ButtonProps) {
  const classes = clsx(
    'rounded-xl items-center justify-center flex-row',
    size === 'sm' && 'px-3 py-1.5',
    size === 'md' && 'px-5 py-3',
    variant === 'outline' && 'border border-white/20 bg-transparent',
    variant === 'secondary' && 'bg-white/5 border border-white/15',
    disabled && 'opacity-40 cursor-not-allowed',
  );
  // ...
}
```

### Pattern 2: react-hook-form Controller + Field Wrapper
**What:** Form fields accept `control` and `name` props from react-hook-form, use `Controller` to manage state, and wrap input in a shared `Field` component that handles label/error/helper text display.
**When to use:** All form field components (TextField, Select, MultiSelect, Toggle, Checkbox).
**Example:**
```typescript
// Pattern from logbook TextField.tsx
import { Controller, Control, FieldPath, FieldValues } from 'react-hook-form';
import Field from './Field';

interface TextFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: FieldPath<T>;
  label?: string;
  helperText?: string;
  disabled?: boolean;
}

export default function TextField<T extends FieldValues>({
  control, name, label, helperText, disabled = false, ...props
}: TextFieldProps<T>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
        <Field label={label} helperText={helperText} error={error} disabled={disabled}>
          <TextInput
            className={clsx(
              'px-4 py-3 rounded-xl border bg-white/5 border-white/15 text-white',
              error && '!border-red-500',
              disabled && '!opacity-50 !pointer-events-none',
            )}
            value={String(value ?? '')}
            onChangeText={onChange}
            onBlur={onBlur}
            editable={!disabled}
            placeholderTextColor="rgb(156, 163, 175)"
            {...props}
          />
        </Field>
      )}
    />
  );
}
```

### Pattern 3: Popover via RN Modal + Absolute Positioning
**What:** For Select, MultiSelect, and Dropdown: open a transparent RN Modal, measure the trigger element position via ref, render the popover absolutely positioned below the trigger.
**When to use:** Select dropdown, MultiSelect dropdown, Dropdown/Menu component.
**Example:**
```typescript
// Pattern from logbook Menu.tsx -- adapted for popover dropdowns
import { Modal, Pressable, View, Dimensions } from 'react-native';

function Popover({ open, onClose, triggerRef, children }) {
  const [position, setPosition] = useState({ x: 0, y: 0, w: 0, h: 0 });

  useEffect(() => {
    if (!open || !triggerRef?.current) return;
    // Web: getBoundingClientRect(); Native: measureInWindow()
    const rect = (triggerRef.current as any).getBoundingClientRect();
    setPosition({ x: rect.left, y: rect.top, w: rect.width, h: rect.height });
  }, [open, triggerRef]);

  if (!open) return null;

  return (
    <Modal transparent visible animationType="fade" onRequestClose={onClose}>
      <Pressable className="flex-1" onPress={onClose} />
      <View
        style={{ position: 'absolute', top: position.y + position.h + 4, left: position.x, width: position.w }}
        className="rounded-xl bg-[#0a0a0a] border border-white/10 overflow-hidden"
      >
        {children}
      </View>
    </Modal>
  );
}
```

### Pattern 4: Reanimated Press Animation
**What:** Button scale-down on press (0.95), Card scale-down (0.98), using `useSharedValue` + `useAnimatedStyle` + `withTiming`.
**When to use:** All interactive pressable elements.
**Example:**
```typescript
// From logbook Button.tsx
const scale = useSharedValue(1);
const animatedStyle = useAnimatedStyle(() => ({
  transform: [{ scale: scale.value }],
}));
const handlePressIn = () => { scale.value = withTiming(0.95, { duration: 100 }); };
const handlePressOut = () => { scale.value = withTiming(1, { duration: 150 }); };
```

### Pattern 5: LinearGradient with Inline Style (NativeWind Workaround)
**What:** `expo-linear-gradient`'s `LinearGradient` component does not reliably support NativeWind `className` for padding/layout. Use inline `style` for padding on LinearGradient, NativeWind classes on wrapper views.
**When to use:** Gradient buttons (primary contained, danger contained), Avatar gradient background.
**Example:**
```typescript
// From logbook Button.tsx -- gradient padding via style, not className
<LinearGradient
  colors={['#2563eb', '#06b6d4']}
  start={{ x: 0, y: 0 }}
  end={{ x: 1, y: 0 }}
  style={{ paddingHorizontal: 20, paddingVertical: 12, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
>
  {buttonContent}
</LinearGradient>
```

### Anti-Patterns to Avoid
- **Using `style={{ fontFamily: 'FontName' }}` instead of NativeWind font classes:** The tailwind config defines `font-heading`, `font-body`, etc. Use className (`font-heading`) not inline style for fonts. However, verify the font family names in the tailwind config match the loaded font names exactly.
- **Using `TouchableOpacity` for new components:** Use `Pressable` throughout -- it is the modern RN primitive and works better with Reanimated press animations.
- **Bottom sheets for Select/MultiSelect:** User explicitly decided against bottom sheets -- use web-style popover dropdowns.
- **Adding shadows:** User locked "flat components, no shadows, use borders for definition."
- **Building a separate playground after components:** Playground must be built incrementally alongside each component group.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Form state management | Custom useState for each field | react-hook-form Controller | Handles validation, dirty tracking, error state, touched state |
| Conditional className merging | Template literal concatenation | clsx | Handles undefined, false, null gracefully; readable for 5+ conditions |
| Press animations | Manual Animated.timing | Reanimated useSharedValue + withTiming | Runs on UI thread, no bridge overhead |
| Skeleton pulse animation | CSS keyframes or setInterval opacity | Reanimated withRepeat + withSequence | Smooth pulse, cancellable, works on native and web |
| Gradient rendering | CSS background-image or custom SVG | expo-linear-gradient LinearGradient | Cross-platform, already installed |
| Schema validation | Manual if/else validation | zod schemas + zodResolver | Type inference, composable, reusable schemas |

**Key insight:** The logbook reference project has already solved all the core component patterns. The work is to port them fresh with the new folder structure, adapt Select/MultiSelect from bottom-sheets to popovers, and add components the logbook doesn't have (Table, List, Tabs, Accordion, Badge, Avatar, Checkbox).

## Common Pitfalls

### Pitfall 1: NativeWind className on LinearGradient
**What goes wrong:** NativeWind classes for padding/margin do not reliably apply to `LinearGradient` from expo-linear-gradient on iOS/Android.
**Why it happens:** LinearGradient is not a standard View; NativeWind's JSX transform may not fully map className to the gradient's style prop.
**How to avoid:** Always use inline `style` prop for LinearGradient padding/layout. Wrap in a View if you need NativeWind classes for sizing.
**Warning signs:** Padding appears on web but not on native, or gradient fills the wrong area.

### Pitfall 2: Font Family Name Mismatch
**What goes wrong:** `font-heading` class produces no visible font change.
**Why it happens:** The tailwind config defines `fontFamily: { heading: ['Orbitron_600SemiBold'] }` but the actual loaded font name from `@expo-google-fonts/orbitron` exports `Orbitron_600SemiBold`. NativeWind needs the loaded font name to exactly match.
**How to avoid:** Verify the tailwind.config.js fontFamily values match the exact export names from the expo-google-fonts packages. The current config already maps correctly: `heading: ['Orbitron_600SemiBold']`, `body: ['Inter_400Regular']`, etc.
**Warning signs:** Font rendering falls back to system font.

### Pitfall 3: RN Modal z-index with Expo Router Stacks
**What goes wrong:** React Native Modal may not appear above Expo Router Stack screens in some configurations.
**Why it happens:** Known issue (expo/expo#32991) where Modal rendering can conflict with Stack navigation on certain Expo versions.
**How to avoid:** Test Modal rendering early. If issues arise, ensure Modal is rendered at the highest component tree level or use `presentationStyle="overFullScreen"` on iOS.
**Warning signs:** Modal backdrop appears but content is invisible, or Modal appears behind the header.

### Pitfall 4: Popover Positioning on Scroll
**What goes wrong:** Popover (Select/MultiSelect/Dropdown) appears in wrong position after user scrolls.
**Why it happens:** `getBoundingClientRect()` / `measureInWindow()` gives position relative to viewport, but if measured before scroll settles, position is stale.
**How to avoid:** Measure position at the moment of opening (in the onPress handler), not on mount. The logbook Menu.tsx already does this correctly in the useEffect with `[open]` dependency.
**Warning signs:** Dropdown appears offset from its trigger after scrolling the playground.

### Pitfall 5: Zod v4 Incompatibility with @hookform/resolvers
**What goes wrong:** Form submissions fail silently or throw type errors.
**Why it happens:** Zod v4.x has known compatibility issues with @hookform/resolvers as of early 2026.
**How to avoid:** Use `zod@^3.25.0` (v3 line), not v4. This is stable and well-tested with `@hookform/resolvers@^5.2.2`.
**Warning signs:** "Invalid element at key: expected a Zod schema" error at runtime.

### Pitfall 6: Relative Imports Without Path Aliases
**What goes wrong:** Deep relative imports become unwieldy (e.g., `../../../../components/ui/Button`).
**Why it happens:** The current project does NOT have `@/` path alias configured (unlike the logbook which uses `@/src/`). The tsconfig.json has no `paths` configuration.
**How to avoid:** Components importing other components within `src/components/` use short relative paths (e.g., `../ui/Button`). Screen files in `app/` import from `../../src/components`. Consider barrel exports to reduce path depth. Do NOT configure path aliases mid-phase -- stick with the established project convention.
**Warning signs:** TypeScript cannot resolve module errors.

### Pitfall 7: `!important` Prefix in NativeWind
**What goes wrong:** The `!` prefix (e.g., `!border-red-500`) may not work as expected in NativeWind 4.x.
**Why it happens:** NativeWind's important handling differs from web Tailwind. The logbook uses `!` prefix but this is NativeWind 4.2.1 on Expo 54; behavior may differ on Expo 55.
**How to avoid:** Test `!` prefix usage early. If it fails, use conditional classes with clsx instead of importance override (e.g., `error ? 'border-red-500' : 'border-white/15'`).
**Warning signs:** Error border color not overriding default border color.

## Code Examples

### Barrel Export Pattern
```typescript
// src/components/ui/index.ts
export { default as Button } from './Button';
export { default as Card } from './Card';
export { default as Typography } from './Typography';
export { default as Badge } from './Badge';
export { default as Avatar } from './Avatar';
export { default as Table } from './Table';
export { default as Divider } from './Divider';

// src/components/index.ts
export * from './ui';
export * from './forms';
export * from './feedback';
export * from './layout';
```

### Badge Component Pattern
```typescript
// Semantic color mapping -- subtle treatment per user decision
const BADGE_COLORS = {
  success: { bg: 'bg-green-500/10', border: 'border-green-500/30', text: 'text-green-400' },
  info:    { bg: 'bg-blue-500/10',  border: 'border-blue-500/30',  text: 'text-blue-400' },
  warning: { bg: 'bg-yellow-500/10', border: 'border-yellow-500/30', text: 'text-yellow-400' },
  error:   { bg: 'bg-red-500/10',   border: 'border-red-500/30',   text: 'text-red-400' },
} as const;

interface BadgeProps {
  label: string;
  type?: keyof typeof BADGE_COLORS;
  className?: string;
}

export default function Badge({ label, type = 'info', className }: BadgeProps) {
  const colors = BADGE_COLORS[type];
  return (
    <View className={clsx('px-3 py-1 rounded-lg border', colors.bg, colors.border, className)}>
      <Text className={clsx('text-xs font-body-semibold uppercase', colors.text)}>{label}</Text>
    </View>
  );
}
```

### Avatar with LinearGradient
```typescript
const SIZES = { sm: 32, md: 40, lg: 56 } as const;
const TEXT_SIZES = { sm: 'text-xs', md: 'text-sm', lg: 'text-lg' } as const;

interface AvatarProps {
  name?: string;
  imageUri?: string;
  size?: keyof typeof SIZES;
}

export default function Avatar({ name, imageUri, size = 'md' }: AvatarProps) {
  const dim = SIZES[size];
  const initials = name?.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() ?? '?';

  if (imageUri) {
    return (
      <Image
        source={{ uri: imageUri }}
        style={{ width: dim, height: dim, borderRadius: dim / 2 }}
      />
    );
  }

  return (
    <LinearGradient
      colors={['#2563eb', '#06b6d4']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{ width: dim, height: dim, borderRadius: dim / 2, alignItems: 'center', justifyContent: 'center' }}
    >
      <Text className={clsx('text-white font-heading', TEXT_SIZES[size])}>{initials}</Text>
    </LinearGradient>
  );
}
```

### Accordion with Reanimated
```typescript
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';

function AccordionItem({ title, children, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);
  const height = useSharedValue(defaultOpen ? 1 : 0);
  const rotation = useSharedValue(defaultOpen ? 180 : 0);

  const toggle = () => {
    setOpen(!open);
    height.value = withTiming(open ? 0 : 1, { duration: 250 });
    rotation.value = withTiming(open ? 0 : 180, { duration: 250 });
  };

  const bodyStyle = useAnimatedStyle(() => ({
    maxHeight: height.value * 500, // max content height
    opacity: height.value,
    overflow: 'hidden',
  }));

  const chevronStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }],
  }));

  return (
    <View className="border border-white/15 rounded-2xl overflow-hidden">
      <Pressable onPress={toggle} className="flex-row items-center justify-between px-4 py-3">
        <Typography variant="body" className="text-white">{title}</Typography>
        <Animated.View style={chevronStyle}>
          <MaterialIcons name="expand-more" size={20} color="white" />
        </Animated.View>
      </Pressable>
      <Animated.View style={bodyStyle}>
        <View className="px-4 pb-3">{children}</View>
      </Animated.View>
    </View>
  );
}
```

### Tabs (Underline Style)
```typescript
interface Tab { key: string; label: string; }

interface TabsProps {
  tabs: Tab[];
  activeTab: string;
  onTabChange: (key: string) => void;
}

export default function Tabs({ tabs, activeTab, onTabChange }: TabsProps) {
  return (
    <View className="flex-row border-b border-white/10">
      {tabs.map(tab => {
        const isActive = tab.key === activeTab;
        return (
          <Pressable
            key={tab.key}
            onPress={() => onTabChange(tab.key)}
            className={clsx('px-4 py-3', isActive && 'border-b-2 border-primary')}
          >
            <Typography
              variant="body"
              className={clsx(isActive ? 'text-white' : 'text-white/50')}
            >
              {tab.label}
            </Typography>
          </Pressable>
        );
      })}
    </View>
  );
}
```

### Playground Mini Form Demo
```typescript
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const demoSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  role: z.string().min(1, 'Please select a role'),
  skills: z.array(z.string()).min(1, 'Select at least one skill'),
  notifications: z.boolean(),
  terms: z.boolean().refine(v => v === true, 'You must accept the terms'),
});

type DemoForm = z.infer<typeof demoSchema>;

function MiniFormDemo() {
  const { control, handleSubmit } = useForm<DemoForm>({
    resolver: zodResolver(demoSchema),
    defaultValues: { name: '', email: '', role: '', skills: [], notifications: false, terms: false },
  });

  const onSubmit = (data: DemoForm) => {
    // Show success alert/toast
  };

  return (
    <View>
      <TextField control={control} name="name" label="Name" placeholder="John Doe" />
      <TextField control={control} name="email" label="Email" placeholder="john@example.com" />
      <Select control={control} name="role" label="Role" options={ROLE_OPTIONS} />
      <MultiSelect control={control} name="skills" label="Skills" options={SKILL_OPTIONS} />
      <Toggle control={control} name="notifications" label="Email Notifications" />
      <Checkbox control={control} name="terms" label="I accept the terms" />
      <Button variant="primary" label="Submit" onPress={handleSubmit(onSubmit)} />
    </View>
  );
}
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| `styled()` wrapper (NativeWind v2) | `className` prop directly (NativeWind v4) | NativeWind v4, 2024 | No wrappers needed, JSX transform handles it |
| TouchableOpacity | Pressable | React Native 0.64+ | Better customization, works with Reanimated |
| Animated API (RN core) | react-native-reanimated 4.x | Ongoing | UI thread animations, worklets |
| yup | zod | 2023-2024 trend | Better TypeScript inference, smaller bundle |
| Bottom sheet for Select (mobile-first) | Popover dropdown (web-first) | User decision | Web-first showcase targets laptop reviewers |

**Deprecated/outdated:**
- NativeWind `styled()` wrapper: Gone in v4, use className directly
- `Animated` from react-native core: Still works but Reanimated is standard for new code
- `TouchableOpacity`: Still works but `Pressable` is preferred

## Open Questions

1. **Path alias (`@/`) configuration**
   - What we know: Current project uses relative imports. Logbook uses `@/src/` alias.
   - What's unclear: Whether adding path alias mid-project would break existing code or build.
   - Recommendation: Do NOT add path alias in this phase. Use relative imports consistently. Barrel exports reduce import path depth.

2. **NativeWind `!important` prefix reliability**
   - What we know: Logbook uses `!border-red-500` etc. in NativeWind 4.2.1 on Expo 54.
   - What's unclear: Whether this works identically on NativeWind 4.2.2 / Expo 55.
   - Recommendation: Test early. If unreliable, use conditional clsx pattern instead.

3. **RN Modal + Expo Router Stack compatibility on Expo 55**
   - What we know: There is an open issue (expo/expo#32991) about Modal not appearing with Expo Router Stack.
   - What's unclear: Whether this affects Expo SDK 55 specifically.
   - Recommendation: Test Modal early (it is used by Select, MultiSelect, Dropdown, and Modal components). If broken, fallback to absolute-positioned View with high zIndex instead of RN Modal.

## Validation Architecture

### Test Framework
| Property | Value |
|----------|-------|
| Framework | None currently installed |
| Config file | none -- see Wave 0 |
| Quick run command | `cd apps/mobile && npx jest --passWithNoTests` |
| Full suite command | `cd apps/mobile && npx jest` |

### Phase Requirements -> Test Map
| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| COMP-01 | Button renders all variants (primary, secondary, outline, disabled) | unit | `npx jest tests/components/ui/Button.test.tsx -x` | No -- Wave 0 |
| COMP-02 | Card renders with header/body/footer slots | unit | `npx jest tests/components/ui/Card.test.tsx -x` | No -- Wave 0 |
| COMP-03 | Typography renders all variants with correct styles | unit | `npx jest tests/components/ui/Typography.test.tsx -x` | No -- Wave 0 |
| COMP-04 | Badge renders all semantic types; Avatar renders initials and image | unit | `npx jest tests/components/ui/Badge.test.tsx -x` | No -- Wave 0 |
| COMP-09 | TextField integrates with react-hook-form, shows error state | unit | `npx jest tests/components/forms/TextField.test.tsx -x` | No -- Wave 0 |
| COMP-12 | Toggle and Checkbox respond to value changes | unit | `npx jest tests/components/forms/Toggle.test.tsx -x` | No -- Wave 0 |
| COMP-17 | Playground screen renders without crash | smoke | `npx jest tests/screens/components.test.tsx -x` | No -- Wave 0 |

### Sampling Rate
- **Per task commit:** `cd apps/mobile && npx jest --passWithNoTests`
- **Per wave merge:** `cd apps/mobile && npx jest`
- **Phase gate:** Full suite green before `/gsd:verify-work`

### Wave 0 Gaps
- [ ] Install jest + jest-expo + @testing-library/react-native as devDependencies
- [ ] Create `apps/mobile/jest.config.js` with jest-expo preset
- [ ] Create `apps/mobile/tests/` directory structure matching `src/components/`
- [ ] Shared test utilities in `apps/mobile/tests/setup.ts`

## Sources

### Primary (HIGH confidence)
- Logbook reference project at `/Users/jimvercoelen/Development/veco.tech/logbook/apps/mobile/src/components/` -- all component patterns verified by reading source files directly
- Current project source code -- package.json, tailwind.config.js, app files, tsconfig.json read directly
- [react-hook-form official docs](https://react-hook-form.com/docs/usecontroller/controller) -- Controller API, useForm
- [react-hook-form npm](https://www.npmjs.com/package/react-hook-form) -- version 7.71.2 confirmed

### Secondary (MEDIUM confidence)
- [NativeWind official docs](https://www.nativewind.dev/) -- className patterns, font-family support
- [NativeWind GitHub issue #877](https://github.com/nativewind/nativewind/issues/877) -- LinearGradient className workaround
- [Expo docs - LinearGradient](https://docs.expo.dev/versions/latest/sdk/linear-gradient/) -- API reference
- [Zod v4 compatibility issue](https://github.com/colinhacks/zod/issues/4989) -- confirmed incompatibility with hookform resolvers

### Tertiary (LOW confidence)
- [Expo issue #32991](https://github.com/expo/expo/issues/32991) -- Modal + Stack rendering issue; unclear if affects SDK 55 specifically
- [NativeWind issue #1637](https://github.com/nativewind/nativewind/issues/1637) -- NW v5 Modal breaks; v4 not directly affected but worth monitoring

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH -- exact same stack as logbook reference, all libraries installed or well-known
- Architecture: HIGH -- logbook provides production-tested patterns for 12 of 17 components
- Pitfalls: HIGH -- documented from logbook source code comments and known GitHub issues
- Popover approach: MEDIUM -- logbook Menu pattern works but adapting it for Select/MultiSelect is new
- Test infrastructure: LOW -- no test setup exists yet, Wave 0 needed

**Research date:** 2026-03-10
**Valid until:** 2026-04-10 (stable stack, 30-day validity)
