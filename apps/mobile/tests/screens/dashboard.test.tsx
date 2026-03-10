import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import { AuthProvider } from '../../src/contexts/auth';
import { mockSupabase, createMockSession } from '../__mocks__/supabase';
import DashboardScreen from '../../app/(dashboard)/index';

// Mock the supabase module
jest.mock('../../src/lib/supabase', () => ({
  supabase: require('../__mocks__/supabase').mockSupabase,
}));

// Mock react-native/Libraries/Linking/Linking
jest.mock('react-native/Libraries/Linking/Linking', () => ({
  openURL: jest.fn(),
}));

function renderDashboard() {
  return render(
    <AuthProvider>
      <DashboardScreen />
    </AuthProvider>,
  );
}

beforeEach(() => {
  jest.clearAllMocks();
  mockSupabase.auth.getSession.mockResolvedValue({ data: { session: null } });
  mockSupabase.auth.signInWithOtp.mockResolvedValue({ error: null });
  mockSupabase.auth.signOut.mockResolvedValue({ error: null });
  mockSupabase.auth.onAuthStateChange.mockReturnValue({
    data: { subscription: { unsubscribe: jest.fn() } },
  });
});

describe('DashboardScreen', () => {
  // DASH-02: Renders welcome greeting with user email
  it('renders welcome greeting with user email', async () => {
    const mockSession = createMockSession({ user: { email: 'test@example.com' } as any });
    mockSupabase.auth.getSession.mockResolvedValueOnce({
      data: { session: mockSession },
    });

    const { getByText } = renderDashboard();

    await waitFor(() => {
      expect(getByText('Welcome back')).toBeTruthy();
    });
    expect(getByText('test@example.com')).toBeTruthy();
  });

  // DASH-02: Hides email when session is null
  it('hides email when session is null', async () => {
    const { getByText, queryByText } = renderDashboard();

    await waitFor(() => {
      expect(getByText('Welcome back')).toBeTruthy();
    });
    expect(queryByText('test@example.com')).toBeNull();
  });

  // DASH-01: Renders all 5 demo card titles
  it('renders all 5 demo card titles', async () => {
    const { getByText } = renderDashboard();

    await waitFor(() => {
      expect(getByText('Data Fetching')).toBeTruthy();
    });
    expect(getByText('State Management')).toBeTruthy();
    expect(getByText('Component Library')).toBeTruthy();
    expect(getByText('About Me')).toBeTruthy();
    expect(getByText('About This App')).toBeTruthy();
  });

  // DASH-01: Renders Explore text on each card
  it('renders Explore text on each card', async () => {
    const { getAllByText } = renderDashboard();

    await waitFor(() => {
      const exploreTexts = getAllByText('Explore');
      expect(exploreTexts).toHaveLength(5);
    });
  });
});
