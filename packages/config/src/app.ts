import { AppConfig } from './types';

// This will be moved to env variables later
// For now, keep in config for easy access
export const appConfig: AppConfig = {
  name: 'Burger Fest',
  version: '1.0.0',
  apiUrl: process.env.API_URL || 'http://localhost:3000',
  supabaseUrl: process.env.SUPABASE_URL || '',
  supabaseKey: process.env.SUPABASE_ANON_KEY || '',
  features: {
    socialLogin: true,
    magicLink: true,
    pushNotifications: true,
    offlineMode: true,
    analytics: true,
    moderation: true,
  },
};

// Environment detection
export const isDevelopment = process.env.NODE_ENV === 'development';
export const isProduction = process.env.NODE_ENV === 'production';
export const isTest = process.env.NODE_ENV === 'test';

