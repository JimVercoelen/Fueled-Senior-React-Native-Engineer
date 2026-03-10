import React from 'react';
import { Text, type TextProps } from 'react-native';
import clsx from 'clsx';

export type TypographyVariant = 'h1' | 'h2' | 'h3' | 'body' | 'caption' | 'label' | 'button';

interface TypographyProps extends Omit<TextProps, 'className'> {
  variant?: TypographyVariant;
  className?: string;
  children: React.ReactNode;
}

const variantClasses: Record<TypographyVariant, string> = {
  h1: 'text-2xl font-heading tracking-tight text-white',
  h2: 'text-xl font-heading tracking-tight text-white',
  h3: 'text-lg font-heading text-white',
  body: 'text-base font-body text-neutral-300',
  caption: 'text-sm font-body text-neutral-400',
  label: 'text-sm font-body-semibold text-neutral-300 uppercase tracking-wider',
  button: 'text-base font-body-semibold uppercase tracking-wider',
};

export default function Typography({
  variant = 'body',
  className,
  children,
  ...rest
}: TypographyProps) {
  return (
    <Text className={clsx(variantClasses[variant], className)} {...rest}>
      {children}
    </Text>
  );
}
