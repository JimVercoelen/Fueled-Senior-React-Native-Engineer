export type TechStackItem = {
  name: string;
  category: string;
  rationale: string;
};

export const TECH_STACK: TechStackItem[] = [
  {
    name: 'React Native (Expo SDK 55)',
    category: 'Framework',
    rationale: 'Cross-platform with web deployment. Reviewers click a URL, no build required',
  },
  {
    name: 'TypeScript',
    category: 'Language',
    rationale: 'Compile-time safety, self-documenting code, IDE tooling',
  },
  {
    name: 'NativeWind v4',
    category: 'Styling',
    rationale: 'Tailwind utility classes for React Native. Rapid, consistent styling',
  },
  {
    name: 'Expo Router v5',
    category: 'Navigation',
    rationale: 'File-based routing with type-safe navigation and deep linking',
  },
  {
    name: 'Supabase',
    category: 'Backend',
    rationale: 'Auth, database, and real-time in one hosted service. No backend to deploy',
  },
  {
    name: 'TanStack Query',
    category: 'State',
    rationale: 'Server state management with caching, pagination, and optimistic updates',
  },
  {
    name: 'React Hook Form + Yup',
    category: 'Forms',
    rationale: 'Performant form state with schema-based validation',
  },
  {
    name: 'Reanimated 4',
    category: 'Animation',
    rationale: 'Native-thread animations for 60fps interactions',
  },
  {
    name: 'Jest + RNTL',
    category: 'Testing',
    rationale: 'Standard React Native testing with component rendering and interaction',
  },
];
