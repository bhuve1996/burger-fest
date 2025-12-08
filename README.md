# Aaloo - Monorepo

## Structure

```
aaloo/
├── app/                 # Expo mobile app (PWA + iOS + Android)
├── admin/
│   ├── webapp/          # Next.js web application
│   │   └── app/         # Next.js App Router
│   └── serverless/      # Fastify backend (serverless functions)
├── packages/
│   ├── config/          # Shared configuration
│   ├── api/             # Shared API client
│   ├── types/           # Shared TypeScript types
│   └── services/        # Shared service layer
└── package.json         # Root (manages all workspaces)
```
<｜tool▁calls▁begin｜><｜tool▁call▁begin｜>
read_file

## Quick Start

```bash
# Install all dependencies
npm install

# Run from root
npm run dev:app          # Start mobile app
npm run dev:admin        # Start admin panel
npm run dev:serverless   # Start backend serverless

# Build everything
npm run build

# Format & Lint
npm run format
npm run lint
```

## Commands (from root)

- `npm run dev:app` - Start Expo mobile app
- `npm run dev:admin` - Start Next.js admin
- `npm run dev:serverless` - Start Fastify backend
- `npm run build` - Build all apps
- `npm run lint` - Lint all code
- `npm run format` - Format all code
- `npm run type-check` - Type check all packages

## Tech Stack

- **Mobile:** Expo (React Native)
- **Admin:** Next.js 16
- **Backend:** Fastify + TypeScript (Serverless)
- **Shared:** TypeScript, ESLint, Prettier
