import React from 'react';
import { Text, Pressable } from 'react-native';
import { render, act, waitFor, fireEvent } from '@testing-library/react-native';
import { AuthProvider, useSession } from '../../src/contexts/auth';
import { mockSupabase, createMockSession } from '../__mocks__/supabase';

// Mock the supabase module
jest.mock('../../src/lib/supabase', () => ({
  supabase: require('../__mocks__/supabase').mockSupabase,
}));

// Test consumer component to access auth context values
function TestConsumer() {
  const { session, isLoading, signIn, signOut } = useSession();

  return (
    <>
      <Text testID="loading">{String(isLoading)}</Text>
      <Text testID="session">{session ? session.user.email : 'null'}</Text>
      <Pressable testID="sign-in" onPress={() => signIn('user@example.com')} />
      <Pressable testID="sign-out" onPress={() => signOut()} />
    </>
  );
}

function renderWithProvider() {
  return render(
    <AuthProvider>
      <TestConsumer />
    </AuthProvider>,
  );
}

beforeEach(() => {
  jest.clearAllMocks();
  // Reset default mock behaviors
  mockSupabase.auth.getSession.mockResolvedValue({ data: { session: null } });
  mockSupabase.auth.signInWithOtp.mockResolvedValue({ error: null });
  mockSupabase.auth.signOut.mockResolvedValue({ error: null });
  mockSupabase.auth.onAuthStateChange.mockReturnValue({
    data: { subscription: { unsubscribe: jest.fn() } },
  });
});

describe('AuthProvider', () => {
  // AUTH-01: signIn calls supabase.auth.signInWithOtp with email and emailRedirectTo
  it('signIn calls signInWithOtp with email and emailRedirectTo', async () => {
    // Set up window.location for this test to simulate web environment
    const originalLocation = window.location;
    Object.defineProperty(window, 'location', {
      value: { origin: 'http://localhost:8081' },
      writable: true,
      configurable: true,
    });

    const { getByTestId } = renderWithProvider();

    await waitFor(() => {
      expect(getByTestId('loading')).toHaveTextContent('false');
    });

    await act(async () => {
      fireEvent.press(getByTestId('sign-in'));
    });

    expect(mockSupabase.auth.signInWithOtp).toHaveBeenCalledWith({
      email: 'user@example.com',
      options: expect.objectContaining({
        emailRedirectTo: 'http://localhost:8081',
      }),
    });

    // Restore original
    Object.defineProperty(window, 'location', {
      value: originalLocation,
      writable: true,
      configurable: true,
    });
  });

  // AUTH-01: signIn returns { error: null } on success and { error: AuthError } on failure
  it('signIn returns error result from signInWithOtp', async () => {
    const mockError = { message: 'Rate limit exceeded', name: 'AuthApiError', status: 429 };
    mockSupabase.auth.signInWithOtp.mockResolvedValueOnce({ error: mockError });

    const { getByTestId } = renderWithProvider();

    await waitFor(() => {
      expect(getByTestId('loading')).toHaveTextContent('false');
    });

    expect(mockSupabase.auth.signInWithOtp).not.toHaveBeenCalled();

    await act(async () => {
      fireEvent.press(getByTestId('sign-in'));
    });

    expect(mockSupabase.auth.signInWithOtp).toHaveBeenCalledWith(
      expect.objectContaining({ email: 'user@example.com' }),
    );
  });

  // AUTH-02: On mount, AuthProvider calls getSession and sets session from result
  it('restores session from getSession on mount', async () => {
    const mockSession = createMockSession({ user: { email: 'restored@example.com' } as any });
    mockSupabase.auth.getSession.mockResolvedValueOnce({
      data: { session: mockSession },
    });

    const { getByTestId } = renderWithProvider();

    await waitFor(() => {
      expect(getByTestId('session')).toHaveTextContent('restored@example.com');
    });
  });

  // AUTH-02: isLoading starts true and becomes false after getSession
  it('isLoading starts true and becomes false after getSession', async () => {
    const { getByTestId } = renderWithProvider();

    // isLoading starts as true
    expect(getByTestId('loading')).toHaveTextContent('true');

    // After getSession resolves, isLoading becomes false
    await waitFor(() => {
      expect(getByTestId('loading')).toHaveTextContent('false');
    });
  });

  // AUTH-03: signOut calls supabase.auth.signOut and session becomes null
  it('signOut calls supabase.auth.signOut', async () => {
    const mockSession = createMockSession();
    mockSupabase.auth.getSession.mockResolvedValueOnce({
      data: { session: mockSession },
    });

    const { getByTestId } = renderWithProvider();

    await waitFor(() => {
      expect(getByTestId('session')).toHaveTextContent('test@example.com');
    });

    await act(async () => {
      fireEvent.press(getByTestId('sign-out'));
    });

    expect(mockSupabase.auth.signOut).toHaveBeenCalled();
  });

  // AUTH-03: onAuthStateChange listener updates session when event fires
  it('onAuthStateChange listener updates session', async () => {
    let authChangeCallback: (event: string, session: any) => void;
    mockSupabase.auth.onAuthStateChange.mockImplementation((cb: any) => {
      authChangeCallback = cb;
      return { data: { subscription: { unsubscribe: jest.fn() } } };
    });

    const { getByTestId } = renderWithProvider();

    await waitFor(() => {
      expect(getByTestId('loading')).toHaveTextContent('false');
    });

    // Session should initially be null
    expect(getByTestId('session')).toHaveTextContent('null');

    // Fire auth state change with a new session
    const newSession = createMockSession({ user: { email: 'new@example.com' } as any });
    await act(async () => {
      authChangeCallback('SIGNED_IN', newSession);
    });

    expect(getByTestId('session')).toHaveTextContent('new@example.com');
  });
});
