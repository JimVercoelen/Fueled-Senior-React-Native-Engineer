import React, { useRef, useState, useCallback } from 'react';
import { Modal, Pressable, View, Platform } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import clsx from 'clsx';
import Typography from '../ui/Typography';

interface DropdownItem {
  key: string;
  label: string;
  icon?: keyof typeof MaterialIcons.glyphMap;
  onPress: () => void;
  destructive?: boolean;
}

interface DropdownProps {
  trigger: React.ReactElement;
  items: DropdownItem[];
  className?: string;
}

interface TriggerPosition {
  x: number;
  y: number;
  width: number;
  height: number;
}

const webStyles =
  Platform.OS === 'web' ? { outlineStyle: 'none' as const, userSelect: 'none' as const } : {};

export default function Dropdown({ trigger, items, className }: DropdownProps) {
  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState<TriggerPosition>({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });
  const triggerRef = useRef<View>(null);

  const handleOpen = useCallback(() => {
    if (!triggerRef.current) return;

    const element = triggerRef.current as any;
    if (typeof element.getBoundingClientRect === 'function') {
      const rect = element.getBoundingClientRect();
      setPosition({
        x: rect.left,
        y: rect.top,
        width: rect.width,
        height: rect.height,
      });
      setOpen(true);
    } else {
      element.measureInWindow((x: number, y: number, width: number, height: number) => {
        setPosition({ x, y, width, height });
        setOpen(true);
      });
    }
  }, []);

  const handleItemPress = useCallback((item: DropdownItem) => {
    item.onPress();
    setOpen(false);
  }, []);

  return (
    <View className={className}>
      <View ref={triggerRef} collapsable={false}>
        {React.cloneElement(trigger, { onPress: handleOpen })}
      </View>

      <Modal transparent visible={open} animationType="fade" onRequestClose={() => setOpen(false)}>
        <Pressable className="flex-1" onPress={() => setOpen(false)}>
          <View
            style={{
              position: 'absolute',
              top: position.y + position.height + 4,
              left: position.x,
              minWidth: Math.max(position.width, 160),
            }}
            className="bg-[#0a0a0a] border border-white/15 rounded-xl overflow-hidden"
          >
            {items.map((item, index) => (
              <React.Fragment key={item.key}>
                {index > 0 && <View className="h-px bg-white/10" />}
                <Pressable
                  onPress={() => handleItemPress(item)}
                  className="flex-row items-center px-4 py-3"
                  style={webStyles}
                >
                  {item.icon && (
                    <MaterialIcons
                      name={item.icon}
                      size={20}
                      color={item.destructive ? '#f87171' : 'rgba(255,255,255,0.7)'}
                      style={{ marginRight: 12 }}
                    />
                  )}
                  <Typography
                    variant="body"
                    className={clsx(item.destructive ? 'text-red-400' : 'text-neutral-300')}
                  >
                    {item.label}
                  </Typography>
                </Pressable>
              </React.Fragment>
            ))}
          </View>
        </Pressable>
      </Modal>
    </View>
  );
}
