import type { ReactNode, RefObject } from 'react';

import type { DateGranularity } from './utils';

export type ViewMode = 'range' | 'point' | 'combined';
export type TimeUnit = 'day' | 'month' | 'year';
export type DragHandle = 'start' | 'end' | 'point' | null;

// Re-export for convenience
export type { DateGranularity };

type RangeSelection = {
  range: {
    start: Date;
    end: Date;
  };
};

export type PointSelection = {
  point: Date;
};

export type TimeLabel = {
  date: Date;
  position: number;
};

type CombinedSelection = RangeSelection & PointSelection;

export type SelectionResult = RangeSelection | PointSelection | CombinedSelection;

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

export type SliderProps = {
  viewMode: ViewMode;
  startDate: Date; // Must be UTC Date
  endDate: Date; // Must be UTC Date
  initialTimeUnit: TimeUnit;
  initialRange?: { start: Date; end: Date }; // Must be UTC Dates
  initialPoint?: Date; // Must be UTC Date
  granularity?: DateGranularity; // Controls display granularity (day/hour/minute)

  // Styling
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

  pointHandleIcon?: ReactNode;
  rangeHandleIcon?: ReactNode;
  onChange: (selection: SelectionResult) => void;
  scrollable?: boolean;
  isTrackFixedWidth?: boolean;
  minGapScaleUnits?: number;
  scaleUnitConfig?: ScaleUnitConfig;
  trackPaddingX?: number;
  sliderWidth?: 'fill' | number; //fill means its width will fill parent.
  sliderHeight?: number;
  imperativeHandleRef?: React.Ref<SliderExposedMethod>;
  withEndLabel?: boolean;
  timeUnitSelectionEnabled?: boolean;
  timeDisplayEnabled?: boolean;
  freeSelectionOnTrackClick?: boolean; //if true, the datetime can be freely selected when click on track, if false, the selection will be limited to datetime per scale units.
  labelPersistent?: boolean;
};

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
