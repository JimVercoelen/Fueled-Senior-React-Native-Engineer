import React from 'react';
import { View, Pressable } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import clsx from 'clsx';
import Typography from '../ui/Typography';

type AlertType = 'success' | 'info' | 'warning' | 'error';

interface AlertProps {
  type?: AlertType;
  title?: string;
  message: string;
  visible?: boolean;
  onDismiss?: () => void;
  className?: string;
}

const ALERT_CONFIG: Record<
  AlertType,
  {
    bg: string;
    border: string;
    icon: keyof typeof MaterialIcons.glyphMap;
    iconColor: string;
    textColor: string;
  }
> = {
  success: {
    bg: 'bg-green-500/10',
    border: 'border-green-500/30',
    icon: 'check-circle',
    iconColor: '#4ade80',
    textColor: 'text-green-400',
  },
  info: {
    bg: 'bg-blue-500/10',
    border: 'border-blue-500/30',
    icon: 'info',
    iconColor: '#60a5fa',
    textColor: 'text-blue-400',
  },
  warning: {
    bg: 'bg-yellow-500/10',
    border: 'border-yellow-500/30',
    icon: 'warning',
    iconColor: '#facc15',
    textColor: 'text-yellow-400',
  },
  error: {
    bg: 'bg-red-500/10',
    border: 'border-red-500/30',
    icon: 'error',
    iconColor: '#f87171',
    textColor: 'text-red-400',
  },
};

function AlertContent({
  type = 'info',
  title,
  message,
  onDismiss,
  className,
}: Omit<AlertProps, 'visible'>) {
  const config = ALERT_CONFIG[type];

  return (
    <View
      className={clsx(
        'flex-row items-start px-4 py-3 rounded-xl border',
        config.bg,
        config.border,
        className,
      )}
    >
      <MaterialIcons name={config.icon} size={20} color={config.iconColor} />
      <View className="flex-1 ml-3">
        {title && (
          <Typography variant="body" className="text-white font-body-semibold mb-0.5">
            {title}
          </Typography>
        )}
        <Typography variant="caption" className={config.textColor}>
          {message}
        </Typography>
      </View>
      {onDismiss && (
        <Pressable onPress={onDismiss} className="ml-2 p-0.5">
          <MaterialIcons name="close" size={16} color="rgba(255,255,255,0.5)" />
        </Pressable>
      )}
    </View>
  );
}

export default function Alert({
  type = 'info',
  title,
  message,
  visible,
  onDismiss,
  className,
}: AlertProps) {
  // If visible prop is not provided, always render (static usage)
  if (visible === undefined) {
    return (
      <AlertContent
        type={type}
        title={title}
        message={message}
        onDismiss={onDismiss}
        className={className}
      />
    );
  }

  // Animated enter/exit when visible prop is provided
  if (!visible) return null;

  return (
    <Animated.View entering={FadeIn.duration(200)} exiting={FadeOut.duration(200)}>
      <AlertContent
        type={type}
        title={title}
        message={message}
        onDismiss={onDismiss}
        className={className}
      />
    </Animated.View>
  );
}
