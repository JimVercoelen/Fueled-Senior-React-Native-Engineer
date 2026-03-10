import React, { useRef, useState, useCallback } from 'react';
import { Modal, Pressable, ScrollView, View, Platform } from 'react-native';
import { Controller, Control, FieldPath, FieldValues } from 'react-hook-form';
import { MaterialIcons } from '@expo/vector-icons';
import Typography from '../ui/Typography';
import Field from './Field';

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps<T extends FieldValues> {
  control: Control<T>;
  name: FieldPath<T>;
  label?: string;
  helperText?: string;
  placeholder?: string;
  options: SelectOption[];
  disabled?: boolean;
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

export default function Select<T extends FieldValues>({
  control,
  name,
  label,
  helperText,
  placeholder = 'Select an option',
  options,
  disabled = false,
  className,
}: SelectProps<T>) {
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [position, setPosition] = useState<TriggerPosition>({ x: 0, y: 0, width: 0, height: 0 });
  const triggerRef = useRef<View>(null);

  const handleOpen = useCallback(() => {
    if (disabled || !triggerRef.current) return;
    const element = triggerRef.current as any;
    if (typeof element.getBoundingClientRect === 'function') {
      const rect = element.getBoundingClientRect();
      setPosition({ x: rect.left, y: rect.top, width: rect.width, height: rect.height });
      setOpen(true);
    } else {
      element.measureInWindow((x: number, y: number, width: number, height: number) => {
        setPosition({ x, y, width, height });
        setOpen(true);
      });
    }
  }, [disabled]);

  const getBorderColor = (hasError: boolean) => {
    if (hasError) return '#ef4444';
    if (open) return '#6E5BFF';
    if (hovered && !disabled) return 'rgba(59, 130, 246, 0.5)';
    return 'rgba(255, 255, 255, 0.15)';
  };

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value }, fieldState: { error } }) => {
        const selectedOption = options.find((o) => o.value === value);

        return (
          <Field
            label={label}
            helperText={helperText}
            error={error}
            disabled={disabled}
            className={className}
          >
            <View ref={triggerRef} collapsable={false}>
              <Pressable
                onPress={handleOpen}
                onHoverIn={() => setHovered(true)}
                onHoverOut={() => setHovered(false)}
                className="bg-white/5 border rounded-xl px-4 py-3 flex-row items-center justify-between"
                style={[
                  { borderColor: getBorderColor(!!error) },
                  webStyles,
                  disabled && Platform.OS === 'web' ? { cursor: 'not-allowed' } : {},
                ]}
                disabled={disabled}
              >
                <Typography
                  variant="body"
                  className={selectedOption ? 'text-white' : 'text-neutral-400'}
                >
                  {selectedOption ? selectedOption.label : placeholder}
                </Typography>
                <MaterialIcons name="expand-more" size={20} color="rgba(255,255,255,0.5)" />
              </Pressable>
            </View>

            <Modal
              transparent
              visible={open}
              animationType="fade"
              onRequestClose={() => setOpen(false)}
            >
              <Pressable className="flex-1" onPress={() => setOpen(false)}>
                <View
                  style={{
                    position: 'absolute',
                    top: position.y + position.height + 4,
                    left: position.x,
                    width: position.width,
                  }}
                  className="bg-[#0a0a0a] border border-white/15 rounded-xl overflow-hidden"
                >
                  <ScrollView style={{ maxHeight: 240 }}>
                    {options.map((option, index) => {
                      const isSelected = option.value === value;
                      return (
                        <React.Fragment key={option.value}>
                          {index > 0 && <View className="h-px bg-white/10" />}
                          <Pressable
                            onPress={() => {
                              onChange(option.value);
                              setOpen(false);
                            }}
                            className="flex-row items-center justify-between px-4 py-3"
                            style={webStyles}
                          >
                            {({ hovered: itemHovered }: { hovered: boolean }) => (
                              <View
                                className="flex-row items-center justify-between flex-1"
                                style={
                                  itemHovered
                                    ? { backgroundColor: 'rgba(255,255,255,0.05)' }
                                    : undefined
                                }
                              >
                                <Typography variant="body" className="text-neutral-300">
                                  {option.label}
                                </Typography>
                                {isSelected && (
                                  <MaterialIcons name="check" size={20} color="#6E5BFF" />
                                )}
                              </View>
                            )}
                          </Pressable>
                        </React.Fragment>
                      );
                    })}
                  </ScrollView>
                </View>
              </Pressable>
            </Modal>
          </Field>
        );
      }}
    />
  );
}
