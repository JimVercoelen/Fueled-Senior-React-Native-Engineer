import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Text } from 'react-native';
import Card from '../../../src/components/ui/Card';

describe('Card', () => {
  it('renders children in body area', () => {
    const { getByText } = render(
      <Card>
        <Text>Hello</Text>
      </Card>,
    );
    expect(getByText('Hello')).toBeTruthy();
  });

  it('renders header when provided', () => {
    const { getByText } = render(
      <Card header={<Text>Header</Text>}>
        <Text>Body</Text>
      </Card>,
    );
    expect(getByText('Header')).toBeTruthy();
    expect(getByText('Body')).toBeTruthy();
  });

  it('renders footer when provided', () => {
    const { getByText } = render(
      <Card footer={<Text>Footer</Text>}>
        <Text>Body</Text>
      </Card>,
    );
    expect(getByText('Footer')).toBeTruthy();
    expect(getByText('Body')).toBeTruthy();
  });

  it('calls onPress when pressable card is pressed', () => {
    const onPress = jest.fn();
    const { getByText } = render(
      <Card onPress={onPress}>
        <Text>Tap Me</Text>
      </Card>,
    );
    fireEvent.press(getByText('Tap Me'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });
});
