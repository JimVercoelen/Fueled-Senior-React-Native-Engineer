import React from 'react';
import { View, Pressable } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import clsx from 'clsx';
import Typography from '../ui/Typography';

interface ModalContentProps {
  title?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
  onClose?: () => void;
}

export default function ModalContent({
  title,
  children,
  footer,
  className,
  onClose,
}: ModalContentProps) {
  return (
    <View
      className={clsx(
        'bg-[#0a0a0a] border border-white/15 rounded-2xl w-full max-w-2xl overflow-hidden',
        className,
      )}
    >
      {(title || onClose) && (
        <View className="flex-row items-center justify-between px-5 pt-5 pb-3">
          {title ? <Typography variant="h3">{title}</Typography> : <View />}
          {onClose && (
            <Pressable onPress={onClose} className="p-1">
              <MaterialIcons name="close" size={20} color="rgba(255,255,255,0.5)" />
            </Pressable>
          )}
        </View>
      )}

      <View className="px-5 py-3">{children}</View>

      {footer && <View className="px-5 pb-5 pt-2 border-t border-white/10">{footer}</View>}
    </View>
  );
}
