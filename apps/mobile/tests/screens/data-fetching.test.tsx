import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';

import DataFetchingScreen from '../../app/(dashboard)/data-fetching';

// Mock hooks and contexts before importing the component
const mockUseItems = jest.fn();
const mockUseCreateItem = jest.fn();
const mockUseUpdateItem = jest.fn();
const mockUseDeleteItem = jest.fn();

jest.mock('@/hooks/use-items', () => ({
  useItems: (...args: any[]) => mockUseItems(...args),
  useCreateItem: () => mockUseCreateItem(),
  useUpdateItem: () => mockUseUpdateItem(),
  useDeleteItem: () => mockUseDeleteItem(),
}));

jest.mock('@/hooks/use-debounced-value', () => ({
  useDebouncedValue: (value: any) => value,
}));

const mockShowToast = jest.fn();
const mockHideToast = jest.fn();
jest.mock('@/contexts/toast', () => ({
  useToast: () => ({
    toast: null,
    showToast: mockShowToast,
    hideToast: mockHideToast,
  }),
}));

const mockShowModal = jest.fn();
const mockHideModal = jest.fn();
jest.mock('@/contexts/modal', () => ({
  useModal: () => ({
    showModal: mockShowModal,
    hideModal: mockHideModal,
  }),
}));

// Mock react-hook-form
jest.mock('react-hook-form', () => {
  const actual = jest.requireActual('react-hook-form');
  return actual;
});

jest.mock('@hookform/resolvers/yup', () => ({
  yupResolver: (schema: any) => {
    return (values: any) => ({ values, errors: {} });
  },
}));

const mockItems = [
  {
    id: '1',
    user_id: 'u1',
    title: 'Build login page',
    description: 'Create the authentication flow',
    category: 'frontend',
    priority: 'high',
    status: 'active',
    created_at: '2026-01-01T00:00:00Z',
    updated_at: '2026-01-01T00:00:00Z',
  },
  {
    id: '2',
    user_id: 'u1',
    title: 'Setup CI pipeline',
    description: null,
    category: 'devops',
    priority: 'medium',
    status: 'completed',
    created_at: '2026-01-02T00:00:00Z',
    updated_at: '2026-01-02T00:00:00Z',
  },
];

const defaultMutationReturn = {
  mutate: jest.fn(),
  isPending: false,
  isSuccess: false,
  isError: false,
  isIdle: true,
};

function setupMocks(overrides?: {
  isPending?: boolean;
  isError?: boolean;
  items?: typeof mockItems;
}) {
  const { isPending = false, isError = false, items = mockItems } = overrides ?? {};

  mockUseItems.mockReturnValue({
    data: isPending
      ? undefined
      : {
          items,
          totalCount: items.length,
          totalPages: 1,
          currentPage: 1,
        },
    isPending,
    isError,
    error: isError ? new Error('Test error') : null,
  });

  mockUseCreateItem.mockReturnValue(defaultMutationReturn);
  mockUseUpdateItem.mockReturnValue(defaultMutationReturn);
  mockUseDeleteItem.mockReturnValue(defaultMutationReturn);
}

describe('DataFetchingScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    setupMocks();
  });

  it('renders loading skeletons when isPending', () => {
    setupMocks({ isPending: true });
    const { getByTestId, queryAllByTestId } = render(<DataFetchingScreen />);
    expect(getByTestId('loading-skeletons')).toBeTruthy();
    expect(queryAllByTestId('task-item')).toHaveLength(0);
  });

  it('renders task items when data is loaded', () => {
    const { getAllByTestId, queryByTestId } = render(<DataFetchingScreen />);
    expect(getAllByTestId('task-item')).toHaveLength(2);
    expect(queryByTestId('loading-skeletons')).toBeNull();
  });

  it('renders search input', () => {
    const { getByTestId } = render(<DataFetchingScreen />);
    expect(getByTestId('search-input')).toBeTruthy();
  });

  it('renders filter controls', () => {
    const { getByTestId } = render(<DataFetchingScreen />);
    expect(getByTestId('filter-row')).toBeTruthy();
  });

  it('renders pagination controls', () => {
    const { getByTestId } = render(<DataFetchingScreen />);
    expect(getByTestId('pagination')).toBeTruthy();
  });

  it('renders Add Task button', () => {
    const { getByText } = render(<DataFetchingScreen />);
    expect(getByText('Add Task')).toBeTruthy();
  });

  it('shows empty state when no items', () => {
    setupMocks({ items: [] });
    const { getByTestId } = render(<DataFetchingScreen />);
    expect(getByTestId('empty-state')).toBeTruthy();
  });

  it('shows error toast when isError', () => {
    setupMocks({ isError: true });
    render(<DataFetchingScreen />);
    expect(mockShowToast).toHaveBeenCalledWith({
      type: 'error',
      message: 'Oops! Something went wrong. Please try again.',
    });
  });

  it('renders task title and badges', () => {
    const { getByText } = render(<DataFetchingScreen />);
    expect(getByText('Build login page')).toBeTruthy();
    expect(getByText('Setup CI pipeline')).toBeTruthy();
  });
});

describe('ErrorBoundary on DataFetchingScreen', () => {
  it('renders fallback when child throws', () => {
    // Suppress console.error for the boundary test
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

    // Make useItems throw during render
    mockUseItems.mockImplementation(() => {
      throw new Error('Render crash');
    });
    mockUseCreateItem.mockReturnValue(defaultMutationReturn);
    mockUseUpdateItem.mockReturnValue(defaultMutationReturn);
    mockUseDeleteItem.mockReturnValue(defaultMutationReturn);

    const { getByText } = render(<DataFetchingScreen />);
    expect(getByText('Something went wrong')).toBeTruthy();
    expect(getByText('Try Again')).toBeTruthy();

    consoleSpy.mockRestore();
  });
});
