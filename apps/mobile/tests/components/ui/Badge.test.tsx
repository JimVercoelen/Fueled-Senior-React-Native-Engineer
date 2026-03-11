import React from 'react';
import { render } from '@testing-library/react-native';
import Badge from '../../../src/components/ui/Badge';

describe('Badge', () => {
  it('renders success variant', () => {
    const { getByText } = render(<Badge type="success" label="Active" />);
    expect(getByText('Active')).toBeTruthy();
  });

  it('renders error variant', () => {
    const { getByText } = render(<Badge type="error" label="Failed" />);
    expect(getByText('Failed')).toBeTruthy();
  });

  it('renders info variant', () => {
    const { getByText } = render(<Badge type="info" label="Info" />);
    expect(getByText('Info')).toBeTruthy();
  });

  it('renders warning variant', () => {
    const { getByText } = render(<Badge type="warning" label="Caution" />);
    expect(getByText('Caution')).toBeTruthy();
  });
});
