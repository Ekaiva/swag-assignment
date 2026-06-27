# Swag Assignment

Monorepo with the Expo mobile app and Vite admin panel for push notifications.

```
swag-assignment/
  app/       → Expo React Native app
  admin/     → Vite + React admin panel (deployed on Vercel)
```

## Setup

```bash
# Install dependencies for both packages
npm install

# Copy env templates (never commit .env files)
cp app/.env.example app/.env
cp admin/.env.example admin/.env
```

Fill in `app/.env` with your Firebase and EAS values. `admin/.env` is optional (KV storage for registered tokens).

## Run

**App (Expo):**

```bash
npm run app
# or: cd app && npm start
```

Scan the QR code in Expo Go / dev client to test push notifications on a physical device.

**Admin panel:**

```bash
npm run admin
# or: cd admin && npx vercel dev   (includes /api serverless routes)
```

Send push notifications from the admin panel to registered device tokens.

## Push to GitHub

`.env` files are gitignored at the repo root. Before pushing, verify nothing sensitive is staged:

```bash
git status
git check-ignore -v app/.env admin/.env
```
