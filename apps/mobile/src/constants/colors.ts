export const Colors = {
  primary: '#2563eb',
  accent: '#06b6d4',
  danger: '#ef4444',
  dangerOrange: '#f97316',
  gray500: '#6b7280',
  background: '#000000',
  surface: 'rgba(255, 255, 255, 0.05)',
  surfaceLight: 'rgba(255, 255, 255, 0.1)',
  border: 'rgba(255, 255, 255, 0.15)',
  borderLight: 'rgba(255, 255, 255, 0.2)',
  textPrimary: '#ffffff',
  textSecondary: 'rgba(255, 255, 255, 0.7)',
} as const;

export const Gradients = {
  primary: ['#2563eb', '#06b6d4'] as const,
  danger: ['#ef4444', '#f97316'] as const,
  primaryButton: {
    colors: ['#2563eb', '#06b6d4'] as const,
    start: { x: 0, y: 0 },
    end: { x: 1, y: 1 },
  },
} as const;
