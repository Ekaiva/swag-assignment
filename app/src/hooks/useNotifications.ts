import Constants from 'expo-constants';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { useCallback, useEffect, useState } from 'react';
import { Platform } from 'react-native';

import { ADMIN_API_URL } from '@/constants/config';

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const NIL_UUID = '00000000-0000-0000-0000-000000000000';

export type PermissionStatus = 'undetermined' | 'granted' | 'denied';

export interface UseNotifications {
  /** Current OS permission status for notifications. */
  permission: PermissionStatus;
  /** Expo push token, available only on a physical device with a valid EAS project id. */
  pushToken: string | null;
  /** Request permission (and register for a push token) on demand. */
  requestPermission: () => Promise<boolean>;
  /** Fire a local notification immediately so the feature is demonstrable on any device/emulator. */
  sendLocalNotification: (title: string, body: string, screen?: string) => Promise<void>;
}

function resolveEasProjectId(): string | undefined {
  const projectId = Constants.expoConfig?.extra?.eas?.projectId ?? Constants.easConfig?.projectId;
  if (!projectId || projectId === NIL_UUID || !UUID_RE.test(projectId)) return undefined;
  return projectId;
}

/**
 * Send the device's Expo push token to the admin backend so it can target this
 * device (and appear in the "all registered tokens" list). No-ops if ADMIN_API_URL
 * is unset. Failures are non-fatal — local notifications still work.
 */
async function registerTokenWithAdmin(token: string) {
  console.log('[push] registerTokenWithAdmin called with token:', token);
  console.log('[push] ADMIN_API_URL:', ADMIN_API_URL);
  if (!ADMIN_API_URL) {
    console.log('[push] ADMIN_API_URL not set; skipping remote token registration.');
    return;
  }
  try {
    const response = await fetch(`${ADMIN_API_URL}/api/tokens`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token }),
    });
    if (!response.ok) {
      console.log('[push] Token registration failed:', response);
      return;
    }
    console.log('[push] Token registered with admin backend.');
  } catch (err) {
    console.log('[push] Token registration error:', err);
  }
}

/** Ensure an Android notification channel exists (required for headsup banners on Android 8+). */
async function ensureAndroidChannel() {
  if (Platform.OS !== 'android') return;
  await Notifications.setNotificationChannelAsync('default', {
    name: 'Default',
    importance: Notifications.AndroidImportance.MAX,
    vibrationPattern: [0, 250, 250, 250],
    lightColor: '#FFFFFF',
  });
}

/**
 * Single source of truth for notification behaviour in the app:
 * permission state, Expo push-token registration, and sending local notifications.
 */
export function useNotifications(): UseNotifications {
  const [permission, setPermission] = useState<PermissionStatus>('undetermined');
  const [pushToken, setPushToken] = useState<string | null>(null);

  const registerPushToken = useCallback(async () => {
    if (!Device.isDevice) {
      console.log('[push] Must use a physical device for a push token');
      return;
    }
    const projectId = resolveEasProjectId();
    if (!projectId) {
      console.log(
        '[push] Skipping push registration: set EAS_PROJECT_ID to a valid EAS project UUID.',
      );
      return;
    }
    const { data } = await Notifications.getExpoPushTokenAsync({ projectId });
    setPushToken(data);
    console.log('[push] Expo push token:', data);
    await registerTokenWithAdmin(data);
  }, []);

  const requestPermission = useCallback(async () => {
    await ensureAndroidChannel();
    const { status: existing } = await Notifications.getPermissionsAsync();
    let finalStatus = existing;
    if (existing !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    const granted = finalStatus === 'granted';
    setPermission(granted ? 'granted' : finalStatus === 'denied' ? 'denied' : 'undetermined');
    if (granted) {
      await registerPushToken().catch((err) =>
        console.log('[push] Failed to get Expo push token:', err),
      );
    }
    return granted;
  }, [registerPushToken]);

  const sendLocalNotification = useCallback(
    async (title: string, body: string, screen?: string) => {
      const granted = permission === 'granted' ? true : await requestPermission();
      if (!granted) return;
      await Notifications.scheduleNotificationAsync({
        content: { title, body, sound: 'default', data: screen ? { screen } : {} },
        trigger: null,
      });
    },
    [permission, requestPermission],
  );

  useEffect(() => {
    ensureAndroidChannel();
    Notifications.getPermissionsAsync().then(({ status }) => {
      setPermission(
        status === 'granted' ? 'granted' : status === 'denied' ? 'denied' : 'undetermined',
      );
      if (status === 'granted') {
        registerPushToken().catch((err) =>
          console.log('[push] Failed to get Expo push token:', err),
        );
      }
    });
  }, [registerPushToken]);

  return { permission, pushToken, requestPermission, sendLocalNotification };
}
