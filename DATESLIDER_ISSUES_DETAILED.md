# DateSlider Component - Detailed Issue Examples

## Issue 1: Large & Fragmented Props Interface

### Current Problem
30+ props without clear organization scattered throughout SliderProps type.

### Detailed Breakdown

```typescript
// Current SliderProps - All props in one flat object
export type SliderProps = {
  // 5 required, 25+ optional props all mixed together
  viewMode: ViewMode;
  startDate: Date;
  endDate: Date;
  initialTimeUnit: TimeUnit;
  onChange: (selection: SelectionResult) => void;
  initialRange?: { start: Date; end: Date };
  initialPoint?: Date;
  granularity?: DateGranularity;
  wrapperClassName?: string;
  sliderClassName?: string;
  timeUnitSelectionClassName?: string;
  timeDisplayClassName?: string;
  trackBaseClassName?: string;
  trackActiveClassName?: string;
  pointHandleIcon?: ReactNode;
  rangeHandleIcon?: ReactNode;
  scrollable?: boolean;
  isTrackFixedWidth?: boolean;
  minGapScaleUnits?: number;
  scaleUnitConfig?: ScaleUnitConfig;
  trackPaddingX?: number;
  sliderWidth?: 'fill' | number;
  sliderHeight?: number;
  imperativeHandleRef?: React.Ref<SliderExposedMethod>;
  withEndLabel?: boolean;
  timeUnitSelectionEnabled?: boolean;
  timeDisplayEnabled?: boolean;
  freeSelectionOnTrackClick?: boolean;
  labelPersistent?: boolean;
};
```

### Discovery Problem

```typescript
// This is what developers see in IDE autocomplete:
<DateSlider
  viewMode="point"
  startDate={...}
  endDate={...}
  initialTimeUnit="day"
  onChange={...}
  // Now 25+ optional props without clear organization
  initialRange? initialPoint? granularity? 
  wrapperClassName? sliderClassName? timeUnitSelectionClassName?
  // ... very long list, hard to find what you need
/>
```

### Proposed Solution

```typescript
// Organized configuration objects
type StyleConfig = {
  wrapper?: string;
  slider?: string;
  track?: { base?: string; active?: string };
  timeUnit?: string;
  timeDisplay?: string;
};

type LayoutConfig = {
  width?: 'fill' | number;
  height?: number;
  padding?: { x?: number; y?: number };
  fixedWidth?: boolean;
};

type BehaviorConfig = {
  scrollable?: boolean;
  minGapScaleUnits?: number;
  freeSelectionOnTrackClick?: boolean;
  labelPersistent?: boolean;
};

type Features = {
  timeUnitSelector?: boolean;
  timeDisplay?: boolean;
  endLabel?: boolean;
  persistentLabels?: boolean;
};

export type SliderProps = {
  // Required core (5 props)
  viewMode: ViewMode;
  startDate: Date;
  endDate: Date;
  initialTimeUnit: TimeUnit;
  onChange: (selection: SelectionResult) => void;
  
  // Initial state (3 props)
  initialRange?: { start: Date; end: Date };
  initialPoint?: Date;
  granularity?: DateGranularity;
  
  // Customization groups (5 config objects)
  icons?: { point?: ReactNode; range?: ReactNode };
  styles?: Partial<StyleConfig>;
  layout?: Partial<LayoutConfig>;
  behavior?: Partial<BehaviorConfig>;
  scale?: ScaleUnitConfig;
  features?: Partial<Features>;
  
  // Imperative API
  imperativeHandleRef?: React.Ref<SliderExposedMethod>;
};

// Usage becomes much clearer:
<DateSlider
  viewMode="point"
  startDate={...}
  endDate={...}
  initialTimeUnit="day"
  onChange={...}
  
  // Grouped configurations
  icons={{ point: <MyIcon /> }}
  styles={{ wrapper: 'my-wrapper', track: { active: 'my-active' } }}
  layout={{ width: 'fill', height: 80 }}
  behavior={{ scrollable: true, labelPersistent: true }}
  features={{ timeDisplay: true, timeUnitSelector: true }}
/>
```

### Benefits
- From 30 flat props to ~8 prop holes
- Clear organization by concern
- Better IDE autocomplete
- Easier to discover available options
- Smaller prop interface surface

---

## Issue 2: Limited Styling Customization

### Current Problem
Only classNames accepted. Core colors are hardcoded and cannot be changed.

### Hardcoded Colors in Code

```typescript
// SliderTrack.tsx - HARDCODED COLORS, no way to customize
<div
  className={cn(
    'absolute h-full bg-red-300 rounded-full transition-all duration-200 z-10',  // HARDCODED bg-red-300
    'motion-reduce:transition-none',
    props.activeTrackClassName  // Only className override allowed
  )}
  style={{ width: `${props.pointPosition}%` }}
/>

// Range mode
<div
  className={cn(
    'absolute h-full bg-blue-500/30 transition-all duration-200 z-10',  // HARDCODED bg-blue-500/30
    'motion-reduce:transition-none',
    props.activeTrackClassName
  )}
  style={{
    left: `${props.rangeStart}%`,
    width: `${(props.rangeEnd ?? 0) - (props.rangeStart ?? 0)}%`,
  }}
/>

// DateLabel.tsx - HARDCODED
className={cn(
  'hidden md:block fixed z-50 transform -translate-x-1/2 bg-red-600 text-white text-xs px-2 py-1 rounded',
  // ^^^ bg-red-600 and text-white are hardcoded
  labelClassName
)}

// SliderTrack.tsx - HARDCODED scale marks color
<div
  key={index}
  className="absolute bg-slate-700 transform -translate-x-0.5 top-0"  // HARDCODED bg-slate-700
  style={{ left: `${scale.position}%`, ...getSize(scale.type) }}
  aria-hidden="true"
/>

// SliderTrack.tsx - HARDCODED cursor line
className={cn(
  'hidden md:block absolute top-0 h-full w-px bg-red-500/70 ...',  // HARDCODED bg-red-500/70
  className
)}
```

### Current Workarounds Required

```typescript
// To change colors, users must use Tailwind's important modifier:
<DateSlider
  trackActiveClassName="!bg-green-500"  // Must use important override
  // But this only works if there's a className prop available
/>

// Many things CANNOT be overridden:
// - Cursor line color (no prop at all)
// - Scale mark color (no prop at all)
// - Date label colors (labelClassName prop exists but not for all colors)
// - Handle hover/active colors (Button component internal)
```

### Proposed Solution

```typescript
type ColorScheme = {
  // Track
  activeTrackPoint?: string;      // default: 'bg-red-300'
  activeTrackRange?: string;      // default: 'bg-blue-500/30'
  
  // Visual indicators
  cursorLine?: string;            // default: 'bg-red-500/70'
  scaleMarks?: string;            // default: 'bg-slate-700'
  
  // Labels
  dateLabel?: {
    background?: string;          // default: 'bg-red-600'
    text?: string;               // default: 'text-white'
  };
  
  // Other elements
  timeUnitText?: string;          // default: 'text-slate-700'
  labels?: string;                // default: 'text-slate-700'
  handleFocus?: string;           // default: 'outline-blue-500'
};

export type SliderProps = {
  // ... other props
  colorScheme?: Partial<ColorScheme>;
};

// Usage:
<DateSlider
  colorScheme={{
    activeTrackPoint: 'bg-green-500',
    activeTrackRange: 'bg-green-300/40',
    cursorLine: 'bg-green-600',
    scaleMarks: 'bg-gray-400',
    dateLabel: { background: 'bg-green-700', text: 'text-white' },
  }}
/>
```

### Alternative: CSS Cascade Approach

```typescript
// Allow CSS variable customization
:root {
  --slider-active-track-point: rgb(252, 165, 165);  /* red-300 */
  --slider-active-track-range: rgb(59, 130, 246, 0.3);  /* blue-500/30 */
  --slider-cursor-line: rgb(239, 68, 68, 0.7);  /* red-500/70 */
  --slider-scale-marks: rgb(71, 85, 99);  /* slate-700 */
  --slider-label-bg: rgb(220, 38, 38);  /* red-600 */
  --slider-label-text: rgb(255, 255, 255);  /* white */
}

// Then in components:
<div
  style={{
    backgroundColor: 'var(--slider-active-track-point)',
  }}
/>
```

---

## Issue 3: No Render Customization (No Slots/Render Props)

### Current Problem
Cannot customize how handles, track, labels are rendered.

### What Users Cannot Do

```typescript
// Cannot customize handle appearance
<DateSlider
  // You can pass an icon, but it goes INSIDE the Button component
  pointHandleIcon={<CustomIcon />}
  // But you cannot:
  // - Use a custom component instead of Button
  // - Customize handle positioning
  // - Add custom attributes (data-*, aria-*)
  // - Apply custom hover/focus states
  // - Create a completely different handle design
/>

// Cannot customize track appearance
<DateSlider
  trackActiveClassName="my-active"
  // But you cannot:
  // - Render a custom progress bar
  // - Add custom SVG shapes
  // - Render multiple layers
  // - Animate differently
/>

// Cannot customize date labels
<DateSlider
  // No way to pass custom date label component at all
  // Must accept the fixed "red background" tooltip
/>

// Cannot add custom overlays/annotations
<DateSlider
  // Want to add a "today" marker?
  // Want to add disabled date ranges?
  // Want to add custom tooltips on hover?
  // No way to do it - component is closed
/>
```

### Proposed Solution: Render Props Pattern

```typescript
type SliderRenderProps = {
  handle?: (props: {
    position: number;
    label: string;
    isDragging: boolean;
    type: 'start' | 'end' | 'point';
    ref: React.RefObject<HTMLElement>;
    onMouseDown: (e: React.MouseEvent) => void;
    onTouchStart: (e: React.TouchEvent) => void;
    onKeyDown: (e: React.KeyboardEvent) => void;
  }) => React.ReactNode;
  
  trackActive?: (props: {
    mode: 'point' | 'range' | 'combined';
    pointPosition?: number;
    rangeStart?: number;
    rangeEnd?: number;
  }) => React.ReactNode;
  
  dateLabel?: (props: {
    date: Date;
    position: { x: number; y: number };
    isVisible: boolean;
  }) => React.ReactNode;
  
  scales?: (props: {
    scales: Scale[];
    scaleUnitConfig: ScaleUnitConfig;
  }) => React.ReactNode;
  
  timeUnitSelection?: (props: {
    timeUnit: TimeUnit;
    isMonthValid: boolean;
    isYearValid: boolean;
    onChange: (unit: TimeUnit) => void;
  }) => React.ReactNode;
};

export type SliderProps = {
  // ... other props
  render?: Partial<SliderRenderProps>;
};

// Usage:
<DateSlider
  render={{
    handle: (props) => (
      <CustomHandle
        position={props.position}
        isDragging={props.isDragging}
        onMouseDown={props.onMouseDown}
      >
        {props.label}
      </CustomHandle>
    ),
    trackActive: (props) => (
      <div
        style={{
          left: `${props.rangeStart}%`,
          width: `${props.rangeEnd - props.rangeStart}%`,
          backgroundColor: '#10b981',
        }}
      />
    ),
    dateLabel: (props) => (
      props.isVisible && (
        <CustomTooltip position={props.position}>
          {formatDate(props.date, 'custom-format')}
        </CustomTooltip>
      )
    ),
  }}
/>
```

### Alternative: Compound Component Pattern

```typescript
<DateSlider>
  <DateSlider.Container>
    <DateSlider.Track>
      <DateSlider.Scales />
      <DateSlider.ActiveTrack />
      <DateSlider.Handles>
        <DateSlider.Handle type="point" />
        <DateSlider.Handle type="start" />
        <DateSlider.Handle type="end" />
      </DateSlider.Handles>
    </DateSlider.Track>
  </DateSlider.Container>
  <DateSlider.TimeUnitSelector />
</DateSlider>
```

---

## Issue 4: Mode-Specific Props Not Validated

### Current Problem
Component accepts props that don't apply to current viewMode.

### Examples of Invalid Combinations

```typescript
// Point mode but range prop provided - SILENTLY IGNORED
<DateSlider
  viewMode="point"
  initialPoint={toUTCDate('2024-01-15')}
  initialRange={{ start: toUTCDate('2024-01-01'), end: toUTCDate('2024-12-31') }}
  // ^^ initialRange is completely ignored, no error, no warning
/>

// Range mode but point prop provided - SILENTLY IGNORED
<DateSlider
  viewMode="range"
  initialRange={{ start: toUTCDate('2024-01-01'), end: toUTCDate('2024-12-31') }}
  initialPoint={toUTCDate('2024-01-15')}
  // ^^ initialPoint is completely ignored
/>

// Combined mode without point - ALLOWS IT
<DateSlider
  viewMode="combined"
  initialRange={{ start: toUTCDate('2024-01-01'), end: toUTCDate('2024-12-31') }}
  // ^^ initialPoint is optional, but combined mode needs both
/>
```

### Proposed Solution: Discriminated Unions

```typescript
type CommonSliderProps = {
  startDate: Date;
  endDate: Date;
  initialTimeUnit: TimeUnit;
  granularity?: DateGranularity;
  onChange: (selection: SelectionResult) => void;
  // ... all other non-mode-specific props
};

type PointModeSliderProps = CommonSliderProps & {
  viewMode: 'point';
  initialPoint?: Date;
  // initialRange is NOT allowed here
};

type RangeModeSliderProps = CommonSliderProps & {
  viewMode: 'range';
  initialRange?: { start: Date; end: Date };
  // initialPoint is NOT allowed here
};

type CombinedModeSliderProps = CommonSliderProps & {
  viewMode: 'combined';
  initialRange?: { start: Date; end: Date };
  initialPoint?: Date;
  // Both are allowed
};

export type SliderProps = PointModeSliderProps | RangeModeSliderProps | CombinedModeSliderProps;

// Now TypeScript ensures correct usage:
<DateSlider viewMode="point" initialPoint={date} />           // OK
<DateSlider viewMode="point" initialRange={{...}} />          // ERROR: Property 'initialRange' does not exist
<DateSlider viewMode="range" initialRange={{...}} />          // OK
<DateSlider viewMode="range" initialPoint={date} />           // ERROR: Property 'initialPoint' does not exist
<DateSlider viewMode="combined" initialRange={{...}} initialPoint={date} />  // OK
```

---

## Issue 5: Time Unit vs Granularity Confusion

### Current Problem
Two related but distinct concepts with confusing names and no validation.

### The Confusion

```typescript
initialTimeUnit: 'day' | 'month' | 'year'    // Controls SCALE DISPLAY
granularity: 'day' | 'hour' | 'minute'       // Controls DATA PRECISION

// Documentation says they're different, but what about invalid combinations?
<DateSlider
  initialTimeUnit="month"   // Show month-level scale marks
  granularity="hour"        // But user can select hours!?
  // This combination doesn't make sense
  // - Users see monthly scales
  // - But can increment by hours
  // - Result: confusing UX
/>

<DateSlider
  initialTimeUnit="year"    // Show yearly scales
  granularity="minute"      // But user can select minutes!?
  // Even more confusing
/>
```

### Valid Combinations (Should Allow)

```
timeUnit='day'   + granularity='day'     ✓ (show days, select days)
timeUnit='month' + granularity='day'     ✓ (show months, select days within month)
timeUnit='year'  + granularity='day'     ✓ (show years, select days)
timeUnit='year'  + granularity='month'   ✓ (show years, select months)

timeUnit='day'   + granularity='hour'    ✓ (show days, select hours)
timeUnit='month' + granularity='hour'    ✓ (show months, select hours)
```

### Invalid Combinations (Should Reject)

```
timeUnit='month' + granularity='hour'    ✗ (scales too big for precision)
timeUnit='year'  + granularity='hour'    ✗ (scales way too big)
timeUnit='year'  + granularity='minute'  ✗ (scales way too big)
```

### Proposed Solution: Validation + Renaming

```typescript
type DisplayGranularity = 'day' | 'month' | 'year';
type SelectionGranularity = 'day' | 'hour' | 'minute';

type SliderProps = {
  // ... other props
  displayGranularity: DisplayGranularity;      // Controls what scale marks show
  selectionGranularity?: SelectionGranularity; // Controls data precision
};

// Helper to validate combinations
function isValidGranularityCombination(
  display: DisplayGranularity,
  selection: SelectionGranularity
): boolean {
  const validCombos = [
    ['day', 'day'],
    ['day', 'hour'],
    ['day', 'minute'],
    ['month', 'day'],
    ['month', 'hour'],
    ['month', 'minute'],
    ['year', 'day'],
    ['year', 'month'],
  ];
  
  return validCombos.some(
    ([d, s]) => d === display && s === selection
  );
}

// In component:
<DateSlider
  displayGranularity="month"
  selectionGranularity="hour"
  // Validation could happen in useEffect or even at type level
/>
```

---

## Issue 6: Inconsistent Naming

### Current Naming Problems

```typescript
// Width/Padding abbreviations inconsistent
trackPaddingX       // abbreviated X axis
sliderWidth         // full word
sliderHeight        // full word
// What about Y padding? Not clear there's no Y option

// Boolean flag naming inconsistent
isTrackFixedWidth   // prefix "is"
scrollable          // no prefix
freeSelectionOnTrackClick  // descriptive but long
labelPersistent     // what does "persistent" mean without context?

// ClassName suffix context unclear
wrapperClassName    // "wrapper" - which wrapper?
sliderClassName     // "slider" - which slider?
trackBaseClassName  // "base" - base track? background track?
trackActiveClassName // better - clearly the active part
timeUnitSelectionClassName  // clear
timeDisplayClassName // clear

// Inconsistent prefix usage
timeUnitSelectionEnabled  // "Enabled" suffix
timeDisplayEnabled        // "Enabled" suffix
withEndLabel              // "with" prefix
freeSelectionOnTrackClick // "free" + "On" pattern
labelPersistent           // no prefix/suffix
```

### Proposed Standardization

```typescript
// GROUP 1: Styling - use consistent 'styles' namespace
styles?: {
  wrapper?: string;      // Root container
  slider?: string;       // Slider padding wrapper
  container?: string;    // Main container
  track?: {
    container?: string;  // Track background
    active?: string;     // Active range/point fill
  };
  label?: string;        // Date labels
  timeUnit?: string;     // Time unit selector
  timeDisplay?: string;  // Time display
  handle?: string;       // Handle appearance
};

// GROUP 2: Behavior - use consistent 'behavior' namespace and 'is/allow' prefix
behavior?: {
  isScrollable?: boolean;           // Enable horizontal scrolling
  isFixedWidth?: boolean;           // Fixed track width
  allowFreeSelection?: boolean;     // Free vs scale-aligned selection
  persistLabels?: boolean;          // Keep date labels visible
};

// GROUP 3: Layout - use consistent 'layout' namespace
layout?: {
  width?: 'fill' | number;
  height?: number;
  padding?: { x?: number };
};

// GROUP 4: Features - use consistent 'features' namespace
features?: {
  timeUnitSelector?: boolean;
  timeDisplay?: boolean;
  endLabel?: boolean;
  persistentLabels?: boolean;
};

// GROUP 5: Display - use consistent 'displayGranularity' naming
displayGranularity?: DisplayGranularity;

// Now all grouped and consistent:
<DateSlider
  styles={{
    wrapper: 'my-wrapper',
    track: { active: 'my-active' },
  }}
  behavior={{
    isScrollable: true,
    allowFreeSelection: false,
  }}
  layout={{
    width: 'fill',
    height: 80,
    padding: { x: 40 },
  }}
  features={{
    timeUnitSelector: true,
    timeDisplay: true,
  }}
  displayGranularity="day"
/>
```

---

## Issue 7: Feature Flags Scattered

### Current Problem
4 boolean flags for features, not grouped.

```typescript
// Scattered across props
timeUnitSelectionEnabled?: boolean    // Show day/month/year selector
timeDisplayEnabled?: boolean          // Show time input/display
withEndLabel?: boolean                // Show end date label
labelPersistent?: boolean             // Persist labels

// No documentation of dependencies/interactions
// No clear indication of which features work together
```

### Proposed Solution

```typescript
type Features = {
  timeUnitSelector?: boolean;      // Day/month/year zoom selector
  timeDisplay?: boolean;           // Time input/display panel
  endLabel?: boolean;              // End date label
  persistentLabels?: boolean;      // Persistent date labels
  keyboard?: boolean;              // Keyboard navigation (always on)
  accessibility?: boolean;         // Full a11y features
};

export type SliderProps = {
  // ... other props
  features?: Partial<Features>;
};

// Usage:
<DateSlider
  features={{
    timeUnitSelector: true,
    timeDisplay: true,
    endLabel: true,
    persistentLabels: true,
  }}
/>

// Or with all features enabled
<DateSlider
  features={{
    timeUnitSelector: true,
    timeDisplay: true,
    endLabel: true,
    persistentLabels: true,
  }}
/>

// Minimal configuration
<DateSlider
  features={{
    timeUnitSelector: false,
    timeDisplay: false,
  }}
/>
```

### Benefits
- All features in one place
- Clear to see all available features
- Easier to document dependencies
- Can provide presets (minimal, standard, full)
- IDE autocomplete shows all features together

---

## Issue 8: Imperative API Under-documented

### Current Problem
`imperativeHandleRef` is hidden at the end of props list and under-documented.

```typescript
// In type.ts - Easy to miss
imperativeHandleRef?: React.Ref<SliderExposedMethod>;

// In README - Only one example
const sliderRef = useRef<SliderExposedMethod>(null);
sliderRef.current?.setDateTime(toUTCDate('2024-07-01'), 'point');
sliderRef.current?.focusHandle('point');

// No guidance on:
// - When to use imperative vs declarative
// - Performance implications
// - State synchronization issues
// - Best practices
```

### Proposed Solution: Better Documentation

```typescript
// In type.ts with clear JSDoc
/**
 * Reference to imperative API methods
 * 
 * Use for programmatic control:
 * - Jump to specific date
 * - Focus specific handle
 * - Reset selection
 * 
 * @example
 * const sliderRef = useRef<SliderExposedMethod>(null);
 * <DateSlider imperativeHandleRef={sliderRef} ... />
 * sliderRef.current?.setDateTime(date, 'point');
 */
imperativeHandleRef?: React.Ref<SliderExposedMethod>;
```

### In README: New "Imperative vs Declarative" Section

```markdown
## Imperative vs Declarative API

### Declarative (Recommended)

Use `onChange` callback and state management:

```typescript
const [selectedDate, setSelectedDate] = useState('2024-01-15');

<DateSlider
  initialPoint={toUTCDate(selectedDate)}
  onChange={(selection) => {
    if ('point' in selection) {
      setSelectedDate(toISODateString(selection.point));
    }
  }}
/>
```

Pros:
- React-idiomatic
- Easier to reason about state
- Works well with form libraries
- Better for testing

Cons:
- Slightly more code for simple cases

### Imperative (For Advanced Cases)

Use `imperativeHandleRef` for programmatic control:

```typescript
const sliderRef = useRef<SliderExposedMethod>(null);

const jumpToToday = () => {
  const today = new Date();
  const utcToday = new Date(Date.UTC(
    today.getUTCFullYear(),
    today.getUTCMonth(),
    today.getUTCDate()
  ));
  sliderRef.current?.setDateTime(utcToday, 'point');
};

<>
  <button onClick={jumpToToday}>Jump to Today</button>
  <DateSlider imperativeHandleRef={sliderRef} ... />
</>
```

Pros:
- Quick for one-off actions
- No state management needed
- Direct method calls

Cons:
- Harder to test
- Doesn't maintain state sync
- Not React-idiomatic

### When to Use Imperative

- Quick actions: "Jump to today", "Clear selection"
- Form integration: Pre-fill after validation error
- External controls: Buttons/menus outside component
- One-off updates: Not continuous state management

### When to Use Declarative

- Primary interaction: User dragging slider
- Form fields: Manage dates like other inputs
- Multiple selections: Range + point selection
- State persistence: Save/restore selection
```

---

## Summary Table of Issues

| Issue | Severity | Impact | Fix Complexity |
|-------|----------|--------|-----------------|
| Large props interface | HIGH | Discoverability, API clarity | MEDIUM |
| Limited styling | HIGH | Customization, theming | MEDIUM |
| No render customization | HIGH | Advanced use cases | HIGH |
| Mode validation missing | MEDIUM | Type safety, DX | LOW |
| Time unit vs granularity | MEDIUM | Confusion, edge cases | LOW |
| Inconsistent naming | MEDIUM | Discoverability, clarity | MEDIUM |
| Scattered feature flags | LOW | Organization | LOW |
| Imperative API docs | LOW | Discoverability | LOW |

