import { View, Text, Pressable } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Colors } from '../../../src/constants/colors';
import { useSession } from '../../../src/contexts/auth';

export default function ProfileScreen() {
  const { session, signOut } = useSession();

  return (
    <View className="flex-1 bg-black px-4 pt-4">
      <Text
        className="text-white text-2xl tracking-wider uppercase mb-6 text-center"
        style={{ fontFamily: 'Orbitron_600SemiBold' }}
      >
        Profile
      </Text>

      <View className="bg-white/5 border border-white/15 rounded-xl p-5">
        <View className="flex-row items-center mb-4">
          <View className="w-12 h-12 rounded-full bg-white/10 items-center justify-center mr-4">
            <FontAwesome name="user" size={20} color={Colors.textSecondary} />
          </View>
          <View>
            <Text
              className="text-white/50 text-xs uppercase tracking-wider mb-1"
              style={{ fontFamily: 'Inter_500Medium' }}
            >
              Signed in as
            </Text>
            <Text className="text-white text-base" style={{ fontFamily: 'Inter_500Medium' }}>
              {session?.user?.email ?? 'Not authenticated'}
            </Text>
          </View>
        </View>
      </View>

      <View className="flex-1" />

      <Pressable
        className="bg-danger/10 border border-danger/30 rounded-xl py-3 items-center mb-8 active:opacity-70"
        onPress={signOut}
      >
        <Text
          className="text-danger text-sm tracking-widest uppercase"
          style={{ fontFamily: 'Orbitron_600SemiBold' }}
        >
          SIGN OUT
        </Text>
      </Pressable>
    </View>
  );
}
