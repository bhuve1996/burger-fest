# Tech Stack

## Mobile App (Expo)
- Expo SDK 50+, React Native, TypeScript
- Expo Router (file-based routing)
- Zustand (state management)
- expo-notifications (push notifications)

## Shared Libraries (PWA + Expo Apps)
- **UI Components:** NativeWind (Tailwind CSS for React Native) - Works in both PWA and native
- **Alternative UI:** React Native Paper (native) + Tailwind CSS (PWA web)
- **Forms:** React Hook Form (works everywhere)
- **HTTP Client:** Axios or native fetch (works everywhere)
- **Date/Time:** date-fns (works everywhere)
- **Validation:** Zod (works everywhere)
- **Icons:** Expo Icons (works in both PWA and native)
- **Auth:** Supabase Auth (Email/Password + Social: Google, GitHub, Apple, etc.)
- **OAuth (Expo):** expo-auth-session (for better OAuth handling in native apps)

## Admin Panel
- Next.js 14 (App Router), TypeScript
- Tailwind CSS, shadcn/ui
- TanStack Table, Recharts
- React Hook Form, Zod

## Backend (Shared)
- Fastify + TypeScript
- Prisma ORM
- Request queuing & rate limiting

## Infrastructure
- PostgreSQL (Supabase)
- Supabase Storage
- Supabase Auth (Email/Password + Social Login: Google, GitHub, Apple, etc.)
- Redis (Upstash - optional, add later if needed)

## Deployment
- Vercel (PWA, Admin FE, Fastify backend as serverless functions)
- EAS Build (iOS/Android native apps)

## Repository
- Single Monorepo (apps: mobile, admin | packages: shared code)

## Development
- Husky, Prettier, ESLint
- TypeScript

