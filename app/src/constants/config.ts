import Constants from 'expo-constants';

import { AppExtra } from '@/types/config';

/**
 * Typed, read-only access to env-driven config injected via app.config.ts `extra`.
 * Screens and services import from here instead of touching process.env directly.
 */
const extra = (Constants.expoConfig?.extra ?? {}) as Partial<AppExtra>;

export const FIREBASE_CONFIG = extra.firebase ?? {
  apiKey: '',
  projectId: '',
  appId: '',
  messagingSenderId: '',
  storageBucket: '',
};

export const EAS_PROJECT_ID = extra.easProjectId ?? '';

/** Base URL of the admin panel used to register this device's push token. */
export const ADMIN_API_URL = (extra.adminApiUrl ?? '').replace(/\/$/, '');

/** True only when the value is a real key, so we can no-op SDKs in dev. */
export const isFirebaseConfigured = Boolean(FIREBASE_CONFIG.apiKey && FIREBASE_CONFIG.projectId);
