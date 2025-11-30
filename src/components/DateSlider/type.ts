import type { ReactNode, RefObject } from 'react';

import type { DateGranularity } from './utils';

export type ViewMode = 'range' | 'point' | 'combined';
export type TimeUnit = 'day' | 'month' | 'year';
export type DragHandle = 'start' | 'end' | 'point' | null;

// Re-export for convenience
export type { DateGranularity };

/**
 * Time label for scale marks
 */
export type TimeLabel = {
  date: Date;
  position: number;
};

/**
 * Selection result type - now unified with SliderValue
 */
export type SelectionResult = SliderValue;

export type ScaleUnitConfig = {
  gap?: number;
  width: {
    short: number;
    medium: number;
    long: number;
  };
  height: {
    short: number;
    medium: number;
    long: number;
  };
};

export type SliderExposedMethod = {
  setDateTime: (date: Date, target?: DragHandle) => void;
  focusHandle: (handleType: DragHandle) => void;
};

/**
 * Comprehensive className customization for all DateSlider elements.
 * All properties are optional and support full Tailwind CSS utilities.
 */
export type DateSliderClassNames = {
  // Container
  /** Main wrapper element containing the entire slider */
  wrapper?: string;
  /** Slider container element */
  slider?: string;

  // Track
  /** Base track element */
  track?: string;
  /** Active portion of the track (point/range indicator) */
  trackActive?: string;
  /** Inactive/background portion of the track */
  trackInactive?: string;

  // Handles
  /** Base styles for all handles */
  handle?: string;
  /** Point handle specific styles */
  handlePoint?: string;
  /** Range start handle specific styles */
  handleStart?: string;
  /** Range end handle specific styles */
  handleEnd?: string;
  /** Applied when a handle is being dragged */
  handleDragging?: string;
  /** Icon wrapper inside handle */
  handleIcon?: string;

  // Labels & Text
  /** Hover date label (tooltip) */
  dateLabel?: string;
  /** Text inside the date label */
  dateLabelText?: string;
  /** Scale tick mark labels */
  scaleLabel?: string;

  // Visual Indicators
  /** Vertical cursor line on hover */
  cursorLine?: string;
  /** Base styles for all scale marks */
  scaleMark?: string;
  /** Major scale tick marks */
  scaleMarkMajor?: string;
  /** Minor scale tick marks */
  scaleMarkMinor?: string;
  /** Medium scale tick marks */
  scaleMarkMedium?: string;

  // Time Unit Selection
  /** Time unit selector container */
  timeUnitSelector?: string;
  /** Time unit selection buttons */
  timeUnitButton?: string;
  /** Active time unit button */
  timeUnitButtonActive?: string;
  /** Time unit text labels */
  timeUnitText?: string;

  // Time Display
  /** Time display container */
  timeDisplay?: string;
  /** Text inside time display */
  timeDisplayText?: string;
};

/**
 * Icon configuration for slider handles
 */
export type IconsConfig = {
  /** Icon for point handle */
  point?: ReactNode;
  /** Icon for range start handle */
  rangeStart?: ReactNode;
  /** Icon for range end handle */
  rangeEnd?: ReactNode;
};

/**
 * Behavior configuration for slider interactions
 */
export type BehaviorConfig = {
  /** Enable horizontal scrolling when slider exceeds viewport width */
  scrollable?: boolean;
  /** Allow free datetime selection on track click (not limited to scale units) */
  freeSelectionOnTrackClick?: boolean;
  /** Keep date label visible persistently */
  labelPersistent?: boolean;
};

/**
 * Feature toggles for optional UI elements
 */
export type FeaturesConfig = {
  /** Show time unit selector (day/month/year) */
  timeUnitSelector?: boolean;
  /** Show time display component */
  timeDisplay?: boolean;
};

/**
 * Layout and sizing configuration
 */
export type LayoutConfig = {
  /** Slider width - 'fill' to fill parent, or specific number in pixels */
  width?: 'fill' | number;
  /** Slider height in pixels */
  height?: number;
  /** Horizontal padding for track in pixels */
  trackPaddingX?: number;
  /** Use fixed track width (disable responsive width) */
  fixedTrackWidth?: boolean;
  /** Show end label on scale */
  showEndLabel?: boolean;
  /** Minimum gap between scale units in pixels */
  minGapScaleUnits?: number;
  /** Custom scale unit sizing configuration */
  scaleUnitConfig?: ScaleUnitConfig;
};

/**
 * Point mode value
 */
export type PointValue = {
  point: Date;
};

/**
 * Range mode value
 */
export type RangeValue = {
  start: Date;
  end: Date;
};

/**
 * Combined mode value (both point and range)
 */
export type CombinedValue = {
  point: Date;
  start: Date;
  end: Date;
};

/**
 * Union type for all slider value types
 */
export type SliderValue = PointValue | RangeValue | CombinedValue;

/**
 * Common props shared across all slider modes
 */
type CommonSliderProps = {
  /** Minimum date (must be UTC) */
  min: Date;
  /** Maximum date (must be UTC) */
  max: Date;
  /** Initial time unit (day/month/year) */
  initialTimeUnit: TimeUnit;

  // ===== Grouped Configs (Optional) =====
  /**
   * Comprehensive className customization for all slider elements.
   * Use this for full control over component styling with Tailwind CSS.
   * @example
   * ```tsx
   * <DateSlider
   *   classNames={{
   *     wrapper: 'bg-white shadow-lg',
   *     trackActive: 'bg-green-500',
   *     handle: 'bg-white shadow-xl',
   *   }}
   * />
   * ```
   */
  classNames?: DateSliderClassNames;

  /**
   * Behavior configuration for slider interactions
   * @example
   * ```tsx
   * <DateSlider
   *   behavior={{
   *     scrollable: true,
   *     freeSelectionOnTrackClick: true,
   *     labelPersistent: false,
   *   }}
   * />
   * ```
   */
  behavior?: BehaviorConfig;

  /**
   * Feature toggles for optional UI elements
   * @example
   * ```tsx
   * <DateSlider
   *   features={{
   *     timeUnitSelector: true,
   *     timeDisplay: true,
   *   }}
   * />
   * ```
   */
  features?: FeaturesConfig;

  /**
   * Layout and sizing configuration
   * @example
   * ```tsx
   * <DateSlider
   *   layout={{
   *     width: 'fill',
   *     height: 120,
   *     trackPaddingX: 16,
   *   }}
   * />
   * ```
   */
  layout?: LayoutConfig;

  // ===== Advanced Props (Optional) =====
  /** Controls display granularity (day/hour/minute) */
  granularity?: DateGranularity;
  /** Imperative API reference for external control */
  imperativeRef?: React.Ref<SliderExposedMethod>;
};

/**
 * Point mode specific props
 * Only point icon is relevant in this mode
 */
type PointModeSliderProps = {
  /** Mode identifier for point selection */
  mode: 'point';
  /** Current point value - optional, defaults to min date if not provided */
  value?: PointValue;
  /** Callback when value changes */
  onChange: (value: SliderValue) => void;
  /** Icon configuration - only point icon is used */
  icons?: {
    point?: ReactNode;
    rangeStart?: never;
    rangeEnd?: never;
  };
};

/**
 * Range mode specific props
 * Only range icons are relevant in this mode
 */
type RangeModeSliderProps = {
  /** Mode identifier for range selection */
  mode: 'range';
  /** Current range value - optional, defaults to min-max range if not provided */
  value?: RangeValue;
  /** Callback when value changes */
  onChange: (value: SliderValue) => void;
  /** Icon configuration - only range icons are used */
  icons?: {
    point?: never;
    rangeStart?: ReactNode;
    rangeEnd?: ReactNode;
  };
};

/**
 * Combined mode specific props
 * All icons can be used in this mode
 */
type CombinedModeSliderProps = {
  /** Mode identifier for combined point and range selection */
  mode: 'combined';
  /** Current combined value - optional, defaults to sensible values if not provided */
  value?: CombinedValue;
  /** Callback when value changes */
  onChange: (value: SliderValue) => void;
  /** Icon configuration - all icons can be used */
  icons?: {
    point?: ReactNode;
    rangeStart?: ReactNode;
    rangeEnd?: ReactNode;
  };
};

/**
 * Main props for DateSlider component with discriminated union for type safety
 * TypeScript will only allow props valid for the selected mode
 *
 * @example Point mode
 * ```tsx
 * <DateSlider
 *   mode="point"
 *   value={{ point: new Date() }}
 *   onChange={(value) => console.log(value.point)}  // TypeScript knows value has 'point'
 *   icons={{ point: <Icon /> }}  // Only point icon allowed
 * />
 * ```
 *
 * @example Range mode
 * ```tsx
 * <DateSlider
 *   mode="range"
 *   value={{ start: date1, end: date2 }}
 *   onChange={(value) => console.log(value.start, value.end)}  // TypeScript knows value has 'start' and 'end'
 *   icons={{ rangeStart: <Icon />, rangeEnd: <Icon /> }}  // Only range icons allowed
 * />
 * ```
 */
export type SliderProps = (PointModeSliderProps | RangeModeSliderProps | CombinedModeSliderProps) &
  CommonSliderProps;

export type ScaleType = 'short' | 'medium' | 'long';
export type Scale = { position: number; type: ScaleType; date: Date };
export type NumOfScales = { short: number; medium: number; long: number };

type BaseSliderTrackProps = {
  onTrackClick: (e: React.MouseEvent) => void;
  onTrackTouch: (e: React.TouchEvent) => void;
  scales: Scale[];
  scaleUnitConfig: ScaleUnitConfig;
  trackRef: RefObject<HTMLDivElement | null>;
  startDate: Date;
  endDate: Date;
  onDragging: boolean;
  startHandleRef: React.RefObject<HTMLButtonElement | null>;
  endHandleRef: React.RefObject<HTMLButtonElement | null>;
  pointHandleRef: React.RefObject<HTMLButtonElement | null>;
  labelPersistent?: boolean;
  classNames?: DateSliderClassNames;
};

type PointModeProps = {
  mode: 'point';
  pointPosition: number;
};

type CombinedModeProps = {
  mode: 'combined';
  rangeStart: number;
  rangeEnd: number;
  pointPosition: number;
};

type RangeModeProps = {
  mode: 'range';
  rangeStart: number;
  rangeEnd: number;
};

export type SliderTrackProps = BaseSliderTrackProps &
  (PointModeProps | RangeModeProps | CombinedModeProps);

export type SliderHandleProps = {
  onDragging: boolean;
  position: number;
  label: string;
  icon: ReactNode;
  onMouseDown: (e: React.MouseEvent) => void;
  onTouchStart?: (e: React.TouchEvent) => void;
  ref: RefObject<HTMLButtonElement | null>;
  min?: number;
  max?: number;
  value?: number;
  handleType: DragHandle;
  onKeyDown: (e: React.KeyboardEvent) => void;
  onFocus: (event: React.FocusEvent<HTMLButtonElement>) => void;
  viewMode?: 'point' | 'range' | 'combined';
  isSliderDragging?: boolean;
  classNames?: DateSliderClassNames;
};

export type RenderSliderHandleProps = {
  viewMode: 'point' | 'range' | 'combined';
  rangeStart: number;
  rangeEnd: number;
  pointPosition: number;
  startDate: Date;
  endDate: Date;
  timeUnit: TimeUnit;
  isDragging: DragHandle | false;
  rangeHandleIcon?: React.ReactNode;
  pointHandleIcon?: React.ReactNode;
  startHandleRef: React.RefObject<HTMLButtonElement | null>;
  endHandleRef: React.RefObject<HTMLButtonElement | null>;
  pointHandleRef: React.RefObject<HTMLButtonElement | null>;
  onHandleFocus: (event: React.FocusEvent<HTMLButtonElement>) => void;
  onMouseDown: (handle: DragHandle) => (e: React.MouseEvent) => void;
  onTouchStart: (handle: DragHandle) => (e: React.TouchEvent) => void;
  onKeyDown: (handle: DragHandle) => (e: React.KeyboardEvent) => void;
  isSliderDragging: boolean;
  labelPersistent?: boolean;
  classNames?: DateSliderClassNames;
};

export type TimeUnitSelectionProps = {
  initialTimeUnit: TimeUnit;
  isMonthValid: boolean;
  isYearValid: boolean;
  onChange: (timeUnit: TimeUnit) => void;
  classNames?: DateSliderClassNames;
};

export type TimeLabelsProps = {
  timeLabels: TimeLabel[];
  scales: Scale[];
  trackWidth: number;
  minDistance?: number;
  withEndLabel?: boolean;
  classNames?: DateSliderClassNames;
};
