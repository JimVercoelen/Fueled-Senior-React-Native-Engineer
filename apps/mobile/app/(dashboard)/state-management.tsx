import { View, Text } from 'react-native';

export default function StateManagementScreen() {
  return (
    <View
      className="flex-1 items-center justify-center px-6 max-w-3xl mx-auto w-full"
      style={{ backgroundColor: 'transparent' }}
    >
      <Text
        className="text-white text-2xl tracking-wider uppercase mb-3 text-center"
        style={{ fontFamily: 'Inter_600SemiBold' }}
      >
        State Management
      </Text>
      <Text
        className="text-white/50 text-base text-center"
        style={{ fontFamily: 'Inter_400Regular' }}
      >
        Coming in Phase 5
      </Text>
      <Text
        className="text-white/30 text-sm text-center mt-4"
        style={{ fontFamily: 'Inter_400Regular' }}
      >
        Cache viewer, toast system, modal system
      </Text>
    </View>
  );
}
