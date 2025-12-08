# Burger Fest - Complete Summary

## Tech Stack (One-Liners)

**Mobile App:** Expo SDK 50+ (React Native, TypeScript) → PWA + iOS + Android from one codebase
**Admin Panel:** Next.js 14 App Router (TypeScript, Tailwind, shadcn/ui)
**Backend:** Fastify + TypeScript (serverless functions on Vercel)
**Database:** Supabase PostgreSQL (via Prisma ORM)
**Auth:** Supabase Auth (Email/Password + Social: Google, GitHub, Apple)
**Storage:** Supabase Storage (burger photos)
**State:** Zustand (works everywhere)
**UI:** NativeWind (Tailwind for React Native - works in PWA + native)
**Forms:** React Hook Form + Zod validation
**Deployment:** Vercel (everything) + EAS Build (iOS/Android apps)

## Repository Structure

**Single Monorepo:**

```
burger-fest/
├── apps/mobile/     # Expo app (PWA + iOS + Android)
├── apps/admin/      # Next.js admin panel
├── packages/        # Shared: api, types, services, config
└── server/          # Fastify backend
```

## Module Integration

**Data Flow:** Database → API → Service Layer → Zustand → Components
**Auth Flow:** Component → AuthService → Supabase Auth (direct)
**Service Pattern:** No direct DB calls from components, all via service layer
**Shared Code:** Types, API client, services, config shared across apps via packages

## Code Structure

**Mobile App:** Expo Router (file-based routing), Zustand stores, NativeWind styling
**Admin Panel:** Next.js App Router, TanStack Table, Recharts
**Backend:** Fastify routes, Prisma queries, RBAC middleware
**Services:** UserService, AuthService, PostService, LeaderboardService
**Config:** Layouts, routes, icons, labels in config files (data-driven)

## Authentication

**Email/Password:** `supabase.auth.signInWithPassword()`
**Google Login:** `supabase.auth.signInWithOAuth({ provider: 'google' })`
**Other Social:** GitHub, Apple, Facebook (same OAuth pattern)
**Magic Link:** `supabase.auth.signInWithOtp()` for passwordless
**Expo OAuth:** Use `expo-auth-session` for better native OAuth handling

## Deployment

**PWA:** Vercel (auto-deploy on git push, free tier: 100GB bandwidth)
**Admin FE:** Vercel SSG (static site generation)
**Backend:** Vercel Serverless Functions (Fastify, auto-scaling, free tier)
**iOS/Android:** EAS Build (30 builds/month free) → App Store / Play Store
**Database:** Supabase Cloud (free tier: 500MB DB, 1GB storage, 50K users)
**Storage:** Supabase Storage (free tier: 1GB)
**Redis:** Optional (start without, add Upstash when needed)

## Key Decisions

**Fastify over Express:** 2x faster, better request queuing for Supabase, built-in rate limiting
**Single Monorepo:** One codebase, shared packages, easier management
**Vercel Serverless:** Fastify works great as serverless, auto-scaling, free tier
**Supabase Direct:** OK with vendor lock-in, direct auth/storage/database integration
**Redis Optional:** Start at $0, use Vercel edge caching + in-memory cache, add Redis when scaling
**NativeWind:** Tailwind CSS for React Native (works in PWA + native, single styling codebase)

## Development Setup

**Monorepo Tools:** Turborepo or Nx (build management), pnpm workspaces (package management)
**Code Quality:** Husky (git hooks), Prettier (formatting), ESLint (linting)
**TypeScript:** Full type safety across all apps and packages

## Cost

**MVP (0-10K users):** $0/month (Vercel free tier + Supabase free tier)
**Scaling (10K-100K):** $45-65/month (Vercel Pro + Supabase Pro, no Redis)
**Native Apps:** $124 first year (iOS $99/year + Android $25 one-time)

## Quick Start

1. **Setup:** `npx create-expo-app@latest` (mobile), `npx create-next-app@latest` (admin)
2. **Supabase:** Create project, get URL + key, enable auth providers (Email, Google, etc.)
3. **Prisma:** Setup schema, connect to Supabase PostgreSQL
4. **Deploy:** Connect GitHub to Vercel, auto-deploy on push
5. **Build Apps:** `eas build --platform all` for iOS/Android

## Architecture Principles

**RBAC:** Role-based access (admin, moderator, user) at API/service layer
**Config-Driven:** Layouts, routes, icons, labels in config files (not hardcoded)
**Service Layer:** All API calls go through service layer (no direct DB calls from components)
**No Vendor Lock-in (Optional):** Service layer abstraction allows switching providers if needed

## Shared Libraries

**UI:** NativeWind (Tailwind for React Native) - works in PWA + native
**Forms:** React Hook Form + Zod validation
**HTTP:** Axios or fetch
**Icons:** Expo Icons
**Date:** date-fns
**State:** Zustand

## Caching Strategy

**MVP:** Vercel Edge Caching + in-memory cache + Supabase query cache
**Scaling:** Add Upstash Redis when need shared cache across serverless instances

## Push Notifications

**Native Apps:** expo-notifications
**PWA:** Web Push API (limited iOS support)

---

**Everything in one place, minimal, ready to build!** 🚀
