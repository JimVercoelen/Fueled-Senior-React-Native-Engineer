import React from 'react';
import { render } from '@testing-library/react-native';
import Typography from '../../../src/components/ui/Typography';

describe('Typography', () => {
  it('renders body variant by default', () => {
    const { getByText } = render(<Typography>Hello</Typography>);
    expect(getByText('Hello')).toBeTruthy();
  });

  it('renders h1 variant with heading font', () => {
    const { getByText } = render(<Typography variant="h1">Title</Typography>);
    expect(getByText('Title')).toBeTruthy();
  });

  it('renders caption variant with smaller text', () => {
    const { getByText } = render(<Typography variant="caption">Note</Typography>);
    expect(getByText('Note')).toBeTruthy();
  });

  it('applies custom className', () => {
    const { getByText } = render(<Typography className="mt-4">Text</Typography>);
    expect(getByText('Text')).toBeTruthy();
  });
});
