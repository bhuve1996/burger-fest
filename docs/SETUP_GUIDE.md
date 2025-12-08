# Setup Guide - Step by Step

## Prerequisites

- Node.js 18+ installed
- Git installed
- Supabase account (free)
- Vercel account (free)
- GitHub account

---

## Phase 1: Infrastructure Setup (Day 1)

### 1.1 Supabase Setup

1. Go to [supabase.com](https://supabase.com) → Create project
2. Get `SUPABASE_URL` and `SUPABASE_ANON_KEY` from Settings → API
3. Enable Auth providers: Email (default), Google (add Client ID/Secret)
4. Create storage bucket: `burger-photos` (public)

### 1.2 GitHub Setup

1. Repository already created: `https://github.com/bhuve1996/burger-fest.git`
2. Clone locally (if not done): `git clone https://github.com/bhuve1996/burger-fest.git`

---

## Phase 2: Monorepo Setup (Day 1)

### 2.1 Initialize Monorepo

```bash
# Install pnpm (better for monorepos)
npm install -g pnpm

# Create workspace structure
mkdir -p apps/mobile apps/admin packages/api packages/types packages/services packages/config server

# Create root package.json
```

### 2.2 Setup Root Package.json

```json
{
  "name": "burger-fest",
  "private": true,
  "workspaces": ["apps/*", "packages/*", "server"],
  "scripts": {
    "dev:mobile": "npm run dev --workspace=@burger-fest/mobile",
    "dev:admin": "npm run dev --workspace=@burger-fest/admin",
    "dev:server": "npm run dev --workspace=@burger-fest/server",
    "build": "npm run build --workspaces --if-present"
  },
  "devDependencies": {
    "typescript": "^5.0.0"
  }
}
```

**Note:** Turbo is optional - we're proceeding without it for now. Can add later if needed for faster builds.

---

## Phase 3: Backend Setup (Day 1-2)

### 3.1 Initialize Fastify Server

```bash
cd server
pnpm init
pnpm add fastify @fastify/cors @fastify/rate-limit
pnpm add -D @types/node typescript tsx
pnpm add @supabase/supabase-js prisma @prisma/client
```

### 3.2 Setup Prisma

```bash
pnpm prisma init
# Update prisma/schema.prisma with Supabase connection
# DATABASE_URL from Supabase → Settings → Database
```

### 3.3 Create Basic Server ✅ DONE

```typescript
// server/src/index.ts
import Fastify from 'fastify';
import cors from '@fastify/cors';
import rateLimit from '@fastify/rate-limit';

const fastify = Fastify({ logger: true });

// Register plugins
fastify.register(cors);
fastify.register(rateLimit, {
  max: 100,
  timeWindow: '1 minute',
});

// Health check route
fastify.get('/health', async () => {
  return { status: 'ok' };
});

// Start server
const start = async () => {
  try {
    await fastify.listen({ port: 3000 });
    console.log('Server running on http://localhost:3000');
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
```

---

## Phase 4: Frontend - Admin Panel (Day 2-3)

### 4.1 Initialize Next.js Admin

```bash
cd apps/admin
npx create-next-app@latest . --typescript --tailwind --app --no-src-dir
pnpm add @supabase/supabase-js zustand react-hook-form zod
pnpm add @tanstack/react-table recharts
pnpm add -D @types/node
```

### 4.2 Setup Environment Variables ✅ DONE

Next.js reads environment variables from `apps/admin/.env.local`. Add these to your root `.env` file (they'll be used by other apps too):

```bash
# Add to root .env file
NEXT_PUBLIC_SUPABASE_URL=${SUPABASE_URL}
NEXT_PUBLIC_SUPABASE_ANON_KEY=${SUPABASE_ANON_KEY}
NEXT_PUBLIC_API_URL=${API_URL}
```

**Note:** Next.js requires `NEXT_PUBLIC_` prefix for client-side variables. Copy these values to `apps/admin/.env.local` for Next.js to read them, or they'll be read from root `.env` if configured.

### 4.3 Create Basic Admin Layout ✅ DONE

```typescript
// apps/admin/app/layout.tsx
import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Burger Fest Admin',
  description: 'Admin panel for Burger Fest',
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="min-h-screen bg-gray-50">
          <header className="bg-white shadow">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
              <h1 className="text-2xl font-bold text-gray-900">Burger Fest Admin</h1>
            </div>
          </header>
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
```

---

## Phase 5: Frontend - Mobile App (Day 3-4)

### 5.1 Initialize Expo App

```bash
cd apps/mobile
npx create-expo-app@latest . --template blank-typescript
pnpm add @supabase/supabase-js zustand react-hook-form zod
pnpm add nativewind tailwindcss
pnpm add expo-router expo-auth-session
pnpm add expo-notifications
```

### 5.2 Setup Expo Router

```bash
# Create app directory structure
mkdir -p app/(auth) app/(tabs)
```

### 5.3 Setup NativeWind

```bash
# Follow NativeWind setup guide
# Update tailwind.config.js
# Update app.json
```

### 5.4 Setup Environment Variables

```bash
# apps/mobile/.env
EXPO_PUBLIC_SUPABASE_URL=your_supabase_url
EXPO_PUBLIC_SUPABASE_ANON_KEY=your_supabase_key
EXPO_PUBLIC_API_URL=http://localhost:3000
```

---

## Phase 6: Shared Packages (Day 4)

### 6.1 Create Shared Types Package

```bash
cd packages/types
pnpm init
# Create shared TypeScript types
```

### 6.2 Create Shared API Client

```bash
cd packages/api
pnpm init
pnpm add @supabase/supabase-js
# Create API client functions
```

### 6.3 Create Shared Services

```bash
cd packages/services
pnpm init
# Create UserService, AuthService, etc.
```

---

## Phase 7: Development (Day 5+)

### 7.1 Run Everything Locally

```bash
# Terminal 1: Backend
cd server
pnpm dev

# Terminal 2: Admin
cd apps/admin
pnpm dev

# Terminal 3: Mobile
cd apps/mobile
pnpm start
```

### 7.2 Test Locally

- Admin: http://localhost:3001
- Mobile: Expo Go app (scan QR code)
- Backend: http://localhost:3000/health

---

## Phase 8: Deployment (Day 6+)

### 8.1 Deploy Backend to Vercel

```bash
cd server
# Create vercel.json
vercel deploy
```

### 8.2 Deploy Admin to Vercel

```bash
cd apps/admin
vercel deploy
# Connect GitHub for auto-deploy
```

### 8.3 Deploy Mobile PWA

```bash
cd apps/mobile
# Build for web
pnpm build:web
# Deploy to Vercel
vercel deploy
```

### 8.4 Build Native Apps (Later)

```bash
cd apps/mobile
# Setup EAS
eas build:configure
eas build --platform ios
eas build --platform android
```

---

## Quick Start Commands

```bash
# 1. Setup monorepo
pnpm install

# 2. Start backend
cd server && pnpm dev

# 3. Start admin
cd apps/admin && pnpm dev

# 4. Start mobile
cd apps/mobile && pnpm start
```

---

## What I Need From You

1. **Supabase credentials** (URL + Key) - After Phase 1
2. **Google OAuth credentials** (Client ID + Secret) - For social login
3. **Decisions on:**
   - Database schema (users, posts, leaderboards tables)
   - API endpoints needed
   - UI/UX preferences

---

## Next Steps After Setup

1. Create database schema (Prisma)
2. Implement authentication (Supabase Auth)
3. Build core features (feed, meal logging)
4. Add admin panel features
5. Deploy everything

---

**Start with Phase 1 (Supabase setup) → Then Phase 2 (Monorepo) → Continue sequentially**
