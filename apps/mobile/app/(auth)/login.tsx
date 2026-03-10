import { View, Text, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Gradients } from '../../src/constants/colors';

export default function LoginScreen() {
  return (
    <View className="flex-1 bg-black items-center justify-center px-6">
      <Text
        className="text-white text-3xl tracking-widest mb-10 text-center uppercase"
        style={{ fontFamily: 'Orbitron_600SemiBold' }}
      >
        FUELED.SHOWCASE
      </Text>

      <View className="w-full max-w-sm bg-white/5 border border-white/15 rounded-2xl p-6">
        <Text
          className="text-white text-lg mb-6 text-center"
          style={{ fontFamily: 'Inter_500Medium' }}
        >
          Magic link login coming in Phase 3
        </Text>

        <View className="w-full h-12 bg-white/10 border border-white/15 rounded-lg mb-4 justify-center px-4">
          <Text className="text-white/40" style={{ fontFamily: 'Inter_400Regular' }}>
            email@example.com
          </Text>
        </View>

        <Pressable className="w-full overflow-hidden rounded-lg">
          <LinearGradient
            colors={[...Gradients.primaryButton.colors]}
            start={Gradients.primaryButton.start}
            end={Gradients.primaryButton.end}
            className="h-12 items-center justify-center"
          >
            <Text
              className="text-white text-sm tracking-widest uppercase"
              style={{ fontFamily: 'Orbitron_600SemiBold' }}
            >
              SEND MAGIC LINK
            </Text>
          </LinearGradient>
        </Pressable>
      </View>
    </View>
  );
}
