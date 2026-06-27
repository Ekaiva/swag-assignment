import * as Notifications from 'expo-notifications';
import { Stack, router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { UpdateGate } from '@/components/UpdateGate';
import { useAppUpdate } from '@/hooks/useAppUpdate';
import { useNotifications } from '@/hooks/useNotifications';

// Show notifications while the app is in the foreground (otherwise no banner appears).
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

// Maps the admin panel's `screen` value to an Expo Router route.
const SCREEN_ROUTES: Record<string, string> = {
  '1': '/',
  '2': '/discover',
  '3': '/profile',
};

function navigateToScreen(screen: unknown) {
  if (typeof screen === 'string' && SCREEN_ROUTES[screen]) {
    router.push(SCREEN_ROUTES[screen] as never);
  }
}

export default function RootLayout() {
  const { status, error, isBlocking, retry } = useAppUpdate();

  // Requests permission and registers for an Expo push token on mount.
  useNotifications();

  useEffect(() => {
    // Deep-link when the user taps a notification (app running or backgrounded).
    const subscription = Notifications.addNotificationResponseReceivedListener((response) => {
      navigateToScreen(response.notification.request.content.data?.screen);
    });

    // Handle the case where the app was launched from a tapped notification (cold start).
    Notifications.getLastNotificationResponseAsync().then((response) => {
      navigateToScreen(response?.notification.request.content.data?.screen);
    });

    return () => subscription.remove();
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <StatusBar style="light" />
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(tabs)" />
        </Stack>
        <UpdateGate
          status={status}
          error={error}
          visible={isBlocking || status === 'error'}
          onRetry={retry}
        />
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
