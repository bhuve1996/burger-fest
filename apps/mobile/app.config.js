const { config } = require('dotenv');
const { resolve } = require('path');
const fs = require('fs');

// Load .env from root folder
config({ path: resolve(__dirname, '../../.env') });

// Read app.json
const appJson = JSON.parse(fs.readFileSync(resolve(__dirname, 'app.json'), 'utf8'));

// Merge environment variables
module.exports = {
  expo: {
    ...appJson.expo,
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

