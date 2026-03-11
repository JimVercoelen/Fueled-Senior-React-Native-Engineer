import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { ActivityIndicator } from 'react-native';
import Button from '../../../src/components/ui/Button';

describe('Button', () => {
  it('renders primary variant with gradient', () => {
    const { getByText } = render(<Button label="Click" variant="contained" />);
    expect(getByText('Click')).toBeTruthy();
  });

  it('renders secondary variant', () => {
    const { getByText } = render(
      <Button label="Secondary" variant="contained" color="secondary" />,
    );
    expect(getByText('Secondary')).toBeTruthy();
  });

  it('renders outline variant with border', () => {
    const { getByText } = render(<Button label="Outline" variant="outlined" />);
    expect(getByText('Outline')).toBeTruthy();
  });

  it('renders disabled state with reduced opacity', () => {
    const { getByText } = render(<Button label="Disabled" disabled />);
    expect(getByText('Disabled')).toBeTruthy();
  });

  it('calls onPress when pressed', () => {
    const onPress = jest.fn();
    const { getByText } = render(<Button label="Press Me" onPress={onPress} />);
    fireEvent.press(getByText('Press Me'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('does not call onPress when disabled', () => {
    const onPress = jest.fn();
    const { getByText } = render(<Button label="No Press" disabled onPress={onPress} />);
    fireEvent.press(getByText('No Press'));
    expect(onPress).not.toHaveBeenCalled();
  });

  it('renders loading state with ActivityIndicator', () => {
    const { UNSAFE_getByType } = render(<Button label="Loading" loading />);
    expect(UNSAFE_getByType(ActivityIndicator)).toBeTruthy();
  });
});
