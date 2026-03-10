import React from 'react';
import { Modal as RNModal, Pressable, View } from 'react-native';

interface ModalProps {
  visible: boolean;
  onClose: () => void;
  children: React.ReactNode;
  animationType?: 'fade' | 'slide';
}

export default function Modal({ visible, onClose, children, animationType = 'fade' }: ModalProps) {
  return (
    <RNModal transparent visible={visible} animationType={animationType} onRequestClose={onClose}>
      <Pressable onPress={onClose} className="flex-1 items-center justify-center bg-black/60 px-4">
        <Pressable onPress={(e) => e.stopPropagation()} className="w-full max-w-lg">
          {children}
        </Pressable>
      </Pressable>
    </RNModal>
  );
}
