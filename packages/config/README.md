# Config Package

Minimal centralized configuration.

## Files

- **routes.ts** - Route definitions
- **layouts.ts** - Layout configurations
- **app.ts** - App config (API URLs, Supabase)

## Usage

```typescript
import { routes, layouts, appConfig } from '@burger-fest/config';

// Use routes
routes.forEach(route => { ... });

// Use layouts
const mobileLayout = layouts.mobile;

// Use app config
const apiUrl = appConfig.apiUrl;
```

## Later: Move to env files

Sensitive values (API URLs, keys) will move to `.env` files.
