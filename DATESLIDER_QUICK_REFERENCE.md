# DateSlider Component - Quick Reference Guide

## Props Overview

### Required Props (5)
```typescript
viewMode: 'point' | 'range' | 'combined'
startDate: Date (UTC)
endDate: Date (UTC)
initialTimeUnit: 'day' | 'month' | 'year'
onChange: (selection: SelectionResult) => void
```

### Optional Props by Category (30+)

#### Initial State (3)
- `initialRange?` - Start/end dates for range mode
- `initialPoint?` - Selected date for point mode
- `granularity?` - 'day' | 'hour' | 'minute' (default: 'day')

#### Styling/CSS (6) - classNames only
- `wrapperClassName?` - Root container
- `sliderClassName?` - Slider padding wrapper
- `trackBaseClassName?` - Track background
- `trackActiveClassName?` - Active range/point fill
- `timeUnitSelectionClassName?` - Time unit selector
- `timeDisplayClassName?` - Time display panel

#### Icons (2)
- `pointHandleIcon?` - ReactNode for point handle
- `rangeHandleIcon?` - ReactNode for range handles

#### Layout (4)
- `sliderWidth?` - 'fill' | number
- `sliderHeight?` - pixels
- `trackPaddingX?` - horizontal padding (default: 36)
- `isTrackFixedWidth?` - boolean (default: false)

#### Behavior (4)
- `scrollable?` - horizontal scroll (default: true)
- `minGapScaleUnits?` - min gap between handles (default: 3)
- `freeSelectionOnTrackClick?` - free vs scale-aligned (default: false)
- `labelPersistent?` - persist date labels

#### Features (3) - Feature Flags
- `timeUnitSelectionEnabled?` - Show day/month/year selector (default: true)
- `timeDisplayEnabled?` - Show time input (default: false)
- `withEndLabel?` - Show end date label (default: true)

#### Advanced (2)
- `scaleUnitConfig?` - Customize scale appearance
- `imperativeHandleRef?` - Ref for setDateTime/focusHandle

---

## Component Hierarchy

```
DateSlider
├─ TimeDisplay (optional, timeDisplayEnabled)
│  └─ Arrow buttons for increment/decrement
│
├─ SliderContainer (scrollable div)
│  └─ SliderTrack
│     ├─ Scales (tick marks)
│     ├─ CursorLine (hover indicator)
│     ├─ DateLabel (hover tooltip)
│     └─ Active Track (range/point fill)
│
│  ├─ TimeUnitLabels (date labels)
│  └─ RenderSliderHandle
│     ├─ SliderHandle (start) [range/combined]
│     ├─ SliderHandle (end) [range/combined]
│     └─ SliderHandle (point) [point/combined]
│
└─ TimeUnitSelection (optional, timeUnitSelectionEnabled)
   └─ Day/Month/Year selector buttons
```

---

## Hardcoded Customizations (Cannot Override)

### Colors
| Element | Color | Location |
|---------|-------|----------|
| Active Track (Point) | `bg-red-300` | SliderTrack.tsx |
| Active Track (Range) | `bg-blue-500/30` | SliderTrack.tsx |
| Scale Marks | `bg-slate-700` | SliderTrack.tsx |
| Cursor Line | `bg-red-500/70` | SliderTrack.tsx |
| Date Label BG | `bg-red-600` | DateLabel.tsx |
| Date Label Text | `text-white` | DateLabel.tsx |
| Time Unit Text | `text-slate-700` | TimeUnitSelection.tsx |
| Labels | `text-slate-700` | TimeUnitLabels.tsx |

### Interactive States
| State | Effect |
|-------|--------|
| Handle Hover | `scale-110` |
| Handle Focus | `outline-blue-500` |
| Handle Drag | `scale-110` |

### Locale
- Hardcoded to `'en-AU'` in SliderHandle and SliderTrack

---

## Customization Capabilities Matrix

| Feature | Current | Gap | Priority |
|---------|---------|-----|----------|
| **Styling** | classNames only | No CSS objects, hardcoded colors | HIGH |
| **Icons** | ReactNode props | Limited (inside Button) | MEDIUM |
| **Behavior** | Boolean flags | No composition/render props | HIGH |
| **Scale** | ScaleUnitConfig | Good coverage | LOW |
| **Layout** | Width/height/padding | Missing Y-axis options | LOW |
| **Components** | Not exported | No slot/render pattern | HIGH |
| **Props Organization** | Flat (30+ props) | Should group into objects | HIGH |
| **Type Safety** | Partial (discriminated SelectionResult) | Missing mode-specific validation | HIGH |

---

## Key Issues

### 1. Large Props Interface (30+)
- No grouping or organization
- Difficult discoverability
- Mix of concerns

### 2. Limited Styling
- Only classNames, no styles objects
- Hardcoded colors can't be overridden
- Must use Tailwind to override

### 3. No Rendering Customization
- Cannot replace internal components
- No render props pattern
- No slot/compound component pattern

### 4. Mode-Specific Props Not Validated
- `initialRange` accepted in point mode (ignored)
- `initialPoint` accepted in range mode (ignored)
- No TypeScript discrimination

### 5. Unclear Time Unit vs Granularity
- Two related concepts with confusing names
- Invalid combinations possible (e.g., month timeUnit with hour granularity)
- Documentation explains but no validation

### 6. Inconsistent Naming
- `trackPaddingX` (abbreviated) vs `sliderWidth` (full)
- `isTrackFixedWidth` (has prefix) vs `scrollable` (no prefix)
- `wrapperClassName` (verbose) vs `sliderClassName` (ambiguous)

### 7. Feature Flags Scattered
- 4 separate boolean flags: `timeUnitSelectionEnabled`, `timeDisplayEnabled`, `withEndLabel`, `labelPersistent`
- Should be grouped in `features` object

### 8. Imperative API Under-documented
- `imperativeHandleRef` at end of prop list
- Limited guidance on when to use vs declarative
- No section comparing approaches

---

## Selection Output Structure

### Point Mode
```typescript
{ point: Date }
```

### Range Mode
```typescript
{ range: { start: Date; end: Date } }
```

### Combined Mode
```typescript
{ 
  point: Date;
  range: { start: Date; end: Date }
}
```

---

## Imperative API

```typescript
// Access via imperativeHandleRef prop
const sliderRef = useRef<SliderExposedMethod>(null);

<DateSlider imperativeHandleRef={sliderRef} ... />

// Methods available:
sliderRef.current?.setDateTime(date, target?)  // Set date for specific handle
sliderRef.current?.focusHandle(handleType)    // Focus a handle ('point', 'start', 'end')
```

---

## Recommended Next Steps

### High Priority
1. Group props into configuration objects (styles, layout, behavior, features)
2. Add mode-specific type discrimination with discriminated unions
3. Support render props or export internal components for composition
4. Add style object props for color customization

### Medium Priority
5. Clarify/validate TimeUnit vs Granularity relationship
6. Standardize prop naming conventions
7. Better organize feature flags
8. Improve imperative API documentation

### Low Priority
9. Add Context/Provider pattern for external state access
10. Document color/style defaults and reasoning
11. Provide Tailwind override examples
12. Fix hardcoded locale

---

## Files Analyzed

- `/src/components/DateSlider/type.ts` - Type definitions
- `/src/components/DateSlider/DateSlider.tsx` - Main component (525 lines)
- `/src/components/DateSlider/constants.ts` - Constants and defaults
- `/src/components/DateSlider/components/` - Internal components
  - SliderTrack.tsx
  - SliderHandle.tsx
  - TimeDisplay.tsx
  - TimeUnitSelection.tsx
  - TimeUnitLabels.tsx
  - DateLabel.tsx
- `/src/components/DateSlider/README.md` - 665 lines of documentation

---

## Documentation Status

✅ Strengths
- Comprehensive 665-line README
- Clear architecture explanation
- Migration guide
- 4 code examples
- Troubleshooting section
- Type-level JSDoc

⚠️ Gaps
- No JSDoc for SliderProps
- Missing prop interaction examples
- No performance guidance
- No complex customization examples
- Locale hardcoding not documented
