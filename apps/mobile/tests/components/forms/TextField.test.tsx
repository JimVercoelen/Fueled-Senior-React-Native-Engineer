import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { FormTestWrapper } from '../../helpers/form-wrapper';
import TextField from '../../../src/components/forms/TextField';

describe('TextField', () => {
  it('renders with label', () => {
    const { getByText } = render(
      <FormTestWrapper defaultValues={{ email: '' }}>
        {(control) => <TextField control={control} name="email" label="Email" />}
      </FormTestWrapper>,
    );
    expect(getByText('Email')).toBeTruthy();
  });

  it('renders placeholder text', () => {
    const { getByPlaceholderText } = render(
      <FormTestWrapper defaultValues={{ email: '' }}>
        {(control) => (
          <TextField control={control} name="email" label="Email" placeholder="Enter email" />
        )}
      </FormTestWrapper>,
    );
    expect(getByPlaceholderText('Enter email')).toBeTruthy();
  });

  it('renders without error by default', () => {
    const { getByText, queryByText } = render(
      <FormTestWrapper defaultValues={{ email: '' }}>
        {(control) => <TextField control={control} name="email" label="Email" />}
      </FormTestWrapper>,
    );
    expect(getByText('Email')).toBeTruthy();
    // No validation error text should be present initially
    expect(queryByText(/error/i)).toBeNull();
  });

  it('renders disabled state', () => {
    const { getByText } = render(
      <FormTestWrapper defaultValues={{ email: '' }}>
        {(control) => (
          <TextField
            control={control}
            name="email"
            label="Email"
            placeholder="Enter email"
            disabled
          />
        )}
      </FormTestWrapper>,
    );
    expect(getByText('Email')).toBeTruthy();
  });

  it('calls onChange when text is entered', async () => {
    const { getByPlaceholderText } = render(
      <FormTestWrapper defaultValues={{ email: '' }}>
        {(control) => (
          <TextField control={control} name="email" label="Email" placeholder="Enter email" />
        )}
      </FormTestWrapper>,
    );
    const input = getByPlaceholderText('Enter email');
    fireEvent.changeText(input, 'hello@test.com');
    await waitFor(() => {
      expect(input.props.value).toBe('hello@test.com');
    });
  });
});
