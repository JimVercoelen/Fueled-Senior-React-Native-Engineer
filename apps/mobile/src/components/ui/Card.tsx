import React from 'react';
import { View, Pressable } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import clsx from 'clsx';

interface CardProps {
  header?: React.ReactNode;
  children: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
  onPress?: () => void;
}

export default function Card({ header, children, footer, className, onPress }: CardProps) {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = () => {
    scale.value = withTiming(0.98, { duration: 100 });
  };

  const handlePressOut = () => {
    scale.value = withTiming(1, { duration: 150 });
  };

  const cardContent = (
    <View
      className={clsx('bg-white/5 border border-white/15 rounded-2xl overflow-hidden', className)}
    >
      {header && <View className="px-4 pt-4">{header}</View>}
      <View className="px-4 py-3">{children}</View>
      {footer && <View className="px-4 pb-4 border-t border-white/10">{footer}</View>}
    </View>
  );

  if (onPress) {
    return (
      <Animated.View style={animatedStyle}>
        <Pressable onPress={onPress} onPressIn={handlePressIn} onPressOut={handlePressOut}>
          {cardContent}
        </Pressable>
      </Animated.View>
    );
  }

  return cardContent;
}
