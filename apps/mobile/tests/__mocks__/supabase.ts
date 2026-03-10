import type { Session } from '@supabase/supabase-js';

function createChainable(result = { data: [], error: null, count: 0 }) {
  const chain: Record<string, jest.Mock> = {};
  const methods = ['eq', 'neq', 'ilike', 'range', 'order', 'single', 'select', 'limit', 'in'];

  methods.forEach((method) => {
    chain[method] = jest.fn().mockReturnValue(chain);
  });

  // Final resolution: when awaited, return the result
  chain.then = jest.fn((resolve: (v: unknown) => void) => resolve(result));

  return chain;
}

export const mockSupabase = {
  auth: {
    getSession: jest.fn().mockResolvedValue({ data: { session: null } }),
    signInWithOtp: jest.fn().mockResolvedValue({ error: null }),
    signOut: jest.fn().mockResolvedValue({ error: null }),
    onAuthStateChange: jest.fn().mockReturnValue({
      data: { subscription: { unsubscribe: jest.fn() } },
    }),
  },
  from: jest.fn(() => {
    const chainable = createChainable();
    return {
      select: jest.fn().mockReturnValue(chainable),
      insert: jest.fn().mockReturnValue(chainable),
      update: jest.fn().mockReturnValue(chainable),
      delete: jest.fn().mockReturnValue(chainable),
    };
  }),
};

export function createMockSession(overrides?: Partial<Session>): Session {
  return {
    user: {
      id: 'test-user-id',
      email: 'test@example.com',
      aud: 'authenticated',
      role: 'authenticated',
      app_metadata: {},
      user_metadata: {},
      created_at: '2026-01-01T00:00:00Z',
      ...overrides?.user,
    },
    access_token: 'mock-access-token',
    refresh_token: 'mock-refresh-token',
    token_type: 'bearer',
    expires_in: 3600,
    expires_at: Math.floor(Date.now() / 1000) + 3600,
    ...overrides,
  } as Session;
}
