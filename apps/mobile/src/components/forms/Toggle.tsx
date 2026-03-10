import React from 'react';
import { Pressable, View, Platform } from 'react-native';
import { Controller, Control, FieldPath, FieldValues } from 'react-hook-form';
import Animated, { useAnimatedStyle, withTiming, useDerivedValue } from 'react-native-reanimated';
import clsx from 'clsx';
import Typography from '../ui/Typography';
import Field from './Field';

interface ToggleProps<T extends FieldValues> {
  control: Control<T>;
  name: FieldPath<T>;
  label?: string;
  helperText?: string;
  disabled?: boolean;
  className?: string;
}

const webStyles =
  Platform.OS === 'web' ? { outlineStyle: 'none' as const, userSelect: 'none' as const } : {};

export default function Toggle<T extends FieldValues>({
  control,
  name,
  label,
  helperText,
  disabled = false,
  className,
}: ToggleProps<T>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <ToggleInner
          label={label}
          helperText={helperText}
          error={error}
          disabled={disabled}
          className={className}
          value={!!value}
          onToggle={() => onChange(!value)}
        />
      )}
    />
  );
}

interface ToggleInnerProps {
  label?: string;
  helperText?: string;
  error?: { message?: string } | null;
  disabled: boolean;
  className?: string;
  value: boolean;
  onToggle: () => void;
}

function ToggleInner({
  label,
  helperText,
  error,
  disabled,
  className,
  value,
  onToggle,
}: ToggleInnerProps) {
  const translateX = useDerivedValue(() => withTiming(value ? 22 : 4, { duration: 200 }));

  const thumbStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  return (
    <Field
      label={undefined}
      helperText={helperText}
      error={error}
      disabled={disabled}
      className={className}
    >
      <Pressable
        onPress={disabled ? undefined : onToggle}
        disabled={disabled}
        style={[webStyles, disabled && Platform.OS === 'web' ? { cursor: 'not-allowed' } : {}]}
      >
        <View className="flex-row items-center justify-between">
          {label != null && (
            <Typography variant="body" className="flex-1 mr-3 text-white">
              {label}
            </Typography>
          )}
          <View
            className={clsx(
              'rounded-full border',
              value ? 'bg-primary border-primary' : 'bg-white/10 border-white/20',
            )}
            style={{ width: 48, height: 28, justifyContent: 'center' }}
          >
            <Animated.View
              style={[
                {
                  width: 20,
                  height: 20,
                  borderRadius: 10,
                  backgroundColor: '#ffffff',
                },
                thumbStyle,
              ]}
            />
          </View>
        </View>
      </Pressable>
    </Field>
  );
}
