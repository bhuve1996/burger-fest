# Burger Fest - Monorepo

## Structure

```
burger-fest/
├── apps/
│   ├── mobile/          # Expo app (PWA + iOS + Android)
│   └── admin/           # Next.js admin panel
├── server/              # Fastify backend
├── packages/
│   ├── config/          # Shared configuration
│   ├── api/             # Shared API client
│   ├── types/           # Shared TypeScript types
│   └── services/        # Shared service layer
└── package.json         # Root (manages all workspaces)
```

## Quick Start

```bash
# Install all dependencies
npm install

# Run from root
npm run dev:mobile      # Start mobile app
npm run dev:admin       # Start admin panel
npm run dev:server      # Start backend server

# Build everything
npm run build

# Format & Lint
npm run format
npm run lint
```

## Commands (from root)

- `npm run dev:mobile` - Start Expo mobile app
- `npm run dev:admin` - Start Next.js admin
- `npm run dev:server` - Start Fastify backend
- `npm run build` - Build all apps
- `npm run lint` - Lint all code
- `npm run format` - Format all code
- `npm run type-check` - Type check all packages

## Tech Stack

- **Mobile:** Expo (React Native)
- **Admin:** Next.js 14
- **Backend:** Fastify + TypeScript
- **Shared:** TypeScript, ESLint, Prettier

