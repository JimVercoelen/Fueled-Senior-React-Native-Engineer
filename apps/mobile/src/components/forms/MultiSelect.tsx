import React, { useRef, useState, useCallback } from 'react';
import { Modal, Pressable, ScrollView, View, Platform } from 'react-native';
import { Controller, Control, FieldPath, FieldValues } from 'react-hook-form';
import { MaterialIcons } from '@expo/vector-icons';
import clsx from 'clsx';
import Typography from '../ui/Typography';
import Button from '../ui/Button';
import Field from './Field';

interface MultiSelectOption {
  value: string;
  label: string;
}

interface MultiSelectProps<T extends FieldValues> {
  control: Control<T>;
  name: FieldPath<T>;
  label?: string;
  helperText?: string;
  placeholder?: string;
  options: MultiSelectOption[];
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

export default function MultiSelect<T extends FieldValues>({
  control,
  name,
  label,
  helperText,
  placeholder = 'Select options',
  options,
  disabled = false,
  className,
}: MultiSelectProps<T>) {
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
    if (open) return '#2563eb';
    if (hovered && !disabled) return 'rgba(59, 130, 246, 0.5)';
    return 'rgba(255, 255, 255, 0.15)';
  };

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value }, fieldState: { error } }) => {
        const selectedValues: string[] = Array.isArray(value) ? value : [];

        const handleToggle = (optionValue: string) => {
          const updated = selectedValues.includes(optionValue)
            ? selectedValues.filter((v) => v !== optionValue)
            : [...selectedValues, optionValue];
          onChange(updated);
        };

        const handleRemoveChip = (optionValue: string) => {
          onChange(selectedValues.filter((v) => v !== optionValue));
        };

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
                <View className="flex-1 flex-row flex-wrap gap-1.5">
                  {selectedValues.length > 0 ? (
                    selectedValues.map((val) => {
                      const opt = options.find((o) => o.value === val);
                      if (!opt) return null;
                      return (
                        <View
                          key={val}
                          className="bg-white/10 rounded-lg px-2 py-1 flex-row items-center gap-1"
                        >
                          <Typography variant="caption" className="text-white">
                            {opt.label}
                          </Typography>
                          <Pressable
                            onPress={(e) => {
                              e.stopPropagation();
                              handleRemoveChip(val);
                            }}
                            hitSlop={4}
                          >
                            <MaterialIcons name="close" size={14} color="rgba(255,255,255,0.5)" />
                          </Pressable>
                        </View>
                      );
                    })
                  ) : (
                    <Typography variant="body" className="text-neutral-400">
                      {placeholder}
                    </Typography>
                  )}
                </View>
                <MaterialIcons
                  name="expand-more"
                  size={20}
                  color="rgba(255,255,255,0.5)"
                  style={{ marginLeft: 8 }}
                />
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
                      const isChecked = selectedValues.includes(option.value);
                      return (
                        <React.Fragment key={option.value}>
                          {index > 0 && <View className="h-px bg-white/10" />}
                          <Pressable
                            onPress={() => handleToggle(option.value)}
                            className="flex-row items-center px-4 py-3"
                            style={webStyles}
                          >
                            <View
                              className={clsx(
                                'rounded border mr-3',
                                isChecked
                                  ? 'bg-primary border-primary'
                                  : 'border-white/30 bg-transparent',
                              )}
                              style={{
                                width: 18,
                                height: 18,
                                alignItems: 'center',
                                justifyContent: 'center',
                              }}
                            >
                              {isChecked && (
                                <MaterialIcons name="check" size={14} color="#ffffff" />
                              )}
                            </View>
                            <Typography variant="body" className="text-neutral-300">
                              {option.label}
                            </Typography>
                          </Pressable>
                        </React.Fragment>
                      );
                    })}
                  </ScrollView>
                  <View className="px-4 py-3 border-t border-white/10">
                    <Button
                      variant="contained"
                      size="sm"
                      label="Done"
                      onPress={() => setOpen(false)}
                    />
                  </View>
                </View>
              </Pressable>
            </Modal>
          </Field>
        );
      }}
    />
  );
}
