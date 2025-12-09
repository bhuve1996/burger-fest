# UI Library Recommendation for Burger Fest

## Current Setup ✅

- **NativeWind v4** - Already installed and configured
- **Tailwind CSS v3.4** - Working with NativeWind
- **Admin Panel** - Uses Tailwind + shadcn/ui

## Recommendation: **NativeWind + Tamanu UI** (or Custom Components)

### Option 1: NativeWind + Tamanu UI ⭐ BEST

**Why:**

- ✅ **Tailwind-friendly** - Works seamlessly with your existing NativeWind setup
- ✅ **Expo-first** - Built specifically for Expo
- ✅ **Cross-platform** - Mobile + Web (perfect for PWA)
- ✅ **Modern** - Feels like shadcn/ui but for React Native
- ✅ **Complements NativeWind** - Doesn't replace it, adds components on top
- ✅ **TypeScript** - Full type safety
- ✅ **Consistent** - Matches your admin panel's Tailwind approach

**Installation:**

```bash
cd apps/mobile
pnpm add @tamagui/core @tamagui/config
```

**Usage:**

```tsx
// Works alongside NativeWind
<View className="flex-1">
  {' '}
  {/* NativeWind */}
  <Button variant="primary">
    {' '}
    {/* Tamanu UI */}
    Click me
  </Button>
</View>
```

---

### Option 2: NativeWind Only + Custom Components (shadcn-style)

**Why:**

- ✅ **Full control** - Build exactly what you need
- ✅ **No dependencies** - Lighter bundle
- ✅ **Consistent** - Same approach as admin panel (shadcn/ui)
- ✅ **Already set up** - Just start building

**Approach:**

- Create reusable components in `apps/mobile/components/`
- Use NativeWind for all styling
- Share component patterns with admin panel

**Example:**

```tsx
// components/Button.tsx
export function Button({ children, variant = 'default' }) {
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

---

## ❌ NOT Recommended

### React Native Paper

- ❌ Material Design (doesn't match your Tailwind aesthetic)
- ❌ Doesn't work well with Tailwind
- ❌ Different design system
- ❌ Heavier bundle

### React Native Elements

- ❌ Older library (less maintained)
- ❌ Doesn't work well with Tailwind
- ❌ Different styling approach
- ❌ Not Expo-optimized

### Styled Components

- ❌ **CSS-in-JS** (conflicts with Tailwind utility classes)
- ❌ Different paradigm from your current setup
- ❌ Can't share styles with admin panel
- ❌ Larger bundle size
- ❌ Runtime overhead

---

## Final Recommendation

**Go with Option 1: NativeWind + Tamanu UI**

**Reasons:**

1. You already have NativeWind set up ✅
2. Tamanu UI complements it perfectly (Tailwind-friendly)
3. Modern, Expo-first, cross-platform
4. Consistent with your admin panel approach
5. Faster development (pre-built components)
6. Can still use NativeWind for custom styling

**Alternative:** If you want full control and minimal dependencies, go with Option 2 (NativeWind only + custom components).

**Avoid:** styled-components, React Native Paper, React Native Elements (they conflict with your Tailwind setup).

---

## Next Steps

1. **Try Tamanu UI first:**

   ```bash
   cd apps/mobile
   pnpm add @tamagui/core @tamagui/config
   ```

2. **If you prefer custom components:**
   - Create `apps/mobile/components/` folder
   - Build reusable components with NativeWind
   - Share patterns with admin panel

3. **Either way, keep NativeWind** - It's your foundation!

