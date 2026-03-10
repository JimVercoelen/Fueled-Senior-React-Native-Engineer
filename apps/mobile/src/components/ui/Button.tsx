import React from 'react';
import { Pressable, ActivityIndicator, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import clsx from 'clsx';
import Typography from './Typography';
import { Gradients } from '../../constants/colors';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'text';
type ButtonSize = 'sm' | 'md';
type ButtonColor = 'primary' | 'danger';

interface ButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  color?: ButtonColor;
  disabled?: boolean;
  loading?: boolean;
  label: string;
  icon?: keyof typeof MaterialIcons.glyphMap;
  iconSize?: number;
  onPress?: () => void;
  className?: string;
}

const sizeStyles: Record<ButtonSize, { paddingVertical: number; paddingHorizontal: number }> = {
  sm: { paddingVertical: 8, paddingHorizontal: 16 },
  md: { paddingVertical: 12, paddingHorizontal: 24 },
};

const iconSizes: Record<ButtonSize, number> = {
  sm: 16,
  md: 20,
};

export default function Button({
  variant = 'primary',
  size = 'md',
  color = 'primary',
  disabled = false,
  loading = false,
  label,
  icon,
  iconSize,
  onPress,
  className,
}: ButtonProps) {
  const scale = useSharedValue(1);

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
  const gradientColors = color === 'danger' ? Gradients.danger : Gradients.primary;
  const isDisabled = disabled || loading;

  const renderContent = () => (
    <View className="flex-row items-center justify-center gap-2">
      {loading ? (
        <ActivityIndicator size="small" color="#ffffff" />
      ) : icon ? (
        <MaterialIcons name={icon} size={resolvedIconSize} color="#ffffff" />
      ) : null}
      <Typography variant="button" className={clsx('text-white', size === 'sm' && 'text-sm')}>
        {label}
      </Typography>
    </View>
  );

  const renderGradientButton = () => (
    <LinearGradient
      colors={[...gradientColors]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={[
        {
          borderRadius: 12,
          ...sizeStyles[size],
        },
      ]}
    >
      {renderContent()}
    </LinearGradient>
  );

  const renderStyledButton = () => (
    <View
      className={clsx(
        'rounded-xl',
        variant === 'secondary' && 'bg-white/5 border border-white/15',
        variant === 'outline' && 'border border-white/20',
        variant === 'text' && '',
      )}
      style={sizeStyles[size]}
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
        className={clsx(isDisabled && 'opacity-40')}
        disabled={isDisabled}
      >
        {variant === 'primary' ? renderGradientButton() : renderStyledButton()}
      </Pressable>
    </Animated.View>
  );
}
