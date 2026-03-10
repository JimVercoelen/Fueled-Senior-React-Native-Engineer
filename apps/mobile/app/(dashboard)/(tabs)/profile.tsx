import { View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Colors } from '@/constants/colors';
import { useSession } from '@/contexts/auth';
import { Button, Typography } from '@/components';

export default function ProfileScreen() {
  const { session, signOut } = useSession();

  return (
    <View className="flex-1 bg-black px-4 pt-4 max-w-3xl mx-auto w-full">
      <View className="bg-white/5 border border-white/15 rounded-xl p-5">
        <View className="flex-row items-center mb-4">
          <View className="w-12 h-12 rounded-full bg-white/10 items-center justify-center mr-4">
            <MaterialIcons name="person" size={20} color={Colors.textSecondary} />
          </View>
          <View>
            <Typography variant="label" className="mb-1">
              Signed in as
            </Typography>
            <Typography variant="body" className="text-white">
              {session?.user?.email ?? 'Not authenticated'}
            </Typography>
          </View>
        </View>
      </View>

      <View className="flex-1" />

      <Button
        variant="outlined"
        color="error"
        label="Sign Out"
        icon="logout"
        onPress={signOut}
        className="mb-8"
      />
    </View>
  );
}
