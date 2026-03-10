import React, { useState } from 'react';
import { TextInput, Platform, type TextInputProps } from 'react-native';
import { Controller, Control, FieldPath, FieldValues } from 'react-hook-form';
import clsx from 'clsx';
import Field from './Field';

interface TextFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: FieldPath<T>;
  label?: string;
  helperText?: string;
  placeholder?: string;
  disabled?: boolean;
  secureTextEntry?: boolean;
  multiline?: boolean;
  numberOfLines?: number;
  keyboardType?: TextInputProps['keyboardType'];
  autoCapitalize?: TextInputProps['autoCapitalize'];
  autoComplete?: TextInputProps['autoComplete'];
  className?: string;
}

const webInputStyles = Platform.OS === 'web' ? { outlineStyle: 'none' as const } : {};

export default function TextField<T extends FieldValues>({
  control,
  name,
  label,
  helperText,
  placeholder,
  disabled = false,
  secureTextEntry,
  multiline,
  numberOfLines,
  keyboardType,
  autoCapitalize,
  autoComplete,
  className,
}: TextFieldProps<T>) {
  const [focused, setFocused] = useState(false);
  const [hovered, setHovered] = useState(false);

  const getBorderColor = (hasError: boolean) => {
    if (hasError) return '#ef4444';
    if (focused) return '#6E5BFF';
    if (hovered && !disabled) return 'rgba(59, 130, 246, 0.5)';
    return 'rgba(255, 255, 255, 0.15)';
  };

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
        <Field
          label={label}
          helperText={helperText}
          error={error}
          disabled={disabled}
          className={className}
        >
          <TextInput
            className={clsx(
              'bg-white/5 border rounded-xl px-4 py-3 text-white font-body text-base',
            )}
            style={[
              { borderColor: getBorderColor(!!error) },
              webInputStyles,
              disabled && Platform.OS === 'web' ? { cursor: 'not-allowed' } : {},
              multiline ? { textAlignVertical: 'top' as const } : undefined,
            ]}
            value={String(value ?? '')}
            onChangeText={onChange}
            onBlur={() => {
              setFocused(false);
              onBlur();
            }}
            onFocus={() => setFocused(true)}
            // @ts-expect-error - onMouseEnter/Leave available on web
            onMouseEnter={Platform.OS === 'web' ? () => setHovered(true) : undefined}
            // @ts-expect-error - onMouseEnter/Leave available on web
            onMouseLeave={Platform.OS === 'web' ? () => setHovered(false) : undefined}
            editable={!disabled}
            placeholder={placeholder}
            placeholderTextColor="rgb(156, 163, 175)"
            secureTextEntry={secureTextEntry}
            multiline={multiline}
            numberOfLines={numberOfLines}
            keyboardType={keyboardType}
            autoCapitalize={autoCapitalize}
            autoComplete={autoComplete}
          />
        </Field>
      )}
    />
  );
}
