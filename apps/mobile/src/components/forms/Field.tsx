import React from 'react';
import { View } from 'react-native';
import clsx from 'clsx';
import Typography from '../ui/Typography';

interface FieldProps {
  label?: string | React.ReactNode;
  helperText?: React.ReactNode;
  error?: { message?: string } | null;
  disabled?: boolean;
  className?: string;
  children: React.ReactNode;
}

export default function Field({
  label,
  helperText,
  error,
  disabled = false,
  className,
  children,
}: FieldProps) {
  return (
    <View className={clsx(disabled && 'opacity-50', className)}>
      {label != null &&
        (typeof label === 'string' ? (
          <Typography variant="body" className="mb-2 text-white">
            {label}
          </Typography>
        ) : (
          <View className="mb-2">{label}</View>
        ))}
      {children}
      {error?.message ? (
        <Typography variant="caption" className="text-red-400 mt-1">
          {error.message}
        </Typography>
      ) : helperText ? (
        typeof helperText === 'string' ? (
          <Typography variant="caption" className="text-neutral-400 mt-1">
            {helperText}
          </Typography>
        ) : (
          <View className="mt-1">{helperText}</View>
        )
      ) : null}
    </View>
  );
}
