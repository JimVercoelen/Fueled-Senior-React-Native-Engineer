import React from 'react';
import { View } from 'react-native';
import clsx from 'clsx';

interface DividerProps {
  className?: string;
}

export default function Divider({ className }: DividerProps) {
  return <View className={clsx('h-px bg-white/10', className)} />;
}
