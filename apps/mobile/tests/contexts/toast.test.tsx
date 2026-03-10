import React from 'react';
import { Text, Pressable } from 'react-native';
import { render, fireEvent, act } from '@testing-library/react-native';
import { ToastProvider, useToast } from '../../src/contexts/toast';

jest.useFakeTimers();

function TestConsumer() {
  const { toast, showToast, hideToast } = useToast();

  return (
    <>
      <Pressable
        testID="show-success"
        onPress={() => showToast({ type: 'success', message: 'Success message' })}
      />
      <Pressable
        testID="show-error"
        onPress={() => showToast({ type: 'error', title: 'Error Title', message: 'Error message' })}
      />
      <Pressable
        testID="show-info"
        onPress={() => showToast({ type: 'info', message: 'Info message' })}
      />
      <Pressable testID="hide" onPress={hideToast} />
      {toast && <Text testID="toast-message">{toast.message}</Text>}
      {toast && <Text testID="toast-type">{toast.type}</Text>}
    </>
  );
}

describe('ToastProvider', () => {
  beforeEach(() => {
    jest.clearAllTimers();
  });

  it('initially has no toast', () => {
    const { queryByTestId } = render(
      <ToastProvider>
        <TestConsumer />
      </ToastProvider>,
    );
    expect(queryByTestId('toast-message')).toBeNull();
  });

  it('showToast renders toast with correct type and message', () => {
    const { getByTestId, queryByTestId } = render(
      <ToastProvider>
        <TestConsumer />
      </ToastProvider>,
    );

    act(() => {
      fireEvent.press(getByTestId('show-success'));
    });

    expect(queryByTestId('toast-message')).toBeTruthy();
    expect(getByTestId('toast-message').props.children).toBe('Success message');
    expect(getByTestId('toast-type').props.children).toBe('success');
  });

  it('showToast replaces previous toast (only one visible)', () => {
    const { getByTestId } = render(
      <ToastProvider>
        <TestConsumer />
      </ToastProvider>,
    );

    act(() => {
      fireEvent.press(getByTestId('show-success'));
    });

    expect(getByTestId('toast-message').props.children).toBe('Success message');

    act(() => {
      fireEvent.press(getByTestId('show-error'));
    });

    expect(getByTestId('toast-message').props.children).toBe('Error message');
    expect(getByTestId('toast-type').props.children).toBe('error');
  });

  it('auto-dismisses after 4 seconds', () => {
    const { getByTestId, queryByTestId } = render(
      <ToastProvider>
        <TestConsumer />
      </ToastProvider>,
    );

    act(() => {
      fireEvent.press(getByTestId('show-success'));
    });

    expect(queryByTestId('toast-message')).toBeTruthy();

    act(() => {
      jest.advanceTimersByTime(4000);
    });

    expect(queryByTestId('toast-message')).toBeNull();
  });

  it('hideToast dismisses immediately', () => {
    const { getByTestId, queryByTestId } = render(
      <ToastProvider>
        <TestConsumer />
      </ToastProvider>,
    );

    act(() => {
      fireEvent.press(getByTestId('show-success'));
    });

    expect(queryByTestId('toast-message')).toBeTruthy();

    act(() => {
      fireEvent.press(getByTestId('hide'));
    });

    expect(queryByTestId('toast-message')).toBeNull();
  });

  it('useToast throws outside provider', () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

    expect(() => {
      render(<TestConsumer />);
    }).toThrow('useToast must be used within ToastProvider');

    consoleSpy.mockRestore();
  });
});
