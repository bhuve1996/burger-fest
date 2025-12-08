// Prisma config for database connection
// Get DATABASE_URL from Supabase Dashboard → Settings → Database

import { defineConfig, env } from 'prisma/config';

export default defineConfig({
  schema: 'prisma/schema.prisma',
  migrations: {
    path: 'prisma/migrations',
  },
  datasource: {
    url: env('DATABASE_URL'),
    // For Supabase connection pooling
    // directUrl: env('DIRECT_URL'), // Optional: for migrations
  },
});
