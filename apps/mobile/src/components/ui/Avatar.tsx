import React from 'react';
import { View, Image, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import clsx from 'clsx';
import { Gradients } from '../../constants/colors';

type AvatarSize = 'sm' | 'md' | 'lg';

interface AvatarProps {
  name?: string;
  imageUri?: string;
  size?: AvatarSize;
  className?: string;
}

const sizeMap: Record<AvatarSize, number> = {
  sm: 32,
  md: 40,
  lg: 56,
};

const fontSizeMap: Record<AvatarSize, number> = {
  sm: 12,
  md: 14,
  lg: 20,
};

function getInitials(name: string): string {
  return name
    .split(' ')
    .map((word) => word[0])
    .filter(Boolean)
    .slice(0, 2)
    .join('')
    .toUpperCase();
}

export default function Avatar({ name, imageUri, size = 'md', className }: AvatarProps) {
  const dim = sizeMap[size];
  const fontSize = fontSizeMap[size];

  if (imageUri) {
    return (
      <View className={clsx('overflow-hidden', className)}>
        <Image
          source={{ uri: imageUri }}
          style={{
            width: dim,
            height: dim,
            borderRadius: dim / 2,
          }}
        />
      </View>
    );
  }

  const initials = name ? getInitials(name) : '?';

  return (
    <View className={className}>
      <LinearGradient
        colors={[...Gradients.primary]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{
          width: dim,
          height: dim,
          borderRadius: dim / 2,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Text
          style={{
            color: '#ffffff',
            fontSize,
            fontFamily: 'Orbitron_600SemiBold',
            textAlign: 'center',
          }}
        >
          {initials}
        </Text>
      </LinearGradient>
    </View>
  );
}
