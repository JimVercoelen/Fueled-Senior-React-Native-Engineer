import React, { useState } from 'react';
import { TextInput } from 'react-native';
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
  className?: string;
}

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
  className,
}: TextFieldProps<T>) {
  const [focused, setFocused] = useState(false);

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
              error ? 'border-red-500' : focused ? 'border-primary' : 'border-white/15',
            )}
            value={String(value ?? '')}
            onChangeText={onChange}
            onBlur={() => {
              setFocused(false);
              onBlur();
            }}
            onFocus={() => setFocused(true)}
            editable={!disabled}
            placeholder={placeholder}
            placeholderTextColor="rgb(156, 163, 175)"
            secureTextEntry={secureTextEntry}
            multiline={multiline}
            numberOfLines={numberOfLines}
            style={multiline ? { textAlignVertical: 'top' } : undefined}
          />
        </Field>
      )}
    />
  );
}
