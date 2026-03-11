import React from 'react';
import { render } from '@testing-library/react-native';

import ComponentsScreen from '../../app/(dashboard)/components';

jest.mock('@/contexts/toast', () => ({
  useToast: () => ({ showToast: jest.fn() }),
}));

jest.mock('@/contexts/modal', () => ({
  useModal: () => ({ showModal: jest.fn(), showConfirmation: jest.fn() }),
}));

describe('ComponentsScreen', () => {
  it('renders without crashing', () => {
    const { getByText } = render(<ComponentsScreen />);
    expect(getByText('Component Library')).toBeTruthy();
  });

  it('displays Core UI section heading', () => {
    const { getByText } = render(<ComponentsScreen />);
    expect(getByText('Core UI')).toBeTruthy();
  });

  it('displays Form Controls section heading', () => {
    const { getByText } = render(<ComponentsScreen />);
    expect(getByText('Form Controls')).toBeTruthy();
  });

  it('displays Feedback section heading', () => {
    const { getByText } = render(<ComponentsScreen />);
    expect(getByText('Feedback')).toBeTruthy();
  });

  it('displays Layout section heading', () => {
    const { getByText } = render(<ComponentsScreen />);
    expect(getByText('Layout')).toBeTruthy();
  });
});
