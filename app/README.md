# Swag App

A React Native (Expo) app with three screens and Firebase-backed push notifications.

## Screens

The app uses `expo-router` with a floating bottom tab bar (`src/app/(tabs)`):

- **Home** (`index.tsx`) — shows notification permission/token status and lets you send a test notification.
- **Discover** (`discover.tsx`) — a simple content list.
- **Profile** (`profile.tsx`) — a basic profile/stats screen.

## Notifications

Notification logic lives in one place: `src/hooks/useNotifications.ts`.

- Requests OS permission and (on a physical device) registers an Expo push token.
- Exposes `sendLocalNotification(title, body, screen?)` used by the Home screen so the feature is demonstrable on any device or emulator.
- `src/app/_layout.tsx` sets the foreground notification handler and deep-links to the matching screen when a notification is tapped (`data.screen` → `1` Home, `2` Discover, `3` Profile).

Firebase is configured via `google-services.json` (Android) and `app.config.ts`, which injects `FIREBASE_*` env vars into `expo.extra` (read in `src/constants/config.ts`).

> Local notifications work everywhere. A real Expo **push** token additionally requires a physical device and a valid `EAS_PROJECT_ID`.

## OTA updates (forced)

On launch, production builds check EAS Update for a new OTA bundle (`src/hooks/useAppUpdate.ts`). When one is available the app downloads it and reloads automatically — users see a blocking `UpdateGate` screen until the update is applied. Dev builds and Expo Go skip this check.

Publish an OTA update:

```bash
cd app
eas update --channel production --message "Your update message"
```

The update channel must match the channel used when the native build was created (`eas build --profile production`).

## Setup

```bash
npm install
cp .env.example .env   # fill in Firebase / EAS values
```

## Run

```bash
npm start          # Expo dev server
npm run android    # Android
npm run ios        # iOS
```

## Scripts

- `npm run typecheck` — TypeScript, no emit
- `npm run lint` — ESLint
- `npm run format` — Prettier
# swag-app
