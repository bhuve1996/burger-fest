# Technology Comparison & Decisions

## Expo vs Capacitor

### ✅ Decision: Expo (Recommended)

**Why Expo?**

- Better developer experience (Expo Go for instant testing)
- Over-The-Air (OTA) updates (no app store review for JS changes)
- Cloud builds (EAS Build - no local Xcode/Android Studio needed)
- Large ecosystem of native modules
- Single codebase for iOS + Android + PWA

**Comparison:**

| Feature            | Capacitor                    | Expo                                 |
| ------------------ | ---------------------------- | ------------------------------------ |
| Works with Next.js | ✅ Yes (wraps web app)       | ⚠️ Separate project                  |
| Single Codebase    | ✅ Yes (Next.js → native)    | ✅ Yes (Expo Router)                 |
| Web Support        | ✅ Yes (Next.js)             | ✅ Yes (Expo web)                    |
| Development Speed  | Fast (wraps existing)        | Fast (great tooling)                 |
| Build Process      | Local (Xcode/Android Studio) | Cloud (EAS Build) or local           |
| Testing            | Device/Simulator             | Expo Go app (instant)                |
| Native Features    | ✅ Full access               | ✅ Full access (with config plugins) |
| Updates            | App store only               | OTA updates (no store review)        |
| Learning Curve     | Low (if using Next.js)       | Medium (React Native)                |
| Cost               | Free                         | Free (EAS free tier)                 |

**Expo EAS Free Tier:**

- 30 builds/month
- OTA updates: Unlimited
- Free for MVP!

## Next.js + Expo (Hybrid Approach)

**Recommended Strategy:**

1. Build Next.js first (Web + PWA + Admin) - Launch in 4-6 weeks
2. Add Expo for native apps (separate project) - Share API endpoints
3. Share code where possible (API client, types, business logic)

**Pros:**

- ✅ Keep Next.js for web (better SEO, SSR)
- ✅ Use Expo for native (better DX)
- ✅ Share backend API

**Cons:**

- ⚠️ Two codebases to maintain
- ⚠️ Need to sync components/logic

## Backend Framework: Express vs Fastify

### ✅ Decision: Fastify (Recommended)

**Why Fastify?**

- ✅ **2x faster** than Express (better performance)
- ✅ **Built-in request validation** (schema-based validation)
- ✅ **Better async handling** (handles concurrent requests efficiently)
- ✅ **Request queuing** - Essential for managing multiple Supabase requests
- ✅ **Rate limiting** - Built-in support for controlling API requests
- ✅ **Connection pooling** - Better management of Supabase database connections
- ✅ **Request batching** - Can efficiently batch multiple Supabase queries

**Use Cases with Supabase:**

- Managing multiple concurrent Supabase requests without overwhelming the database
- Rate limiting at application level (beyond Supabase's built-in limits)
- Request queuing for high-traffic scenarios
- Better performance with Supabase connection pooling
- Efficient handling of batch operations

**When to use Express:**

- If you need a larger ecosystem of plugins
- If team is more familiar with Express
- For simpler use cases without complex request management

**Recommendation:** Use Fastify for better request management with Supabase, especially for queues and multiple requests.

## Deployment Options

### Frontend/API Deployment

**✅ Decision: Vercel**

- Free tier (100GB bandwidth)
- Automatic deployments (Git push)
- Edge network (fast worldwide)
- Zero configuration
- Serverless functions support

**Alternative:** Netlify, Cloudflare Pages (similar features)

### Backend Deployment

**✅ Decision: Vercel Serverless Functions (Recommended)**

**Why Vercel Serverless?**

- ✅ Fastify works great as serverless functions
- ✅ Auto-scaling (no server management)
- ✅ Free tier: 100GB bandwidth
- ✅ Edge network (fast worldwide)
- ✅ Built-in rate limiting
- ✅ Zero configuration
- ✅ Request queuing works fine in serverless (each function instance manages its queue)

**When to use Railway/Render:**

- Need persistent connection pooling across requests
- Long-running processes
- WebSocket connections
- Very high traffic (100K+ requests/minute)

**For MVP:** Vercel Serverless is perfect and free!

### Database

**✅ Decision: Supabase**

- Free tier: 500MB DB, 1GB storage, 50K MAU
- Built-in auth (Email/Password + Social: Google, GitHub, Apple, etc.)
- Real-time subscriptions
- Row-level security
- Auto-scaling
- Magic links (passwordless)

**Alternative:** Neon (serverless PostgreSQL)

### Storage

**✅ Decision: Supabase Storage**

- File uploads (burger photos)
- CDN included
- Image optimization
- Free tier: 1GB storage

**Alternative:** AWS S3 + CloudFront

### Caching

**✅ Decision: Redis Optional for MVP**

**MVP (No Redis Needed):**

- ✅ Vercel Edge Caching - Static/semi-static data
- ✅ In-memory caching - Leaderboards (fine for MVP, resets on cold starts)
- ✅ Supabase query caching - Built-in
- ✅ Client-side caching - Zustand stores

**When to Add Redis:**

- High traffic (need shared cache across serverless instances)
- Real-time leaderboards (need persistent cache)
- Rate limiting across instances
- Session storage beyond Supabase

**Option:** Upstash Redis (when needed)

- Serverless Redis
- Free tier: 10K commands/day
- Pay-per-use scaling
- No server management

**Cost:** Start at $0 (no Redis), add when scaling

## Cost Comparison

### MVP Phase (0-10K users) - FREE

| Service   | Free Tier                             | Cost         |
| --------- | ------------------------------------- | ------------ |
| Vercel    | 100GB bandwidth, serverless functions | $0           |
| Supabase  | 500MB DB, 1GB storage                 | $0           |
| Redis     | Not needed for MVP                    | $0           |
| EAS Build | 30 builds/month                       | $0           |
| **Total** |                                       | **$0/month** |

### Scaling Phase (10K-100K users)

| Service       | Paid Tier               | Cost                             |
| ------------- | ----------------------- | -------------------------------- |
| Vercel Pro    | Unlimited bandwidth     | $20/user                         |
| Supabase Pro  | 8GB DB, 100GB storage   | $25/month                        |
| Upstash Redis | Pay-per-use (if needed) | ~$10-20                          |
| **Total**     |                         | **$45-65/month** (without Redis) |

### Native Apps

| Item                      | Cost                   |
| ------------------------- | ---------------------- |
| iOS Developer Account     | $99/year               |
| Android Developer Account | $25 one-time           |
| EAS Build                 | Free (30 builds/month) |

## PWA vs Native Apps

### Strategy: Launch PWA First, Add Native Later

**PWA Benefits:**

- ✅ Launch instantly (no app store approval)
- ✅ Instant updates (no review)
- ✅ Single codebase
- ✅ Works on iOS Safari + Android Chrome
- ✅ Cost: $0

**Native Apps Benefits:**

- ✅ App Store discoverability
- ✅ Full native features (camera, push, etc.)
- ✅ Better performance
- ✅ User trust (app store badge)
- ✅ Cost: $124 first year

**Best Approach:** Launch PWA first, add native apps when you have users!

## Repository Structure: One Repo vs Two Repos

### ✅ Decision: Single Monorepo (Recommended)

**Structure:**

```
burger-fest/
├── apps/
│   ├── mobile/     # Expo app
│   └── admin/      # Next.js admin
├── packages/       # Shared code
└── server/         # Fastify backend
```

**Benefits:**

- ✅ Single codebase to manage
- ✅ Shared code (types, services, API client)
- ✅ Easier development and deployment
- ✅ Consistent versions across projects
- ✅ Better code reuse

**Alternative:** Separate repos (only if teams are completely independent)

## Final Recommendations

1. **✅ Single Monorepo** - One codebase, shared packages, easier management
2. **✅ Expo for Mobile Apps** - Better DX, OTA updates, cloud builds
3. **✅ Fastify for Backend** - Better request management with Supabase (queues, rate limiting)
4. **✅ Vercel for Everything** - Frontend + Backend (serverless), free tier, auto-scaling
5. **✅ Supabase (Direct)** - Database, auth, storage (all-in-one, free tier, OK with vendor lock-in)
6. **✅ Redis Optional** - Start without Redis, add Upstash when needed
7. **✅ Next.js 14 App Router** - Modern template with TypeScript
8. **✅ EAS Build** - Cloud builds for iOS/Android (no local setup needed)
9. **✅ PWA First** - Launch faster, add native apps later
