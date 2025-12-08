const { config } = require('dotenv');
const { resolve } = require('path');

// Load .env from root folder
config({ path: resolve(__dirname, '../../.env') });

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Next.js App Router requires 'app' directory, but we're using 'webapp' for clarity
  // We'll need to use pages directory or configure differently
  env: {
    // Expose NEXT_PUBLIC_* variables from root .env
    NEXT_PUBLIC_SUPABASE_URL:
      process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY:
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
      process.env.SUPABASE_ANON_KEY,
    NEXT_PUBLIC_API_URL:
      process.env.NEXT_PUBLIC_API_URL ||
      process.env.API_URL ||
      'http://localhost:3000',
  },
};

module.exports = nextConfig;
