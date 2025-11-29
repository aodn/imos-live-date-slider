# DateSlider Library Improvement Roadmap

## Overview
This roadmap prioritizes improvements for making DateSlider a production-ready, highly customizable public UI library using **Tailwind CSS exclusively**.

---

## Priority 1: Styling System (HIGH IMPACT, LOW EFFORT)

### Goal
Make DateSlider fully customizable with Tailwind CSS while maintaining zero breaking changes.

### Tasks

#### 1.1 Add Comprehensive className Props
**Effort:** 2-3 hours
**Impact:** Immediate user value

```typescript
// Add DateSliderClassNames type with ~20 className props
type DateSliderClassNames = {
  wrapper?: string;
  track?: string;
  trackActive?: string;
  handle?: string;
  dateLabel?: string;
  cursorLine?: string;
  scaleMark?: string;
  timeUnitSelector?: string;
  // ... etc
};
```

**Files to modify:**
- `src/components/DateSlider/DateSlider.tsx` - Add classNames prop
- `src/components/DateSlider/components/SliderTrack.tsx` - Apply classNames
- `src/components/DateSlider/components/SliderHandle.tsx` - Apply classNames
- `src/components/DateSlider/components/DateLabel.tsx` - Apply classNames
- `src/components/DateSlider/components/TimeUnitSelection.tsx` - Apply classNames

**Benefits:**
- ✅ Users can customize every visual element
- ✅ No more `!important` hacks needed
- ✅ Full Tailwind utility support
- ✅ Dark mode, responsive, hover states all work
- ✅ Zero breaking changes (backward compatible)

---

#### 1.2 Create Preset Library
**Effort:** 1-2 hours
**Impact:** Quick wins for users

Create 5-6 beautiful, ready-to-use presets:
- `default` - Current blue theme
- `glass` - Glassmorphism (already in stories)
- `minimal` - Clean monochrome
- `vibrant` - Gradient colors
- `corporate` - Professional brand colors
- `dark` - Dark mode optimized

```typescript
// src/components/DateSlider/presets.ts
export const dateSliderPresets = {
  glass: {
    wrapper: 'backdrop-blur-xl bg-white/10 border border-white/20',
    trackActive: 'bg-gradient-to-r from-purple-500/60 to-pink-500/60',
    // ... complete preset
  },
  // ... other presets
};
```

**Files to create:**
- `src/components/DateSlider/presets.ts` - Preset definitions
- `src/components/DateSlider/DateSlider.presets.stories.tsx` - Storybook examples

**Files to modify:**
- `src/index.ts` - Export presets

**Benefits:**
- ✅ Users get beautiful designs out-of-the-box
- ✅ Easy to customize by extending presets
- ✅ Great marketing/demo material
- ✅ Shows best practices

---

#### 1.3 Remove Hardcoded Colors
**Effort:** 1 hour
**Impact:** Essential for customization

Replace all hardcoded Tailwind classes with conditional defaults:

```typescript
// Before
className="bg-red-300 text-white"

// After
className={classNames?.trackActive || 'bg-red-300'}
```

**Files to modify:**
- `src/components/DateSlider/components/SliderTrack.tsx`
- `src/components/DateSlider/components/DateLabel.tsx`
- `src/components/DateSlider/components/TimeUnitSelection.tsx`
- `src/components/DateSlider/components/TimeDisplay.tsx`

**Benefits:**
- ✅ Natural class override (no !important)
- ✅ Smaller user-facing API
- ✅ Better Tailwind purging

---

## Priority 2: Props Organization (MEDIUM IMPACT, MEDIUM EFFORT)

### Goal
Make the API discoverable and organized.

### Tasks

#### 2.1 Group Props into Config Objects
**Effort:** 3-4 hours
**Impact:** Better DX, easier to understand

```typescript
// Before: 30+ flat props
<DateSlider
  viewMode="range"
  sliderClassName="..."
  trackActiveClassName="..."
  pointHandleIcon={...}
  startHandleIcon={...}
  scrollable={true}
  labelPersistent={false}
  // ... 25 more props
/>

// After: ~8 organized groups
<DateSlider
  mode="range"
  classNames={{
    wrapper: '...',
    trackActive: '...',
  }}
  icons={{
    point: <Icon />,
    start: <Icon />,
  }}
  behavior={{
    scrollable: true,
    labelPersistent: false,
  }}
  features={{
    timeDisplay: true,
    timeUnitSelector: true,
  }}
/>
```

**New prop structure:**
```typescript
type SliderProps = {
  // Core (5 props)
  mode: 'point' | 'range' | 'combined';
  value: PointValue | RangeValue | CombinedValue;
  onChange: (value: ...) => void;
  min?: Date;
  max?: Date;

  // Grouped configs (5 props)
  classNames?: DateSliderClassNames;
  icons?: IconsConfig;
  behavior?: BehaviorConfig;
  features?: FeaturesConfig;
  layout?: LayoutConfig;

  // Advanced (2-3 props)
  imperativeRef?: React.Ref<DateSliderImperativeAPI>;
  granularity?: GranularityConfig;
};
```

**Files to modify:**
- `src/components/DateSlider/DateSlider.tsx` - Accept new prop structure
- `src/components/DateSlider/types.ts` - Define config types
- All story files - Update to new API

**Migration strategy:**
- Keep old props working with deprecation warnings
- Provide automatic migration via console warnings
- Update all Storybook examples to new API

**Benefits:**
- ✅ IDE autocomplete shows logical groups
- ✅ Easier to discover related options
- ✅ Cleaner import statements
- ✅ Better TypeScript inference

---

## Priority 3: Type Safety (HIGH IMPACT, MEDIUM EFFORT)

### Goal
Catch invalid prop combinations at compile time.

### Tasks

#### 3.1 Add Discriminated Union for Modes
**Effort:** 2-3 hours
**Impact:** Prevents runtime errors

```typescript
// Point mode props
type PointModeProps = {
  mode: 'point';
  value: { point: Date };
  onChange: (value: { point: Date }) => void;
  // Point-specific
  pointHandleIcon?: React.ReactNode;
};

// Range mode props
type RangeModeProps = {
  mode: 'range';
  value: { start: Date; end: Date };
  onChange: (value: { start: Date; end: Date }) => void;
  // Range-specific
  startHandleIcon?: React.ReactNode;
  endHandleIcon?: React.ReactNode;
};

// Combined mode props
type CombinedModeProps = {
  mode: 'combined';
  value: { point: Date; start: Date; end: Date };
  onChange: (value: { point: Date; start: Date; end: Date }) => void;
  // All icons
  pointHandleIcon?: React.ReactNode;
  startHandleIcon?: React.ReactNode;
  endHandleIcon?: React.ReactNode;
};

export type SliderProps = (PointModeProps | RangeModeProps | CombinedModeProps) & CommonProps;
```

**Files to modify:**
- `src/components/DateSlider/types.ts` - Define discriminated unions
- `src/components/DateSlider/DateSlider.tsx` - Type guard implementation

**Benefits:**
- ✅ TypeScript catches invalid combinations
- ✅ Better IDE autocomplete (only shows valid props)
- ✅ Self-documenting API
- ✅ Prevents common mistakes

---

## Priority 4: Render Customization (MEDIUM IMPACT, HIGH EFFORT)

### Goal
Allow users to fully customize component rendering.

### Tasks

#### 4.1 Add Render Props for Key Elements
**Effort:** 4-6 hours
**Impact:** Maximum flexibility

```typescript
type RenderProps = {
  renderHandle?: (props: HandleRenderProps) => React.ReactNode;
  renderTrack?: (props: TrackRenderProps) => React.ReactNode;
  renderLabel?: (props: LabelRenderProps) => React.ReactNode;
  renderScales?: (props: ScalesRenderProps) => React.ReactNode;
};

// Usage
<DateSlider
  renderHandle={(props) => (
    <CustomHandle
      position={props.position}
      onMouseDown={props.onMouseDown}
      isDragging={props.isDragging}
    >
      {props.label}
    </CustomHandle>
  )}
/>
```

**Alternative: Compound Components**
```typescript
<DateSlider>
  <DateSlider.Track>
    <DateSlider.Scales />
    <DateSlider.ActiveTrack />
  </DateSlider.Track>
  <DateSlider.Handle type="point" />
  <DateSlider.TimeUnitSelector />
</DateSlider>
```

**Files to create:**
- `src/components/DateSlider/renderProps.ts` - Render prop type definitions
- `src/components/DateSlider/defaults.tsx` - Default renderers

**Files to modify:**
- `src/components/DateSlider/DateSlider.tsx` - Support render props
- All internal components - Extract reusable logic

**Decision needed:** Render props vs Compound components vs Both?

**Benefits:**
- ✅ Users can completely customize rendering
- ✅ Supports complex use cases (custom tooltips, annotations)
- ✅ Maintains backward compatibility (render props are optional)
- ✅ Advanced users get full control

---

## Priority 5: Documentation & Examples (HIGH IMPACT, MEDIUM EFFORT)

### Goal
Make library easy to learn and use.

### Tasks

#### 5.1 Update README
- Add "Quick Start" section
- Add "Customization" section with Tailwind examples
- Add "Presets" gallery
- Add "API Reference" table
- Add "Examples" section

#### 5.2 Create Comprehensive Storybook
- Add "Getting Started" story
- Add "Customization" category with examples
- Add "Presets" gallery story
- Add "Advanced Usage" stories
- Add "Accessibility" story
- Add "Performance" story

#### 5.3 Add JSDoc Comments
- Document all public props
- Add usage examples in JSDoc
- Document common patterns
- Link to relevant stories

#### 5.4 Create Migration Guide
- How to upgrade from previous versions
- Breaking changes (if any)
- Deprecation warnings
- Code transformation examples

---

## Implementation Timeline

### Week 1: Styling System (Priority 1)
**Days 1-2:** Add comprehensive className props
- Create DateSliderClassNames type
- Update all components to accept classNames
- Remove hardcoded colors
- Test with existing stories

**Days 3-4:** Create preset library
- Design 5-6 beautiful presets
- Create presets.ts
- Create Storybook stories for each preset
- Export from main index

**Day 5:** Testing & polish
- Test all presets in different scenarios
- Test dark mode support
- Test responsive behavior
- Fix any issues

### Week 2: Props Organization (Priority 2)
**Days 1-3:** Implement config objects
- Define new prop structure
- Add backward compatibility layer
- Update internal prop handling
- Add deprecation warnings

**Days 4-5:** Update stories & documentation
- Update all Storybook stories
- Update README
- Create migration guide
- Test all examples

### Week 3: Type Safety (Priority 3)
**Days 1-2:** Discriminated unions
- Define mode-specific types
- Implement type guards
- Update component logic
- Test TypeScript inference

**Days 3-5:** Testing & refinement
- Test all mode combinations
- Ensure good error messages
- Update stories to showcase type safety
- Document patterns

### Week 4: Render Customization (Priority 4) - OPTIONAL
**Days 1-3:** Design & implement render props
- Choose approach (render props vs compound)
- Define prop types
- Implement in component
- Extract default renderers

**Days 4-5:** Examples & documentation
- Create advanced Storybook examples
- Document render prop patterns
- Test complex scenarios
- Performance testing

---

## Breaking Changes Strategy

### Approach: Zero Breaking Changes (Recommended)

1. **Keep all old props working**
2. **Add deprecation warnings in console**
3. **Provide migration helpers**
4. **Document upgrade path**

```typescript
// Example deprecation warning
if (sliderClassName) {
  console.warn(
    'DateSlider: "sliderClassName" is deprecated. Use "classNames.wrapper" instead.\n' +
    'Migration: classNames={{ wrapper: "' + sliderClassName + '" }}'
  );
}
```

### Future Major Version (v2.0)
- Remove all deprecated props
- Clean up backward compatibility code
- Potentially introduce breaking improvements

---

## Success Metrics

### User Experience
- [ ] Users can customize every visual aspect with Tailwind
- [ ] No more `!important` workarounds needed
- [ ] IDE autocomplete shows organized prop groups
- [ ] TypeScript catches invalid prop combinations
- [ ] 5+ beautiful presets available out-of-box

### Code Quality
- [ ] All ESLint warnings resolved or documented
- [ ] 100% TypeScript coverage
- [ ] Comprehensive Storybook coverage
- [ ] No hardcoded colors in components
- [ ] Clean, organized codebase

### Documentation
- [ ] README has clear examples
- [ ] All props documented with JSDoc
- [ ] Migration guide available
- [ ] Storybook has 20+ stories
- [ ] Common patterns documented

### Performance
- [ ] No performance regression
- [ ] Bundle size increase < 5%
- [ ] Tree-shaking works correctly
- [ ] No unnecessary re-renders

---

## Quick Wins (Can Do Today)

### 1. Fix ESLint Config Error (30 minutes)
Fix the `parserOptions` error preventing git commits.

### 2. Add First className Props (1 hour)
Add just `classNames.trackActive` and `classNames.handle` to show the pattern works.

### 3. Create One Preset (30 minutes)
Export the existing "glass" preset from stories.

### 4. Update One Story (15 minutes)
Show new classNames API in one story as proof-of-concept.

---

## Questions to Resolve

1. **Render customization approach?**
   - Render props
   - Compound components
   - Both
   - Neither (just className props is enough)

2. **Major version bump?**
   - v0.2.0 with deprecations (recommended)
   - v1.0.0 with breaking changes
   - v0.1.1 with only additions (safest)

3. **Preset system?**
   - Simple object export (lightweight)
   - CVA with variants (more features)
   - Both (most flexible)

4. **Documentation platform?**
   - Just README + Storybook (simple)
   - Separate docs site (professional)
   - README + Storybook + API reference page (middle ground)

---

## Next Steps

1. ✅ Review this roadmap
2. ⏳ Fix ESLint config issue (blocking commits)
3. ⏳ Decide on approach for each priority
4. ⏳ Start with Priority 1.1 (className props)
5. ⏳ Create feature branch for improvements
6. ⏳ Implement in order of priority

**Let's start with the quick wins and build momentum!**
