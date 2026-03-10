import React from 'react';
import { View, Pressable, Platform } from 'react-native';
import clsx from 'clsx';
import Typography from '../ui/Typography';

interface Tab {
  key: string;
  label: string;
}

interface TabsProps {
  tabs: Tab[];
  activeTab: string;
  onTabChange: (key: string) => void;
  className?: string;
}

const webStyles =
  Platform.OS === 'web' ? { outlineStyle: 'none' as const, userSelect: 'none' as const } : {};

export default function Tabs({ tabs, activeTab, onTabChange, className }: TabsProps) {
  return (
    <View className={clsx('flex-row border-b border-white/10', className)}>
      {tabs.map((tab) => {
        const isActive = tab.key === activeTab;
        return (
          <Pressable
            key={tab.key}
            onPress={() => onTabChange(tab.key)}
            className={clsx('px-4 py-3', isActive && 'border-b-2 border-primary')}
            style={webStyles}
          >
            <Typography variant="body" className={isActive ? 'text-white' : 'text-white/50'}>
              {tab.label}
            </Typography>
          </Pressable>
        );
      })}
    </View>
  );
}
