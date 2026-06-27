import { ExpoConfig, ConfigContext } from 'expo/config';

import { BRAND_BACKGROUND, LOGO_URL } from './src/constants/assets';

const env = {
  firebase: {
    apiKey: process.env.FIREBASE_API_KEY ?? '',
    projectId: process.env.FIREBASE_PROJECT_ID ?? '',
    appId: process.env.FIREBASE_APP_ID ?? '',
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID ?? '',
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET ?? '',
  },
  easProjectId: process.env.EAS_PROJECT_ID ?? '',
  adminApiUrl: process.env.ADMIN_API_URL ?? '',
};

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: 'Swag',
  slug: 'swag-app',
  scheme: 'swag',
  version: '1.0.0',
  orientation: 'portrait',
  userInterfaceStyle: 'dark',
  jsEngine: 'hermes',
  icon: './assets/icon.png',
  splash: {
    image: './assets/splash.png',
    resizeMode: 'contain',
    backgroundColor: BRAND_BACKGROUND,
  },
  updates: {
    url: `https://u.expo.dev/${env.easProjectId || '10c18400-1187-4785-a7db-115af922329c'}`,
    fallbackToCacheTimeout: 0,
  },
  runtimeVersion: { policy: 'appVersion' },
  ios: {
    bundleIdentifier: 'gg.swag.app',
    supportsTablet: true,
    icon: './assets/icon.png',
  },
  android: {
    package: 'gg.swag.app',
    googleServicesFile: './google-services.json',
    adaptiveIcon: {
      foregroundImage: './assets/icon.png',
      backgroundColor: BRAND_BACKGROUND,
    },
  },
plugins: [
  'expo-router',
  [
    'expo-splash-screen',
    {
      image: './assets/splash.png',
      resizeMode: 'contain',
      backgroundColor: BRAND_BACKGROUND,
    },
  ],
  [
    'expo-notifications',
    {
      defaultChannel: 'default',
    },
  ],
  'expo-updates',
],
extra: {
  ...env,
  logoUrl: LOGO_URL,
  eas: { projectId: env.easProjectId || '10c18400-1187-4785-a7db-115af922329c' },
},
});