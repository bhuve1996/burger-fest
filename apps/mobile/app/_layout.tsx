import { Stack } from 'expo-router';
import { useEffect } from 'react';
import { LogBox } from 'react-native';

export default function RootLayout() {
  useEffect(() => {
    // Suppress known deprecation warning from Expo Router internals
    // This will be fixed in future Expo Router updates
    LogBox.ignoreLogs([
      'props.pointerEvents is deprecated. Use style.pointerEvents',
    ]);
  }, []);

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
    </Stack>
  );
}
