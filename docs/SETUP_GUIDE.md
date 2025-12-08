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

Next.js is configured to read from root `.env` file. Add these to your root `.env`:

```bash
# Add to root .env file
NEXT_PUBLIC_SUPABASE_URL=${SUPABASE_URL}
NEXT_PUBLIC_SUPABASE_ANON_KEY=${SUPABASE_ANON_KEY}
NEXT_PUBLIC_API_URL=${API_URL}
```

**Note:** Next.js requires `NEXT_PUBLIC_` prefix for client-side variables. The `next.config.js` is configured to read from root `.env` and will fallback to non-prefixed versions (e.g., `SUPABASE_URL` → `NEXT_PUBLIC_SUPABASE_URL`).

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

### 5.2 Setup Expo Router ✅ DONE

Created app directory structure:

- `app/_layout.tsx` - Root layout with Stack navigator
- `app/(tabs)/_layout.tsx` - Tabs layout
- `app/(tabs)/index.tsx` - Feed screen
- `app/(auth)/login.tsx` - Login screen

Updated `index.js` to use `expo-router/entry` and `package.json` main field.

### 5.3 Setup NativeWind ✅ DONE

- Created `tailwind.config.js` with NativeWind preset
- Created `global.css` with Tailwind directives
- Updated `app.config.js` with build properties for iOS
- Imported `global.css` in root layout

### 5.4 Setup Environment Variables ✅ DONE

Expo is configured to read from root `.env` file via `app.config.js`:

```bash
# Add to root .env file
EXPO_PUBLIC_SUPABASE_URL=${SUPABASE_URL}
EXPO_PUBLIC_SUPABASE_ANON_KEY=${SUPABASE_ANON_KEY}
EXPO_PUBLIC_API_URL=${API_URL}
```

**Note:** Expo requires `EXPO_PUBLIC_` prefix for client-side variables. The `app.config.js` loads from root `.env` and will fallback to non-prefixed versions (e.g., `SUPABASE_URL` → `EXPO_PUBLIC_SUPABASE_URL`).

---

## Phase 6: Shared Packages (Day 4) ✅ DONE

### 6.1 Create Shared Types Package ✅ DONE

Created comprehensive TypeScript types:

- `User`, `Post` - Database models
- `AuthUser`, `LoginCredentials`, `SignUpData` - Auth types
- `CreatePostData`, `UpdatePostData` - Post operations
- `ApiResponse`, `PaginatedResponse` - API response types
- `PaginationParams` - Pagination utilities

### 6.2 Create Shared API Client ✅ DONE

Created `ApiClient` class with:

- `get`, `post`, `put`, `delete` methods
- `getPaginated` for paginated responses
- Error handling and type safety
- Specific API functions: `postsApi`, `usersApi`

### 6.3 Create Shared Services ✅ DONE

Created service layer:

- `AuthService` - Sign up, sign in (email/password, Google), sign out, get current user
- `UserService` - Get profile, update profile
- `PostService` - CRUD operations for posts (getAll, getById, create, update, delete)

All services use the API client and are fully typed.

---

## Phase 7: Development (Day 5+)

### 7.1 Run Everything Locally

Run from root directory (no need to cd into each folder):

```bash
# Terminal 1: Backend
pnpm run dev:server

# Terminal 2: Admin
pnpm run dev:admin

# Terminal 3: Mobile
pnpm run dev:mobile
```

**Or use the root workspace commands:**

```bash
# From root directory
pnpm run dev:server   # Starts Fastify backend on port 3000
pnpm run dev:admin    # Starts Next.js admin on port 3001
pnpm run dev:mobile   # Starts Expo dev server
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
# 1. Setup monorepo (from root)
pnpm install

# 2. Start backend (from root)
pnpm run dev:server

# 3. Start admin (from root)
pnpm run dev:admin

# 4. Start mobile (from root)
pnpm run dev:mobile
```

**All commands run from root directory - no need to cd into folders!**

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
