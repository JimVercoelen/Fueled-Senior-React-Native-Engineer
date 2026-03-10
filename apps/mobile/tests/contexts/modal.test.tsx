import React from 'react';
import { Pressable } from 'react-native';
import { render, fireEvent, act } from '@testing-library/react-native';
import { ModalProvider, useModal } from '../../src/contexts/modal';

const mockOnConfirm = jest.fn();
const mockOnCancel = jest.fn();

function TestConsumer() {
  const { showModal, hideModal } = useModal();

  return (
    <>
      <Pressable
        testID="show-confirmation"
        onPress={() =>
          showModal({
            type: 'confirmation',
            title: 'Delete Item',
            content: 'Are you sure you want to delete this item?',
            onConfirm: mockOnConfirm,
            onCancel: mockOnCancel,
          })
        }
      />
      <Pressable
        testID="show-generic"
        onPress={() =>
          showModal({
            type: 'generic',
            title: 'Information',
            content: 'This is some information.',
          })
        }
      />
      <Pressable testID="hide" onPress={hideModal} />
    </>
  );
}

describe('ModalProvider', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('initially has no modal visible', () => {
    const { queryByText } = render(
      <ModalProvider>
        <TestConsumer />
      </ModalProvider>,
    );
    expect(queryByText('Delete Item')).toBeNull();
  });

  it('showModal renders modal with title and content', () => {
    const { getByTestId, getByText } = render(
      <ModalProvider>
        <TestConsumer />
      </ModalProvider>,
    );

    act(() => {
      fireEvent.press(getByTestId('show-confirmation'));
    });

    expect(getByText('Delete Item')).toBeTruthy();
    expect(getByText('Are you sure you want to delete this item?')).toBeTruthy();
  });

  it('confirmation type shows Cancel and Confirm buttons', () => {
    const { getByTestId, getByText } = render(
      <ModalProvider>
        <TestConsumer />
      </ModalProvider>,
    );

    act(() => {
      fireEvent.press(getByTestId('show-confirmation'));
    });

    expect(getByText('Cancel')).toBeTruthy();
    expect(getByText('Confirm')).toBeTruthy();
  });

  it('generic type shows Close button', () => {
    const { getByTestId, getByText, queryByText } = render(
      <ModalProvider>
        <TestConsumer />
      </ModalProvider>,
    );

    act(() => {
      fireEvent.press(getByTestId('show-generic'));
    });

    expect(getByText('Close')).toBeTruthy();
    expect(queryByText('Cancel')).toBeNull();
    expect(queryByText('Confirm')).toBeNull();
  });

  it('Confirm button calls onConfirm and hides modal', () => {
    const { getByTestId, getByText, queryByText } = render(
      <ModalProvider>
        <TestConsumer />
      </ModalProvider>,
    );

    act(() => {
      fireEvent.press(getByTestId('show-confirmation'));
    });

    act(() => {
      fireEvent.press(getByText('Confirm'));
    });

    expect(mockOnConfirm).toHaveBeenCalledTimes(1);
    expect(queryByText('Delete Item')).toBeNull();
  });

  it('Cancel button calls onCancel and hides modal', () => {
    const { getByTestId, getByText, queryByText } = render(
      <ModalProvider>
        <TestConsumer />
      </ModalProvider>,
    );

    act(() => {
      fireEvent.press(getByTestId('show-confirmation'));
    });

    act(() => {
      fireEvent.press(getByText('Cancel'));
    });

    expect(mockOnCancel).toHaveBeenCalledTimes(1);
    expect(queryByText('Delete Item')).toBeNull();
  });

  it('useModal throws outside provider', () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

    expect(() => {
      render(<TestConsumer />);
    }).toThrow('useModal must be used within ModalProvider');

    consoleSpy.mockRestore();
  });
});
