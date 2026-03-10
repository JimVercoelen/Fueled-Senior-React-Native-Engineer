import React, { useState } from 'react';
import { Pressable, ActivityIndicator, View, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import clsx from 'clsx';
import Typography from './Typography';

type ButtonVariant = 'text' | 'contained' | 'outlined';
type ButtonSize = 'sm' | 'md' | 'lg';
type ButtonColor = 'primary' | 'secondary' | 'success' | 'error';

interface ButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  color?: ButtonColor;
  disabled?: boolean;
  loading?: boolean;
  link?: boolean;
  label?: string;
  icon?: keyof typeof MaterialIcons.glyphMap;
  iconSize?: number;
  onPress?: () => void;
  className?: string;
}

const sizeStyles: Record<ButtonSize, { paddingVertical: number; paddingHorizontal: number }> = {
  sm: { paddingVertical: 6, paddingHorizontal: 14 },
  md: { paddingVertical: 10, paddingHorizontal: 20 },
  lg: { paddingVertical: 14, paddingHorizontal: 28 },
};

const iconOnlySizeStyles: Record<ButtonSize, { padding: number }> = {
  sm: { padding: 6 },
  md: { padding: 10 },
  lg: { padding: 14 },
};

const iconSizes: Record<ButtonSize, number> = {
  sm: 16,
  md: 20,
  lg: 24,
};

const colorMap: Record<
  ButtonColor,
  { gradient: readonly [string, string]; solid: string; text: string }
> = {
  primary: { gradient: ['#6652FF', '#000000'], solid: '#6E5BFF', text: '#8b7fff' },
  secondary: { gradient: ['#6E5BFF', '#4d38ec'], solid: '#4d38ec', text: '#8b7fff' },
  success: { gradient: ['#008831', '#22c55e'], solid: '#008831', text: '#22c55e' },
  error: { gradient: ['#c70000', '#f97316'], solid: '#c70000', text: '#ef4444' },
};

const webStyles =
  Platform.OS === 'web' ? { userSelect: 'none' as const, outlineStyle: 'none' as const } : {};

export default function Button({
  variant = 'contained',
  size = 'md',
  color = 'primary',
  disabled = false,
  loading = false,
  link = false,
  label,
  icon,
  iconSize,
  onPress,
  className,
}: ButtonProps) {
  const scale = useSharedValue(1);
  const [hovered, setHovered] = useState(false);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = () => {
    if (!disabled && !loading) {
      scale.value = withTiming(0.95, { duration: 100 });
    }
  };

  const handlePressOut = () => {
    if (!disabled && !loading) {
      scale.value = withTiming(1, { duration: 150 });
    }
  };

  const resolvedIconSize = iconSize ?? iconSizes[size];
  const isDisabled = disabled || loading;
  const isIconOnly = !label && !!icon;
  const colors = colorMap[color];

  const getTextColor = () => {
    if (variant === 'contained') return '#ffffff';
    return colors.text;
  };

  const getIconColor = () => {
    if (variant === 'contained') return '#ffffff';
    return colors.text;
  };

  const getLoaderColor = () => {
    if (variant === 'contained') return '#ffffff';
    return colors.text;
  };

  const textColor = getTextColor();

  const renderContent = () => (
    <View className="flex-row items-center justify-center gap-2">
      {loading ? (
        <ActivityIndicator size="small" color={getLoaderColor()} />
      ) : icon ? (
        <MaterialIcons name={icon} size={resolvedIconSize} color={getIconColor()} />
      ) : null}
      {label && (
        <Typography
          variant="button"
          className={clsx(size === 'sm' && 'text-sm', size === 'lg' && 'text-base')}
          style={{ color: textColor }}
        >
          {label}
        </Typography>
      )}
    </View>
  );

  const hoverOpacity = hovered && !isDisabled ? 0.85 : 1;

  const renderContainedButton = () => (
    <LinearGradient
      colors={[...colors.gradient]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={[
        { borderRadius: 12, opacity: hoverOpacity },
        isIconOnly ? iconOnlySizeStyles[size] : sizeStyles[size],
      ]}
    >
      {renderContent()}
    </LinearGradient>
  );

  const renderStyledButton = () => (
    <View
      className={clsx('rounded-xl', variant === 'outlined' && 'border')}
      style={[
        isIconOnly ? iconOnlySizeStyles[size] : sizeStyles[size],
        variant === 'outlined' && {
          borderColor: hovered && !isDisabled ? colors.text : colors.text + '40',
        },
        variant === 'text' &&
          hovered &&
          !isDisabled && {
            backgroundColor: 'rgba(255,255,255,0.05)',
          },
      ]}
    >
      {renderContent()}
    </View>
  );

  return (
    <Animated.View style={animatedStyle} className={className}>
      <Pressable
        onPress={isDisabled ? undefined : onPress}
        onPressIn={isDisabled ? undefined : handlePressIn}
        onPressOut={isDisabled ? undefined : handlePressOut}
        onHoverIn={() => setHovered(true)}
        onHoverOut={() => setHovered(false)}
        className={clsx(isDisabled && 'opacity-40')}
        disabled={isDisabled}
        style={[webStyles, isDisabled && Platform.OS === 'web' ? { cursor: 'not-allowed' } : {}]}
      >
        {variant === 'contained' ? renderContainedButton() : renderStyledButton()}
      </Pressable>
    </Animated.View>
  );
}
