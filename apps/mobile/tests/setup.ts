// Mock react-native-reanimated (inline mock to avoid native module init)
jest.mock('react-native-reanimated', () => {
  const { View } = require('react-native');
  return {
    __esModule: true,
    default: {
      call: () => {},
      createAnimatedComponent: (component: any) => component,
      addWhitelistedNativeProps: () => {},
      addWhitelistedUIProps: () => {},
      View,
    },
    useSharedValue: (initial: any) => ({ value: initial }),
    useDerivedValue: (fn: () => any) => ({ value: fn() }),
    useAnimatedStyle: (fn: () => any) => fn(),
    withTiming: (value: any) => value,
    withRepeat: (value: any) => value,
    withSequence: (...values: any[]) => values[0],
    Easing: { inOut: () => (t: any) => t, ease: (t: any) => t },
    interpolateColor: (_v: any, _i: any, o: any) => o[0],
    FadeIn: { duration: () => ({ delay: () => ({}) }) },
    FadeOut: { duration: () => ({ delay: () => ({}) }) },
    Layout: {},
    createAnimatedComponent: (component: any) => component,
  };
});

// Mock expo-linear-gradient
jest.mock('expo-linear-gradient', () => {
  const { View } = require('react-native');
  return {
    LinearGradient: View,
  };
});

// Mock @expo/vector-icons
jest.mock('@expo/vector-icons', () => {
  const { Text } = require('react-native');
  return {
    MaterialIcons: Text,
  };
});

// Mock expo-router
jest.mock('expo-router', () => ({
  useRouter: () => ({ push: jest.fn(), back: jest.fn(), replace: jest.fn() }),
  usePathname: () => '/',
  Stack: {
    Screen: () => null,
  },
}));

// Silence console warnings in tests
const originalWarn = console.warn;
console.warn = (...args: unknown[]) => {
  const message = typeof args[0] === 'string' ? args[0] : '';
  if (message.includes('Animated')) return;
  originalWarn(...args);
};
