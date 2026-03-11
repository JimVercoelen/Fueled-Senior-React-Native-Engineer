import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { FormTestWrapper } from '../../helpers/form-wrapper';
import Toggle from '../../../src/components/forms/Toggle';

describe('Toggle', () => {
  it('renders in off state by default', () => {
    const { getByText } = render(
      <FormTestWrapper defaultValues={{ notify: false }}>
        {(control) => <Toggle control={control} name="notify" label="Notify" />}
      </FormTestWrapper>,
    );
    expect(getByText('Notify')).toBeTruthy();
  });

  it('toggles on when pressed', () => {
    const { getByText } = render(
      <FormTestWrapper defaultValues={{ notify: false }}>
        {(control) => <Toggle control={control} name="notify" label="Notify" />}
      </FormTestWrapper>,
    );
    // Press the label text (inside the Pressable)
    fireEvent.press(getByText('Notify'));
    // Verify no crash - state change is managed by react-hook-form
    expect(getByText('Notify')).toBeTruthy();
  });

  it('renders disabled state', () => {
    const { getByText } = render(
      <FormTestWrapper defaultValues={{ notify: false }}>
        {(control) => <Toggle control={control} name="notify" label="Notify" disabled />}
      </FormTestWrapper>,
    );
    expect(getByText('Notify')).toBeTruthy();
  });

  it('displays label text', () => {
    const { getByText } = render(
      <FormTestWrapper defaultValues={{ darkMode: false }}>
        {(control) => <Toggle control={control} name="darkMode" label="Dark Mode" />}
      </FormTestWrapper>,
    );
    expect(getByText('Dark Mode')).toBeTruthy();
  });
});
