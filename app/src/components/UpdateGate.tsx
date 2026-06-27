import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

import { Button } from '@/components/Button';
import { BRAND_BACKGROUND } from '@/constants/assets';
import type { UpdateStatus } from '@/hooks/useAppUpdate';

const STATUS_COPY: Record<Exclude<UpdateStatus, 'idle'>, { title: string; body: string }> = {
  checking: {
    title: 'Checking for updates',
    body: 'Please wait while we verify you have the latest version.',
  },
  downloading: {
    title: 'Update available',
    body: 'Downloading the latest version. The app will restart when ready.',
  },
  applying: {
    title: 'Applying update',
    body: 'Restarting with the latest version…',
  },
  error: {
    title: 'Update required',
    body: 'We could not download the latest version. Check your connection and try again.',
  },
};

interface Props {
  status: UpdateStatus;
  error: string | null;
  visible: boolean;
  onRetry: () => void;
}

/** Full-screen gate shown while a forced OTA update is in progress. */
export function UpdateGate({ status, error, visible, onRetry }: Props) {
  if (!visible || status === 'idle') return null;

  const copy = STATUS_COPY[status];

  return (
    <View style={styles.overlay} accessibilityViewIsModal>
      <ActivityIndicator color="#ffffff" size="large" />
      <Text style={styles.title}>{copy.title}</Text>
      <Text style={styles.body}>{error ?? copy.body}</Text>
      {status === 'error' ? (
        <View style={styles.actions}>
          <Button label="Try again" onPress={onRetry} />
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 999,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: BRAND_BACKGROUND,
    paddingHorizontal: 32,
    gap: 16,
  },
  title: {
    color: '#ffffff',
    fontSize: 22,
    fontWeight: '700',
    textAlign: 'center',
    marginTop: 8,
  },
  body: {
    color: '#a3a3a3',
    fontSize: 15,
    lineHeight: 22,
    textAlign: 'center',
  },
  actions: {
    marginTop: 8,
    width: '100%',
    maxWidth: 280,
  },
});
