import { View, Text, Image } from 'react-native';
import { Stack, usePathname } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

function getScreenTitle(pathname: string): string | null {
  const segments = pathname.split('/').filter(Boolean);
  const last = segments[segments.length - 1];

  const titleMap: Record<string, string> = {
    'data-fetching': 'Data Fetching',
    'state-management': 'State Management',
    components: 'Components',
    about: 'About',
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
  const insets = useSafeAreaInsets();
  const screenTitle = getScreenTitle(pathname);
  useDocumentTitle(screenTitle);

  return (
    <View
      style={{ paddingTop: insets.top }}
      className="bg-black border-b border-white/15 px-4 pb-3"
    >
      <View className="flex-row items-center h-11 max-w-3xl mx-auto w-full">
        <Image
          source={require('../../assets/images/fueled-logo.png')}
          style={{ width: 100, height: 19 }}
          resizeMode="contain"
        />
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
      </View>
    </View>
  );
}

export default function DashboardLayout() {
  return (
    <View className="flex-1 bg-black">
      <DashboardHeader />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: '#000000' },
        }}
      >
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="data-fetching" />
        <Stack.Screen name="state-management" />
        <Stack.Screen name="components" />
        <Stack.Screen name="about" />
      </Stack>
    </View>
  );
}
