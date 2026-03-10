import React, { useState } from 'react';
import { View, Pressable } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import clsx from 'clsx';
import Typography from '../ui/Typography';

interface AccordionItemProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

export function AccordionItem({ title, children, defaultOpen = false }: AccordionItemProps) {
  const [open, setOpen] = useState(defaultOpen);
  const height = useSharedValue(defaultOpen ? 1 : 0);
  const rotation = useSharedValue(defaultOpen ? 180 : 0);

  const toggle = () => {
    const nextOpen = !open;
    setOpen(nextOpen);
    height.value = withTiming(nextOpen ? 1 : 0, { duration: 250 });
    rotation.value = withTiming(nextOpen ? 180 : 0, { duration: 250 });
  };

  const bodyStyle = useAnimatedStyle(() => ({
    maxHeight: height.value * 500,
    opacity: height.value,
    overflow: 'hidden' as const,
  }));

  const chevronStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }],
  }));

  return (
    <View className="border border-white/15 rounded-2xl overflow-hidden">
      <Pressable onPress={toggle} className="flex-row items-center justify-between px-4 py-3">
        <Typography variant="body" className="text-white flex-1">
          {title}
        </Typography>
        <Animated.View style={chevronStyle}>
          <MaterialIcons name="expand-more" size={20} color="white" />
        </Animated.View>
      </Pressable>
      <Animated.View style={bodyStyle}>
        <View className="px-4 pb-3">{children}</View>
      </Animated.View>
    </View>
  );
}

interface AccordionProps {
  children: React.ReactNode;
  className?: string;
}

export default function Accordion({ children, className }: AccordionProps) {
  return <View className={clsx('gap-3', className)}>{children}</View>;
}
