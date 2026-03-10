// Update statuses as phases complete

export type RequirementStatus = 'complete' | 'in-progress' | 'pending';

export type Requirement = {
  id: string;
  title: string;
  screen: string;
  status: RequirementStatus;
};

export type RequirementGroup = {
  category: string;
  icon: string; // MaterialIcons name
  requirements: Requirement[];
};

export const REQUIREMENTS: RequirementGroup[] = [
  {
    category: 'Authentication',
    icon: 'lock',
    requirements: [
      { id: 'AUTH-01', title: 'Magic link login', screen: 'Login Screen', status: 'complete' },
      { id: 'AUTH-02', title: 'Session persistence', screen: 'Login Screen', status: 'complete' },
      {
        id: 'AUTH-03',
        title: 'Sign out from any screen',
        screen: 'Profile Screen',
        status: 'complete',
      },
      {
        id: 'AUTH-04',
        title: 'Protected route redirect',
        screen: 'Root Layout',
        status: 'complete',
      },
    ],
  },
  {
    category: 'Dashboard',
    icon: 'dashboard',
    requirements: [
      {
        id: 'DASH-01',
        title: 'Rich demo cards with navigation',
        screen: 'Dashboard',
        status: 'complete',
      },
      {
        id: 'DASH-02',
        title: 'Welcome greeting with user email',
        screen: 'Dashboard',
        status: 'complete',
      },
      {
        id: 'DASH-03',
        title: 'Persistent app header',
        screen: 'Dashboard Header',
        status: 'complete',
      },
    ],
  },
  {
    category: 'Component Library',
    icon: 'widgets',
    requirements: [
      { id: 'COMP-01', title: 'Button variants', screen: 'Components Screen', status: 'complete' },
      {
        id: 'COMP-02',
        title: 'Card with header/body/footer',
        screen: 'Components Screen',
        status: 'complete',
      },
      {
        id: 'COMP-03',
        title: 'Typography system',
        screen: 'Components Screen',
        status: 'complete',
      },
      { id: 'COMP-04', title: 'Badge and Avatar', screen: 'Components Screen', status: 'complete' },
      { id: 'COMP-05', title: 'Table component', screen: 'Components Screen', status: 'complete' },
      { id: 'COMP-06', title: 'List component', screen: 'Components Screen', status: 'complete' },
      { id: 'COMP-07', title: 'Modal component', screen: 'Components Screen', status: 'complete' },
      {
        id: 'COMP-08',
        title: 'Toast/Alert component',
        screen: 'Components Screen',
        status: 'complete',
      },
      {
        id: 'COMP-09',
        title: 'TextField with react-hook-form',
        screen: 'Components Screen',
        status: 'complete',
      },
      { id: 'COMP-10', title: 'Select dropdown', screen: 'Components Screen', status: 'complete' },
      {
        id: 'COMP-11',
        title: 'MultiSelect with chips',
        screen: 'Components Screen',
        status: 'complete',
      },
      {
        id: 'COMP-12',
        title: 'Toggle and Checkbox',
        screen: 'Components Screen',
        status: 'complete',
      },
      { id: 'COMP-13', title: 'Dropdown menu', screen: 'Components Screen', status: 'complete' },
      { id: 'COMP-14', title: 'Tabs', screen: 'Components Screen', status: 'complete' },
      { id: 'COMP-15', title: 'Accordion', screen: 'Components Screen', status: 'complete' },
      { id: 'COMP-16', title: 'Skeleton loader', screen: 'Components Screen', status: 'complete' },
      {
        id: 'COMP-17',
        title: 'Live playground screen',
        screen: 'Components Screen',
        status: 'complete',
      },
    ],
  },
  {
    category: 'Data Fetching',
    icon: 'cloud-download',
    requirements: [
      {
        id: 'DATA-01',
        title: 'Paginated list with infinite scroll',
        screen: 'Data Fetching Screen',
        status: 'complete',
      },
      {
        id: 'DATA-02',
        title: 'Search with debounced queries',
        screen: 'Data Fetching Screen',
        status: 'complete',
      },
      {
        id: 'DATA-03',
        title: 'CRUD mutations with optimistic updates',
        screen: 'Data Fetching Screen',
        status: 'complete',
      },
      {
        id: 'DATA-04',
        title: 'Loading states and error boundaries',
        screen: 'Data Fetching Screen',
        status: 'complete',
      },
    ],
  },
  {
    category: 'State Management',
    icon: 'settings',
    requirements: [
      {
        id: 'STAT-01',
        title: 'TanStack Query cache viewer',
        screen: 'State Management Screen',
        status: 'complete',
      },
      {
        id: 'STAT-02',
        title: 'Toast system via Context API',
        screen: 'State Management Screen',
        status: 'complete',
      },
      {
        id: 'STAT-03',
        title: 'Modal system via Context API',
        screen: 'State Management Screen',
        status: 'complete',
      },
    ],
  },
  {
    category: 'About',
    icon: 'info',
    requirements: [
      {
        id: 'ABUT-01',
        title: 'Requirements checklist',
        screen: 'About Screen',
        status: 'complete',
      },
      {
        id: 'ABUT-02',
        title: 'Author section with cover letter',
        screen: 'About Screen',
        status: 'complete',
      },
      {
        id: 'ABUT-03',
        title: 'Tech stack with rationale',
        screen: 'About Screen',
        status: 'complete',
      },
      { id: 'ABUT-04', title: 'External links', screen: 'About Screen', status: 'complete' },
    ],
  },
  {
    category: 'Infrastructure',
    icon: 'build',
    requirements: [
      { id: 'INFR-01', title: 'Supabase cloud project', screen: 'Supabase', status: 'complete' },
      { id: 'INFR-02', title: 'Expo web deploy on Vercel', screen: 'Vercel', status: 'pending' },
      { id: 'INFR-03', title: 'GitHub Actions CI/CD', screen: 'GitHub Actions', status: 'pending' },
      {
        id: 'INFR-04',
        title: 'Documentation (3 READMEs)',
        screen: 'Repository',
        status: 'pending',
      },
      { id: 'INFR-05', title: 'Proper .gitignore', screen: '.gitignore', status: 'complete' },
      { id: 'INFR-06', title: 'Resend custom email domain', screen: 'Resend', status: 'pending' },
    ],
  },
  {
    category: 'Testing',
    icon: 'science',
    requirements: [
      {
        id: 'TEST-01',
        title: 'Unit tests for UI components',
        screen: 'Test Suite',
        status: 'pending',
      },
      { id: 'TEST-02', title: 'Tests for custom hooks', screen: 'Test Suite', status: 'pending' },
      { id: 'TEST-03', title: 'Test fixtures and mocks', screen: 'Test Suite', status: 'pending' },
    ],
  },
];
