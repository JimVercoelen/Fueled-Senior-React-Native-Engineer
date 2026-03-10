import React, { useEffect } from 'react';
import { View, type DimensionValue } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import clsx from 'clsx';

interface SkeletonLineProps {
  width?: DimensionValue;
  height?: number;
  className?: string;
}

export function SkeletonLine({ width = '100%', height = 14, className }: SkeletonLineProps) {
  const opacity = useSharedValue(1);

  useEffect(() => {
    opacity.value = withRepeat(
      withSequence(withTiming(0.3, { duration: 800 }), withTiming(1, { duration: 800 })),
      -1,
    );
  }, [opacity]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return (
    <Animated.View
      style={[animatedStyle, { width, height }]}
      className={clsx('bg-white/10 rounded-lg', className)}
    />
  );
}

interface SkeletonCardProps {
  lines?: number;
  className?: string;
}

export function SkeletonCard({ lines = 3, className }: SkeletonCardProps) {
  const widths: DimensionValue[] = ['100%', '75%', '60%', '90%', '50%'];

  return (
    <View className={clsx('bg-white/5 border border-white/15 rounded-2xl p-4 gap-3', className)}>
      {Array.from({ length: lines }).map((_, index) => (
        <SkeletonLine key={index} width={widths[index % widths.length]} />
      ))}
    </View>
  );
}
