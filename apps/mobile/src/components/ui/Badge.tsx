import React from 'react';
import { View, Platform } from 'react-native';
import clsx from 'clsx';
import Typography from './Typography';

type BadgeType = 'success' | 'info' | 'warning' | 'error' | 'purple' | 'cyan' | 'neutral' | 'pink';

interface BadgeProps {
  type: BadgeType;
  label: string;
  className?: string;
}

const colorMap: Record<BadgeType, { bg: string; border: string; text: string }> = {
  success: {
    bg: 'bg-green-500/10',
    border: 'border-green-500/30',
    text: 'text-green-400',
  },
  info: {
    bg: 'bg-blue-500/10',
    border: 'border-blue-500/30',
    text: 'text-blue-400',
  },
  warning: {
    bg: 'bg-yellow-500/10',
    border: 'border-yellow-500/30',
    text: 'text-yellow-400',
  },
  error: {
    bg: 'bg-red-500/10',
    border: 'border-red-500/30',
    text: 'text-red-400',
  },
  purple: {
    bg: 'bg-purple-500/10',
    border: 'border-purple-500/30',
    text: 'text-purple-400',
  },
  cyan: {
    bg: 'bg-cyan-500/10',
    border: 'border-cyan-500/30',
    text: 'text-cyan-400',
  },
  neutral: {
    bg: 'bg-white/5',
    border: 'border-white/20',
    text: 'text-neutral-400',
  },
  pink: {
    bg: 'bg-pink-500/10',
    border: 'border-pink-500/30',
    text: 'text-pink-400',
  },
};

const webStyles = Platform.OS === 'web' ? { userSelect: 'none' as const } : {};

export default function Badge({ type, label, className }: BadgeProps) {
  const colors = colorMap[type];

  return (
    <View
      className={clsx('px-3 py-1 rounded-lg border', colors.bg, colors.border, className)}
      style={webStyles}
    >
      <Typography variant="caption" className={clsx('uppercase', colors.text)}>
        {label}
      </Typography>
    </View>
  );
}
