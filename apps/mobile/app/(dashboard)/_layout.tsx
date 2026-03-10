import { useEffect } from 'react';
import { View, Text, Image, Pressable } from 'react-native';
import { Stack, usePathname, useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
  Easing,
  interpolateColor,
} from 'react-native-reanimated';
import { Colors } from '@/constants/colors';

function getScreenTitle(pathname: string): string | null {
  const segments = pathname.split('/').filter(Boolean);
  const last = segments[segments.length - 1];

  const titleMap: Record<string, string> = {
    'data-fetching': 'Data Fetching',
    'state-management': 'State Management',
    components: 'Components',
    about: 'About',
    profile: 'Profile',
  };

  return titleMap[last] || null;
}

function useDocumentTitle(screenTitle: string | null) {
  const title = screenTitle ? `${screenTitle} | Fueled` : 'Fueled';
  if (typeof document !== 'undefined') {
    document.title = title;
  }
}

function DashboardHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const screenTitle = getScreenTitle(pathname);
  useDocumentTitle(screenTitle);
  const isProfile = pathname.includes('profile');

  return (
    <View className="bg-black border-b border-white/15 px-4 py-3">
      <View className="flex-row items-center h-11 max-w-3xl mx-auto w-full">
        <Pressable onPress={() => router.push('/(dashboard)')}>
          <Image
            source={require('../../assets/images/fueled-logo.png')}
            style={{ width: 100, height: 19 }}
            resizeMode="contain"
          />
        </Pressable>
        {screenTitle && (
          <>
            <Text
              className="text-white/50 text-base mx-3"
              style={{ fontFamily: 'Inter_400Regular' }}
            >
              /
            </Text>
            <Text className="text-white/70 text-base" style={{ fontFamily: 'Inter_500Medium' }}>
              {screenTitle}
            </Text>
          </>
        )}
        <View className="flex-1" />
        <Pressable
          onPress={() => router.push('/(dashboard)/profile')}
          className="flex-row items-center gap-2"
          style={{ opacity: isProfile ? 1 : 0.6 }}
        >
          <MaterialIcons name="person" size={20} color={Colors.textPrimary} />
        </Pressable>
      </View>
    </View>
  );
}

function AnimatedBackground() {
  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = withRepeat(
      withSequence(
        withTiming(1, { duration: 6000, easing: Easing.inOut(Easing.ease) }),
        withTiming(0, { duration: 6000, easing: Easing.inOut(Easing.ease) }),
      ),
      -1,
    );
  }, [progress]);

  const animatedStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      progress.value,
      [0, 0.5, 1],
      ['#000000', '#1a0d3a', '#000000'],
    ),
  }));

  return (
    <Animated.View
      style={[{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }, animatedStyle]}
    >
      <LinearGradient
        colors={['#3d2a7a', '#1a0e3a', 'transparent']}
        locations={[0, 0.3, 0.55]}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
      />
    </Animated.View>
  );
}

export default function DashboardLayout() {
  return (
    <View className="flex-1" style={{ backgroundColor: '#000000' }}>
      <AnimatedBackground />
      <DashboardHeader />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: 'transparent' },
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="profile" />
        <Stack.Screen name="data-fetching" />
        <Stack.Screen name="state-management" />
        <Stack.Screen name="components" />
        <Stack.Screen name="about" />
      </Stack>
    </View>
  );
}
