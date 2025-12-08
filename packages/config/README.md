# Config Package

Centralized configuration for the Burger Fest application.

## Structure

- **layouts.ts** - Layout configurations (mobile, admin, web)
- **routes.ts** - Route definitions with RBAC
- **icons.ts** - Icon mappings (web + mobile)
- **labels.ts** - Multi-language labels
- **app.ts** - App configuration (API URLs, features, etc.)
- **types.ts** - TypeScript types

## Usage

```typescript
import { routes, getRoutesByRole, Role } from '@burger-fest/config';
import { layouts } from '@burger-fest/config';
import { icons } from '@burger-fest/config';
import { getLabel } from '@burger-fest/config';

// Get routes for a role
const userRoutes = getRoutesByRole(Role.USER);

// Get layout config
const mobileLayout = layouts.mobile;

// Get icon
const homeIcon = icons.home.mobile; // or icons.home.web

// Get label
const title = getLabel('feed.title', 'en');
```

## Migration to Environment Variables

Currently, config values are in code. To migrate to env variables:

1. Move sensitive values (API URLs, keys) to `.env` files
2. Keep non-sensitive config (layouts, routes, icons) in code or database
3. Use `process.env` in `app.ts` for environment-specific values

## Future: Database-Driven Config

For dynamic configuration:
1. Store config in Supabase database
2. Fetch on app startup
3. Cache in memory
4. Update via admin panel

