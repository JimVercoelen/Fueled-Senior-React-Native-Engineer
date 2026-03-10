import React from 'react';
import { Pressable, View, Platform } from 'react-native';
import { Controller, Control, FieldPath, FieldValues } from 'react-hook-form';
import { MaterialIcons } from '@expo/vector-icons';
import clsx from 'clsx';
import Typography from '../ui/Typography';
import Field from './Field';

interface CheckboxProps<T extends FieldValues> {
  control: Control<T>;
  name: FieldPath<T>;
  label?: string;
  helperText?: string;
  disabled?: boolean;
  className?: string;
}

const webStyles =
  Platform.OS === 'web' ? { outlineStyle: 'none' as const, userSelect: 'none' as const } : {};

export default function Checkbox<T extends FieldValues>({
  control,
  name,
  label,
  helperText,
  disabled = false,
  className,
}: CheckboxProps<T>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <Field
          label={undefined}
          helperText={helperText}
          error={error}
          disabled={disabled}
          className={className}
        >
          <Pressable
            onPress={disabled ? undefined : () => onChange(!value)}
            className="flex-row items-center gap-3"
            disabled={disabled}
            style={[webStyles, disabled && Platform.OS === 'web' ? { cursor: 'not-allowed' } : {}]}
          >
            <View
              className={clsx(
                'rounded border',
                value ? 'bg-primary border-primary' : 'border-white/30 bg-transparent',
              )}
              style={{
                width: 20,
                height: 20,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {value && <MaterialIcons name="check" size={14} color="#ffffff" />}
            </View>
            {label != null && (
              <Typography variant="body" className="text-neutral-300">
                {label}
              </Typography>
            )}
          </Pressable>
        </Field>
      )}
    />
  );
}
