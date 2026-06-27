import * as Updates from 'expo-updates';
import { useCallback, useEffect, useRef, useState } from 'react';

export type UpdateStatus = 'idle' | 'checking' | 'downloading' | 'applying' | 'error';

export interface UseAppUpdate {
  status: UpdateStatus;
  error: string | null;
  /** True while an OTA update is being checked, downloaded, or applied. */
  isBlocking: boolean;
  retry: () => void;
}

/**
 * Checks for an Expo OTA update on launch. When one is available the app downloads
 * it and reloads automatically — the user cannot skip (forced update).
 * No-ops in dev and when expo-updates is disabled (e.g. Expo Go).
 */
export function useAppUpdate(): UseAppUpdate {
  const [status, setStatus] = useState<UpdateStatus>('idle');
  const [error, setError] = useState<string | null>(null);
  const runId = useRef(0);

  const runUpdateCheck = useCallback(async () => {
    if (__DEV__ || !Updates.isEnabled) {
      setStatus('idle');
      setError(null);
      return;
    }

    const id = ++runId.current;
    setStatus('checking');
    setError(null);

    try {
      const check = await Updates.checkForUpdateAsync();
      if (id !== runId.current) return;

      if (!check.isAvailable) {
        setStatus('idle');
        return;
      }

      setStatus('downloading');
      const fetchResult = await Updates.fetchUpdateAsync();
      if (id !== runId.current) return;

      if (!fetchResult.isNew) {
        setStatus('idle');
        return;
      }

      setStatus('applying');
      await Updates.reloadAsync();
    } catch (err) {
      if (id !== runId.current) return;
      const message = err instanceof Error ? err.message : 'Update failed';
      console.log('[updates] OTA update error:', message);
      setError(message);
      setStatus('error');
    }
  }, []);

  useEffect(() => {
    runUpdateCheck();
  }, [runUpdateCheck]);

  const retry = useCallback(() => {
    runUpdateCheck();
  }, [runUpdateCheck]);

  const isBlocking = status === 'checking' || status === 'downloading' || status === 'applying';

  return { status, error, isBlocking, retry };
}
