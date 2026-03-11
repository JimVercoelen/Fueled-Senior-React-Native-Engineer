import React from 'react';
import { View } from 'react-native';
import { useForm } from 'react-hook-form';

export function FormTestWrapper({
  defaultValues,
  children,
}: {
  defaultValues: Record<string, any>;
  children: (control: any) => React.ReactNode;
}) {
  const { control } = useForm({ defaultValues });
  return <View>{children(control)}</View>;
}
