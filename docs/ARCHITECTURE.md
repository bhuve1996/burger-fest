# Architecture

## Repository Structure

**✅ Single Monorepo (Recommended)**

```
burger-fest/
├── apps/
│   ├── mobile/          # Expo app (PWA + iOS + Android)
│   │   ├── app/         # Expo Router routes
│   │   ├── components/  # Mobile-specific components
│   │   └── package.json
│   └── admin/           # Next.js admin panel
│       ├── app/         # Next.js App Router
│       ├── components/  # Admin-specific components
│       └── package.json
├── packages/
│   ├── api/             # Shared API client
│   ├── types/           # Shared TypeScript types
│   ├── services/        # Shared service layer
│   └── config/          # Shared configuration (layouts, routes, icons)
└── server/              # Fastify backend (shared by both apps)
    ├── src/
    │   ├── routes/      # API routes
    │   ├── plugins/     # Fastify plugins (rate-limit, etc.)
    │   └── services/    # Business logic
    └── package.json
```

**Benefits:**
- ✅ Single codebase to manage
- ✅ Shared code (types, services, API client)
- ✅ Easier development and deployment
- ✅ Consistent versions across projects
- ✅ One deployment pipeline

**Monorepo Tools:**
- **Turborepo** or **Nx** - For managing monorepo builds
- **pnpm workspaces** or **npm workspaces** - For package management

**Alternative:** Separate repos (only if teams are completely independent)

## Core Principles

### 1. Role-Based Access Control (RBAC)
- Roles: `admin`, `moderator`, `user`
- Permissions managed at API/service layer
- Middleware for route protection

### 2. Configuration-Driven System
- **Layouts:** Dynamic layout rendering based on user role
- **Routes:** Route definitions in configuration, protected by RBAC
- **Icons & Labels:** Centralized mapping, i18n ready

### 3. Service Layer Pattern
**No direct database/API calls from components**

**Data Flow:**
```
Database → API Layer → Service Layer → Zustand → Components
```

**Example: User Profile**
```
Supabase DB → Fastify API → UserService.getProfile() → Zustand Store → Component
```

### 4. Supabase Integration
- **Decision:** Direct Supabase integration (OK with vendor lock-in)
- Supabase Auth (direct usage)
- Supabase Storage (direct usage)
- Supabase Database (via Prisma ORM for type safety)
- Service layer still used for business logic abstraction

## Service Layer Architecture

```
Components → Zustand Stores → Service Layer → API Layer → Database
```

**Services:**
- UserService
- AuthService (vendor-agnostic)
- PostService
- LeaderboardService

## Authentication & Authorization

- **Provider:** Supabase Auth (direct integration)
- **Supported Methods:**
  - ✅ Email/Password authentication
  - ✅ Social login (Google, GitHub, Apple, Facebook, etc.)
  - ✅ Magic links (passwordless)
  - ✅ OAuth providers
- **RBAC:** Role-based middleware at API layer
- **Pattern:** Component → AuthService → Supabase (direct)
- **Note:** Service layer still provides business logic abstraction

## Configuration Structure

```typescript
// Layouts
config/layouts.ts - Dynamic layouts per role

// Routes
config/routes.ts - Route definitions with RBAC

// Icons & Labels
config/icons.ts - Centralized icon mapping
config/labels.ts - Multi-language support
```

## Development Tooling

- **Husky:** Git hooks (pre-commit: lint + format)
- **Prettier:** Code formatting
- **ESLint:** Code linting (TypeScript, React/React Native)

## Backend: Fastify for Request Management

**✅ Decision: Fastify (Recommended for Supabase)**

**Why Fastify over Express?**
- ✅ **2x faster** than Express (better for high-throughput)
- ✅ **Built-in request validation** (schema-based)
- ✅ **Better async handling** (handles concurrent requests efficiently)
- ✅ **Request queuing** - Better control over multiple Supabase requests
- ✅ **Rate limiting** - Built-in support for controlling API requests
- ✅ **Connection pooling** - Better management of Supabase connections
- ✅ **Request batching** - Can batch multiple Supabase queries efficiently

**Use Cases with Supabase:**
- Managing multiple concurrent Supabase requests without overwhelming the database
- Rate limiting at application level (beyond Supabase's built-in limits)
- Request queuing for high-traffic scenarios
- Better performance with Supabase connection pooling
- Efficient handling of batch operations

**Example: Request Management with Fastify**
```typescript
// server/plugins/rateLimit.ts
import rateLimit from '@fastify/rate-limit';

fastify.register(rateLimit, {
  max: 100, // 100 requests per minute
  timeWindow: '1 minute'
});

// Request queuing for Supabase
import pQueue from 'p-queue';

const supabaseQueue = new pQueue({ concurrency: 10 });

fastify.addHook('onRequest', async (request, reply) => {
  // Queue Supabase requests to avoid overwhelming the database
  if (request.url.startsWith('/api/supabase')) {
    await supabaseQueue.add(() => handleSupabaseRequest(request));
  }
});

// Connection pooling with Supabase
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(url, key, {
  db: {
    schema: 'public',
  },
  global: {
    headers: { 'x-client-info': 'fastify-backend' },
  },
  // Connection pooling configuration
});
```

## Deployment Strategy

- **PWA:** Vercel (free tier, auto-deploy)
- **iOS/Android:** EAS Build (30 builds/month free)
- **Admin FE:** Vercel SSG
- **Backend:** Vercel Serverless Functions (Fastify) - ✅ Supported, auto-scaling, free tier

**Why Vercel Serverless for Fastify?**
- ✅ Fastify works great as serverless functions
- ✅ Auto-scaling (no server management)
- ✅ Free tier: 100GB bandwidth
- ✅ Edge network (fast worldwide)
- ✅ Built-in rate limiting
- ✅ Zero configuration

**Note:** For high-traffic scenarios with persistent connection pooling, consider Railway/Render later

## Push Notifications

- **Native Apps:** expo-notifications
- **PWA:** Web Push API (limited iOS support)

## Shared Libraries & UI Components

### ✅ Decision: NativeWind (Tailwind CSS for React Native)

**Why NativeWind?**
- ✅ Works in both PWA (web) and native apps (iOS/Android)
- ✅ Same Tailwind CSS classes everywhere
- ✅ Single codebase for styling
- ✅ Familiar Tailwind syntax
- ✅ Great performance

**Alternative Approach:**
- React Native Paper (native apps) + Tailwind CSS (PWA web)
- More native look on mobile, but requires separate styling

### Shared Libraries (Work in PWA + Expo)

**UI & Styling:**
- **NativeWind** - Tailwind CSS for React Native (works everywhere)
- **Expo Icons** - Icon library (works in both PWA and native)

**Forms & Validation:**
- **React Hook Form** - Form management (works everywhere)
- **Zod** - Schema validation (works everywhere)

**Data & HTTP:**
- **Axios** or **fetch** - HTTP client (works everywhere)
- **Zustand** - State management (works everywhere)

**Utilities:**
- **date-fns** - Date manipulation (works everywhere)
- **Zod** - Type-safe validation (works everywhere)

**Example: Shared Component**
```typescript
// Works in both PWA and native apps
import { View, Text } from 'react-native';
import { styled } from 'nativewind';

const StyledView = styled(View);
const StyledText = styled(Text);

export function Button() {
  return (
    <StyledView className="bg-blue-500 p-4 rounded-lg">
      <StyledText className="text-white font-bold">Click Me</StyledText>
    </StyledView>
  );
}
```

## Caching Strategy

**✅ Decision: Redis Optional for MVP**

**MVP (No Redis):**
- ✅ Vercel Edge Caching - For static/semi-static data
- ✅ In-memory caching - For leaderboards (resets on cold starts, fine for MVP)
- ✅ Supabase query caching - Built-in query result caching
- ✅ Client-side caching - Zustand stores with TTL

**When to Add Redis:**
- High traffic (need shared cache across serverless instances)
- Real-time leaderboards (need persistent cache)
- Rate limiting across instances
- Session storage (if needed beyond Supabase)

**Cost:** Start at $0 (no Redis), add Upstash Redis ($0 free tier) when needed

## Implementation Examples

### Service Layer Example

```typescript
// services/UserService.ts
export class UserService {
  static async getProfile(userId: string) {
    const response = await fetch(`${API_BASE_URL}/api/users/${userId}`);
    return response.json();
  }
}

// stores/userStore.ts (Zustand)
export const useUserStore = create<UserState>((set) => ({
  profile: null,
  fetchProfile: async (userId: string) => {
    const profile = await UserService.getProfile(userId);
    set({ profile });
  },
}));
```

### Auth Service (Supabase Direct)

```typescript
// services/AuthService.ts
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

export class AuthService {
  // Email/Password Sign Up
  static async signUp(email: string, password: string) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });
    return { user: data.user, error };
  }

  // Email/Password Sign In
  static async signIn(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    return { user: data.user, error };
  }

  // Google Social Login
  static async signInWithGoogle() {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
    return { data, error };
  }

  // GitHub Social Login
  static async signInWithGitHub() {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
    return { data, error };
  }

  // Apple Social Login
  static async signInWithApple() {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'apple',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
    return { data, error };
  }

  // Magic Link (Passwordless)
  static async signInWithMagicLink(email: string) {
    const { data, error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });
    return { data, error };
  }

  // Sign Out
  static async signOut() {
    const { error } = await supabase.auth.signOut();
    return { error };
  }
  
  // Get Current User
  static async getCurrentUser() {
    const { data: { user }, error } = await supabase.auth.getUser();
    return { user, error };
  }

  // Get Session
  static async getSession() {
    const { data: { session }, error } = await supabase.auth.getSession();
    return { session, error };
  }
}
```

**Setup in Supabase Dashboard:**
1. Go to Authentication → Providers
2. Enable Email provider (default)
3. Enable Google OAuth (add Client ID & Secret)
4. Enable other providers as needed (GitHub, Apple, etc.)
5. Configure redirect URLs

**Expo-Specific Social Login:**
For Expo apps, use `expo-auth-session` for better OAuth handling:

```typescript
// For Expo apps
import * as AuthSession from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';

WebBrowser.maybeCompleteAuthSession();

export class AuthService {
  // Google Login for Expo
  static async signInWithGoogleExpo() {
    const redirectUri = AuthSession.makeRedirectUri();
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: redirectUri,
      },
    });
    return { data, error };
  }
}
```

**Supported Providers:**
- ✅ Email/Password
- ✅ Google
- ✅ GitHub
- ✅ Apple
- ✅ Facebook
- ✅ Twitter
- ✅ Discord
- ✅ And 20+ more providers

### RBAC Middleware

```typescript
// middleware/rbac.ts
export enum Role {
  USER = 'user',
  MODERATOR = 'moderator',
  ADMIN = 'admin',
}

export function requireRole(role: Role) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const user = await AuthService.getCurrentUser();
    if (!user || !hasRole(user, role)) {
      return res.status(403).json({ error: 'Forbidden' });
    }
    next();
  };
}
```
