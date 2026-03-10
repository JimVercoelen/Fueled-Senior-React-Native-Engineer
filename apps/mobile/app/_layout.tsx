import '../global.css';

import { useFonts } from 'expo-font';
import { Orbitron_600SemiBold } from '@expo-google-fonts/orbitron';
import { Inter_400Regular, Inter_500Medium, Inter_600SemiBold } from '@expo-google-fonts/inter';
import * as SplashScreen from 'expo-splash-screen';
import { Stack } from 'expo-router';
import { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { AuthProvider, useSession } from '../src/contexts/auth';

SplashScreen.preventAutoHideAsync();

function RootNavigator() {
  const { session, isLoading } = useSession();

  if (isLoading) return null;

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: '#000000' },
      }}
    >
      <Stack.Protected guard={!!session}>
        <Stack.Screen name="(dashboard)" />
      </Stack.Protected>
      <Stack.Protected guard={!session}>
        <Stack.Screen name="(auth)" />
      </Stack.Protected>
    </Stack>
  );
}

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Orbitron_600SemiBold,
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;

  return (
    <>
      <StatusBar style="light" />
      <AuthProvider>
        <RootNavigator />
      </AuthProvider>
    </>
  );
}
