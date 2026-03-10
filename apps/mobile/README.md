# Mobile App

Expo React Native app with NativeWind styling and Expo Router navigation.

## Setup

```bash
cd apps/mobile
npm install

# Create environment file
cp .env.example .env.local
```

Add your Supabase credentials to `.env.local`:

```
EXPO_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

## Running

```bash
# Web
npx expo start --web

# iOS Simulator
npx expo start --ios

# Android Emulator
npx expo start --android
```

## Project Structure

```
app/                  → Expo Router file-based routes
  (auth)/             → Login and auth screens
  (dashboard)/        → Authenticated screens
    (tabs)/           → Tab bar navigation (Dashboard, Profile)
src/
  components/         → Reusable UI components
  constants/          → Colors, theme tokens
  contexts/           → React contexts (auth)
  lib/                → External service clients (Supabase)
```
