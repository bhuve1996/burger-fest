# Cross-Platform Styled Components Guide

## ✅ Yes! You Can Build Custom Components for Web + Mobile

Using **React Native primitives** + **NativeWind** + **react-native-web**, you can create components that work on both platforms.

---

## How It Works

### Architecture

```
packages/ui/              # Shared UI components
├── src/
│   ├── Button.tsx        # Works on mobile + web
│   ├── Card.tsx          # Works on mobile + web
│   ├── Input.tsx         # Works on mobile + web
│   └── index.ts
└── package.json

apps/mobile/              # Uses @burger-fest/ui
apps/admin/               # Can also use @burger-fest/ui (with react-native-web)
```

### Key Technologies

1. **React Native Primitives** (`View`, `Text`, `Pressable`, `TextInput`)
   - Work natively on mobile
   - Rendered as HTML/CSS on web via `react-native-web`

2. **NativeWind** (Tailwind for React Native)
   - Works on both platforms
   - Same utility classes everywhere

3. **react-native-web**
   - Already installed in your mobile app
   - Converts RN components to web components

---

## Example: Button Component

```tsx
// packages/ui/src/Button.tsx
import { Pressable, Text } from 'react-native';

export function Button({ children, variant = 'primary' }) {
  return (
    <Pressable
      className={`
      px-4 py-2 rounded-lg
      ${variant === 'primary' ? 'bg-blue-500' : 'bg-gray-200'}
    `}
    >
      <Text className="text-white font-semibold">{children}</Text>
    </Pressable>
  );
}
```

**Usage in Mobile App:**

```tsx
import { Button } from '@burger-fest/ui';

<Button variant="primary">Click me</Button>;
```

**Usage in Admin Panel (with react-native-web):**

```tsx
import { Button } from '@burger-fest/ui';

<Button variant="primary">Click me</Button>;
```

---

## Benefits

✅ **Single Codebase** - Write once, use everywhere
✅ **Type-Safe** - Full TypeScript support
✅ **Consistent Design** - Same components, same styles
✅ **NativeWind** - Uses your existing Tailwind setup
✅ **No Runtime Overhead** - No CSS-in-JS runtime
✅ **Works with Expo** - Perfect for your setup

---

## Setup

### 1. Create UI Package

```bash
mkdir -p packages/ui/src
cd packages/ui
pnpm init
```

### 2. Install Dependencies

```json
{
  "dependencies": {
    "react": "^19.2.1",
    "react-native": "^0.82.1",
    "react-native-web": "^0.21.2"
  },
  "peerDependencies": {
    "nativewind": "^4.0.0"
  }
}
```

### 3. Use in Mobile App

```json
// apps/mobile/package.json
{
  "dependencies": {
    "@burger-fest/ui": "workspace:*"
  }
}
```

### 4. Use in Admin Panel (Optional)

```json
// apps/admin/package.json
{
  "dependencies": {
    "@burger-fest/ui": "workspace:*",
    "react-native-web": "^0.21.2"
  }
}
```

---

## Component Examples

### Button

```tsx
<Button variant="primary" size="lg">
  Submit
</Button>
```

### Card

```tsx
<Card>
  <Text>Card content</Text>
</Card>
```

### Input

```tsx
<Input placeholder="Enter email" variant="outline" />
```

---

## Platform-Specific Code (If Needed)

```tsx
import { Platform } from 'react-native';

export function PlatformButton({ children }) {
  return (
    <Pressable
      className={`
        ${Platform.OS === 'web' ? 'cursor-pointer' : ''}
        px-4 py-2 rounded-lg
      `}
    >
      {children}
    </Pressable>
  );
}
```

---

## Comparison: Custom Components vs Styled Components

| Feature              | Custom Components (RN + NativeWind) | Styled Components   |
| -------------------- | ----------------------------------- | ------------------- |
| **Cross-platform**   | ✅ Native + Web                     | ✅ Native + Web     |
| **Tailwind support** | ✅ NativeWind                       | ❌ Conflicts        |
| **Bundle size**      | ✅ Smaller                          | ❌ Larger (runtime) |
| **Type safety**      | ✅ Full TS                          | ✅ Full TS          |
| **Performance**      | ✅ Better                           | ⚠️ Runtime overhead |
| **Your setup**       | ✅ Perfect fit                      | ❌ Conflicts        |

---

## Recommendation

**✅ Use Custom Components with React Native + NativeWind**

**Why:**

1. Already have NativeWind set up
2. Works perfectly with your Expo setup
3. Can share between mobile and admin panel
4. No conflicts with Tailwind
5. Better performance
6. Type-safe

**Don't use styled-components** - it conflicts with your Tailwind approach.

---

## Next Steps

1. ✅ Created `packages/ui` package structure
2. ✅ Added example components (Button, Card, Input)
3. Install in mobile app: `pnpm add @burger-fest/ui --filter @burger-fest/mobile`
4. Start building more components as needed!
