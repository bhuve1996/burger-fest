// Prisma config for database connection
// DATABASE_URL from root .env or server/.env

import { defineConfig, env } from 'prisma/config';
import { config } from 'dotenv';
import { resolve } from 'path';

// Load .env from root or server folder
config({ path: resolve(__dirname, '../../.env') });
config({ path: resolve(__dirname, '.env') }); // Fallback to server/.env

export default defineConfig({
  schema: 'prisma/schema.prisma',
  migrations: {
    path: 'prisma/migrations',
  },
  datasource: {
    url: env('DATABASE_URL'),
  },
});
