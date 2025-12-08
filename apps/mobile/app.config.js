const { config } = require('dotenv');
const { resolve } = require('path');
const baseConfig = require('./app.json');

// Load .env from root folder
config({ path: resolve(__dirname, '../../.env') });

module.exports = {
  ...baseConfig,
  expo: {
    ...baseConfig.expo,
    extra: {
      // Expose EXPO_PUBLIC_* variables from root .env
      EXPO_PUBLIC_SUPABASE_URL:
        process.env.EXPO_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL,
      EXPO_PUBLIC_SUPABASE_ANON_KEY:
        process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY ||
        process.env.SUPABASE_ANON_KEY,
      EXPO_PUBLIC_API_URL:
        process.env.EXPO_PUBLIC_API_URL ||
        process.env.API_URL ||
        'http://localhost:3000',
    },
  },
};
