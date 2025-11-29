# DateSlider Tailwind CSS Styling Guide

## Current Limitations & Tailwind-Only Solutions

Since we're using **Tailwind CSS exclusively**, this guide focuses on className-based customization patterns.

---

## Issue: Limited Styling Customization

### Current Problem
Only some classNames accepted. Core colors are hardcoded and cannot be changed without `!important`.

### Hardcoded Colors in Code

```typescript
// SliderTrack.tsx - HARDCODED COLORS
<div
  className={cn(
    'absolute h-full bg-red-300 rounded-full transition-all duration-200 z-10',
    //                   ^^^ HARDCODED - no way to customize without !important
    props.activeTrackClassName
  )}
/>

// Range mode - HARDCODED
<div
  className={cn(
    'absolute h-full bg-blue-500/30 transition-all duration-200 z-10',
    //                   ^^^ HARDCODED
    props.activeTrackClassName
  )}
/>

// DateLabel.tsx - HARDCODED
className={cn(
  'hidden md:block fixed z-50 transform -translate-x-1/2 bg-red-600 text-white text-xs px-2 py-1 rounded',
  //                                                      ^^^ HARDCODED ^^^ HARDCODED
  labelClassName
)}

// SliderTrack.tsx - HARDCODED scale marks
<div
  className="absolute bg-slate-700 transform -translate-x-0.5 top-0"
  //                  ^^^ HARDCODED - no className prop available
/>

// SliderTrack.tsx - HARDCODED cursor line
className={cn(
  'hidden md:block absolute top-0 h-full w-px bg-red-500/70 ...',
  //                                         ^^^ HARDCODED
  className
)}
```

### Current Workarounds (Problematic)

```typescript
// Users must use !important to override:
<DateSlider
  trackActiveClassName="!bg-green-500"  // Bad: Forces important override
/>

// Many things CANNOT be overridden at all:
// ❌ Cursor line color (no className prop)
// ❌ Scale mark color (no className prop)
// ❌ Date label text color (labelClassName exists but bg/text both hardcoded)
// ❌ Handle states (Button component internal styles)
```

---

## Solution 1: Comprehensive className Props (Recommended)

### Proposed API

```typescript
export type DateSliderClassNames = {
  // Container
  wrapper?: string;
  container?: string;

  // Track
  track?: string;
  trackActive?: string;          // For point/range active track
  trackInactive?: string;        // For the background track

  // Handles
  handle?: string;               // Base handle styles
  handlePoint?: string;          // Point handle specific
  handleStart?: string;          // Range start handle specific
  handleEnd?: string;            // Range end handle specific
  handleDragging?: string;       // Applied when dragging
  handleIcon?: string;           // Icon wrapper

  // Labels & Text
  dateLabel?: string;            // Hover date label
  dateLabelText?: string;        // Text inside date label
  scaleLabel?: string;           // Scale marks labels

  // Visual Indicators
  cursorLine?: string;           // Vertical cursor line on hover
  scaleMark?: string;            // Scale tick marks
  scaleMarkMajor?: string;       // Major tick marks
  scaleMarkMinor?: string;       // Minor tick marks

  // Time Unit Selection
  timeUnitSelector?: string;     // Container
  timeUnitButton?: string;       // Buttons
  timeUnitButtonActive?: string; // Active button
  timeUnitText?: string;         // Text labels

  // Time Display
  timeDisplay?: string;          // Container
  timeDisplayText?: string;      // Text inside
};

export type SliderProps = {
  // ... other props
  classNames?: DateSliderClassNames;
};
```

### Usage Examples

#### Example 1: Green Theme
```typescript
<DateSlider
  classNames={{
    trackActive: 'bg-green-500',
    dateLabel: 'bg-green-700 text-white',
    cursorLine: 'bg-green-600',
    scaleMark: 'bg-green-300',
    handlePoint: 'bg-green-600 hover:bg-green-700',
  }}
/>
```

#### Example 2: Glassmorphism Style
```typescript
<DateSlider
  classNames={{
    wrapper: 'backdrop-blur-xl bg-white/10 border border-white/20',
    track: 'bg-white/5',
    trackActive: 'bg-gradient-to-r from-purple-500 to-pink-500',
    handle: 'bg-white/90 shadow-xl backdrop-blur-sm',
    dateLabel: 'bg-black/60 backdrop-blur-md text-white border border-white/10',
    timeUnitSelector: 'bg-white/10 backdrop-blur-md',
  }}
/>
```

#### Example 3: Dark Mode Support
```typescript
<DateSlider
  classNames={{
    wrapper: 'bg-gray-100 dark:bg-gray-900',
    track: 'bg-gray-200 dark:bg-gray-800',
    trackActive: 'bg-blue-500 dark:bg-blue-400',
    dateLabel: 'bg-gray-800 text-white dark:bg-gray-200 dark:text-gray-900',
    scaleMark: 'bg-gray-400 dark:bg-gray-600',
    timeUnitText: 'text-gray-700 dark:text-gray-300',
  }}
/>
```

#### Example 4: Custom Brand Colors
```typescript
<DateSlider
  classNames={{
    trackActive: 'bg-[#FF6B35]',  // Arbitrary value for brand color
    dateLabel: 'bg-[#004E89] text-[#F7FFF7]',
    handle: 'bg-[#FF6B35] hover:bg-[#FF8557] focus:ring-[#004E89]',
    cursorLine: 'bg-[#FF6B35]/70',
  }}
/>
```

---

## Solution 2: Variant System with CVA

Using `class-variance-authority` (already installed) for predefined themes.

### Implementation

```typescript
// dateSliderVariants.ts
import { cva, type VariantProps } from 'class-variance-authority';

export const dateSliderVariants = cva('', {
  variants: {
    theme: {
      default: 'dateslider-default',
      ocean: 'dateslider-ocean',
      sunset: 'dateslider-sunset',
      forest: 'dateslider-forest',
      monochrome: 'dateslider-monochrome',
    },
    size: {
      sm: 'dateslider-sm',
      md: 'dateslider-md',
      lg: 'dateslider-lg',
    },
    rounded: {
      none: 'dateslider-rounded-none',
      sm: 'dateslider-rounded-sm',
      md: 'dateslider-rounded-md',
      lg: 'dateslider-rounded-lg',
      full: 'dateslider-rounded-full',
    },
  },
  defaultVariants: {
    theme: 'default',
    size: 'md',
    rounded: 'md',
  },
});

export type DateSliderVariants = VariantProps<typeof dateSliderVariants>;
```

### Theme Definitions (in index.css)

```css
@import "tailwindcss";

@layer components {
  /* Default Theme */
  .dateslider-default {
    --slider-track-active: theme('colors.blue.500');
    --slider-track-inactive: theme('colors.gray.200');
    --slider-handle: theme('colors.white');
    --slider-label-bg: theme('colors.blue.600');
    --slider-label-text: theme('colors.white');
    --slider-cursor: theme('colors.blue.500 / 0.7');
    --slider-scale: theme('colors.gray.700');
  }

  /* Ocean Theme */
  .dateslider-ocean {
    --slider-track-active: theme('colors.cyan.500');
    --slider-track-inactive: theme('colors.blue.100');
    --slider-handle: theme('colors.white');
    --slider-label-bg: theme('colors.cyan.700');
    --slider-label-text: theme('colors.white');
    --slider-cursor: theme('colors.cyan.600 / 0.7');
    --slider-scale: theme('colors.blue.700');
  }

  /* Sunset Theme */
  .dateslider-sunset {
    --slider-track-active: theme('colors.orange.500');
    --slider-track-inactive: theme('colors.orange.50');
    --slider-handle: theme('colors.white');
    --slider-label-bg: theme('colors.orange.700');
    --slider-label-text: theme('colors.white');
    --slider-cursor: theme('colors.orange.600 / 0.7');
    --slider-scale: theme('colors.orange.800');
  }

  /* Forest Theme */
  .dateslider-forest {
    --slider-track-active: theme('colors.green.600');
    --slider-track-inactive: theme('colors.green.100');
    --slider-handle: theme('colors.white');
    --slider-label-bg: theme('colors.green.800');
    --slider-label-text: theme('colors.white');
    --slider-cursor: theme('colors.green.700 / 0.7');
    --slider-scale: theme('colors.green.900');
  }

  /* Monochrome Theme */
  .dateslider-monochrome {
    --slider-track-active: theme('colors.gray.800');
    --slider-track-inactive: theme('colors.gray.200');
    --slider-handle: theme('colors.gray.900');
    --slider-label-bg: theme('colors.gray.900');
    --slider-label-text: theme('colors.white');
    --slider-cursor: theme('colors.gray.800 / 0.7');
    --slider-scale: theme('colors.gray.700');
  }

  /* Size Variants */
  .dateslider-sm {
    --slider-height: 2rem;
    --slider-handle-size: 1.5rem;
    --slider-label-text: theme('fontSize.xs');
  }

  .dateslider-md {
    --slider-height: 3rem;
    --slider-handle-size: 2rem;
    --slider-label-text: theme('fontSize.sm');
  }

  .dateslider-lg {
    --slider-height: 4rem;
    --slider-handle-size: 2.5rem;
    --slider-label-text: theme('fontSize.base');
  }

  /* Rounded Variants */
  .dateslider-rounded-none { --slider-border-radius: 0; }
  .dateslider-rounded-sm { --slider-border-radius: theme('borderRadius.sm'); }
  .dateslider-rounded-md { --slider-border-radius: theme('borderRadius.md'); }
  .dateslider-rounded-lg { --slider-border-radius: theme('borderRadius.lg'); }
  .dateslider-rounded-full { --slider-border-radius: theme('borderRadius.full'); }
}
```

### Update Components to Use CSS Variables

```typescript
// SliderTrack.tsx
<div
  className={cn(
    'absolute h-full rounded-full transition-all duration-200 z-10',
    'bg-[var(--slider-track-active)]',  // Use CSS variable
    props.activeTrackClassName
  )}
/>

// DateLabel.tsx
<div
  className={cn(
    'hidden md:block fixed z-50 transform -translate-x-1/2 px-2 py-1 rounded',
    'bg-[var(--slider-label-bg)] text-[var(--slider-label-text)]',
    labelClassName
  )}
/>

// Scale marks
<div
  className={cn(
    'absolute transform -translate-x-0.5 top-0',
    'bg-[var(--slider-scale)]',
    scaleMarkClassName
  )}
/>
```

### Usage

```typescript
// Simple theme selection
<DateSlider
  theme="ocean"
  size="lg"
  rounded="full"
/>

// With custom overrides
<DateSlider
  theme="sunset"
  classNames={{
    trackActive: '!bg-gradient-to-r from-orange-400 to-pink-500',
  }}
/>
```

---

## Solution 3: Default Classes Props Pattern

Provide sensible defaults but make everything overridable without `!important`.

### Implementation Approach

```typescript
// Instead of hardcoding in className:
// ❌ BAD
className={cn(
  'bg-red-300 text-white',  // Hardcoded
  userClassName
)}

// ✅ GOOD - User classes naturally override defaults
className={cn(
  'bg-red-300',      // Default (lower specificity)
  userClassName      // User override (higher specificity)
)}

// Even better with fallback:
className={cn(
  userClassName || 'bg-red-300'  // Only apply default if user didn't provide
)}
```

### Updated Component Examples

```typescript
// SliderTrack.tsx - Before
<div
  className={cn(
    'absolute h-full bg-red-300 rounded-full transition-all duration-200 z-10',
    props.activeTrackClassName
  )}
/>

// SliderTrack.tsx - After
<div
  className={cn(
    'absolute h-full rounded-full transition-all duration-200 z-10',
    props.activeTrackClassName || 'bg-red-300'  // Default only if not provided
  )}
/>

// DateLabel.tsx - Before
<div
  className={cn(
    'hidden md:block fixed z-50 transform -translate-x-1/2 bg-red-600 text-white text-xs px-2 py-1 rounded',
    labelClassName
  )}
/>

// DateLabel.tsx - After
<div
  className={cn(
    'hidden md:block fixed z-50 transform -translate-x-1/2 text-xs px-2 py-1 rounded',
    labelClassName || 'bg-red-600 text-white'  // Grouped default colors
  )}
/>
```

---

## Solution 4: Preset Configurations

Export ready-to-use Tailwind class configurations.

### Implementation

```typescript
// presets.ts
export const dateSliderPresets = {
  // Default preset
  default: {
    trackActive: 'bg-blue-500',
    trackInactive: 'bg-gray-200',
    handle: 'bg-white shadow-lg hover:shadow-xl',
    dateLabel: 'bg-blue-600 text-white',
    cursorLine: 'bg-blue-500/70',
    scaleMark: 'bg-gray-700',
  },

  // Glassmorphism preset
  glass: {
    wrapper: 'backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl',
    trackActive: 'bg-gradient-to-r from-purple-500/60 to-pink-500/60',
    trackInactive: 'bg-white/5',
    handle: 'bg-white/90 shadow-2xl backdrop-blur-sm hover:bg-white',
    dateLabel: 'bg-black/60 backdrop-blur-md text-white border border-white/10',
    cursorLine: 'bg-white/50',
    scaleMark: 'bg-white/30',
    timeUnitSelector: 'bg-white/10 backdrop-blur-md border border-white/20',
  },

  // Minimal preset
  minimal: {
    trackActive: 'bg-black',
    trackInactive: 'bg-gray-100',
    handle: 'bg-black hover:bg-gray-800',
    dateLabel: 'bg-black text-white text-xs',
    cursorLine: 'bg-black/50',
    scaleMark: 'bg-gray-300',
    timeUnitButton: 'text-black hover:bg-gray-100',
  },

  // Vibrant preset
  vibrant: {
    trackActive: 'bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500',
    trackInactive: 'bg-gradient-to-r from-pink-100 via-purple-100 to-indigo-100',
    handle: 'bg-white shadow-lg shadow-purple-500/50 hover:shadow-xl',
    dateLabel: 'bg-gradient-to-r from-pink-600 to-purple-600 text-white font-semibold',
    cursorLine: 'bg-purple-500',
    scaleMark: 'bg-purple-700',
  },

  // Corporate preset
  corporate: {
    trackActive: 'bg-[#0066CC]',  // Brand blue
    trackInactive: 'bg-[#E5E5E5]',
    handle: 'bg-white border-2 border-[#0066CC] hover:bg-[#0066CC] hover:text-white',
    dateLabel: 'bg-[#0066CC] text-white font-medium',
    cursorLine: 'bg-[#0066CC]/60',
    scaleMark: 'bg-[#333333]',
  },
} as const;

export type PresetName = keyof typeof dateSliderPresets;
```

### Usage

```typescript
import { DateSlider, dateSliderPresets } from 'date-slider-lib';

// Use preset directly
<DateSlider classNames={dateSliderPresets.glass} />

// Use preset with overrides
<DateSlider
  classNames={{
    ...dateSliderPresets.vibrant,
    handle: 'bg-yellow-400 hover:bg-yellow-500',  // Override just the handle
  }}
/>

// Or via preset prop (if we add it to component)
<DateSlider preset="glass" />
```

---

## Recommended Implementation Strategy

### Phase 1: Add Comprehensive className Props (Immediate)
1. Add all className props to `DateSliderClassNames` type
2. Update all internal components to accept and apply these classNames
3. Ensure defaults use the conditional pattern: `userClassName || 'default-classes'`
4. **No breaking changes** - all existing code continues to work

### Phase 2: Add Preset System (Quick Win)
1. Create `presets.ts` with 4-5 high-quality presets
2. Export from main index.ts
3. Add to Storybook with visual examples
4. **Provides instant value** to users wanting quick styling

### Phase 3: Add Variant System with CVA (Optional)
1. Create variant definitions using CVA
2. Add CSS variable support in index.css
3. Add `theme`, `size`, `rounded` props to component
4. **More opinionated** but easier for common use cases

### Phase 4: Documentation
1. Update README with styling examples
2. Create comprehensive Storybook stories for each preset
3. Add "Customization" section to docs
4. Provide migration guide for users upgrading

---

## Code Changes Required

### 1. Update Types

```typescript
// types.ts or DateSlider.tsx
export type DateSliderClassNames = {
  wrapper?: string;
  container?: string;
  track?: string;
  trackActive?: string;
  trackInactive?: string;
  handle?: string;
  handlePoint?: string;
  handleStart?: string;
  handleEnd?: string;
  handleDragging?: string;
  handleIcon?: string;
  dateLabel?: string;
  dateLabelText?: string;
  scaleLabel?: string;
  cursorLine?: string;
  scaleMark?: string;
  scaleMarkMajor?: string;
  scaleMarkMinor?: string;
  timeUnitSelector?: string;
  timeUnitButton?: string;
  timeUnitButtonActive?: string;
  timeUnitText?: string;
  timeDisplay?: string;
  timeDisplayText?: string;
};

export type SliderProps = {
  // ... existing props

  // New
  classNames?: DateSliderClassNames;

  // Deprecate individual className props in favor of classNames object
  /** @deprecated Use classNames.wrapper instead */
  sliderClassName?: string;
  /** @deprecated Use classNames.trackActive instead */
  trackActiveClassName?: string;
  // ... etc
};
```

### 2. Update Components

```typescript
// SliderTrack.tsx
export function SliderTrack(props: SliderTrackProps) {
  const {
    classNames,
    // Backward compatibility
    activeTrackClassName,
    className,
    // ...
  } = props;

  return (
    <div className={cn(
      'relative h-full rounded-full',
      classNames?.track || className || 'bg-gray-200'
    )}>
      {/* Active track */}
      <div
        className={cn(
          'absolute h-full rounded-full transition-all duration-200 z-10',
          classNames?.trackActive || activeTrackClassName || 'bg-red-300'
        )}
      />

      {/* Cursor line */}
      <div
        className={cn(
          'hidden md:block absolute top-0 h-full w-px',
          classNames?.cursorLine || 'bg-red-500/70'
        )}
      />

      {/* Scale marks */}
      <div
        className={cn(
          'absolute transform -translate-x-0.5 top-0',
          scale.type === 'major'
            ? classNames?.scaleMarkMajor || 'bg-slate-700'
            : classNames?.scaleMarkMinor || 'bg-slate-700/50'
        )}
      />
    </div>
  );
}
```

### 3. Create Presets File

```typescript
// src/components/DateSlider/presets.ts
import type { DateSliderClassNames } from './types';

export const dateSliderPresets: Record<string, DateSliderClassNames> = {
  default: { /* ... */ },
  glass: { /* ... */ },
  minimal: { /* ... */ },
  vibrant: { /* ... */ },
  corporate: { /* ... */ },
};
```

### 4. Export Presets

```typescript
// src/index.ts
export { DateSlider } from './components/DateSlider';
export { dateSliderPresets } from './components/DateSlider/presets';
export type { DateSliderClassNames, PresetName } from './components/DateSlider/types';
```

---

## Benefits of Tailwind-Only Approach

✅ **Consistency** - Everything styled with Tailwind
✅ **Zero Runtime** - No CSS-in-JS overhead
✅ **Tree-shakeable** - Unused classes purged automatically
✅ **IntelliSense** - Full autocomplete for Tailwind classes
✅ **Dark Mode** - Built-in dark mode support
✅ **Responsive** - Built-in responsive modifiers
✅ **Theme Integration** - Uses Tailwind theme tokens
✅ **No Style Conflicts** - No specificity wars with inline styles
✅ **Better DX** - Developers familiar with Tailwind can immediately customize

---

## Testing Checklist

- [ ] All hardcoded colors removed from components
- [ ] All className props functional
- [ ] Presets exported and working
- [ ] Backward compatibility maintained (old className props still work)
- [ ] Storybook stories for each preset
- [ ] Dark mode examples
- [ ] Responsive examples
- [ ] Documentation updated
- [ ] TypeScript types complete
- [ ] No Tailwind class conflicts
