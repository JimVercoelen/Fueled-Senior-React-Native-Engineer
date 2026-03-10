import React, { useRef, useState, useCallback } from 'react';
import { Modal, Pressable, ScrollView, View } from 'react-native';
import { Controller, Control, FieldPath, FieldValues } from 'react-hook-form';
import { MaterialIcons } from '@expo/vector-icons';
import clsx from 'clsx';
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
                className={clsx(
                  'bg-white/5 border rounded-xl px-4 py-3 flex-row items-center justify-between',
                  error ? 'border-red-500' : 'border-white/15',
                )}
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
                            className={clsx(
                              'flex-row items-center justify-between px-4 py-3',
                              isSelected && 'bg-white/5',
                            )}
                          >
                            <Typography variant="body" className="text-neutral-300">
                              {option.label}
                            </Typography>
                            {isSelected && <MaterialIcons name="check" size={20} color="#2563eb" />}
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
