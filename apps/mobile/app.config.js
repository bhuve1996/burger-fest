const { config } = require('dotenv');
const { resolve } = require('path');

// Load .env from root folder BEFORE anything else
config({ path: resolve(__dirname, '../../.env') });

// Export config directly (not as a function)
module.exports = {
  expo: {
    name: 'Burger Fest',
    slug: 'burger-fest',
    version: '1.0.0',
    orientation: 'portrait',
    icon: './assets/icon.png',
    userInterfaceStyle: 'light',
    splash: {
      image: './assets/splash.png',
      resizeMode: 'contain',
      backgroundColor: '#ffffff',
    },
    assetBundlePatterns: ['**/*'],
    ios: {
      supportsTablet: true,
      bundleIdentifier: 'com.burgerfest.app',
    },
    android: {
      adaptiveIcon: {
        foregroundImage: './assets/adaptive-icon.png',
        backgroundColor: '#ffffff',
      },
      package: 'com.burgerfest.app',
    },
    web: {
      favicon: './assets/favicon.png',
    },
    scheme: 'burger-fest',
    plugins: [
      'expo-router',
      'react-native-reanimated/plugin',
      [
        'expo-build-properties',
        {
          ios: {
            useFrameworks: 'static',
          },
        },
      ],
    ],
    extra: {
      EXPO_PUBLIC_SUPABASE_URL:
        process.env.EXPO_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL || '',
      EXPO_PUBLIC_SUPABASE_ANON_KEY:
        process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY ||
        process.env.SUPABASE_ANON_KEY ||
        '',
      EXPO_PUBLIC_API_URL:
        process.env.EXPO_PUBLIC_API_URL ||
        process.env.API_URL ||
        'http://localhost:3000',
    },
  },
};
