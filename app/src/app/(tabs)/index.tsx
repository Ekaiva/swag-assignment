import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Button } from '@/components/Button';
import { ScreenContainer } from '@/components/ScreenContainer';
import { useNotifications } from '@/hooks/useNotifications';

const PERMISSION_LABEL: Record<string, string> = {
  granted: 'Granted',
  denied: 'Denied',
  undetermined: 'Not requested',
};

export default function HomeScreen() {
  const { permission, pushToken, requestPermission, sendLocalNotification } = useNotifications();
  const [sending, setSending] = useState(false);

  const onSendTest = async () => {
    setSending(true);
    try {
      await sendLocalNotification(
        'Welcome to Swag',
        'This is a test notification fired from the Home screen.',
        '3',
      );
    } finally {
      setSending(false);
    }
  };

  return (
    <ScreenContainer
      title="Swag"
      subtitle="A starter app demonstrating three screens and Firebase-backed push notifications."
    >
      <View style={styles.card}>
        <View style={styles.row}>
          <Text style={styles.cardLabel}>Permission</Text>
          <Text style={styles.cardValue}>{PERMISSION_LABEL[permission]}</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.row}>
          <Text style={styles.cardLabel}>Push token</Text>
          <Text style={styles.cardValue}>{pushToken ? 'Registered' : 'Unavailable'}</Text>
        </View>
      </View>

      {permission !== 'granted' ? (
        <Button label="Enable notifications" onPress={requestPermission} />
      ) : null}

      <Button
        label="Send a test notification"
        variant={permission === 'granted' ? 'primary' : 'secondary'}
        loading={sending}
        onPress={onSendTest}
      />

      <Text style={styles.hint}>
        Local notifications work on any device or emulator. A real Expo push token additionally
        requires a physical device and a valid EAS project id.
      </Text>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '100%',
    backgroundColor: '#111111',
    borderRadius: 16,
    paddingHorizontal: 18,
    paddingVertical: 6,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#2a2a2a',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#2a2a2a',
  },
  cardLabel: {
    color: '#9a9a9a',
    fontSize: 15,
  },
  cardValue: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '600',
  },
  hint: {
    color: '#6a6a6a',
    fontSize: 13,
    lineHeight: 19,
    textAlign: 'center',
  },
});
