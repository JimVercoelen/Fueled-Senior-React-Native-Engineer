import { View, Text } from 'react-native';

export default function ComponentsScreen() {
  return (
    <View className="flex-1 bg-black items-center justify-center px-6">
      <Text
        className="text-white text-2xl tracking-wider uppercase mb-3 text-center"
        style={{ fontFamily: 'Orbitron_600SemiBold' }}
      >
        Component Library
      </Text>
      <Text
        className="text-white/50 text-base text-center"
        style={{ fontFamily: 'Inter_400Regular' }}
      >
        Coming in Phase 2
      </Text>
      <Text
        className="text-white/30 text-sm text-center mt-4"
        style={{ fontFamily: 'Inter_400Regular' }}
      >
        MUI-style interactive playground with all UI components
      </Text>
    </View>
  );
}
